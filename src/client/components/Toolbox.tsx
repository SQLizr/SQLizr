function Toolbox () {

  const handleClicks = (e: { target: any; }) => {

    const popupBox = document.querySelector('#query-form-popup') as HTMLElement

    if ( e.target.id === 'create-query-btn'){
      popupBox.style.display = 'flex'
    }
  }

  return(
     <div id="toolbox">
      <button>Search</button>
      <button>Edit</button>
      <button id="create-query-btn" onClick={handleClicks}>Create New Query</button>
      <button>Edit Query</button>
     </div>
  );
}

export default Toolbox;