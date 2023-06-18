import { AppBar, Button, Container, FormControl, InputAdornment, Stack, SvgIcon, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import logo from '../images/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, clearSearchPhrase, setSearchPhrase } from '@/features/modalSlide';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function TopBar() {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsAtTop(scrollTop === 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const dispatch = useDispatch();
    const searchData = useSelector((state: RootState) => state.search.searchPhrase);

    useEffect(() => {
        console.log(searchData)

    }, [searchData])

    return (
        <AppBar position="sticky" sx={{ height: isAtTop ? '5rem' : '3rem', transition: 'all .25s ease' }}>
            <Container maxWidth="xl" sx={{ flexGrow: 1, display: "flex" }}>
                <Toolbar variant="dense" disableGutters sx={{ width: '100%' }}>
                    <Stack direction='row' sx={{ flexGrow: 1, display: "flex", alignItems: "center" }} spacing={4}>
                        <Typography variant="h5" component="a" href="/" color="text.primary" sx={{ flexGrow: 1, fontWeight: 700, me: 'auto' }}>
                            Untitled
                        </Typography>
                        <FormControl component={Stack}>
                            <TextField
                                size='small'
                                placeholder='Search'
                                value={searchData}
                                onChange={e => dispatch(setSearchPhrase(e.target.value))}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {(searchData) ? 
                                                <ClearIcon
                                                    onClick={() => dispatch(clearSearchPhrase())}
                                                />
                                                :
                                                <SearchIcon />
                                            }
                                        </InputAdornment>
                                    ),
                                  }}
                            />
                        </FormControl>
                        <Stack alignItems="center">
                            <div style={{ backgroundImage: `url(${logo})`, width: '100%', minHeight: '32px', aspectRatio: '1/1' }} />
                            {isAtTop ? <Typography sx={{ visibility: isAtTop ? 'visible' : 'collapse', transition: 'all .25s ease' }}>Icon</Typography> : ''}
                        </Stack>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}