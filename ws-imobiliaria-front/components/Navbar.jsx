import React, { useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
import navbarStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import firebase from "../firebase/clientApp";
import { searchUser } from "../services/UserService";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  const router = useRouter();
  const classes = useStyles();
  const [isAuth, setIsAuth] = useState(!router.pathname.includes("Login"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const userSelector = useSelector((state) => state.UserReducer);
  const [isLogged, setIsLogged] = useState(false);
  const [userDbProperties, setUserDbProperties] = useState({});

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

  const notificationInfo = useSelector((state) => state.NotificationReducer);

  useEffect(() => {
    setIsLogged(
      firebase.auth().currentUser || localStorage.getItem("userCredentials")
    );
  }, []);

  useEffect(() => {
    setIsLogged(
      firebase.auth().currentUser || localStorage.getItem("userCredentials")
    );
  }, [userSelector.token]);

  useEffect(() => {
    setIsAuth(
      !router.pathname.includes("Login") && !router.pathname.includes("SignUp")
    );
    if (localStorage.getItem("userCredentials"))
      searchUser(
        JSON.parse(localStorage.getItem("userCredentials")).email
      ).then((resp) => setUserDbProperties(resp));
  }, [router.pathname]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ zIndex: 100001 }}
    >
      <div>
        {isLogged ? (
          <>
            {firebase.auth().currentUser && (
              <MenuItem onClick={handleMenuClose}>
                {firebase.auth().currentUser.displayName}
              </MenuItem>
            )}
            <MenuItem
              onClick={() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    localStorage.removeItem("userCredentials");
                    router.push("Login");
                  })
              }
            >
              Sair
            </MenuItem>
          </>
        ) : (
          <Button color="inherit" onClick={() => router.push("/Login")}>
            Entrar
          </Button>
        )}
      </div>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div>
        {isLogged && (
          <>
            <MenuItem>
              <IconButton
                aria-label="show 11 new notifications"
                color="inherit"
              >
                <Badge badgeContent={notificationInfo.length} color="secondary">
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
                <AccountCircle />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
          </>
        )}
      </div>
    </Menu>
  );

  return (
    <>
      {isAuth && (
        <>
          <div className={navbarStyles.navbar}>
            <AppBar position="static">
              <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                  IMOBILIÁRIA
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  {isLogged &&
                    !window.location.href.includes("PropertySearch") && (
                      <Button
                        color="inherit"
                        onClick={() => router.push("/PropertySearch")}
                      >
                        Buscar
                      </Button>
                    )}
                  {isLogged &&
                    userDbProperties.roleList &&
                    userDbProperties.roleList[0]?.id <= 2 &&
                    !window.location.href.includes("UserApprove") && (
                      <Button
                        color="inherit"
                        onClick={() => router.push("/UserApprove")}
                      >
                        Aprovação de Usuários
                      </Button>
                    )}
                  {isLogged &&
                    userDbProperties.roleList &&
                    userDbProperties.roleList[0]?.id == 1 &&
                    !window.location.href.includes("Proprietarios") && (
                      <Button
                        color="inherit"
                        onClick={() => router.push("/Proprietarios")}
                      >
                        Proprietários
                      </Button>
                    )}
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    style={{ zIndex: 100001 }}
                  >
                    <AccountCircle />
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
            {renderMenu}
          </div>
          <div className={navbarStyles.navbarSpace}></div>
        </>
      )}
    </>
  );
}
