//INITITIAL
var express = require("express");
const bodyParser= require('body-parser');

var session = require('express-session');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var TaskDonVi = require('./api/models/donVi');
var TaskKhoangChat = require('./api/models/khoangChat');
var TaskVitamin = require('./api/models/vitamin');

var TaskFood = require('./api/models/food');
var TaskTypeFood = require('./api/models/typeFood');
var foodCon = require('./api/controls/foodCon');
var donViCon = require('./api/controls/donViCon');
var khoangChatCon = require('./api/controls/khoangChatCon');

var vitaminCon = require('./api/controls/vitaminCon');

var typeFoodCon = require('./api/controls/typeFoodCon');

var TaskUser = require('./api/models/user');
var userCon = require('./api/controls/userCon');










const detect = require('./detect_image');
var bcrypt = require('bcrypt');

var routeUser = require("./api/routes/userRoutes");
var routeFood = require("./api/routes/foodRoutes");
var routeTypeFood = require("./api/routes/typeFoodRoutes");
var routeDonVi=require("./api/routes/donViRoutes");
var routeVitamin=require("./api/routes/vitaminRoutes");
var routeKhoangChat=require("./api/routes/khoangChatRoutes");



var multer = require('multer');
var mkdirp = require('mkdirp');
var storage = multer.diskStorage({
destination: function (req, file, cb) {
  //var code = JSON.parse(req.body.model).empCode;
  var dest = './assets/uploads/detect';
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
app.listen(3000);

    //NOTIFICATON CONNECT SUCCESSFULLY
    console.log("SUCCESSFULLY......");

//GET DATA FROM #FORM
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

//LUU FILE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //var code = JSON.parse(req.body.model).empCode;
      var dest = './uploads/';
      mkdirp(dest, function (err) {
          if (err) cb(err, dest);
          else cb(null, dest);
      });
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname);
    }
  });
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));
  var upload = multer({ storage: storage });
  
app.post('/upload', upload.single("anh"), function(req , res){
      console.log(req.body);
      res.redirect("/admin_food");
});
var upload = multer({storage:storage});
//DATABASE
const Mongo = require('mongodb').MongoClient;
app.set("view engine","ejs");
app.set("views", "./views")

//ADMIN
app.get("/admin_bg",function(req,res){
    res.sendFile(__dirname+"/assets/bg_admin_login.png")
});
app.get("/css/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/css/"+id)
});
app.get("/css_bootstrap/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/css/lib/bootstrap/"+id)
});

app.get("/css_calendar/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/css/lib/calendar2/"+id)
});

app.get("/js/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/"+id)
});

app.get("/js_jquery/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/jquery/"+id)
});

app.get("/js_jsbt/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/bootstrap/js/"+id)
});

app.get("/js_sticky/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/sticky-kit-master/dist/"+id)
});

app.get("/js_calendar/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/calendar-2/"+id)
});

app.get("/js_datatables/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/datatables/"+id)
});

app.get("/js_button/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/"+id)
});

app.get("/js_zip/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/"+id)
});

app.get("/js_pdfmake/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/"+id)
});

app.get("/icons/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/icons/"+id)
});
app.get("/flags/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/icons/flag-icon-css/flags"+id)
});
app.get("/fonts/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/icons/fonts/"+id)
});


app.get("/images/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/images/"+id)
});

app.get("/images_users/:id",(req,res)=>{
    var id= req.params.id;
    res.sendFile(__dirname+"/admin/images/users/"+id)
});
app.get("/dashboard",function(req,res){
    res.render("./sitesupport/dashboard");
});

//HOME
app.get("/admin",function(req,res){
    
    console.log(req.session);
    res.render("signin")
});
app.get("/signin",function(req,res){
    sess= req.session;
    console.log(sess.username);
    if (JSON.stringify(sess.username)) return res.render("./sitesupport/dashboard");
    else
        return res.redirect("admin")
});

routeUser(app);
routeFood(app);
routeKhoangChat(app);
routeVitamin(app);
routeTypeFood(app);
routeDonVi(app);


//HOME
app.get("/", function(req,res){

    Mongo.connect(uri, (err, db)=>{
        if (err) throw err;
        var dbo = db.db('TrophicDB')
        dbo.collection('loaithucphams').find().toArray(
            function(err,result){
                if (err) throw err;
                console.log(result);
                        res.render("index", {result:result});

                });
            });
        
 });
    


app.get("/home", function(req,res){
    res.redirect("/");
});

//BACKGROUND HEADER
app.get("/header", function(req,res){
    res.sendFile(__dirname + '/assets/Path1.png');
});
app.get("/head1", function(req,res){
    res.sendFile(__dirname + '/assets/head1.png');
});

app.get("/css1",(req, res)=>{
    res.sendFile(__dirname+"/css/styles.css");
})

//BRAND
app.get("/brand", function(req,res){
    res.sendFile(__dirname + '/assets/brand/brand.png');
});
app.get("/nutri1", function(req,res){
    res.sendFile(__dirname + '/assets/nutrition-icon.png');
});
app.get("/nutri", function(req,res){
    res.sendFile(__dirname + '/assets/nutrition-icon.svg');
});
app.get("/buaAnDinhDuong", function(req,res){
    res.sendFile(__dirname + '/assets/buaAnDinhDuong.png');
});

app.get("/thucPham_img/:id",function(req,res){
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/"+id);
})
app.get("/food_img/:id",(req,res)=>{
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/uploads/"+id);
})


app.get('/logout', function(req, res, next) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/admin');
        }
      });
    });

//THUC PHAM
app.get("/thucPham/:id",function(req,res){
    var id = req.params.id;
    Mongo.connect(uri, (err, db)=>{
        if (err) throw err;
        var dbo = db.db('TrophicDB')
      
        dbo.collection('loaithucphams').find({key:id}).toArray(
            function(err,result){
                if (err) throw err;
                console.log(result);
                dbo.collection("thucphams").find({loaiThucPham: id}).toArray(
                    function(err, result1){
                        if (err) throw err;
                        res.render("thucPham",{listThucPham:result1,info:result[0]});
                    }
                )
               
                
            }
        );
        
    });
});
// app.get("/add_donVi",(req,res)=>{
//     res.render("add_donVi");
// });

app.get("/add_thucPham",(req,res)=>{
    res.render("add_ThucPham");
});
app.get("/add_vitaminkc",(req,res)=>{
    res.render("add_vitamin&kc");
});

//DINH DUONG
app.get("/dinhDuong/:id",function(req,res){
    var id = req.params.id;
    Mongo.connect(uri, (err, db)=>{
        if (err) throw err;
        var dbo = db.db('TrophicDB')
        dbo.collection('dinhDuong').find({key:id}).toArray(
            function(err,result){
                if (err) throw err;
                console.log(result);
                res.render("thucPham",result[0],(err,html)=>{
                    if(err){res.redirect("/home");}
                    
                });
            }
        );
        
    });
});

//THONG TIN THEM
app.get("/thongTinThem",function(req,res){
    res.render("thongTinThem");
});


app.get("/social/:id",function(req,res){
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/social/"+id+".png");
});

//TINH DINH DUONG
app.get("/tinhDinhDuong",(req,res)=>{
    res.render("tinhDinhDuong");
});

app.post("/detect_image",upload.single("detect"),detect.detect_image);
app.post("/detect_meal",upload.single("detect_meal"),detect.detect_image1);

app.get("*",function(req,res){
    res.render("./sitesupport/error_404");
});

