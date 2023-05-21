const validateDates = ( end, { req } ) => {

  const { start } = req.body;

  difference = Math.abs(Math.round( (start - end) / 60000 ));
  return ( difference < 15 ) ? false : true;
  
}

module.exports = { validateDates }