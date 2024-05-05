
export const fetchCustomers = () => {

    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS)
    .then(response => {
        if(!response.ok)
        throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
}

export const fetchCustomer = (customerUrl) => {
    return fetch(customerUrl)
    .then(response => {
        if(!response.ok)
        throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
}