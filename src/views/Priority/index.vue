<template>
  <div class="priority-modal priority-type">
    <el-dialog
      :title="$t('sidebar.priority')"
      :visible.sync="msg"
      :modal-append-to-body="false"
      id="priority-content"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleCancel"
    >
      <div class="ret-form" v-if="rets">
        <el-form ref="rets" :model="rets.parameters">
          <el-form-item
            class="form-items"
            v-for="ret in rets.parameters"
            :key="ret.key"
          >
            <span class="rebel">
              {{ ret.name }}
              <el-tooltip
                v-show="ret.longdesc ? ret.longdesc : false"
                effect="dark"
                placement="top"
                :content="ret.longdesc"
              >
                <i class="iconfont icon-wenhao"></i>
              </el-tooltip>
              :
            </span>
            <span class="input-number">
              <el-input-number
                size="mini"
                v-if="ret.content.type == 'integer'"
                v-model="ret.value"
                controls-position="right"
              ></el-input-number>
              <el-input
                size="mini"
                type="number"
                v-if="ret.content.type == 'percentage'"
                v-model="ret.value"
                controls-position="right"
              >
                <template slot="append">%</template>
              </el-input>
              <el-input
                size="mini"
                type="number"
                v-if="ret.content.type == 'time'"
                v-model="ret.value"
                controls-position="right"
              >
                <template slot="append">{{
                  ret.content.unit == "s" ? "s" : "min"
                }}</template>
              </el-input>
              <el-select
                size="mini"
                v-if="ret.content.type == 'enum'"
                v-model="ret.value"
              >
                <el-option
                  v-for="(item, key, index) of ret.content.values"
                  :key="index"
                  :label="item"
                  :value="key"
                >
                </el-option>
              </el-select>
              <el-switch
                size="mini"
                v-if="ret.content.type == 'boolean'"
                :active-value="'true'"
                :inactive-value="'false'"
                v-model="ret.value"
              ></el-switch>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">{{ $t("common.cancel") }}</el-button>
          <el-button type="primary" @click="updatePriority">{{
            $t("common.confirm")
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getPriorities, update } from "@/api/cluster";
export default {
  props: {
    msg: Boolean,
  },
  data() {
    return {
      rets: {},
      priorities: {},
    };
  },
  created() {
    getPriorities().then((res) => {
      this.rets = res.data.data;
    });
  },
  methods: {
    updatePriority() {
      for (let prikeys in this.rets.parameters) {
        if (
          this.rets.parameters[prikeys].value == "true" ||
          this.rets.parameters[prikeys].value == "false"
        ) {
          if (this.rets.parameters[prikeys].value == "true") {
            this.priorities[prikeys] = true;
          } else {
            this.priorities[prikeys] = false;
          }
        } else {
          this.priorities[prikeys] = this.rets.parameters[prikeys].value;
        }
      }
      update(this.priorities).then((res) => {
        this.$message({
          type: "success",
          message: "已更新首选项",
        });
        this.$store.state.count = "";
      });
    },
    handleCancel() {
      this.$store.state.count = "";
    },
  },
};
</script>
<style  lang="scss">
// tooltip
.el-tooltip__popper.is-dark {
  max-width: 240px;
  font-size: 14px;
  line-height: 1.5em;
}
.priority-modal.priority-type {
  .el-dialog {
    width: 550px;
  }
  #priority-content {
    .el-form-item__content {
      width: 550px;
    }
    .ret-form {
      .form-items {
        margin-bottom: 0px;
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
          .el-icon-question {
            font-size: 16px;
          }
        }
        .input-number {
          float: left;
          flex: 0 0 auto;
          display: block;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 37.5%;
          .el-input-number.is-controls-right .el-input__inner {
            text-align: left;
          }
        }
        .el-input {
          width: 130px;
        }
      }
    }
  }
}
</style>  