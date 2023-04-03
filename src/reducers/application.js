 

// export default (state = initialState, action = {}) => {
//   switch (action.type) {
//     case actionTypes.CHANGE_THEME:
//       return {
//         ...state,
//         theme: action.theme,
//       };
//     case actionTypes.CHANGE_FONT:
//       return {
//         ...state,
//         font: action.font,
//       };
//     case actionTypes.FORCE_APPEARANCE:
//       return {
//         ...state,
//         force_dark: action.force_dark,
//       };
//     case actionTypes.CHANGE_LANGUAGE:
//       return {
//         ...state,
//         language: action.language,
//       };
//     default:
//       return state;
//   }
// };


import {createSlice} from '@reduxjs/toolkit';

export const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    theme: null,
  font: null,
  force_dark: null,
  language: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login.success = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {loginSuccess} = applicationSlice.actions;

export default applicationSlice.reducer;
