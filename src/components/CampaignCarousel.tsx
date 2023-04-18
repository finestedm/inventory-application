import { Button, Container, Paper } from '@mui/material'
import AMDCampaign from '../images/kUXqwojSyjxLhuni9Uw2uU-970-80.png.webp'
import Carousel from 'react-material-ui-carousel';

interface Iitem {
    name: string;
    description: string;
}


export default function CampaignCarousel() {

    {
        var items: Iitem[] = [
            {
                name: "Random Name #1",
                description: "Probably the most random thing you have ever seen!"
            },
            {
                name: "Random Name #2",
                description: "Hello World!"
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


function Item(props: { item: Iitem }) {
    return (
        <div style={{ backgroundImage: `url(${AMDCampaign})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '100%', paddingTop: '1rem' }}>
            <Container maxWidth='xl'>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>

                <Button className="CheckButton">
                    Check it out!
                </Button>
            </Container>
        </div>
    )
}