import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import isEmpty from 'is-empty'
import EmptyData from '../EmptyData'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import { StyledList, StyledListItem } from './adStyles'

export default function MediaList(props) {
    const initialState = {
        selected: 0,
        data: [],
    }

    const [state, setState] = React.useState(initialState)

    React.useEffect(() => {
        if (!isEmpty(props.data))
            setState({ ...state, selected: 0, data: props.data })
    }, [props.data])

    const handleItemClicked = (key) => {
        setState({
            ...state,
            data: state.data.map((item) => {
                if (item.no === key) item.selected = true
                else item.selected = false
                return item
            }),
            selected: key
        })
        props.onchange(key)
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
                        onClick={() => handleItemClicked(item.no)}
                        style={
                            item.selected ? 
                                { backgroundColor: '#525250'} : { backgroundColor: 'transparent' }
                        }
                    >
                        <div>
                            <img src={item.icon} />
                            <p>{item.name}</p>
                        </div>
                        <ArrowCircleRightOutlinedIcon />
                    </StyledListItem>
                ))
            )}
        </StyledList>
    )
}

MediaList.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
}
