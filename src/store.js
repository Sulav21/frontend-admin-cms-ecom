import { configureStore } from '@reduxjs/toolkit'
import signInUpReducer from './pages/register-login/signInUpSlice.js'
import systemReducer from './components/system-state/systemSlice'
import adminReducer from './pages/admin-profile/AdminProfileSlice'
import categoryReducer from './pages/categories/CategorySlice'
import productReducer from './pages/product/productSlice'
import paymentMethodReducer from './pages/payment-method/paymentMethodSlice'
const store = configureStore({
    reducer:{
        signInUp:signInUpReducer,
        system:systemReducer ,
        admin: adminReducer,
        category: categoryReducer,
        product:productReducer,
        paymentMethod:paymentMethodReducer,
    }
})

export default store