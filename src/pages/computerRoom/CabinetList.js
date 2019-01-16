import React, {Component} from 'react'
import {Table, Row, Col, Button, Modal, Form, Input, message, Card, Select} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import CabinetTable  from '../../components/table/CabinetTable'
import {ComputerRoomSelect} from '../../components/select'
import { connect } from 'react-redux';


class CabinetList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.filter_params ={}
    window.CabinetList = this
  }

  handleOnChange = e => {
    //this.setState({[e.target.name]: e.target.value})
    this.filter_params[e.target.name] = e.target.value
  }
  antdInputChange = (name, new_value) => {
    //this.setState({[name]: new_value})
    this.filter_params[name] = new_value
  }
  handleSubmit = () => {
    this.setState({
      filter_params: Object.assign({},this.filter_params)
    })
  }

  render () {
    return (
      <Card
        title={(<Row>
            <Col xs={20}><h2>机柜列表</h2></Col>
            <Col xs={4} style={{textAlign: 'right'}}>
              {this.props.user.is_superuser ?
                <Link to={`/Cabinet/New/`}>
                <Button type="primary">
                 新增
                </Button>
                </Link>
              :''}
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
              <Form.Item label="所属机房">
                <ComputerRoomSelect
                    onChange={(value) => this.antdInputChange('computer_room_id', value)}
                    style={{width: 120}}
                >
                  <Select.Option value={null}> - </Select.Option>
                </ComputerRoomSelect>
              </Form.Item>
            </Col>
            <Col lg={2} style={{textAlign: 'right'}}>
              <Button onClick={this.handleSubmit}>搜索</Button>
            </Col>

          </Form>
        </Row>
        <Row>
          <CabinetTable filter={this.state.filter_params}/>
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

export default connect(mapStateToProps)(CabinetList);

