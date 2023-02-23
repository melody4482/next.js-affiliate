import proxyApi from "../config/proxyApi"

export const addRevenue = revenue => {
    return fetch(`${proxyApi}api/revenue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ revenues: revenue })            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return;
        });
}

export const getRevenues = () => {
    return fetch(
        `${proxyApi}api/revenue`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => data)
}