import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './EditProfile.css'

function EditProfile() {


   const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const mystyle = {
    border: "none",
    color: "white",
    padding: "15px 32px",
    display: "inline-block",
    backgroundColor: "#4CAF50" /* Green */,
    boxSizing: "border-box"
    };
 
    const mystyle__button = {
      color: "white",
      padding: "15px 32px",
      borderRadius: "30px",
      backgroundColor: "var( --twitter-color)" /* Green */,
      fontSize:"15px",
        border:"none",
        boxShadow: "0px 10px 24px rgba(112, 144, 176, 0.8)",
    }

    return (
        <div className="edit__profile">
            <Button  color="black" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div className="edit__header">
        <DialogTitle id="form-dialog-title">  
        <Button style={{color: "red", position: "absolute", left: "-5px" }} onClick={handleClose} color="black">
            ✖
          </Button> 
        <div style={{marginLeft: "250px", width: "50%",}} > Edit  </div>
        
          
           
          </DialogTitle>
          </div>
          <DialogContent>
        <div className="edit__img__cover">
        <img src="farmer.jpg"></img></div>
        <div className="edit__image__profile">
          <img src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"></img>
        </div>
        
        <DialogContentText>
            Fill your details accurately.
          </DialogContentText>
        <TextField style={{}}
            
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            
            margin="dense"
            id="bio"
            label="Bio"
            type="text"
            fullWidth
            rowsMax={4}
            multiline
            maxLength="40"
          />

          <TextField
            
            margin="dense"
            id="location"
            label="Location"
            type="location"
            fullWidth
          />
           <p style={{paddingTop: "10px", }}>Date of Birth</p>
          <TextField
            
            margin="dense"
            id="dob"
            
            type="date"
            fullWidth
          />
          </DialogContent>
         
       
          {/*}
        <div style={{alignSelf: "center", paddingTop: "10px"}}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
          </div>
    */}
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"20px 100px 20px 100px"}}>
<Button onClick={handleClose} color="primary" variant="outlined" style={mystyle__button}>
            Save
          </Button>
          </div>
        
      </Dialog>
    </div>
    )
}

export default EditProfile