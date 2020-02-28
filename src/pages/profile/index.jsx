import React from 'react'
import { Grid, Paper, Box, Button, TextField } from '@material-ui/core'
import { useUser } from '../../hooks/useUsers'
import { useState } from 'react'
import { putUser } from '../../services/user.service'
import { toast } from 'react-toastify'

function ProfilePage(props) {
 const jwt = sessionStorage.getItem('jwt')
 const id = sessionStorage.getItem('userId')
 const { user, setUser } = useUser(id, jwt)
 const [flags, setFlags] = useState({
  firstName: false,
  lastName: false,
  email: false,
  telephone: false,
  address1: false,
  address2: false,
 })
 const { history } = props
 const values = [
  {
   name: 'First Name',
   label: 'firstName',
   type: 'text',
  },
  {
   name: 'Last Name',
   label: 'lastName',
   type: 'text',
  },
  {
   name: 'Email',
   label: 'email',
   type: 'text',
  },
  {
   name: 'Telephone',
   label: 'telephone',
   type: 'number',
  },
  {
   name: 'Address',
   label: 'address1',
   type: 'text',
  },
  {
   name: 'Address 2',
   label: 'address2',
   type: 'text',
  },
 ]

 const handleChange = (props, type) => event => {
  if (event.target.value.length === 0) {
   setFlags({ ...flags, [props]: true })
  }
  if (type === 'number') {
   if (
    event.target.value.match(/^[0-9]+$/) ||
    event.target.value.length === 0
   ) {
    setUser({ ...user, [props]: event.target.value })
   }
  } else if (type === 'text') {
   setUser({ ...user, [props]: event.target.value })
  }
 }
 const notify = (message, error) => {
  if (error) {
   toast.error(message)
  } else {
   toast.success(message)
  }
 }

 const handleClick = () => {
  putUser(user, jwt).then(
   res => {
    notify('Update succesful.')
    history.push('/')
   },
   error => notify('Error with the server.', true)
  )
 }
 return (
  <Grid className="profile" container item xs={12} md={11}>
   <Grid item xs={12} md={12}>
    <Grid
     item
     container
     elevation={1}
     className="profile__card card"
     component={Paper}
     justify="center"
     alignItems="center"
    >
     <Grid item xs={12} md={12} container className="">
      <Grid
       container
       component={Box}
       fontSize="h6.fontSize"
       fontWeight="fontWeightMedium"
       className="profile__title"
       item
       alignItems="flex-end"
       xs={12}
       md={12}
      >
       Your profile
      </Grid>
     </Grid>
     <Grid item container>
      {user.userKey &&
       values.map(value => {
        return (
         <Grid item xs={12}>
          <TextField
           fullWidth
           required
           type="text"
           className="profile__input"
           variant="outlined"
           error={flags[value.label]}
           helperText={flags[value.label] ? 'This field is required' : ''}
           label={value.name}
           value={user[value.label]}
           onChange={handleChange(value.label, value.type)}
          />
         </Grid>
        )
       })}
      <Grid item xs={12} md={12} container justify="flex-end">
       <Grid item xs={6} md={6} container className="profile__submit">
        <Button
         item
         variant="contained"
         className="profile__button"
         disableElevation
         fullWidth
         onClick={handleClick}
         disabled={
          flags.firstName ||
          flags.lastName ||
          flags.email ||
          flags.telephone ||
          flags.address1 ||
          flags.address2
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

export default ProfilePage
