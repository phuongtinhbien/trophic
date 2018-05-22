var mongoose = require('mongoose');
Type = mongoose.model('ThucPham');
khoangChat = mongoose.model('khoangChat');
vitamin = mongoose.model('vitamin');
var bcrypt = require('bcrypt');
var multer = require('multer');

exports.list_all_type = function(req, res) {
  Type.find({}, function(err, type) { 
    if (err)
      res.send(err);
     res.json(type);
  })
}; 

exports.admin_list_all_type = function(req, res) {
  Type.find({}, function(err, type) {
    if (err)
      res.send(err);
    // res.json(type);
    var i = type.length;
    console.log(type);
    Type1.find({},(err, re)=>{
      var data = { title: req.body.name, len: i, data: type, typeFood: re};
      // var data = { title: req.body.name, len: i, data: type};
      res.render("listThucPham", data);
    })
    
  });
}; 

exports.create_a_type = function(req, res) {
  var new_type = new Type(req.body);
  console.log(req.file);
  new_type.anh = req.file.originalname;
  new_type.save(function(err, type) {
    if (err)
      res.send(err);
    // res.json(type);
    res.redirect("/admin_food")
  }); 
};

exports.search_a_type = function(req, res) {
  Type.find(
    { $text : { $search : req.body.name } }, 
    { score : { $meta: "textScore" } }
)
.sort({ score : { $meta : 'textScore' } })
.exec(function(err, type) {
  
  var i = type.length;
    console.log(type);
    if (err) res.send(err);
    var data = {title:req.body.name,len: i,data: type};
    res.render("list_search",data);
});
};

exports.tongHop_a_type = function(req, res) {
  Type.find(
    { $text : { $search : req.body.name } }, 
    { score : { $meta: "textScore" } }
)
.sort({ score : { $meta : 'textScore' } })
.exec(function(err, type) {
  
  var i = type.length;
    console.log(type);
    if (err) res.send(err);
    var data = {title:req.body.name,len: i,data: type};
    res.render("tonghop_thucPham",data);
});
};
exports.read_a_type = function(req, res) {
  Type.find({_id:req.params.name}).exec(function(err, type) {
  console.log(type);
    if (err) res.send(err);
    var result = type[0];
    Type.find({loaiThucPham:result.loaiThucPham},(err,type1)=>{
      khoangChat.find({}).exec((err, kq)=>{
        vitamin.find({}).exec((err,kq1)=>{
          var donvi={};
          kq.forEach(i => {
            donvi[i.key]=i.donVi;
          });
          kq1.forEach(i => {
            donvi[i.key]=i.donVi;
          });

          console.log(donvi);
          if (err) res.send(err);
          var data = {data: result, list:type1, donVi: donvi};
          res.render("info_thucPham",data);
        })
       
      })
     
    })
    
});
};
exports.update_a_type = function(req, res) {
  var new_type = req.body;
  if (new_type.anh !=null)
  new_type.anh = req.file.originalname;

  Type.findOneAndUpdate({_id: req.params.typeId}, req.body, {new: true}, function(err, type) {
    if (err)
      res.send(err);
    //  res.json(type);
    res.redirect("/admin_food");
  });
};


exports.delete_a_type = function(req, res) {

  Type.remove({
    _id: req.params.typeId
  }, function(err, type) {
    if (err)
      res.send(err);
    // res.json({ message: 'Type successfully deleted' });
    res.redirect("/admin_food")
  });
};
