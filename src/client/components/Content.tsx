import { useState, useEffect, ChangeEvent } from 'react';

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
    let queryData;
    
  })
  // // when tags are updated, repopulate the tags dropdown to include all possible options
  // useEffect(() => {
  //   // we will receive a array of strings of tags from backend
  //   const tagTexts: string[] = ['marketing', 'HR', 'engineering'];
  //   const tagOptions: JSX.Element[] = [];
  //   for (let i = 0; i < tagTexts.length; i++) {
  //     tagOptions.push(<option value={tagTexts[i]}>{tagTexts[i]}</option>);
  //   }
  //   setTags(tagOptions);
  // }, [tags]);

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
          <Switch
            checked={favorited}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </ThemeProvider>

      </form>
      <div id='querycard-container' className='container'>
      <QueryCard />
      </div>

    </main>
  );
}

export default Content;