import fetch from './request';

/****************new****************/

// 登录接口
// export function employeeClientLogin(params) {
//   return fetch.post('Employee/ClientLogin', params);
// }

// // 角色-按钮权限-登录查询
// export function FindByID(params) {
//     return fetch.get('InspectProcess/FindByID',{
//       params
//     })
//   }

// 用户登录
export function Login(params) {
    return fetch.post('user/Login', params);
}

// 用户登录
export function RoleMenu(params) {
    return fetch.post('user/RoleMenu', params);
}
// 订单列表
export function OrderList(params) {
    return fetch.post('Business/OrderList', params);
}

// 订单添加
export function AddOrder(params) {
    return fetch.post('Business/AddOrder', params);
}

// 客户列表
export function BuyerList(params) {
    return fetch.post('Business/BuyerList', params);
}

// 订单编辑
export function ModifyOrder(params) {
    return fetch.post('Business/ModifyOrder', params);
}

// 模具类型列表
export function MoldTypeList(params) {
    return fetch.post('DB/MoldTypeList', params);
}

// 模具类型添加
export function AddMoldType(params) {
    return fetch.post('DB/AddMoldType', params);
}

// 订单删除
export function DeleteOrder(params) {
    return fetch.post('Business/DeleteOrder', params);
}

// 客户添加
export function AddBuyer(params) {
    return fetch.post('Business/AddBuyer', params);
}

// 客户编辑
export function ModifyBuyer(params) {
    return fetch.post('Business/ModifyBuyer', params);
}

// 客户删除
export function DeleteBuyer(params) {
    return fetch.post('Business/DeleteBuyer', params);
}

// 生产任务列表
export function OrderTaskList(params) {
    return fetch.post('Business/OrderTaskList', params);
}

// 生产任务添加
export function AddOrderTask(params) {
    return fetch.post('Business/AddOrderTask', params);
}

// 生产任务删除
export function DeleteOrderTask(params) {
    return fetch.post('Business/DeleteOrderTask', params);
}

// 生产任务编辑
export function ModifyOrderTask(params) {
    return fetch.post('Business/ModifyOrderTask', params);
}

// 加工任务列表
export function OrderTaskDetialList(params) {
    return fetch.post('Business/OrderTaskDetialList', params);
}

// 加工任务添加
export function AddOrderTaskDetial(params) {
    return fetch.post('Business/AddOrderTaskDetial', params);
}
// 加工任务添加批量
export function AddOrderTaskDetials(params) {
    return fetch.post('Business/AddOrderTaskDetials', params);
}

// 加工任务编辑
export function ModifyOrderTaskDetial(params) {
    return fetch.post('Business/ModifyOrderTaskDetial', params);
}

// 加工任务删除
export function DeleteOrderTaskDetial(params) {
    return fetch.post('Business/DeleteOrderTaskDetial', params);
}

// 代码列表
export function ProgramFileList(params) {
    return fetch.post('Business/ProgramFileList', params);
}

// 上传加工代码
export function AddProgramFiles(params) {
    return fetch.post('Business/AddProgramFiles', params);
}

// 编辑加工代码
export function ModifyProgramFile(params) {
    return fetch.post('Business/ModifyProgramFile', params);
}

// 删除加工代码
export function DeleteProgramFile(params) {
    return fetch.post('Business/DeleteProgramFile', params);
}

// 设备列表
export function DeviceList(params) {
    return fetch.post('DB/DeviceList2', params);
}

// 编辑加工代码-只更新名子
export function ModifyProgramFile_Name(params) {
    return fetch.post('Business/ModifyProgramFile_Name', params);
}

// 完成代码任务
export function ProgramLock(params) {
    return fetch.post('Business/ProgramLock', params);
}

// 编程任务列表
export function ProgramList(params) {
    return fetch.post('Business/ProgramList', params);
}

// 上传图片
export function AddOrderTaskDetailPic(params) {
    return fetch.post('Business/AddOrderTaskDetailPic', params);
}

