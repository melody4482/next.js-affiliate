import { styled } from '@mui/material/styles'
import {
    TableCell,
    TableContainer,
    tableCellClasses,
    TablePagination,
    Button,
} from '@mui/material'
import { Box } from '@mui/system'

// Table Styles
export const StyledTableContainer = styled(TableContainer)(() => ({
    [`&`]: {
        backgroundColor: '#1d1d1f',
        padding: '0 10px',
        borderRadius: '3px',
        border: '0.5px solid #2B2A2F',
    },
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: 'rgba(255, 255, 255, 0.5)',
        border: 'none',
        cursor: 'pointer',
        borderBottom: '0.5px solid #2B2A2F',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: 'transparent',
        color: theme.palette.common.white,
    },
}))

export const StyledTablePagination = styled(TablePagination)(() => ({
    [`& *`]: {
        color: '#fff',
    },
}))


// Table Pagination Styles
export const StyledPagination = styled(Box)(() => ({
    padding: '6px 13px',
    border: '1px solid #525252',
    backgroundColor: '#2B2A2F',
}));

export const StyledPaginationButton = styled(Button)(() => ({
    [`&`]: {
        padding: '3px',
        backgroundColor: '#2B2A2F'
    }
}));