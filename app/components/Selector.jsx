import PropTypes from "prop-types"
import * as React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Box,
    Select
 } from '@mui/material';

export default function BasicSelect(props) {

    const handleChange = (event) => {
        props.onchange(
            props.name, 
            { 
                name: props.data.filter(item => item.id === event.target.value)[0].name, 
                id: event.target.value
            });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
                <InputLabel
                    sx={{
                        color: '#fff',
                    }}
                >{props.label}</InputLabel>
                <Select
                    label={props.label}
                    onChange={handleChange}
                    value={props.data[0].id}
                    sx={{
                        borderRadius: '3px',
                        color: '#fff',
                        '& .MuiSvgIcon-root': {
                            color: '#fff'
                        },
                    }}
                >
                    {props.data.map(item => 
                        <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

BasicSelect.propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.any,
    onchange: PropTypes.func
}
