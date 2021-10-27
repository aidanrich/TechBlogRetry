const router = require('express').Router();
const { Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all blog entries
router.get('/', withAuth, async (req, res) => {
 
    try {
        const blogData = await Blog.findAll({
            include: [Comment],
        });
        
        const blogAll = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {blogAll,
            logged_in: req.session.logged_in,
        });
    
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


router.get('/blogsolo/:id', withAuth, async (req, res) => {
    console.log("get id?")
    try {
      const categoryData = await Blog.findByPk(req.params.id);
  
      if (!categoryData) {
        res.status(404).json({ message: 'No Blog card found with that id!' });
        return;
      }
      
      const blogOne = categoryData.get({ plain: true });

      res.render('blogsolo', {blogOne,
        logged_in: req.session.logged_in,
      });

    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/blog', withAuth, async (req, res) => {
  console.log("you've got mail")
  try {
      const blogData = await Blog.findAll({
          where: {
              user_id: req.session.user_id,
          }
      });

      const blogAll = blogData.map((blog) => blog.get({ plain: true }));
      // where is this going?
      res.render('blog', { blogAll, 
          logged_in: req.session.logged_in,
      });

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;