const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');

const loginUser = async(req, res = response ) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if( !user ){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario o contraseña no son validos'
      });
    }

    // Confirmar password
    const validPassword = bcrypt.compareSync( password, user.password );

    if( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario o contraseña no son validos'
      });
    }

    // Generar JWT

    const token = await generateJWT( user.id, user.name );


    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Comunicarse con el administrador'
    });
  }

  
}

const createUser = async(req, res = response ) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if( user ){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe'
      })
    }

    user = new User( req.body );

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    // Generar JWT
    const token = await generateJWT( user.id, user.name );

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
      msg: 'Usuario creado correctamente',
    });

  } catch (error) {
    
    res.status(500).json({
      ok: false,
      msg: 'Comunicarse con el administrador'
    });

  }

}

const revalidateToken = async(req, res = response ) => {

  const { uid, name } = req;

  const token = await generateJWT( uid, name );

  res.json({
    ok: true,
    token
  });
}

module.exports = {
  loginUser,
  createUser,
  revalidateToken
}