import { Grid, Button } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'
import { getInfuse, getPlug, getTiktok } from '../app/api/dashboard'
import BasicDatePicker from '../app/components/DatePicker'
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

const AdManager = () => {
    const initialState = {
        startDate: '',
        endDate: '',
        mediaSources: [],
        adSets: [],
        data: [],
        isMediaLoading: false,
        isAdLoading: false,
    }

    const [state, setState] = React.useState(initialState)

    React.useEffect(() => {
        setState({
            ...state,
            startDate: dayjs(dayjs(), 'YYYY-MM-DD'),
            endDate: dayjs(dayjs(), 'YYYY-MM-DD'),
        })
    }, [])

    const handleSearchDate = (e) => {
        setState({ ...state, [e.name]: e.value })
    }

    const getMediaSource = async () => {
        setState({ ...state, isMediaLoading: true })
        const infuseData = await getInfuse(state.startDate, state.endDate)
        const plugData = await getPlug(state.startDate, state.endDate)
        setState({
            ...state,
            mediaSources: [
                ...infuseData.data.map((item) => ({
                    icon: '',
                    name: item.Stat.source,
                    revenue: parseFloat(item.Stat.payout),
                    offer: item.Offer.name,
                })),
                ...plugData.data.map((item) => ({
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
        setState({ ...state, isAdLoading: true })
        const tiktokData = await getTiktok(state.startDate, state.endDate)
        setState({
            ...state,
            adSets: tiktokData.data.map((item) => ({
                adgroupId: item.dimensions.adgroup_id,
                spend: item.metrics.spend,
                adgroupName: item.metrics.adgroup_name,
            })),
            isAdLoading: false,
        })
    }

    return (
        <Grid
            container
            item
            md={10}
            sm={11}
            rowSpacing={2}
            style={{ margin: '100px auto' }}
        >
            <Grid container item spacing={2} md={6} sm={8} direction="row">
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
            <Grid container item>
                <StyledCard>
                    <Grid
                        container
                        item
                        rowSpacing={1}
                        justifyContent={'space-around'}
                    >
                        <Grid
                            container
                            item
                            spacing={3}
                            direction="row"
                            justifyContent="space-between"
                        >
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
                        <Grid
                            container
                            item
                            spacing={2}
                            direction="row"
                            justifyContent={'space-between'}
                        >
                            <Grid container item></Grid>
                        </Grid>
                        <Grid container item>
                            <StyledButton
                                style={{ backgroundColor: '#363636' }}
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
