import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { ProgressPlugin } from "webpack";

function PopupForm () {

  return(
     <div className="form-popup">
       <form className="form-container" action="" method="post">
        <input type="text" name="" id="" placeholder="Metric" />
        <input type="text" name="" id="" placeholder="Tagname" />
        <input type="text" name="" id="" placeholder="Query String" />
       </form>
     </div>
  );
}

export default PopupForm;