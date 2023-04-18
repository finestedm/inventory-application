import { createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

export let theme = createTheme({})

//shadows
const shadowStandard = `${theme.palette.grey[400]} 0px 2px 4px`

//borders
const borderStandard = `1px solid ${theme.palette.grey[200]}`
const borderRadiusStandard = '.75rem'


theme = createTheme(theme, {

    customShadows: {
        standard: shadowStandard
    },

    customBorder: {
        radius: {
            standard: borderRadiusStandard
        },
        standard: borderStandard
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: borderRadiusStandard,
                    border: borderStandard,
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
                    borderRadius: borderRadiusStandard,
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: borderStandard
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid',
                    borderColor: borderStandard,
                    backgroundColor: 'white',
                    boxShadow: shadowStandard,
                    height: '5rem',
                }
            }
        },
        MuiBox: {
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
})
console.log(theme)
