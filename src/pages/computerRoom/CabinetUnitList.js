import React, {Component} from 'react'
import {Row, Col, Form, Input, Button, Card} from 'antd'
import {CabinetUnitTable} from '../../components/table'
import {ComputerRoomSelect, CabinetSelect} from '../../components/select'

class CabinetUnitList extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.filter_params = {}
  }

  cascadeHandleChange = (name, value) => { //机房机柜级联框
    this.setState({
      cascade_box_filter: value ? {[name]: value} : null
    })
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
      table_filter: Object.assign({}, this.filter_params)
    })
  }

  render () {
    return (
      <Card
        title={(<Row>
            <h2>机位列表</h2>
          </Row>
        )}
      >
        <Row>

          <Form className="ant-advanced-search-form" layout="inline">
            <Col lg={22}>
              <Form.Item label="机房">
                <ComputerRoomSelect
                  onChange={v => {
                    this.cascadeHandleChange('computer_room_id', v)
                    this.antdInputChange('computer_room_id', v)
                  }}
                  style={{width: '120px'}}
                >
                  <ComputerRoomSelect.Option value="">&nbsp;</ComputerRoomSelect.Option>
                </ComputerRoomSelect>
              </Form.Item>
              <Form.Item label="机柜">
                <CabinetSelect
                  showSearch
                  optionFilterProp={'children'}
                  filter={this.state.cascade_box_filter}
                  filterRequired
                  onChange={v => this.antdInputChange('cabinet_id', v)}
                  style={{width: '120px'}}
                >
                  <CabinetSelect.Option value="">&nbsp;</CabinetSelect.Option>
                </CabinetSelect>
              </Form.Item>
            </Col>
            <Col lg={2} style={{textAlign: 'right'}}>
              <Button onClick={this.handleSubmit}>搜索</Button>
            </Col>

          </Form>
        </Row>
        <Row>
          <CabinetUnitTable filter={this.state.table_filter}/>
        </Row>
      </Card>
    )

  }
}

export default (CabinetUnitList)
