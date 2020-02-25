import React from 'react'
import { useState } from 'react'
import {
 Grid,
 Typography,
 Paper,
 Box,
 Divider,
 List,
 ListItem,
 ListItemText,
 Table,
 TableBody,
 TableCell,
 TextField,
 TableContainer,
 TableRow,
 IconButton,
 Button,
 TableHead,
 TablePagination,
} from '@material-ui/core'
import SideBar from '../../components/sidebar'
import { Switch, Route } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

const headCells = [
 {
  id: 'accountKey',
  label: 'Account Number',
 },
 { id: 'name', label: 'Name' },
 { id: 'currency', label: 'Currency' },
 { id: 'balance', label: 'Balance' },
]

function EnhancedTableHead(props) {
 return (
  <TableHead>
   <TableRow>
    {headCells.map(headCell => (
     <TableCell key={headCell.id}>{headCell.label}</TableCell>
    ))}

    <TableCell>{``}</TableCell>
   </TableRow>
  </TableHead>
 )
}

function createData(accountKey, name, currency, balance) {
 return { accountKey, name, currency, balance }
}

const rows = [
 createData(111111111, 'name00', 'USD', 150.0),
 createData(111111112, 'name01', 'CRC', 3.7),
 createData(111111113, 'name02', 'CRC', 3.7),
 createData(111111114, 'name03', 'USD', 3.7),
 createData(111111115, 'name04', 'CRC', 3.7),
 createData(111111116, 'name05', 'USD', 3.7),
 createData(111111117, 'name06', 'USD', 3.7),
 createData(111111118, 'name07', 'CRC', 3.7),
 createData(111111119, 'name08', 'USD', 3.7),
 createData(111111120, 'name09', 'CRC', 3.7),
 createData(111111121, 'name10', 'USD', 3.7),
 createData(111111122, 'name11', 'CRC', 3.7),
]

function DashBoardPage(props) {
 const [page, setPage] = React.useState(0)
 const [rowsPerPage, setRowsPerPage] = React.useState(5)
 const [isExpenses, setIsExpenses] = useState(false)
 const [transference, setTransference] = useState({
  amount: 0,
  fromAccount: {
   id: 0,
  },
  toAccount: {
   id: 0,
  },
 })
 const emptyRows =
  rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

 const handleChangePage = (event, newPage) => {
  setPage(newPage)
 }

 const handleChangeRowsPerPage = event => {
  setRowsPerPage(parseInt(event.target.value, 10))
  setPage(0)
 }
 return (
  <Grid>
   <SideBar />
   <Grid
    container
    item
    spacing={4}
    className="dashboard"
    xs={12}
    sm={12}
    md={12}
   >
    <Grid item container xs={12} sm={12} md={12} lg={3} xl={3}>
     <Grid
      container
      justify="center"
      component={Paper}
      className="movements"
      elevation={0}
      item
     >
      <Grid
       component={Box}
       fontSize="h6.fontSize"
       fontWeight="fontWeightMedium"
       className="movements__title title"
       item
       container
       alignItems="flex-end"
      >
       Today's Movements
      </Grid>
      <Grid item>
       <Box
        fontSize="h5.fontSize"
        fontWeight="fontWeightMedium"
        textAlign="center"
        className={`movements__${isExpenses ? 'expenses' : 'income'}`}
       >
        {isExpenses ? '-' : '+'}30000
       </Box>
      </Grid>
      <Grid item container>
       <Divider className="movements__divider" />
       <List className="movements__list">
        <ListItem>
         <ListItemText
          primary={`${isExpenses ? '-' : '+'}2000`}
          primaryTypographyProps={{
           className: `movements__${isExpenses ? 'expenses' : 'income'}`,
          }}
          secondary={
           <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
             01-Jan-2020
            </Typography>
            {` Payroll`}
           </React.Fragment>
          }
         />
        </ListItem>
        <Divider component="li" className="movements__divider" />
       </List>
      </Grid>
      <Grid xs={12} sm={12} md={12} item>
       <Box
        fontSize="h6.fontSize"
        fontWeight="fontWeightMedium"
        className={`movements__detail`}
       ></Box>
      </Grid>
     </Grid>
    </Grid>
    <Grid item container xs={12} sm={12} md={9}>
     <Grid item container>
      <Grid
       container
       justify="center"
       component={Paper}
       className="accounts"
       elevation={0}
       item
      >
       <Grid
        component={Box}
        fontSize="h6.fontSize"
        fontWeight="fontWeightMedium"
        item
        className="accounts__title  title"
        container
        alignItems="flex-end"
       >
        Accounts
       </Grid>
       <Grid container item>
        <TableContainer>
         <Table size="small">
          <EnhancedTableHead rowCount={rows.length} />
          <TableBody>
           {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
             return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
               <TableCell component="th" id={index} scope="row">
                {row.accountKey}
               </TableCell>
               <TableCell>{row.name}</TableCell>
               <TableCell>{row.currency}</TableCell>
               <TableCell>{row.balance}</TableCell>
               <TableCell></TableCell>
              </TableRow>
             )
            })}

           {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
             <TableCell colSpan={6} />
            </TableRow>
           )}
          </TableBody>
         </Table>
        </TableContainer>
        <Grid container justify="flex-end">
         <TablePagination
          rowsPerPageOptions={[5]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          component="div"
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
         />
        </Grid>
       </Grid>
      </Grid>
      <Grid
       item
       container
       elevation={0}
       className="transference"
       component={Paper}
       direction="column"
       justify="space-between"
      >
       <Grid
        component={Box}
        fontSize="h6.fontSize"
        fontWeight="fontWeightMedium"
        className="transference__title  title"
        item
        container
        alignItems="flex-end"
       >
        Transfer money
       </Grid>
       <Grid
        item
        component={TextField}
        fullWidth
        className="transference__input"
        variant="outlined"
        label="Destiny Account Number"
        type="text"
       />
       <Grid item container justify="flex-end">
        <Button
         variant="contained"
         className="transference__button"
         disableElevation
         size="large"
        >
         Submit
        </Button>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
   <Switch>{/* <Route path="/home" component={} /> */}</Switch>
  </Grid>
 )
}

export default DashBoardPage
