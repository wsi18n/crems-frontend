import React, {Component} from 'react'
import {Card, Table, Row, Col, Button, Modal, Form, Input} from 'antd'
import {Link} from 'react-router-dom'
import {fetchUser, createUser, deleteUser} from '../../actions/user'
import validateInput from '../../utils/validations/createUser'
import classnames from 'classnames'
import {DepartmentSelect} from '../../components/select'
import {UserTable} from '../../components/table'
import { connect } from 'react-redux';

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.filter_params = {}
    window.UserList = this
  }

  antdInputChange = (name, new_value) => {
    //this.setState({[name]: new_value})
    this.filter_params[name] = new_value
  }
  handleOnChange = e => {
    //this.setState({[e.target.name]: e.target.value})
    this.filter_params[e.target.name] = e.target.value
  }

  handleSubmit = () => {
    this.setState({
      filter_params: Object.assign({},this.filter_params)
    })
  }
  render () {
    return (
        <Card
        title={(
          <Row>
            <Col xs={20}><h2>用户列表</h2></Col>
            <Col xs={4} style={{textAlign: 'right'}}>
              {this.props.user.is_superuser ?
                <Link to={`/User/New/`}>
                <Button type="primary">
                  新增
                </Button>
                </Link>
                : ""
              }
            </Col>
          </Row>
        )}
      >
        <Row>

          <Form className="ant-advanced-search-form" layout="inline">
            <Col lg={22}>
              <Form.Item label="用户名">
                <Input name="username__contains" onChange={this.handleOnChange} autoComplete="off"/>
              </Form.Item>
              <Form.Item label="所属部门">
                <DepartmentSelect
                  onChange={v => this.antdInputChange('department_id', v)}
                  style={{width: '120px'}}
                >
                  <DepartmentSelect.Option value=""> - </DepartmentSelect.Option>
                </DepartmentSelect>
              </Form.Item>
            </Col>
            <Col lg={2} style={{textAlign: 'right'}}>
              <Button onClick={this.handleSubmit}>搜索</Button>
            </Col>

          </Form>
        </Row>
        <Row>
          <UserTable filter={this.state.filter_params}/>
        </Row>
      </Card>
    )
  }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}
export default connect(mapStateToProps)(UserList);


