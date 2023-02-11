import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})
export const { filterChange } = filterSlice.actions 
export default filterSlice.reducer