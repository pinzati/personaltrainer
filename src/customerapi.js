
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

export const addCustomer = (newCustomer) => {
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding customer: " + response.statusText);

            return response.json();
        });
}

export const deleteCustomer = (url) => {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);

            return response.json();
        });
}

export const updateCustomer = (url, updatedCustomer) => {
    return fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(updatedCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when updating customer: " + response.statusText)

            return response.json();
        });
}