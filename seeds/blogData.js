const { Blog } = require('../models');

const bloggish = [
    {
        name: 'Blog entry 1',
        content: 'This is a blog post seed. Not much to see here.',
    },
    {
        name: 'Blog entry 2',
        content: 'This is a blog post seed. Go away!',
    },
];

const seedBlog = () => Blog.bulkCreate(bloggish);

module.exports = seedBlog;