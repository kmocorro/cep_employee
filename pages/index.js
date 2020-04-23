import React, {Fragment, useState, useEffect} from 'react';
import AppBar from '../components/AppBar';
import ScanLayout from '../components/ScanLayout';
import Scan from '../components/Scan';
import ResultLayout from '../components/ResultLayout';
import Result from '../components/Result';


function Index(props) {
  //console.log(props);
  const [ canteenUserData, setCanteenUserData ] = useState('');
  console.log(canteenUserData);
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
      let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getaccountinfo'
      
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
      let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getaccountinfo'
      
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
      let route = 'http://dev-metaspf401.sunpowercorp.com:4848/getuserprofile'
      
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponseMessage('');
      setEmployee_number('');
    }, 3000);
    return () => clearTimeout(timer);
  })

  async function handleSubmitLoadAccount(){
    setOpenNext(false);
    setOpenBackrop(!openBackdrop)

    let route = 'http://dev-metaspf401.sunpowercorp.com:4848/loadaccount'

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
    </Fragment>
  );
}


export default Index