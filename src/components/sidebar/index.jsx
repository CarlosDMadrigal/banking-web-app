import React from 'react'
import {
 Grid,
 Drawer,
 CssBaseline,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
 root: {
  display: 'flex',
 },
 drawer: {
  [theme.breakpoints.up('sm')]: {
   width: drawerWidth,
   flexShrink: 0,
  },
 },
 appBar: {
  [theme.breakpoints.up('sm')]: {
   width: `calc(100% - ${drawerWidth}px)`,
   marginLeft: drawerWidth,
  },
 },
 menuButton: {
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
   display: 'none',
  },
 },
 toolbar: theme.mixins.toolbar,
 drawerPaper: {
  width: drawerWidth,
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
}))

function SideBar(props) {
 const { match, history, container } = props
 const classes = useStyles()
 const theme = useTheme()
 const [mobileOpen, setMobileOpen] = React.useState(false)
 const views = [
  {
   name: 'Home',
   url: '/home',
   icon: <HomeIcon />,
  },
  {
   name: 'Currency Accounts',
   url: '/accounts',
   icon: <AccountBalanceIcon />,
  },
 ]

 const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen)
 }

 const drawer = (
  <Grid component="div">
   <Grid component="div" className={classes.toolbar} />
   <List>
    {views.map((view, index) => (
     <ListItem button key={index}>
      <ListItemIcon>{view.icon}</ListItemIcon>
      <ListItemText primary={view.name} />
     </ListItem>
    ))}
   </List>
  </Grid>
 )

 return (
  <Grid component="div">
   <CssBaseline />
   <AppBar position="fixed" className="header">
    <Toolbar>
     <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      className={classes.menuButton}
     >
      <MenuIcon />
     </IconButton>
     <Typography variant="h6" noWrap></Typography>
    </Toolbar>
   </AppBar>
   <nav className={classes.drawer} aria-label="mailbox folders">
    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    <Hidden smUp implementation="css">
     <Drawer
      container={container}
      variant="temporary"
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
       paper: classes.drawerPaper,
      }}
      ModalProps={{
       keepMounted: true, // Better open performance on mobile.
      }}
     >
      {drawer}
     </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
     <Drawer
      classes={{
       paper: classes.drawerPaper,
      }}
      variant="permanent"
      open
     >
      {drawer}
     </Drawer>
    </Hidden>
   </nav>
  </Grid>
 )
}
export default SideBar
