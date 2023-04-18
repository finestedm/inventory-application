import { createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

export let theme = createTheme({})

//shadows
const shadowColor = 'hsla(220, 43%, 11%, 5%)'
const shadowColorLg = 'hsla(220, 43%, 11%, 8%)'

const shadow1 = `0px 1px 2px ${shadowColor}`
const shadow2 = `0px 2px 4px ${shadowColorLg}`
const shadow3 = `0px 5px 10px ${shadowColorLg}`
const shadow4 = `0px 8px 15px ${shadowColorLg}`

//borders
const borderStandard = `1px solid ${theme.palette.grey[200]}`
const borderRadiusStandard = '.75rem'


theme = createTheme(theme, {

    customShadows: {
        standard: shadow1
    },

    customBorder: {
        radius: {
            standard: borderRadiusStandard
        },
        standard: borderStandard
    },

    shadows: [
        "none",
        shadow1,
        shadow2,
        shadow3,
        shadow4,
        ...Array(20).fill('none')
    ],

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadiusStandard,
                    // border: borderStandard,
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '.5rem',
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
                    borderColor: borderStandard,
                    backgroundColor: 'white',
                    boxShadow: 2,
                    color: 'black',
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