// 图片列表
export function OrderTaskDetailPicList(params) {
    return fetch.post('Business/OrderTaskDetailPicList', params);
}

// 删除图片-数据 第一步
export function DeleteOrderTaskDetailPic(params) {
    return fetch.post('Business/DeleteOrderTaskDetailPic', params);
}

// 删除图片-文件 第二步
export function DeleteProgramPic(params) {
    return fetch.post(localStorage.getItem('upDaima') + 'api/File/DeleteProgramPic', params);
}

// 完成代码任务撤销
export function ProgramUnLock(params) {
    return fetch.post('Business/ProgramUnLock', params);
}

// 修改加工代码备份状态
export function ModifyProgramBackup(params) {
    return fetch.post('/Business/ModifyProgramBackup', params);
}

// 取消加工任务
export function CancelOrderTaskDetial(params) {
    return fetch.post('Business/CancelOrderTaskDetial', params);
}

// 看板列表
export function workdata(params) {
    return fetch.post('data/workdata', params);
}

//设计图记录
export function DesignPicListByOrder(params) {
    return fetch.post('Business/DesignPicListByOrder', params);
}

//设计审核
export function AuditDesign(params) {
    return fetch.post('Business/AuditDesign', params);
}

//工艺列表
export function BomCraftList(params) {
    return fetch.post('Business/BomCraftList', params);
}

//工艺列表明细
export function BomCraftDetialList(params) {
    return fetch.post('Business/BomCraftDetialList', params);
}

//为料号创建工艺
export function AddBomCraftDetial(params) {
    return fetch.post('Business/AddBomCraftDetial', params);
}

//工艺流程列表
export function ProcessFlowList(params) {
    return fetch.post('DB/ProcessFlowList', params);
}

//工艺列表
export function CraftList(params) {
    return fetch.post('DB/CraftList', params);
}

//工艺创建
export function AddBomCraft(params) {
    return fetch.post('Business/AddBomCraft', params);
}

//料号工艺编辑
export function ModifyBomCraftDetial(params) {
    return fetch.post('Business/ModifyBomCraftDetial', params);
}

//工艺删除
export function DeleteBomCraft(params) {
    return fetch.post('Business/DeleteBomCraft', params);
}

//模具加工明细
export function MoldDetial(params) {
    return fetch.post('data/MoldDetial', params);
}

// 思维导图
export function MoldMapL(params) {
    return fetch.post('data/MoldMapL', params);
}

// 首页
export function MoldHome(params) {
    return fetch.post('data/MoldHome', params);
}

// 角色-删除
export function RoleDele(params) {
    return fetch.post('user/RoleDele', params);
}

// 角色-增加 修改
export function RoleEdit(params) {
    return fetch.post('user/RoleEdit', params);
}

// 角色-权限详情列表
export function RoleDetialList(params) {
    return fetch.post('user/RoleDetialList', params);
}

// 角色-权限详情编辑
export function RoleDetilaEdit(params) {
    return fetch.post('user/RoleDetilaEdit', params);
}

// 角色列表
export function RoleList(params) {
    return fetch.post('user/RoleList', params);
}

// 用户列表
export function UserList(params) {
    return fetch.post('user/UserList', params);
}

// 用户-添加 修改
export function UserEdit(params) {
    return fetch.post('user/UserEdit', params);
}

// 部门列表
export function DepartmentList(params) {
    return fetch.post('user/DepartmentList', params);
}

// 用户-删除
export function UserDelete(params) {
    return fetch.post('user/UserDelete', params);
}

// 部门-添加 修改
export function DepartmentEdit(params) {
    return fetch.post('user/DepartmentEdit', params);
}

// 部门-删除
export function DeleteDepartment(params) {
    return fetch.post('user/DeleteDepartment', params);
}

// 用户-修改密码
export function ChangePWD(params) {
    return fetch.post('user/ChangePWD', params);
}

// 用户登录-刷新用户信息
export function ReLogin(params) {
    return fetch.post('user/ReLogin', params);
}
