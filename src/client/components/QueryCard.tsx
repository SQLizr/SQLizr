import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState } from "react";
import { QueryData, QueryCardProps } from "../Types"
import { useUserContext } from '../UserContext';
import axios from 'axios';

function QueryCard(props: QueryCardProps): JSX.Element {

   const toggleStar = () => {
      isFavorite ? setIsFavorite(false) : setIsFavorite(true)
     //get a PATCH req to push the query id into the user's favorites array
     //payload needs: query_id, username
     const payloadObj = {
         query_id: props.data.query_id,
         username: userData.username,
         favorites: userData.favorites
     }
     console.log('toggleStart payloadObj:', payloadObj)
     if(isFavorite){
         //PATCH the payloadObj to the '/manipulate/favorites/add' endpoint
         axios.patch('/manipulate/favorites/add', payloadObj)
            .then(data => {
               console.log('toggleStart add favorite data: ', data)
            })
     }else{
         //PATH to '/manipulate/favorites/remove'
         axios.patch('/manipulate/favorites/remove', payloadObj)
         .then(data => {
            console.log('toggleStart remove favorite data: ', data)
         })
     }

     
     
   }
   const { userData, setUserData } = useUserContext();
   const [isFavorite, setIsFavorite] = useState<boolean>(false)
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
            {isFavorite ? <span onClick={toggleStar} className="favorite-star">&#9733;</span> : <span onClick={toggleStar} className="favorite-star">&#9734;</span>}
         </div>
      </div>
   );
}

export default QueryCard;