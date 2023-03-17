<template>
    <div class="container containerrole">
        <div class="roleManage">
            <div class="rmtitle">
                <div class="orderTop" style="border-bottom: none">
                    <span
                        >角色管理<span class="dayu">></span><span>{{ info.id > 0 ? '编辑' : '添加' }}</span></span
                    >
                </div>
            </div>
            <div class="roleBody">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ info.id > 0 ? '编辑' : '添加' }}角色</div>
                </div>
                <el-form ref="form" label-position="right" :rules="rules" :model="form" label-width="80px">
                    <!-- <div class="rmtitle rmtSearch">{{ info.id > 0 ? '编辑' : '添加' }}角色</div> -->
                    <div class="searchname">
                        <div class="">
                            <div class="leftjiao">
                                <div>
                                    <el-form-item label="角色名称" prop="name" class="bitainWidth">
                                        <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item label="角色描述" class="bitainWidth2">
                                        <el-input
                                            v-model="form.remark"
                                            maxlength="50"
                                            placeholder="不得超于50个汉字或字符"
                                            type="textarea"
                                            show-word-limit
                                            :rows="2"
                                            @input="checkLength"
                                        ></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="quanxian">
                                <div class="tableTop addtableTop" flex="cross:center main:justify">
                                    <div>{{ info.id > 0 ? '编辑' : '添加' }}角色权限</div>
                                </div>
                                <!-- <div class="rmtitle rmtSearch addRolees">角色权限</div> -->
                                <!-- :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" default-expand-all -->
                                <el-tree
                                    default-expand-all
                                    :data="data"
                                    show-checkbox
                                    node-key="Menu_Id"
                                    ref="tree"
                                    :default-checked-keys="checkedKeys"
                                    :props="defaultProps"
                                    @check-change="handleCheckChange"
                                    :expand-on-click-node="false"
                                    check-on-click-node
                                >
                                </el-tree>
                            </div>
                            <div>
                                <el-form-item class="bottomName">
                                    <el-button class="dioSave btnOk" @click="AddOrder('form')">保存</el-button>
                                    <el-button class="dioSave btnCancel" @click="back()">返回</el-button>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { RoleEdit, RoleDetialList, RoleDetilaEdit } from '@/api/api';
