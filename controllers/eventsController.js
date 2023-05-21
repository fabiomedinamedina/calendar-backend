const { response } = require("express");
const Event = require("../models/eventModel");

const getEvents = async(req, res = response) => {

  try {

    const events = await Event.find({ user: req.uid }).populate('user', 'name');

    res.json({
      ok: true,
      events: events
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

  
}

const createEvent = async(req, res = response) => {

  const event = new Event( req.body );

  try {

    event.user = req.uid;

    const eventSaving = await event.save()
    res.json({
      ok: true,
      event: eventSaving
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

  
}

const updateEvent = async(req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId );

    if( !event ){
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe con ese ID'
      });
    }

    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes los privilegios para editar este evento'
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

    res.json({
      ok: true,
      event: eventUpdated
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

 
}

const deleteEvent = async (req, res = response) => {


  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId );

    if( !event ){
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe con ese ID'
      });
    }

    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes los privilegios para eliminar este evento'
      });
    }

    await Event.findByIdAndDelete( eventId );
    res.json({ ok: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}


module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}