import React from 'react'
import { useState } from 'react'
import {
 Grid,
 Drawer,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
 Box,
 Menu,
 MenuItem,
 Avatar,
 Popper,
 Paper,
 ClickAwayListener,
 Grow,
 MenuList,
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

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
  backgroundColor: '#3539ac',
  color: '#ffff',
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
}))

function SideBar(props) {
 const id = sessionStorage.getItem('userId')
 const jwt = sessionStorage.getItem('jwt')
 const { user } = useUser(id, jwt)
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
 const [open, setOpen] = React.useState(false)
 const anchorRef = React.useRef(null)

 const handleToggle = () => {
  setOpen(prevOpen => !prevOpen)
 }

 const handleClose = event => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
   return
  }

  setOpen(false)
 }

 function handleListKeyDown(event) {
  if (event.key === 'Tab') {
   event.preventDefault()
   setOpen(false)
  }
 }
 const handleLogout = () => {
  sessionStorage.clear()
  history.push('/')
 }
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
    <AttachMoneyIcon />
    {APP_NAME}
   </Grid>
   <List>
    {views.map((view, index) => (
     <ListItem
      button
      key={index}
      onClick={handleClick(view.url)}
      className={`${history.location.pathname === view.url && `active-page`}`}
     >
      <ListItemIcon className="sidebar-icon">{view.icon}</ListItemIcon>
      <ListItemText primary={view.name} />
     </ListItem>
    ))}
   </List>
  </Grid>
 )

 return (
  <Grid component="div">
   <AppBar position="fixed" className="header" elevation={1}>
    <Toolbar className="header__name">
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
      <AttachMoneyIcon />
      {APP_NAME}
     </Typography>
     <Grid item container xs={0} md={2}></Grid>
     <Grid
      item
      container
      xs={7}
      md={11}
      component={Box}
      fontSize="h6.fontSize"
      fontWeight="fontWeightMedium"
      justify="space-between"
      alignItems="center"
     >
      {`Welcome, ${user && user.firstName}`}{' '}
      <IconButton
       ref={anchorRef}
       aria-label="logout"
       className="logout-button"
       onClick={handleToggle}
      >
       <Avatar className="logout-button__icon">
        {user.firstName ? user.firstName.charAt(0).toUpperCase() : ''}
       </Avatar>
      </IconButton>
      <Popper
       open={open}
       anchorEl={anchorRef.current}
       role={undefined}
       transition
       disablePortal
      >
       {({ TransitionProps, placement }) => (
        <Grow
         {...TransitionProps}
         style={{
          transformOrigin:
           placement === 'bottom' ? 'center top' : 'center bottom',
         }}
        >
         <Paper>
          <ClickAwayListener onClickAway={handleClose}>
           <MenuList
            autoFocusItem={open}
            id="menu-list-grow"
            onKeyDown={handleListKeyDown}
           >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
           </MenuList>
          </ClickAwayListener>
         </Paper>
        </Grow>
       )}
      </Popper>
     </Grid>
     <Grid item container xs={0} md={1}></Grid>
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
