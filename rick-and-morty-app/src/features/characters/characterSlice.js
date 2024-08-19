import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  characters: [],
  status: 'idle',
  error: null,
};

export const loadCharacters = createAsyncThunk(
  'characters/loadCharacters',
  async (searchTerm = '') => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
    const data = await response.json();
    return data.results.slice(0, 100); // Limit results to 100 characters
  }
);

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload;
      })
      .addCase(loadCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default characterSlice.reducer;
