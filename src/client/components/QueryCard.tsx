import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { QueryData, QueryCardProps } from "../Types"

function QueryCard(props: QueryCardProps): JSX.Element {

   // iterate through the tags array to create a sequence of rounded divs,
   // containing each tag
   const tags: JSX.Element[] = [];
   const tagStyle = {
      backgroundColor: 'lavender',
      borderRadius: '16px',
      padding: '4px 16px'
   };
   for (let i = 0; i < props.data.tags.length; i++) {
      tags.push(
         <div style={tagStyle} className="tag-container" key={`tag#${i}`}>
            {props.data.tags[i]}
         </div>
      )
   }

   return (
      <div id="query-card">
         <div className="query-card-header">
            <div>
               <h5>Metric Name: {props.data.metric_name}</h5>

            </div>
            <div>
               <h5>Query Type: {props.data.http_type}</h5>
            </div>
         </div>
         <div className="query-card-body">
            <code id="query-data-text">{props.data.query_data}</code>
            <h4 id="tags"> tags: {tags}</h4>
            {/* <span id="favorite-star">&#9734; </span> <span> &#9733;</span> */}
            <span id="favorite-star"> &#9733; </span>
         </div>
      </div>
   );
}

export default QueryCard;