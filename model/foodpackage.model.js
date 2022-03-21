const { default: mongoose } = require("mongoose");
const Schema= mongoose.Schema;
const foodPackagesSchema = new mongoose.Schema({
  packagename: {
    type: String,
    required: true
  },
  packageprice:{
      type:Number,
      require:true,
      min:1
  },
  packageqty:{
    type:Number,
    require:true,
    min:1
  },
  packageDescription:{
    type: String,
    required: true
  },
  foodimage: {
    type: String,
    required: true
  },

  categoryId: {
     type:Schema.Types.ObjectId,
     require:true
  }
});
module.exports = mongoose.model("foodPackages", foodPackagesSchema);