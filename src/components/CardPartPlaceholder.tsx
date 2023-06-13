import { Box, Card, CardActions, CardContent, Button, Typography, Skeleton, Paper, Grid, useTheme, Link, CardActionArea, Stack, Menu, MenuItem, CardMedia } from '@mui/material'

export default function CardPlaceholder() {
    const theme = useTheme()

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ position: 'relative', height: '100%' }} >
                <CardActionArea sx={{ height: '100%' }}>
                    <CardMedia sx={{ width: '100%', height: 275, }}>
                        <Skeleton variant='rectangular' height='100%' width='100%' />
                    </CardMedia>
                    <CardContent>
                        <Box p={2}>
                            <Skeleton variant='text' sx={{ fontSize: '1.5rem', mb: '1rem' }} />
                            <Stack direction='row' justifyContent='space-between' alignItems='end'>
                                <Stack>
                                    <Skeleton variant='text' sx={{ fontSize: '1rem', mb: '.2rem' }} width='12ch' />
                                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                                </Stack>
                                <Skeleton variant='rounded' width={48} height={32} />
                            </Stack>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}