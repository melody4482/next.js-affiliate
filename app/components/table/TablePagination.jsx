import React from 'react'
import { StyledPagination, StyledPaginationButton } from './tableStyles';
import {
    KeyboardArrowLeft, 
    KeyboardArrowRight, 
    KeyboardDoubleArrowLeft, 
    KeyboardDoubleArrowRight
} from '@mui/icons-material';


export default function TablePagination(props) {

    const [pageCount, setPageCount] = React.useState([1]);

    React.useEffect(() => {
        var pages = [];
        var index = 1;
        while(pages.length < setPageCount(Math.ceil(props.total / props.pageSize)))
            pages.push(index ++);
        if (props.total === 0)
            pages.push(1);
        setPageCount(pages);
    }, [props.total]);

    return (
        <StyledPagination>
            <StyledPaginationButton onClick={() => props.onPageChange(1)}>
                <KeyboardDoubleArrowLeft />
            </StyledPaginationButton>
            <StyledPaginationButton onClick={() => props.onPageChange(props.current - 1)}>
                <KeyboardArrowLeft />
            </StyledPaginationButton>
            {
                pageCount > 5 ? 
                    <StyledPaginationButton onClick={() => props.onPageChange(item)}>{item}</StyledPaginationButton>
                :
                    pageCount.map(item => <StyledPaginationButton onClick={() => props.onPageChange(item)}>{item}</StyledPaginationButton>)
            }
            <StyledPaginationButton onClick={() => props.onPageChange(props.current + 1)}>
                <KeyboardArrowRight />
            </StyledPaginationButton>
            <StyledPaginationButton onClick={() => props.onPageChange(Math.ceil(props.total / props.pageSize))}>
                <KeyboardDoubleArrowRight />
            </StyledPaginationButton>
        </StyledPagination>
    )
}
