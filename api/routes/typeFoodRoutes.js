module.exports = function(app) {
    var User = require('../controls/typeFoodCon');
    var multer = require('multer');
    var mkdirp = require('mkdirp');
  var storage = multer.diskStorage({
    destination: function (req, file,cb) {
          var dest  = './assets/';
       
      mkdirp(dest, function (err) {
        console.log(err);
          if (err) cb(err, dest);
          else cb(null, dest);
      });
     
    },
     filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
   
  });


    var upload = multer({ storage: storage });
  
    // User Routes
    app.route('/typeFood')
      .get(User.list_all_type)
      .post(User.create_a_type);
      
    app.post("/addTypeFood",upload.fields([{ name: 'img', maxCount: 1 }, { name: 'bg', maxCount: 1 }]),User.create_a_type);
  
    app.route('/typeFood/:typeId')
      .get(User.read_a_type)
      .post(upload.fields([{ name: 'img', maxCount: 1 }, { name: 'bg', maxCount: 1 }]),User.update_a_type)

  app.get("/del_typeFood/:typeId",User.delete_a_type);
}
