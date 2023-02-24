import PropTypes from "prop-types"
import * as React from 'react'
import Image from 'next/image'
import { 
    Table, 
    TableBody, 
    TableHead, 
    TableRow 
} from '@mui/material'
import {
    StyledTableCell,
    StyledTableContainer,
    StyledTablePagination,
} from './tableStyles'
import isEmpty from 'is-empty'
import TablePagination from "./TablePagination"

export default function CustomizedTables(props) {
    const initialState = {
        current: 1,
        pageSize: 10,
    }
    const [state, setState] = React.useState(initialState);

    const handlePageChange = target => {
        setState({...state, current: target});
    }

    var index = 1;

    return (
        <div style={{ width: '100%', marginBottom: '100px' }}>
            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                props.columns.map(col =>
                                    <StyledTableCell
                                        key={ col.id }
                                        align={ `${isEmpty(col.columnAlign) ? 'center' : col.columnAlign}` }
                                        style={ isEmpty(col.columnStyle) ? {} : col.columnStyle }
                                    >
                                        { col.label }
                                    </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.isLoading ? 
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    colSpan={props.columns.length}
                                    style={{ height: '50vh' }}
                                >
                                    <Image
                                        width={60}
                                        height={60}
                                        priority
                                        alt="dropbox"
                                        src={`/loading.svg`}
                                        style={{ margin: '200px auto' }}
                                    />
                                </StyledTableCell>
                            </TableRow>
                             : !isEmpty(props.data) ?
                                props.data.map(item => 
                                    <TableRow key={item.key} hover>
                                        {props.columns.map(col => 
                                            <StyledTableCell
                                                align={`${isEmpty(col.align) ? 'center' : col.align}`}
                                                style={isEmpty(col.style) ? {} : col.style}
                                                key={`${item.key + index++}`}
                                            >
                                                {
                                                    isEmpty(col.render) ? item[col.id] : col.render(item[col.id], item)                                       
                                                }
                                            </StyledTableCell>)}
                                    </TableRow>)
                                : <TableRow>
                                    <StyledTableCell
                                        align="center"
                                        colSpan={props.columns.length}
                                        style={{ height: '50vh' }}
                                    >
                                        <Image
                                            width={60}
                                            height={60}
                                            priority
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
                        }
                        {!isEmpty(props.data) &&
                            <TableRow
                                style={{ backgroundColor: '#f2f2f2' }}
                            >
                                <StyledTableCell style={{color: '#333'}} colSpan={3} align="center">{`Total`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center">{`$ ${props.totalRow.revenue}`}</StyledTableCell>
                                <StyledTableCell 
                                    align="center" 
                                    style={props.totalRow.spend < 0 ? 
                                        {color: 'red'} : 
                                        props.totalRow.spend > 0 ? 
                                        { color: 'green'} : 
                                        { color: '#fff'}}>{`$ ${props.totalRow.spend}`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center">{`$ ${props.totalRow.profit}`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center">{`${props.totalRow.roas} %`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center"></StyledTableCell>
                            </TableRow>
                        }
                        {/*<TableRow>
                            <StyledTableCell colSpan={8} style={{width: '100%'}}>
                                <TablePagination
                                    current={state.current}
                                    total={props.data.length}
                                    pageSize={state.pageSize}
                                    onPageChange={handlePageChange}
                                />
                            </StyledTableCell>
                                    </TableRow>*/}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </div>
    )
}

CustomizedTables.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  totalRow: PropTypes.object
}
