const router = require("express").Router();
const { Post } = require("../../models");
const Auth = require("../../utils/auth");

router.post("/", Auth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...body,
      userId: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", Auth, async (req, res) => {
  try {
    const updatedPost = await Post.update({
      where: {
        id: req.params.id,
      },
    });
    if (!updatedPost) {
      res.status(404).end({ msg: "Could not be updated!" });
      return;
    }
    res.status(200).end(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", Auth, async (req, res) => {
  try {
    const updatedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!updatedPost) {
      res.status(404).end({ msg: "No post found!" });
      return;
    }
    res.status(200).end(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
