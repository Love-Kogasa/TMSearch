// @index.html
window.onload = async function(){
  safetySearch.oninput = function(){
    if( this.checked !== true ){
      swal( "Tip - 提示", "关闭此选项将增加搜索结果的不确定性以及稳定性和搜索效率\n该操作可能导致IP被API暂时性限制请求导致站点无法继续使用\n附言: 关闭需要手动点击搜索按钮搜索", "warning" )
    } else {
      unsafeMods.forEach(function( mod ){
        modContent.removeChild( mod.element )
      })
      unsafeMods = []
    }
  }
  var mods = [], unsafeMods = []
  var whiteList = JSON.parse( (await request( "./whiteList.json" )).body )
  var {body: modDatasDefault} = await searchRepo( "", {
    topic: "tmodloader-mod"
  })
  for( let mod of modDatasDefault.items.concat( whiteList ) ){
    mods.push( new TMod( mod ) )
  }
  keyword.oninput = function( notCheck ){
    if( safetySearch.checked || notCheck === true ){
      mods.forEach(function( mod ){
        if( (mod.name + mod.description).toLowerCase().includes( keyword.value.toLowerCase() ) ){
          mod.show()
        } else mod.hide()
      })
    }
  }
  search.onclick = async function(){
    if( safetySearch.checked ){
      keyword.oninput()
    } else {
      if( keyword.value === "" ){
        swal( "警告", "非安全搜索(指关闭只从tmodloader-mod标签获取mod)，请误使用空字符搜索", "error" )
        keyword.oninput( true )
      } else {
        swal( "提示", "该模式下搜索速度较(非常)慢，请耐心等待", "warning" )
        // 更新列表
        unsafeMods.forEach(function( mod ){
          modContent.removeChild( mod.element )
        })
        unsafeMods = []
        keyword.oninput( true )
        var items = (await searchRepo( keyword.value )).body.items 
        if( items.length > (window.searchMaxResult || 20) ){
          swal( "提示", "搜索结果数量超出最大值，已自动截断\n如找不到想要的mod，请换更详细的词重试", "warning" )
          items = items.slice( 0, 20 )
        }
        for( let item of items ){
          if( typeof window.onModCheck === "function" )
            if( window.onModCheck( item ) === true ) continue
          if( await TMod.isTMod( item ) ) unsafeMods.push( new TMod( item ) )
        }
        if( unsafeMods.length === 0 ){
          swal( "看起来有一些问题呢", "没有找到您想找的mod，请更换更详细的提示词，或使用英文进行搜索", "error" )
        }
      }
    }
  }
}