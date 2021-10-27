const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/blog/:user_id', withAuth, async (req, res) => {
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


router.post('/', withAuth, async (req, res) => {
    console.log("hit")
    try {
        const newPost = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        console.log(newPost)
        res.status(200).json(newPost)
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
