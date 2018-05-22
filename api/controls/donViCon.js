var mongoose = require('mongoose'),
  Type = mongoose.model('donVi');

exports.list_all_type = function(req, res) {
  Type.find({}, function(err, type) {
    if (err)
      res.send(err);
      var i = type.length;
      console.log(type);
      var data = { title: req.body.name, len: i, data: type };
      res.render("listDonVi", data);
  });
};

exports.create_a_type = function(req, res) {
  console.log(req.body);
  var new_type = new Type(req.body);
  console.log(new_type);
  new_type.save(function(err, type) {
    if (err)
      res.send(err); 
    // res.json(type);
    res.redirect("/donVi");
  }); 
};


exports.read_a_type = function(req, res) { 
  Type.find({_id:req.params.typeId}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};


exports.update_a_type = function(req, res) {
  var new_type = req.body;
  console.log(new_type);
  Type.findOneAndUpdate({_id: req.params.typeId}, new_type, {new: true}, function(err, type) {
    if (err)
      res.send(err);
    // res.json(type);
    res.redirect("/donVi");
  });
};


exports.delete_a_type = function(req, res) {

  Type.remove({
    _id: req.params.typeId
  }, function(err, type) {
    if (err)
      res.send(err);
    // res.json({ message: 'Type successfully deleted' });
    res.redirect("/donVi");
  });
};