import { Box, Stack, Typography } from "@mui/material";

export default function Footer(): JSX.Element {
    return (
        <Box component='footer'>
            <Stack className="footer--stack-top" direction='row'>
                <img alt="Logo"></img>
            </Stack>
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
            <Stack direction='row'>
                <p>all right reserved blablabla</p>
                <a>Instagram Link</a>
                <a>Facebook link</a>
            </Stack >
        </Box>
    )
}