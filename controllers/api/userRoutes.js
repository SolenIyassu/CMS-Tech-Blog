const router = require("express").Router();

const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (error) {
    res.status(500).json(error);
  }
  // })

  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
          email: req.body.email,
        },
      });
      if (!user) {
        res.status(400).json({ msg: "No user found, please try again!" });
        return;
      }
      const validPassword = await user.checkPassword(req.body.password);
      if (!validPassword) {
        res
          .status(400)
          .json({ msg: "Incorrect credentials, please try again!" });
        return;
      }
      req.session.save(() => {
        req.session.userId = user.id;
        res.session.username = user.username;
        res.sessions.password = true;

        res.json({ msg: `successfully logged in` });
      });
    } catch (error) {
      res.status(400).json({ msg: "Please try again, not account found" });
    }
  });
  router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
      req.password.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  //   router.get("users", (req, res)=>{
  //       const users = await User.findAll()
  //       res.json(users)
});

module.exports = router;
