<template>
  <div class="priority-modal">
    <el-dialog
      title="心跳配置"
      :visible.sync="msg"
      width="650px"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleCancel"
    >
      <h4 v-if="nodesError">
        集群nodes状态为 Not Running 或 Not Running/Standby, 心跳配置功能不能使用
      </h4>
      <el-tabs v-if="!nodesError" v-model="activeName" :before-leave="handleTabSwitch">
        <el-tab-pane label="主心跳" name="first">
          <el-form ref="form" :model="form">
            <el-form-item v-for="item in form.hbaddrs1" :key="item.key">
              <span class="node-text">节点心跳IP-{{ item.nodeid }}:</span>
              <el-input 
                class="node-input" 
                v-model="item.ip" 
                @change="handleInputOneChange">
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="备用心跳" name="second">
          <el-form ref="form" :model="form">
            <el-row>
              <el-switch 
                class="node-text node-switch" 
                v-model="backupHeartBeat" 
                inactive-text="启用备用心跳">
              </el-switch> 
            </el-row> 
            <el-form-item v-for="item in form.hbaddrs2" :key="item.key">
              <span class="node-text">节点心跳IP-{{ item.nodeid }}:</span>
              <el-input 
                class="node-input" 
                v-model="item.ip" 
                :disabled="!backupHeartBeat"
                @change="handleInputTwoChange">
              </el-input>
            </el-form-item>
          </el-form> 
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" v-if="!nodesError">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="updateHeartBeat" :loading="loadingBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getConfigs, updateHB } from "@/api/cluster";

export default {
  props: {
    msg: Boolean,
  },
  data() {
    return {
      reg: /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/, //ip正则表达式
      activeName: "first",
      backupHeartBeat: false,
      loadingBtn: false,
      form: {
       hbaddrs1: [],
       hbaddrs2: [],
      },
      nodesError: false, //心跳数据是否正常，不正常为false提示功能不能使用，正常为true
    };
  },
  created() {
    let _this = this;
    getConfigs().then((res) => {
      console.log(res.data.data)
      // console.log('bijiao', (res.data.data).constructor == Object)
      //判断心跳配置数据是否正常，正常数据类型为object
      if((res.data.data).constructor == Object) {
        if (res.data.data.hbaddrs1) {
          _this.form.hbaddrs1 = res.data.data.hbaddrs1
          _this.form.hbaddrs1.flag = true
        } 

        if(res.data.data.hbaddrs2) {
          _this.form.hbaddrs2 = res.data.data.hbaddrs2
          _this.form.hbaddrs2.flag = true
        } else if(res.data.data.hbaddrs1) {
          res.data.data.hbaddrs1.forEach(item => {
            console.log('res.data.data.hbaddrs1',item)
            _this.form.hbaddrs2.push({
              nodeid: item.nodeid,
              ip: ''
            })
          });
          _this.form.hbaddrs2.flag = false
        }
      } else {
        // console.log( '_this.nodesError',_this.nodesError)
        _this.nodesError = true
      }
    });
  },
  methods: {
    //错误信息显示
    showErrorMessage() {
      let _this = this
      _this.$message({
        type: "error",
        message: "请输入正确IP！",
        duration: 1500
      });
    },
    //判断输入的内容是否是正确的ip格式的方法 hb判断是主心跳还是备用心跳
    getInputValue(value, hb) {
      let _this = this
      if(_this.reg.test(value) || typeof(value) == 'undefined') {
        hb == 0 || hb == '0' ? 
        _this.form.hbaddrs1.flag = true :
        _this.form.hbaddrs2.flag = true
      } else {
        hb == 0 || hb == '0' ? 
        _this.form.hbaddrs1.flag = false :
        _this.form.hbaddrs2.flag = false
        _this.showErrorMessage()
      }
    },
    //判断输入的内容改变后是否是正确的ip格式
    handleInputOneChange(value) {
      let _this = this
      _this.getInputValue(value, 0)
    },
    handleInputTwoChange(value) {
      let _this = this
      _this.getInputValue(value, 1)
    },

    //判断是否可切换tab
    handleTabSwitch() {
      let _this = this
      //备用心跳开启时，判断心跳是否输入或输入正确，正确则hbaddrs2.flag = true,否则为false
      if(_this.backupHeartBeat == true) {
        for(let item of _this.form.hbaddrs2){
          if(!_this.reg.test(item.ip)){
            _this.form.hbaddrs2.flag = false
            break
          } else {
            _this.form.hbaddrs2.flag = true
          }
        }
      } else {
        _this.form.hbaddrs2.flag = true
      }

      //hbaddrs1.flag或者hbaddrs1.flag为false时， tab不可切换
      if(_this.form.hbaddrs1.flag == false || _this.form.hbaddrs2.flag == false) {
        _this.showErrorMessage()
        return false
      }
    },
    updateHeartBeat() {
      let _this = this;
      let pushData = {}
      //备用心跳关闭
      if(_this.backupHeartBeat == false) {
        //输入的主心跳正确
        if(_this.form.hbaddrs1.flag){

          pushData.hbaddrs1 = []
          _this.form.hbaddrs1.forEach(item => {
            pushData.hbaddrs1.push({
              ip: item.ip,
              nodeid: item.nodeid
            })
          })
          // console.log('1pushdata', pushData)

          //向后端提交数据
          _this.loadingBtn = true    //确定按钮loading状态
          updateHB(pushData).then(() => {
            _this.$store.state.count = "";
            _this.$message({
              type: "success",
              message: "已更新心跳配置",
            });
            _this.loadingBtn = false //确定按钮loading状态取消
          });
        }else { //输入的主心跳IP不正确
          _this.showErrorMessage()
        }
      } else {
        // 备用心跳开启
        //遍历hb2，判断ip是否输入正确，正确flag为true，否则为false
        for(let item of _this.form.hbaddrs2){
          if(!_this.reg.test(item.ip)){
            _this.showErrorMessage()
            _this.form.hbaddrs2.flag = false
            break
          } else {
            _this.form.hbaddrs2.flag = true
          }
        }

        console.log('hb2 flag', _this.form.hbaddrs2.flag)
        console.log('hb1 flag', _this.form.hbaddrs1.flag)
        if(_this.form.hbaddrs2.flag && _this.form.hbaddrs1.flag) {
          pushData.hbaddrs1 = []
          pushData.hbaddrs2 = []
          console.log('form', _this.form)
          _this.form.hbaddrs1.forEach(item => {
            pushData.hbaddrs1.push({
              ip: item.ip,
              nodeid: item.nodeid
            })
          })
          _this.form.hbaddrs2.forEach(item => {
            pushData.hbaddrs2.push({
              ip: item.ip,
              nodeid: item.nodeid
            })
          })
          // console.log('2pushdata', pushData)
          
          //向后端提交数据
          _this.loadingBtn = true //确定按钮loading状态
          updateHB(pushData).then(() => {
            _this.$store.state.count = "";
            _this.$message({
              type: "success",
              message: "已更新心跳配置",
            });
            _this.loadingBtn = false //确定按钮loading状态取消
          });
        }
      }
    },
    handleCancel() {
      let _this = this;
      _this.$store.state.count = "";
    },
  },
};
</script>

<style scoped lang="scss">
.priority-modal{
  .el-row {
    margin: 20px 0;
  }
  .node-text{
    margin-left: 80px;
    margin-right: 10px;
  }
  .el-switch__label.is-active {
    color: #606266;
  }
  .el-input{
    width: 46%;
  }
  .warnning-str {
    color: red;
    // margin-left: 200px;
  }
}
</style>