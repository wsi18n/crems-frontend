import React, {Component} from 'react'
import {Table, Row, Col, Button, Modal, Form, Input, Card, message} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'

import CabinetTable from '../../components/table/CabinetTable'
import {connect} from 'react-redux'

class ComputerRoomDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.computer_room_id = props.match.params.ComputerRoomID
    this.get_url = BASE_URL + '/api/computer-room/'
    this.post_url = BASE_URL + '/api/computer-room/update-computer-room/'
  }

  componentDidMount () {
    if (this.computer_room_id) {//有id为编辑
      axios.get(this.get_url, {params: {computer_room_id: this.computer_room_id}})
        .then((response) => {
          console.log(response)
          if (response.data) {
            let data = response.data[0]
            data.computer_room_id = data.id
            this.setState(data)
          }
          else {
            message.error(`数据不存在`)
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
      this.post_url = BASE_URL + '/api/computer-room/'
    }

  }

  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    console.log(this.state)
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
        <Card title={
          this.computer_room_id ?
            (<div><h2>机房: {this.state.name}</h2><h3> 基本信息</h3></div>) :
            (<h2>机房新增</h2>)
        }>
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
                  label="描述"
                >
                  <Input
                    name="description"
                    defaultValue={this.state.description}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>

                <Form.Item
                  label="具体位置"
                >
                  <Input
                    name="address"
                    defaultValue={this.state.address}
                    onChange={this.handleOnChange}
                  />
                </Form.Item>
                {this.props.user.is_superuser ?
                  <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                  : ''}

              </Form>
            </Col>
          </Row>
        </Card>
        {this.computer_room_id ?
          (<Card title={(<h3> 下属机柜</h3>)}>
              <Row type="flex" justify="center">
                <Col xs={24}>
                  <CabinetTable filter={{computer_room_id: this.computer_room_id}}/>
                </Col>
              </Row>
            </Card>
          ) : ''}
      </div>
    )

  }
}

function mapStateToProps (state) {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(ComputerRoomDetail)
