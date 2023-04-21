import { Box, Link, Breadcrumbs, Typography, Stack, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from '../style'

export default function BreadcrumbsComponent(): JSX.Element {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pathnames = pathname.split("/").filter(Boolean);


    return (
        <Box className='breadcrumbsBox' sx={{ height: '3rem', boxShadow: 3, display: "flex", alignItems: "center", position: 'relative', zIndex: 10, backgroundColor: "white" }}>
            <Container maxWidth='xl'>
                <Breadcrumbs separator="›" aria-label='breadcrumb'>
                    {pathnames.length ?
                        (
                            <Link onClick={() => navigate("/")}>Home</Link>
                        ) : (
                            <Typography> Home </Typography>
                        )
                    }
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        return isLast ?
                            (
                                <Typography key={name}>{name}</Typography>
                            ) : (
                                <Link key={name} onClick={() => navigate(routeTo)}>
                                    {name}
                                </Link>
                            )
                    })}
                </Breadcrumbs>
            </Container>
        </Box>
    )
}