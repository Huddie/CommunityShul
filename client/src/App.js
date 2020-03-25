import React, {useState, useEffect} from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './components/EnhancedTable';
import Popup from 'react-popup';
import './App.css';
import logo from './communityshiur.png';


function App() {

  const  [hasError, setErrors] =  useState(false)
  const  [shiurim, setShiurim ] = useState([])

  async function fetchData() {
    const res = await fetch('https://www.communityshiur.com/api/shiurim', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                }
    });
    res.json()
    .then(res => setShiurim(res))
    .catch(err => setErrors(err));
  }
  async function postShiur(shiur) {
    const res = await fetch('https://admin.communityshiur.com/api/add', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(shiur)
    });
    res.json()
    .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);


  const columns = React.useMemo(
    () => [
      {
        Header: 'Shiurim',
        columns: [
          {
            Header: 'Date',
            accessor: 'date',
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Speaker',
            accessor: 'lecturer',
          },
          {
            Header: 'Institution',
            accessor: 'institution',
          },
          {
            Header: 'Join Link',
            accessor: 'link',
          },
          {
            Header: 'Source',
            accessor: 'sources',
          },
        ],
      }
    ],
    []
  )

  const [skipPageReset, setSkipPageReset] = React.useState(false)

  function ValidURL(str) {
    var regex = /(http(s)?):\/\/([(www\.)?a-zA-Z0-9@:%._\+~#=-]{2,256}\.[a-z]{2,6}|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\b([-a-zA-Z0-9@:%_\+~#?&//=]*)/;
    if(!regex .test(str)) {
      return false;
    } else {
      return true;
    }
  }

  function FixURLIfNecessary(str) {
    if (ValidURL(str)) return str;
    var new_str = "https://" + str;
    if (ValidURL(new_str)) return new_str;
    return str;
  }

  const updateMyData = shiur => {


    if(
      shiur.date === undefined 
      || shiur.title === undefined 
      || shiur.lecturer === undefined 
      || shiur.institution === undefined 
      || shiur.link === undefined
      || shiur.title === ''
      || shiur.lecturer === '' 
      || shiur.institution === '' 
      || shiur.link === '') {

    }


    postShiur({
      date: shiur.date.toISOString().slice(0, 19).replace('T', ' '),
      title: shiur.title,
      lecturer: shiur.lecturer,
      institution: shiur.institution,
      link: FixURLIfNecessary(shiur.link),
      sources: shiur.source == '' ? shiur.source : FixURLIfNecessary(shiur.source),
    })
  }


  return (
    <div className="app">
      <div className="centered">
        <div className="row">
          <div className="row">
          <img src={logo} width="75"/>
          <h1>Community Shiur</h1>
            <CssBaseline />
            {<EnhancedTable 
            columns={columns} 
            data={shiurim}
            setData={setShiurim}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
            />}
            <div className="top-pad">
              <div className="row">
              <a href="mailto:info@communityshiur.com">Contact Us</a>
              <a href="mailto:request@communityshiur.com">Request access to add shiurim</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
