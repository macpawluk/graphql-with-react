import BugReportIcon from '@mui/icons-material/BugReport';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Issue } from '../../models';
import { MessageBox } from './../../shared';
import { removeIssue as removeIssueFromStore } from './../projectsList/projectsSlice';
import { removeIssue } from './issuesApi';

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

export function IssueItem(props: {
  issue: Issue;
  projectId: string;
  onEditClick: (issue: Issue) => void;
}) {
  const { issue, projectId, onEditClick } = props;
  const [openRemoveMessageBox, setOpenRemoveMessageBox] = useState(false);
  const dispatch = useAppDispatch();

  const getIssueTypeName = (issueType: Issue['type']) => {
    switch (issueType) {
      case 'BUG':
        return 'Bug';

      case 'IMPROVEMENT':
        return 'Improvement';

      case 'STORY':
        return 'Story';

      default:
        return '';
    }
  };

  const getIssueIcon = (issueType: Issue['type']) => {
    switch (issueType) {
      case 'BUG':
        return (
          <BugReportIcon
            fontSize="small"
            sx={{ flexGrow: 0, color: red[600] }}
          />
        );

      case 'IMPROVEMENT':
        return (
          <NewReleasesIcon
            fontSize="small"
            sx={{ flexGrow: 0, color: green[600] }}
          />
        );

      case 'STORY':
        return (
          <DescriptionIcon
            fontSize="small"
            sx={{ flexGrow: 0, color: grey[700] }}
          />
        );

      default:
        return null;
    }
  };

  const handleDeleteMessageBoxClose = async (result: boolean) => {
    setOpenRemoveMessageBox(false);

    if (result === true) {
      await removeIssue(issue.id);
      dispatch(removeIssueFromStore({ projectId, issueId: issue.id }));
    }
  };

  const handleDeleteClick = () => {
    setOpenRemoveMessageBox(true);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Card sx={{ mb: 2, mr: 2, width: 272 }}>
          <CardContent sx={{ height: 120 }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flexGrow: 1 }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Issue
                </Typography>
                <Typography variant="h5" component="div">
                  {issue.name}
                </Typography>
              </div>

              {getIssueIcon(issue.type)}
            </div>
            <Typography variant="body2">
              {getIssueTypeName(issue.type)}
            </Typography>
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
