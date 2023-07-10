import { createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

export let theme = createTheme({})

//shadows
const shadowColor = 'hsla(220, 43%, 11%, 5%)'
const shadowColor2 = 'hsla(220, 43%, 11%, 8%)'
const shadowColor3 = 'hsla(220, 43%, 11%, 15%)'

const shadow1 = `0px 1px 2px ${shadowColor}`
const shadow2 = `0px 2px 4px ${shadowColor2}`
const shadow3 = `0px 5px 10px ${shadowColor2}`
const shadow4 = `0px 8px 15px ${shadowColor2}`
const shadow5 = `0px 10px 20px ${shadowColor3}`
const shadow6 = `0px 12px 25px ${shadowColor3}`
const shadow7 = `0px 15px 30px ${shadowColor3}`
const shadow8 = `0px 18px 35px ${shadowColor3}`
const shadow9 = `0px 20px 40px ${shadowColor3}`
const shadow10 = `0px 23px 45px ${shadowColor3}`


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
        shadow5,
        shadow6,
        shadow7,
        shadow8,
        shadow9,
        shadow10,
        ...Array(14).fill('none')
    ],

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadiusStandard,
                    boxShadow: shadow1,
                    // border: borderStandard,
                    '&:hover': {
                        boxShadow: shadow4, // Modify the shadow on hover
                    }
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
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: '600px', // specify the desired width here
                },
            },
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
