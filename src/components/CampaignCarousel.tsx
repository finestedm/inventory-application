import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import AMDCampaign from '../images/kUXqwojSyjxLhuni9Uw2uU-970-80.png.webp'
import Intel from '../images/intel.jpg'
import Asus from '../images/asus.jpg'
import Carousel from 'react-material-ui-carousel';
import { ICampaignItem } from './interfaces';

export default function CampaignCarousel() {

    {
        var items: ICampaignItem[] = [
            {
                name: "New Intel Notebooks",
                description: "Check the available configurations!",
                image: Intel
            },
            {
                name: "Asus",
                description: "Hello World!",
                image: Asus
            },
            {
                name: "New AMD graphic cards",
                description: "Best experience possible",
                image: AMDCampaign
            }
        ]

        return (
            <Carousel
                height='25rem'
                animation='slide'
                duration={750}
                sx={{ position: 'relative' }}
                indicatorContainerProps={{
                    style: {
                        position: 'relative',
                        bottom: 0,
                        paddingBottom: '1rem',
                        transform: 'translate(0%, -50%)',
                        zIndex: 10
                    }
                }}
                indicatorIconButtonProps={{
                    style: { color: 'gray' }
                }}
                activeIndicatorIconButtonProps={{
                    style: { color: 'white' }
                }}
            >
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        )
    }
}


function Item(props: { item: ICampaignItem }) {
    return (
        <div style={{ backgroundImage: `url(${props.item.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '100%', paddingTop: '1rem', position: 'relative' }}>
            <Container maxWidth='xl' sx={{ position: 'absolute', bottom: '10%' }}>
                <Stack>
                    <Typography variant='h3'>{props.item.name}</Typography>
                    <Typography variant='h4'>{props.item.description}</Typography>
                </Stack>
            </Container>
        </div>
    )
}