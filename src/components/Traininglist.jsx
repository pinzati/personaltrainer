import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { fetchTrainings } from "../trainingapi";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import { fetchCustomer } from "../customerapi";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { deleteTraining } from "../trainingapi";

function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    const formatDate = (params) => {
        return dayjs(params.value).format('DD/MM/YYYY HH:mm')
    }

    const [colDef] = useState([
        { field: 'date', filter: true, valueFormatter: formatDate },
        { field: 'duration', filter: true },
        { field: 'activity', filter: true },
        { field: 'customer.firstname', headerName: 'First Name', filter: true },
        { field: 'customer.lastname', headerName: 'Last Name', filter: true },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => handleDeleteTraining(params.data.id)}>
                    Delete
                </Button>,
            width: 120
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const handleDeleteTraining = (id) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            deleteTraining(id)
                .then(() => {
                    handleFetch();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600, width: 1300 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );

}

export default Traininglist;