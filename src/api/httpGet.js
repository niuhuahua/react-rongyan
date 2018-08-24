import axios from 'axios'
export default function httpGet(opt){
    let data ={"Head":{"channel":"01","version":"1.0","service":"dataQuery","sid":"","cReqTime":"2018-08-08 09:16:22.392"},"Body":{"param":{"queryId":" "}}}
    if(opt){
       if(opt.Head){
        if(opt.Head.service){
            opt.Head.channel = "01";
            opt.Head.version = "1.0";
            opt.Head.sid = '';
            opt.Head.cReqTime =  '2018-08-14 16:17:01.935';
        }
       }
    }
    let date = {...data,...opt}  
    console.log('opt--->',opt)       
         return  new Promise( (resolve,reject)=>{
             axios.get(`/webryjf?dataMsg=${JSON.stringify(date)}`).then(res=>{
                   console.log("请求返回结果---->",res)
                    resolve(res);
                }).catch(error=>{
                    reject(error);
              })  
         })
                

}