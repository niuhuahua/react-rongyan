import * as index from './action-type'
import getQuery from '../../api/getQuery'
// import API from '../../api/api';
/**
 * 
 */
export const getbannerImg = ()=>{
    return async dispatch  =>{
        try{
            let imgList = await getQuery.getBannerImg() 
            dispatch({
                type:index.GETBANNERIMG,
                data:imgList
            })
        }catch(err){
            console.error(err)
        }
    }
}

export const getProList = (projectType="",projectStatus="",pageNum="1",pageSize="5")=>{
    console.log('getProList Action')
    return async dispatch =>{
        try{
            let proList = await getQuery.getProList(projectType,projectStatus,pageNum,pageSize)
            dispatch({
                type:index.GETINDEXPRO,
                data : proList
            })
        }catch(err){
            console.error(err)
        }
    }
}