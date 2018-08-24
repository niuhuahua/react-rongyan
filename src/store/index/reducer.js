import * as index from './action-type'
let defaultState = {
    imgList:[],
    proList:[]
}
export const indexData = (state=defaultState,action)=>{
    switch(action.type){
        case index.GETBANNERIMG:
            return {...state,...{imgList:action.data}}
        case index.GETINDEXPRO:
            console.log('pro---->',{...state,...{proList:action.data}})
            return {...state,...{proList:action.data}}
        default:
            return state
    }
}

