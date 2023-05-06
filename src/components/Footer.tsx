import { Box, Stack, Typography, Container, useTheme, Grid } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export default function Footer(): JSX.Element {
    const theme = useTheme();
    return (
        <Box component='footer' sx={{ backgroundColor: `${blueGrey[900]}`, color: 'white', pb: 2, pt: 4, mt: 'auto' }}>
            <Container maxWidth="xl">
                <Grid container className="footer--stack-top" direction='row' flex={1} justifyContent='space-between' spacing={2}>
                    <Grid item xs={12} sm={6} md={8}>
                        <img alt="Logo" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack className="footer--stack-nav" direction='row' justifyContent='space-between' spacing={5}>
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
                    </Grid>
                </Grid>
                <Stack direction='row' flex={1}>
                    <p style={{ marginRight: 'auto' }}>all right reserved blablabla</p>
                    <a>Instagram Link</a>
                    <a>Facebook link</a>
                </Stack >
            </Container>

        </Box>
    )
}