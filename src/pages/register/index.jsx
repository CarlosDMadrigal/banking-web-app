import React from 'react'
import { useState, useEffect } from 'react'
import {
 Grid,
 Paper,
 Box,
 Stepper,
 TextField,
 Step,
 StepLabel,
 Button,
} from '@material-ui/core'
import { toast } from 'react-toastify'
import { postUser } from '../../services/user.service'
// import MailIcon from '@material-ui/icons/Mail'

function PersonalInformation({ values, handleChange }) {
 return (
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
     required
     id="input-last-name"
     label="First Name"
     error={values.validation.firstName}
     helperText={values.validation.firstName ? 'This field is required' : ''}
     variant="outlined"
     value={values.steps[0].firstName}
     onChange={handleChange('firstName', 'text')}
    />
   </Grid>
   <Grid item>
    <TextField
     fullWidth
     required
     id="input-last-name"
     label="Last Name"
     error={values.validation.lastName}
     helperText={values.validation.lastName ? 'This field is required' : ''}
     variant="outlined"
     value={values.steps[0].lastName}
     onChange={handleChange('lastName', 'text')}
    />
   </Grid>
   <Grid item>
    <TextField
     fullWidth
     required
     id="input-id_number"
     label="Identification Number"
     error={values.validation.idNumber}
     helperText={values.validation.idNumber ? 'This field is required' : ''}
     variant="outlined"
     value={values.steps[0].idNumber}
     onChange={handleChange('idNumber', 'text')}
    />
   </Grid>
   <Grid item>
    <TextField
     fullWidth
     required
     id="date"
     label="Birth Date"
     type="date"
     className=""
     variant="outlined"
     value={values.steps[0].birthDate}
     onChange={handleChange('birthDate', 'date')}
     helperText={values.validation.birthDate ? 'mm/dd/yyyy ' : 'mm/dd/yyyy'}
    />
   </Grid>
  </Grid>
 )
}

function ContactInformation({ values, handleChange }) {
 return (
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
     required
     id="input-first-mail"
     label="E-mail"
     type="email"
     className=""
     variant="outlined"
     error={values.validation.email}
     helperText={values.validation.email ? 'This field is required' : ''}
     value={values.steps[1].email}
     onChange={handleChange('email', 'email')}
    />
   </Grid>
   <Grid item>
    <TextField
     fullWidth
     required
     id="input-first-telephone"
     label="Telephone"
     type="text"
     className=""
     variant="outlined"
     error={values.validation.telephone}
     helperText={values.validation.telephone ? 'This field is required' : ''}
     value={values.steps[1].telephone}
     onChange={handleChange('telephone', 'number')}
    />
   </Grid>
   <Grid item>
    <TextField
     fullWidth
     required
     type="text"
     className=""
     variant="outlined"
     error={values.validation.address1}
     helperText={values.validation.address1 ? 'This field is required' : ''}
     id="input-first-address1"
     label="Address 1"
     value={values.steps[1].address1}
     onChange={handleChange('address1', 'text')}
    />
   </Grid>
   <Grid item>
    <TextField
     fullWidth
     required
     type="text"
     className=""
     variant="outlined"
     error={values.validation.address2}
     helperText={values.validation.address2 ? 'This field is required' : ''}
     id="input-first-address2"
     label="Address 2"
     value={values.steps[1].address2}
     onChange={handleChange('address2', 'text')}
    />
   </Grid>
  </Grid>
 )
}

function SecurityInformation({ values, handleChange }) {
 return (
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
     required
     className=""
     variant="outlined"
     error={values.validation.password}
     helperText={
      values.validation.password
       ? 'The password must be between 6 and 8 characters'
       : ''
     }
     id="input-first-password"
     label="Password"
     type="password"
     value={values.steps[2].password}
     onChange={handleChange('password', 'password')}
    />
   </Grid>
   <Grid item>
    <TextField
     fullWidth
     required
     className=""
     variant="outlined"
     error={values.validation.confirmationPassword}
     helperText={
      values.validation.confirmationPassword
       ? 'This field must match the password field'
       : ''
     }
     id="input-first-confirm_password"
     label="Confirm Password"
     type="password"
     value={values.steps[2].confirmationPassword}
     onChange={handleChange('confirmationPassword', 'confirmationPassword')}
    />
   </Grid>
  </Grid>
 )
}

function ViewSelector({ values, handleChange }) {
 switch (values.activeStep) {
  case 1:
   return <PersonalInformation values={values} handleChange={handleChange} />
  case 2:
   return <ContactInformation values={values} handleChange={handleChange} />
  case 3:
   return <SecurityInformation values={values} handleChange={handleChange} />
  default:
   return 'It seems to be a problem please refresh this page'
 }
}
function RegistrationForm({ values, handleChange, handleNext, handleBack }) {
 return (
  <Grid component="div" container direction="column">
   <Box component="span" fontSize="h4.fontSize" className="form__title">
    Registration Form
   </Box>
   <Stepper
    alternativeLabel
    activeStep={values.activeStep}
    className="form__title-stepper"
   >
    <Step>
     <StepLabel>Personal Information</StepLabel>
    </Step>
    <Step>
     <StepLabel>Contact Information</StepLabel>
    </Step>
    <Step>
     <StepLabel>Password</StepLabel>
    </Step>
   </Stepper>
   <ViewSelector values={values} handleChange={handleChange} />
   <Grid item m={3} container justify="space-between">
    <Button
     variant="contained"
     onClick={handleBack}
     className="form__button"
     disableElevation
     size="large"
     disabled={values.activeStep === 1}
    >
     {'Back'}
    </Button>
    <Button
     variant="contained"
     onClick={handleNext}
     className="form__button"
     disableElevation
     size="large"
     disabled={values.forms[values.activeStep - 1]}
    >
     {values.activeStep === 3 ? 'Submit' : 'Next'}
    </Button>
   </Grid>
  </Grid>
 )
}

