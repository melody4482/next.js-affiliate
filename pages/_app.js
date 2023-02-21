import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import '../styles/index.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../mui.config.theme'
import { AppWrapper } from '../context/AppContext';
import {
    Button,
    Typography,
    Toolbar,
    AppBar,
    IconButton,
    Drawer,
    Box,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import sidebarConfig from '../app/config/sidebarConfig';

// import Header from '../app/components/layouts/Header'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const [state, setState] = React.useState({
        sidebarOpen: false,
    });
    const router = useRouter();

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, sidebarOpen: open})
    }

    const SidebarList = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {sidebarConfig.map(item => (
                    <ListItem key={item.index} disablePadding>
                        <ListItemButton onClick={() => router.push(`/${item.route}`)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <AppWrapper>
                {/*<React.Fragment>
                    <Drawer
                        anchor={"left"}
                        open={state.sidebarOpen}
                        onClose={toggleDrawer(false)}
                    >
                        {SidebarList('left')}
                    </Drawer>
                </React.Fragment>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Image width={50} height={50} style={{margin: '10px auto'}} src={"/logo.png"} />
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
    </Box>*/}
                <Component {...pageProps} />
            </AppWrapper>
        </ThemeProvider>
    )
}
