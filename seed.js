require('dotenv').config();

const mongoose = require('mongoose');
const Article = require('./models/article');

const articles = [
    {
        title: 'Introduction to Node.js',
        content: 'Node.js is a JavaScript runtime that allows developers to build server-side applications.',
        author: 'Collins Seyram Kporha',
        category: 'Programming',
        tags: ['Node.js', 'JavaScript', 'Backend']
    },

    {
        title: 'Understanding REST APIs',
        content: 'REST APIs allow different software applications to communicate using HTTP methods.',
        author: 'Collins Seyram Kporha',
        category: 'Web Development',
        tags: ['REST', 'API', 'Backend']
    }
];

async function seedArticles() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Article.insertMany(articles);

        console.log('Two articles seeded successfully');

    } catch (error) {
        console.error(error.message);

    } finally {
        await mongoose.disconnect();
    }
}

seedArticles();