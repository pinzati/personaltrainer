import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function AddCustomer({ addCustomer }) {
    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSave = () => {
        addCustomer(customer);
        handleClose();
      }

      return (
        <>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add Customer
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the information
                </DialogContentText>
                <TextField
                margin="dense"
                label="Firstname"
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname: e.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                margin="dense"
                label="Lastname"
                value={customer.lastname}
                onChange={e => setCustomer({...customer, lastname: e.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                margin="dense"
                label="Streetaddress"
                value={customer.streetaddress}
                onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                margin="dense"
                label="Postcode"
                value={customer.postcode}
                onChange={e => setCustomer({...customer, postcode: e.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                margin="dense"
                label="City"
                value={customer.city}
                onChange={e => setCustomer({...customer, city: e.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                margin="dense"
                label="Email"
                value={customer.email}
                onChange={e => setCustomer({...customer, email: e.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                margin="dense"
                label="Phone"
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone: e.target.value})}
                fullWidth
                variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
      );

}