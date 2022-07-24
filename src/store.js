import { configureStore } from '@reduxjs/toolkit'
import signInUpReducer from './pages/register-login/signInUpSlice.js'
import systemReducer from './components/system-state/systemSlice'
import adminReducer from './pages/admin-profile/AdminProfileSlice'
import categoryReducer from './pages/categories/CategorySlice'
import productReducer from './pages/product/productSlice'
import paymentMethodReducer from './pages/payment-method/paymentMethodSlice'
import customerReducer from './pages/customers/customerSlice'
import reviewReducer from './pages/review/reviewSlice'
import orderReducer from './pages/orders/orderSlice'
 const store = configureStore({
    reducer:{
        signInUp:signInUpReducer,
        system:systemReducer ,
        admin: adminReducer,
        category: categoryReducer,
        product:productReducer,
        paymentMethod:paymentMethodReducer,
        customers:customerReducer,
        review: reviewReducer,
        orders:orderReducer
    }
})

export default store