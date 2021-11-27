import SadIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export function NoResultsPlaceholder(props: { text: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        component="div"
        sx={{
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SadIcon sx={{ fontSize: '60px', marginRight: 2 }} />
        {props.text}
      </Typography>
    </Box>
  );
}
