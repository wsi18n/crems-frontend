import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import history from '../../history'
import { connect } from 'react-redux';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class DefaultSider extends Component {
    state = {
        collapsed: false,
        menu:[
         // {url:'/home',name:'概览',icon:'home'},
          {
            name:'工单管理',
            key:'ticketSystem',
            icon:'table',
            children:[
              {url: '/CreateTicketIndex', name: '新建工单'},
              {url: '/MyTicket', name: '我创建的'},
              {url: '/Todo', name: '我的待办'},
              {url: '/Related', name: '我相关的'},
              {url: '/AllTicket', name: '所有工单', admin_only: true,},
            ]
          }, {
            name: '机房管理',
            key: 'ComputerRoomManagement',
            icon: 'hdd',
            children: [
              {url: '/ComputerRoomList', name: '机房列表'},
              {url: '/CabinetList', name: '机柜列表'},
              {url: '/CabinetUnitList', name: '机位列表'},
              {url: '/MachineList', name: '设备列表'},
            ]
          }, {
            name: '系统设置',
            key: 'SystemConfigure',
            icon: 'setting',
            admin_only: true,
            children: [
              {url: '/UserList', name: '用户列表'},
              {url: '/DepartmentList', name: '单位列表'},
            ]
          },
        ]
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed})
    }

    componentDidMount () {
        //当前url是否只有管理员能访问
        let isCurrentPathAdminOnly = ()=>{

            let _isCurrentPathAdminOnly = (menu) => {
                for (let item of menu) {
                    if (item.url == history.location.pathname) {
                        return {
                          is_match: true,
                          admin_only: item.admin_only,
                        }
                    }
                    else if (item.children) {
                        let children_res = _isCurrentPathAdminOnly(item.children)
                        if (children_res.is_match) {
                            return{
                              is_match: true,
                              admin_only: children_res.admin_only || item.admin_only
                            }

                        }
                    }
                }
                return {
                  is_match: false
                }
            }

            return _isCurrentPathAdminOnly(this.state.menu).admin_only
        }

        // permission access control
        if(!this.props.user.is_superuser && isCurrentPathAdminOnly()){
            history.push('/')
        }

    }
    render() {
        return (
            <Sider collapsible collapsed={ this.state.collapsed } onCollapse={this.onCollapse}>
                <div className="logo" style={{ background: 'rgba(255, 255, 255, 0.2)', margin: '16px',
                    height: '32px', color: '#FFF', textAlign: 'center'}}>
                    CREMS
                </div>
                <Menu
                  theme="dark"
                  defaultOpenKeys={this.state.menu.map((item) => item.key)}
                  defaultSelectedKeys={[history.location.pathname]}
                  mode="inline"
                >
                  {
                    this.state.menu.map(row => {
                      if (row.admin_only && !this.props.user.is_superuser) {
                        return null
                      }
                      if (row.url) {
                        return (
                          <Menu.Item key={row.url}>
                            <NavLink to={row.url} >
                              <Icon type={row.icon}/>
                              <span>{row.name}</span>
                            </NavLink>
                          </Menu.Item>
                        )
                      }
                      else if(row.children){
                        return (
                          <SubMenu
                            key={row.key}
                            title={<span><Icon type={row.icon}/><span>{row.name}</span></span>}
                          >
                            {
                              row.children.map(child => {
                                if (child.admin_only && !this.props.user.is_superuser) {
                                  return null
                                }
                                return (
                                  <Menu.Item key={child.url}>
                                    <NavLink to={child.url}>{child.name}</NavLink>
                                  </Menu.Item>
                                )
                              })
                            }
                          </SubMenu>
                        )
                      }
                    })
                  }
                </Menu>
            </Sider>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(DefaultSider);

