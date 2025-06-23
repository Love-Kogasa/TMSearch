class TMod {
  name = "未知名称"
  description = "未知介绍 - NoDescriptioN"
  constructor( item ){
    var { name, description, license, topics, full_name } = item
    if( typeof window.onTmodClassInit === "function" )
      window.onTmodClassInit( item, this )
    // 这样写好看(
    this.name = name || this.name
    this.description = description || this.description
    this.license = license || { key: "None License" }
    this.topics = topics || []
    this.repo = full_name
    this.initElement()
  }
  hide(){
    this.element.style.display = "none"
    return this
  }
  show(){
    this.element.style.display = "block"
    return this
  }
  initElement(){
    this.element = document.createElement( "blockquote" )
    document.getElementById( "modContent" ).appendChild( this.element )
    this.elements = {
      name: (function(){
        var name = document.createElement( "font" )
        name.size = 5
        name.textContent = this.name
        name.onclick = () => { window.location.href = "./mod.html#" + this.repo }
        this.element.appendChild( name )
        return name
      }).call(this),
      description: (function(){
        var description = document.createElement( "p" )
        description.className = "description"
        description.textContent = this.description
        this.element.appendChild( description )
        return description
      }).call(this),
      license: (function(){
        var license = document.createElement( "i" )
        license.className = "description"
        license.textContent = this.license.name
        license.onclick = () => {
          swal( "LICENSE (请务必遵守)", "本Mod使用: \n" + this.license.name + "\nMOD仓库(Github，可用于查找所有者和附加协议): \n" + this.repo + "\n详见(README地址):\n" +  "https://github.com/" + this.repo + "/blob/main/README.md" + "\n可点击空白处恢复页面浏览", "info", {
            button: "现在去看看"
          })
          .then(( value ) => {
            if( value ){
              window.location.href = "https://github.com/" + this.repo + "/" 
            }
          })
        }
        this.element.appendChild( license )
        return license
      }).call(this)
    }
  }
  static async isTMod( itemData ){
    if( localStorage.getItem( itemData.full_name ) === "Y" ) return true
    if( localStorage.getItem( itemData.full_name ) === "N" ) return false
    for( let release of JSON.parse(
      (await request( "https://api.github.com/repos/" + itemData.full_name + "/releases" )).body
    )){
      for( let file of release.assets ){
        // 判断后缀(
        if( file.name.includes( ".tmod" ) ||
          file.name.includes( ".locpack" ) ){
          try {
            localStorage.setItem( itemData.full_name, "Y" )
          } catch( err ){
            console.error( err )
            // 关闭无痕浏览或更换更现代的浏览器
          }
          return true
        } else {
          try {
            localStorage.setItem( itemData.full_name, "N" )
          } catch( err ){
            console.error( err )
            // 关闭无痕浏览或更换更现代的浏览器
          }
        }
      }
    }
    return false
  }
}