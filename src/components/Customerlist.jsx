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
                <AddTraining customer={params.data} addTraining={(trainingData) => addTraining(trainingData, params.data._links.self.href)} />
        },
        {
            cellRenderer: params => 
            <EditCustomer data={params.data} updateCustomer={updateCustomer} />,
            width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params.data._links.customer.href)}>
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

    const addCustomer = (newCustomer) => {
        fetch(import.meta.env.VITE_API_URL_CUSTOMERS, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when adding customer: " + response.statusText);

                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when updating customer: " + response.statusText)

                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error in fetch: " + response.statusText);

                    return response.json();
                })
                .then(() => handleFetch())
                .catch(err => console.error(err))
        }
    }

    const addTraining = (trainingData, customerUrl) => {
        fetch(import.meta.env.VITE_API_URL_TRAININGS, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...trainingData, customer: customerUrl })
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when adding training: " + response.statusText)

                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
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