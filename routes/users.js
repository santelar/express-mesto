const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { registerUser, loginUser } = require('../controllers/admins');

router.get('/users', getUsers);
router.get('/users/:_id', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.post('/register', registerUser);
router.post('/auth', loginUser);

module.exports = router;
