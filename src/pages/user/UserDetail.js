import React, {Component} from 'react'
import {Table, Row, Col, Button, Modal, Form, Input, Card, message} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import {DepartmentSelect} from '../../components/select'
import {connect} from 'react-redux'

class UserDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.user_id = props.match.params.userID
    this.get_url = BASE_URL + '/api/users/'
    this.post_url = BASE_URL + '/api/users/update-user/'

    window.UserDetail = this
  }

  componentDidMount () {
    if (this.user_id) {//有id为编辑
      axios.get(this.get_url, {params: {user_id: this.user_id}})
        .then((response) => {
          if (response.data) {
            let data = response.data[0]
            data.user_id = data.id
            data.department_id = data.department ? '' + data.department : null
            this.setState(data)
          }
          else {
            message.error(`单位信息不存在`)
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            history.push('/login')
          }
          else {
            message.error(`网络故障(${error.response.status})`)
          }
        })
    }
    else {//无id为新建
      this.post_url = BASE_URL + '/api/users/'
    }

  }

  formCheck = () => {
    let has_error = false
    this.props.form.validateFields(
      (err) => {
        if (err) {
          has_error = true
        }
      },
    )
    return !has_error
  }
  antdInputChange = (name, new_value) => {
    this.setState({[name]: new_value})
  }
  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    if (this.formCheck()) {
      axios.post(this.post_url, this.state)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.msg)
          } else {
            message.error(response.data.msg)
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            history.push('/login')
          }
          else {
            message.error(`网络故障(${error.response.status})`)
          }
        })
    }
  }

  render () {
    const formItemLayout = {
      labelCol: {
        md: {span: 24},
        lg: {span: 6},
      },
      wrapperCol: {
        md: {span: 24},
        lg: {span: 18},
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        md: {span: 24, offset: 0},
        lg: {span: 18, offset: 6},
      },
    }
    const {getFieldDecorator} = this.props.form

    return (
      <div>
        <Card
          title={
            this.user_id ?
              (<div><h2>用户: {this.state.full_name || this.state.username}</h2><h3> 基本信息</h3></div>) :
              (<h2>用户新增</h2>)
          }
        >
          <Row type="flex" justify="center">
            <Col xxl={8} xl={10} lg={12} md={16} xs={24}>
              <Form>
                <Form.Item {...formItemLayout} label="用户名">
                  {getFieldDecorator('username', {
                    initialValue: this.state.username,
                    rules: [{
                      required: true,
                      message: '请输入用户名',
                    }],
                  })(
                    <Input
                      name="username"
                      value={this.state.username}
                      readOnly={this.user_id}
                      onChange={this.user_id ? null : this.handleOnChange}
                      autoComplete="off"
                    />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="密码">
                  {getFieldDecorator('password', {
                    initialValue: this.state.password,
                    rules: [{
                      required: true,
                      message: '请输入密码',
                    }],
                  })(
                    <Input
                      name="password"
                      type="password"
                      autoComplete="off"
                      onChange={this.handleOnChange}

                    />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="重复密码">
                  {getFieldDecorator('re_password', {
                    initialValue: this.state.re_password,
                    rules: [{
                      required: true,
                      /**
                       *  必须要返回callback
                       *  callback('anything') //error
                       *  callback() //ok
                       *  Issues: https://github.com/ant-design/ant-design/issues/5155
                       */
                      validator: (rule, re_pwd, callback) => re_pwd !== this.state.password ? callback('error') : callback(),
                      message: '重复密码不一致',
                    }],
                  })(
                    <Input
                      name="re_password"
                      type="password"
                      autoComplete="off"
                      onChange={this.handleOnChange}

                    />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="姓">
                  {getFieldDecorator('first_name', {
                    initialValue: this.state.first_name,
                    rules: [{
                      required: true,
                      message: '请输入姓',
                    }],
                  })(
                  <Input
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.handleOnChange}
                  />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="名">
                  {getFieldDecorator('last_name', {
                    initialValue: this.state.last_name,
                    rules: [{
                      required: true,
                      message: '请输入名',
                    }],
                  })(
                  <Input
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handleOnChange}
                  />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="电话">
                  <Input
                    name="mobile"
                    value={this.state.mobile}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="邮箱">
                  <Input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>

                <Form.Item {...formItemLayout} label="身份证号">
                  <Input
                    name="ID_number"
                    value={this.state.ID_number}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>

                <Form.Item {...formItemLayout} label="单位" >
                  {getFieldDecorator('department_id', {
                    initialValue: this.state.department_id,
                    rules: [{
                      required: true,
                      message: '请选择单位',
                    }],
                  })(
                  <DepartmentSelect
                    value={this.state.department_id}
                    onChange={v => this.antdInputChange('department_id', v)}
                  >
                    <DepartmentSelect.Option value=""> - </DepartmentSelect.Option>
                  </DepartmentSelect>)}
                </Form.Item>
                {this.props.user.is_superuser ?
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                  </Form.Item>
                  : ''
                }

              </Form>
            </Col>
          </Row>
        </Card>

      </div>
    )

  }
}

function mapStateToProps (state) {
  return {
    user: state.authReducer.user
  }
}

const _UserDetail = Form.create()(UserDetail)

export default connect(mapStateToProps)(_UserDetail)
