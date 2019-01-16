import React, {Component} from 'react'
import {Card, Steps, Row, Form, Input, Col, Button,Alert} from 'antd'
import {connect} from 'react-redux'
import {
  fetchTicketFlowSteps, fetchTicketRecord, fetchTicketTransitions,
  fetchTicketCustomFields, handleTicketState
} from '../../actions/ticket'

const Step = Steps.Step

const FormItem = Form.Item

class TicketDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ticket_id: this.props.match.params.ticketID,
    }
  }

  componentWillMount () {
    const ticket_id = this.props.match.params.ticketID
    this.props.fetchTicketFlowSteps({'ticket_id': ticket_id})
    this.props.fetchTicketRecord({'ticket_id': ticket_id})
    this.props.fetchTicketTransitions({'ticket_id': ticket_id})
    this.props.fetchTicketCustomFields({'ticket_id': ticket_id})
  }

  onSubmit = (e, transitionID) => {
    e.preventDefault()
    const post_data = {
      ticket_id: this.state.ticket_id,
      transition_id: transitionID
    }
    this.props.handleTicketState(post_data)
  }

  render () {
    const ticketFlowStepsResults = this.props.results
    const ticket = this.props.ticket
    const transition = this.props.transition
    const customField = this.props.customField

    const ticketFlowSteps = []
    if (ticketFlowStepsResults.length !== 0) {
      ticketFlowStepsResults.ticket_flow_steps.map(item => {
        ticketFlowSteps.push(item)
      })
      ticketFlowSteps.sort((a, b) => a.order_id - b.order_id)
    }

    let ticketRecord = null
    if (ticket.length !== 0) {
      ticketRecord = ticket[0]
    }

    const ticketTransitions = []
    if (transition.length !== 0) {
      if (transition.has_perm === true) {
        transition.transitions.map(item => {
          ticketTransitions.push(item)
        })
      }

    }

    const ticketCustomFields = []
    if (customField.length !== 0) {
      customField.custom_fields.map(item => {
        ticketCustomFields.push(item)
      })
    }

    let current_state_id = null
    if (ticket.length !== 0) {
      current_state_id = ticket[0].current_state
    }

    let currentStep = 0
    if (ticketFlowSteps.length !== 0 && current_state_id !== null) {
      ticketFlowSteps.map(step => {
        if (step.state_id === current_state_id) {
          currentStep = step.order_id - 1
        }
      })
    }

    const formItemLayout = {
      labelCol: {
        xs: {span: 12},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 16},
      },
    }

    return (
      <div>
        <Row>
          <Card title="业务流程" style={{marginBottom: '10px'}}>
            <Steps current={currentStep}>
              {ticketFlowSteps.map(step =>
                <Step title={step.state_name} key={step.state_id}/>
              )
              }
            </Steps>
          </Card>
        </Row>
        <Row>
          <Card title="工单详情">
            {ticketRecord && ticketRecord.is_rejected &&
              <Col span={24}>
                <Alert
                  message="未通过"
                  description="该工单在该步骤被拒绝，请重新提交申请或联系负责人"
                  type="error"
                  showIcon
                /></Col>
            }
            <Form>

              {ticketRecord &&
              <Col span={12} key={ticketRecord.title}>
                <FormItem label="标题" {...formItemLayout}>
                  <div>{ticketRecord.title}</div>
                </FormItem>
              </Col>
              }

              {ticketRecord &&
              <Col span={12} key={ticketRecord.sn}>
                <FormItem label="流水号" {...formItemLayout}>
                  <div>{ticketRecord.sn}</div>
                </FormItem>
              </Col>
              }

              {ticketRecord &&
              <Col span={12} key={ticketRecord.creator_name}>
                <FormItem label="创建人" {...formItemLayout}>
                  <div>{ticketRecord.creator_name}</div>
                </FormItem>
              </Col>
              }

              {ticketRecord &&
              <Col span={12} key={ticketRecord.current_state_name}>
                <FormItem label="当前状态" {...formItemLayout}>
                  <div>{ticketRecord.current_state_name}</div>
                </FormItem>
              </Col>
              }

              {ticketCustomFields.map(customField =>
                <Col span={12} key={customField.id}>
                  <FormItem label={customField.name} {...formItemLayout}>
                    <div>{customField.char_value_describe}</div>
                  </FormItem>
                </Col>
              )}
              <Col span={24}>
                <FormItem   {...formItemLayout}>
                  {ticketTransitions.length > 0 && ticketTransitions.map(
                    transition =>
                      <Button type="primary" key={transition.id} onClick={(e) => {
                        this.onSubmit(e, transition.id)
                      }} style={{margin: '10px 10px'}}>
                        {transition.name}
                      </Button>
                  )}
                </FormItem>
              </Col>
            </Form>
          </Card>
        </Row>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    results: state.ticketFlowStepsReducer.results,
    loading: state.ticketFlowStepsReducer.loading,
    ticket: state.ticketRecordReducer.results,
    transition: state.ticketTransitionsReducer.results,
    customField: state.ticketCustomFieldsReducer.results,
  }
}

export default connect(mapStateToProps,
  {
    fetchTicketFlowSteps, fetchTicketRecord, fetchTicketTransitions,
    fetchTicketCustomFields, handleTicketState
  })(TicketDetail)

