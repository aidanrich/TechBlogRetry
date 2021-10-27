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
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!" + req.params.id)
  // delete a category by its `id` value
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


module.exports = router;