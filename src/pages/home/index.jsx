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
 CircularProgress,
} from '@material-ui/core'
import NumberFormat from 'react-number-format'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useAccounts } from '../../hooks/useAccounts'
import { useTransactions } from '../../hooks/useTransactions'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { Doughnut } from 'react-chartjs-2'
import { toast } from 'react-toastify'
import { requestCurrency } from '../../services/currency.service'
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
   component={Paper}
   className="accounts-card card"
   elevation={1}
   xs={12}
   sm={12}
   md={7}
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
     <Table size="small" className="accounts-card__table">
      <EnhancedTableHead rowCount={accounts.length} />
      <TableBody>
       {accounts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((account, index) => {
         return (
          <TableRow
           tabIndex={-1}
           key={account.id}
           className="accounts__table-row"
          >
           <TableCell component="th" scope="row">
            {account.accountKey}
           </TableCell>
           <TableCell>{account.name}</TableCell>
           <TableCell>{account.currency}</TableCell>
           <TableCell align="center">{`${
            account.currency === 'USD' ? '$' : '₡'
           }${account.balance}`}</TableCell>
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
function MovementsCard(props) {
 let { transactions, id } = props
 const data = {
  labels: ['Incomes', 'Expenses'],
  datasets: [
   {
    backgroundColor: ['#1eba62', '#e74c3c'],
    data: [0, 0],
   },
  ],
 }
 // eslint-disable-next-line array-callback-return
 let transactionsFiltered = []
 transactions.forEach(transaction => {
  if (transaction.fromAccount.owner1.id !== transaction.toAccount.owner1.id) {
   transactionsFiltered.push(transaction)
  }
 })
 return (
  <Grid
   item
   container
   justify="center"
   component={Paper}
   className="movements card"
   elevation={1}
   xs={12}
   sm={12}
   md={4}
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
   {/* <Grid item>
    <Doughnut
     data={data}
     height={100}
     options={{
      legend: {
       display: false,
      },
     }}
     className="movements__graphic"
    />
   </Grid> */}
   <Grid item container>
    <Divider className="movements__divider" />
    <List className="movements__list">
     {transactionsFiltered && transactionsFiltered.length > 0 ? (
      transactionsFiltered.map(transaction => {
       let isExpense = transaction.fromAccount.owner1.id == id
       var d = new Date(transaction.created)
       d.setTime(d.getTime() + d.getTimezoneOffset())
       var hour = d.getHours()
       var time
       if (hour > 12) {
        time = 'PM'
        var hour = hour - 12
       } else {
        time = 'AM'
       }
       var minute = d.getMinutes()
       var formatted = hour + ':' + minute + ' ' + time
       if (isExpense) {
        data.datasets[0].data[1] = data.datasets[0].data[1] + transaction.amount
       } else {
        data.datasets[0].data[0] = data.datasets[0].data[0] + transaction.amount
       }
       return (
        <ListItem>
         <ListItemText
          primary={`${isExpense ? '-' : '+'}${transaction.amount}`}
          primaryTypographyProps={{
           className: `movements__${isExpense ? 'expenses' : 'income'} `,
          }}
         />
         {formatted}
        </ListItem>
       )
      })
     ) : (
      <Grid container direction="column">
       <Box
        fontSize="h6.fontSize"
        fontWeight="fontWeightMedium"
        className="movements__message"
       >
        There has been no movements today...
       </Box>
      </Grid>
     )}
    </List>
    <Divider className="movements__divider" />
   </Grid>
   {/* <Grid item>
    <Box
     fontSize="h6.fontSize"
     fontWeight="fontWeightMedium"
     className={`movements__detail`}
    ></Box>
   </Grid> */}
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
  loading,
 } = props

 return loading ? (
  <Grid
   item
   container
   elevation={1}
   className="transference card"
   component={Paper}
   justify="center"
   alignItems="center"
  >
   <CircularProgress size={70} className="transference__loader" />
  </Grid>
 ) : (
  <Grid
   item
   container
   elevation={1}
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
     {
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
       {accounts.length > 0 &&
        accounts.map(option => (
         <MenuItem key={option.id} value={option}>
          {`${option.accountKey} ${option.name} ${
           option.currency === 'USD' ? '$' : '₡'
          }${option.balance}  (${option.currency})`}
         </MenuItem>
        ))}
      </TextField>
     }
    </Grid>
    <Grid
     item
     container
     alignItems="center"
     justify="center"
     lg={1}
     className="transference__icon"
    >
     <ArrowForwardIosIcon className="transference__icon" />
    </Grid>
    <Grid item xs={12} sm={12} md={6} className="transference__input">
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
    <Grid item xs={12} sm={12} md={5} className="transference__input">
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
       transference.fromAccount.currency === transference.toAccount.currency &&
       transference.fromAccount.balance < transference.amount
      }
      helperText={
       transference.fromAccount.currency === transference.toAccount.currency &&
       transference.fromAccount.balance < transference.amount
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
       (transference.amount.length === 0 && isVerified) ||
       (transference.amount <= 0 && isVerified) ||
       (transference.fromAccount.currency === transference.toAccount.currency &&
        transference.fromAccount.balance < transference.amount &&
        isVerified)
      }
     >
      {isVerified ? 'Confirm' : 'Verify'}
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

function HomePage(props) {
 //  const { currencyChange } = useCurrency()
 const id = sessionStorage.getItem('userId')
 const jwt = sessionStorage.getItem('jwt')
 let { accounts, reload } = useAccounts(id, jwt)
 let { transactions, reloadTransaction } = useTransactions(id, jwt)
 const [page, setPage] = React.useState(0)
 const [rowsPerPage, setRowsPerPage] = React.useState(5)
 const [loading, setLoading] = useState(false)
 const [transference, setTransference] = useState({
  amount: 0,
  fromAccount: {
   id: 0,
  },
  toAccount: {
   id: 0,
  },
  currency: '',
  exchangeRate: 0,
 })

 const [destinyAccountNumber, setDestinyAccountNumber] = useState('')
 const [isVerified, setIsVerified] = useState(false)
 const [destinyAccount, setDestinyAccount] = useState({})

 const notify = (message, error) => {
  if (error) {
   toast.error(message)
  } else {
   toast.success(message)
  }
 }

 const handleChangePage = (event, newPage) => {
  setPage(newPage)
 }

 const handleTransferClick = () => {
  if (isVerified) {
   setLoading(true)
   requestCurrency().then(
    res => {
     let newTransf = transference
     newTransf.exchangeRate = res.data['quotes']['USDCRC']

     postTransaction(newTransf, jwt).then(
      res => {
       handleCancelClick()
       reload()
       reloadTransaction()
       setLoading(false)
       notify(`The transference was successful!`)
      },
      error => {
       notify(
        `The transference failed please check the amount and try again.`,
        true
       )
      }
     )
    },
    error => {
     notify(`It seems to be a problem with the conection to internet.`)
    }
   )
  } else {
   getAccountByKey(destinyAccountNumber, jwt).then(
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
  setDestinyAccountNumber('')
  setTransference({
   amount: 0,
   fromAccount: {
    id: 0,
   },
   toAccount: {
    id: 0,
   },
   currency: '',
   exchangeRate: 0,
  })
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
  <Grid container item md={11} className="home">
   <Grid item container>
    <MovementsCard transactions={transactions} id={id} />
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
     loading={loading}
    />
   </Grid>
  </Grid>
 )
}

export default HomePage
