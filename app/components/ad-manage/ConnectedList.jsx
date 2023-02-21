import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import isEmpty from 'is-empty'
import EmptyData from '../EmptyData'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button'
import { StyledList, StyledListItem } from './adStyles'

export default function ConnectedList(props) {

    const initialState = {
        data: [],
    };

    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        if (!isEmpty(props.data))
            setState({ data: props.data })
    }, [props.data]);

    const removeItem = key => {
        props.onchange(key);
    }

    return (
        <StyledList>
            {props.isLoading ? (
                <Image
                    width={60}
                    height={60}
                    priority
                    alt="dropbox"
                    src={`/loading.svg`}
                    style={{ margin: '200px auto' }}
                />
            ) : isEmpty(props.data) ? (
                <EmptyData />
            ) : (
                state.data.map((item) => (
                    <StyledListItem
                        key={item.no}
                    >
                        <div style={{width: '45%'}}>
                            {!isEmpty(item.icon) && 
                                <img 
                                    style={{ borderRadius: '50%', margin: '0 3px' }} 
                                    width={25} 
                                    height={25} 
                                    src={item.icon} 
                                />
                            }
                            <p>{item.name}</p>
                        </div>
                        <Button
                            style={{padding: '3px 5px', width: '10%'}} 
                            onClick={() => removeItem(item.no)}
                        >
                            <CancelOutlinedIcon style={{color: "#ff0000"}} />
                        </Button>
                        <p style={{width: '45%', textAlign: 'right'}}>{item.adgroupName}</p>
                    </StyledListItem>
                ))
            )}
        </StyledList>
    )
}

ConnectedList.propTypes = {
    data: PropTypes.array.isRequired
}
