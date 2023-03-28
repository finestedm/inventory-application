import { Grid, Paper } from "@mui/material";
import { ILocation } from "../Pages/Locations";
import { IPart } from "../Pages/Parts";
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
        <Grid container spacing={2}>
            {
                parts?.map(part => <CardPart key={part._id} part={part} />)
            }
            
            {
                locations?.map(location => <CardLocation key={location._id} location={location} />)
            }
        </Grid>
    )
}