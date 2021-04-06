<template>
  <div class="priority-modal priority-type">
    <div class="bar-text" @click="dialogVisible = true">首选项配置</div>

    <el-dialog
      title="首选项配置"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      id="priority-content"
    >
      <div class="ret-form" v-if="rets">
        <el-form ref="rets" :model="rets.parameters">
          <el-form-item
            class="form-items"
            v-for="ret in rets.parameters"
            :key="ret.key"
          >
            <span class="rebel">{{ ret.name }}</span>
            <span class="input-number">
              <el-input-number
                size="mini"
                v-if="ret.content.type == 'integer'"
                v-model="ret.value"
                controls-position="right"
              ></el-input-number>
              <el-input-number
                size="mini"
                v-if="ret.content.type == 'percentage'"
                v-model="ret.value"
                controls-position="right"
              ></el-input-number>
              <el-input-number
                size="mini"
                v-if="ret.content.type == 'time'"
                v-model="ret.value"
                controls-position="right"
              ></el-input-number>
              <el-input
                size="mini"
                v-if="ret.content.type == 'enum'"
                v-model="ret.value"
              ></el-input>
              <el-switch
                size="mini"
                v-if="ret.content.type == 'boolean'"
                v-model="ret.content.default"
              ></el-switch>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getPriorities } from "@/api/cluster";
export default {
  data() {
    return {
      dialogVisible: false,
      rets: {},
    };
  },
  created() {
    let _this = this;
    getPriorities().then((res) => {
      _this.rets = res.data.ret;
      console.log(_this.rets);
    });
  },
};
</script>
<style  lang="scss">
.priority-modal.priority-type {
  .el-dialog {
    width: 550px;
    height: 2000px;
  }
  #priority-content {
    .el-form-item__content{
      width: 550px;
    }
    .ret-form {
      .form-items {
        display: flex;
        justify-content: space-between;
        .rebel {
          float: left;
          flex: 0 0 auto;
          display: block;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 45.83333333%;
          text-align: end;
          margin-right: 20px;
     
        }
        .input-number {
          float: left;
          flex: 0 0 auto;
          display: block;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 37.5%;
        }
        .el-input {
          width: 130px;
        }
      }
    }
  }
}
</style>  