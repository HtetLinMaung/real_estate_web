import React, { Fragment, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { Collapse } from "@material-ui/core";
import { rootContext } from "../providers/RootProvider";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuIcon: {
    fontSize: 18,
    color: "#68727C",
    margin: "0 1.7rem 0 .7rem;",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Layout({ children }) {
  const history = useHistory();
  const [state, dispatch] = useContext(rootContext);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch({ type: "INIT_MENUS", payload: [] });
  }, [dispatch]);

  const lookRecursive = (id, menus) => {
    const children = menus.filter((m) => m.parentId === id);

    for (const child of children) {
      if (child.isParent) {
        child.children = lookRecursive(child._id, menus);
      }
    }
    return children.map((menu) => (
      <Fragment key={menu._id}>
        <ListItem
          className={classes.nested}
          button
          onClick={() => {
            dispatch({ type: "TOGGLE_OPEN", payload: menu._id });
            setOpen(true);
            if (!menu.isParent) {
              history.push(menu.url);
            }
          }}
        >
          <i className={clsx(classes.menuIcon, menu.icon)}></i>
          <div style={{ flex: 1 }}>{menu.menuName}</div>
          {menu.isParent ? menu.open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
        {menu.isParent ? (
          <Collapse in={menu.open} timeout="auto" unmountOnExit>
            <List className={classes.nested}>{menu.children}</List>
          </Collapse>
        ) : null}
      </Fragment>
    ));
  };

  const generateMenuUI = () =>
    state.menus
      .filter((m) => m.isParent && m.parentId === "-")
      .map((menu) => (
        <Fragment key={menu._id}>
          <ListItem
            button
            onClick={() => {
              dispatch({ type: "TOGGLE_OPEN", payload: menu._id });
              setOpen(true);
            }}
          >
            <i className={clsx(classes.menuIcon, menu.icon)}></i>
            <div style={{ flex: 1 }}>{menu.menuName}</div>
            {menu.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={menu.open} timeout="auto" unmountOnExit>
            <List>{lookRecursive(menu._id, state.menus)}</List>
          </Collapse>
        </Fragment>
      ));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch({
      type: "SET_STATE",
      payload: { menus: state.menus.map((m) => ({ ...m, open: false })) },
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TechHype
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>{generateMenuUI()}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
