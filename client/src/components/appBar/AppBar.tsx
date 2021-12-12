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
import { useAppSelector } from './../../app/hooks';
import { selectIsGlobalProgressOn } from './../../appStateSlice';

export const ApplicationBar = () => {
  const isGlobalProgressOn = useAppSelector(selectIsGlobalProgressOn);

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
              <Button color="inherit">About</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
