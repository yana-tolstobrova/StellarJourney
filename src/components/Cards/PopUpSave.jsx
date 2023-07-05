import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
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
  width: 400,
  bgcolor: '#D0851E',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  textAlign: 'center',
  borderRadius: 5,
};

const CustomButton = styled(Button)`
  background-color: var(--accent-color);
  border: none;
  border-radius: 10px;
  padding: 10px 35px;
  font-size: 1em;
  cursor: pointer;
  text-transform: none;
  color: black;
  margin: 0 1em;
  &:hover {
    background-color: var(--accent-hover-background);
  }

`;
const CustomTextarea = styled(TextareaAutosize)`
  background-color: var(--accent-color);
  width: 100%;
  margin-top: 1rem;
  border: none;
  rows: 4;
  &:hover, &:focus{
    outline: none;
    border: none;
  }
`;

export default function TransitionsModal({ selectedCards }) {
  const [open, setOpen] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    // Perform save logic with the textarea value
    const today = new Date();  
    const year = today.getFullYear(); 
    const month = today.getMonth() + 1;  
    const day = today.getDate();  

    const dateFormat = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      
    const savedData = {
    date: dateFormat,
    selectedCards: selectedCards,
    textareaValue: textareaValue,
  };

  const SavedKey = `Saved_${localStorage.length}`;
  localStorage.setItem(SavedKey, JSON.stringify(savedData));


    // Close the modal
    setOpen(false);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CustomButton onClick={handleOpen}>Guardar</CustomButton>
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
                Cómo te sientes?
              </Typography>
              <CustomTextarea
                placeholder="Escribe tu comentario"
                value={textareaValue}
                minRows={3}
                onChange={handleTextareaChange}
              />
              <CustomButton variant="contained" onClick={handleSave} style={{ marginTop: '1rem' }}>
                Guardar
              </CustomButton>
              <CustomButton variant="contained" onClick={handleClose} style={{ marginTop: '1rem' }}>
                Cerrar
              </CustomButton>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
