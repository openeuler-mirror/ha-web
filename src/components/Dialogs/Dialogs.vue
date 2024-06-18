<template>
  <el-dialog
    class="basicAddDialog"
    :visible.sync="isVisible"
    width="700px"
    :before-close="closeDialog"
    v-if="isRouterShow"
    :title="title"
  >
    <el-form v-model="addForm" ref="addForm" label-width="200px">
      <el-tabs
        v-model="activeName"
        class="button-tabs"
        :before-leave="checkInputs"
      >
        <el-tab-pane
          name="first"
          class="tab-panels"
          :label="$t('dialog.basic')"
        >
          <el-form-item
            v-if="dialogType"
            class="required"
            :label="$t('dialog.rscName')"
            prop="id"
          >
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
            :label="$t('dialog.rscType')"
            prop="type"
          >
            <el-cascader
              class="block"
              v-model="addForm.type"
              :options="metas"
              :props="{ expandTrigger: 'hover' }"
              @change="addRscTypeSelected"
              filterable
              :placeholder="$t('common.pleaseSelect')"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            v-if="dialogType == 'primitive' && dialogAction == 'edit'"
            class="required"
            :label="$t('dialog.rscType')"
            prop="type"
          >
            <el-input class="block" v-model="editMetas" disabled></el-input>
          </el-form-item>
          <el-form-item
            v-if="dialogType == 'group'"
            class="required"
            :label="$t('dialog.groupRsc')"
            prop="groupRsc"
          >
            <el-row>
              <el-select
                class="block"
                v-model="addForm.rscs"
                multiple
                :placeholder="$t('common.pleaseSelect')"
                filterable
                @remove-tag="deleteTag"
                @change="forceUpdate"
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

          <el-form-item
            v-if="dialogType == 'clone'"
            :label="$t('dialog.target')"
          >
            <el-select
              :disabled="dialogAction == 'edit'"
              class="block"
              v-model="addForm.rsc_id"
              :placeholder="$t('common.pleaseSelect')"
              @change="setCloneRscId"
              filterable
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
          <template v-if="requiredItems.length">
            <el-form-item
              v-for="(item, key) in requiredItems"
              :key="key"
              :prop="requiredItems[key].id"
              :label="requiredItems[key].name"
            >
              <el-row class="row-style">
                <span class="block">
                  <el-input
                    style="width: 100%"
                    @input="forceUpdate"
                    v-if="
                      InsTypes[requiredItems[key].name] == 'string' ||
                      InsTypes[requiredItems[key].name] == 'enum'
                    "
                    v-model="
                      addForm.instance_attributes[requiredItems[key].name]
                    "
                  ></el-input>
                  <el-switch
                    class="block"
                    :active-value="'true'"
                    :inactive-value="'false'"
                    v-if="InsTypes[requiredItems[key].name] == 'boolean'"
                    v-model="
                      addForm.instance_attributes[requiredItems[key].name]
                    "
                    style="height: 40px"
                    @input="forceUpdate"
                  ></el-switch>
                  <el-input-number
                    class="block"
                    style="width: 100%"
                    v-if="InsTypes[requiredItems[key].name] == 'integer'"
                    v-model="
                      addForm.instance_attributes[requiredItems[key].name]
                    "
                    @input="forceUpdate"
                  ></el-input-number>
                </span>
              </el-row>
            </el-form-item>
          </template>
        </el-tab-pane>

        <el-tab-pane
          name="second"
          class="tab-panels"
          v-if="
            addForm.type &&
            addForm.type !== '' &&
            instanceAttris &&
            instanceAttris.length
          "
          :label="$t('dialog.instance')"
          label-width="200px"
        >
          <el-row>
            <span class="modify-label">
              {{ $t("dialog.instanceChange") }}
            </span>
            <span class="block">
              <el-select
                v-model="instance_attributes"
                multiple
                :placeholder="$t('common.pleaseSelect')"
                class="block"
                @remove-tag="deleteInsTag"
                filterable
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
          <div v-if="instance_attributes.length">
            <div v-for="(item, key) in instance_attributes" :key="item.name">
              <el-row v-if="!verifyItem(item)">
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
                    style="height: 40px"
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
        <el-tab-pane
          name="meta"
          class="tab-panels"
          :label="$t('dialog.metas')"
          v-if="metaAttris"
        >
          <el-row>
            <label class="modify-label">{{ $t("dialog.metasChange") }} </label>
            <span>
              <el-select
                class="block"
                v-model="meta_attributes"
                multiple
                :placeholder="$t('common.pleaseSelect')"
                @remove-tag="deleteMetaTag"
                filterable
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

        <el-tab-pane
          v-if="addForm.type && addForm.type !== '' && actionsAttris"
          name="forth"
          class="tab-panels"
          :label="$t('dialog.actions')"
          label-width="200px"
        >
          <el-row>
            <span class="modify-label">{{ $t("dialog.actionsChange") }}</span>
            <span class="block">
              <el-select
                v-model="action_attributes"
                multiple
                :placeholder="$t('common.pleaseSelect')"
                class="block"
                @change="addActionTag"
                filterable
              >
                <el-option
                  v-for="item in actionsAttris"
                  :key="item.key"
                  :label="item.name"
                  :value="JSON.stringify(item)"
                >
                </el-option>
              </el-select>
            </span>
          </el-row>
          <el-table
            :data="yigebiaoge"
            style="width: 100%"
            :header-cell-style="{ 'background-color': '#fafafa' }"
          >
            <el-table-column prop="name" label="name" width="70px">
            </el-table-column>
            <el-table-column prop="interval" label="interval" width="110px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.interval"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="start-delay"
              label="start-delay"
              width="110px"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row['start-delay']"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="timeout" label="timeout" width="110px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.timeout"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="role" label="role" width="130px">
              <template slot-scope="scope">
                <!-- <el-input v-model="scope.row.role"></el-input> -->
                <el-select
                  v-model="scope.row.role"
                  :placeholder="$t('common.pleaseSelect')"
                >
                  <el-option
                    v-for="item in role"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="on-fail" label="on-fail" width="130px">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row['on-fail']"
                  :placeholder="$t('common.pleaseSelect')"
                >
                  <el-option
                    v-for="item in onFail"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <span class="hometable-dialog-footer">
          <el-button @click="closeDialog">{{ $t("common.cancel") }}</el-button>
          <el-button
            :disabled="disableSubmit"
            type="primary"
            @click="addItem"
            >{{ $t("common.confirm") }}</el-button
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
      isRouterShow: true,
      isVisible: false,
      addForm: {
        id: "",
        meta_attributes: {},
        actions: [],
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
      actionsAttris: [], //操作属性列表
      action_attributes: [],
      disableSubmit: false,
      noGroup: [],
      tableData: [],
      RcsDetail: {},
      disableInputName: false,
      editMetas: "",
      yigebiaoge: [],
      requiredItems: [],
      role: [
        { name: "Stopped" },
        { name: "Started" },
        { name: "Master" },
        { name: "Slave" },
      ],
      onFail: [
        { name: "ignore" },
        { name: "block" },
        { name: "stop" },
        { name: "restart" },
        { name: "standby" },
        { name: "fence" },
      ],
      title: "",
    };
  },
  methods: {
    closeDialog() {
      this.isVisible = false;
      this.meta_attributes = []; //选中的元属性列表
      this.metas = [];
      this.metaAttris = [];
      this.metaAttrTypes = [];
      this.instance_attributes = [];
      this.instanceAttris = [];
      this.action_attributes = [];
      this.actionsAttris = [];
      this.yigebiaoge = [];
      this.InsTypes = {};
      this.activeName = "first";
      this.tableData = [];
      this.noGroup = [];
      this.addForm = {
        id: "",
        category: "",
        actions: [],
        meta_attributes: {},
        instance_attributes: {},
        type: [],
        ip: "",
      };
      this.RcsDetail = {};
      delete this.addForm.class;
      delete this.addForm.type;
      delete this.addForm.provider;
      this.addForm.rscs = [];
      this.isRouterShow = false;
      this.requiredItems = [];
    },
    handleDialogOpen(type, action) {
      this.isRouterShow = true;
      let _this = this;
      _this.activeName == "first";
      _this.dialogType = type;
      _this.dialogAction = action;
      _this.title =
        _this.dialogAction == "add"
          ? this.$t("dialog.add")
          : this.$t("dialog.edit");
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

        if (_this.dialogType == "clone")
          _this.addForm.rsc_id = chosenItem.id.slice(0, -6);
        if (_this.dialogType == "group") {
          this.addForm.rscs = [];
          _this.noGroup = [];
          for (let i in chosenItem.subrscs) {
            _this.addForm.rscs.push(chosenItem.subrscs[i].id);
          }
          for (let i in _this.$store.state.noGroupItems) {
            _this.noGroup.push(_this.$store.state.noGroupItems[i]);
          }
        }

        // let url = "resources/" + chosenItem.id + "?category=" + chosenItem.type;
        let data = {};
        data.id = chosenItem.id;
        data.category = chosenItem.type;

        getRcsDetail(data).then((res) => {
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
            // let url = "";
            let urlData = {};
            
            if (_this.RcsDetail.provider) {
              _this.addForm.type = _this.RcsDetail.type;
              _this.editMetas =
                _this.RcsDetail.class +
                "/" +
                _this.RcsDetail.provider +
                "/" +
                _this.RcsDetail.type;

                urlData.class = _this.RcsDetail.class;
                urlData.type = _this.RcsDetail.type;
                urlData.provider = _this.RcsDetail.provider;

              // url = "/metas/" + _this.RcsDetail.class + "/" + _this.RcsDetail.type + "/" + _this.RcsDetail.provider;
            } else {
              _this.addForm.type = _this.RcsDetail.type;
              _this.editMetas =
                _this.RcsDetail.class + "/" + _this.RcsDetail.type;

                urlData.class = _this.RcsDetail.class;
                urlData.type = _this.RcsDetail.type;
              // url = "/metas/" + _this.RcsDetail.class + "/" + _this.RcsDetail.type;
            }
            getAttris(urlData).then((res) => {
              _this.instanceAttris = Array.from(
                new Set(
                  res.data.data.parameters.map((item) => JSON.stringify(item))
                )
              ).map((item) => JSON.parse(item));
              _this.actionsAttris = Array.from(
                new Set(
                  res.data.data.actions.map((item) => JSON.stringify(item))
                )
              ).map((item) => JSON.parse(item));
              if (_this.RcsDetail.actions) {
                for (let i of _this.RcsDetail.actions) {
                  for (let j in _this.actionsAttris) {
                    if (_this.actionsAttris[j].name == i.name) {
                      _this.actionsAttris[j] = JSON.parse(JSON.stringify(i));
                    }
                  }
                  _this.action_attributes.push(JSON.stringify(i));
                  _this.addActionTag(_this.action_attributes);
                }
              }
              for (let i in _this.instanceAttris) {
                _this.InsTypes[_this.instanceAttris[i].name] =
                  _this.instanceAttris[i].content.type;
              }
              for (let i in _this.instanceAttris) {
                if (_this.instanceAttris[i].required == 1) {
                  _this.requiredItems.push(_this.instanceAttris[i]);
                  _this.instanceAttris.splice(i, 1);
                  _this.instance_attributes.splice(
                    _this.instanceAttris[i].name,
                    1
                  );
                }
              }
            });
          }
        });
      }
      _this.isVisible = true;
    },
    addRscTypeSelected(value) {
      let _this = this;
      _this.instanceAttris = [];
      _this.actionsAttris = [];
      _this.InsTypes = {};
      _this.instance_attributes = [];
      _this.addForm.instance_attributes = {};
      _this.action_attributes = [];
      _this.yigebiaoge = [];
      this.meta_attributes = []; //选中的元属性列表
      this.requiredItems = [];
      delete _this.addForm.class;
      delete _this.addForm.provider;
      delete _this.addForm.type;
      if (value) {
        if (value[0]) {
          _this.addForm.class = value[0];
          _this.addForm.type = value[1];
          // let url = "";
          let urlData = {};

          if (value[2]) {
            urlData.class = value[0];
            urlData.type = value[2];
            urlData.provider = value[1];

            // url = "/metas/" + value[0] + "/" + value[2] + "/" + value[1];
            _this.addForm.provider = value[1];

            _this.addForm.type = value[2];
          } else {
            urlData.class = value[0];
            urlData.type = value[1];

            // url = "/metas/" + value[0] + "/" + value[1];
          }
          getAttris(urlData).then((res) => {
            _this.instanceAttris = Array.from(
              new Set(
                res.data.data.parameters.map((item) => JSON.stringify(item))
              )
            ).map((item) => JSON.parse(item));
            _this.actionsAttris = Array.from(
              new Set(res.data.data.actions.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item));
            for (let i in _this.instanceAttris) {
              _this.InsTypes[_this.instanceAttris[i].name] =
                _this.instanceAttris[i].content.type;
            }
            for (let i in _this.instanceAttris) {
              if (_this.instanceAttris[i].required == 1) {
                _this.requiredItems.push(_this.instanceAttris[i]);
                _this.instanceAttris.splice(i, 1);
              }
            }
          });
        }
      }
    },
    addActionTag(value) {
      if (value.length > this.yigebiaoge.length) {
        for (let item of value) {
          if (
            this.yigebiaoge
              .map((item) => item.name)
              .indexOf(JSON.parse(item).name) == -1
          ) {
            this.yigebiaoge.push(JSON.parse(item));
          }
        }
      } else {
        for (let data of this.yigebiaoge) {
          if (
            value.map((item) => JSON.parse(item).name).indexOf(data.name) == -1
          ) {
            this.yigebiaoge.splice(this.yigebiaoge.indexOf(data), 1);
          }
        }
      }
    },
    verifyItem(item) {
      if (this.requiredItems.indexOf(item) > -1) {
        return true;
      } else {
        return false;
      }
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
        if (_this.addForm.instance_attributes[i] == "true") {
          _this.addForm.instance_attributes[i] = true;
        }
        if (_this.addForm.instance_attributes[i] == "false") {
          _this.addForm.instance_attributes[i] = false;
        }
      }
      for (let i in _this.yigebiaoge) {
        _this.addForm.actions.push(_this.yigebiaoge[i]);
      }
      for (let i in _this.addForm.meta_attributes) {
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
                if (res.data.action == true) {
                  this.$message({
                    type: "success",
                    message: "resource adding success",
                  });
                  _this.disableSubmit = false;
                  _this.isVisible = false;
                  _this.closeDialog();
                  _this.$emit("refresh");
                } else {
                  this.$message({
                    type: "error",
                    message: " please check your inputs",
                  });
                  _this.disableSubmit = false;
                }
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
                  _this.closeDialog();
                  _this.$emit("refresh");
                })
                .catch((err) => {
                  this.$message({
                    type: "error",
                    message: err + " please check your inputs",
                  });
                  _this.closeDialog();
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
          // let url = "/resources/" + _this.addForm.id;

          editItem({id: _this.addForm.id, data: _this.addForm} )
            .then((res) => {
              this.$message({
                type: "success",
                message: "resource edit success",
              });

              _this.disableSubmit = false;
              _this.closeDialog();
              _this.isVisible = false;
              _this.$emit("cleanSelecting");
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
    checkInputs() {
      switch (this.dialogType) {
        case "primitive":
          let requirements = true;
          if (this.requiredItems.length && this.activeName == "first") {
            for (let i of this.requiredItems) {
              if (!this.addForm.instance_attributes[i.name]) {
                requirements = false;
              }
            }
          }
          if (this.addForm.id && this.addForm.type && requirements) {
            return true;
          } else {
            this.$message({
              type: "warning",
              message: "please check your inputs",
            });
            return false;
          }
        case "clone":
          if (this.addForm.rsc_id) {
            return true;
          } else {
            this.$message({
              type: "warning",
              message: "please check your inputs",
            });
            return false;
          }
        case "group":
          if (this.addForm.rscs.length && this.addForm.id) {
            return true;
          } else {
            this.$message({
              type: "warning",
              message: "please check your inputs",
            });
            return false;
          }
        default:
          break;
      }
    },
    deleteTag(val) {
      if (this.noGroup.map((item) => item.id).indexOf(val) == -1) {
        this.noGroup.push({ id: val });
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

<style scoped lang='scss' scoped>
.el-dialog {
  .button-tabs {
    .tab-panels {
      .block {
        float: left;
        width: 260px;
        // height: 40px;
      }
      .el-row {
        margin-bottom: 20px;
      }
      .row-style {
        margin: 0px;
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
/deep/ .el-dialog__body{
   padding: 10px 20px
}
</style>