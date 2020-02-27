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
import { useTransactionsByAccount } from '../../hooks/useTransactions'

function MovementsPage(props) {
 const { history, match } = props
 const id = match.params.id
 let { transactions } = useTransactionsByAccount(id)
 const handleClick = accountKey => event => {
  history.push(`/detail/${accountKey}`)
 }
 return (
  <Grid className="transactions" container item md={11} spacing={4}>
   <Grid item md={12}>
    <Grid
     item
     container
     elevation={0}
     className=" card"
     component={Paper}
     justify="center"
     alignItems="center"
    >
     <Grid item md={12}>
      <Grid
       container
       component={Box}
       fontSize="h6.fontSize"
       fontWeight="fontWeightMedium"
       className="transactions__title  title"
       item
       alignItems="flex-end"
      >
       Your Account Movements
      </Grid>
      <Grid item></Grid>
     </Grid>
     <Grid item container>
      <List className="transactions__list">
       <ListSubheader className="list-header">
        <Divider component="li" className="transactions__divider" />
        <ListItem role={undefined} dense className="transactions__list-item">
         <Grid container justify="center" alignItems="center">
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={12}
           md={3}
          >
           Origin
          </Grid>
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={12}
           md={3}
          >
           Currency
          </Grid>
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={12}
           md={3}
          >
           Amount
          </Grid>
          <Grid
           component={Box}
           fontSize="h7.fontSize"
           fontWeight="fontWeightMedium"
           item
           xs={12}
           md={3}
          >
           Destiny
          </Grid>
         </Grid>
        </ListItem>

        <Divider component="li" className="transactions__divider" />
       </ListSubheader>
       {transactions &&
        transactions.length > 0 &&
        transactions.map(value => {
         return (
          <ListItem
           key={value.id}
           role={undefined}
           dense
           className="transactions__list-item"
          >
           <Grid container justify="center" alignItems="center">
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={12}
             md={3}
            >
             {value.fromAccount.accountKey}
            </Grid>
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={6}
             md={3}
            >
             {`(${value.currency})`}
            </Grid>
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={6}
             md={3}
            >
             {` ${value.currency === 'USD' ? '$' : '₡'} ${value.amount}`}
            </Grid>
            <Grid
             component={Box}
             fontSize="h7.fontSize"
             fontWeight="fontWeightMedium"
             item
             xs={12}
             md={3}
            >
             {value.toAccount.accountKey}
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

export default MovementsPage