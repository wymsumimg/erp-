import domainsFuc from './domains';
import originAxios from 'axios';
import { TokenKeys } from '@/utils/variable';
// import Qs from "qs"
let setAxios = originAxios.create({
    baseURL: domainsFuc(TokenKeys.PRODUCT_ENV).domain,
    timeout: 20000 // request timeout
    // transformRequest: [
    //   function(data) {
    //     return Qs.stringify(data);
    //   }
    // ],
    // headers: { "X-Requested-With": "XMLHttpRequest" }
});
export default setAxios;
