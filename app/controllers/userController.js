const User = require('../models/User');

class UserController {
  static async index(req, res) {
    const users = await User.all();
    res.render('users/index', { users });
  }

  static async add(req, res) {
    await User.create(req.body);
    res.redirect('/');
  }

  static async edit(req, res) {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
  }

  static async update(req, res) {
    await User.update(req.params.id, req.body);
    res.redirect('/');
  }

  static async delete(req, res) {
    await User.delete(req.params.id);
    res.redirect('/');
  }
}

module.exports = UserController;