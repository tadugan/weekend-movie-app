import {HashRouter as Router, Link, Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from "react";

function Navigation() {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          marginBottom: "24px",
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      }));

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
            <div className={classes.root}>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                onClick={handleClick}
                                color="inherit"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                    <MenuItem component={Link} to="/" onClick={handleClose}>
                                        Movie List
                                    </MenuItem>
                                    <MenuItem component={Link} to="/addmovie" onClick={handleClose}>
                                        Add Movie
                                    </MenuItem>
                                </Menu>
                            <Typography variant="h4" component="h1" className={classes.title}>
                                Movie List
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Router>
                {/* <ul>
                    <li>
                        <Link to="/">HOME</Link>
                    </li>
                    <li>
                        <Link to="/addmovie">ADD MOVIE</Link>
                    </li>
                </ul> */}
            </div>
    );
}

export default Navigation;