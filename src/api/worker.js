import fetch from './request'
// 数据库
//  待加工列表
export function WorkList(params) {
    return fetch.post('Business/WorkList', params);
}

// 添加替换指令记录
export function AddProgramReplace(params) {
    return fetch.post('Business/AddProgramReplace', params);
}
// 替换记录列表
export function ProgramReplaceList(params) {
    return fetch.post('Business/ProgramReplaceList', params);
}
// 开始生产
export function StartWork(params) {
    return fetch.post('Business/StartWork', params);
}
// 结束生产
export function EndWork(params) {
    return fetch.post('Business/EndWork', params);
}