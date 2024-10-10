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
      this.activeName == "first";
      this.dialogType = type;
      this.dialogAction = action;
      this.title =
        this.dialogAction == "add"
          ? this.$t("dialog.add")
          : this.$t("dialog.edit");
      this.disableInputName =
        this.dialogType == "clone" || this.dialogAction == "edit"
          ? true
          : false;
      getMetaAttris(this.dialogType).then((res) => {
        this.metaAttris = res.data.data;
        for (let i in this.metaAttris) {
          this.metaAttrTypes[this.metaAttris[i].name] =
            this.metaAttris[i].content.type;
        }
      });
      switch (this.dialogType) {
        case "primitive":
          getMetas().then((res) => {
            this.metas = res.data.data;
            let types = this.metas;
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
            this.metas = options;
          });
          break;
        case "group":
          for (let i in this.$store.state.noGroupItems) {
            this.noGroup.push(this.$store.state.noGroupItems[i]);
          }
        case "clone":
          for (let i in this.$store.state.ids) {
            this.tableData.push(this.$store.state.ids[i]);
          }
      }
      if (this.dialogAction == "edit") {
        let chosenItem = this.$store.state.chosenItem;
        this.dialogType = chosenItem.type;
        this.addForm.id = chosenItem.id;
        this.addForm.category = chosenItem.type;

        if (this.dialogType == "clone")
          this.addForm.rsc_id = chosenItem.id.slice(0, -6);
        if (this.dialogType == "group") {
          this.addForm.rscs = [];
          this.noGroup = [];
          for (let i in chosenItem.subrscs) {
            this.addForm.rscs.push(chosenItem.subrscs[i].id);
          }
          for (let i in this.$store.state.noGroupItems) {
            this.noGroup.push(this.$store.state.noGroupItems[i]);
          }
        }

        // let url = "resources/" + chosenItem.id + "?category=" + chosenItem.type;
        let data = {};
        data.id = chosenItem.id;
        data.category = chosenItem.type;

        getRcsDetail(data).then((res) => {
          this.RcsDetail = res.data.data;
          if (this.RcsDetail.class)
            this.addForm.class = this.RcsDetail.class;
          this.addForm.provider = this.RcsDetail.provider;
          if (this.RcsDetail.meta_attributes) {
            for (let i in this.RcsDetail.meta_attributes) {
              this.meta_attributes.push(i);
              this.addForm.meta_attributes[i] =
                this.RcsDetail.meta_attributes[i];
            }
          }

          if (this.RcsDetail.instance_attributes) {
            for (let i in this.RcsDetail.instance_attributes) {
              this.instance_attributes.push(i);
              this.addForm.instance_attributes[i] =
                this.RcsDetail.instance_attributes[i];
            }
          }
          if (this.dialogType == "primitive") {
            // let url = "";
            let urlData = {};
            
            if (this.RcsDetail.provider) {
              this.addForm.type = this.RcsDetail.type;
              this.editMetas =
                this.RcsDetail.class +
                "/" +
                this.RcsDetail.provider +
                "/" +
                this.RcsDetail.type;

                urlData.class = this.RcsDetail.class;
                urlData.type = this.RcsDetail.type;
                urlData.provider = this.RcsDetail.provider;

              // url = "/metas/" + this.RcsDetail.class + "/" + this.RcsDetail.type + "/" + this.RcsDetail.provider;
            } else {
              this.addForm.type = this.RcsDetail.type;
              this.editMetas =
                this.RcsDetail.class + "/" + this.RcsDetail.type;

                urlData.class = this.RcsDetail.class;
                urlData.type = this.RcsDetail.type;
              // url = "/metas/" + this.RcsDetail.class + "/" + this.RcsDetail.type;
            }
            getAttris(urlData).then((res) => {
              this.instanceAttris = Array.from(
                new Set(
                  res.data.data.parameters.map((item) => JSON.stringify(item))
                )
              ).map((item) => JSON.parse(item));
              this.actionsAttris = Array.from(
                new Set(
                  res.data.data.actions.map((item) => JSON.stringify(item))
                )
              ).map((item) => JSON.parse(item));
              if (this.RcsDetail.actions) {
                for (let i of this.RcsDetail.actions) {
                  for (let j in this.actionsAttris) {
                    if (this.actionsAttris[j].name == i.name) {
                      this.actionsAttris[j] = JSON.parse(JSON.stringify(i));
                    }
                  }
                  this.action_attributes.push(JSON.stringify(i));
                  this.addActionTag(this.action_attributes);
                }
              }
              for (let i in this.instanceAttris) {
                this.InsTypes[this.instanceAttris[i].name] =
                  this.instanceAttris[i].content.type;
              }
              for (let i in this.instanceAttris) {
                if (this.instanceAttris[i].required == 1) {
                  this.requiredItems.push(this.instanceAttris[i]);
                  this.instanceAttris.splice(i, 1);
                  this.instance_attributes.splice(
                    this.instanceAttris[i].name,
                    1
                  );
                }
              }
            });
          }
        });
      }
      this.isVisible = true;
    },
    addRscTypeSelected(value) {
      this.instanceAttris = [];
      this.actionsAttris = [];
      this.InsTypes = {};
      this.instance_attributes = [];
      this.addForm.instance_attributes = {};
      this.action_attributes = [];
      this.yigebiaoge = [];
      this.meta_attributes = []; //选中的元属性列表
      this.requiredItems = [];
      delete this.addForm.class;
      delete this.addForm.provider;
      delete this.addForm.type;
      if (value) {
        if (value[0]) {
          this.addForm.class = value[0];
          this.addForm.type = value[1];
          // let url = "";
          let urlData = {};

          if (value[2]) {
            urlData.class = value[0];
            urlData.type = value[2];
            urlData.provider = value[1];

            // url = "/metas/" + value[0] + "/" + value[2] + "/" + value[1];
            this.addForm.provider = value[1];

            this.addForm.type = value[2];
          } else {
            urlData.class = value[0];
            urlData.type = value[1];

            // url = "/metas/" + value[0] + "/" + value[1];
          }
          getAttris(urlData).then((res) => {
            this.instanceAttris = Array.from(
              new Set(
                res.data.data.parameters.map((item) => JSON.stringify(item))
              )
            ).map((item) => JSON.parse(item));
            this.actionsAttris = Array.from(
              new Set(res.data.data.actions.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item));
            for (let i in this.instanceAttris) {
              this.InsTypes[this.instanceAttris[i].name] =
                this.instanceAttris[i].content.type;
            }
            for (let i in this.instanceAttris) {
              if (this.instanceAttris[i].required == 1) {
                this.requiredItems.push(this.instanceAttris[i]);
                this.instanceAttris.splice(i, 1);
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
      delete this.addForm.instance_attributes[value];
    },
    deleteMetaTag(value) {
      delete this.addForm.meta_attributes[value];
    },
    forceUpdate() {
      this.$forceUpdate();
    },
    setCloneRscId(value) {
      this.addForm.id = this.addForm.rsc_id + "-clone";
    },
    addItem(value) {
      this.disableSubmit = true;

      for (let i in this.addForm.instance_attributes) {
        if (this.addForm.instance_attributes[i] == "true") {
          this.addForm.instance_attributes[i] = true;
        }
        if (this.addForm.instance_attributes[i] == "false") {
          this.addForm.instance_attributes[i] = false;
        }
      }
      for (let i in this.yigebiaoge) {
        this.addForm.actions.push(this.yigebiaoge[i]);
      }
      for (let i in this.addForm.meta_attributes) {
        if (this.addForm.meta_attributes[i] == "true") {
          this.addForm.meta_attributes[i] = true;
        }
        if (this.addForm.meta_attributes[i] == "false") {
          this.addForm.meta_attributes[i] = false;
        }
      }
      if (this.dialogAction == "add") {
        switch (this.dialogType) {
          case "primitive":
            this.addForm.category = "primitive";
            addItems(this.addForm)
              .then((res) => {
                if (res.data.action == true) {
                  this.$message({
                    type: "success",
                    message: "resource adding success",
                  });
                  this.disableSubmit = false;
                  this.isVisible = false;
                  this.closeDialog();
                  this.$emit("refresh");
                } else {
                  this.$message({
                    type: "error",
                    message: " please check your inputs",
                  });
                  this.disableSubmit = false;
                }
              })
              .catch((err) => {
                this.$message({
                  type: "error",
                  message: err + " please check your inputs",
                });
                this.disableSubmit = false;
              });
            break;
          case "group":
            if (this.addForm.id && this.addForm.rscs.length > 0) {
              this.addForm.category = "group";
              addItems(this.addForm)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "resource adding success",
                  });
                  this.disableSubmit = false;
                  this.isVisible = false;
                  this.closeDialog();
                  this.$emit("refresh");
                })
                .catch((err) => {
                  this.$message({
                    type: "error",
                    message: err + " please check your inputs",
                  });
                  this.closeDialog();
                  this.disableSubmit = false;
                });
            }
            break;
          case "clone":
            if (this.addForm.rsc_id) {
              this.addForm.category = "clone";
              addItems(this.addForm)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "resource adding success",
                  });
                  this.disableSubmit = false;
                  this.isVisible = false;
                  this.$emit("refresh");
                })
                .catch((err) => {
                  this.$message({
                    type: "error",
                    message: err + " please check your inputs",
                  });
                  this.disableSubmit = false;
                });
            } else {
              this.$message({
                type: "error",
                message: "please check your inputs",
              });
              this.disableSubmit = false;
            }
            break;
        }
      } else {
        if (this.dialogAction == "edit") {
          // let url = "/resources/" + this.addForm.id;

          editItem({id: this.addForm.id, data: this.addForm} )
            .then((res) => {
              this.$message({
                type: "success",
                message: "resource edit success",
              });

              this.disableSubmit = false;
              this.closeDialog();
              this.isVisible = false;
              this.$emit("cleanSelecting");
              this.$emit("refresh");
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err + "please check your inputs",
              });
              this.disableSubmit = false;
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
        for (let j = 0; j < val.length; j++) {
          if (
            !this.addForm.instance_attributes[val[j]] &&
            this.addForm.instance_attributes[val[j]] !== ""
          ) {
            this.addForm.instance_attributes[val[j]] = "";
          }
        }
      },
    },
    meta_attributes: {
      deep: true,
      handler(val, oldVal) {
        for (let j = 0; j < val.length; j++) {
          if (
            !this.addForm.meta_attributes[val[j]] &&
            this.addForm.meta_attributes[val[j]] !== ""
          ) {
            this.addForm.meta_attributes[val[j]] = "";
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
::v-deep  .el-dialog__body{
   padding: 10px 20px
}
</style>