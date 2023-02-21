import proxyApi from "../config/proxyApi"

export const addRevenue = revenue => {
    axios.post(`/api/revenue`, { revenues: revenue })
        .then(res => console.log(res.data));
}

export const getRevenueList = () => {
    axios.get(`/api/revenue/list`)
        .then(res => res.data);
}