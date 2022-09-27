import React from 'react';
import ReactDOM from 'react-dom/client'
import Dashboard from './components/Dashboard'
import Toolbox from './components/Toolbox'
import Content from './components/Content';

function App () {
    return(
        <>
        <Dashboard />
        <Toolbox />
        <Content />
        </>
    );
}

export default App;