import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { fetchCustomers } from "../customerapi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import { Button } from "@mui/material";
import AddTraining from "./AddTraining";
import { CSVLink } from "react-csv";
import { addCustomer } from "../customerapi";
import { deleteCustomer } from "../customerapi";
import { updateCustomer } from "../customerapi";
import { addTraining } from "../trainingapi";


function Customerlist() {

    const [customers, setCustomers] = useState([]);

    const [colDef] = useState([
        { field: 'firstname', filter: true, width: 150 },
        { field: 'lastname', filter: true, width: 150 },
        { field: 'streetaddress', filter: true, width: 180 },
        { field: 'postcode', filter: true, width: 120 },
        { field: 'city', filter: true, width: 120 },
        { field: 'email', filter: true, width: 180 },
        { field: 'phone', filter: true, width: 130 },
        {
            cellRenderer: params =>
                <AddTraining customer={params.data} addTraining={(trainingData) => handleAddTraining(trainingData, params.data._links.self.href)} />
        },
        {
            cellRenderer: params => 
            <EditCustomer data={params.data} updateCustomer={updateCustomer} />,
            width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => handleDeleteCustomer(params.data._links.customer.href)}>
                    Delete
                </Button>,
            width: 120
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => {
                //console.log(data)
                setCustomers(data._embedded.customers)
            })
            .catch(err => console.error(err))
    }

    const handleAddCustomer = (newCustomer) => {
        addCustomer(newCustomer)
            .then(() => {
                handleFetch();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleUpdateCustomer = (url, updatedCustomer) => {
        updateCustomer(url, updatedCustomer)
            .then(() => {
                handleFetch();
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleDeleteCustomer = (url) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            deleteCustomer(url)
                .then(() => {
                    handleFetch();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    const handleAddTraining = (trainingData, customerUrl) => {
        addTraining(trainingData, customerUrl)
            .then(() => {
                handleFetch();
            })
            .catch(err => {
                console.error(err);
            });
    }

    const exportCustomerData = () => {
        return customers.map(customer => ({
            'Firstname': customer.firstname,
            'Lastname': customer.lastname,
            'Streetaddress': customer.streetaddress,
            'Postcode': customer.postcode,
            'City': customer.city,
            'Email': customer.email,
            'Phone': customer.phone
        }))
    }

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <CSVLink data={exportCustomerData()} style={{ marginLeft: '10px' }}>Export</CSVLink>
            <div className="ag-theme-material" style={{ height: 600, width: 1470 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );

}

export default Customerlist;