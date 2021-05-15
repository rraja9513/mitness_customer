const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const feedSchema=new Schema(
    {
      image:{
          imagename:{type:String},
          like:{type:String},
          comment:{type:String},
          spam:{type:String},
          spamcount:{type:String},
          cname:{type:String},
      },
      progressrate:{
        progressname:{type:String},
        like:{type:String},
        comment:{type:String},
        spam:{type:String},
        spamcount:{type:String},
        cname:{type:String},
      }
    },
    {
        timestamps:true,
    }
);
const Feed=mongoose.model('Feed',feedSchema);
module.exports=Feed;