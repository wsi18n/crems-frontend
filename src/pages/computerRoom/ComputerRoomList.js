import React, {Component} from 'react'
import {Table, Row, Col, Button, Card, Select, Form, Input, Modal, message} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import {ComputerRoomTable} from '../../components/table'
import { connect } from 'react-redux';

class ComputerRoomList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.filter_params = {}
    window.ComputerRoomList = this
  }

  handleOnChange = e => {
    //this.setState({[e.target.name]: e.target.value})
    this.filter_params[e.target.name] = e.target.value
  }

  handleSubmit = () => {
     this.setState({
      filter: Object.assign({},this.filter_params)
    })
  }

  render () {
    return (
      <Card
        title={(
          <Row>
            <Col xs={20}><h2>机房列表</h2></Col>
            <Col xs={4} style={{textAlign: 'right'}}>
              {this.props.user.is_superuser ?
                <Link to={`/ComputerRoom/New/`}>
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
              <Form.Item label="位置">
                <Input name="address__contains" onChange={this.handleOnChange} autoComplete="off"/>
              </Form.Item>
            </Col>
            <Col lg={2} style={{textAlign: 'right'}}>
              <Button onClick={this.handleSubmit}>搜索</Button>
            </Col>

          </Form>
        </Row>
        <Row>
          <ComputerRoomTable filter={this.state.filter}/>
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
export default connect(mapStateToProps)(ComputerRoomList);
