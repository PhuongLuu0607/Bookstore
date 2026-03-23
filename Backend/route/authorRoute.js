const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/api/getallauthors', authorController.getAllAuthors);
router.get('/api/getauthor/:id_authors', authorController.getAuthorById);
router.post('/api/createauthor', authorController.createAuthor);
router.put('/api/updateauthor/:id_authors', authorController.updateAuthor);
router.delete('/api/deleteauthor/:id_authors', authorController.deleteAuthor);
router.get('/api/searchauthor/:searchTerm', authorController.searchAuthorByName);
module.exports = router;
