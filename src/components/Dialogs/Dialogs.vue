<template>
  <!-- dialogs -->
  <el-dialog
    class="basicAddDialog"
    title="创建资源"
    :visible.sync="disableEdit"
    width="46%"
  >
    <el-form v-if="RcsDetail" v-model="addForm" ref="addForm" label-width="200px">
      <el-tabs class="button-tabs">
        <el-tab-pane class="tab-panels" label="基本">
          <el-form-item label="资源名称" prop="id">
            {{ addForm.id }}
            <el-input class="block" disabled v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item
            v-if="rscType == 'primitive'"
            label="资源类型"
            prop="type"
          >
            <el-input class="block" v-model="metas" disabled></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane
          class="tab-panels"
          v-if="addForm.type"
          label="实例属性"
          label-width="200px"
        >
          <el-row>
            <span class="modify-label"> 需要修改的实例属性： </span>
            <span class="block" v-if="metaAttris">
              <el-select
                v-model="instance_attributes"
                multiple
                placeholder="请选择"
                class="block"
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
            <div v-for="(item, key) in instance_attributes" :key="key">
              <el-row>
                <span class="modify-label">{{ instance_attributes[key] }}</span>
                <span>
                  <el-input
                    class="block"
                    v-if="InsTypes[instance_attributes[key]] == 'string'"
                    v-model="
                      addForm.instance_attributes[instance_attributes[key]]
                    "
                    @input="forceUpdate"
                  ></el-input>
                  <el-switch
                    class="block"
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

        <el-tab-pane class="tab-panels" label="元属性">
          <el-row>
            <label class="modify-label">需要修改的元属性: </label>
            <span v-if="metaAttris">
              <el-select
                class="block"
                v-model="meta_attributes"
                multiple
                placeholder="请选择"
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
                    v-if="metaAttrTypes[meta_attributes[key]] == 'string'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input>
                  <el-switch
                    class="block"
                    :active-value="true"
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

        <el-tab-pane class="tab-panels" v-if="false" label="操作属性">
          <el-row>
            <span class="modify-label">需要修改的操作属性：</span>
            <span class="block" v-if="metaAttris && operationAttris">
              <el-select
                class="block"
                v-model="addSelectedAttris.actions"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in operationAttris"
                  :key="item.name"
                  :label="item.name"
                  :value="item"
                  @click.native="setActions(item)"
                >
                </el-option>
              </el-select>
            </span>
          </el-row>

          <!-- <el-table :data="addForm.actions">
              <el-table-column prop="name" label="name">
                
              </el-table-column>
              <el-table-column
                prop="interval"
                label="interval"
              ></el-table-column>
              <el-table-column
                prop="start-delay"
                label="start-delay"
              ></el-table-column>
              <el-table-column prop="timeout" label="timeout"></el-table-column>
              <el-table-column prop="role" label="role"></el-table-column>
              <el-table-column prop="on-fail" label="on-fail">
              </el-table-column>
            </el-table> -->
        </el-tab-pane>
        <span class="hometable-dialog-footer">
          <el-button @click="disableEdit = false">取 消</el-button>
          <el-button type="primary" @click="addItem">确 定</el-button>
        </span>
      </el-tabs>
    </el-form>
    {{addForm}}
  </el-dialog>
</template>

<script>
import{getRcsDetail,getAttris,getMetaAttris }from '@/api/hometable'
export default {
  props: ["chosenSrc","category", "disableEdit"],
  data() {
    return {
      RcsDetail:{},
      activeName: "first",
      rscType: "",
      addForm: {
        id: "",
        meta_attributes: {},
        instance_attributes: {},
      },
      metaAttris: [], //元属性列表
      meta_attributes: [], //选中的元属性列表
      metaAttrTypes: {}, //元属性类型对象
      metas: "", //资源类型下拉列表
      instanceAttris: [], //实例属性下拉列表
      InsTypes: {}, //实例属性的类型列表，用来判断生成的输入类型
      operationAttris: [], //操作属性列表
    };
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
  created() {
    //http://192.168.1.10:8080/api/v1/haclusters/1/resources/hbt1?category=primitive
    let _this = this;
    _this.addForm.id = _this.chosenSrc;
    //拿到所有已有的值
    let url = resources+'/'+_this.chosenSrc+'?category='+_this.category
    getRcsDetail(url).then((res) => {
      _this.RcsDetail = res.data.data;
      _this.addForm.class = _this.RcsDetail.class;
      _this.addForm.provider = _this.RcsDetail.provider;
      _this.rscType = _this.RcsDetail.category;
      if (_this.RcsDetail.meta_attributes) {
        for (let i in _this.RcsDetail.meta_attributes) {
          _this.addForm.meta_attributes[i] = _this.RcsDetail.meta_attributes[i];
        }
      }
      if (_this.RcsDetail.instance_attributes) {
        for (let i in _this.RcsDetail.instance_attributes) {
          _this.addForm.instance_attributes[i] =
            _this.RcsDetail.instance_attributes[i];
        }
      }
      if (_this.RcsDetail.type) {
        _this.addForm.type = _this.RcsDetail.type;
        _this.metas =
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
        _this.metas = _this.chosenRsc.class + "/" + _this.chosenRsc.provider;
      }
    });

    getMetaAttris(_this.rscType).then((res) => {
      _this.metaAttris = res.data.data;
      for (let i in _this.metaAttris) {
        _this.metaAttrTypes[_this.metaAttris[i].name] =
          _this.metaAttris[i].content.type;
      }
    });
  },
  methods: {},
};
</script>

<style>
</style>