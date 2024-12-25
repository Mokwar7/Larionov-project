const Brand = require('../models/brand');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllBrands = (req, res, next) => {
  Brand.find({ })
    .then((brand) => {
      res.status(SUCCESS_CODE).send({ data: brand });
    })
    .catch(next);
};

module.exports.getBrand = (req, res, next) => {
  const { brandId } = req.body;

  Brand.findOne({ brandId })
    .then((brand) => {
      res.status(SUCCESS_CODE).send({ data: brand });
    })
    .catch(next);
};

module.exports.createBrand = (req, res, next) => {
  const { value } = req.body; // eslint-disable-line

  Brand.create({ value }) // eslint-disable-line
    .then((brand) => {
      res.status(CREATE_CODE).send({ data: brand });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteBrand = (req, res, next) => {
  const { brandId } = req.body;

  Brand.findOne({ brandId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((brand) => {
      Brand.deleteOne(brand)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateBrand = (req, res, next) => {
  const { brandId } = req.body;

  Brand.findByIdAndUpdate(brandId, { value }, {
    new: true,
    runValidators: true,
  })
    .then((dataBrand) => {
      res.status(SUCCESS_CODE).send({ data: dataBrand });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      if (err.code === 11000) {
        next(new NotUniqError('Данный email уже зарегистрирован'));
      }
      next(err);
    });
};
