import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { fetchTrainings } from "../trainingapi";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import { fetchCustomer } from "../customerapi";
import dayjs from "dayjs";
import { Button } from "@mui/material";

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
                <Button size="small" color="error" onClick={() => deleteTraining(params.data.id)}>
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

    const deleteTraining = (id) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            fetch(import.meta.env.VITE_API_URL_TRAININGS + `/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
        }
    }

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