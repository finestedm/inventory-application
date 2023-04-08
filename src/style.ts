import { createTheme } from "@mui/material";

export let theme = createTheme({})

theme = createTheme(theme, {
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: '.5rem',
                    border: `1px solid ${theme.palette.grey[200]}`,
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 0,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '.75rem',
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.palette.grey[200]
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid',
                    borderColor: theme.palette.grey[300],
                    backgroundColor: 'white',
                    boxShadow: 'none'
                }
            }
        },
        MuiBox: {
            '&.breadcrumbs-box': {
                styleOverrides: {
                    root: {
                        borderBottom: '1px solid',
                        borderColor: theme.palette.grey[300],
                        marginBottom: '1rem',
                        paddingTop: '.25rem',
                        paddingBottom: '.25rem'
                    }
                }
            }
        }
    }
})