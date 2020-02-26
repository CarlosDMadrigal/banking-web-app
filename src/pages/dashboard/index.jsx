import React from 'react'
import { useState } from 'react'
import { getAccountByKey } from '../../services/account.service'
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
 Button,
 TableHead,
 TablePagination,
 MenuItem,
 InputAdornment,
} from '@material-ui/core'
import NumberFormat from 'react-number-format'
import SideBar from '../../components/sidebar'
import { Switch, Route } from 'react-router-dom'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useAccounts } from '../../hooks/useAccounts'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { Doughnut } from 'react-chartjs-2'
import { toast } from 'react-toastify'
import { useCurrency } from '../../hooks/useCurrency'
import { postTransaction } from '../../services/transaction.service'

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
function NumberFormatCustom(props) {
 const { inputRef, onChange, ...other } = props

 return (
  <NumberFormat
   {...other}
   getInputRef={inputRef}
   onValueChange={values => {
    onChange({
     target: {
      value: values.value,
     },
    })
   }}
   thousandSeparator
   isNumericString
   //    prefix=
  />
 )
}
function AccountsCard(props) {
 let {
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  accounts,
 } = props
 const emptyRows =
  rowsPerPage - Math.min(rowsPerPage, accounts.length - page * rowsPerPage)
 return (
  <Grid
   item
   container
   justify="center"
   component={Paper}
   className="accounts card"
   elevation={0}
   xs={12}
   sm={12}
   md={12}
   lg={7}
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
     <Table size="small" className="accounts__table">
      <EnhancedTableHead rowCount={accounts.length} />
      <TableBody>
       {accounts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((account, index) => {
         return (
          <TableRow
           tabIndex={-1}
           key={account.name}
           className="accounts__table-row"
          >
           <TableCell component="th" id={index} scope="row">
            {account.accountKey}
           </TableCell>
           <TableCell>{account.name}</TableCell>
           <TableCell>{account.currency}</TableCell>
           <TableCell align="center">{account.balance}</TableCell>
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
      count={accounts.length}
      rowsPerPage={rowsPerPage}
      page={page}
      component="div"
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
     />
    </Grid>
   </Grid>
  </Grid>
 )
}
const data = {
 labels: ['Incomes', 'Expenses'],
 datasets: [
  {
   backgroundColor: ['#1eba62', '#e74c3c'],
   data: [65, 59],
  },
 ],
}
function MovementsCard(props) {
 let { isExpenses } = props
 return (
  <Grid
   item
   container
   justify="center"
   component={Paper}
   className="movements card"
   elevation={0}
   xs={12}
   sm={12}
   md={12}
   lg={4}
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
    <Doughnut
     data={data}
     height={100}
     options={{
      legend: {
       display: false,
      },
     }}
    />
   </Grid>
   <Grid item container>
    <List className="movements__list">
     <Divider className="movements__divider" />
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
   <Grid item>
    <Box
     fontSize="h6.fontSize"
     fontWeight="fontWeightMedium"
     className={`movements__detail`}
    ></Box>
   </Grid>
  </Grid>
 )
}

function TranferencesCard(props) {
 let {
  transference,
  accounts,
  handleSelectChange,
  isVerified,
  handleAccountChange,
  destinyAccountNumber,
  destinyAccount,
  handleClick,
  handleAmountChange,
  handleCancelClick,
  currencyChange,
 } = props

 return (
  <Grid
   item
   container
   elevation={0}
   className="transference card"
   component={Paper}
  >
   <Grid
    container
    component={Box}
    fontSize="h6.fontSize"
    fontWeight="fontWeightMedium"
    className="transference__title  title"
    item
    alignItems="flex-end"
   >
    Transfer money
   </Grid>
   <Grid item container spacing={2} className="tranference__inputs">
    <Grid item xs={12} sm={12} md={12} lg={5} className="transference__input">
     {accounts.length > 0 && (
      <TextField
       id="outlined-select-currency"
       select
       label="Origin Account"
       value={transference.fromAccount}
       onChange={handleSelectChange}
       variant="outlined"
       className="transference__input-field"
       fullWidth
       InputProps={{
        startAdornment: (
         <InputAdornment position="start">
          <MonetizationOnIcon className="origin" />
         </InputAdornment>
        ),
       }}
      >
       {accounts.map(option => (
        <MenuItem key={option.id} value={option}>
         {`${option.accountKey} ${option.name} ${
          option.currency === 'USD' ? '$' : '₡'
         }${option.balance}  (${option.currency})`}
        </MenuItem>
       ))}
      </TextField>
     )}
    </Grid>
    <Grid item container alignItems="center" justify="center" md={1}>
     <ArrowForwardIosIcon />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={5} className="transference__input">
     {!isVerified ? (
      <TextField
       fullWidth
       className="transference__input-field"
       variant="outlined"
       label="Destiny Account Number"
       type="text"
       value={destinyAccountNumber}
       onChange={handleAccountChange}
       InputProps={{
        endAdornment: (
         <InputAdornment position="end">
          <MonetizationOnIcon className="destiny" />
         </InputAdornment>
        ),
       }}
      />
     ) : (
      <TextField
       fullWidth
       className="transference__input-field"
       variant="outlined"
       label="Destiny Account Number"
       type="text"
       value={`${destinyAccount[0].accountKey} (${destinyAccount[0].currency}) ${destinyAccount[0].owner1.firstName} ${destinyAccount[0].owner1.lastName}`}
       error={transference.fromAccount.id === destinyAccount[0].id}
       helperText={
        transference.fromAccount.id === destinyAccount[0].id
         ? `You can't transfer money to the same account.`
         : ''
       }
       disabled
       InputProps={{
        endAdornment: (
         <InputAdornment position="end">
          <MonetizationOnIcon className="destiny" />
         </InputAdornment>
        ),
       }}
      />
     )}
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={5} className="transference__input">
     <TextField
      fullWidth
      className="transference__input-field"
      variant="outlined"
      label="Amount"
      type="text"
      value={transference.amount}
      onChange={handleAmountChange}
      InputProps={{
       inputComponent: NumberFormatCustom,
       startAdornment: (
        <InputAdornment position="start">
         {transference.currency === 'USD' ? '$' : '₡'}
        </InputAdornment>
       ),
      }}
      disabled={!isVerified}
      error={
       (transference.fromAccount.currency === transference.toAccount.currency &&
        transference.fromAccount.balance < transference.amount) ||
       (transference.fromAccount.currency === 'USD' &&
        transference.toAccount.currency === 'CRC' &&
        transference.amount >
         transference.fromAccount.currency / currencyChange) ||
       (transference.fromAccount.currency === 'CRC' &&
        transference.toAccount.currency === 'USD' &&
        transference.amount >
         transference.fromAccount.currency * currencyChange)
      }
      helperText={
       (transference.fromAccount.currency === transference.toAccount.currency &&
        transference.fromAccount.balance < transference.amount) ||
       (transference.fromAccount.currency === 'USD' &&
        transference.toAccount.currency === 'CRC' &&
        transference.amount >
         transference.fromAccount.currency / currencyChange) ||
       (transference.fromAccount.currency === 'CRC' &&
        transference.toAccount.currency === 'USD' &&
        transference.amount >
         transference.fromAccount.currency * currencyChange)
        ? `The amount is greater than the available balance.`
        : ''
      }
     />
    </Grid>
    <Grid item container alignItems="center" justify="center" md={1}></Grid>
    <Grid item xs={12} sm={12} md={12} lg={6} className="transference__input">
     <Button
      variant="contained"
      className="transference__button"
      disableElevation
      size="large"
      onClick={handleClick}
      disabled={
       transference.fromAccount.id === 0 ||
       destinyAccountNumber.length < 9 ||
       transference.fromAccount.id === transference.toAccount.id ||
       transference.fromAccount.balance < transference.amount ||
       (transference.amount.length === 0 &&
        transference.amount <= 0 &&
        isVerified) ||
       (transference.fromAccount.currency === transference.toAccount.currency &&
        transference.fromAccount.balance < transference.amount &&
        isVerified) ||
       (transference.fromAccount.currency === 'USD' &&
        transference.toAccount.currency === 'CRC' &&
        transference.amount >
         transference.fromAccount.currency / currencyChange &&
        isVerified) ||
       (transference.fromAccount.currency === 'CRC' &&
        transference.toAccount.currency === 'USD' &&
        transference.amount >
         transference.fromAccount.currency * currencyChange &&
        isVerified)
      }
     >
      {isVerified ? 'Transfer  Money' : 'Verify'}
     </Button>
     <Button
      variant="contained"
      onClick={handleCancelClick}
      className={`transference__button transference__button-cancel ${
       isVerified ? '' : 'display'
      }`}
      disableElevation
      size="large"
     >
      {'Cancel'}
     </Button>
    </Grid>
   </Grid>
  </Grid>
 )
}

function DashBoardPage(props) {
 const { match } = props
 //  const { currencyChange } = useCurrency()
 const { accounts } = useAccounts(match.params.id)
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
  currency: '',
 })

 const [destinyAccountNumber, setDestinyAccountNumber] = useState('')
 const [isVerified, setIsVerified] = useState(false)
 const [destinyAccount, setDestinyAccount] = useState({})

 const notify = message => {
  toast.error(message)
 }

 const handleChangePage = (event, newPage) => {
  setPage(newPage)
 }

 const handleTransferClick = () => {
  if (isVerified) {
   let fromNewBalance = transference.amount
   let fromAccount = transference.fromAccount
   let toAccount = transference.toAccount
   if (
    transference.fromAccount.currency === 'USD' &&
    transference.toAccount.currency === 'CRC'
   ) {
    fromNewBalance = transference.amount / currencyChange
   } else if (
    transference.fromAccount.currency === 'CRC' &&
    transference.toAccount.currency === 'USD'
   ) {
    fromNewBalance = transference.amount * currencyChange
   }
   debugger
   fromAccount.balance = fromAccount.balance - fromNewBalance
   toAccount.balance = toAccount.balance + transference.amount
   setTransference({
    ...transference,
    fromAccount: fromAccount,
    toAccount: toAccount,
   })
   postTransaction(transference)
  } else {
   getAccountByKey(destinyAccountNumber).then(
    res => {
     setDestinyAccount(res.data)
     setIsVerified(true)
     setTransference({
      ...transference,
      toAccount: res.data[0],
      currency: res.data[0].currency,
     })
    },
    error => {
     notify(`The account number is invalid.`)
    }
   )
  }
 }

 const handleCancelClick = () => {
  setIsVerified(false)
 }
 const handleChangeRowsPerPage = event => {
  setRowsPerPage(parseInt(event.target.value, 10))
  setPage(0)
 }
 const handleSelectChange = event => {
  setTransference({ ...transference, fromAccount: event.target.value })
 }
 const handleAccountChange = event => {
  if (
   (event.target.value.match(/^[0-9]+$/) || event.target.value.length === 0) &&
   event.target.value.length < 10
  ) {
   setDestinyAccountNumber(event.target.value)
  }
 }
 const handleAmountChange = event => {
  if (event.target.value.match(/^[0-9]+$/) || event.target.value.length === 0) {
   setTransference({ ...transference, amount: event.target.value })
  }
 }

 return (
  <Grid>
   <SideBar />
   <Grid container item md={11} className="dashboard" spacing={4}>
    <Grid item container>
     <MovementsCard isExpenses={isExpenses} />
     <AccountsCard
      accounts={accounts}
      rowsPerPage={rowsPerPage}
      page={page}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
     />
    </Grid>
    <Grid item container>
     <TranferencesCard
      transference={transference}
      accounts={accounts}
      handleSelectChange={handleSelectChange}
      isVerified={isVerified}
      handleAccountChange={handleAccountChange}
      destinyAccountNumber={destinyAccountNumber}
      handleClick={handleTransferClick}
      handleAmountChange={handleAmountChange}
      destinyAccount={destinyAccount}
      handleCancelClick={handleCancelClick}
      currencyChange={currencyChange}
     />
    </Grid>
   </Grid>
   <Switch>{/* <Route path="/home" component={} /> */}</Switch>
  </Grid>
 )
}

export default DashBoardPage
