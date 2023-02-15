import React from 'react';
import { Grid, Button, Hidden } from '@mui/material'
import BasicDatePicker from '../app/components/DatePicker'
import BasicTable from '../app/components/Table'
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
import { getInfuse, getStep1 } from '../app/api/dashboard';

export default function Dashboard () {

    React.useEffect(() => {
        // getInfuse();
        getStep1();
    }, [])


    return (
        <div>
            <Grid container direction='column'>
                <Grid direction='row' spacing={2} container justifyContent='space-between' style={{marginTop: '30px'}}>
                    <Grid md={10} sm={12} direction='row' item container alignItems='center' width='fit-content'>
                        <Grid xs={6} sm={5} md={4} xl={3} item>
                            <BasicDatePicker
                                label='Start(UTC)'
                            />
                        </Grid>
                        <Hidden smDown>
                            <Grid style={{fontSize: '20px', margin: '20px'}} item sm={0}>
                                to
                            </Grid>
                        </Hidden>
                        <Grid item xs={6} sm={5} md={4} xl={3} >
                            <BasicDatePicker
                                label='End(UTC)'
                            />
                        </Grid>
                        <Grid item sm={8} md={3} >
                            <Button variant="text" >
                                <ReplayIcon />
                                Updated few seconds ago 
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={2} container alignItems='center' justifyContent='right'>
                        <Button variant="text" style={{color: '#e04f4f'}}>
                            <AddIcon />
                            Add Account
                        </Button>
                    </Grid>
                </Grid>
                <Grid container style={{padding: '10px'}}>
                    <BasicTable />
                </Grid>
            </Grid>
        </div>
    )

}