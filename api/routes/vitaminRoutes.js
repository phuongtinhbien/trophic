
module.exports = function (app) {
  var User = require('../controls/vitaminCon');

  // User Routes app   .route('/vitamin')   .get(User.list_all_type)
  // .post(User.create_a_type);

  app
    .route('/admin_vitamin')
    .get(User.admin_list_all_type)
    .post(User.create_a_type);

  app
    .route('/admin_vitamin/:typeId')
    .get(User.read_a_type)
    .post(User.update_a_type)

  app
    .route('/del_vitamin/:typeId')
    .get(User.delete_a_type);

    app.route('/vitamin/:typeId')
      .get(User.read_a_type)
    

      app.route("/vitamin_search").post(User.search_a_type);
    };
