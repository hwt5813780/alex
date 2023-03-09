<template>
  <div class="app-container">
    <el-col :span="12">
      <div class="tip">
        请输入需要提取的文本:
      </div>
      <el-input v-model="textarea" type="textarea" :disabled="stage" :rows="11" placeholder="请输入" clearable />
      <div class="tip" style="padding-top:10px">
        请输入提取的信息类型（用逗号隔开）:
      </div>
      <el-input v-model="input" type="input" :disabled="stage" :rows="11" placeholder="请输入" clearable />
      <div style="padding-top:10px;padding-bottom:10px;">
        <el-button type="primary" :loading="loading" @click="errorCorrect()">开始提取</el-button>
        <el-button type="basic" style="margin-left:24px;margin-top:16px;"
          @click="handleDownload('text-demo')">导出Excel</el-button>
      </div>

      <div v-show="visible" class="tip">
        ChatGPT:
      </div>
      <el-input v-show="visible" v-model="result" type="textarea" :rows="11" />
    </el-col>
    <el-col :span="12">
      <el-table v-loading="loading" id="excel_table" :data="tableData"
        style="width: 100%;margin-left:48px;margin-right:48px;">
        <el-table-column prop="prompt" label="Prompt"></el-table-column>
        <el-table-column prop="value" label="Value"></el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import FileSaver from 'file-saver'
import { write, utils } from 'xlsx';
import { chatgpt } from "@/api/chatgpt";

export default {
  data() {
    return {
      textarea: '',
      input: '',
      result: '',
      stage: false,
      visible: false,
      fileList: '',
      tableData: [],
      loading: false,
    }
  },
  methods: {

    //导出excel
    handleDownload(name) {
      let table = document.getElementById("excel_table")
      let et = utils.table_to_book(table)
      let output = write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      })

      try {
        FileSaver.saveAs(new Blob([output], { type: "application/octet-stream" }), `${name}.xlsx`)
      } catch (e) { }

      return output
    },
    async errorCorrect() {
      var that = this
      that.loading = true
      var context = that.textarea
      var key = that.input
      if (context === '' || key === '') {
        this.$message({
          showClose: true,
          message: '输入内容不能为空',
          type: 'warning'
        })
        that.result = ''
        that.visible = false
      } else {
        console.log(context)
        const response = await chatgpt(context, key);
        console.log(response)
        this.tableData = response
        this.loading = false
      }
    },
    saveResult() {
      var tempData = this.result
      if (tempData === '') {
        this.$message({
          showClose: true,
          message: '输入内容为空！',
          type: 'warning'
        })
      } else {
        var tempResult = new Blob([tempData], { type: 'text/plain;charset=utf-8' })
        saveAs(tempResult, 'ChatGPT结果.txt')
      }
    }
  }
}
</script>

<style scoped>
.tip {
  font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
