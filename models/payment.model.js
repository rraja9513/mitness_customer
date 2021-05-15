const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const paymentSchema=new Schema(
    {
      paymentid:{
          type:String,
      },
      cname:{
          type:String,
      },
      pname:{
          type:String,
      },
      amount:{
          type:String,
      },
      paymentdate:{
          type:String,
      },
      accessenddate:{
          type:String,
      },
    },
    {
        timestamps:true,
    }
);
const Payment=mongoose.model('Payment',paymentSchema);
module.exports=Payment;