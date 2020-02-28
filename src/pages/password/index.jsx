import React from 'react'
import { Grid, Paper, Box, Button, TextField } from '@material-ui/core'
import { useUser } from '../../hooks/useUsers'
import { useState } from 'react'
import { putUser } from '../../services/user.service'
import { toast } from 'react-toastify'

function PasswordPage(props) {
 const jwt = sessionStorage.getItem('jwt')
 const id = sessionStorage.getItem('userId')
 const { user, setUser } = useUser(id, jwt)
 const [flags, setFlags] = useState({
  password: false,
  newPassword: false,
  confirmationPassword: false,
 })
 const [passwords, setPasswords] = useState({
  oldPassword: '',
  newPassword: '',
  confirmationPassword: '',
 })
 const { history } = props
 const values = [
  {
   name: 'Old Password',
   label: 'password',
   type: 'text',
  },
  {
   name: 'New Password',
   label: 'address1',
   type: 'text',
  },
  {
   name: 'Confirm New Password',
   label: 'address2',
   type: 'text',
  },
 ]

 const handleChange = props => event => {
  switch (props) {
   case 'newPassword':
    if (
     event.target.value.length === 0 ||
     event.target.value.length > 8 ||
     event.target.value.length < 6
    ) {
     setFlags({ ...flags, newPassword: true })
    } else {
     setFlags({ ...flags, newPassword: false })
    }
    break
   case 'confirmationPassword':
    if (event.target.value !== passwords.newPassword) {
     setFlags({ ...flags, confirmationPassword: true })
    } else {
     setFlags({ ...flags, confirmationPassword: false })
    }
    break
   default:
    break
  }
  setPasswords({ ...passwords, [props]: event.target.value })
 }
 const notify = message => {
  toast.error(message)
 }

 const handleClick = () => {
  //    putUser(user, jwt).then(
  //     res => {
  //      history.push('/dashboard/')
  //     },
  //     error => notify('Error with the server.')
  //    )
 }
 return (
  <Grid className="password" container item md={11} spacing={4}>
   <Grid item md={12}>
    <Grid
     item
     container
     elevation={1}
     className="password__card card"
     component={Paper}
     justify="center"
     alignItems="center"
    >
     <Grid item md={12} container className="">
      <Grid
       container
       component={Box}
       fontSize="h6.fontSize"
       fontWeight="fontWeightMedium"
       className="password__title"
       item
       alignItems="flex-end"
       xs={12}
       md={12}
      >
       Change your password
      </Grid>
     </Grid>
     <Grid item container>
      <Grid item xs={12}>
       <TextField
        fullWidth
        required
        type="password"
        className="password__input"
        variant="outlined"
        error={flags.oldPassword}
        helperText={flags.oldPassword ? `The password don't match` : ''}
        label={`Old Password`}
        value={passwords.oldPassword}
        onChange={handleChange('oldPassword')}
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        fullWidth
        required
        type="password"
        className="password__input"
        variant="outlined"
        error={flags.newPassword}
        helperText={
         flags.newPassword
          ? `The new password must be between 6 and 8 characters.`
          : ''
        }
        label={`New Password`}
        value={passwords.newPassword}
        onChange={handleChange('newPassword')}
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        fullWidth
        required
        type="password"
        className="password__input"
        variant="outlined"
        error={flags.confirmationPassword}
        helperText={
         flags.confirmationPassword
          ? `This field must match with the new password.`
          : ''
        }
        label={`Confirm New Password`}
        value={passwords.confirmationPassword}
        onChange={handleChange('confirmationPassword')}
       />
      </Grid>
      <Grid item md={12} container justify="flex-end">
       <Grid item md={6} container className="password__submit">
        <Button
         item
         variant="contained"
         className="password__button"
         disableElevation
         fullWidth
         onClick={handleClick}
         disabled={
          passwords.oldPassword.length === 0 ||
          passwords.newPassword.length === 0 ||
          passwords.confirmationPassword.length === 0 ||
          flags.confirmationPassword ||
          flags.newPassword
         }
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

export default PasswordPage
