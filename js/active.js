if( window.location.hash === "" )
  window.location.href = "#"
function handle( callback ){
  callback( window.location.hash.slice( 1 ) )
}