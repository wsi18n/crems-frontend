import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
        <NavLink to="/logout">注销</NavLink>
    </Menu.Item>
  </Menu>
);


class DefaultHeader extends Component {
    render() {
        return (
            <Header style={{ background: '#000', padding: 0 }} >
              <span style={{ paddingRight: '40px', float: 'right' }}>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">
                        {this.props.user.username} <Icon type="user" /> <Icon type="down" />
                    </a>
                </Dropdown>

              </span>
            </Header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(DefaultHeader);
