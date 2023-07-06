import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import axios from 'axios';

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
  p: 3,
  textAlign: 'center',
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  '@media (max-width: 775px)': { 
    width: '80%',
  },

};

const CustomButton = styled(Button)`
  background-color: var(--accent-color);
  border: none;
  border-radius: 10px;
  padding: 10px 35px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  text-transform: none;
  color: black;
  margin: 0 1em;
  &:hover {
    background-color: var(--accent-hover-background);
  }
`;

const CustomTextarea = styled(TextareaAutosize)`
  background-color: var(--accent-hover-background);
  width: 100%;
  margin-top: 1rem;
  border: 2px solid var(--accent-color);
  border-radius: 5px;
  rows: 4;
  padding: 5px;
  font-size: 1.2em;
  color: white;
  &:hover, &:focus{
    outline: none;
  }
  &::placeholder {
    font-size: 1.1em; 
    color: var(--accent-color);
`;

export default function TransitionsModal({ selectedCards, isDataSaved, setIsDataSaved }) {
  const [open, setOpen] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function reset() {
  setTextareaValue('');
  }
  function saveDataToServer(savedData) {
    axios.post('http://localhost:3001/sakura-cards', savedData)
    .then(response => {
      console.log('Data saved to server:', response.data);
    })
    .catch(error => {
      console.error('Error saving data:', error.message);
    });
}
  const handleSave = () => {
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

    /*{const SavedKey = `Saved_${localStorage.length}`;
    localStorage.setItem(SavedKey, JSON.stringify(savedData));}*/
    
    saveDataToServer(savedData)
    setIsDataSaved(true);
    reset();
    setOpen(false);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CustomButton onClick={handleOpen} disabled={isDataSaved}>Guardar</CustomButton>
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
              <div style={{ display: 'flex' }}>
                <CustomButton variant="contained" onClick={handleSave} style={{ marginTop: '1rem' }}>
                Guardar
              </CustomButton>
              <CustomButton variant="contained" onClick={handleClose} style={{ marginTop: '1rem' }}>
                Cerrar
              </CustomButton>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
