import { Issue } from '@app/models';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip } from '@mui/material';
import { grey } from '@mui/material/colors';
import * as _ from 'lodash';
import { useDrop } from 'react-dnd';
import { IssueItem } from './IssueItem';

const useStyles = makeStyles({
  highlightDrop: {
    'background-color': grey['100'],
    transition: 'background-color 250ms linear',
  },
});

export function IssuesColumn(props: {
  header: string;
  issuesStatus: Issue['status'];
  issues: Issue[];
  projectId: string;
  onEditClick: (issue: Issue) => void;
}) {
  const { header, issuesStatus, issues, projectId, onEditClick } = props;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ISSUE_CARD',
    drop: () => ({
      targetStatus: issuesStatus,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (issue: Issue) => issue.status !== issuesStatus,
  }));

  const orderedIssues = _.orderBy(issues ?? [], 'lastStatusChange', 'asc');
  const classes = useStyles();

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Chip label={header} sx={{ mb: 2, flexGrow: 0, alignSelf: 'start' }} />

      <Box
        ref={drop}
        role={'Dustbin'}
        className={isOver ? classes.highlightDrop : ''}
        sx={{ flexGrow: 1 }}
      >
        <Box>
          {orderedIssues.map((i) => (
            <IssueItem
              key={i.id}
              issue={i}
              projectId={projectId}
              onEditClick={onEditClick}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
