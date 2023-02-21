import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useAppContext } from '../context/AppContext'
import { Grid, Button } from '@mui/material'
import { getInfuse, getPlug, getTiktok } from '../app/api/dashboard'
import BasicDatePicker from '../app/components/DatePicker'
import MediaList from '../app/components/ad-manage/MediaList'
import isEmpty from 'is-empty'
import AdSetList from '../app/components/ad-manage/AdSetList'
import ConnectedList from '../app/components/ad-manage/ConnectedList'
import BasicSelect from '../app/components/BasicSelect'

const StyledButton = styled(Button)(({ theme }) => ({
    [`&`]: {
        backgroundColor: 'rgba(111, 100, 207)',
        padding: '10px 0',
        textAlign: 'center',
        color: '#fff',
        fontSize: '13px',
        borderRadius: '3px',
        width: '100%',
        textTransform: 'uppercase',
    },
    [`&:hover`]: {
        backgroundColor: '#6c65f0',
    },
}))

const StyledCard = styled.div`
    background-color: #1d1d1f;
    border-radius: 3px;
    border: 1px solid #282727;
    width: 100%;
    padding: 30px;
`

const tiktokAccounts = [
    { name: "BGM 03", value: '7156472503018340353' },
    { name: "BGM - Media Digital", value: '7145102062467006466' },
    { name: "Plug Co", value: '7060636350755667969' },
    { name: "Stacks Ads", value: '7060955335363805185' },
    { name: "Plug 2022", value: '7063596340252573698' }
];

const plugAccounts = [
    { name: "Connor", value: "bearer eyJhbGciOiJIUzI1NiJ9.MTEzODQ0.AdIWT5lcL7KhJzfUUxwRxUaUbSh9dnCt-pCHWlz_f5w" },
    { name: "Josh", value: "bearer eyJhbGciOiJIUzI1NiJ9.NTg1NTI.abImRgZCkT1k9zhTmXeLexc_QpTL3wEUFEze_IiXOvo" }
];

