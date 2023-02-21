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
    const [state, setState] = React.useState(initialState)

    const handlePageChange = target => {
        setState({...state, current: target});
    }

    return (
        <div style={{ width: '100%' }}>
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
                        {props.isLoading ? (
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    colSpan={props.columns.length}
                                    style={{ height: '50vh' }}
                                >
                                    <Image
                                        priority
                                        width={60}
                                        height={60}
                                        alt="dropbox"
                                        src={`/loading.svg`}
                                    />
                                </StyledTableCell>
                            </TableRow>
                        ) : !isEmpty(props.data) ? (
                            props.data.map(item => 
                                <TableRow key={item.no} hover>
                                    {props.columns.map(col => 
                                        <StyledTableCell
                                            align={`${isEmpty(col.align) ? 'center' : col.align}`}
                                            style={isEmpty(col.style) ? {} : col.style}
                                        >
                                            {
                                                isEmpty(col.render) ? item[col.id] : col.render(col.id, item.no)                                       
                                            }
                                        </StyledTableCell>)}
                                </TableRow>)
                        ) : (
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
            {/*<TablePagination
                current={state.current}
                total={props.data.length}
                pageSize={state.pageSize}
                onPageChange={handlePageChange}
                                    />*/}
        </div>
    )
}

CustomizedTables.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  isLoading: PropTypes.isLoading
}
