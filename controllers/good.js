const Good = require('../models/good');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');
const NotFindError = require('../utils/notFindError');
const NotAccesError = require('../utils/notAccesError');

module.exports.getAllGoods = (req, res, next) => {
  Good.find({ })
    .then((goods) => {
      res.status(SUCCESS_CODE).send({ data: goods });
    })
    .catch(next);
};

module.exports.createGood = (req, res, next) => {
  const { name, description, price, category, brand } = req.body; // eslint-disable-line

  Good.create({ name, description, price, category, brand }) // eslint-disable-line
    .then((good) => {
      res.status(CREATE_CODE).send({ data: good });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteGood = (req, res, next) => {
  const goodId = req.params.id;

  Good.findOne({ goodId })
    .orFail(() => new NotFindError('Good is not found'))
    .then((movie) => {
      Good.deleteOne(movie)
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateGood = (req, res, next) => {
  const goodId = req.params.id;
  const {
    name, description, price, category, brand,
  } = req.body;

  Good.findByIdAndUpdate(goodId, {
    name, description, price, category, brand,
  }, {
    new: true,
    runValidators: true,
  })
    .then((dataGood) => {
      res.status(SUCCESS_CODE).send({ data: dataGood });
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
