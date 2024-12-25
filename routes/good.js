const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getAllGoods, createGood, deleteGood, updateGood,
} = require('../controllers/good');

router.get('/', getAllGoods);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
  }),
}), createGood);
router.get('/:id', deleteGood);
router.patch('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
  }),
}), updateGood);

module.exports = router;
