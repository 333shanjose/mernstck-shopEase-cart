const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const Cart=require('./models/cart')
const Item=require('./models/item')
const Category=require('./models/category')
const User=require('./models/user')
const { createRazorpayOrder,verifyPayment,placeOrder,getMyOrders,getAllOrders,
  deleteOrder,
  updateOrderStatus, } = require("./controllers/orderController");
const {
  getProducts,
  getProductsBy,
  getProductById

} = require("./controllers/productController");

const {
  getAllUsers,
  deleteUser,
  toggleBlockUser,
} = require("./controllers/adminUserController");


mongoose.connect('mongodb://localhost:27017/user', {
    
}).then(() => {
    console.log('Connected to user database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage })


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.get("/", (req, resp) => {
    resp.send("App is working");
});
//tokenMiddileware
 const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, 'code23act');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// API to register a user 
app.get("/login",authMiddleware,async(req,resp)=>{
    
    try{
        //const authHeader = req.headers.authorization;
         
       // if (!authHeader) return resp.json({ getData: null });
        //const token=authHeader.startsWith('Bearer ')?authHeader.split(" ")[1]:authHeader
                    
        //const decoded = jwt.verify(token, "your_secret_key"); // JWT verification
        //const user = await User.findById(decoded.id);
        resp.json({ getData: req.user });
        
    }
    catch (error) {
        resp.status(500).json({ message: "Something went wrong", error: error.message });
        console.log(error)
        
    }

})
app.post('/admin/add-products',upload.single("image"),async(req,res)=>{
    console.log(req.file)
    try{
        const product = await Item.create({
            name: req.body.name,
            price: req.body.price,
            description:req.body.description,
            category:req.body.category,
            image: req.file ? req.file.filename : null
        })
        res.status(201).json(product);
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong", error: error.message });

    }
})

//get the products
app.get("/products", getProducts)


//get productDetails
app.get("/product/:id", getProductById);

//get searched products

app.get("/products", getProductsBy);


app.get('/admin/products',async(req,res)=>{
    const products=await Item.find()
     res.json({products})
})
app.get('/admin/product/:id', async (req, res) => {
    try {
      console.log(req.params.id);
  
      const product = await Item.findById(req.params.id);
  
      res.json(product); // ✅ send single product
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
 
  app.put('/admin/product/:id',upload.single('image'),async(req,res)=>{
    const updateData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
      };
       console.log(updateData.name)
      if (req.file) {
        updateData.image = req.file.filename;
      }
    
      const updated = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
      res.json(updated);
    });

    app.delete('/admin/product/:id',async(req,res)=>{
         console.log('delete')
        try {
            const id = req.params.id;
        
            await Item.findByIdAndDelete(id);
        
            res.json({ message: "Product deleted successfully" });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        });

      // ADD category
    app.post("/admin/category", upload.single("image"),async (req, res) => {
        const newCat = new Category({ name: req.body.name,image:req.file.filename });
        await newCat.save();
         console.log(newCat)
        res.json(newCat);
        });     

  // GET all categories
  app.get("/admin/categories", async (req, res) => {
    const data = await Category.find();
    res.json(data);
  });

  // GET single category
  app.get("/admin/category/:id", async (req, res) => {
    const data = await Category.findById(req.params.id);
    res.json(data);
  });

  // UPDATE category
app.put("/admin/category/:id", async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      image:req.file.filename
    });
    res.json({ message: "Updated" });
  });
  

  // DELETE category
app.delete("/admin/category/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  });
   
  //addCart

   app.post('/add-cart',authMiddleware,async(req,res)=>{
     try{
       console.log('reached add cart')
      const userId=req.user.id
      const productId = new mongoose.Types.ObjectId(req.body.productId);
      let cart=await Cart.findOne({userId})
      if(!cart){
         cart=await Cart.create({
           userId,
           items:[{productId:productId,quantity:1}]
         })
      }else{
         const item=cart.items.find((i)=>{
          return i.productId.toString() ===productId.toString()
         })

        if(item){
           item.quantity+=1
        }else {
          cart.items.push({
            productId,
            quantity: 1,
          });
        }
  
        await cart.save();
      }
      console.log(cart.items);
      const updatedCart = await Cart.findOne({ userId }).populate(
        "items.productId"
      );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
      
   })



  //getCart
  app.get('/cart',authMiddleware,async(req,res)=>{
    try{
     const userId=req.user.id
     const cart=await Cart.findOne({userId}).populate('items.productId')
     console.log(cart.items[0].productId) 
     if (!cart) {
      return res.json({ items: [] });
    }
     res.json(cart)
    }catch(error){
       res.status(500).json({message:error.message})
    }
  })

  //update cart

  app.put('/cart/update-cart', authMiddleware, async (req, res) => {
    try {
      const { productId, action } = req.body;
        console.log(action)
      const cart = await Cart.findOne({
        userId: req.user.id,
      });
  
      const item = cart.items.find(
        (i) => i.productId.toString() === productId
      );
  
      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }
  
      if (action === "increase") {
        item.quantity++;
      }
  
      if (action === "decrease") {
        item.quantity--;
  
        if (item.quantity <= 0) {
          cart.items = cart.items.filter(
            (i) => i.productId.toString() !== productId
          );
        }
      }
  
      await cart.save();
  
      const updatedCart = await Cart.findOne({
        userId: req.user.id,
      }).populate("items.productId");
  
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


  //Remove cartItem
   
  app.delete('/cart/remove-cart/:id',authMiddleware,async(req,res)=>{
     try{
        const productId =req.params.id
       const cart=await Cart.findOne({userId:req.user.id})
       cart.items=cart.items.filter((i)=>{
          return i.productId.toString()!==productId
       }) 
        await cart.save()
        const updatedCart = await Cart.findOne({
          userId: req.user.id,
        }).populate("items.productId");
    
        res.json(updatedCart);
     
        
       } catch (err) {
        res.status(500).json(err);
      }
      })
  
  //Create razorpay order

  app.post('/payment/create-order',authMiddleware,createRazorpayOrder)

  //verify the razorpay payment
  app.post('/payment/verify',authMiddleware,verifyPayment)
      
  //place and save the order
  app.post('/placeorder',authMiddleware,placeOrder)
   
  //orders displayed
  app.get('/myOrders',authMiddleware,getMyOrders)

   // Get all orders
  app.get("/admin/orders", getAllOrders);


// Delete order
  app.delete("/admin/order/:id", deleteOrder);


// Update order status
  app.put("/admin/order/:id/status", updateOrderStatus);

// Get all users
app.get(
  "/admin/users",
  getAllUsers
);


// Delete user
app.delete(
  "/admin/users/:id",
  deleteUser
);


// Block / Unblock user
app.put(
  "/admin/users/:id/toggle-block",
  toggleBlockUser
);


app.post("/signup", async (req, resp) => {
    try {
        
         const {email,password,name} =req.body
         const existingUser = await User.findOne({ email });

        if (existingUser) {
          return resp.status(400).json({ message: "Email already registered" });
        }
          hashedpassword =await bcrypt.hash(password,10)
          const user=new User({
              name,
              email,
              password:hashedpassword,

          })
          let result = await user.save();
          if (result) {
            const userResult = result.toObject();
            delete userResult.password;
             // Ensure you're not sending sensitive info
            console.log(result)
            resp.status(201).json({result: userResult}); // Send successful response
            
        } else {
            console.log("User already registered");
            resp.status(400).json({message:"User already registered"});
        }
    } catch (error) {
        resp.status(500).json({ message: "Something went wrong", error: error.message });
        console.log(error)
        
    }
});
app.post('/login',async(req,resp)=>{
       console.log(req.body)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(401).json({ message: "Invalid credentials" });
          }
        console.log(user)
        
        const matchPassword=await bcrypt.compare(password,user.password)
        console.log(matchPassword)
        if(!matchPassword){
             return resp.status(400).json({message:'invalid password'});
    }
    const token = jwt.sign(
        { id: user._id },
        "code23act",
        { expiresIn: "1d" }
      );
      resp.json({
        token: token,
        user: user
      });
    
    } catch (error) {
         resp.status(500).json({ message: "Something went wrong", error: error.message });
         console.log(error.message)
    }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
