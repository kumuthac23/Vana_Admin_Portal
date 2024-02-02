import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#bd8d67"
        },
        secondary: {
            main: "#e7d0b1"
        },

    },
    components: {
        MuiTableHead: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': {
                        fontWeight: 'bold',
                    },
                },
            },
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
                    color: "black",
                },

            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: "500",
                    textDecorationColor: "white",
                },
            },
        },
        MuiIcon: {
            styleOverrides: {
                root: { color: "#bd8d67" }
            }
        }
    }
});