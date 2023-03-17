import fetch from './request'
// 数据库
// 配件列表
export function PartList(params) {
    return fetch.post('DB/PartList', params);
}
// 配件添加
export function AddPart(params) {
    return fetch.post('DB/AddPart', params);
}
// 配件编辑
export function ModifyPart(params) {
    return fetch.post('DB/ModifyPart', params);
}
// 配件删除
export function DeletePart(params) {
    return fetch.post('DB/DeletePart', params);
}
// 配件规格列表
export function PartSpecList(params) {
    return fetch.post('DB/PartSpecList', params);
}
// 配件规格添加
export function AddPartSpec(params) {
    return fetch.post('DB/AddPartSpec', params);
}
// 配件规格编辑
export function ModifyPartSpec(params) {
    return fetch.post('DB/ModifyPartSpec', params);
}
// 配件规格删除
export function DeletePartSpec(params) {
    return fetch.post('DB/DeletePartSpec', params);
}
// 配件类别列表
export function PartTypeList(params) {
    return fetch.post('DB/PartTypeList', params);
}
// 配件类别添加
export function AddPartType(params) {
    return fetch.post('DB/AddPartType', params);
}
// 配件类别编辑
export function ModifyPartType(params) {
    return fetch.post('DB/ModifyPartType', params);
}
// 配件类别删除
export function DeletePartType(params) {
    return fetch.post('DB/DeletePartType', params);
}
// 原料列表
export function MateialList(params) {
    return fetch.post('DB/MateialList', params);
}
// 原材料添加
export function AddMateial(params) {
    return fetch.post('DB/AddMateial', params);
}
// 原材料编辑
export function ModifyMateial(params) {
    return fetch.post('DB/ModifyMateial', params);
}
// 原材料删除
export function DeleteMateial(params) {
    return fetch.post('DB/DeleteMateial', params);
}
// 原料类别列表
export function MateialTypeList(params) {
    return fetch.post('DB/MateialTypeList', params);
}
// 原材料类别添加
export function AddMateialType(params) {
    return fetch.post('DB/AddMateialType', params);
}
// 原材料类别编辑
export function ModifyMateialType(params) {
    return fetch.post('DB/ModifyMateialType', params);
}
// 原材料类别删除
export function DeleteMateialType(params) {
    return fetch.post('DB/DeleteMateialType', params);
}
// 模具类型列表
export function MoldTypeList(params) {
    return fetch.post('DB/MoldTypeList', params);
}
// 模具类型添加
export function AddMoldType(params) {
    return fetch.post('DB/AddMoldType', params);
}
// 模具类型编辑
export function ModifyMoldType(params) {
    return fetch.post('DB/ModifyMoldType', params);
}
// 模具类型删除
export function DeleteMoldType(params) {
    return fetch.post('DB/DeleteMoldType', params);
}
// 工艺列表
export function CraftList(params) {
    return fetch.post('DB/CraftList', params);
}
// 工艺编辑
export function AddCraft(params) {
    return fetch.post('DB/AddCraft', params);
}
// 工艺编辑
export function ModifyCraft(params) {
    return fetch.post('DB/ModifyCraft', params);
}
// 工艺删除
export function DeleteCraft(params) {
    return fetch.post('DB/DeleteCraft', params);
}
// 工艺类别列表
export function CraftTypeList(params) {
    return fetch.post('DB/CraftTypeList', params);
}
// 工艺类别添加
export function AddCraftType(params) {
    return fetch.post('DB/AddCraftType', params);
}
// 工艺类别编辑
export function ModifyCraftType(params) {
    return fetch.post('DB/ModifyCraftType', params);
}
// 工艺类别删除
export function DeleteCraftType(params) {
    return fetch.post('DB/DeleteCraftType', params);
}
// 工艺流程列表
export function ProcessFlowList(params) {
    return fetch.post('DB/ProcessFlowList', params);
}
// 工艺流程添加
export function AddProcessFlow(params) {
    return fetch.post('DB/AddProcessFlow', params);
}
// 工艺流程编辑
export function ModifyProcessFlow(params) {
    return fetch.post('DB/ModifyProcessFlow', params);
}
// 工艺流程明细
export function ProcessFlowDetialList(params) {
    return fetch.post('DB/ProcessFlowDetialList', params);
}
// 工艺流程删除
export function DeleteProcessFlow(params) {
    return fetch.post('DB/DeleteProcessFlow', params);
}

// 设备列表
export function DeviceList(params) {
    return fetch.post('DB/DeviceList', params);
}

// 工件列表
export function BomTypeList(params) {
    return fetch.post('DB/BomTypeList', params);
}
// 工件添加
export function AddBomType(params) {
    return fetch.post('DB/AddBomType', params);
}
// 工件编辑
export function ModifyBomType(params) {
    return fetch.post('DB/ModifyBomType', params);
}
// 工件删除
export function DeleteBomType(params) {
    return fetch.post('DB/DeleteBomType', params);
}







