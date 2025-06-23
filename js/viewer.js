// @mod.html
function isRepo( path ){ return path.split( "/" ).length === 2 }
window.onload = () => handle( async function( path ){
  if( !isRepo( path ) ) window.location.href = "./index.html"
  var repo = JSON.parse( (await request( "https://api.github.com/repos/" + path )).body ),
    // 有的id必须用方法获取(
    name = document.getElementById( "name" ),
    author = document.createElement( "a" ),
    modDescription = document.createElement( "a" ),
    repoFs = new GithubFileSystem( path )
  author.textContent = repo.owner.login
  author.href = repo.owner.html_url
  name.textContent = repo.name
  description.textContent = repo.description || "仓库无简介"
  owner.textContent = "Mod仓库所有者: "
  owner.appendChild( author )
  var releases = JSON.parse( (await request( "https://api.github.com/repos/" + path + "/releases" )).body)
  releases.forEach( function( release ){
    if( release.assets.length === 0 ) return;
    var line = document.createElement( "tr" )
    var file = document.createElement( "th" )
    var description = document.createElement( "th" )
    var version = document.createElement( "th" )
    release.assets.forEach(function( asset ){
      var link = document.createElement( "a" )
      link.textContent = "<" + asset.name + ">"
      link.onclick = () => {
        // 用剪头还是function完全看心情的屎山(
        if( mirror.checked ){
          window.location.href = asset.browser_download_url.replace( "github.com", "bgithub.xyz" )
        } else window.location.href = asset.browser_download_url
      }
      if( mirror.checked ) link.href = link.href.replace( "github.com", "bgithub.xyz" )
      file.appendChild( link )
    })
    description.innerHTML = marked.parse( release.body )
    version.textContent = release.tag_name
    line.appendChild( file )
    line.appendChild( description )
    line.appendChild( version )
    downloads.appendChild( line )
  })
  if( await repoFs.includes( "icon.png" ) ){
    var img = new Image()
    img.src = (await repoFs.readFile( "icon.png" )).url()
    img.className = "icon"
    name.insertBefore( img, name.firstChild )
  }
  if( await repoFs.includes( "description.txt" ) ){
    // 又一命名问题(，怎么这么多description
    inModDescription.innerHTML = parseTerrariaCode((await repoFs.readFile( "description.txt" )).string())
  } else {
    inModDescription.textContent = "未找到mod介绍"
  }
})