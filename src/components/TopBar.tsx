import { AppBar, Button, Container, FormControl, InputAdornment, Stack, SvgIcon, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import logo from '../images/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchPhrase, setSearchPhrase } from '@/features/searchSlice';
import { RootState } from '@/features/combineReducer';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
    const [isAtTop, setIsAtTop] = useState(true);
    const navigate = useNavigate();

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

    return (
        <AppBar position="sticky" sx={{ height: isAtTop ? '5rem' : '3rem', transition: 'all .25s ease' }}>
            <Container maxWidth="xl" sx={{ flexGrow: 1, display: "flex" }}>
                <Toolbar variant="dense" disableGutters sx={{ width: '100%' }}>
                    <Stack direction='row' sx={{ display: "flex", alignItems: "center", width: '100%' }} spacing={4}>
                        <div style={{ backgroundImage: `url(${logo})`, height: '32px', aspectRatio: '1/1' }} />
                        <Typography variant="h5" component="a" href="/" color="text.primary" sx={{ fontWeight: 700, pt: '.5rem' }} style={{ marginRight: 'auto' }}>
                            Untitled
                        </Typography>
                        <FormControl component={Stack}>
                            <TextField
                                size='small'
                                placeholder='Search'
                                value={searchData}
                                onChange={e => dispatch(setSearchPhrase(e.target.value))}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        navigate(`/catalog/search?query=${encodeURIComponent(searchData)}`);
                                    }
                                }}
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
                        <Stack alignItems="center" >
                            <Button variant='outlined'>
                                <ShoppingCartOutlinedIcon />
                            </Button>
                            {/* {isAtTop ? <Typography sx={{ visibility: isAtTop ? 'visible' : 'collapse', transition: 'all .25s ease' }}>Cart</Typography> : ''} */}
                        </Stack>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}