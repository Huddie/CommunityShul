import React, {useState, useEffect} from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './components/EnhancedTable';
import './App.css';
import logo from './communityshiur.png';

function App() {

  const  [hasError, setErrors] =  useState(false)
  const  [shiurim, setShiurim ] = useState([])

  async function fetchData() {
    const res = await fetch('https://x.communityshiur.com/api/shiurim', {
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
    const res = await fetch('https://x.communityshiur.com/api/add', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(shiur)
    });
    res.json()
    .catch(err => setErrors(err));
    console.log(res);
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
            accessor: 'source',
          },
        ],
      }
    ],
    []
  )

  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = shiur => {
    postShiur({
      date: shiur.date.toISOString().slice(0, 19).replace('T', ' '),
      title: shiur.title,
      lecturer: shiur.lecturer,
      institution: shiur.institution,
      link: shiur.link,
      sources: shiur.source,
    })
  }

  return (
    <div className="app">
      <div className="centered">
        <div className="row">
          <div className="row">
          <img src={logo} width="100"/>
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
              <a href="mail-to:info@communityshiur.com">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
