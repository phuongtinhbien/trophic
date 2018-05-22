var mongoose = require('mongoose'),
  Type = mongoose.model('User');
var bcrypt = require('bcrypt');

exports.list_all_type = function (req, res) {
  Type
    .find({}, function (err, type) {
      if (err) 
        res.send(err);
      res.json(type);
    });
};

exports.admin_list_all_type = function (req, res) {
  Type
    .find({}, function (err, type) {
      if (err) 
        res.send(err);
      // res.json(type);
      var i = type.length;
      console.log(type);
      var data = {
        title: req.body.name,
        len: i,
        data: type
      };
      res.render("listUser", data);
    });
};

exports.create_a_type = function (req, res) {
  var new_type = new Type(req.body);
  console.log(req.body);
  if (req.body.admin == 'on') 
    new_type.admin = true;
  else 
    new_type.admin = false;
  console.log(new_type);
  new_type.save(function (err, type) {
    if (err) 
      res.send(err);
      res.redirect("/admin_user");
  });
};

exports.read_a_type = function (req, res) {
  Type
    .findOne({
      username: req.params.username
    }, function (err, type) {
      if (err) 
        res.send(err);
      res.json(type);
    });
};

exports.update_a_type = function (req, res) {
  Type
    .findOneAndUpdate({
      _id: req.params.typeId
    }, req.body, {
      new: true
    }, function (err, type) {
      if (err) 
        res.send(err);
        res.redirect("/admin_user");
    });
};

exports.log_in = function(req, res){
  console.log(req.body);
    Type.findOne({username: req.body.InputEmail}, function(err, type){
      if (err) throw err;
      console.log(type);
      if (type)
      type.comparePassword(req.body.InputPassword, function(err, isMatch){
        
        if (err)  res.redirect("/signin") ;
          if (isMatch){
            console.log(isMatch);
           req.session.username = req.body.InputEmail;

            
            res.redirect("/signin") ;
            
          }
          else{
            res.redirect("/signin");
          }
      });
      else res.redirect("/signin") ;
    });
  }

exports.delete_a_type = function (req, res) {

  Type
    .remove({
      _id: req.params.typeId
    }, function (err, type) {
      if (err) 
        res.send(err);
      // res.json({message: 'Type successfully deleted'});
      res.redirect("/admin_user");
    });
};
