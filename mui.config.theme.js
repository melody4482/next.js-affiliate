import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        background: {
            default: "#1a2027"
        }
    },
    components: {
        MuiInputLabel: {
            defaultProps: {
                sx: {
                    fontSize: '17px',
                },
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                sx: {
                    fontSize: '15px',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                sx: {
                    textTransform: 'capitalize',
                },
            },
        },
    },
})

export default theme
