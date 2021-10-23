import BugReportIcon from '@mui/icons-material/BugReport';
import DescriptionIcon from '@mui/icons-material/Description';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { Issue } from '../../models';

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

export function IssueItem(props: { issue: Issue }) {
  const { issue } = props;

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

  return (
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

          <ThemeProvider theme={theme}>
            {getIssueIcon(issue.type)}
          </ThemeProvider>
        </div>
        <Typography variant="body2">{getIssueTypeName(issue.type)}</Typography>
      </CardContent>
      <CardActions>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <Button>Edit</Button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
