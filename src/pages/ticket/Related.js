import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { fetchTicketRecord } from '../../actions/ticket';

class Related extends Component {
    componentDidMount() {
        const post_data = {category: 'relation'}
        this.props.fetchTicketRecord(post_data)
    }

    render() {
        const ticketRecords = this.props.results
        const columns = [{
            title: '流水号',
            dataIndex: 'sn',
            key: 'sn',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '业务流程',
            dataIndex: 'workflow_name',
            key: 'workflow_name',
        }, {
            title: '当前状态',
            key: 'current_state_name',
            dataIndex: 'current_state_name',
        }, {
            title: '创建人',
            key: 'creator_name',
            dataIndex: 'creator_name',
        }, {
            title: '创建时间',
            key: 'created_at',
            dataIndex: 'created_at',
        }, {
            title: '更新时间',
            key: 'updated_at',
            dataIndex: 'updated_at',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/TicketDetail/${record.id}/`}>详情</Link>
                </span>
            ),
        }];
        return (
            <div>
                <Table columns={columns} dataSource={ticketRecords} rowKey={'sn'}/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        results: state.ticketRecordReducer.results,
        loading: state.ticketRecordReducer.loading,
    }
}

export default connect(mapStateToProps, { fetchTicketRecord })(Related);


