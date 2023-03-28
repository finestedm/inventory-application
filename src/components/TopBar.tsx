import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';

export default function TopBar() {
    
    return (
        <Container maxWidth='xl' sx={{ flexGrow: 1}} >
            <AppBar position="static" sx={{backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar>
                    <Button href='/'>
                        <Typography variant="h5" component="div" color='text.primary' sx={{ flexGrow: 1, fontWeight: 700}}>
                            Untitled store
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Container>
    )
}