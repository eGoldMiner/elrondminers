import {createTheme} from "@mui/material";
import {enUS} from "@mui/material/locale";

const theme = createTheme({
    palette: {
        primary: {
            main: '#415e74',
        },
        secondary: {
            main: '#eaba20'
        }
    },
    typography: {
        h1: {
            fontSize: "1.875rem",
            fontWeight: 600,
            fontFamily: "'Alatsi', sans-serif"
        },
        h2: {
            fontSize: "1.563rem",
            fontWeight: 600,
            fontFamily: "'Alatsi', sans-serif"
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 600,
            fontFamily: "'Alatsi', sans-serif"
        },
        h4: {
            fontSize: "1.4rem",
            fontFamily: "'Alatsi', sans-serif"
        },
        h5: {
            fontSize: "1.3rem",
            fontFamily: "'Alatsi', sans-serif"
        },
        h6: {
            fontSize: "1.2rem",
            fontFamily: "'Alatsi', sans-serif"
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 300,
            fontFamily: "'Alatsi', sans-serif",
            marginBottom: 0
        }
    },
    zIndex: {
        appBar: 1000
    }
}, enUS)
export default theme;
