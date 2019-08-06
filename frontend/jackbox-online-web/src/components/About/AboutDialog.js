import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { MDBBtn} from
"mdbreact";

export default function AboutDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <MDBBtn size="lg" color="white" onClick={handleClickOpen} style={{backgroundColor: "white", borderRadius:"14px", width: "210px", margin: "10px auto", fontSize: "18px", fontWeight: "700"}}> 
        WHAT IS THIS?
      </MDBBtn>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{alignItems: "center"}}
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center", fontSize: "25px"}}>WHAT IS THIS?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Jackbox Online</b> is a service that provides an updated list of online Jackbox.Tv rooms (similar to a server list for multiplayer games).  You can filter the table to find various game types and join able games.
            <br></br>
            <br></br>
            If you would like to contact me or see my previous projects, you can find my stuff <a href="https://github.com/JLDevOps">here</a>.
            <br></br>
            <br></br>
            <b>Note: This project is not at all associated with <a href="https://jackbox.tv/#">Jackbox TV or Jackbox Games</a>.</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <MDBBtn size="lg" color="white" onClick={handleClose} style={{backgroundColor: "white", borderRadius:"14px", width: "210px", margin: "10px auto", fontSize: "18px", fontWeight: "700"}}> 
                CLOSE
            </MDBBtn>
        </DialogActions>
      </Dialog>
    </div>
  );
}