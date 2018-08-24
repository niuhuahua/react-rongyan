import { PullToRefresh,NavBar, Popover,Carousel, WingBlank,ListView ,Icon } from 'antd-mobile';
import React,{Component} from 'react'
import {is,fromJS} from 'immutable'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getbannerImg,getProList} from '../../store/index/action'
import {NavLink,Switch,Route,Redirect} from 'react-router-dom'
import './index.less'
import CrowedComp from '../../components/indexItem/crowedComp'
import NavComp from '../../components/nav/navComp'
let pageIndex = 1;
let projectType="",projectStatus="",pageNum=pageIndex,pageSize="5";
class IndexPage extends Component{
    static proptypes = {
        getbannerImg:PropTypes.func.isRequired
    }
    componentWillMount(){
        console.log('12312312acomponentWillMount')
        if(!this.props.indexData.imgList.length){
            this.props.getbannerImg()
        }
        if(!this.props.indexData.proList.length){
            this.props.getProList(projectType,projectStatus,pageNum,pageSize)
             setTimeout(()=>{
                this.rData = this.props.indexData.proList
                console.log('this.rData--->',this.rData)
                this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.indexData.proList),
                isLoading: false,
                refreshing: false,
              });
             },2000)
            
        }
    }
    //构造
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
        console.log('dataSource--->',this.props.match.path)
        this.state = {
          dataSource,
          refreshing: true,
          isLoading: true,
          height: document.documentElement.clientHeight,
          useBodyScroll: false
        };

      }
    componentDidMount(){
        console.log("componentDidMount")
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
      }
      /**
       * 上拉刷新
       */
      onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        this.props.getProList(projectType,projectStatus,"1",pageSize) 
        var rDta = this.props.indexData.proList;
        setTimeout(() => {
          // console.log('rDta--->',rDta)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rDta),
            refreshing: false,
            isLoading: false,
          });
        }, 600);
      };

     
      /**
       * 下拉加载
       */
      onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        this.props.getProList(projectType,projectStatus,++pageIndex,pageSize) 

        setTimeout(() => {
            // this.rData = { ...this.rData,...this.props.indexData.proList };
            for(var i=0;i<this.props.indexData.proList.length;i++){
                this.rData.push(this.props.indexData.proList[i]);
             }	
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 2000);
      }
    
   //projectStatus
  //  dataMsg: {"Head":{"channel":"01","version":"1.0","service":"crowdBaseService","method":"crowdIndexList","cReqTime":"2018-08-23 09:51:43.769"},"Body":{"projectType":"","projectStatus":"2","pageNum":"1","pageSize":"5"}}
  //  dataMsg: {"Head":{"channel":"01","version":"1.0","service":"crowdBaseService","method":"crowdIndexList","cReqTime":"2018-08-23 09:51:08.322"},"Body":{"projectType":"","projectStatus":"3","pageNum":"1","pageSize":"5"}}
  //  dataMsg: {"Head":{"channel":"01","version":"1.0","service":"dataQuery","cReqTime":"2018-08-23 09:50:21.531"},"Body":{"pageInfo":{"pageNum":"1"},"param":{"queryId":"getIndexCrowdList","projectType":"","projectStatus":"4","projectDomain":""}}}
    render(){
        const separator = (sectionID, rowID) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
              }}
            />
          );
          const row = (rowData, sectionID, rowID) => {
            return (
                     <div style={{padding:'30'}}>
                           <CrowedComp key={rowID}  realRaiseProgress = {rowData.realRaiseProgress} 
                            projectTypeName= {rowData.projectTypeName}
                            projectName= {rowData.projectName} projectStatusName={rowData.projectStatusName} 
                            recommendGrade= {rowData.recommendGrade} projectId={rowData.projectId}/>
                     </div>
                  
            );
          };
        return(
                <div className="swiperTop" >
                  <NavComp />
                <div style={{marginTop:'1rem'}}>
                  <WingBlank>
                        <Carousel
                        autoplay={true}
                        autoplayInterval="1000"
                        infinite={true}
                        >
                          { this.props.indexData.imgList.map((item,index) => (
                              <a
                              key={index}
                              href="http://www.alipay.com"
                              style={{ display: 'inline-block', width: '100%', height: '4.6rem' }}
                              >
                              <img
                                  
                                  src={'http://pic.rongyanjinfu.cc/'+item.imageId}
                                  alt=""
                                  style={{ width: '100%', verticalAlign: 'top', height: '4.6rem' }}
                                  onLoad={() => {
                                  // fire window resize event to change height
                                  window.dispatchEvent(new Event('resize'));
                                  }}
                              />
                              </a>
                          ))}
                        </Carousel>
                    </WingBlank>
                  </div>
                 <div className="tab">
                    <NavLink to={`${this.props.match.path}/all`} className="nav-link">全部</NavLink>
                    <NavLink to={`${this.props.match.path}/preview`} className="nav-link">预告中</NavLink>
                    <NavLink to={`${this.props.match.path}/raise`} className="nav-link">募集中</NavLink> 
                    <NavLink to={`${this.props.match.path}/complete`} className="nav-link">已完成</NavLink>
                 </div>
                 
                 <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : '没有更多了'}
                    </div>)}
                    renderSeparator={separator} //加间距
                    renderRow={row}
                    className="am-list"
                    pageSize={5}
                    useBodyScroll
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                      />}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
  
               </div>
               
            //  </div>
          
        )
    }


}
export default connect(state=>({
    indexData:state.indexData
}),{
   getbannerImg,
   getProList
})(IndexPage);