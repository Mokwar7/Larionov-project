const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getAllBrands, getBrand, createBrand, deleteBrand, updateBrand,
} = require('../controllers/brand');

router.get('/', getAllBrands);
router.get('/one', getBrand);
router.post('/', celebrate({
  body: Joi.object().keys({
    value: Joi.string().required(),
  }),
}), createBrand);
router.delete('/', deleteBrand);
router.patch('/', celebrate({
  body: Joi.object().keys({
    value: Joi.string().required(),
  }),
}), updateBrand);

module.exports = router;
