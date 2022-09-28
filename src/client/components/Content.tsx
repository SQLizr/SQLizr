import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

// Material UI 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import QueryCard from "./QueryCard";
import MultiSelect from "./MultiSelect";

import { QueryData, QueryCardProps } from "../Types"


// this is for custom color of MUI components
const theme = createTheme({
  palette: {
    primary: {
      main: '#320644',
      contrastText: '#fff',
    },
  },
});

// the below contains typescript type declaration for above color theme
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}


function Content() {

  const [queries, setQueries] = useState<Array<JSX.Element>>([]);
  const [favorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    const queryCards: JSX.Element[] = [];

    // fetch GET /search to the backend
    axios.get('/search')
      .then((res) => {
        const data: QueryData[] = res.data;
        for (let i = 0; i < data.length; i++) {
          // iterate through this array, and with each object in the array, create a new Query Card component
          // push that into queryCards array
          queryCards.push(<QueryCard data={data[i]} />)
        }
        // setState -> setQueries to set queries = queryCard
        setQueries(queryCards);

        console.log('I am the res.data: ', data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    // receive an array of objects
    // with keys: query_id, metric_name, http_typ, tags (array of strings), authorization_status, query_data


  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFavorited(event.target.checked);
  };

  return (
    <main id="content" >
      <form id="filter-bar" >
        <ThemeProvider theme={theme}>
          <div className="filter-field" id='metric-name'>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="metric-ame" label="Metric Name" variant="standard" />
            </Box>
            <Button color="primary" variant="contained" id='metric-search-btn'>
              search
            </Button>
          </div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                label="Type"
              >
                <MenuItem value="POST">Add</MenuItem>
                <MenuItem value="GET">Find</MenuItem>
                <MenuItem value="PUT">Edit</MenuItem>
                <MenuItem value="DELETE">Delete</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <MultiSelect />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                label="sort"
              >
                <MenuItem value="alphabet-increasing">A-Z</MenuItem>
                <MenuItem value="alphabet-decreasing">Z-A</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div id='fav-toggle'>
            <h2>&#9733;</h2>
            <Switch
              checked={favorited}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </ThemeProvider>

      </form>
      <div id='querycard-container' className='container'>
        {queries}
      </div>

    </main>
  );
}

export default Content;