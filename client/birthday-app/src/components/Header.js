import { useState, useContext, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from '../context/authContext';

const Header = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation(); 
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const logout = () => {
        localStorage.removeItem('token');
        authContext.logout();
        navigate('/');
    };

    useEffect(() => {
        if (location.pathname === "/votes") {
            setValue(0);
        } else if (location.pathname === "/finished") {
            setValue(1);
        } else if (location.pathname === "/new") {
            setValue(2);
        } else if (location.pathname === "/myvotes") {
            setValue(3);
        }
    }, [location]); 

    return (
        <>
            <Grid
                container
                justifyContent="space-between"
                spacing={2}
                alignItems={!isDesktop && "center"}
                pt={2.5}
                pb={2.5}
                direction={!isDesktop ? "column" : "row"}
            >
                <Grid container item>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {
                                display: "none",
                            },
                        }}
                        sx={{
                            "& .MuiTabs-flexContainer": {
                                flexWrap: "wrap",
                            },
                        }}
                    >
                        <Tab label="Active votes" component={Link} to="/votes" />
                        <Tab label="Finished votes" component={Link} to="/finished" />
                        <Tab label="Create new vote" component={Link} to="/new" />
                        <Tab label="Terminate vote" component={Link} to="/myvotes" />
                    </Tabs>
                </Grid>
                <Box
                    onClick={() => logout()}
                    sx={{
                        color: "primary.main",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "none",
                        marginRight: "10px",
                        cursor: "pointer",
                    }}
                >
                    LOGOUT
                </Box>
            </Grid>
            <Divider />
        </>
    );
};

export default Header;