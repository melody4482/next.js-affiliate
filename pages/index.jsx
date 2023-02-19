import React from 'react';
import { Grid, Button, Hidden } from '@mui/material'
import BasicDatePicker from '../app/components/DatePicker'
import BasicTable from '../app/components/Table'
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
import { getInfuse, getPlug, getTiktok } from '../app/api/dashboard';


export default function Dashboard () {

    const initialState = {
        startDate: '2022-01-21',
        endDate: '2023-02-05',
        data: [],
        isLoading: false
    }

    const [ data, setData ] = React.useState([]);
    const [ state, setState ] = React.useState(initialState);

    React.useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        setState({...state, isLoading: true});
        const infuseData = await getInfuse(state.startDate, state.endDate);
        const plugData = await getPlug(state.startDate, state.endDate);
        console.log(infuseData);
        console.log(plugData);
        var index = 1;
        setData([
            ...infuseData.data.map(item => ({ 
                no: index++,
                icon: '',
                name: item.Stat.source, 
                revenue: parseFloat(item.Stat.payout), 
                offer: item.Offer.name, 
                roas: '', 
                profit: '',
                spend: '',
                offer: item.Offer.name
            })),
            ...plugData.data.map(item => ({
                no: index++,
                icon: item.campaign_image_url,
                name: item.media_name,
                revenue: parseFloat(item.dollars),
                offer: item.campaign_name,
                roas: '',
                profit: '',
                spend: ''
            }))
        ]);
        setState({...state, isLoading: false});
        // console.log(getTiktok(state.startDate, state.endDate));
    }

    const handleSearchDate = e => {
        setState({...state, [e.name]: e.value});
    }
    return (
        <Grid  
            item
            container
            xl={8}
            lg={10}
            xs={11}
            justifyContent="center" 
            margin='auto'
        >
            <Grid 
                container
                rowSpacing={1}
                direction='column'
                marginTop='50px'
            >
                <Grid 
                    item
                    container 
                    direction='row'
                    justifyContent='space-between'
                >
                    <Grid 
                        item 
                        container 
                        md={10} 
                        sm={12} 
                        spacing={2}
                        direction='row' 
                        alignItems='center' 
                        width='fit-content'
                    >
                        <Grid 
                            item
                            xl={3} 
                            md={4} 
                            sm={6} 
                            xs={6} 
                        >
                            <BasicDatePicker
                                name="startDate"
                                label='Start(UTC)'
                                value={state.startDate}
                                onchange={handleSearchDate}
                            />
                        </Grid>
                        <Grid 
                            item 
                            xl={3} 
                            md={4} 
                            sm={6} 
                            xs={6} 
                        >
                            <BasicDatePicker
                                name="endDate"
                                label='End(UTC)'
                                value={state.endDate}
                                onchange={handleSearchDate}
                            />
                        </Grid>
                        <Grid 
                            item 
                            container
                            md={3} 
                            sm={8} 
                        >
                            <Button variant="text" onClick={() => getDashboardData()}>
                                <ReplayIcon />
                                Updated few seconds ago 
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid 
                        item 
                        container 
                        md={2} 
                        sm={12} 
                        alignItems='center' 
                        justifyContent='right'
                    >
                        <Button variant="text" style={{color: '#e04f4f'}}>
                            <AddIcon />
                            Add Account
                        </Button>
                    </Grid>
                </Grid>
                <Grid item container>
                    <BasicTable 
                        data={data}
                        isLoading={state.isLoading}
                    />
                </Grid>
            </Grid>
        </Grid>
    )

}