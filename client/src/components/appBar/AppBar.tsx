import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';

export const ApplicationBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
