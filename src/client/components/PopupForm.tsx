import axios from "axios";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { ProgressPlugin } from "webpack";
import React, {useState} from 'react';

 //custom hook for handling inputs
 const useInput = (init:any) => {
  const [ value, setValue ] = useState(init);
  const onChange = (e: { target: any; }) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

function PopupForm () {
  const [metric_name, setMetricName] = useInput('')
  const [http_type, setHttpType] = useInput('')
  const [tag, setTag] = useInput('')
  const [query_data, setQueryData] = useInput('')
  const [authorization_status, setAuthorizationStatus] = useInput('')
  
  const handleClicks = (e: { target: any; }) =>{
    
    const popupBox = document.querySelector('#query-form-popup') as HTMLElement
    
    if(e.target.id === 'popup-close-btn'){ popupBox.style.display = 'none' } 
    
   
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if(metric_name === '' || query_data === '' || authorization_status === ''){
      alert('Please fill out required fields!')
    }else{
      const tags = [tag]
      const queryObj = {
        metric_name,
        http_type,
        query_data,
        tags,
        authorization_status
      }
      console.log('handleSubmit queryObj: ', queryObj)
      axios.post('/manipulate', queryObj)
      .then(function (response) {
        console.log(response);
        const popupBox = document.querySelector('#query-form-popup') as HTMLElement 
        popupBox.style.display = 'none'
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }
  
  return(
     <div id="query-form-popup">
        <button onClick={handleClicks} id="popup-close-btn">x</button>
        <h3>New Query</h3>
       <form id="form-container" action="" onSubmit={handleSubmit} method="post">
        <input type="text" name="metric" id="metric" placeholder="Metric" onChange={setMetricName}/>
        <input type="text" name="http" id="http" placeholder="http" onChange={setHttpType}/>
        <input type="text" name="tags" id="tags" placeholder="Tagname" onChange={setTag}/>
        <input type="text" name="query" id="query" placeholder="Query String" onChange={setQueryData}/>
        {/* <input type="text" name="auth" id="auth" placeholder="Authorization" onChange={setAuthorizationStatus}/> */}
        <div id="auth-container">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="admin"
                checked={authorization_status === "admin"}
                onChange={setAuthorizationStatus}
              />
              Admin
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="user"
                checked={authorization_status === "user"}
                onChange={setAuthorizationStatus}
              />
              User
            </label>
          </div>
        </div>
        <div id="btn-container">
          <input id="submit-form" type="submit" value="Submit"></input>
        </div>
       </form>
     </div>
  );
}

export default PopupForm;