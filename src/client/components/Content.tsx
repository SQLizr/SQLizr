import { useState, useEffect } from 'react';
import QueryCard from "./QueryCard";

function Content () {
  const [tags, setTags] = useState<Array<string>>([]);
  
  // when tags are updated, repopulate the tags dropdown to include all possible options
  useEffect(() => {
    // we will receive a array of strings of tags from backend
    const tagTexts: string[] = ['marketing', 'HR', 'engineering'];
    const tagOptions: Element[] = [];
    for(let i = 0; i < tagText.length; i++){
      // tagOptions.push(<option value={tagText[i]}>{tagText[i]}</option>);
    }
  }, [tags]);

  return(
    <main id="content" >
      <form  id="filter-bar" > 
        <div className="filter-field" id='metric-name'> 
          <input type="text" id="metric-name" name="metric-name" placeholder="type metric name here"/>
          <button id="metric-search-btn">search</button> 
        </div>
        <select className="filter-field" id='request-type' aria-label="type-selector" defaultValue={''}>
          <option value="" disabled hidden>Request Type</option>
          <option value="add">Add</option>
          <option value="delete">Delete</option>
          <option value="update">Update</option>
          <option value="find">Find</option>
        </select>
        <select className="filter-field" id='tag-selector' aria-label="tag-selector" defaultValue={''} multiple>
          <option value="" disabled hidden>Select Tags</option>
        </select>
        <button className="filter-field" id="sort-btn">sort</button>
        <h4 className="filter-field" id="favorite">Favorite</h4>  
      </form>
      <QueryCard/>
      
    </main>
  );
}

export default Content;