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
import { deleteRevenue, getDataByConnection } from '../app/api/dashboard'
import BasicDatePicker from '../app/components/DatePicker'
import BasicSelect from '../app/components/BasicSelect';
import { tiktokAccounts, plugAccounts } from '../app/config/accounts';
import DeleteIcon from '@mui/icons-material/Delete';

export const StyledButton = styled(Button)(() => ({
    [`&`]: {
        padding: '5px 3px',
        width: '100%',
        color: "#fff",
        fontWeight: '500',
        textAlign: 'center'
    }
}));

export default function Dashboard() {
    const [loading, setLoading] = React.useState(false);
    const [revenues, setRevenues] = React.useState([]);
    const [date, setDate] = React.useState({ start: '2023-2-19', end: '2023-2-19' });
    const [account, setAccount] = React.useState({ plugAccount: null, tiktokAccount: null});
    const [context, setContext] = useAppContext();
    const router = useRouter();

    const getRevenues = async () => {
        if (isEmpty(account.tiktokAccount) || isEmpty(account.plugAccount)) {
            alert('choose account');
            return;
        }
        setLoading(true);
        const result = await getDataByConnection(date.start, date.end, account.plugAccount.id, account.tiktokAccount.id);
        setLoading(false);
        setRevenues(result);
    }

    const handleSearchDate = (e) => {
        setDate({...date, [e.name]: e.value })
    }

    const handleAccountSelect = (accountType, accountContent) => {
        setAccount({ ...account, [accountType]: accountContent });
    }

    const handleRevenueDelete = async key => {
        const _id = await deleteRevenue(key);
        var index = 1;
        setRevenues(revenues.filter(item => item._id !== _id).map(item => ({...item, no: index++})));
    }
    
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
            id: 'revenue',
            align: 'center',
            label: 'Revenue',
            render: revenue => <p>{`$${revenue.toFixed(2)}`}</p>
        },
        {
            id: 'spend',
            align: 'center',
            label: 'Spend',
            render: spend => <p>{`$${Number(spend).toFixed(2)}`}</p>
        },
        {
            id: 'profit',
            align: 'center',
            label: 'Profit',
            style: {
                color: 'green'
            },
            render: profit => 
                    <p 
                        style={profit > 0 ? {color: 'green'} : profit < 0 ? {color: 'red'} : {color: '#fff'}}
                    >
                        {`$${Number(profit).toFixed(2)}`}
                    </p>
        },
        {
            id: 'roas',
            align: 'center',
            label: 'ROAS',
            render: roas => <p>{(Number(roas) * 100).toFixed() + ' %'}</p>
        },
        {
            id: 'delete',
            align: 'center',
            label: '',
            style: {
                width: '30px',
                padding: '0'
            },
            render: (item, col) =>  
                <Button
                    style={{ cursor: 'pointer', margin: '0', paddin: '0' }} 
                    onClick={() => handleRevenueDelete(col.key)}
                >
                    <DeleteIcon style={{color: 'red'}} />
                </Button>
        }
    ];


    return (
        <Grid item container xl={8} lg={10} xs={11} justifyContent="center" margin={"auto"}>
            <Grid container item rowSpacing={1} direction="column" marginTop="50px">
                <Grid container item justifyContent={"space-between"}>
                    <Grid container item md={2}>
                        <BasicDatePicker 
                            name='start' 
                            value={date.start} 
                            onchange={handleSearchDate} 
                        />
                    </Grid>
                    <Grid container item md={2}>
                        <BasicDatePicker 
                            name='end' 
                            value={date.end} 
                            onchange={handleSearchDate} 
                        />
                    </Grid>
                    <Grid container item direction={"row"} spacing={2} md={5} sm={5} xs={12}>
                        <Grid container item xs={3}>
                            <BasicSelect
                                name="plugAccount" 
                                label="Plug Account" 
                                onchange={handleAccountSelect} 
                                data={[{name: 'All', value: 'all'}, ...plugAccounts]} 
                            />
                        </Grid>
                        <Grid container item xs={3}>
                            <BasicSelect 
                                name="tiktokAccount" 
                                label="Tiktok Account" 
                                onchange={handleAccountSelect} 
                                data={[{name: 'All', value: 'all'}, ...tiktokAccounts]} 
                            />
                        </Grid>
                        <Grid container item xs={3}>
                            <Button onClick={getRevenues}>Get Connection</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container>
                    <BasicTable 
                        isLoading={loading} 
                        columns={columns} 
                        data={ isEmpty(revenues) ? [] : revenues.map(item => ({...item, key: item._id}))} 
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
