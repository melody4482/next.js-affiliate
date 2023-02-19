import { createTheme } from '@mui/material/styles'

const theme = createTheme({
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
