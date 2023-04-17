import { Box, Link, Breadcrumbs, Typography, Stack, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from '../style'

export default function BreadcrumbsComponent() {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pathnames = pathname.split("/").filter(Boolean);


    return (
        <Box className='breadcrumbsBox' sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}`, py: '.25rem' }}>
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