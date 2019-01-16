import React, {Component} from 'react'
import {Card, Table, Row, Col, Button, Modal, Form, Input} from 'antd'
import {Link} from 'react-router-dom'
import {fetchUser, createUser, deleteUser} from '../../actions/user'
import classnames from 'classnames'
import {DepartmentSelect, ComputerRoomSelect, CabinetSelect} from '../../components/select'
import {MachineTable} from '../../components/table'
import {connect} from 'react-redux'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.table_filter = {}
  }

  cascadeHandleChange = (name, value) => { //机房机柜级联框
    this.setState({
      cascade_box_filter: value ? {[name]: value} : null
    })
  }
  antdInputChange = (name, new_value) => {
    //this.setState({[name]: new_value})
    this.table_filter[name] = new_value
  }
  handleOnChange = e => {
    //this.setState({[e.target.name]: e.target.value})
    this.table_filter[e.target.name] = e.target.value
  }

  handleSubmit = () => {
    this.setState({
      table_filter: Object.assign({},this.table_filter)
    })
  }

  render () {
    return (
      <Card
        title={(
          <Row>
            <Col xs={20}><h2>设备列表</h2></Col>
            <Col xs={4} style={{textAlign: 'right'}}>
              {this.props.user.is_superuser ?
                <Link to={`/Machine/New/`}>
                <Button type="primary">
                  新增
                </Button>
                </Link>
                : ''
              }
            </Col>
          </Row>
        )}
      >
        <Row>

          <Form className="ant-advanced-search-form" layout="inline">
            <Col lg={22}>
              <Form.Item label="名称">
                <Input name="name__contains" onChange={this.handleOnChange} autoComplete="off"/>
              </Form.Item>
              <Form.Item label="S/N">
                <Input name="equip_sn__contains" onChange={this.handleOnChange} autoComplete="off"/>
              </Form.Item>
              <Form.Item label="机房">
                <ComputerRoomSelect
                  onChange={v => this.cascadeHandleChange('computer_room_id', v)}
                  style={{width: '120px'}}
                >
                  <ComputerRoomSelect.Option value="">&nbsp;</ComputerRoomSelect.Option>
                </ComputerRoomSelect>
              </Form.Item>
              <Form.Item label="机柜">
                <CabinetSelect
                  filter={this.state.cascade_box_filter}
                  filterRequired
                  onChange={v => this.antdInputChange('cabinet_id', v)}
                  style={{width: '120px'}}
                >
                  <CabinetSelect.Option value="">&nbsp;</CabinetSelect.Option>
                </CabinetSelect>
              </Form.Item>
              <Form.Item label="所属部门">
                <DepartmentSelect
                  onChange={v => this.antdInputChange('department_id', v)}
                  style={{width: '120px'}}
                >
                  <DepartmentSelect.Option value="">&nbsp;</DepartmentSelect.Option>
                </DepartmentSelect>
              </Form.Item>
            </Col>
            <Col lg={2} style={{textAlign: 'right'}}>
              <Button onClick={this.handleSubmit}>搜索</Button>
            </Col>

          </Form>
        </Row>
        <Row>
          <MachineTable filter={this.state.table_filter}/>
        </Row>
      </Card>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(UserList)


