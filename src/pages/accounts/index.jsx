import React from 'react'
import {
 Grid,
 Paper,
 Box,
 List,
 ListItem,
 Button,
 Divider,
 ListSubheader,
} from '@material-ui/core'
import { useAccounts } from '../../hooks/useAccounts'

function AccountsPage(props) {
 const { history } = props
 const id = sessionStorage.getItem('userId')
 const jwt = sessionStorage.getItem('jwt')
 let { accounts } = useAccounts(id, jwt)
 const handleClick = accountKey => event => {
  history.push(`/dashboard/movements/${accountKey}`)
 }
 const handleClickNewAccount = () => {
  history.push(`/dashboard/account/`)
 }
 return (
  <Grid className="accounts" container item md={11} spacing={4}>
   <Grid item md={12}>
    <Grid
     item
     container
     elevation={1}
     className=" card"
     component={Paper}
     justify="center"
     alignItems="center"
    >
     <Grid item md={12} container className="accounts__head">
      <Grid
       container
       component={Box}
       fontSize="h6.fontSize"
       fontWeight="fontWeightMedium"
       className="accounts__title  title"
       item
       alignItems="flex-end"
       xs={12}
       md={6}
      >
       Your Accounts
      </Grid>
      <Grid item xs={12} md={6} container justify="flex-end">
       <Button
        variant="contained"
        className="accounts__list-button"
        disableElevation
        size="large"
        onClick={handleClickNewAccount}
       >
        Open a new account
       </Button>
      </Grid>
     </Grid>
     <Grid item container>
      <List className="accounts__list">
       <ListSubheader className="list-header">
        <Divider component="li" className="accounts__divider" />
        <ListItem role={undefined} dense className="accounts__list-item">
         <Grid container justify="center" alignItems="center">
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={6}
           md={2}
          >
           Account Number{` `}
          </Grid>
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={6}
           md={4}
          >
           Name
          </Grid>
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={6}
           md={2}
          >
           Currency{` `}
          </Grid>
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={6}
           md={2}
          >
           Balance
          </Grid>

          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={12}
           md={2}
          ></Grid>
         </Grid>
        </ListItem>
        <Divider component="li" className="accounts__divider" />
       </ListSubheader>
       {accounts &&
        accounts.length > 0 &&
        accounts.map(value => {
         return (
          <ListItem
           key={value.id}
           role={undefined}
           dense
           className="accounts__list-item"
          >
           <Grid container alignItems="center">
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={6}
             md={2}
            >
             {value.accountKey}
            </Grid>
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={6}
             md={4}
            >
             {value.name}
            </Grid>
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={6}
             md={2}
            >
             {`(${value.currency})`}
            </Grid>
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={6}
             md={2}
            >
             {`${value.currency === 'USD' ? '$' : '₡'} ${value.balance}`}
            </Grid>
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={6}
             md={2}
            >
             <Button
              variant="contained"
              className="accounts__list-button"
              disableElevation
              item
              md={1}
              size="large"
              onClick={handleClick(value.accountKey)}
             >
              Movements
             </Button>
            </Grid>
           </Grid>
          </ListItem>
         )
        })}
       <Divider component="li" className="accounts__divider" />
      </List>
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

export default AccountsPage
