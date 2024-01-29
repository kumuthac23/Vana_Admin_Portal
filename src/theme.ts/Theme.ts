import { blue, green, orange, purple, red, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: purple,
        secondary: orange,
        success: teal,
        info: blue,
        warning: green,
        error: red,
    },
    components: {
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "teal",
                    color: "white"
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    textAlign: "center"
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    fontSize: "1rem"
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    color: purple[500], // Use the primary color from your palette
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    color: "#333",
                    fontSize: "2rem",
                    fontWeight: "500"
                },
                h2: {
                    color: "#555",
                    fontSize: "1.5rem",
                    fontWeight: "400"
                },
            }
        }
    }
});