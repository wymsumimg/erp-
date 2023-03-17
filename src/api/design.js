import fetch from './request'
// 设计
// 设计单列表
export function DesignList(params) {
    return fetch.post('Business/DesignList', params);
}
// 料号列表
export function BomList(params) {
    return fetch.post('Business/BomList', params);
}
// 料号添加
export function AddBom(params) {
    return fetch.post('Business/AddBom', params);
}
// 料号编辑
export function ModifyBom(params) {
    return fetch.post('Business/ModifyBom', params);
}
// 料号删除
export function DeleteBom(params) {
    return fetch.post('Business/DeleteBom', params);
}
// 原材料列表
export function BomMaterialList(params) {
    return fetch.post('Business/BomMaterialList', params);
}
// 原材料添加
export function AddBomMaterial(params) {
    return fetch.post('Business/AddBomMaterial', params);
}
// 原材料编辑
export function ModifyBomMaterial(params) {
    return fetch.post('Business/ModifyBomMaterial', params);
}
// 原材料删除
export function DeleteBomMaterial(params) {
    return fetch.post('Business/DeleteBomMaterial', params);
}
// 配件列表
export function BomPartList(params) {
    return fetch.post('Business/BomPartList', params);
}
// 配件添加
export function AddBomPart(params) {
    return fetch.post('Business/AddBomPart', params);
}
// 配件编辑
export function ModifyBomPart(params) {
    return fetch.post('Business/ModifyBomPart', params);
}
// 配件删除
export function DeleteBomPart(params) {
    return fetch.post('Business/DeleteBomPart', params);
}
// 上传设计图--第二步
export function AddDesignPic(params) {
    return fetch.post('Business/AddDesignPic', params);
}

// 上传图片
export function AddDesign(params) {
    return fetch.post('Business/AddDesign', params);
}

// 设计图记录
export function DesignPicList(params) {
    return fetch.post('Business/DesignPicList', params);
}

// 工程文件添加
export function AddDesignFile(params) {
    return fetch.post('Business/AddDesignFile', params);
}
// 工程文件列表添加
export function DesignFileList(params) {
    return fetch.post('Business/DesignFileList', params);
}

// 工程文件删除
export function DeleteDesignFile(params) {
    return fetch.post('Business/DeleteDesignFile', params);
}



// BOM明细
export function BomDetial(params) {
    return fetch.post('Business/BomDetial', params);
}

export function AddBomMaterial_Excel(params) {
    return fetch.post('Business/AddBomMaterial_Excel', params);
}


export function AddDesignTask(params) {
    return fetch.post('Business/AddDesignTask', params);
}

export function DeleteDesignTask(params) {
    return fetch.post('Business/DeleteDesignTask', params);
}




