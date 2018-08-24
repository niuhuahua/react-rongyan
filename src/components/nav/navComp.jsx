import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { NavBar, Popover,Icon } from 'antd-mobile';
import './navComp.less'
const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
export default class navCompon extends Component {
    constructor(props){
        super(props)
        console.log('navCompon--------adasda')
        this.state = {
            visible: true,
            selected: ''
        }
    }
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
          visible: false,
          selected: opt.props.value,
        });
      };
      handleVisibleChange = (visible) => {
        this.setState({
          visible,
        });
      };
    render(){
        return(
            <div className="navbarDiv">
                <NavBar
                      mode="light"
                      rightContent={
                        <Popover mask
                          overlayClassName="fortest"
                          overlayStyle={{ color: 'currentColor' }}
                          visible={this.state.visible}
                          overlay={[
                            (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">首页</Item>),
                            (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>我的</Item>),
                          ]}
                          align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                          }}
                          onVisibleChange={this.handleVisibleChange}
                          onSelect={this.onSelect}
                        >
                          <div style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          >
                            <Icon type="ellipsis" />
                          </div>
                        </Popover>
                      }
                    >
                     <img style={{ width: '1.53rem',height: '.44rem'}} src={require('../../assests/images/logo_top.png')} alt=""/>
                    </NavBar>
            </div>
        )
    }
}
