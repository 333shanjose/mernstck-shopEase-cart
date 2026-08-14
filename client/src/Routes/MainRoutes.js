import React from 'react'
import {Switch,BrowserRouter as Router, Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Dashbord from '../Pages/admin/Dashbord'
import Products from '../Pages/admin/Products'
import AdminOrders from '../Pages/admin/AdminOrdersPage'
import ProductsAdd from '../Pages/admin/ProductsAdd'
import ProductsEdit from '../Pages/admin/ProductsEdit'
import  AdminCategories  from '../Pages/admin/AdminCategories'
import  AdminAddCategories  from '../Pages/admin/AdminAddCategories'
import  AdminEditCategories  from '../Pages/admin/AdminEditCategories'
import CartPage from '../Pages/CartPage'
import CheckoutPage from '../Pages/Checkout'
import OrdersPage from '../Pages/Orders'
import ProductsPage from '../Pages/ProductsPage'
import ProductDetailsPage from '../Pages/ProductDetailsPage'
import AdminUsers from '../Pages/admin/AdminUsers'










function MainRoutes() {
    return (
       <Router>
           
           <Route exact path="/">
               <Home/>
           </Route>
           <Route path="/signup">
               <Signup/>
           </Route>
           <Route path="/login">
               <Login/>
           </Route>
           <Route path="/cart">
               <CartPage/>
           </Route>
           <Route path="/checkout">
               <CheckoutPage/>
           </Route>
           <Route path="/orders">
               <OrdersPage/>
           </Route>
           <Route path="/products">
               <ProductsPage/>
           </Route>

           <Route path="/product/:id">
               <ProductDetailsPage/>
           </Route>

           


           <Switch>
           <Route path="/admin/users" component={AdminUsers} />
           <Route path="/admin/products" component={Products} />
            <Route path="/admin/orders" component={AdminOrders} />
            <Route path="/admin/add-products" component={ProductsAdd} />
            <Route path="/admin/categories" component={AdminCategories} />
            <Route path="/admin/add-categories" component={AdminAddCategories} />
            <Route path="/admin/edit-categories/:id" component={AdminEditCategories} />
            <Route path="/admin/edit-products/:id" component={ProductsEdit} />
            <Route path="/admin" component={Dashbord} />

          </Switch>
           
            
         
           

           
       </Router>
    )
}

export default MainRoutes
