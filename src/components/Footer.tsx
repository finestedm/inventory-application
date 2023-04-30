import { Box, Stack, Typography, Container } from "@mui/material";

export default function Footer(): JSX.Element {
    return (
        <Box component='footer' sx={{ mt: 5, py: 3, backgroundColor: '#1d1d1d' }}>
            <Container maxWidth="xl">
                <Stack className="footer--stack-top" direction='row' flex={1} justifyContent='space-between'>
                    <img alt="Logo"></img>
                    <Stack className="footer--stack-nav" direction='row'>
                        <Stack className="footer--stack-nav-1">
                            <Typography variant='h6'>Link A</Typography>
                            <a href="">Link 1</a>
                            <a href="">Link 2</a>
                            <a href="">Link 3</a>
                            <a href="">Link 4</a>
                        </Stack>
                        <Stack className="footer--stack-nav-2">
                            <Typography variant='h6'>Link B</Typography>
                            <a href="">Link 1</a>
                            <a href="">Link 2</a>
                            <a href="">Link 3</a>
                            <a href="">Link 4</a>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction='row' flex={1}>
                    <p style={{ marginRight: 'auto' }}>all right reserved blablabla</p>
                    <a>Instagram Link</a>
                    <a>Facebook link</a>
                </Stack >
            </Container>

        </Box>
    )
}