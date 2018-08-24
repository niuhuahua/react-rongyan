import React,{Component} from 'react'
import { PullToRefresh,NavBar,ListView } from 'antd-mobile'
import NavComp from '../../components/nav/navComp'
import {getProList} from '../../store/index/action'
import  {fromJS,is } from 'immutable'
import CrowedComp from '../../components/indexItem/crowedComp'
import {connect} from 'react-redux'
let pageIndex = 1;
let projectType="",projectStatus="",pageNum=pageIndex,pageSize="5";
class proList extends Component {
    constructor(props){
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
          this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
          };
    }
      //projectStatus
  //  dataMsg: {"Head":{"channel":"01","version":"1.0","service":"crowdBaseService","method":"crowdIndexList","cReqTime":"2018-08-23 09:51:43.769"},"Body":{"projectType":"","projectStatus":"2","pageNum":"1","pageSize":"5"}}
  //  dataMsg: {"Head":{"channel":"01","version":"1.0","service":"crowdBaseService","method":"crowdIndexList","cReqTime":"2018-08-23 09:51:08.322"},"Body":{"projectType":"","projectStatus":"3","pageNum":"1","pageSize":"5"}}
  //  dataMsg: {"Head":{"channel":"01","version":"1.0","service":"dataQuery","cReqTime":"2018-08-23 09:50:21.531"},"Body":{"pageInfo":{"pageNum":"1"},"param":{"queryId":"getIndexCrowdList","projectType":"","projectStatus":"4","projectDomain":""}}}
    componentWillMount(){
        let type = this.props.location.pathname.split('/')[2];
        switch(type){
            case 'all':
                projectStatus = ''
                break;
            case 'preview':
                projectStatus = '2'
                break;
            case 'raise':
                projectStatus = '3'
                break;
            case 'complete':
                projectType = '4'
                break;
        }
        if(!this.props.indexData.proList.length){
            if(projectStatus=="4"){
                return;
            }
            this.props.getProList(projectType,projectStatus,pageNum,pageSize)
            setTimeout(()=>{
                this.rData = this.props.indexData.proList
                this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.indexData.proList),
                isLoading: false,
                refreshing: false,
              });
             },1000)
        }
    }
    shouldComponentUpdate(nextProp,nextState){
        return !is(fromJS(this.props),fromJS(nextProp)) || !is(fromJS(this.state),fromJS(nextState))
    }
    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        this.props.getProList(projectType,projectStatus,"1",pageSize) 
        var rDta = this.props.indexData.proList;
        setTimeout(() => {
          console.log('rDta--->',rDta)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rDta),
            refreshing: false,
            isLoading: false,
          });
        }, 1000);
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
        return (
            <div>
                <NavComp></NavComp>
               <div style={{marginTop:'1rem'}}>
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
            </div>
        )
    }
}

export default connect(state=>({indexData:state.indexData }),{getProList})(proList)