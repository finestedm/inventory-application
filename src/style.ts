import { createTheme } from "@mui/material";

export let theme = createTheme({})

theme = createTheme(theme, {
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: '1.2rem',
                    border: `2px solid ${theme.palette.grey[200]}`,
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
                    boxShadow: `0 0 .5rem ${theme.palette.grey[300]}`,
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    '&.breadcrumbs-container': {

                        borderBottom: '1px solid',
                        borderColor: theme.palette.grey[300],
                        boxShadow: `0 0 .5rem ${theme.palette.grey[300]}`,
                    }
                }
            }
        }
    }
})