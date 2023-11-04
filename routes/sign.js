var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//  var upload = multer({ dest: 'uploads/' });
main().catch(err => console.log(err));

async function main() {
  var url = "mongodb+srv://Picsums:Long16203@cluster0.pva3ymt.mongodb.net/Picsums";
  await mongoose.connect(url);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const Users = new mongoose.Schema({
  username: String,
  password: String,
});

router.post('./sign/addSign', async function (req, res, next) {
    const username = req.body.UsernameSign1;
    const password = req.body.PasswordSign1;
    console.log('haha  '+username);
    // Lấy đường dẫn ảnh từ các files upload và tạo mảng đường dẫn hình ảnh
    var query = mongoose.model("user", Users, "users")
    await query.create({
      username: username,
      password : password,
    });
  
    res.render('sign');
  });

module.exports = router;