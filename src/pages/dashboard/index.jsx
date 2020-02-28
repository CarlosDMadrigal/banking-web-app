import React from 'react'
import { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import SideBar from '../../components/sidebar'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../home'
import AccountsPage from '../accounts'
import MovementsPage from '../movements'
import CreateAccountPage from '../createAccount'

function DashBoardPage(props) {
 const { history } = props
 useEffect(() => {
  !('jwt' in sessionStorage) && history.push('/login')
 })
 return (
  <Grid>
   <SideBar />
   <Switch>
    <Route path="/dashboard/movements/:id" component={MovementsPage} />
    <Route path="/dashboard/home" component={HomePage} />
    <Route path="/dashboard/accounts" component={AccountsPage} />
    <Route path="/dashboard/account" component={CreateAccountPage} />
    <Route path="/dashboard/" component={HomePage} />
   </Switch>
  </Grid>
 )
}

export default DashBoardPage
