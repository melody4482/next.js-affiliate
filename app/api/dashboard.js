// Created by MelodyDev 02/17/2023
import proxyApi from "../config/proxyApi"
import isEmpty from "is-empty"
import { tiktokAccounts, plugAccounts } from "../config/accounts"

/**
 * @params {startDate, endDate}
 * @return JSON Infuse data
 */
export const getInfuse = async (startDate, endDate) => {
    return fetch(
        `https://fluent.api.hasoffers.com/Apiv3/json?api_key=36b3999c96af210dc8e5ed4a2a73f8ada2e8248f27d550ef3f2ce126dd3ccb0e&Target=Affiliate_Report&Method=getStats&fields[]=Stat.source&fields[]=Stat.payout&fields[]=Stat.clicks&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]=${startDate}&filters[Stat.date][values][]=${endDate}&filters[Stat.payout][conditional]=GREATER_THAN&filters[Stat.payout][values]=.01&sort[Stat.payout]=desc`,
        { method: 'GET' }
    )
        .then((res) => res.json())
        .then((data) => {
            return data.response.data
        })
        .catch((err) => {
            console.log(err)
        })
}

/**
 * @params {startDate, endDate}
 * @return JSON Plug Data
 */
export const getPlug = async (startDate, endDate, bearerToken) => {
    /**
     * @method POST
     * @desc Get Firebase Token
     */
    return fetch(
        `https://securetoken.googleapis.com/v1/token?key=AIzaSyCRYBeb5B5J0EJQr7-631BTwu4f6p9EsKc`,
        {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'grant_type': 'refresh_token',
            //     'regresh_token_1': 'AOEOulZYVnczctVS6DlGCj1eKDu4wXWCN0I35wr0vsf0xNv8MjZFZclKWCA8OYk8Cp4XDnjEvNKawaRiUMQ653NlcG1wmRWOvr6uGkGCiB75_ZnX-5fmtJzbGweTjfkwEnHiFBylTsGL08sJ_8GbUxV-oBOu4WtXqQ'
            // },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token:
                    'AOEOulZYVnczctVS6DlGCj1eKDu4wXWCN0I35wr0vsf0xNv8MjZFZclKWCA8OYk8Cp4XDnjEvNKawaRiUMQ653NlcG1wmRWOvr6uGkGCiB75_ZnX-5fmtJzbGweTjfkwEnHiFBylTsGL08sJ_8GbUxV-oBOu4WtXqQ',
            }),
        }
    )
        .then((res) => res.json())
        .then(async (data) => {
            const idToken = data.id_token
            /**
             * @method GET
             * @desc Get Plug data by Firebase token with JSON type
             */
            return fetch(
                `https://theplug-prod.herokuapp.com/api/v1/bqReport?start_date=${startDate}&end_date=${endDate}&timezone=America/New_York&columns=date,campaign,campaign_name,campaign_image_url,media,media_name,dollars&format=json`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: bearerToken,
                        FirebaseToken: idToken,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    return data
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
}

/**
 * @params {startDate, endDate}
 * @return TikTok data with JSON
 */
export const getTiktok = async (startDate, endDate, advertiser_id) => {
    /**
     * @method GET
     * @desc Get Tiktok data with JSON type
     */
    return fetch(
        `https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/?advertiser_id=${advertiser_id}&page=1&data_level=AUCTION_ADGROUP&report_type=BASIC&dimensions=["adgroup_id"]&metrics=["adgroup_name","spend"]&page_size=500&start_date=${startDate}&end_date=${endDate}`,
        { 
            method: 'GET',
            headers: {
                "Access-Control-Request-Method": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Request-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Method": "GET,HEAD,OPTIONS,POST,PUT",
                'Access-Control-Allow-Credentials': 'true',
                'Access-Token': '70f21646e0a7da20e90acaf96b939a4c49d8fc59'
            }
        }
    )
        .then((res) => res.json())
        .then((data) => {
            return data.data
        })
        .catch((err) => {
            console.log(err)
        })
}


export const getDataByConnection = (start, end, bearerToken, advertiser_id) => {
    return fetch(
        `${proxyApi}api/revenue`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(async data => {
            const infuseData = await getInfuse(start, end);
            var index = 1;
            var mediaSources = [
                ...infuseData.data.map((item) => ({
                    no: index++,
                    icon: '',
                    name: item.Stat.source,
                    revenue: parseFloat(item.Stat.payout),
                    offer: ''
                }))
            ];
            var plugData;
            if (bearerToken === 'all') {
                for (const element of plugAccounts) {
                    plugData = await getPlug(start, end, element.value)
                    mediaSources = [
                        ...mediaSources,
                        ...plugData.data.map(item => ({
                            no: index++,
                            icon: item.campaign_image_url,
                            name: item.media_name,
                            revenue: parseFloat(item.dollars),
                            offer: item.campaign_name,
                        }))
                    ];
                }
            } else {
                plugData = await getPlug(start, end, bearerToken)
                mediaSources = [
                    ...mediaSources,
                    ...plugData.data.map((item) => ({
                        no: index++,
                        icon: item.campaign_image_url,
                        name: item.media_name,
                        revenue: parseFloat(item.dollars),
                        offer: item.campaign_name,
                    }))
                ];
            }
            var tiktokData = [];
            var adSets = [];
            index = 1;

            if (advertiser_id === 'all') {
                for (const element of tiktokAccounts) {
                    tiktokData = await getTiktok(start, end, element.value);
                    adSets = [
                        ...adSets,
                        ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                            no: index ++,
                            adgroupId: item.dimensions.adgroup_id,
                            spend: item.metrics.spend,
                            adgroupName: item.metrics.adgroup_name,
                        }))
                    ];
                }
            } else {
                tiktokData = await getTiktok(start, end, advertiser_id);
                adSets = isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                    no: index ++,
                    adgroupId: item.dimensions.adgroup_id,
                    spend: item.metrics.spend,
                    adgroupName: item.metrics.adgroup_name,
                }));
            }

            // if (advertiser_id === 'all') {
            //     plugAccounts.forEach(async item => {
            //         tiktokData = await getPlug(start, end, item.value);
            //         adSets = [
            //             ...adSets,
            //             isEmpty(tiktokData) ? [] : tiktokData.data.map((item) => ({
            //                 no: index ++,
            //                 adgroupId: item.media,
            //                 spend: parseFloat(item.dollars),
            //                 adgroupName: item.campaign_name,
            //             }))
            //         ];
            //     })
            // } else {
            //     tiktokData = await getPlug(start, end, bearerToken);
            //     adSets = isEmpty(tiktokData) ? [] : tiktokData.data.map((item) => ({
            //         no: index ++,
            //         adgroupId: item.media,
            //         spend: parseFloat(item.dollars),
            //         adgroupName: item.campaign_name,
            //     }));
            // }



            return result;
        });
}

export const deleteRevenue = key => {
    return fetch(
        `${proxyApi}api/revenue/${key}`,
        { method: 'DELETE' }
    )
    .then(res => res.json())
    .then(data => data);
}