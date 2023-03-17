import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default function TopBar() {
    
    return (
        <Box sx={{ flexGrow: 1}} >
            <AppBar position="static" sx={{backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid gray' }}>
                <Toolbar>
                    <Button href='/'>
                        <Typography variant="h5" component="div" color='text.primary' sx={{ flexGrow: 1, fontWeight: 700}}>
                            Untitled store
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}