const express = require('express');
const mongoose = require('mongoose');

const Article = require('../models/article');
const validateArticle = require('../middleware/validateArticle');

const router = express.Router();


// 1. GET ALL ARTICLES
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();

        res.status(200).json({
            message: 'Articles retrieved successfully',
            count: articles.length,
            articles
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// BONUS: SEARCH ARTICLES
router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.q;

        if (!keyword || !keyword.trim()) {
            return res.status(400).json({
                message: 'Please provide a search keyword'
            });
        }

        const articles = await Article.find({
            $text: { $search: keyword }
        });

        res.status(200).json({
            count: articles.length,
            articles
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 2. GET A SINGLE ARTICLE
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid article ID'
            });
        }

        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: 'Article not found'
            });
        }

        res.status(200).json(article);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 3. CREATE AN ARTICLE
router.post('/', validateArticle, async (req, res) => {
    try {
        const article = await Article.create(req.body);

        res.status(201).json({
            message: 'Article created successfully',
            article
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 4. UPDATE AN ARTICLE
router.put('/:id', validateArticle, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid article ID'
            });
        }

        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!article) {
            return res.status(404).json({
                message: 'Article not found'
            });
        }

        res.status(200).json({
            message: 'Article updated successfully',
            article
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 5. DELETE AN ARTICLE
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid article ID'
            });
        }

        const article = await Article.findByIdAndDelete(
            req.params.id
        );

        if (!article) {
            return res.status(404).json({
                message: 'Article not found'
            });
        }

        res.status(200).json({
            message: 'Article deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;