import httppGet from  './httpGet'
import Server from './server';
import httpGet from './httpGet';
class getQuery extends Server {
  /**
   * 获取banner图片
   */
    async getBannerImg (){
       try{
           let data = {"Body":{"param":{"queryId":"getBannerImgList"}}}
           let res =  await httppGet(data)
            if(res.data.Body){
              return res.data.Body.data
            }else{
              console.log("wqeqwe")
            }
       }catch(err){
         console.error('err---->',err)
       }
    }

    async getProList(projectType="",projectStatus="",pageNum="1",pageSize="5"){
      try{
        let data = {"Head":{"service":"crowdBaseService","method":"crowdIndexList"},"Body":{"projectType":projectType,"projectStatus":projectStatus,"pageNum":pageNum,"pageSize":pageSize}}
        let res = await httpGet(data)
        if(res.data.Body){
          return res.data.Body.data
        }else{
          console.log('产品列表返回的Body空')
        }
      }catch(err){
        console.err('获取产品列表失败---->',err)
      }
    }

}
export default  new getQuery()