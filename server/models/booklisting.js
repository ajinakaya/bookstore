const mongoose = require('mongoose')

const booklistingSchema = new mongoose.Schema({
   bookTitle:{
      type:String,
      required:true,
   },
   authorName:{
      type:String,
      required:true,
   },
   category:{
      type:String,
      required:true,
   },
   bookDescription:{
      type:String,
      required:true,
   },
   imageURL:{
      type:String,
      required:true,
   },
   price: {
      type: Number,
      required: true,
   },
   available: {
      type: Boolean,
      required: true,
   },
   section: {
      type: String,
      required: true,
  },
  pagecount:{
   type:Number,
   required:true,
  },
  Weight:{
   type:Number,
   required:true,
  },
  ISBN:{
   type:Number,
   required:true,
  },
  Language:{
   type:String,
   required:true,
  }
})

const booklistingModel = mongoose.model(" Booklisting",booklistingSchema);
module.exports=booklistingModel;