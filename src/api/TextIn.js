const fs = require('fs')
// 使用第三方request 库
// https://www.npmjs.com/package/request
const request = require('request')

// 请登录后前往 “工作台-账号设置-开发者信息” 查看 x-ti-app-id
// 示例代码中 x-ti-app-id 非真实数据
const appId = '0647cbe4b4b53e45ce1386c673207f69'
// 请登录后前往 “工作台-账号设置-开发者信息” 查看 x-ti-secret-code
// 示例代码中 x-ti-secret-code 非真实数据
const secretCode = '0bf8e7c1eef74806987e4c5c5fe3615a'
// 通用文字识别
const url = 'https://api.textin.com/ai/service/v2/recognize'

// 读取文件的二进制数据

export const ocr = (imageUrl) => {
    console.log(imageUrl);
    fetch(imageUrl)
      .then(response => response.blob()) // 获取二进制数据
      .then(image => {
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData);
        request({
          url: url,
          method: 'POST',
          headers: {
            'x-ti-app-id': appId,
            'x-ti-secret-code': secretCode
          },
          body: formData
        }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            // 请求成功的处理逻辑
            var ret = JSON.parse(body)
            var result = ret ? ret.result : {}
            var itemList = result.item_list
            console.log(itemList)
          }
        });
      });
  
}