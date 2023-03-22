import React, { useState } from "react";
import "./App.css"; // Added some styling
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Loading from './Loading';

const App = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [resultsArray, setResultsArray] = useState([])
  const [isFav, setIsFav] = useState(false)
  const [loading, setLoading] = useState(false) // Initialize as null

  const handleOnchange = (e) => {
    console.log('handleOnchange')
    setUrl(e.target.value)
  }

  const handleDelete = (i) => {
    const deleteVal = [...resultsArray]
    deleteVal.splice(i, 1)
    setResultsArray(deleteVal)
  }

  const handleFav = (i) => {
    const newResultsArray = [...resultsArray]; // create a new copy of the results array
    newResultsArray[i] = { ...newResultsArray[i], fav: !newResultsArray[i].fav }; // toggle the fav value of the clicked result item
    setIsFav(!isFav); // Add this line to update the isFav state
    setResultsArray(newResultsArray); // update the results array state
  };

  const clearState = () => {
    setUrl('')
    setResult(null)
    setIsFav(false)
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ url })

    try {
      setLoading(true) // Show the reloader during fetching
      const res = await fetch('https://word-scraper-one.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      let totalCount = data.result.totalWords;
      setResult(totalCount)

      // Add URL and result to the results array
      const newResult = {
        url: url,
        result: totalCount,
        fav: isFav
      }
      console.log("newres", newResult);
      setResultsArray([...resultsArray, newResult])
      console.log("resultsarr", resultsArray);
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false) // Hide the reloader after fetching is done
    }
  };


  return (
    <>
      {loading === null ? (null) : loading ? (<Loading />) : (
        <div className="main">
          <h1>Webpage Scraper</h1>
          <br />
          <form onSubmit={(e) => submitHandler(e)}>
            <label>
              <b>URL : </b>
              <input
                type="url"
                name="url"
                onChange={handleOnchange}
                value={url}
              />
              <br />
            </label>
            <input type="submit" value="Get Insights" style={{ backgroundColor: '#344e41', color: 'white', borderRadius: '5px', marginLeft: '10px', marginRight: '10px' }} />
            <input type="button" value="Clear!" style={{ backgroundColor: '#3a5a40', color: 'white', borderRadius: '5px', marginLeft: '10px' }} onClick={() => clearState()} />
          </form>

          <h2>Results</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Domain Name</th>
                <th>WordCount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{url}</td>
                <td>{result}</td>
              </tr>
            </tbody>
          </Table>

          <br />
          <h3>Search History</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Domain Name</th>
                <th>WordCount</th>
                <th>Favourite</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resultsArray.map((resultItem, index) =>
              (
                <tr key={index}>
                  <td>{resultItem.url}</td>
                  <td>{resultItem.result}</td>
                  <td>{resultItem.fav ? "true" : "false"}</td>
                  <td><Button onClick={() => handleDelete(index)} variant="danger">X</Button>{' '}<Button variant="secondary" onClick={() => handleFav(index)} ><span>{resultItem.fav ? "❤️" : "🤍"}</span></Button>{' '}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
      }
    </>
  );
};


export default App;


