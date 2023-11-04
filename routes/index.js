var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
//  var upload = multer({ dest: 'uploads/' });
main().catch(err => console.log(err));

async function main() {
  var url = "mongodb+srv://logDug:Long16203@cluster0.nfugwta.mongodb.net/Shoes";
  await mongoose.connect(url);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const productSchema = new mongoose.Schema({
  name: String,
  cart: String,
  brand: String,
  priceNew: Number,
  priceOld: Number,
  number: Number,
  description: String,
  avartarFile: String,
  productSizes: [String], // Array to store selected sizes
});
const cartSheme = new mongoose.Schema({
  nameCart: String,
});
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const hash = crypto.createHash('md5').update(file.originalname + Date.now()).digest('hex');
    const fileExtension = path.extname(file.originalname);
    cb(null, hash + fileExtension);
  }
});

const upload = multer({
  storage: storage,
});
router.get('/', async function (req, res, next) {
  var query = mongoose.model("product", productSchema, "products");

  const data = await query.find();
  res.render('index', { title: 'Express', data: data });
});

router.get('/dataShoesl', async function (req, res) {
  var query = mongoose.model("product", productSchema, "products")
  const data = await query.find()
  res.status(200).json({
    data: data
  });
})
router.post('/addProduct', upload.single('avatar'), async function (req, res, next) {
  const productName = req.body.productName;
  const productCart = req.body.productCart;
  const productBrand = req.body.productBrand; // Get the selected brand from the dropdown
  const productPriceNew = req.body.productPriceNew;
  const productPriceOld = req.body.productPriceOld;
  const productNumber = req.body.productNumber;
  const productDescription = req.body.productDescription;
  const productSizes = req.body.productSizes; // Get selected sizes as an array
  const anhDaiDien = req.file ? 'uploads/' + req.file.filename : null;

  var query = mongoose.model("product", productSchema, "products")
  await query.insertMany({
    name: productName,
    cart: productCart,
    brand: productBrand,
    priceNew: productPriceNew,
    priceOld: productPriceOld,
    number: productNumber,
    description: productDescription,
    avartarFile: anhDaiDien,
    productSizes: productSizes, // Assign selected sizes to the productSizes field
  });
  // Redirect to the desired page after adding the product
  res.redirect("/");

});
router.get('/delete', async function (req, res) {
  const id = req.query.id;
  var query = mongoose.model("product", productSchema, "products")
  await query.deleteOne({ _id: id })
  res.redirect('/');
});


router.post("/addCategory", async function (req, res, next) {
  const name = req.body.categoryName;
  var query = mongoose.model("cart", cartSheme, "carts");
  await query.insertMany({
    nameCart: name
  });
  res.redirect('/');
});
router.get('/deleteCategory', async function (req, res, next) {
  const id = req.query.id;
  var query = mongoose.model("cart", cartSheme, "carts");
  await query.deleteOne({
    _id: id
  });
  res.redirect('/');
});
module.exports = router;
