import { Grid, Pagination, Paper, Stack } from "@mui/material";
import { ILocation, IPart } from "./interfaces";
import CardPart from "./CardPart";
import CardLocation from "./CardLocation";

interface CardListProps extends React.PropsWithChildren<{}> {
    parts?: IPart[];
    locations?: ILocation[];
    // add more props here
}

export default function CardList(props: CardListProps) {
    const { parts, locations } = props
    return (
        <Grid container spacing={4} flex={1} justifyContent='center'>
            {
                <Grid container item direction='row' spacing={2}>{parts?.map(part => <CardPart key={part._id} part={part} />)}</Grid>
            }
            
            {
                <Grid container item direction='row' spacing={2}>{locations?.map(location => <CardLocation key={location._id} location={location} />)}</Grid>
            }
        </Grid>
    )
}