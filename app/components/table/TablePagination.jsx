import React from 'react'
import { StyledPagination, StyledPaginationButton } from './tableStyles';
import {
    KeyboardArrowLeft, 
    KeyboardArrowRight, 
    KeyboardDoubleArrowLeft, 
    KeyboardDoubleArrowRight
} from '@mui/icons-material';


export default function TablePagination(props) {

    var buttons = [];
    for(var i = 1; i <= Math.ceil(props.total / props.pageSize); i ++) {
        buttons.push(<StyledPaginationButton onClick={() => props.onPageChange(i)}>{i}</StyledPaginationButton>);
    }

    return (
        <StyledPagination>
            <StyledPaginationButton onClick={() => props.onPageChange(1)}>
                <KeyboardDoubleArrowLeft />
            </StyledPaginationButton>
            <StyledPaginationButton onClick={() => props.onPageChange(props.current - 1)}>
                <KeyboardArrowLeft />
            </StyledPaginationButton>
            {buttons}
            <StyledPaginationButton onClick={() => props.onPageChange(props.current + 1)}>
                <KeyboardArrowRight />
            </StyledPaginationButton>
            <StyledPaginationButton onClick={() => props.onPageChange(Math.ceil(props.total / props.pageSize))}>
                <KeyboardDoubleArrowRight />
            </StyledPaginationButton>
        </StyledPagination>
    )
}
