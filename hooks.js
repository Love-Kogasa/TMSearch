// 默认配置，可以直接在上面改
// 此配置可以消耗少量内存(<5mb)为代价大量节省请求需要资源
var urlTmp = []
window.searchMaxResult = 50

if( new URL( document.referrer ).host !== window.location.host )
  clearCache()

window.onRequest = function( url, option, refuse ){
  try {
    var siteData = localStorage.getItem( encodeURIComponent( url ) )
    if( siteData ){
      refuse( JSON.parse( siteData ) )
    } else urlTmp.push( url )
  } catch( err ){
    swal( "提示TIP", "站点使用了localStorage来优化站点使用效率，如果您的浏览器不支持LocalStorage或将其禁用，此功能将不会正常运行\n另外，一次性搜索结果过多也会导致此问题", "info" )
  }
}

window.onReturnResponse = function( response, output ){
  try {
    var index = urlTmp.indexOf( output.url )
    if( index > -1 && output.body.size <= (100 * 1024) ){
      respBody = JSON.stringify( JSON.parse( output.body ))
      localStorage.setItem( encodeURIComponent( output.url ), JSON.stringify( output ) )
      urlTmp.splice( index, index )
    }
  } catch( err ){
    console.log( "站点使用了localStorage来优化站点使用效率，如果您的浏览器不支持LocalStorage或将其禁用，此功能将不会正常运行" )
  }
}

window.onModCheck = function( itemData ){
  // 一般情况，不过也难免有特殊情况
  if( itemData.language != null && itemData.language != "C#" )
    return true
}

window.onTmodClassInit = function( item ){
  var repoUrl = encodeURIComponent( "https://api.github.com/repos/" + item.full_name )
  localStorage.setItem( repoUrl, JSON.stringify({
    status: 200, body: JSON.stringify( item )
  }))
}

function clearCache(){
  for( let index = 0; index < localStorage.length; index++ ){
    let key = localStorage.key( index )
    if( key.indexOf( "http" ) === 0 )
      localStorage.remove( key )
  }
}

// 现成函数
function verify( url, option, key, headers = {} ){
  if( url.includes( "api.github.com" ) ){
    option.headers = {
      Authorization: key,
      ...headers
    }
  }
}