
import AuthReducer from "./auth";
import ApplicationReducer from "./application"; 
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    application: ApplicationReducer
  }
})