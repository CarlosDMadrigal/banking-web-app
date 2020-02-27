import React from 'react'
import { useState } from 'react'
import {
 Grid,
 Box,
 TextField,
 Button,
 MenuItem,
 Paper,
} from '@material-ui/core'
import { toast } from 'react-toastify'
import { postAccount } from '../../services/account.service'

function CreateAccountPage(props) {
 const [accountVal, setAccountVal] = useState({
  name: '',
  currency: 'CRC',
 })
 const id = sessionStorage.getItem('userId')
 const { history } = props
 const notify = message => {
  toast.error(message)
 }

 const handleSubmit = () => {
  postAccount(accountVal, id).then(
   response => {
    history.push(`/dashboard/accounts`)
   },
   error => {
    notify(`There's a problem with the account creation.`)
   }
  )
 }
 const handleChange = props => event => {
  setAccountVal({ ...accountVal, [props]: event.target.value })
 }

 const currencies = [
  {
   value: 'USD',
   label: 'United States Dollar',
  },
  {
   value: 'CRC',
   label: 'Costa Rican Colón',
  },
 ]
 return (
  <Grid className="account" container item md={11} spacing={4}>
   <Grid item md={12}>
    <Grid
     item
     container
     elevation={0}
     className="card"
     component={Paper}
     justify="center"
    >
     <Grid item md={12} container>
      <Grid
       component={Box}
       fontSize="h6.fontSize"
       fontWeight="fontWeightMedium"
       className="account__title  title"
       item
       xs={12}
       md={6}
      >
       Open a new account
      </Grid>
     </Grid>
     <Grid component="section" md={12} container>
      <Grid item className="account__input" md={12}>
       <TextField
        fullWidth
        className="account__input-field"
        variant="outlined"
        label="Name"
        type="text"
        value={accountVal.name}
        onChange={handleChange('name')}
       />
      </Grid>
      <Grid item md={12} className="account__input">
       <TextField
        id="outlined-select-currency"
        select
        label="Currency"
        value={accountVal.currency}
        onChange={handleChange('currency')}
        variant="outlined"
        className="account__input-field"
        fullWidth
       >
        {currencies.map(option => (
         <MenuItem key={option.value} value={option.value}>
          {option.label}
         </MenuItem>
        ))}
       </TextField>
      </Grid>
      <Grid item md={12} container justify="flex-end">
       <Grid item md={6} container className="account__input">
        <Button
         item
         variant="contained"
         className="account__button"
         disableElevation
         onClick={handleSubmit}
         fullWidth
        >
         Confirm
        </Button>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

export default CreateAccountPage
