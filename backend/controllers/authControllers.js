const User = require("../models/user");
const passport = require("passport");

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json("User sign up successfully");
  } catch (error) {
    res.status(500).json("Error registering user");
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info.message);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'login successfully', token: 'sampleToken123' });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json("Error logging out");
    }
    req.session.destroy(); // Ensure the session is destroyed after logging out
    res.status(200).json("Logout successful");
  });
};
