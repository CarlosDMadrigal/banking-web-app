import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Box, TextField, Button, Typography } from '@material-ui/core'
import { toast } from 'react-toastify'
import { logIn, getUserByEmailAndPassword } from '../../services/user.service'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { ReactComponent as Logo } from '../../img/symbol.svg'

function LogInPage(props) {
 useEffect(() => {
  'jwt' in sessionStorage && history.push('/dashboard')
 })
 const [logInValues, setLogInValues] = useState({
  email: '',
  password: '',
 })
 let { history } = props
 const handleRegisterClick = () => {
  history.push('/register')
 }

 const notify = (message, error) => {
  if (error) {
   toast.error(message)
  } else {
   toast(message)
  }
 }

 const handleLogInClick = () => {
  logIn(logInValues.email, logInValues.password).then(
   response => {
    sessionStorage.setItem('jwt', response.data)
    getUserByEmailAndPassword(
     logInValues.email,
     logInValues.password,
     response.data
    ).then(res => {
     sessionStorage.setItem('userId', res.data.id)
     history.push('/dashboard')
    })
   },
   error => {
    notify(`Seems like your login information is incorrect.`, true)
   }
  )
 }
 const handleChange = props => event => {
  setLogInValues({ ...logInValues, [props]: event.target.value })
 }
 return (
  <Grid container justify="center" alignItems="center" className="log-in">
   <Grid item container justify="flex-start">
    <Grid
     component={Box}
     fontSize="h4.fontSize"
     alignItems="center"
     item
     container
     xs={12}
     md={6}
     className="header-log"
    >
     <Logo />
    </Grid>
   </Grid>
   <Grid
    item
    container
    xs={12}
    sm={12}
    md={4}
    direction="column"
    spacing={2}
    className="form"
   >
    <Grid item>
     <Box fontSize="h4.fontSize">Log In</Box>
    </Grid>
    <Grid item>
     <TextField
      fullWidth
      id="input-email"
      className="form__input"
      label="Email"
      variant="outlined"
      value={logInValues.email}
      onChange={handleChange('email')}
     />
    </Grid>
    <Grid item>
     <TextField
      fullWidth
      id="input-password"
      className="form__input"
      label="Password"
      type="password"
      variant="outlined"
      value={logInValues.password}
      onChange={handleChange('password')}
     />
    </Grid>
    <Grid item container justify="space-between" alignItems="flex-end">
     <Typography component="div">
      <Box align="center">
       Don't have an account?
       <Button className="form__button-register" onClick={handleRegisterClick}>
        Register here
       </Button>
      </Box>
     </Typography>

     <Button
      variant="contained"
      className="form__button"
      disableElevation
      size="large"
      onClick={handleLogInClick}
     >
      LogIn
     </Button>
    </Grid>
   </Grid>
  </Grid>
 )
}

export default LogInPage
