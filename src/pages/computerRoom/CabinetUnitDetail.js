import React, {Component} from 'react'
import {Table, Row, Col, Button, Modal, Form, Input, Card, message} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import {DepartmentSelect} from '../../components/select'
import {connect} from 'react-redux'

class CabinetUnitDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.cabinet_unit_id = props.match.params.CabinetUnitID
    this.get_url = BASE_URL + '/api/computer-room/cabinet-unit/'
    this.post_url = BASE_URL + '/api/computer-room/update-cabinet-unit/'
    window.page = this
  }

  componentDidMount () {
    if (this.cabinet_unit_id) {//有id为编辑
      axios.get(this.get_url, {params: {cabinet_unit_id: this.cabinet_unit_id}})
        .then((response) => {
          if (response.data) {
            let data = response.data[0]
            data = {
              cabinet_unit_id: data.id,
              name: data.name,
              machine_id: data.machine,
              cabinet_id: data.cabinet,
              machine_name: data.machine_name,
              cabinet_name: data.cabinet_name,
              plan_department_id: data.plan_department ? '' + data.plan_department : null,
              used_department_id: data.used_department ? '' + data.used_department : null,
            }
            this.setState(data)
          }
          else {
            message.error(`单位信息不存在`)
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            history.push('/login')
          }
          else {
            message.error(`(网络故障${error.response ? error.response.status : ''})`)
          }
        })
    }
  }

  antdInputChange = (name, new_value) => {
    this.setState({[name]: new_value})
  }
  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value})
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
  handleSubmit = e => {
    if (!this.formCheck()) {
      return
    }
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
            (<div><h2>机位: {this.state.name || this.state.id}</h2><h3> 基本信息</h3></div>)
          }
        >
          <Row type="flex" justify="center">
            <Col xxl={8} xl={10} lg={12} md={16} xs={24}>
              <Form>
                <Form.Item {...formItemLayout} label="标识">
                  <Input
                    name="name"
                    value={this.state.name}
                    readOnly
                  />
                </Form.Item>

                <Form.Item {...formItemLayout} label="所在机柜">
                  <Input
                    name="cabinet_name"
                    value={this.state.cabinet_name}
                    readOnly
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="对应设备">
                  <Input
                    name="machine_name"
                    value={this.state.machine_name}
                    readOnly
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="规划单位">
                  {getFieldDecorator('plan_department_id', {
                    initialValue: this.state.plan_department_id,
                    rules: [{
                      required: true,
                      message: '请选择单位',
                    }],
                  })(
                    <DepartmentSelect
                      onChange={v => this.antdInputChange('plan_department_id', v)}
                    />)}
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

const _CabinetUnitDetail = Form.create()(CabinetUnitDetail)

export default connect(mapStateToProps)(_CabinetUnitDetail)
