import React, {Component} from 'react'
import {Row, Col, Button, Card, Form, Input,} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import DepartmentSelect from '../../components/select/DepartmentSelect'
import DepartmentTable from '../../components/table/DepartmentTable'
import {connect} from 'react-redux'

class DepartmentList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.filter_params = {}
    window.ComputerRoomList = this

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
            <Col xs={20}><h2>单位列表</h2></Col>
            <Col xs={4} style={{textAlign: 'right'}}>
              {this.props.user.is_superuser ?
                <Link to={`/Department/New/`}>
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
              <Form.Item label="上级部门">
                <DepartmentSelect
                  onChange={v => this.antdInputChange('parent_id', v)}
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
          <DepartmentTable filter={this.state.filter_params}/>
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

export default connect(mapStateToProps)(DepartmentList)