export default {
    components: {},
    data() {
        return {
            form: {
                name: '',
                remark: ''
            },

            gyDataVal: [],
            data: [],

            defaultProps: {
                children: 'RoleDetial',
                label: 'MenuName'
            },
            rules: {
                name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            },
            info: {},
            checkedKeys: [],
            justArray: []
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        // console.log(JSON.parse(this.$Base64.decode(this.$route.query.info)));
        this.info = JSON.parse(this.$Base64.decode(this.$route.query.info));
        if (this.info.id > 0) {
            this.form.name = this.info.name;
        }
        this.getRoleDetialList();
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        AddOrder(formName) {
            // console.log(this.$refs.tree.getCheckedNodes());
            // console.log(this.$refs.tree.getCheckedKeys(), '保存的key');

            let array = this.getArray()[0];
            let jsonEnd = this.getArray()[1];
            // console.log(jsonEnd, 'dataEnd');
            // console.log(array, 'array');
            jsonEnd.forEach((item, index) => {
                item.RoleDetial.forEach((itemes, indexes) => {
                    itemes.roleStr = [];
                    if (itemes.RoleDetial.length > 0) {
                        itemes.RoleDetial.forEach((itemes2, indexes2) => {
                            //    拼接roleStr
                            array.forEach((i, ind) => {
                                if (itemes2.Menu_Id == i) {
                                    itemes.roleStr.push(itemes2.Id);
                                }
                            });
                        });
                    }
                });
            });
            jsonEnd.forEach((item, index) => {
                item.RoleDetial.forEach((itemes, indexes) => {
                    itemes.roleStr = itemes.roleStr.join('-');
                });
            });

            // console.log(jsonEnd, 'dataEnd');
            let editArr1 = [];
            jsonEnd.forEach((item, index) => {
                let zuo = {};
                array.forEach((item2, index2) => {
                    if (item2 == item.Menu_Id) {
                        zuo.id = item.RoleDetial_id; //需要特殊处理

                        zuo.menu_id = item.Menu_Id;
                        zuo.role_id = item.Role_id;
                        zuo.cp_id = localStorage.getItem('comp_id');
                        zuo.roleStr = '';
                        editArr1.push(zuo);
                    }
                });
                
            });
            let editArr2 = [];
            jsonEnd.forEach((item, index) => {
                item.RoleDetial.forEach((itemes, indexes) => {
                    let zuo = {};
                    array.forEach((item2, index2) => {
                        if (item2 == itemes.Menu_Id) {
                            zuo.id = itemes.RoleDetial_id; //需要特殊处理

                            zuo.menu_id = itemes.Menu_Id;
                            zuo.role_id = itemes.Role_id;
                            zuo.cp_id = localStorage.getItem('comp_id');
                            zuo.roleStr = itemes.roleStr;
                            editArr2.push(zuo);
                        }
                    });
                    // if (array.includes(itemes.Menu_Id)) {
                    //     zuo.id = itemes.RoleDetial_id; //需要特殊处理

                    //     zuo.menu_id = itemes.Menu_Id;
                    //     zuo.role_id = itemes.Role_id;
                    //     zuo.cp_id = localStorage.getItem('comp_id');
                    //     zuo.roleStr = itemes.roleStr;
                    //     editArr2.push(zuo);
                    // }
                });
            });

            // console.log(editArr1, 'editArr1====');
            // console.log(editArr2, 'editArr2====');
            let editArr = editArr1.concat(editArr2);
            // console.log(editArr, '===editArr');
            // 新
            let numarray = [];
            array.forEach((item, index) => {
                if (typeof item === 'number') {
                    numarray.push(item);
                }
            });
            // console.log(numarray, '===numarray');

            // 原
            let numjustArray = [];
            this.justArray.forEach((item, index) => {
                if (typeof item === 'number') {
                    numjustArray.push(item);
                }
            });

            // console.log(this.compare(numjustArray, numarray), '对比');
            // console.log(numjustArray, '===numjustArray');
            let addDel = this.compare(numjustArray, numarray);
            editArr.forEach((item, index) => {
                // console.log(item);
                if (addDel.add.includes(item.id)) {
                    item.id = 0;
                }
                // if(addDel.del.includes(item.id)){
                //     item.id='-'+item.id
                // }
            });
            let del1 = [];
            jsonEnd.forEach((item, index) => {
                addDel.del.forEach((item2, index2) => {
                    if (item2 == item.Menu_Id) {
                        let zuo = {};
                        zuo.id = '-' + item.RoleDetial_id;

                        zuo.menu_id = item.Menu_Id;
                        zuo.role_id = item.Role_id;
                        zuo.cp_id = localStorage.getItem('comp_id');
                        zuo.roleStr = '';
                        del1.push(zuo);
                    }
                });
            });
            let del2 = [];
            jsonEnd.forEach((item, index) => {
                item.RoleDetial.forEach((itemes, indexes) => {
                    addDel.del.forEach((item2, index2) => {
                        if (item2 == itemes.Menu_Id) {
                            let zuo = {};
                            zuo.id = '-' + itemes.RoleDetial_id;

                            zuo.menu_id = itemes.Menu_Id;
                            zuo.role_id = itemes.Role_id;
                            zuo.cp_id = localStorage.getItem('comp_id');
                            zuo.roleStr = itemes.roleStr;
                            del2.push(zuo);
                        }
                    });
                });
            });
            // console.log(del1, del2, 'del');
            let e1 = editArr.concat(del1);
            let e2 = e1.concat(del2);

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        cp_id: localStorage.getItem('comp_id'),
                        id: this.info.id,
                        name: this.form.name,
                        remark: this.form.remark
                    };
                    RoleEdit(params)
                        .then((res) => {
                            let { ReturnCode, Data } = res;
                            if (ReturnCode == 200) {
                                // Data.id

                                if (this.info.id == 0) {
                                    e2.forEach((item, index) => {
                                        item.role_id = Data;
                                    });
                                } else {
                                    e2.forEach((item, index) => {
                                        item.role_id = this.info.id;
                                    });
                                }
                                // console.log(e2, 'e2111111111');

                                let params = e2;
                                RoleDetilaEdit(params).then((res) => {
                                    let { ReturnCode, Data } = res;
                                    if (ReturnCode == 200) {
                                        if (this.info.id > 0) {
                                            this.$message.success('修改成功');
                                            this.back();
                                        } else {
                                            this.$message.success('新增成功');
                                            this.back();
                                        }
                                    }
                                });
                            }
                        })
                        .catch((err) => {});
                } else {
                    return false;
                }
            });
        },
        getRoleDetialList() {
            let params = {
                ID: this.info.id
            };
            RoleDetialList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    Data.forEach((item, index) => {
                        item.RoleDetial.forEach((itemes, indexes) => {
                            itemes.RoleDetial = itemes.Btn;
                        });
                    });
                    this.liebiaoIdList = [];
                    Data.forEach((item, index) => {
                        item.RoleDetial.forEach((itemes, indexes) => {
                            // if(itemes.RoleDetial.length>0){
                            itemes.RoleDetial.forEach((itemes2, indexes2) => {
                                itemes2.MenuName = itemes2.Name;
                                itemes2.Menu_Id = 'b' + itemes2.Id; //此处id 需为唯一
                                if (itemes2.Enable == true) {
                                    this.checkedKeys.push(itemes2.Menu_Id);
                                }
                                if (itemes2.Name == '列表') {
                                    itemes2.liebiao = true;
                                    this.liebiaoIdList.push(itemes2.Menu_Id);
                                }
                            });
                            // }
                            // if(itemes.RoleDetial.length<=0){
                            //     if(itemes.Role_id>0){
                            //         this.checkedKeys.push(itemes.Menu_Id);
                            //     }
                            // }
                        });
                    });

                    // console.log(Data, 'Data');
                    // console.log(this.checkedKeys, 'this.checkedKeys');

                    this.data = Data;
                    if (this.info.id > 0) {
                        this.$nextTick(() => {
                            // console.log(this.$refs.tree.getCheckedKeys(), '取出数据的key');
                            // 判断刚拿到数据时选中的一级二级(三级,不用对比)id
                            this.justArray = this.getArray()[0];
                            // let ja0 = this.getArray()[0];
                            // // Role_id
                            // let ja1=[]
                            // this.data.forEach((item, index) => {
                            //     if(item.Role_id==1){
                            //         ja1.push(item.Menu_Id)
                            //     }
                            // })
                            // let ja2=[]
                            // this.data.forEach((item, index) => {
                            //     if(item.length>0){
                            //         item.forEach((item2,index2)=>{
                            //             if(item2.Role_id==1){
                            //                 ja2.push(item2.Menu_Id)
                            //             }
                            //         })
                            //     }

                            // })
                            // let ja=ja0.concat(ja1)
                            // this.justArray=ja.concat(ja2)

                            // console.log(this.justArray, 'this.justArray');
                        });
                    }
                }
            });
        },
        getArray() {
            let checkkeyArr = this.$refs.tree.getCheckedKeys();
            let dataEnd = JSON.stringify(this.data);
            let jsonEnd = JSON.parse(dataEnd);
            // console.log(jsonEnd, 'jsonEnd');

            let arr2 = [];
            jsonEnd.forEach((item, index) => {
                item.RoleDetial.forEach((itemes, indexes) => {
                    if (checkkeyArr.includes(itemes.Menu_Id)) {
                        arr2.push(item.Menu_Id);
                    }
                });
            });
            jsonEnd.forEach((item, index) => {
                item.RoleDetial.forEach((itemes, indexes) => {
                    itemes.RoleDetial.forEach((itemes2, indexes2) => {
                        // console.log(itemes2.Menu_Id);
                        if (checkkeyArr.includes(itemes2.Menu_Id)) {
                            checkkeyArr.push(itemes.Menu_Id);
                            checkkeyArr.push(item.Menu_Id);
                        }
                    });
                });
            });
            let concheck = checkkeyArr.concat(arr2);
            let array = [];
            for (var i = 0; i < concheck.length; i++) {
                if (array.indexOf(concheck[i]) === -1) {
                    array.push(concheck[i]);
                }
            }
            return [array, jsonEnd];
        },
        compare(beforeArr, afterArr) {
            let resObj = {
                    add: [],
                    del: []
                },
                cenObj = {};
            //把beforeArr数组去重放入cenObj
            for (let i = 0; i < beforeArr.length; i++) {
                cenObj[beforeArr[i]] = beforeArr[i];
            }
            //遍历afterArr，查看其元素是否在cenObj中
            for (let j = 0; j < afterArr.length; j++) {
                if (!cenObj[afterArr[j]]) {
                    resObj.add.push(afterArr[j]);
                } else {
                    delete cenObj[afterArr[j]];
                }
            }
            for (let k in cenObj) {
                resObj.del.push(k);
            }
            return resObj;
        },
        handleCheckChange(data, checked, indeterminate) {
            this.cancelIdList = [];

            // 点击的时候查看列表是否被选中
            this.liebiaoIdList.forEach((item, index) => {
                if (item == data.Menu_Id) {
                    if (checked == false) {
                        this.cancelId = [];
                        this.data.forEach((item, index) => {
                            item.RoleDetial.forEach((itemes, indexes) => {
                                itemes.RoleDetial.forEach((itemes2, indexes2) => {
                                    if (data.Menu_Id == itemes2.Menu_Id) {
                                        this.cancelId.push(itemes.Menu_Id);
                                        this.cancel2 = [];
                                        itemes.RoleDetial.forEach((fourItem, indexfour) => {
                                            this.cancel2.push(fourItem.Menu_Id);
                                        });
                                    }
                                });
                            });
                        });
                        this.cancelIdList = this.cancelId.concat(this.cancel2);
                    }
                }
            });

            let checkedKey = this.$refs.tree.getCheckedKeys();

            if (this.cancelIdList.length > 0) {
                for (let i = 0; i < checkedKey.length; i++) {
                    for (let j = 0; j < this.cancelIdList.length; j++) {
                        if (checkedKey[i] == this.cancelIdList[j]) {
                            checkedKey.splice(i, 1);
                        }
                    }
                }
            }

            this.data.forEach((item, index) => {
                item.RoleDetial.forEach((itemes, indexes) => {
                    itemes.RoleDetial.forEach((itemes2, indexes2) => {
                        if (data.Menu_Id == itemes2.Menu_Id) {
                            if (checked == true) {
                                itemes.RoleDetial.forEach((fourItem, indexfour) => {
                                    // this.cancel2.push(fourItem.Menu_Id)
                                    if (fourItem.MenuName == '列表') {
                                        checkedKey.push(fourItem.Menu_Id);
                                    }
                                });
                            }
                        }
                    });
                });
            });

            this.$refs.tree.setCheckedKeys(checkedKey);

            // console.log(this.$refs.tree.getCheckedKeys(),'查验');
        },
        checkLength(e) {
            this.form.remark = e.substring(0, 50);
        }
    },

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.butn {
    border: 2px solid #b1b8bc;
    background: linear-gradient(0deg, #cfd0e2 0%, #ffffff 100%);
    border-radius: 4px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #000000;
    line-height: 12px;
}
</style>