import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  const handleApi = (data) => {
    if (search !== "") {
      console.log("search", data)
      axios.get(`http://universities.hipolabs.com/search?country=${data}`).then(response => {
        if (response.data.length > 0) {
          setData(response.data);
          setKeys(Object.keys(response.data[0]))
        }
      })
    }
  }

  return (
    <div className="App">
      <input type="text" name="name" onChange={(e)=> setSearch(e.target.value)}/>
      <input type="submit" value="Submit" onSubmit={handleApi(search)}/>
      {data.length > 0 ? 
        <>
          <br />
          <text>{`\n`}</text>
          <br />
          <text><b>{`Data Table\n`}</b></text>
          <br />
          <text>{`\n`}</text>
          <br />
          <table>
            <thead>
              <tr>
                <th>SI.no</th>
                {
                  keys.map(header => {
                    return <th>{header}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              { 
                data.map((value, index) => {
                  return <tr>
                    <td>{index}</td>
                    <td>{value.domains}</td>
                    <td>{value.alpha_two_code}</td>
                    <td>{value.web_pages}</td>
                    <td>{value.country}</td>
                    <td>{value['state-province']}</td>
                    <td>{value.name}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </>
        : 
        null
      }
    </div>
  );
}

export default App;
