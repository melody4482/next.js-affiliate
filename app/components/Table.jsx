import * as React from 'react'
import Image from 'next/image'
import TablePagination from '@mui/material/TablePagination'
import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import {
    StyledTableCell,
    StyledTableContainer,
    StyledTablePagination,
} from './tableStyles'
import isEmpty from 'is-empty'

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
    },
    {
        id: 'name',
        align: 'left',
        label: 'Name',
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

export default function CustomizedTables(props) {
    const initialState = {
        page: 0,
        rowsPerPage: 10,
    }
    const [state, setState] = React.useState(initialState)

    const handleChangePage = (e, newPage) => {
        setState({ ...state, page: newPage })
    }

    const handleChangeRowsPerPage = (e) => {
        setState({
            ...state,
            page: 0,
            rowsPerPage: parseInt(e.target.value, 10),
        })
    }

    return (
        <div style={{ width: '100%' }}>
            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((headCell) => (
                                <StyledTableCell
                                    key={headCell.id}
                                    align={headCell.align}
                                    style={headCell.style && headCell.style}
                                >
                                    {headCell.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.isLoading ? (
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    colSpan={columns.length}
                                    style={{ height: '50vh' }}
                                >
                                    <Image
                                        width={60}
                                        height={60}
                                        alt="dropbox"
                                        src={`/loading.svg`}
                                    />
                                </StyledTableCell>
                            </TableRow>
                        ) : !isEmpty(props.data) ? (
                            props.data.map((item) => (
                                <TableRow key={item.no} hover>
                                    <StyledTableCell align="center">
                                        {item.no}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <img
                                            width={15}
                                            height={15}
                                            alt={`${item.icon}`}
                                            src={`${item.icon}`}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {item.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {item.roas}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ color: 'green' }}
                                    >
                                        {item.profit}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {item.revenue}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {item.spend}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {item.offer}
                                    </StyledTableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    colSpan={columns.length}
                                    style={{ height: '50vh' }}
                                >
                                    <Image
                                        width={60}
                                        height={60}
                                        alt="dropbox"
                                        src={`/dropbox.png`}
                                    />
                                    <p
                                        style={{
                                            marginTop: '-3px',
                                            color: 'rgba(255,255,255,0.5)',
                                        }}
                                    >
                                        No Data
                                    </p>
                                </StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <StyledTablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={isEmpty(props.data) ? 0 : props.data.length}
                rowsPerPage={state.rowsPerPage}
                page={state.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}
