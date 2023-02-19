import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const color = "#fff";

export default function BasicDatePicker(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={props.label}
                value={dayjs(props.value)}
                onChange={(newValue) => {
                    props.onchange({
                        name: props.name,
                        value: dayjs(newValue).format('YYYY-MM-DD')
                    })
                }}
                renderInput={(params) => <TextField {...params}
                    sx={{
                        svg: { color },
                        input: { color },
                        label: { color },
                        width: '100%',
                        "& fieldset": {
                            borderColor: '#4f4e4e',
                            borderRadius: '3px',
                        }
                    }}
                />}
            />
        </LocalizationProvider>
    );
}

