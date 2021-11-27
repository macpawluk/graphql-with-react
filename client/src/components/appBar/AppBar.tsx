import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { purple } from '@mui/material/colors';

export const ApplicationBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: `linear-gradient(to left, ${purple['600']}, ${purple['900']})`,
        }}
      >
        <Container fixed>
          <Toolbar
            sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Demo app
            </Typography>
            <Button color="inherit">About</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
