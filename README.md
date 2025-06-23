# TMSearch
基于Github的泰拉瑞亚模组浏览器.  
项目使用 MIT LICENSE. 项目内除图片素材外均为原创(依赖的其他的js模块使用cdn引入)

## 原理
通过在Github的tmodloader-mod标签中搜索，找到相应的模组  
非安全模式原理，通过寻找和搜索内容相关的，releases中包含tmod文件的github仓库，找到相应的模组

## 为什么不建议关闭安全搜索
安全搜索指 *只从tmodloader-mod标签内容中获取*.  
关闭后会消耗大量的请求次数

## 如何让自己的mod被找到
* Step 1  
给自己的仓库添加`tmodloader-mod`标签即可  
TMSearch会自动读取仓库简介，开源协议等内容  
(添加后就能直接找到了)
* Step 2
在仓库中增加`description.txt`，内容是模组的介绍  
添加`icon.png`，内容是模组的图标  
在release中提交mod(不能是分支源码)

## 如何打破请求限制
非认证用户1h内仅能请求API 60 次  
您可以注册一个(或多个)github apikey，将站点克隆到本地，在hooks.js(或者将template/basic\_hooks.js复制到网站目录下)中修改  
Example:
```js
...
window.onRequest = function( url, option ){
  verify( url, option, "token YOU_KEY" )
  // ... Your code
}
...
```

## 借物表
#### JS模块
* marked
* js-base64
* sweetalert
* milligram
#### 其他
* GithubRestApi