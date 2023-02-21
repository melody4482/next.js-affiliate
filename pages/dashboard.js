import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/AppContext'
import { Grid, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import BasicTable from '../app/components/table/Table'
import isEmpty from 'is-empty'
import { addRevenue } from '../app/api/revenue'
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const StyledButton = styled(Button)(() => ({
    [`&`]: {
        padding: '5px 3px',
        width: '100%',
        color: "#fff",
        fontWeight: '500',
        textAlign: 'center'
    }
}));

const columns = [
    {
        id: 'no',
        align: 'center',
        label: 'no',
    },
    {
        id: 'icon',
        align: 'center',
        label: '',
        render: icon => {
            isEmpty(icon) ? 
                <div /> : <img
                    width={15}
                    height={15}
                    alt={`${icon}`}
                    src={`${icon}`}
            />}
    },
    {
        id: 'name',
        align: 'left',
        label: 'Name',
        columnAlign: 'left',
        style: {
            width: '30%',
        },
    },
    {
        id: 'roas',
        align: 'center',
        label: 'ROAS',
    },
    {
        id: 'profit',
        align: 'center',
        label: 'Profit',
        style: {
            color: 'green'
        }
    },
    {
        id: 'revenue',
        align: 'center',
        label: 'Revenue',
    },
    {
        id: 'spend',
        align: 'center',
        label: 'Spend',
    },
    {
        id: 'offer',
        align: 'center',
        label: 'Offer',
    },
]

export default function Dashboard() {
    const initialState = [];
    const [state, setState] = React.useState(initialState)
    const [context, setContext] = useAppContext();
    const router = useRouter();

    React.useEffect(() => {
        var index = 1;
        setState(context.ad_data.map(item => ({
            no: index ++,
            icon: item.icon,
            name: item.name,
            roas: parseFloat(item.revenue / item.spend).toFixed(2),
            profit: parseFloat(item.revenue - item.spend).toFixed(2),
            revenue: item.revenue,
            spend: item.spend,
            offer: item.offer
        })));
    }, [context.ad_data]);

    const handleRevenueSave = async () => {
        addRevenue(state);
    }

    return (
        <Grid item container xl={8} lg={10} xs={11} justifyContent="center" margin={"auto"}>
            <Grid container item rowSpacing={1} direction="column" marginTop="50px">
                <Grid container item justifyContent={"space-between"}>
                    <Grid container item md={3}>
                        <StyledButton 
                            
                            onClick={() => router.push('/ad-manage')}
                        >
                            <ArrowBackIcon />
                            Go Back
                        </StyledButton>
                    </Grid>
                    <Grid container item md={3}>
                        <StyledButton 
                            style={{ backgroundColor: '#1f237f' }} 
                            onClick={handleRevenueSave}
                        >
                            <SaveSharpIcon />
                            Save Data
                        </StyledButton>
                    </Grid>
                </Grid>
                <Grid item container>
                    <BasicTable columns={columns} data={state} />
                </Grid>
            </Grid>
        </Grid>
    )
}
