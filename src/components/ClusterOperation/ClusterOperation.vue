<template>
  <div class="priority-modal">
    <div class="bar-text" @click="dialogVisible = true">集群快捷操作</div>
    <el-dialog
      title="集群快捷操作"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      top="10vh"
      @close="handleBtnClick"
      class="operation-dialog"
    >
      <el-form :model="form" ref="form">
        <el-form-item>
          <span>集群操作</span>
          <el-select
            v-model="form.value"
            placeholder="请选择操作命令"
            @change="handleSelectChange"
          >
            <el-option
              v-for="(item, key, index) of commands"
              :key="index"
              :label="item"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>操作结果</span>
          <el-input disabled type="textarea" :rows="15" v-model="form.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleBtnClick">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getCmds, getCmdResult } from "@/api/tools";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        value: "",
        desc: "",
      },
      commands: {},
      commandResult: "",
    };
  },
  created() {
    let _this = this;
    getCmds().then((res) => {
      _this.commands = res.data.data;
    });
  },
  // watch: {
  //   "form.value": function (nVal, oVal) 
  //     let _this = this;
  //     if (nVal !== oVal) {
  //       _this.handleSelectChange(nVal);
  //     }
  //   },
  // },
  methods: {
    handleSelectChange(value) {
      let _this = this;
      getCmdResult(value).then((res) => {
        _this.form.desc = res.data.data;
      });
    },
    handleBtnClick() {
      let _this = this;
      _this.form = {
        value: "",
        desc: "",
      };
      this.dialogVisible = false;
    },
  },
};
</script>
<style scoped lang="scss">
// The width of the selector is aligned with the text box below
body .sider .priority-modal .el-input {
  width: inherit;
}
.operation-dialog {
  .el-dialog {
    .el-dialog__header {
      border-bottom: 1px solid #f4f4f4;
    }
    .el-dialog__body {
      .el-form {
        padding: 0px;
        .el-form-item {
          margin-bottom: 10px;
          span {
            display: block;
          }
          .el-select {
            width: 100%;
          }
          .el-textarea.is-disabled .el-textarea__inner {
            background-color: #fefefe;
            cursor: default;
            color: inherit;
          }
        }
      }
    }
  }
  .el-dialog__footer {
    border-top: 1px solid #f4f4f4;
  }
}
</style>