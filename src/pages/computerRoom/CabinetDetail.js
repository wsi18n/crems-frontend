import React, {Component} from 'react'
import {Table, Row, Col, Button, Modal, Form, Input, InputNumber, Select, Card, message, Icon} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import {DepartmentSelect, ComputerRoomSelect} from '../../components/select'
import {connect} from 'react-redux'

const Option = Select.Option

////////////////////////////////////////
//
//  Cabinet Chart
//
////////////////////////////////////////
class CabinetChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      unit_list: [],

    }
    this.cols = [
      {
        title: '机柜',
        dataIndex: 'name',
        render: (content, row) => <Link to={`/CabinetUnit/${row.id}/`}>{row.name}</Link>
      }, {
        title: '设备',
        dataIndex: 'machine_name',
        render: (content, row, index) => {
          return {
            children: <Link to={`/Machine/${row.machine}/`}>{content}</Link>,
            props: {rowSpan: row.row_span},
          }
        }
      }, {
        title: '使用单位',
        dataIndex: 'used_department_name',
        render: (content, row, index) => {
          return {
            children: content,
            props: {rowSpan: row.row_span},
          }
        }
      }, {
        title: '规划单位',
        dataIndex: 'plan_department_name',
      }
    ]
    this.get_url = BASE_URL + '/api/computer-room/cabinet-unit/'
    this.get_params = {cabinet_id: props.cabinet_id}
  }

  componentDidMount () {
    axios.get(this.get_url, {params: this.get_params})
      .then((response) => {
        this.processData(response.data)
        this.setState({unit_list: response.data})

      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          history.push('/login')
        }
        else {
          message.error(`机房信息读取失败(${error.response ? error.response.status : '网络故障'})`)
        }
      })
    /*
    测试数据
    let data = [
      {id: 1, name='D22-1', machine: 1, machine_name: 'A'},
      {id: 2, name='D22-2', machine: 1, machine_name: 'A'},
      {id: 3, name='D22-3', machine: 1, machine_name: 'A'},
      {id: 4, name='D22-4', machine: 2, machine_name: 'B'},
      {id: 5, name='D22-5', machine: 3, machine_name: 'C'},
      {id: 6, name='D22-6', machine: 3, machine_name: 'C'},
    ]

    this.processData(data)
    this.setState({unit_list: data})
    */
  }

  /////////
  //
  //  计算设备高度
  //
  /////////
  processData = (data) => {
    data.reverse() // 倒序
    for (let i = 0, j = 1; j < data.length; i = j++) {
      for (; j < data.length && data[j].machine === data[i].machine; j++) {
        data[j].row_span = 0
      }
      data[i].row_span = j - i
    }

  }
  /////////
  //
  //  合并单元格
  //
  /////////
  mergeTd = (content, row, index) => {
    return {
      children: <Link to={`/Machine/${row.machine}/`}>{content}</Link>,
      props: {rowSpan: row.row_span},
    }
  }

  render () {
    return (
      <Table key={'CabinetChart' + this.props.cabinet_id}
             rowKey="id"
             columns={this.cols}
             dataSource={this.state.unit_list}
             bordered
             pagination={false}
             size="small"
      />
    )
  }
}

