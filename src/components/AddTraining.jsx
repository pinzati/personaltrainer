import { Button, duration } from "@mui/material";
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";

export default function AddTraining({ customer, addTraining }) {
    // console.log(customer)

    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState({
        date: null,
        activity: '',
        duration: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addTraining(training);
        handleClose();
    }

    const handleDateChange = (date) => {
        setTraining({ ...training, date: date });
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add training for {customer.firstname} {customer.lastname}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the information
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            margin="dense"
                            label="Date and time"
                            value={training.date}
                            onChange={handleDateChange}
                            fullWidth
                            ampm={false}
                            format="DD/MM/YYYY HH:mm"
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Duration (min)"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
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