// function RegisteredNotification(props) {
//  return (
//   <Grid component="div" container direction="column">
//    <Box component="span" fontSize="h4.fontSize" className="notification__title">
//     Registration Success!
//    </Box>
//    <Box component="p" fontSize="h5.fontSize" fontWeight="fontWeightThin">
//     A confirmation email has been sent so you can activate your account.
//    </Box>
//    <Grid component="div" container justify="center">
//     <MailIcon className="notification__icon" />
//    </Grid>
//   </Grid>
//  )
// }
function RegisterPage(props) {
 useEffect(() => {
  'jwt' in sessionStorage && history.push('/dashboard/home')
 })
 const [values, setValues] = useState({
  activeStep: 1,
  steps: [
   {
    firstName: '',
    lastName: '',
    idNumber: '',
    birthDate: '2000-01-01',
   },
   {
    email: '',
    telephone: '',
    address1: '',
    address2: '',
   },
   {
    password: '',
    confirmationPassword: '',
   },
  ],
  validation: {
   firstName: false,
   lastName: false,
   idNumber: false,
   birthDate: false,
   email: false,
   telephone: false,
   address1: false,
   address2: false,
   password: false,
   confirmationPassword: false,
  },
  forms: [true, true, true],
 })
 const { history } = props
 //  const [isRegistered, setIsRegistered] = useState(false)

 const notify = (message, error) => {
  if (error) {
   toast.error(message)
  } else {
   toast.success(message)
  }
 }

 const handleBack = () => {
  if (values.activeStep > 1) {
   setValues({ ...values, activeStep: values.activeStep - 1 })
  }
 }
 const handleNext = () => {
  if (values.activeStep < 3) {
   setValues({ ...values, activeStep: values.activeStep + 1 })
  } else {
   postUser({
    ...values.steps[0],
    ...values.steps[1],
    ...values.steps[2],
   }).then(
    response => {
     history.push('/')
    },
    error => {
     debugger
     notify(
      `Ups it seems like the identification number or email are already registered.`,
      true
     )
    }
   )
  }
 }

 const handleChange = (props, type) => event => {
  let validations = { ...values.validation }
  let forms = values.forms
  let newValue = values.steps
  let isValid = true
  newValue[values.activeStep - 1] = {
   ...values.steps[values.activeStep - 1],
   [props]: event.target.value,
  }
  let actStep = newValue[values.activeStep - 1]
  if (event.target.value.length === 0) {
   validations = { ...values.validation, [props]: true }
  } else {
   validations = { ...values.validation, [props]: false }
  }
  for (let i = 0; i < Object.keys(actStep).length && isValid === true; i++) {
   if (
    actStep[Object.keys(actStep)[i]] !== 'password' ||
    actStep[Object.keys(actStep)[i]] !== 'confirmation'
   ) {
    if (actStep[Object.keys(actStep)[i]].length === 0) {
     console.log(actStep[Object.keys(actStep)[i]].length)
     isValid = false
    }
   } else {
    if (
     actStep[Object.keys(actStep)[i]].length > 5 &&
     actStep[Object.keys(actStep)[i]].length < 9
    ) {
     isValid = false
    }
   }
  }
  if (isValid) {
   forms[values.activeStep - 1] = false
  } else {
   forms[values.activeStep - 1] = true
  }
  switch (type) {
   case 'number':
    if (
     event.target.value.match(/^[0-9]+$/) ||
     event.target.value.length === 0
    ) {
     setValuesForm(newValue, validations, forms)
    }
    break
   case 'password':
    if (event.target.value.length > 5 && event.target.value.length < 9) {
     validations[props] = false
    } else {
     validations[props] = true
    }
    setValuesForm(newValue, validations, forms)
    break
   case 'confirmationPassword':
    if (event.target.value === values.steps[values.activeStep - 1].password) {
     validations[props] = false
    } else {
     validations[props] = true
    }
    setValuesForm(newValue, validations, forms)
    break
   default:
    setValuesForm(newValue, validations, forms)
    break
  }
 }

 const setValuesForm = (newValue, validations, forms) => {
  setValues({
   ...values,
   steps: newValue,
   validation: { ...validations },
   forms: forms,
  })
 }

 return (
  <Grid
   component="section"
   container
   justify="center"
   p={2}
   className="registration"
  >
   <Grid component="div" item xs={12} sm={12} md={8}>
    <Paper elevation={1} className="form">
     <RegistrationForm
      values={values}
      handleChange={handleChange}
      handleNext={handleNext}
      handleBack={handleBack}
     />
    </Paper>
   </Grid>
  </Grid>
 )
}

export default RegisterPage
