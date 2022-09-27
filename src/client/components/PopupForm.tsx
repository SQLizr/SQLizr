import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { ProgressPlugin } from "webpack";




function PopupForm () {
  
  const handleClicks = (e: { target: any; }) =>{
    const popupBox = document.querySelector('#query-form-popup') as HTMLElement
    if(e.target.id === 'popup-close-btn'){ popupBox.style.display = 'none' } 
  }
  
  return(
     <div id="query-form-popup">
        <button onClick={handleClicks} id="popup-close-btn">x</button>
        <h3>New Query</h3>
       <form id="form-container" action="" method="post">
        <input type="text" name="" id="" placeholder="Metric" />
        <input type="text" name="" id="" placeholder="Tagname" />
        <input type="text" name="" id="" placeholder="Query String" />
        <div id="btn-container">
          <button formAction="submit">Submit</button>
        </div>
       </form>
     </div>
  );
}

export default PopupForm;