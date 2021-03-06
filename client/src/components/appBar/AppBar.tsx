import { useApolloNetworkStatus } from '@app/cache';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { purple } from '@mui/material/colors';

export const ApplicationBar = () => {
  const { numPendingQueries, numPendingMutations } = useApolloNetworkStatus();
  const isGlobalProgressOn = numPendingQueries > 0 || numPendingMutations > 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: `linear-gradient(to left, ${purple['600']}, ${purple['900']})`,
        }}
      >
        <Container fixed>
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Showcase App
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {isGlobalProgressOn && (
                <CircularProgress
                  color="secondary"
                  style={{ width: '30px', height: '30px' }}
                  sx={{
                    mr: 2,
                    alignSelf: 'center',
                  }}
                />
              )}
              <Button
                color="inherit"
                href="https://www.linkedin.com/in/maciej-pawluk-6a45916/"
                target="_blank"
              >
                About
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
