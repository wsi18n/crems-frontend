import React, {Component} from 'react'
import {Table, Row, Col, Button, Modal, Form, Input, Card, message} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import {DepartmentSelect} from '../../components/select'
import {connect} from 'react-redux'

class DepartmentDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.department_id = props.match.params.departmentID

    this.get_url = BASE_URL + '/api/users/department/'
    this.post_url = BASE_URL + '/api/users/update-department/'
    window.DepartmentDetail = this
  }

  componentDidMount () {
    if (this.department_id) {//有id为编辑
      axios.get(this.get_url, {params: {department_id: this.department_id}})
        .then((response) => {
          console.log(response)
          if (response.data) {
            let data = response.data[0]
            data.department_id = data.id
            data.parent_id = data.parent ? '' + data.parent : null
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
      this.post_url = BASE_URL + '/api/users/department/'
    }

  }

  antdInputChange = (name, new_value) => {
    this.setState({[name]: new_value})
  }
  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
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

  render () {
    return (
      <div>
        <Card
          title={
            this.department_id ?
              (<div><h2>单位: {this.state.name}</h2><h3> 基本信息</h3></div>) :
              (<h2>单位新增</h2>)
          }
        >
          <Row type="flex" justify="center" gutter={16}>
            <Col xxl={8} xl={10} lg={12} md={16}>
              <Form>
                <Form.Item
                  label="名称"
                >
                  <Input
                    name="name"
                    defaultValue={this.state.name}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>

                <Form.Item
                  label="上级部门"
                >
                  <DepartmentSelect
                    excludeOptionValues={[this.state.department_id]}
                    value={this.state.parent_id}
                    onChange={v => this.antdInputChange('parent_id', v)}
                  >
                    <DepartmentSelect.Option value=""> - </DepartmentSelect.Option>
                  </DepartmentSelect>
                </Form.Item>
                {this.props.user.is_superuser ?
                  <Button type="primary" onClick={this.handleSubmit}>保存</Button>
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

export default connect(mapStateToProps)(DepartmentDetail)
