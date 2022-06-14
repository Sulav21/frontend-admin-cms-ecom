import { configureStore } from '@reduxjs/toolkit'
import signInUpReducer from './pages/register-login/signInUpSlice.js'
import systemReducer from './components/system-state/systemSlice'
import adminReducer from './pages/admin-profile/AdminProfileSlice'
import categoryReducer from './pages/categories/CategorySlice'
const store = configureStore({
    reducer:{
        signInUp:signInUpReducer,
        system:systemReducer ,
        admin: adminReducer,
        category: categoryReducer,
    }
})

export default store