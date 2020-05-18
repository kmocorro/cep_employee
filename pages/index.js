import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar';
import ScanLayout from '../components/ScanLayout';
import Scan from '../components/Scan';
import ResultLayout from '../components/ResultLayout';
import Result from '../components/Result';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBarTitle: {
    flex: 1
  },
  dashdate: {
    margin: 20
  },
  table: {
    minWidth: 650,
  },
  header: {
    marginTop: 20
  },
  logs: {
    marginTop: 20,
    marginBottom: 50
  }
}));

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function Index(props) {
  const classes = useStyles();
  //console.log(props);
  const [ canteenUserData, setCanteenUserData ] = useState('');
  const [ employeeUserData, setEmployeeUserData ] = useState('');
  console.log(employeeUserData);
  const [ employee_number, setEmployee_number ] = useState('');
  const [ userData, setUserData ] = useState({});
  //console.log(userData);
  const handleEmployeeNumberOnClick = () => {
    setOpenAlert(false)
  }
  const handleEmployeeNumberOnChange = (e) => {
    setEmployee_number(e.target.value);
    setResponseMessage('');
    setSelectedCashValue('');
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
  }
  const handleSearchCancel = () => {
    setEmployee_number('');
    setResponseMessage('');
    setSelectedCashValue('');
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
  }

  const [ selectedCashValue, setSelectedCashValue ] = useState('');
  const [ selectCash100, setSelectCash100 ] = useState(false);
  const [ selectCash200, setSelectCash200 ] = useState(false);
  const [ selectCash500, setSelectCash500 ] = useState(false);

  const handleCashOnToggle100 = () => {
    setSelectedCashValue('100')
    setSelectCash100(!selectCash100)
    setSelectCash200(false)
    setSelectCash500(false)
    if(selectCash100){
      setSelectedCashValue('')
    }
  }
  const handleCashOnToggle200 = () => {
    setSelectedCashValue('200')
    setSelectCash100(false)
    setSelectCash200(!selectCash200)
    setSelectCash500(false)
    if(selectCash200){
      setSelectedCashValue('')
    }
  }
  const handleCashOnToggle500 = () => {
    setSelectedCashValue('500')
    setSelectCash100(false)
    setSelectCash200(false)
    setSelectCash500(!selectCash500)
    if(selectCash500){
      setSelectedCashValue('')
    }
  }

  // response message from server after loading....
  const [ responseMessage, setResponseMessage ] = useState('');
  console.log(responseMessage);

  const [ openBackdrop, setOpenBackrop ] = useState(false);

  // Dialog box
  const [openNext, setOpenNext] = useState(false);
  const handleClickOpenNext = () => {
    setOpenNext(true);
    setOpenAlert(false)
  };
  const handleCloseNext = () => {
    setEmployee_number('');
    setResponseMessage('');
    setSelectedCashValue('');
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
    setOpenNext(false);
  };

  // Response Alert box
  const [ openAlert, setOpenAlert ] = useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    setOpenNext(false);
  }
  const handleClickCloseAlert = () => {
    setEmployee_number('');
    setSelectedCashValue(''); 
    setSelectCash100(false);
    setSelectCash200(false);
    setSelectCash500(false);
    setOpenAlert(false)
  }

  // get acccount info ----------
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4850/getaccountinfo'
      
      let response = await fetch(`${route}/${employee_number}`)

      if(response.status === 200){
        setUserData(await response.json())
      }
    }

    fetchAccountInfo()
  }, [employee_number])
  
  // get acccount info again----------
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4850/getaccountinfo'
      
      let response = await fetch(`${route}/${employee_number}`)

      if(response.status === 200){
        setUserData(await response.json())
      }
    }

    fetchAccountInfo()
  }, [openAlert])

  
  // get user info ----------
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4850/getuserprofile'
      
      let response = await fetch(`${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: props.token
        }) 
      })

      if(response.status === 200){
        setCanteenUserData(await response.json())
      }
    }

    fetchAccountInfo()
  }, [employee_number])

  // get user info ----------
  useEffect(() => {
    async function fetchAccountInfo(){
      let route = 'http://dev-metaspf401.sunpowercorp.com:4850/gettransactionlogs'
      
      let response = await fetch(`${route}/${employee_number}`)

      if(response.status === 200){
        setEmployeeUserData(await response.json())
      }
    }

    fetchAccountInfo()
  }, [employee_number])
  
  
  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      setResponseMessage('');
      setEmployee_number('');
    }, 3000);
    return () => clearTimeout(timer);
  })
  */

  async function handleSubmitLoadAccount(){
    setOpenNext(false);
    setOpenBackrop(!openBackdrop)

    let route = 'http://dev-metaspf401.sunpowercorp.com:4850/loadaccount'

    let response = await fetch(`${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: props.token,
        id: userData.id,
        username: canteenUserData.username, // login canteen credentials first...
        organization: canteenUserData.organization,
        available_balance: userData.available_balance,
        load_amount: selectedCashValue
      })
    })

    if(response.status === 200){
      setResponseMessage(await response.json());
      setOpenAlert(true);
      setOpenBackrop(false)
    }

  }


  return (
    <Fragment>
      <AppBar />
      <ScanLayout>
        <Scan employee_number={employee_number} handleEmployeeNumberOnChange={handleEmployeeNumberOnChange} handleEmployeeNumberOnClick={handleEmployeeNumberOnClick} />
      </ScanLayout>
      <ResultLayout>
      { 
        userData ?
          userData.id == employee_number  ?  // will be replaced soon... with data from the server.
          <Result 
            userData={userData}
            selectCash100={selectCash100}
            selectCash200={selectCash200}
            selectCash500={selectCash500}
            handleSearchCancel={handleSearchCancel}
            handleCashOnToggle100={handleCashOnToggle100}
            handleCashOnToggle200={handleCashOnToggle200}
            handleCashOnToggle500={handleCashOnToggle500}
            selectedCashValue={selectedCashValue}
            handleSubmitLoadAccount={handleSubmitLoadAccount}
            responseMessage={responseMessage}
            openNext={openNext}
            handleClickOpenNext={handleClickOpenNext}
            handleCloseNext={handleCloseNext}
            openAlert={openAlert}
            handleClickOpenAlert={handleClickOpenAlert}
            handleClickCloseAlert={handleClickCloseAlert}
            openBackdrop={openBackdrop}
            canteenUserData={canteenUserData}
          />
          :<></>
        :<></>
      }
      </ResultLayout>
      <Container maxWidth="sm">
        <Grid container className={classes.logs}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {
              typeof employeeUserData !== 'undefined' && employeeUserData !== 'null' && employeeUserData.length > 0 ?
                <MaterialTable
                  icons={tableIcons}
                  columns={[
                    { title: 'Transaction Date', field: 'transaction_date', defaultSort: 'desc' },
                    { title: 'Cashier', field: 'cashier' },
                    { title: 'Transaction', field: 'transaction_type' },
                    { title: 'Amount', field: 'amount', type: 'numeric' }
                  ]}
                  data={employeeUserData}
                  title={`${userData.name} - CEP Transaction logs ${new Date()}`}
                  options={{
                    exportButton: true,
                    exportAllData: true,
                  }}
                />
              :
              <></>
            }
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}


export default Index