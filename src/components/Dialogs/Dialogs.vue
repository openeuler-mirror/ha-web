<template>
  <!-- dialogs -->
  <el-dialog
    class="basicAddDialog"
    title="资源配置"
    :visible.sync="isVisible"
    width="46%"
    :before-close="closeDialog"
  >
    <el-form v-model="addForm" ref="addForm" label-width="200px">
      <el-tabs v-model="activeName" class="button-tabs">
        <el-tab-pane name="first" class="tab-panels" label="基本">
          <el-form-item
            v-if="dialogType"
            class="required"
            label="资源名称"
            prop="id"
          >
            <!-- <span class="labels"> 资源名称： </span> -->
            <el-input
              class="block"
              :disabled="disableInputName"
              required
              v-model="addForm.id"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="dialogType == 'primitive' && dialogAction == 'add'"
            class="required"
            label="资源类型"
            prop="type"
          >
            <!-- <span class="labels"> 资源类型： </span> -->
            <el-cascader
              class="block"
              v-model="addForm.type"
              :options="metas"
              :props="{ expandTrigger: 'hover' }"
              @change="addRscTypeSelected"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            v-if="dialogType == 'primitive' && dialogAction == 'edit'"
            class="required"
            label="资源类型:"
            prop="type"
          >
            <el-input class="block" v-model="editMetas" disabled></el-input>
          </el-form-item>
          <el-form-item
            v-if="dialogType == 'group'"
            class="required"
            label="组内资源"
            prop="groupRsc"
          >
            <el-row>
              <el-select
                class="block"
                v-model="addForm.rscs"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in noGroup"
                  :key="item.key"
                  :label="item.id"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-row>
          </el-form-item>

          <el-form-item v-if="dialogType == 'clone'" label="克隆对象:">
            <el-select
              :disabled="dialogAction == 'edit'"
              class="block"
              v-model="addForm.rsc_id"
              placeholder="请选择"
              @change="setCloneRscId"
            >
              <el-option
                v-for="item in tableData"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane
          name="second"
          class="tab-panels"
          v-if="addForm.type && addForm.type !== '' && instanceAttris"
          label="实例属性"
          label-width="200px"
        >
          <el-row>
            <span class="modify-label"> 需要修改的实例属性： </span>
            <span class="block">
              <el-select
                v-model="instance_attributes"
                multiple
                placeholder="请选择"
                class="block"
                @remove-tag="deleteInsTag"
              >
                <!-- -->
                <el-option
                  v-for="item in instanceAttris"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </span>
          </el-row>
          <div v-if="instance_attributes">
            <div v-for="(item, key) in instance_attributes" :key="item.name">
              <el-row>
                <span class="modify-label">{{ instance_attributes[key] }}</span>
                <span>
                  <el-input
                    class="block"
                    v-if="
                      InsTypes[instance_attributes[key]] == 'string' ||
                      InsTypes[instance_attributes[key]] == 'enum'
                    "
                    v-model="
                      addForm.instance_attributes[instance_attributes[key]]
                    "
                    @input="forceUpdate"
                  ></el-input>
                  <el-switch
                    class="block"
                     :active-value="'true'"
                    :inactive-value="'false'"
                    v-if="InsTypes[instance_attributes[key]] == 'boolean'"
                    v-model="
                      addForm.instance_attributes[instance_attributes[key]]
                    "
                    @input="forceUpdate"
                  ></el-switch>
                  <el-input-number
                    class="block"
                    v-if="InsTypes[instance_attributes[key]] == 'integer'"
                    v-model="
                      addForm.instance_attributes[instance_attributes[key]]
                    "
                    @input="forceUpdate"
                  ></el-input-number>
                </span>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third" class="tab-panels" label="元属性">
          <el-row>
            <label class="modify-label">需要修改的元属性: </label>
            <span v-if="metaAttris">
              <el-select
                class="block"
                v-model="meta_attributes"
                multiple
                placeholder="请选择"
                @remove-tag="deleteMetaTag"
              >
                <el-option
                  v-for="item in metaAttris"
                  :key="item.key"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </span>
          </el-row>
          <!-- <div v-if="addForm.metaAttris"> -->
          <el-row v-if="meta_attributes">
            <div v-for="(item, key) in meta_attributes" :key="key">
              <el-row>
                <span class="modify-label">{{ meta_attributes[key] }}</span>
                <span>
                  <el-input
                    class="block"
                    v-if="
                      metaAttrTypes[meta_attributes[key]] == 'string' ||
                      metaAttrTypes[meta_attributes[key]] == 'enum'
                    "
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input>
                  <el-switch
                    class="block"
                    :active-value="'true'"
                    :inactive-value="'false'"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'boolean'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-switch>
                  <el-input-number
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'integer'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input-number>
                </span>
              </el-row>
            </div>
          </el-row>
          <!-- </div> -->
        </el-tab-pane>
        <span class="hometable-dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button :disabled="disableSubmit" type="primary" @click="addItem"
            >确 定</el-button
          >
        </span>
      </el-tabs>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getMetas,
  getMetaAttris,
  getAttris,
  addItems,
  getRcsDetail,
  editItem,
} from "@/api/homeTable";
export default {
  data() {
    return {
      isVisible: false,
      addForm: {
        id: "",
        meta_attributes: {},
        instance_attributes: {},
      },
      activeName: "first",
      dialogType: "",
      dialogAction: "",
      metas: [], //资源类型下拉列表
      metaAttris: [], //元属性列表
      meta_attributes: [], //选中的元属性列表
      metaAttrTypes: {}, //元属性类型对象
      instanceAttris: [], //实例属性下拉列表
      instance_attributes: [],
      InsTypes: {}, //实例属性的类型列表，用来判断生成的输入类型
      operationAttris: [], //操作属性列表
      disableSubmit: false,
      noGroup: [],
      tableData: [],
      RcsDetail: {},
      disableInputName: false,
      editMetas: "",
    };
  },
  computed: {
    showInsPane() {
      let _this = this;
      if (_this.dialogAction == "add") {
        return addForm.type && addForm.type !== "" && instanceAttris
          ? true
          : false;
      } else {
        return;
      }
    },
  },
  methods: {
    closeDialog() {
      this.isVisible = false;
      this.metas = [];
      this.meta_attributes = []; //选中的元属性列表
      this.metaAttris = [];
      this.metaAttrTypes = [];
      this.instance_attributes = [];
      this.instanceAttris = [];
      this.InsTypes = {};
      this.activeName = "first";
      this.tableData = [];
      this.addForm = {
        id: "",
        category: "",
        meta_attributes: {},
        instance_attributes: {},
        type: [],
      };
      this.RcsDetail = {};
      delete this.addForm.class;
      delete this.addForm.type;
      delete this.addForm.provider;
    },
    handleDialogOpen(type, action) {
      let _this = this;
      _this.dialogType = type;
      _this.dialogAction = action;

      _this.disableInputName =
        _this.dialogType == "clone" || _this.dialogAction == "edit"
          ? true
          : false;
      getMetaAttris(_this.dialogType).then((res) => {
        _this.metaAttris = res.data.data;
        for (let i in _this.metaAttris) {
          _this.metaAttrTypes[_this.metaAttris[i].name] =
            _this.metaAttris[i].content.type;
        }
      });
      switch (_this.dialogType) {
        case "primitive":
          getMetas().then((res) => {
            _this.metas = res.data.data;
            let types = _this.metas;
            let options = [];
            const toOption = (item) => ({ value: item, label: item });
            Object.keys(types).forEach((key) => {
              let item = {};
              item.value = key;
              item.label = key;
              let value = types[key];
              if (Array.isArray(value)) {
                item.children = value.map(toOption);
              } else {
                let children = [];
                Object.keys(value).forEach((k) => {
                  let itemInner = {};
                  itemInner.value = k;
                  itemInner.label = k;
                  let v = value[k];
                  if (Array.isArray(v)) {
                    itemInner.children = v.map(toOption);
                  }
                  children.push(itemInner);
                });
                item.children = children;
              }

              options.push(item);
            });
            _this.metas = options;
          });
          break;
        case "group":
          for (let i in _this.$store.state.noGroupItems) {
            _this.noGroup.push(_this.$store.state.noGroupItems[i]);
          }
        case "clone":
          for (let i in _this.$store.state.ids) {
            _this.tableData.push(_this.$store.state.ids[i]);
          }
      }
      if (_this.dialogAction == "edit") {
        let chosenItem = _this.$store.state.chosenItem;
        _this.dialogType = chosenItem.type;
        _this.addForm.id = chosenItem.id;
        _this.addForm.category = chosenItem.type;

        if (chosenItem.rsc_id) _this.addForm.rsc_id = chosenItem.rsc_id;

        let url = "resources/" + chosenItem.id + "?category=" + chosenItem.type;
        getRcsDetail(url).then((res) => {
          _this.RcsDetail = res.data.data;
          if (_this.RcsDetail.class)
            _this.addForm.class = _this.RcsDetail.class;
          _this.addForm.provider = _this.RcsDetail.provider;
          if (_this.RcsDetail.meta_attributes) {
            for (let i in _this.RcsDetail.meta_attributes) {
              _this.meta_attributes.push(i);
              _this.addForm.meta_attributes[i] =
                _this.RcsDetail.meta_attributes[i];
            }
          }
          if (_this.RcsDetail.instance_attributes) {
            for (let i in _this.RcsDetail.instance_attributes) {
              _this.instance_attributes.push(i);
              _this.addForm.instance_attributes[i] =
                _this.RcsDetail.instance_attributes[i];
            }
          }
          if (_this.dialogType == "primitive") {
            if (_this.RcsDetail.type) {
              _this.addForm.type = _this.RcsDetail.type;
              _this.editMetas =
                _this.RcsDetail.class +
                "/" +
                _this.RcsDetail.provider +
                "/" +
                _this.RcsDetail.type;
              let url =
                "/metas/" +
                _this.RcsDetail.class +
                "/" +
                _this.RcsDetail.type +
                "/" +
                _this.RcsDetail.provider;
              getAttris(url).then((res) => {
                _this.instanceAttris = res.data.data.parameters;
                _this.operationAttris = res.data.data.actions;
                for (let i in _this.instanceAttris) {
                  _this.InsTypes[_this.instanceAttris[i].name] =
                    _this.instanceAttris[i].content.type;
                }
              });
            } else {
              _this.metas =
                _this.chosenRsc.class + "/" + _this.chosenRsc.provider;
            }
          }
        });
      }
      _this.isVisible = true;
    },
    addRscTypeSelected(value) {
      let _this = this;
      _this.instanceAttris = [];
      _this.operationAttris = [];
      _this.InsTypes = {};
      _this.instance_attributes = [];
      _this.addForm.instance_attributes = {};
      this.meta_attributes = []; //选中的元属性列表
      delete _this.addForm.class;
      delete _this.addForm.provider;
      delete _this.addForm.type;
      if (value) {
        if (value[0]) {
          if (value[2]) {
            let url = "/metas/" + value[0] + "/" + value[2] + "/" + value[1];
            getAttris(url).then((res) => {
              _this.instanceAttris = res.data.data.parameters;
              _this.operationAttris = res.data.data.actions;
              for (let i in _this.instanceAttris) {
                _this.InsTypes[_this.instanceAttris[i].name] =
                  _this.instanceAttris[i].content.type;
              }
            });
            _this.addForm.class = value[0];
            _this.addForm.provider = value[1];
            _this.addForm.type = value[2];
          } else {
            let url = "/metas/" + value[0] + "/" + value[1];
            getAttris(url).then((res) => {
              _this.instanceAttris = res.data.parameters;
              _this.operationAttris = res.data.actions;
              for (let i in _this.instanceAttris) {
                _this.InsTypes[_this.instanceAttris[i].name] =
                  _this.instanceAttris[i].content.type;
              }
              _this.addForm.class = value[0];
              _this.addForm.provider = value[1];
            });
          }
        }
      }

      //todo : update add form
    },
    deleteInsTag(value) {
      let _this = this;
      delete _this.addForm.instance_attributes[value];
    },
    deleteMetaTag(value) {
      let _this = this;
      delete _this.addForm.meta_attributes[value];
    },
    forceUpdate() {
      this.$forceUpdate();
    },
    setCloneRscId(value) {
      let _this = this;
      _this.addForm.id = _this.addForm.rsc_id + "-clone";
    },
    addItem(value) {
      let _this = this;
      _this.disableSubmit = true;

      for (let i in _this.addForm.instance_attributes) {
        if (_this.addForm.instance_attributes[i] == "") {
          _this.addForm.instance_attributes[i] = 0;
        }
        if (_this.addForm.instance_attributes[i] == "true") {
          _this.addForm.instance_attributes[i] = true;
        }
        if (_this.addForm.instance_attributes[i] == "false") {
          _this.addForm.instance_attributes[i] = false;
        }
      }
      for (let i in _this.addForm.meta_attributes) {
        if (_this.addForm.meta_attributes[i] == "") {
          _this.addForm.meta_attributes[i] = 0;
        }
        if (_this.addForm.meta_attributes[i] == "true") {
          _this.addForm.meta_attributes[i] = true;
        }
        if (_this.addForm.meta_attributes[i] == "false") {
          _this.addForm.meta_attributes[i] = false;
        }
      }
      if (_this.dialogAction == "add") {
        switch (_this.dialogType) {
          case "primitive":
            _this.addForm.category = "primitive";
            addItems(_this.addForm)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "resource adding success",
                });
                _this.disableSubmit = false;
                _this.isVisible = false;
                _this.$emit("refresh");
              })
              .catch((err) => {
                this.$message({
                  type: "error",
                  message: err + " please check your inputs",
                });
                _this.disableSubmit = false;
              });
            break;
          case "group":
            if (_this.addForm.id && _this.rscs !== []) {
              _this.addForm.category = "group";
              addItems(_this.addForm)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "resource adding success",
                  });
                  _this.disableSubmit = false;
                  _this.isVisible = false;
                  _this.$emit("refresh");
                })
                .catch((err) => {
                  this.$message({
                    type: "error",
                    message: err + " please check your inputs",
                  });
                  _this.disableSubmit = false;
                });
            }
            break;
          case "clone":
            if (_this.addForm.rsc_id) {
              _this.addForm.category = "clone";
              addItems(_this.addForm)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "resource adding success",
                  });
                  _this.disableSubmit = false;
                  _this.isVisible = false;
                  _this.$emit("refresh");
                })
                .catch((err) => {
                  this.$message({
                    type: "error",
                    message: err + " please check your inputs",
                  });
                  _this.disableSubmit = false;
                });
            } else {
              this.$message({
                type: "error",
                message: "please check your inputs",
              });
              _this.disableSubmit = false;
            }
            break;
        }
      } else {
        if (_this.dialogAction == "edit") {
          let url = "/resources/" + _this.addForm.id;
          editItem(url, _this.addForm)
            .then((res) => {
              this.$message({
                type: "success",
                message: "resource edit success",
              });

              _this.isVisible = false;
              _this.disableSubmit = false;
              _this.$emit("refresh");
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err + "please check your inputs",
              });
              _this.disableSubmit = false;
            });
        }
      }
    },
  },
  watch: {
    instance_attributes: {
      deep: true,
      handler(val, oldVal) {
        let _this = this;
        for (let j = 0; j < val.length; j++) {
          if (
            !_this.addForm.instance_attributes[val[j]] &&
            _this.addForm.instance_attributes[val[j]] !== ""
          ) {
            _this.addForm.instance_attributes[val[j]] = "";
          }
        }
      },
    },
    meta_attributes: {
      deep: true,
      handler(val, oldVal) {
        let _this = this;
        for (let j = 0; j < val.length; j++) {
          if (
            !_this.addForm.meta_attributes[val[j]] &&
            _this.addForm.meta_attributes[val[j]] !== ""
          ) {
            _this.addForm.meta_attributes[val[j]] = "";
          }
        }
      },
    },
  },
};
</script>

<style scoped lang='scss'>
.el-dialog {
  .button-tabs {
    .tab-panels {
      .block {
        float: left;
        width: 260px;
      }
      .el-row {
        margin-bottom: 20px;
      }
      .modify-label {
        float: left;
        line-height: 40px;
        width: 200px;
        text-align: right;
        margin-right: 10px;
      }
      .panel-contents {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-around;
        .labels {
          float: left;
          width: 20%;
          text-align: right;

          .el-icon-question {
            font-size: 16px;
          }
        }
        .el-input {
          width: 170px;
        }
      }
    }
  }
  .el-input {
    width: auto;
  }

  .hometable-dialog-footer {
    margin-top: 40px;
    float: right;
  }
}
.location {
  text-align: left;
  .el-form {
    margin-left: 60px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>