class GithubFile {
  constructor( fileObject ){
    this.file = fileObject
    this.file.toString = () => this.file.name
  }
  string(){
    return Base64.decode( this.file.content )
  }
  url(){
    return "data:application/png;" + this.file.encoding + "," + this.file.content
  }
  toString(){
    return string()
  }
}

class GithubFileSystem {
  constructor( repo ){
    this.repo = this._getURL( repo )
  }
  _getURL( repo ){
    return "https://api.github.com/repos/" + repo + "/contents"
  }
  async read( dir = "" ){
    return JSON.parse( (await request( this.repo + (dir === "" ? "" : "/" + dir) )).body )
  }
  async readFile( fname ){
    return new GithubFile( await this.read( fname ) )
  }
  // 能用就行，别管优不优美了，反正昨天潜意识往代码里写了一堆石(
  async /*root*/includes( fname ){
    for( let file of await this.read() )
      if( file.name === fname ) return true
    return false
  }
}