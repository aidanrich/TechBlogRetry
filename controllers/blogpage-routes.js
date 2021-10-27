const router = require('express').Router();
const { Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  console.log("get id?")
  try {
    const categoryData = await Blog.findByPk(req.params.id);

    if (!categoryData) {
      res.status(404).json({ message: 'No Blog card found with that id!' });
      return;
    }

    const blogOne = categoryData.get({ plain: true });

    res.render('blogpage', {
      blogOne,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {

  try {

    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    })

    console.log("post deleted");
    res.status(200).json("hey");

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },

    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.status(200).json("Success");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

})

router.post('/comment/:blog_c_id', withAuth, async (req, res) => {
  console.log("hit")
  try {
      const newPost = await Comment.create({
          ...req.body,
          blog_c_id: req.params.id,
      })
      console.log(newPost)
      res.json(newPost)
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


module.exports = router;