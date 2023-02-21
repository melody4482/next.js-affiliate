import proxyApi from "../config/proxyApi"

export const addRevenue = revenue => {
    fetch(`${proxyApi}/api/revenue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ revenues: revenue })            
        })
        .then(res => res.json)
        .then(data => console.log(data));
}

export const getRevenueList = () => {
    fetch(`${proxyApi}/api/revenue/list`, {method: 'GET'})
        .then(res => res.json())
        .then(data => console.log(data))
}