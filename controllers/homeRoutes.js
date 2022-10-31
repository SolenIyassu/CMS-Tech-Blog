const router = require("express").Router();
const res = require("express/lib/response");
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findall({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findbyPK(req.params.id, {
      include: [
        {
          model: User,
          include: ["name"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findall({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.render("homepage", {
      ...comment,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findall({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const comments = commentData.map((post) => comment.get({ plain: true }));
    res.render("homepage", {
      ...comment,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findbyPK(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    res.render("username", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
