import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { ProgressPlugin } from "webpack";

function Dashboard (props: { username: string  }) {

  console.log('username is: ', props.username);
  return(
     <div data-testid="dashboard" id="dashboard">
      <h3 id="welcome-message">Welcome back, {props.username}</h3>
     </div>
  );
}

export default Dashboard;