////////////////////////////////////////
//
//
//
////////////////////////////////////////
class CabinetDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cabinet_row: '',
      cabinet_col: '',
    }
    this.cabinet_id = props.match.params.CabinetID

    this.get_url = BASE_URL + '/api/computer-room/cabinet/'
    this.post_url = BASE_URL + '/api/computer-room/cabinet/' // new
    window.CabinetDetail = this
  }

  componentDidMount () {
    if (this.cabinet_id) {//有id为编辑
      axios.get(this.get_url, {params: {cabinet_id: this.cabinet_id}})
        .then((response) => {
          let data = response.data[0]
          data.cabinet_id = data.id
          data.computer_room_id = data.computer_room ? '' + data.computer_room : null
          data.plan_department_id = data.plan_department ? '' + data.plan_department : null
          this.setState(data)

          this.post_url = BASE_URL + '/api/computer-room/update-cabinet/'

        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            history.push('/login')
          }
          else {
            message.error(`机柜信息读取失败(${error.response ? error.response.status : '网络故障'})`)
          }
        })

    }
    else {//无id为新建
      this.post_url = BASE_URL + '/api/computer-room/cabinet/'
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
    //default name
    this.state.name = this.state.name || this.state.cabinet_row + '-' + this.state.cabinet_col

    axios.post(this.post_url, this.state)
      .then((resp) => {
        if (resp.data.success) {
          message.success(resp.data.msg)

        } else {
          message.error(resp.data.msg)
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          history.push('/login')
        }
        else {
          message.error(`保存失败(${error.response ? error.response.status : '网络故障'})`)
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
        md: {
          span: 24,
          offset: 0,
        },
        lg: {
          span: 18,
          offset: 6
        },
      },
    }
    const {getFieldDecorator} = this.props.form
    return (

      <div>
        <Card
          title={
            this.cabinet_id ?
              (<div><h2>机柜: {this.state.name}</h2><h3> 基本信息</h3></div>) :
              (<h2>机柜新增</h2>)
          }
        >
          <Row type="flex" justify="center" gutter={16}>
            <Col xxl={8} xl={10} lg={12} md={16} xs={24}>
              <Form>
                <Form.Item
                  {...formItemLayout}
                  label="名称"
                >
                  <Input
                    name="name"
                    value={this.state.name}
                    onChange={this.handleOnChange}
                    placeholder={'默认:' + this.state.cabinet_row + '-' + this.state.cabinet_col}
                  />
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="行"
                >
                  {getFieldDecorator('cabinet_row', {
                    initialValue: this.state.cabinet_row,
                    rules: [{
                      required: true,
                      message: '必填项',
                    }],
                  })(
                    <Input
                      name="cabinet_row"
                      onChange={this.handleOnChange}
                      placeholder='A'
                    />
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="列"
                >
                  {getFieldDecorator('cabinet_col', {
                    initialValue: this.state.cabinet_col,
                    rules: [{
                      required: true,
                      message: '必填项',
                    }],
                  })(
                    <Input
                      name="cabinet_col"
                      onChange={this.handleOnChange}
                      placeholder='01'

                    />
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  required
                  label="总容量"
                >
                  <InputNumber
                    min={this.state.used_unit_number || 1}
                    value={this.state.total_unit_number || 1}
                    onChange={v => this.antdInputChange('total_unit_number', v)}
                  />
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="已用容量"
                >
                  <InputNumber
                    value={this.state.used_unit_number || 0}
                    readOnly
                  />
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
                  label="所属机房"
                >
                  {getFieldDecorator('computer_room_id', {
                    initialValue: this.state.computer_room_id,
                    rules: [{
                      required: true,
                      message: '请选择机房',
                    }],
                  })(
                    <ComputerRoomSelect
                      onChange={(value) => this.antdInputChange('computer_room_id', value)}
                      value={this.state.computer_room_id}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="规划单位"
                >
                  {getFieldDecorator('plan_department_id', {
                    initialValue: this.state.plan_department_id,
                    rules: [{
                      required: true,
                      message: '请选择单位',
                    }],
                  })(
                    <DepartmentSelect
                      onChange={v => this.antdInputChange('plan_department_id', v)}
                      value={this.state.plan_department_id}
                    >
                      <DepartmentSelect.Option value=""> - </DepartmentSelect.Option>
                    </DepartmentSelect>
                  )}
                </Form.Item>
                {this.props.user.is_superuser ?
                  <Form.Item
                    {...tailFormItemLayout}>
                    <Button type="primary" onClick={this.handleSubmit}> 保存</Button>
                  </Form.Item>
                  : ''}
              </Form>
            </Col></Row>
        </Card>
        {this.cabinet_id ?
          <Card title={(<h3>柜内设备</h3>)}>
            <Row type="flex" justify="center" gutter={16}>
              <Col xl={16} xs={24}>
                <CabinetChart cabinet_id={this.cabinet_id}/>
              </Col>
            </Row>
          </Card>
          : ''}
      </div>
    )

  }
}

const _CabinetDetail = Form.create()(CabinetDetail)

function mapStateToProps (state) {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(_CabinetDetail)
