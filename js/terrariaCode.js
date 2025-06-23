function parseTerrariaCode( code ){
  const command = { c: cmd( "font", "color" ) },
    regex = /(\[)([a-zA-Z0-9]+)(\/)([a-zA-Z0-9]{3,8})(\:)([\s\S]*?)(\])/
  var output = code, match
  while( (match = output.match( regex ) ) ){
    let cmd = command[ match[2] ]
    if( cmd ){
      output = output.replace( match[0],
        `<${cmd.tag} ${cmd.attr}="#${match[4]}">${match[6]}</${cmd.tag}>`
      )
    } else {
      output = output.replace( match[0], match[6] )
    }
  }
  return output
  function cmd( tag, attr ){
    return { tag, attr }
  }
}