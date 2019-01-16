import React, {Component} from 'react'
import {Table, Row, Col, Button, Modal, Form, Input, InputNumber, Card, message, Select} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import {DepartmentSelect, ComputerRoomSelect, CabinetSelect, CabinetUnitSelect} from '../../components/select'
import {connect} from 'react-redux'

class MachineDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.machine_id = props.match.params.MachineID
    this.get_url = BASE_URL + '/api/equipment/'
    this.post_url = BASE_URL + '/api/equipment/update-machine/'
  }

  componentDidMount () {
    if (this.machine_id) {//有id为编辑
      axios.get(this.get_url, {params: {machine_id: this.machine_id}})
        .then((response) => {
          console.log(response)
          if (response.data) {
            let data = response.data[0]
            data = {
              ...data,
              machine_id: data.id,
              department_id: data.department ? data.department + '' : null,
              computer_room_id: data.computer_room ? data.computer_room.id + '' : null,
              cabinet_id: data.cabinet ? data.cabinet.id + '' : null,
              cabinet_unit_ids: data.cabinet_units ? data.cabinet_units.map((item) => item.id + '') : [],
            }
            this.setState(data)
          }
          else {
            message.error(`数据不存在`)
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            history.push('/login')
          }
          else {
            message.error(`数据读取失败(网络故障${error.response ? error.response.status : ''})`)
          }
        })
    }
    else {//无id为新建
      this.post_url = BASE_URL + '/api/equipment/'
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
        <Card title={
          this.machine_id ?
            (<div><h2>设备: {this.state.name}</h2><h3> 基本信息</h3></div>) :
            (<h2>设备新增</h2>)
        }>
          <Row type="flex" justify="center">
            <Col xxl={8} xl={10} lg={12} md={16} xs={24}>
              <Form>
                <Form.Item
                  {...formItemLayout}
                  label="设备名"
                >
                  {getFieldDecorator('name', {
                    initialValue: this.state.name,
                    rules: [{
                      required: true,
                      message: '必填项',
                    }],
                  })(
                    <Input
                      name="name"
                      onChange={this.handleOnChange}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="S/N"
                >
                  {getFieldDecorator('equip_sn', {
                    initialValue: this.state.equip_sn,
                    rules: [{
                      required: true,
                      message: '必填项',
                    }],
                  })(
                    <Input
                      name="equip_sn"
                      onChange={this.handleOnChange}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="描述"
                >
                  <Input
                    name="description"
                    defaultValue={this.state.description}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="设备型号"
                >
                  <Input
                    name="equip_version"
                    defaultValue={this.state.equip_version}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="设备类型"
                >
                  <Input
                    name="equip_type"
                    defaultValue={this.state.equip_type}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="所属机房"
                >
                  <ComputerRoomSelect
                    value={this.state.computer_room_id}
                    onChange={v => {
                      this.antdInputChange('computer_room_id', v)
                    }}
                  />

                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="所属机柜"
                >
                  <CabinetSelect
                    filter={this.state.computer_room_id ? {computer_room_id: this.state.computer_room_id} : null}
                    filterRequired
                    value={this.state.cabinet_id}
                    onChange={v => {
                      this.antdInputChange('cabinet_id', v)
                    }}
                  />

                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="所在机位"
                >
                  <CabinetUnitSelect
                    mode="multiple"
                    filter={this.state.cabinet_id ? {cabinet_id: this.state.cabinet_id} : null}
                    filterRequired
                    value={this.state.cabinet_unit_ids}
                    onChange={v => this.antdInputChange('cabinet_unit_ids', v)}
                    optionsRender={(row) =>
                      <Select.Option
                        key={row.id}
                        disabled={row.machine ? row.machine != this.machine_id : false}
                      >
                        {row.name}
                      </Select.Option>
                    }
                  />

                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="归属单位"
                >
                  {getFieldDecorator('department_id', {
                    initialValue: this.state.department_id,
                    rules: [{
                      required: true,
                      message: '必填项',
                    }],
                  })(
                    <DepartmentSelect
                      onChange={v => this.antdInputChange('department_id', v)}
                    />
                  )}
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

const _MachineDetail = Form.create()(MachineDetail)

function mapStateToProps (state) {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(_MachineDetail)
