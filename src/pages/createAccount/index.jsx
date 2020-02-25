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
 const { history, match } = props
 const notify = message => {
  toast.error(message)
 }

 const handleSubmit = () => {
  postAccount(accountVal, match.params.id).then(
   response => {
    history.push(`dashboard/${match.params.id}`)
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
  <Grid
   component="section"
   container
   justify="center"
   p={2}
   className="account"
  >
   <Grid component="div" item xs={12} sm={12} md={8}>
    <Paper elevation={1} className="form">
     <Grid component="div" container direction="column">
      <Box component="span" fontSize="h4.fontSize" className="form__title">
       Creating Account
      </Box>
      <Grid
       component="section"
       container
       direction="column"
       justify="space-between"
       spacing={3}
      >
       <Grid item>
        <TextField
         fullWidth
         className="form__input"
         variant="outlined"
         id="input-name"
         label="Name"
         type="text"
         value={accountVal.name}
         onChange={handleChange('name')}
        />
       </Grid>
       <Grid item>
        <TextField
         id="outlined-select-currency"
         select
         label="Currency"
         value={accountVal.currency}
         onChange={handleChange('currency')}
         variant="outlined"
         className="form__input"
         fullWidth
        >
         {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
           {option.label}
          </MenuItem>
         ))}
        </TextField>
       </Grid>
       <Grid item m={3} container justify="flex-end">
        <Button
         variant="contained"
         onClick={handleSubmit}
         className="form__button"
         disableElevation
         size="large"
        >
         Submit
        </Button>
       </Grid>
      </Grid>
     </Grid>
    </Paper>
   </Grid>
  </Grid>
 )
}

export default CreateAccountPage
