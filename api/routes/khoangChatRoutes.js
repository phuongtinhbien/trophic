module.exports = function(app) {
    var User = require('../controls/khoangChatCon');
  
    // User Routes
    app.route('/admin_khoangChat')
      .get(User.admin_list_all_type)
      .post(User.create_a_type);
  
  
    app.route('/admin_khoangChat/:typeId')
      .get(User.read_a_type)
      .post(User.update_a_type)

      app
      .route('/del_khoangChat/:typeId')
      .get(User.delete_a_type);
    app.route('/khoangChat')
      .post(User.create_a_type);
  
  
    app.route('/khoangChat/:typeId')
      .get(User.read_a_type)
      .put(User.update_a_type)
      .delete(User.delete_a_type);
      app.route("/khoangChat_search").post(User.search_a_type);
  };
  