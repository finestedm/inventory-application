import { Box, Grid, Pagination, Paper, Stack } from "@mui/material";
import { ILocation, IPart } from "./interfaces";
import CardPlaceholder from "./CardPartPlaceholder";
import CardComponent from "./CardComponent";

interface CardListProps extends React.PropsWithChildren<{}> {
    parts?: IPart[];
    locations?: ILocation[];
    perPage?: number;
    placeholder?: boolean;
    // add more props here
}

export default function CardList(props: CardListProps) {
    const { parts, locations, perPage, placeholder } = props

    if (placeholder) {
        return (
            <Box>
                <Grid container spacing={4} flex={1} justifyContent='center'>
                    <Grid container item direction='row' spacing={2}>
                        {Array(perPage)
                            .fill(null)
                            .map((_, index) => <CardPlaceholder key={index} />)
                        }
                    </Grid>
                </Grid>
            </Box>
        )
    } else {
        return (
            <Box>
                <Grid container spacing={4} flex={1} justifyContent='center'>
                    <Grid container item direction='row' spacing={2}>
                        {parts && parts.length > 0 ?
                            parts?.map(part => <CardComponent key={part._id} part={part} />)
                            :
                            <h1>Nothing found</h1>
                        }
                    </Grid>
                    <Grid container item direction='row' spacing={2}>
                        {locations?.map(location => <CardComponent key={location._id} location={location} />)}
                    </Grid>
                </Grid>
            </Box>
        )
    }
}