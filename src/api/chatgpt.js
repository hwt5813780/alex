const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: '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'
})
const openai = new OpenAIApi(configuration)

export const chatgpt = (context, key) => {
  const completion = openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { 'role': 'system', 'content': '你是一个信息提取机器人，接下来我会用：“A：内容//B：信息提示”给你多个prompt，你需要返回给我一个数组，数组的格式为：[{"prompt":"prompt的内容","value":"提取的内容"}]' },
      { 'role': 'user', 'content': 'A：甲方购房总价款是12000元，税费为3%//B：甲方购房总价款，甲方购房税费' },
      { 'role': 'assistant', 'content': '[{"prompt":"甲方购房总价款","value":"12000元"},{"prompt":"甲方购房税费","value":"360元"}]' },
      { 'role': 'user', 'content': 'A：' + context + '//B：' + key }
    ]
  })
  return completion.then(response => {
    const result = JSON.parse(response.data.choices[0].message.content.trim())
    console.log(result)
    return result
  }).catch(error => {
    console.error(error)
    return error
  })
}
