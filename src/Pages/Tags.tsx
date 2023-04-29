import TagCloud from "@/components/TagCloud";
import { setTagEditModalOpen } from "@/features/modalSlide";
import { Button, Container, Menu, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function Tags(): JSX.Element {

    const dispatch = useDispatch();

    return (
        <Container maxWidth='xl' sx={{ py: 5 }}>
            <Typography variant="h4">List of Tags</Typography>
            <Button onClick={() => dispatch(setTagEditModalOpen(true))}> Add new tag </Button>
            <TagCloud />
        </Container>
    )

}