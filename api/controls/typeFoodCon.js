var mongoose = require('mongoose'),
  Type = mongoose.model('loaiThucPham');
var bcrypt = require('bcrypt');
var multer = require('multer');

exports.list_all_type = function (req, res) {
  Type.find({}, function (err, type) {
    if (err)
      res.send(err);
    var i = type.length;
    console.log(type);
    var data = { title: req.body.name, len: i, data: type };
    res.render("listLoaiThucPham", data);
  });
};

exports.create_a_type = function (req, res) {
  var new_type = new Type(req.body);
  new_type['img']="/thucPham_img/"+ req.files['img'][0].originalname;
  new_type['bg']= "/thucPham_img/"+req.files['bg'][0].originalname;
  console.log(new_type)
  
  new_type.save(function (err, type) {
    if (err)
      res.send(err);
    res.redirect("/typeFood")
  });
};


exports.read_a_type = function(req, res) {
  Type.find({key:req.params.typeId}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};


exports.update_a_type = function (req, res) {
  var new_type = req.body;
  if (req.files['img'] != null)
    new_type['img']="/thucPham_img/"+ req.files['img'][0].originalname;
  if (req.files['img'] != null)
    new_type['bg']= "/thucPham_img/"+req.files['bg'][0].originalname;
  Type.findOneAndUpdate({ _id: req.params.typeId }, new_type, { new: true }, function (err, type) {
    if (err)
      res.send(err);
    // res.json(type);
    res.redirect("/typeFood");
  });
};


exports.delete_a_type = function (req, res) {

  Type.remove({
    _id: req.params.typeId
  }, function (err, type) {
    if (err)
      res.send(err);
    // res.json({ message: 'Type successfully deleted' });
    res.redirect("/typeFood");
  });
};


