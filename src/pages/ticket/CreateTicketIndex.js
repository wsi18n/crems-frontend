import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWorkflow } from '../../actions/workflow';

const { Meta } = Card;

class CreateTicketIndex extends Component {
    componentDidMount() {
        this.props.fetchWorkflow()
    }

    render() {
        const workflows = this.props.results
        return (
            <Row gutter={16}>
                {workflows.map(workflow =>
                    <Col span={6} key={workflow.id}>
                        <Link to={`/CreateTicketDetail/${workflow.id}/${workflow.name}`}>
                            <Card>
                                <Meta
                                    title={workflow.name}
                                    description={workflow.description}>
                                    >
                                </Meta>
                            </Card>
                        </Link>
                    </Col>)}
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.workflowReducer.results,
        count: state.workflowReducer.count,
        loading: state.workflowReducer.loading,
    }
}

export default connect(mapStateToProps, { fetchWorkflow })(CreateTicketIndex);

