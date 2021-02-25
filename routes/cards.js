const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:_id', deleteCard);
router.put('/cards/:_id/likes', likeCard);
router.delete('/cards/:_id/likes', unlikeCard);

module.exports = router;
