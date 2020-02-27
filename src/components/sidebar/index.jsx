import React from 'react'
import {
 Grid,
 Drawer,
 CssBaseline,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
 Box,
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
import { APP_NAME } from '../../appConstants'
import { useUser } from '../../hooks/useUsers'
import { withRouter } from 'react-router-dom'

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
 toolbar: {
  theme: theme.mixins.toolbar,
  padding: '1rem',
 },
 drawerPaper: {
  width: drawerWidth,
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
}))

function SideBar(props) {
 const id = sessionStorage.getItem('userId')
 const { user } = useUser(id)
 const { container, history } = props
 const classes = useStyles()
 const theme = useTheme()
 const [mobileOpen, setMobileOpen] = React.useState(false)
 const views = [
  {
   name: 'Home',
   url: '/dashboard',
   icon: <HomeIcon />,
  },
  {
   name: 'Currency Accounts',
   url: '/dashboard/accounts',
   icon: <AccountBalanceIcon />,
  },
 ]

 const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen)
 }

 const handleClick = url => event => {
  history.push(url)
 }

 const drawer = (
  <Grid component="div">
   <Grid
    container
    component={Box}
    fontSize="h6.fontSize"
    fontWeight="fontWeightMedium"
    justify="flex-start"
    alignItems="center"
    className={classes.toolbar}
   >
    {APP_NAME}
   </Grid>
   <List>
    {views.map((view, index) => (
     <ListItem
      button
      key={index}
      onClick={handleClick(view.url)}
      className={history.location.pathname == view.url && `active-page`}
     >
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
   <AppBar position="fixed">
    <Toolbar className="header">
     <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      className={classes.menuButton}
     >
      <MenuIcon />
     </IconButton>
     <Typography variant="h6" noWrap>
      {APP_NAME}
     </Typography>
     <Grid
      item
      container
      xs={7}
      md={12}
      component={Box}
      fontSize="h6.fontSize"
      fontWeight="fontWeightMedium"
      justify="flex-end"
     >
      {`Welcome, ${user && user.firstName}`}
     </Grid>
    </Toolbar>
   </AppBar>
   <nav className={classes.drawer} aria-label="mailbox folders">
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
       keepMounted: true,
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
export default withRouter(SideBar)
