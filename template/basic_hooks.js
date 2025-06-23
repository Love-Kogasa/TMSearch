// 基本钩子模板
window.searchMaxResult = 20 // 仓库搜索结果最大20条(这里指非安全搜索)

window.onRequest = function( url/*read-only*/, option, returnFunc/* 仅限同步函数 */ ){
  // 当请求时
  // 使用自己的秘钥请求(解决限制问题)
  
}
window.onReturnResponse = function( response/*read-only*/, output ){
  // 当请求返回结果
  // 此时可以用output.body获取请求返回的结果
  
}

// 当检查Mod是否为Tmod
window.onModCheck = function( itemData ){
  // 当返回true跳过此mod的检查
}

window.onTmodClassInit = function( itemData, object ){
  // 当一个TMod类被实例化(可用于检测一个物品被添加)
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