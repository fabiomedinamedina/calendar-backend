/*
  Rutas de usuarios /events
  Host + /api/eventes
*/

const { Router } = require('express');
const { check } = require('express-validator'); 
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const { validateJWT } = require('../middlewares/validteJWT');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateDates } = require('../helpers/validateDate');



const router = Router();

// Todas las peticiones pasadas deben validar JWT
router.use( validateJWT );

router.get(
  '/', getEvents
)

router.post(
  '/new',
  [
    check( 'title', 'El título es obligatorio' ).notEmpty(),
    check( 'start', 'Fecha de inicio es obligatoria' ).isISO8601().toDate(),
    check( 'end', 'Fecha de fin es obligatoria' ).isISO8601().toDate(),
    check( 'end', 'Fecha de fin debe ser mayor al menos 15 minutos mayor que la de inicio' ).isISO8601().toDate().custom( validateDates ),
    check( 'color', 'El color es obligatorio' ).notEmpty(),
    fieldValidators
  ],
  createEvent
)

router.put(
  '/:id',
  [
    check( 'title', 'El título es obligatorio' ).notEmpty(),
    check( 'start', 'Fecha de inicio es obligatoria' ).isISO8601().toDate(),
    check( 'end', 'Fecha de fin es obligatoria' ).isISO8601().toDate(),
    check( 'end', 'Fecha de fin debe ser mayor al menos 15 minutos mayor que la de inicio' ).isISO8601().toDate().custom( validateDates ),
    check( 'color', 'El color es obligatorio' ).notEmpty(),
    fieldValidators
  ],
  updateEvent
)

router.delete(
  '/:id', deleteEvent
)

module.exports = router;