module.exports = function(app) {
    var User = require('../controls/userCon');
    var session = require('express-session');
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));
  
    // User Routes
    app.route('/user')
      .get(User.list_all_type)
      .post(User.create_a_type);
   
      app.route('/admin_user')
      .get(User.admin_list_all_type)
      .post(User.create_a_type);
  
    app.route('/admin_user/:username')
      .get(User.read_a_type)
      .post(User.update_a_type)

      app.get("/del_user/:typeId", User.delete_a_type);
    app.route('/signin').post(User.log_in);
};


  