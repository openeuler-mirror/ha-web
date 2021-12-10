<template>
  <div class="priority-modal">
    <el-dialog
      :title="$t('sidebar.shortcut')"
      :visible.sync="msg"
      :modal-append-to-body="false"
      top="10vh"
      @close="handleBtnClick"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleBtnClick"
      class="operation-dialog"
    >
      <el-form :model="form" ref="form">
        <el-form-item>
          <span>{{$t('sidebar.action')}}</span>
          <el-select
            v-model="form.value"
            :placeholder="$t('sidebar.select')"
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
          <span>{{$t('sidebar.result')}}</span>
          <el-input disabled type="textarea" :rows="15" v-model="form.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleBtnClick">{{$t('sidebar.close')}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getCmds, getCmdResult } from "@/api/tools";
export default {
  props: {
    msg: Boolean,
  },
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
      _this.$store.state.count = "";
    },
  },
};
</script>
<style lang="scss">
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