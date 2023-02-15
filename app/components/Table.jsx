import * as React from 'react';
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    tableCellClasses
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: 'rgba(255, 255, 255, 0.5)',
        border: 'none',
        cursor: 'pointer',
        background: 'rgb(34,34,42)',
        background: 'linear-gradient(0deg, rgba(34,34,42,1) 0%, rgba(40,41,46,1) 100%)',
        boxShadow: '2.1px 4.2px 4.2px hsl(0deg 0% 0% / 0.44)',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: 'none',
        backgroundColor: 'transparent',
        color: theme.palette.common.white,
    },
}));

function createData(icon, name, roas, profit, revenue, spend, cpa, cpc, offer, affiliate) {
    return { icon, name, roas, profit, revenue, spend, cpa, cpc, offer, affiliate};
}
const rows = [
    createData('tiktok', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
    createData('tiktok', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
    createData('tiktok', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
    createData('pinterest', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
    createData('tiktok', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
    createData('tiktok', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
    createData('pinterest', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
    createData('tiktok', 'Amazon-USA', '1.68', '$82.81', '$204.70', '$121.89', '$0.68', '$0.54', 617, 3349),
];

const headCells = [
    {
        id: 'icon',
        align: 'center',
        label: '',
        style: {
            borderRadius: '10px 0 0 10px'
        }
    },
    {
        id: 'name',
        align: 'left',
        label: 'Name',
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
        id: 'cpa',
        align: 'center',
        label: 'CPA',
    },
    {
        id: 'cpc',
        align: 'center',
        label: 'CPC',
    },
    {
        id: 'offer',
        align: 'center',
        label: 'Offer',
    },
    {
        id: 'affiliate',
        align: 'center',
        label: 'Affiliate',
        style: {
            borderRadius: '0 10px 10px 0'
        }
    },
];

export default function CustomizedTables() {
  return (
    <TableContainer 
        component={Paper}
        style={{
            backgroundColor: 'rgb(35, 43, 53)', 
            padding: '0 10px', 
            borderRadius: '10px', 
            border: '0.5px solid #333',
            boxShadow: '2.1px 4.2px 4.2px hsl(0deg 0% 0% / 0.44)'
        }}
    >
        <Table>
            <TableHead 
                style={{
                    backgroundColor: 'transparent',
                }}
            >
                <TableRow 
                    style={{
                        // backgroundColor: '#414b57', 
                        background: 'trasparent'
                    }}
                >
                    {headCells.map((headCell) => (
                        <StyledTableCell 
                            key={headCell.id} 
                            align={headCell.align}
                            style={headCell.style && headCell.style}
                            // sortDirection={orderBy === headCell.id ? order : false}
                        >
                            {headCell.label}
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name} hover>
                        <StyledTableCell align='center'>
                            <Image width={15} height={15} alt={`${row.icon}`} src={`/${row.icon}.png`}></Image>
                        </StyledTableCell>
                        <StyledTableCell align='left'>{row.name}</StyledTableCell>
                        <StyledTableCell align='center'>{row.roas}</StyledTableCell>
                        <StyledTableCell align='center' style={{color: 'green'}}>{row.profit}</StyledTableCell>
                        <StyledTableCell align='center'>{row.revenue}</StyledTableCell>
                        <StyledTableCell align='center'>{row.spend}</StyledTableCell>
                        <StyledTableCell align='center'>{row.cpa}</StyledTableCell>
                        <StyledTableCell align='center'>{row.cpc}</StyledTableCell>
                        <StyledTableCell align='center'>{row.offer}</StyledTableCell>
                        <StyledTableCell align='center'>{row.affiliate}</StyledTableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}