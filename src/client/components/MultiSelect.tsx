import { useState, useEffect } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// This needs to come from backend
const tagsTexts = ['business', 'marketing', 'development', 'HR'];

function getStyles(name: string, tagsText: readonly string[], theme: Theme) {
  return {
    fontWeight:
      tagsText.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tagsTexts>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          id="tags-multiple-chip"
          multiple
          value={tags}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tagsTexts.map((tagsText) => (
            <MenuItem
              key={tagsText}
              value={tagsText}
              style={getStyles(tagsText, tagsTexts, theme)}
            >
              {tagsText}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
