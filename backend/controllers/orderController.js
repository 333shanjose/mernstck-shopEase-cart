const Order = require('../models/order');
const Cart = require("../models/cart");
const Item = require("../models/item");
require("dotenv").config();
const razorpay=require('../config/razorpay')
const crypto=require("crypto");

exports.placeOrder = async (req, res) => {
  try {
     console.log('placeorder reached')
    const userId = req.user.id;

    const { shippingAddress, paymentMethod,razorpay_payment_id,
      razorpay_order_id, } = req.body;

      // If Online payment, ensure payment details are present
    if (paymentMethod === "Online") {
      if (!razorpay_payment_id || !razorpay_order_id) {
        return res.status(400).json({
          message: "Payment not completed",
        });
      }
    }

    const cart = await Cart.findOne({
      userId,
    }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;

    const orderItems = cart.items.map((item) => {
      totalPrice += item.productId.price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    const order = new Order({
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentId:razorpay_payment_id || null,
      razorpayOrderId:razorpay_order_id || null
    });

    await order.save();
    console.log("User ID:", userId);
     
    cart.items = [];
    await cart.save();
    console.log("Cart after clear:", cart);
    console.log(order)
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



//create razorpay order
exports.createRazorpayOrder= async(req,res)=>{
  try{
  const {amount} = req.body
  console.log("Amount:", amount);
  const options={
    amount:amount * 100,
    currency:"INR",
    receipt : "receipt_"+Date.now()
  }
  console.log("Options:", options);
  const order=await razorpay.orders.create(options)

  res.json(order)

}catch(err){
  console.error("Razorpay Error:", err);
   res.status(500).json({message:err.message})
}
}

//varify razorpay payment
 
exports.verifyPayment=async(req,res)=>{
  try{
  
  const{
  
  razorpay_payment_id,
  
  razorpay_order_id,
  
  razorpay_signature
  
  }=req.body;
  console.log('verifypayment')

  const generated=crypto
  
  .createHmac("sha256",process.env.RAZORPAY_SECRET)
  
  .update(
  razorpay_order_id+"|"+razorpay_payment_id
  )
  
  .digest("hex");
  
  if(generated!==razorpay_signature){
  
  return res.status(400)
  .json({
    success:false,
    message:"Invalid Payment"
  
  });
}
  return res.status(200).json({
  success: true,
  message: "Payment Verified Successfully",
   });

  }catch(err){
     console.log(err)
    res.status(500).json({
      success:false,
      message:err.message
    
    });
    
    }
    
  } 
  

  //get one user orders



  exports.getMyOrders = async (req, res) => {
    try {
      const orders = await Order.find({
        userId: req.user.id,
      }).populate("orderItems.productId");
  
      res.status(200).json({
        orders,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
  
  

  // GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate(
        "orderItems.productId",
        "name price image"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};


// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};


// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};