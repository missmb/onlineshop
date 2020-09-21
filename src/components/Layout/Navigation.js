import React, { useContext,useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import apiItem from '../../action/ItemAction';

import clsx from 'clsx';
import {makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";

import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  nav: {
    marginBottom: 80
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navigation() {
  const { userData, setUserData } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ProfileCover, setProfileCover] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [Search, setSearch] = useState("")

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();

  const [items, setItems] = useState([]);

  const loadItem = async () => {
    const ItemsData = await apiItem.getItems();
    setItems(ItemsData.data)
  };

  useEffect(() => {
    loadItem()
  },[])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toRegister = () => history.push("/register");
  const toLogin = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  const gotoprofile = () => {
    if (userData.user.username == null) {
     console.log("nothong user")
    } else {
      window.location.href = "/users/" + userData.user.username ;
    }
  };

  const handleSearch = async (e) => {
    history.push("/search/"+ Search);
  };
  
  const menuId = 'primary-search-account-menu';
  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
        <img
                  className="img-profile-card"
                  src={ProfileCover}
                  alt=""
                />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.nav}>
         <div className={classes.grow}>
         <CssBaseline />
         <AppBar
           position="fixed"
           className={clsx(classes.appBar, {
             [classes.appBarShift]: open,
           })}
         >
           <Toolbar>
             <Typography variant="h6" noWrap button component={Link} to="/" style={{color: 'white'}} className={clsx(classes.menuButton, open && classes.hide)}>
               onlineShop
             </Typography>
             <div style={{ width: 300 }}> 
            <form onSubmit={handleSearch}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              onInputChange={(event, newInputValue) => {
                setSearch(newInputValue); console.log(newInputValue)
              }}
              options={items.map((option) => option.name)}
              renderInput={(params) => (
                <TextField {...params} label="Search Product" margin="normal" variant="outlined" 
                onChange={(e) => setSearch(e.target.value)}/>
              )}
            />
            </form>
          </div>
             <div className={classes.grow} />
             <div className={classes.sectionDesktop}>
               <IconButton aria-label="show 4 new mails" color="inherit" >
                 <Badge badgeContent={4} color="secondary">
                   <QuestionAnswer/>
                 </Badge>
               </IconButton>
               <IconButton aria-label="show 17 new notifications" color="inherit">
                 <Badge badgeContent={17} color="secondary">
                   <NotificationsIcon />
                 </Badge>
               </IconButton>
               <IconButton
                 edge="end"
                 aria-label="account of current user"
                 aria-controls={menuId}
                 aria-haspopup="true"
                 onClick={handleProfileMenuOpen}
                 color="inherit"
               >
                 
                 <IconButton
                 aria-label="Account"
                 color="inherit"
               >
                 <AccountCircle  />
               </IconButton>  
                   <IconButton
                 aria-label="Account"
                 color="inherit"
               ></IconButton>
               </IconButton>
             </div>
             <div className={classes.sectionMobile}>
               <IconButton
                 aria-label="show more"
                 aria-controls={mobileMenuId}
                 aria-haspopup="true"
                 onClick={handleMobileMenuOpen}
                 color="inherit"
               >
                 <MoreIcon />
               </IconButton>
             </div>
           </Toolbar>
         </AppBar>
         {renderMobileMenu}
         { userData.user == null ? 
         <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMenuOpen}
         onClose={handleMenuClose}
       >
         <MenuItem onClick={toLogin}>Login</MenuItem>
         <MenuItem onClick={toRegister}>Register</MenuItem>
       </Menu> :
         <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMenuOpen}
         onClose={handleMenuClose}
       >
         <MenuItem onClick={gotoprofile}>Profile</MenuItem>
         <MenuItem onClick={handleMenuClose}>My account</MenuItem>
         <MenuItem onClick={logout}>LogOut</MenuItem>
       </Menu> }
    </div>
    </div>
  );
}
