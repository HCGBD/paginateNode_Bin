const LivresControllers = require('../controllers/LivresControllers');
const express = require('express');


const route = express.Router();

route.post('/', LivresControllers.create);
route.get('/', LivresControllers.getLivre)
route.get('/paginated', LivresControllers.paginationL)
route.get('/:_id', LivresControllers.UnLivre)
route.put('/:_id', LivresControllers.updateLivre)
route.delete('/:_id', LivresControllers.deleteL)

module.exports = route;
