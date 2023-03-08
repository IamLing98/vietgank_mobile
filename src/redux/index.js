import { configureStore } from '@reduxjs/toolkit'
import numberReducer from './reducers/number'
import authReducer from './reducers/authReducer'

export default configureStore({
  reducer: {
    numberReducer:numberReducer,
    authReducer:authReducer
  }
})