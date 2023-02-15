import axios from 'axios';

export const getInfuse = () => {
    axios
        .get(`https://fluent.api.hasoffers.com/Apiv3/json?api_key=4b03091bb3b4f6ede0171f521819b12de0d8ce4eee1f7fb2f0c327232fbd85d2&Target=Affiliate_Report&Method=getStats&fields[]=Offer.name&fields[]=Stat.source&fields[]=Stat.payout&fields[]=Stat.clicks&filters[Stat.date][conditional]=GREATER_THAN_OR_EQUAL_TO&filters[Stat.date][values][]=2022-09-07&filters[Stat.date][values][]=2023-05-09`)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
}

export const getStep1 = () => {
    axios
        .post(`https://securetoken.googleapis.com/v1/token?key=AIzaSyCRYBeb5B5J0EJQr7-631BTwu4f6p9EsKc`)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
}