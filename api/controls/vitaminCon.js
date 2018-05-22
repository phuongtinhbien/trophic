var mongoose = require('mongoose'),
  Type = mongoose.model('vitamin');
Type1 = mongoose.model('donVi');
Type2 = mongoose.model('ThucPham');

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
      Type1.find({}, (err, re) => {
        var data = {
          title: req.body.name,
          len: i,
          data: type,
          donVi: re
        };
        res.render("listVitamin", data);
      });
    });
};

exports.create_a_type = function (req, res) {
  var new_type = new Type(req.body);
  new_type.save(function (err, type) {
    if (err) 
      res.send(err);
    res.redirect("/admin_vitamin");
  });
};

exports.read_a_type = function (req, res) {
  Type
    .find({
      key: req.params.typeId
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
      res.redirect("/admin_vitamin");
    });
};

exports.delete_a_type = function (req, res) {

  Type
    .remove({
      _id: req.params.typeId
    }, function (err, type) {
      if (err) 
        res.send(err);
      
      // res.json({message: 'Type successfully deleted'});
      res.redirect("/admin_vitamin");
    });
};

exports.search_a_type = function (req, res) {
  Type.find({
    $text: {
      $search: req.body.name
    }
  }, {
      score: {
        $meta: "textScore"
      }
    })
    .sort({
      score: {
        $meta: 'textScore'
      }
    })
    .exec(function (err, type) {
      console.log(type);
      if (err) 
        res.send(err);
      const key = type[0].key;
      var text = {
        [key]: {
          $gt: 0
        }
      };
      Type2.find({
        [key]: {
          $gt: 0
        }
      }).sort({[key]: 1}).exec((err, type2) => {
        var i = type2.length;
        console.log(type2);
        var data = {
          title: req.body.name,
          len: i,
          data: type[0],
          data1: type2
        };
        res.render("list_vitamin_khoangChat", data);
      });

    });
};
