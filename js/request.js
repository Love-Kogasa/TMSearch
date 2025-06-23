var _ = void 0

async function request( url, arguments = {} ){
  var option = {}, refuse
  url = format( url, arguments )
  if( typeof window.onRequest === "function" )
    window.onRequest( url, option, refuseFunc = ( data ) => (refuse = data) )
  if( refuse ) return refuse
  var response = await fetch( url, option )
  var output = { statusText: response.statusText, status: response.status, headers: response.headers, url: url }
  if( response.status < 400 )
    output.body = await response.text()
  if( typeof window.onReturnResponse === "function" )
    window.onReturnResponse( response, output )
  return output
  function format( url, args = {} ){
    var keys = Object.keys( args )
    if( keys.length === 0 ) return url;
    var argList = []
    for( let key of keys )
      argList.push( `${key}=${encodeURIComponent( args[key] )}` )
    return url + "?" + argList.join( "&" )
  }
}

async function searchRepo( key, searchConfig = {} ){
  var response = await request( "https://api.github.com/search/repositories", { q: format( key, searchConfig ) } )
  response.body = JSON.parse( response.body )
  return response
  function format( data, config = {} ){
    var configArray = []
    if( !!data ) configArray.push( data )
    for( let key in config )
      configArray.push( key + ":" + config[key] )
    return configArray.join( "+" )
  }
}
