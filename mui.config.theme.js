import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
		MuiGrid: {
			defaultProps: {
				style: {
					padding: '5px 25px'
				}
			}
		},
		MuiTextField: {
			defaultProps: {
				inputProps: {
					style: {
						borderRadius: '13px',
						width: '100%',
					}
				},
				sx: {
					input: '#fff',
					label: '#fff',
					svg: '#fff'
				}
			}
		},
        MuiInputLabel: {
			defaultProps: {
				sx: {
					fontSize: "13px",
				},
			},
        },
        MuiOutlinedInput: {
			defaultProps: {
				sx: {
					fontSize: "13px",
				}
			}
        },
		MuiButton: {
			defaultProps: {
				sx: {
					textTransform: 'capitalize'
				}
			}
		}
	},
});

export default theme;