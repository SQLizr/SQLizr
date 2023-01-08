function Toolbox () {

  const handleClicks = (e: { target: any; }) => {

    const popupBox = document.querySelector('#query-form-popup') as HTMLElement

    if ( e.target.id === 'create-query-btn'){
      popupBox.style.display = 'flex'
    }
  }

  return(
     <div id="toolbox">
      <img className="toolbox-logo" src='https://user-images.githubusercontent.com/34523493/192654338-e3f8b798-cb97-4878-befd-dacd6265bc15.png' alt="SQLizr logo"></img>
      <button>Search</button>
      <button>Favorites</button>
      <button id="create-query-btn" onClick={handleClicks}>Create New Query</button>
      <button>Edit Query</button>
     </div>
  );
}

export default Toolbox;