import { Grid, Button, Card, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
const StyledButton = styled(Button)(({ theme }) => ({
    [`&`]: {
        backgroundColor: 'rgba(111, 100, 207)',
        padding: '15px 0',
        textAlign: 'center',
        color: '#fff',
        fontSize: '15px',
        width: '40%',
        borderRadius: '10px',
        textTransform: 'uppercase'
    },
    [`&:hover`]: {
        backgroundColor: '#6c65f0'
    }
}));

const StyledCard = styled.div`
    background-image: linear-gradient(216deg, rgba(77, 77, 77,0.05) 0%, rgba(77, 77, 77,0.05) 25%,rgba(42, 42, 42,0.05) 25%, rgba(42, 42, 42,0.05) 38%,rgba(223, 223, 223,0.05) 38%, rgba(223, 223, 223,0.05) 75%,rgba(36, 36, 36,0.05) 75%, rgba(36, 36, 36,0.05) 100%),linear-gradient(44deg, rgba(128, 128, 128,0.05) 0%, rgba(128, 128, 128,0.05) 34%,rgba(212, 212, 212,0.05) 34%, rgba(212, 212, 212,0.05) 57%,rgba(25, 25, 25,0.05) 57%, rgba(25, 25, 25,0.05) 89%,rgba(135, 135, 135,0.05) 89%, rgba(135, 135, 135,0.05) 100%),linear-gradient(241deg, rgba(55, 55, 55,0.05) 0%, rgba(55, 55, 55,0.05) 14%,rgba(209, 209, 209,0.05) 14%, rgba(209, 209, 209,0.05) 60%,rgba(245, 245, 245,0.05) 60%, rgba(245, 245, 245,0.05) 69%,rgba(164, 164, 164,0.05) 69%, rgba(164, 164, 164,0.05) 100%),linear-gradient(249deg, rgba(248, 248, 248,0.05) 0%, rgba(248, 248, 248,0.05) 32%,rgba(148, 148, 148,0.05) 32%, rgba(148, 148, 148,0.05) 35%,rgba(202, 202, 202,0.05) 35%, rgba(202, 202, 202,0.05) 51%,rgba(181, 181, 181,0.05) 51%, rgba(181, 181, 181,0.05) 100%),linear-gradient(92deg, hsl(214,0%,11%),hsl(214,0%,11%));
    box-shadow: -1px 3px 10px -1px rgba(73,73,79,1);
    width: 100%;
    padding: 30px;
`

const AdManager = () => {
  return (
    <Grid 
        container 
        spacing={2} 
        md={8} 
        style={{ margin: '100px auto' }}
    >
        <StyledCard>
            <Grid direction='row' style={{display: "flex", justifyContent: "space-between"}}>
                <StyledButton>Get Media Sources</StyledButton>
                <StyledButton>Get Ad Sets</StyledButton>
            </Grid>
            <div style={{ borderBottom: '3px solid white', width: '100%', height: '30px' }} />
            <Grid>
                <Grid>
                    <Grid>
                        <FormControlLabel
                            label={<Typography style={{fontSize: '25px'}}>Apples</Typography>}
                            control={<Checkbox
                                defaultChecked
                                aria-label="Apple"
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                        <FormControlLabel
                            style={{marginLeft: '50%'}}
                            label={<Typography style={{fontSize: '25px'}}>Apples Ad</Typography>}
                            control={<Checkbox
                                defaultChecked
                                aria-label="Apple Ad"
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                        <br />
                        <FormControlLabel
                            label={<Typography style={{fontSize: '25px'}}>Oranges</Typography>}
                            control={<Checkbox
                                defaultChecked
                                aria-label="Orange"
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                        <FormControlLabel
                            style={{marginLeft: '48.3%'}}
                            label={<Typography style={{fontSize: '25px'}}>Oranges Ad</Typography>}
                            control={<Checkbox
                                defaultChecked
                                aria-label="Orange Ad"
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                        <br />
                        <FormControlLabel
                            label={<Typography style={{fontSize: '25px'}}>Grapes</Typography>}
                            control={<Checkbox
                                defaultChecked
                                aria-label="Grapes"
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                        <FormControlLabel
                            style={{marginLeft: '49.5%'}}
                            label={<Typography style={{fontSize: '25px'}}>Grapes Ad</Typography>}
                            control={<Checkbox
                                defaultChecked
                                aria-label="Grapes Ad"
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                        <br />
                        <FormControlLabel
                            label={<Typography style={{fontSize: '25px'}}>Banana</Typography>}
                            control={<Checkbox
                                defaultChecked
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                        <FormControlLabel
                            style={{marginLeft: '49%'}}
                            label={<Typography style={{fontSize: '25px'}}>Banana Ad</Typography>}
                            control={<Checkbox
                                defaultChecked
                                sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: 'rgba(111, 100, 207)',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 40 } 
                                }}
                            />}
                        />
                    </Grid>
                </Grid>

            </Grid>
        </StyledCard>
    </Grid>
  );
};

export default AdManager;
