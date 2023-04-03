
import AuthReducer from "../reducers/auth";
import ApplicationReducer from "../reducers/application"; 
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    application: ApplicationReducer
  }
})