export const fetchTrainings = () => {

    return fetch(import.meta.env.VITE_API_URL_GETTRAININGS)
    .then(response => {
        if(!response.ok)
        throw new Error("Error in fetch: " + response.statusText);

        return response.json();
    })
}

export const deleteTraining = (id) => {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS + `/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetch: " + response.statusText);
            }
            return response.json();
        });
};

export const addTraining = (trainingData, customerUrl) => {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...trainingData, customer: customerUrl })
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding training: " + response.statusText)

            return response.json();
        });
}