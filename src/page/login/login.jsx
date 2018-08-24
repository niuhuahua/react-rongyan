import React,{Component} from 'react'
import httpGet from '../../api/httpGet'
import './login.less'
class LoginPage extends Component {
    /**
     * type 当前名字
     * event 事件对象
     */
    constructor(props){
        super(props)
        this.state = {
            account:null,
            pwd:null,
            imgCode:''
        }
    }
    handleInput = (type,event) => {
        //加上验证
        // if(event.target.value){

        // }
        var newState = {}
        newState[type] = event.target.value
        this.setState(newState)
        console.log(this.state)
    }
     toLogin = async ()=>{
        let baseData = { "Head": {"service": "userLogin"},"Body":{"userLogin":{"loginId":this.state.account,"imageCode":this.state.imgCode,"pwd":this.state.pwd} }} 
        let res =  await httpGet(baseData)
        console.log(res)
    }
    render(){
        return(
            <div>
                <div className="logo">
                    <img className="logoImg" src={require('../../assests/images/logo.png')} alt="logo" />
                </div>
                    <div className="inputLable" >
                        <img className="imgIcon" src={'http://pic.rongyanjinfu.cc//static/rywc/v1.0/images/m/login/sj.png'} alt="phoneImg" />
                        <input type="number" className="inputLogin"  placeholder="请输入手机号码" name="phone" id="phone" onChange={this.handleInput.bind(this,'account')}/>
                    </div>
                    <div className="inputLable" >
                        <img className="imgIcon" src={'http://pic.rongyanjinfu.cc//static/rywc/v1.0/images/m/login/mima.png'} alt="phoneImg" />
                        <input className="inputLogin"  placeholder="请输入密码" name="pwd" id="pwd" type="password" onChange={this.handleInput.bind(this,'pwd')}/>
                    </div>
                 <div style={{textAlign:'center',margin:'0 auto'}}>
                    <button className="loginbtn" onClick={this.toLogin}>登录</button>
                 </div>
            </div>
        )
    }
}

export default LoginPage