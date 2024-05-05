import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function EditCustomer({ data, updateCustomer }) {
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
        //console.log(data)
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        updateCustomer(data._links.customer.href, customer);
        handleClose();
    }

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}
            >
                <DialogTitle>Update Customer</DialogTitle>
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