import { useRemoveProjectMutation } from '@app/api';
import { MessageBox } from '@app/shared';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Project } from '../../models';

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

export function ProjectItem(props: {
  project: Project;
  onEditClick: (project: Project) => void;
}) {
  const { project, onEditClick } = props;
  const [openRemoveMessageBox, setOpenRemoveMessageBox] = useState(false);
  const history = useHistory();

  const { callback: removeProjectCallback } = useRemoveProjectMutation();

  const handleDeleteMessageBoxClose = async (result: boolean) => {
    setOpenRemoveMessageBox(false);

    if (result === true) {
      removeProjectCallback({
        variables: { project: { id: project.id } },
      });
    }
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpenRemoveMessageBox(true);
    e.stopPropagation();
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onEditClick(project);
    e.stopPropagation();
  };

  const handleCardClick = () => {
    history.push(`/project/${project.id}/issues`);
  };

  return (
    <React.Fragment>
      <ButtonBase
        component="div"
        sx={{ height: '100%', textAlign: 'initial', display: 'block' }}
        onClick={handleCardClick}
      >
        <ThemeProvider theme={theme}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Project
                  </Typography>
                  <Typography variant="h5" component="div">
                    {project.name}
                  </Typography>
                </div>

                <Avatar
                  sx={{
                    bgcolor: project.color,
                    width: 30,
                    height: 30,
                    fontSize: 12,
                    flexGrow: 0,
                  }}
                >
                  {project.abbreviation}
                </Avatar>
              </div>
              <Typography variant="body2">{project.description}</Typography>
            </CardContent>
            <CardActions sx={{ flexGrow: 0 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignSelf: 'end' }}>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    className="on-hover-show"
                    onClick={(e) => handleEditClick(e)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    className="on-hover-show"
                    onClick={(e) => handleDeleteClick(e)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </CardActions>
          </Card>
        </ThemeProvider>
      </ButtonBase>

      <MessageBox
        open={openRemoveMessageBox}
        header="Project"
        content={`Are you sure you want to permanently remove "${project.name}" project?`}
        okButtonCaption="Yes"
        okButtonColor="error"
        okButtonVariant="contained"
        cancelButtonCaption="No"
        onClose={handleDeleteMessageBoxClose}
      ></MessageBox>
    </React.Fragment>
  );
}
