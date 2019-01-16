import React, {Component} from 'react'
import {Card, Row, Col, Form, Input, Button, Select} from 'antd'
import {connect} from 'react-redux'
import {fetchCustomField, fetchWorkflow, fetchWorkflowInitState, fetchDepartment} from '../../actions/workflow'
import {createTicketRecord} from '../../actions/ticket'
import {DepartmentSelect, ComputerRoomSelect, CabinetSelect, CabinetUnitSelect} from '../../components/select'

const FormItem = Form.Item

const Option = Select.Option

const {TextArea} = Input

class CreateTicketDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      workflow_id: this.props.match.params.workflowID,
      workflow_name: this.props.match.params.workflowName
    }
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleInitUnitSelectChange = (newValue) => {
    this.setState({init_unit: newValue})
  }

  handleEquipTypeSelectChange = (newValue) => {
    this.setState({equip_type: newValue})
  }
  antdInputChange = (name, new_value) => {
    this.setState({[name]: new_value})
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.createTicketRecord(this.state)
  }

  componentWillMount () {
    this.props.fetchCustomField(this.state)
    this.props.fetchWorkflow(this.state)
    this.props.fetchWorkflowInitState(this.state)
    this.props.fetchDepartment(this.state)
  }

  render () {
    const customFields = this.props.results
    const workflows = this.props.workflow
    const workflowInitState = this.props.workflowInitState
    const transitions = []
    if (workflowInitState.length !== 0) {
      workflowInitState.state_info.transition.map(item => transitions.push(item))
    }
    const departments = this.props.department

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

    return (
      <div>
        <Card
          title={this.state.workflow_name}
        >
          <Row type="flex" justify="center">
            <Col xxl={8} xl={10} lg={12} md={16} xs={24}>
              <Form>
                <FormItem label="标题" {...formItemLayout}>
                  <Input
                    name="ticket_title"
                    onChange={this.handleInputChange}
                  />
                </FormItem>
                {customFields.map(customField =>
                  <FormItem label={customField.field_name} {...formItemLayout}>
                    {customField.field_type === '5' &&
                    <Input
                      name={customField.field_key}
                      onChange={this.handleInputChange}
                    />
                    }

                    {customField.field_type === '10' && customField.field_key === 'init_unit' &&
                    <Select
                      name={customField.field_key}
                      onChange={this.handleInitUnitSelectChange}
                    >
                      {departments.map(department =>
                        <Option key={department.id} value={department.name}>{department.name}</Option>
                      )}
                    </Select>
                    }

                    {customField.field_type === '10' && customField.field_key === 'equip_type' &&
                    <Select
                      name={customField.field_key}
                      onChange={this.handleEquipTypeSelectChange}
                    >
                      <Option key="1" value="服务器">服务器</Option>
                      <Option key="2" value="交换机">交换机</Option>
                      <Option key="3" value="路由器">路由器</Option>
                      <Option key="4" value="安全设备">安全设备</Option>
                      <Option key="5" value="其他">其他</Option>
                    </Select>
                    }
                    {customField.field_type === '15' && customField.field_key === 'equip_position' &&
                    <React.Fragment>
                      <ComputerRoomSelect
                        key="ComputerRoomSelect"
                        onChange={v => {
                          this.antdInputChange('computer_room_id', v)
                        }}
                      />
                      <CabinetSelect
                        key="CabinetSelect"
                        filter={this.state.computer_room_id ? {computer_room_id: this.state.computer_room_id} : null}
                        filterRequired
                        value={this.state.cabinet_id}
                        onChange={v => {
                          this.antdInputChange('cabinet_id', v)
                        }}
                      />
                      <CabinetUnitSelect
                        key="CabinetUnitSelect"
                        mode="multiple"
                        filter={this.state.cabinet_id ? {cabinet_id: this.state.cabinet_id} : null}
                        filterRequired
                        onChange={v => this.antdInputChange('equip_position', v)}
                        optionsRender={(row) =>
                          <Select.Option
                            key={row.id}
                            disabled={row.machine ? row.machine != this.machine_id : false}
                          >
                            {row.name}
                          </Select.Option>
                        }
                      />
                    </React.Fragment>
                    }

                    {customField.field_type === '30' &&
                    <TextArea
                      rows={4}
                      name={customField.field_key}
                      onChange={this.handleInputChange}
                    />
                    }
                  </FormItem>
                )
                }
                {transitions.length > 0 && transitions.map(transition =>
                  <FormItem {...tailFormItemLayout}>
                  <Button type="primary" key={transition.transition_id} onClick={this.onSubmit}
                          style={{margin: '10px 10px'}}>
                    {transition.transition_name}
                  </Button></FormItem>
                )}
              </Form>
            </Col></Row>
        </Card>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    results: state.customFieldReducer.results,
    count: state.customFieldReducer.count,
    loading: state.customFieldReducer.loading,
    workflow: state.workflowReducer.results,
    workflowInitState: state.workflowInitStateReducer.results,
    department: state.departmentReducer.results,
  }
}

export default connect(mapStateToProps,
  {fetchCustomField, fetchWorkflow, fetchWorkflowInitState, fetchDepartment, createTicketRecord})(CreateTicketDetail)

