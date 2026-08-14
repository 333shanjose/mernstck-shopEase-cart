const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "item",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
      },
  
      paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        required: true,
      },
  
      totalPrice: {
        type: Number,
        required: true,
      },

      razorpayOrderId:String,
      razorpayPaymentId:String,

      status: {
        type: String,
        default: "Paid",
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Order", orderSchema);