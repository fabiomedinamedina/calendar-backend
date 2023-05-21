/*
  Rutas de usuarios / auth
  Host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/validteJWT');
const { createUser, loginUser, revalidateToken } = require('../controllers/authController');

const router = Router();

router.post(
  '/',
  [
    check('email', 'El email es obligatorio o no es valido').isEmail(),
    check(
      'password',
      'La contraseña debe tener más de 6 caracteres y por lo menos una mayúscula y un número')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
    ),
    fieldValidators
  ],
  loginUser
);

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio o no es valido').isEmail(),
    check(
      'password',
      'La contraseña debe tener más de 6 caracteres y por lo menos una mayúscula y un número')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
    ),
    fieldValidators
  ],
  createUser,
);
 
router.get( '/renew', validateJWT, revalidateToken);

module.exports = router;