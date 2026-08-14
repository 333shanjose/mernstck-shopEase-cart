import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reduxSlice/CartSlice";
import userReducer from "../reduxSlice/userSlice";
import orderReducer from "../reduxSlice/OrderSlice";
import paymentReducer from "../reduxSlice/PaymentSlice";
import productReducer from "../reduxSlice/ProductSlice";
import categoryReducer from "../reduxSlice/CategorySlice";
import adminUserReducer from "../reduxSlice/AdminUserSlice";

 export const store=configureStore({
     reducer:{
      products: productReducer,  
      cart:cartReducer,
      user:userReducer,
      order:orderReducer,
      payment:paymentReducer,
      categories:categoryReducer,
      adminUsers: adminUserReducer,

     }
})
 