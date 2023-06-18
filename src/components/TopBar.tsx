import { AppBar, Button, Container, FormControl, Stack, SvgIcon, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import logo from '../images/logo.svg'


export default function TopBar() {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsAtTop(scrollTop === 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <AppBar position="sticky" sx={{ height: isAtTop ? '5rem' : '3rem', transition: 'all .25s ease' }}>
            <Container maxWidth="xl" sx={{ flexGrow: 1, display: "flex" }}>
                <Toolbar variant="dense" disableGutters sx={{ width: '100%' }}>
                    <Stack direction='row' sx={{ flexGrow: 1, display: "flex", alignItems: "center" }} spacing={4}>
                        <Typography variant="h5" component="a" href="/" color="text.primary" sx={{ flexGrow: 1, fontWeight: 700, me: 'auto' }}>
                            Untitled
                        </Typography>
                        <FormControl component={Stack}>
                            <TextField
                                sx={{minWidth: '3ch'}}
                                size='small'
                                placeholder='Search'
                            />
                        </FormControl>
                        <Stack alignItems="center">
                            <div style={{ backgroundImage: `url(${logo})`, width: '100%', minHeight: '32px', aspectRatio: '1/1' }} />
                            {isAtTop ? <Typography sx={{ visibility: isAtTop ? 'visible' : 'collapse', transition: 'all .25s ease' }}>Icon</Typography> : ''}
                        </Stack>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}