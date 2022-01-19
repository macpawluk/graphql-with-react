import { cloneDeep } from '@apollo/client/utilities';
import { useRemoveIssueMutation, useUpdateIssueMutation } from '@app/api';
import { Issue, IssueExt } from '@app/graphql-types';
import { MessageBox } from '@app/shared';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BugReportIcon from '@mui/icons-material/BugReport';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { setUsedDragAndDrop } from './../../appLocalStorage';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          '& .on-hover-show': {
            display: 'none',
          },
          '&:hover .on-hover-show': {
            display: 'inline-flex',
          },
        },
      },
    },
  },
});

const useStyles = makeStyles({
  multilineText: {
    overflow: 'hidden',
    display: '-webkit-box',
    'text-overflow': 'ellipsis',
    '-webkit-line-clamp': 2,
    'line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
});

export function IssueItem(props: {
  issue: Issue;
  projectId: string;
  onEditClick: (issue: Issue) => void;
}) {
  const { issue, projectId, onEditClick } = props;
  const [openRemoveMessageBox, setOpenRemoveMessageBox] = useState(false);
  const issueRef = useRef(issue);
  issueRef.current = issue;

  const { callback: updateIssueCallback } = useUpdateIssueMutation();
  const { callback: removeIssueCallback } = useRemoveIssueMutation({
    projectId,
    issueId: issue.id,
  });

  const handleDeleteMessageBoxClose = async (result: boolean) => {
    setOpenRemoveMessageBox(false);

    if (result === true) {
      removeIssueCallback({
        variables: { issue: { id: issue.id } },
      });
    }
  };

  const handleDeleteClick = () => {
    setOpenRemoveMessageBox(true);
  };

  const accentColor = getIssueAccentColor(issue.type);
  const classes = useStyles();

  const [_, drag] = useDrag(() => ({
    type: 'ISSUE_CARD',
    item: issueRef,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult<{
        dropEffect: string;
        targetStatus: Issue['status'];
      }>();

      if (item.current && dropResult) {
        setUsedDragAndDrop(true);

        var updatedIssue = cloneDeep(item.current);
        updatedIssue.status = dropResult.targetStatus;
        updatedIssue.lastStatusChange = new Date().toISOString();

        updateIssueCallback({
          variables: { issue: IssueExt.toIssueInput(updatedIssue) },
          optimisticResponse: {
            updateIssue: updatedIssue,
          },
        });
      }
    },
  }));

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Card
          sx={{ mb: 2, mr: 2, width: 270, cursor: 'move' }}
          ref={drag}
          role="Handle"
        >
          <CardContent sx={{ padding: 0 }}>
            <Box sx={{ height: 140 }}>
              <div>
                <Box
                  sx={{
                    px: 2,
                    pt: 1,
                    mb: 1,
                    borderBottom: '2px solid',
                    borderImageSlice: 1,
                    borderImageSource: `linear-gradient(to left, ${accentColor['500']}, ${accentColor['100']})`,
                    display: 'flex',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ flexGrow: 1 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {getIssueTypeName(issue.type)}
                  </Typography>

                  {getIssueIcon(issue.type)}
                </Box>
              </div>
              <Typography variant="subtitle1" noWrap sx={{ px: 2 }}>
                {issue.name}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                className={classes.multilineText}
                sx={{
                  px: 2,
                  pt: 1,
                  color: 'text.secondary',
                }}
              >
                {issue.description}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <Button onClick={() => onEditClick(issue)}>Edit</Button>
              </div>

              <IconButton
                aria-label="delete"
                size="small"
                className="on-hover-show"
                onClick={handleDeleteClick}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </ThemeProvider>

      <MessageBox
        open={openRemoveMessageBox}
        header="Issue"
        content={`Are you sure you want to permanently remove "${issue.name}"?`}
        okButtonCaption="Yes"
        okButtonColor="error"
        okButtonVariant="contained"
        cancelButtonCaption="No"
        onClose={handleDeleteMessageBoxClose}
      ></MessageBox>
    </React.Fragment>
  );
}

const getIssueAccentColor = (issueType: Issue['type']) => {
  switch (issueType) {
    case 'BUG':
      return red;

    case 'IMPROVEMENT':
      return green;

    case 'STORY':
      return blue;

    default:
      return grey;
  }
};

const getIssueTypeName = (issueType: Issue['type']) => {
  switch (issueType) {
    case 'BUG':
      return 'Bug';

    case 'IMPROVEMENT':
      return 'Improvement';

    case 'STORY':
      return 'Story';

    case 'TASK':
      return 'Task';

    default:
      return '';
  }
};

const getIssueIcon = (issueType: Issue['type']) => {
  const accentColor = getIssueAccentColor(issueType);

  switch (issueType) {
    case 'BUG':
      return (
        <BugReportIcon
          fontSize="small"
          sx={{ flexGrow: 0, color: accentColor[600] }}
        />
      );

    case 'IMPROVEMENT':
      return (
        <NewReleasesIcon
          fontSize="small"
          sx={{ flexGrow: 0, color: accentColor[600] }}
        />
      );

    case 'STORY':
      return (
        <DescriptionIcon
          fontSize="small"
          sx={{ flexGrow: 0, color: accentColor[700] }}
        />
      );

    case 'TASK':
      return (
        <AssignmentIcon
          fontSize="small"
          sx={{ flexGrow: 0, color: accentColor[700] }}
        />
      );

    default:
      return null;
  }
};