const AdManager = () => {

    const initialState = {
        startDate: '2023-02-19',
        endDate: '2023-02-19',
        plugAccount: null,
        tiktokAccount: null,
        mediaSources: [],
        adSets: [],
        data: [],
        isMediaLoading: false,
        isAdLoading: false,
        pair: {
            dataType: '',
            dataKey: 0
        },
        pairComplete: false,
    };

    const [state, setState] = React.useState(initialState);
    const [context, setContext] = useAppContext();
    const router = useRouter();

    React.useEffect(() => {
        // setState({
        //     ...state,
        //     startDate: dayjs(dayjs(), 'YYYY-MM-DD'),
        //     endDate: dayjs(dayjs(), 'YYYY-MM-DD'),
        // })
    }, [])

    const handleSearchDate = (e) => {
        setState({ ...state, [e.name]: e.value })
    }

    const getMediaSource = async () => {
        if (isEmpty(state.plugAccount)) {
            alert('error');
            return;
        }
        setState({ ...state, isMediaLoading: true })
        const infuseData = await getInfuse(state.startDate, state.endDate)
        var plugData = await getPlug(state.startDate, state.endDate, state.plugAccount.id)
        plugData = isEmpty(plugData.data) ? { data: [] } : plugData
        var index = 1
        setState({
            ...state,
            mediaSources: [
                ...infuseData.data.map((item) => ({
                    no: index++,
                    icon: '',
                    name: item.Stat.source,
                    revenue: parseFloat(item.Stat.payout),
                    offer: item.Offer.name,
                })),
                ...plugData.data.map((item) => ({
                    no: index++,
                    icon: item.campaign_image_url,
                    name: item.media_name,
                    revenue: parseFloat(item.dollars),
                    offer: item.campaign_name,
                })),
            ],
            isMediaLoading: false,
        })
    }

    const getAdSets = async () => {
        if (isEmpty(state.tiktokAccount)) {
            alert('error');
            return;
        }
        setState({ ...state, isAdLoading: true })
        const tiktokData = await getTiktok(state.startDate, state.endDate, state.tiktokAccount.id);
        var index = 1;
        setState({
            ...state,
            adSets: tiktokData.list.map((item) => ({
                no: index ++,
                adgroupId: item.dimensions.adgroup_id,
                spend: item.metrics.spend,
                adgroupName: item.metrics.adgroup_name,
            })),
            isAdLoading: false,
        });
    }

    const handleSourceChange = (dataType, dataKey) => {
        setState({...state, pair: { dataType: dataType, dataKey: dataKey}});
        const pair = state.pair;
        if (!isEmpty(pair.dataType) && dataType !== state.pair.dataType) {
            setState({
                ...state, 
                data: [
                    ...state.data,
                    {
                        ...state[dataType].filter(item => item.no === dataKey)[0], 
                        ...state[pair.dataType].filter(item => item.no === pair.dataKey)[0],
                        [pair.dataType]: pair.dataKey,
                        [dataType]: dataKey,
                        no: state.data.length + 1
                    }
                ],
                [dataType]: state[dataType].filter(item => item.no !== dataKey),
                [pair.dataType]: state[pair.dataType].filter(item => item.no !== pair.dataKey),
                pair: {
                    dataType: '',
                    dataKey: 0
                }
            });
        }
    }

    const handleDataChange = key => {
        const removeData = state.data.filter(item => item.no === key)[0];
        setState({
            ...state, 
            mediaSources: [
                ...state.mediaSources, 
                { no: removeData.mediaSources, name: removeData.name, offer: removeData.offer, revenue: removeData.revenue, icon: removeData.icon },
            ],
            adSets: [
                ...state.adSets,
                { no: removeData.adSets, adgroupId: removeData.adgroupId, adgroupName: removeData.adgroupName, spend: removeData.spend }
            ],
            data: state.data.filter(item => item.no !== key)
        });
    }

    const handleDataRemove = () => {
        const mediaSource = 
            state.data.map(item => ({
                no: item.mediaSources, 
                icon: item.icon, 
                name: item.name, 
                revenue: item.revenue, 
                offer: item.offer
            }));
        const adSets = 
            state.data.map(item => ({
                no: item.adSets, 
                adgroupId: item.adgroupId, 
                adgroupName: item.adgroupName, 
                spend: item.spend
            }));

        setState({
            ...state, 
            mediaSources: [...state.mediaSources, mediaSource], 
            adSets: [...state.adSets, adSets]
        });
    }

    const handleDataSave = () => {
        setContext({...context, ad_data: state.data});
        router.push('/dashboard');
    }

    const handleAccountSelect = (accountType, account) => {
        setState({ ...state, [accountType]: account });
    }

    return (
        <Grid container item md={10} sm={11} rowSpacing={2} style={{ margin: '30px auto' }}>
            <Grid container item spacing={2} md={12} sm={8} direction={"row"} justifyContent={"space-between"}>
                <Grid container item direction={"row"} md={6}>
                    <Grid container item md={5} sm={6} xs={6}>
                        <BasicDatePicker
                            name="startDate"
                            label="Start Date"
                            value={state.startDate}
                            onchange={handleSearchDate}
                        />
                    </Grid>
                    <Grid container item md={5} sm={6} xs={6}>
                        <BasicDatePicker
                            name="endDate"
                            label="End Date"
                            value={state.endDate}
                            onchange={handleSearchDate}
                        />
                    </Grid>
                </Grid>
                <Grid container item direction={"row"} md={6}>
                    <Grid container item md={6}>
                        <BasicSelect name="plugAccount" label="Plug Account" onchange={handleAccountSelect} data={plugAccounts} />
                    </Grid>
                    <Grid container item md={6}>
                        <BasicSelect name="tiktokAccount" label="Tiktok Account" onchange={handleAccountSelect} data={tiktokAccounts} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item>
                <StyledCard>
                    <Grid container item rowSpacing={1} justifyContent={'space-around'}>
                        <Grid container item spacing={3} direction={'row'} justifyContent={'space-between'}>
                            <Grid container item md={3} xs={6}>
                                <StyledButton onClick={getMediaSource}>
                                    GET MEDIA SOURCES
                                </StyledButton>
                            </Grid>
                            <Grid container item md={3} xs={6}>
                                <StyledButton onClick={getAdSets}>
                                    GET AD SETS
                                </StyledButton>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} direction={'row'} justifyContent={'space-between'}>
                            <Grid  container item  md={3} xs={6}>
                                <MediaList
                                    data={state.mediaSources}
                                    isLoading={state.isMediaLoading}
                                    onchange={handleSourceChange}
                                />
                            </Grid>
                            <Grid container item sx={{ display: { md: 'block', xs: 'none' } }} md={5}>
                                <ConnectedList 
                                    data={state.data}
                                    onchange={handleDataChange}
                                    onremove={handleDataRemove}
                                />
                            </Grid>
                            <Grid container item md={3} xs={6}>
                                <AdSetList
                                    data={state.adSets}
                                    isLoading={state.isAdLoading}
                                    onchange={handleSourceChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item sx={{ display: { md: 'none', xs: 'block' } }} md={5}>
                            <ConnectedList 
                                data={state.data}
                                onchange={handleDataChange}
                                onremove={handleDataRemove}
                            />
                        </Grid>
                        <Grid container item>
                            <StyledButton
                                style={{ backgroundColor: '#363636' }}
                                onClick={handleDataSave}
                            >
                                Open Result in Dashboard
                            </StyledButton>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
        </Grid>
    )
}

export default AdManager