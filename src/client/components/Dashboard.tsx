import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { ProgressPlugin } from "webpack";

function Dashboard (props: { username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
  return(
     <div data-testid="dashboard" id="dashboard">
      <h3 id="welcome-message">Welcome back, {props.username}</h3>
     </div>
  );
}

export default Dashboard;