import { Grid, Paper } from "@mui/material";
import { ILocation } from "../Pages/Locations";
import { IPart } from "../Pages/Parts";
import CardPart from "./Card";

interface CardListProps extends React.PropsWithChildren<{}> {
    parts?: IPart[];
    locations?: ILocation[];
    // add more props here
}

export default function CardList(props: CardListProps) {
    const { parts, locations } = props
    return (
        <Grid container spacing={2} justifyContent='space-between'>
            {
                parts?.map(part => <CardPart  key={part._id} part={part} />)
                // locations?.map(part => <CardLocation locations={locations} />)
            }
        </Grid>
    )
}