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
                        <div>
                            {!isEmpty(item.icon) && <img width={25} height={25} src={item.icon} />}
                            <p>{item.name}</p>
                        </div>
                        <Button 
                            // color="default" 
                            style={{padding: '3px 5px'}} 
                            onClick={() => removeItem(item.no)}
                        >
                            <CancelOutlinedIcon />
                        </Button>
                        <p>{item.adgroupName}</p>
                    </StyledListItem>
                ))
            )}
        </StyledList>
    )
}

ConnectedList.propTypes = {
    data: PropTypes.array.isRequired
}
