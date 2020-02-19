import React from 'react'
import {
 Grid,
 Paper,
 Typography,
 Box,
 OutlinedInput,
 FormControl,
 InputLabel,
} from '@material-ui/core'
function RegisterPage(props) {
 //  const useStylesReddit = makeStyles(theme => ({
 //   root: {
 //    border: '1px solid #e2e2e1',
 //    overflow: 'hidden',
 //    borderRadius: 4,
 //    backgroundColor: '#ffffff',
 //    transition: theme.transitions.create(['border-color', 'box-shadow']),
 //    '&:hover': {
 //     backgroundColor: '#fff',
 //    },
 //    '&$focused': {
 //     backgroundColor: '$bg-color',
 //     boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
 //     borderColor: '$action-color',
 //    },
 //   },
 //   focused: {},
 //  }))
 return (
  <Grid component="section" container justify="center" p={4}>
   <Grid component="div" item xs={12} sm={12} md={8} className="registration">
    <Paper elevation={1} className="form" borderRadius={16}>
     <Grid component="div" container direction="column" m={6}>
      <Typography>
       <Box component="span" fontSize="h5.fontSize">
        Registration Form
       </Box>
      </Typography>
      <Grid component="div" container direction="column">
       <Grid container justify="space-between" md={12}>
        <Box item md={5}>
         <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="input-first-name">First Name</InputLabel>
          <OutlinedInput id="input-first-name" label="First Name" />
         </FormControl>
        </Box>
        <Box item md={5}>
         <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="input-last-name">Last Name</InputLabel>
          <OutlinedInput id="input-last-name" label="Last Name" />
         </FormControl>
        </Box>
       </Grid>
      </Grid>
     </Grid>
    </Paper>
   </Grid>
  </Grid>
 )
}

export default RegisterPage
