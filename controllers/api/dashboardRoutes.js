const router = require("express").Router();

const { User, Post } = require("../../models");
const auth = require("../../utils/auth");

// router.post("/", auth, async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       where: id.session.userId,
//     });
//     const post = postData.map((post) => post.get({ plain: true }));

//     res.render("all-post", {
//       layout: "dash",
//       post,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("login");
//   }
// });

// router.get("/newPost", auth, async (req, res) => {
//   res.render("all-post", {
//     layout: dash,
//   });
// });

// router.get("/edit/:id", auth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);
//     if (postData) {
//       const post = postData.get({ plain: true });
//       res.render("all-post", {
//         layout: "dashboard",
//         post,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (error) {
//     res.redirect("login");
//   }
// });

router.get("/", auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
