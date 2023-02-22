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
import { getDataByConnection } from '../app/api/dashboard'
import BasicDatePicker from '../app/components/DatePicker'
import BasicSelect from '../app/components/BasicSelect'

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
];

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
        console.log(result);
        setRevenues(result);
    }

    const handleSearchDate = (e) => {
        setDate({ [e.name]: e.value })
    }

    const handleAccountSelect = (accountType, accountContent) => {
        setAccount({ ...account, [accountType]: accountContent });
    }

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
                                data={plugAccounts} 
                            />
                        </Grid>
                        <Grid container item xs={3}>
                            <BasicSelect 
                                name="tiktokAccount" 
                                label="Tiktok Account" 
                                onchange={handleAccountSelect} 
                                data={tiktokAccounts} 
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
                        data={revenues} 
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
