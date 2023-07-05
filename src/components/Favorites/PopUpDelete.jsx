import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Cardo',
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: '#D0851E',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  borderRadius: 5,
};

const CustomButton = styled(Button)`
  background-color: var(--accent-color);
  border: none;
  border-radius: 10px;
  padding: 5px 35px;
  font-weight: 600;
  cursor: pointer;
  text-transform: none;
  color: black;
  margin: 0 1em;
  &:hover {
    background-color: var(--accent-hover-background);
  }
`;
const CustomButtonMain = styled(Button)`
  background-color: var(--accent-color);
  border: none;
  border-radius: 20px;
  padding: 0.5em;
  min-width: 40px;
  font-weight: 600;
  cursor: pointer;
  text-transform: none;
  color: black;
  margin: 0;
  &:hover {
    background-color: var(--accent-hover-background);
  }
`;
export default function DeleteModal({ onDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CustomButtonMain variant="contained" onClick={handleOpen}>X</CustomButtonMain>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Estas seguro que quieres borrar las cartas guardadas? 
              </Typography>
              <CustomButton variant="contained" onClick={handleDelete} style={{ marginTop: '2rem' }}>
                Borrar
              </CustomButton>
              <CustomButton variant="contained" onClick={handleClose} style={{ marginTop: '2rem' }}>
                Cerrar
              </CustomButton>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
