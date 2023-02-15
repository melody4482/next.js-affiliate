import * as React from 'react';
// import { PropTypes } from 'prop-types';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const color = "#fff";

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={props.label}
            value={value}
            onChange={(newValue) => {
            setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params}
                sx={{
                    svg: { color },
                    input: { color },
                    label: { color },
                    width: '100%',
                    "& fieldset": {
                        borderColor: '#4f4e4e',
                        borderRadius: '10px',
                    }
                }}
            />}
        />
    </LocalizationProvider>
  );
}

// BasicDatePicker.propTypes = {
//     label: PropTypes.string.required
// }