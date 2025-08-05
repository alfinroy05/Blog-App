const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
      message: {
    type: String,
    required: true
  },
    postedDate:{type: Date,
        default:Date.now}
}

)
var postModel=mongoose.model("post",postSchema)
module.exports=postModel
