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
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import { makeStyles } from '@material-ui/core/styles'
import { mdiPiggyBank } from '@mdi/js'
import Icon from '@mdi/react'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
 root: {
  display: 'flex',
 },
 appBar: {
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
 },
 drawer: {
  width: drawerWidth,
  flexShrink: 0,
 },
 drawerPaper: {
  width: drawerWidth,
 },
 toolbar: theme.mixins.toolbar,
 content: {
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
 },
}))

function SideBar(props) {
 const classes = useStyles()
 const { match, history } = props
 const views = [
  {
   name: 'Home',
   url: 'home',
   icon: <HomeIcon />,
  },
  {
   name: 'Currency Accounts',
   url: 'accounts',
   icon: <AccountBalanceIcon />,
  },
  {
   name: 'Notifications',
   url: 'notifications',
   icon: <NotificationsIcon />,
  },
  {
   name: 'Saving Accounts',
   url: 'savings',
   icon: (
    <Icon
     path={mdiPiggyBank}
     size={1}
     horizontal
     vertical
     rotate={180}
     color="#757575"
    />
   ),
  },
 ]
 return (
  <Grid>
   <CssBaseline />
   <Drawer
    PaperProps={{ elevation: 3 }}
    className={classes.drawer}
    variant="permanent"
    classes={{
     paper: classes.drawerPaper,
    }}
    anchor="left"
   >
    <Grid container>
     <List>
      {views.map((view, index) => (
       <ListItem button key={index}>
        <ListItemIcon>{view.icon}</ListItemIcon>
        <ListItemText primary={view.name} />
       </ListItem>
      ))}
     </List>
    </Grid>
   </Drawer>
  </Grid>
 )
}
export default SideBar
