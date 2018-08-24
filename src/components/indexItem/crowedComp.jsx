import React,{Component} from 'react'
import PropTypes from 'prop-types'
import './crowedComp.less'
export default class CrowedComp extends Component {
   static propTypes = {
     projectName:PropTypes.string.isRequired,
     projectStatusName:PropTypes.string.isRequired,
     projectTypeName:PropTypes.string.isRequired,
     recommendGrade:PropTypes.string,
     realRaiseProgress:PropTypes.string,
     projectId:PropTypes.string
   }
    render(){
        return(
         <div className="itemPro">
             <a href="/prodetail">
               <img  src={require('../../assests/images/zhanweitu1.png')}/>
                <span className="xuanfu">{this.props.projectTypeName}</span>
                <span className="xuanfu xuanfuName">{this.props.projectStatusName}</span>
                <p className="title">{this.props.projectName}</p>
                <div className="bottom">
                    <span className="left">进度:：{this.props.projectId}</span>
                    <span className="right">超值档：￥{this.props.recommendGrade}</span>
                </div>
             </a>
         </div>
        )
    }
}