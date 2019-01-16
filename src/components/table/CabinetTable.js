import React from 'react'
import {Button, Modal, message} from 'antd'
import {Link} from 'react-router-dom'
import BaseTable from './BaseTable'
import axios from 'axios'
import history from '../../history'
import {connect} from 'react-redux'

class CabinetTable extends BaseTable {
  constructor (props) {
    super(props)

    this.error_message = '机柜表格数据加载失败'
    this.get_url = this.BASE_URL + '/api/computer-room/cabinet/'
    this.delete_url = this.BASE_URL + '/api/computer-room/delete-cabinet/'
    this.cols = [{
      title: '机柜名称',
      dataIndex: 'name',
    }, {
      title: '行',
      dataIndex: 'cabinet_row',
    }, {
      title: '列',
      dataIndex: 'cabinet_col',
    }, {
      title: '所属机房',
      dataIndex: 'computer_room_name',
    }, {
      title: '总容量',
      key: 'total_unit_number',
      render: (row) => row.total_unit_number + ' U'

    }, {
      title: '已用容量',
      key: 'used_unit_number',
      render: (row) => row.used_unit_number + ' U'

    }, {
      title: '操作',
      key: 'action',
      render: row => (
        <span>
          <Link to={`/Cabinet/${row.id}/`}>
          <Button type="default" style={{marginRight: '2px'}}>
            详情
          </Button>
          </Link>
          {this.props.user.is_superuser ?
            (
              <Button type="danger" onClick={() => this.showDeleteConfirm(row.id)}>
                删除
              </Button>
            ) : ''
          }
        </span>
      ),
    }]

    window.CabinetTable = this
  }

  showDeleteConfirm = id => {
    Modal.confirm({
      title: '确定删除该项吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        axios.post(this.delete_url, {cabinet_id: id})
          .then((resp) => {
            if (resp.data.success) {
              message.success(resp.data.msg)
              history.push('/CabinetList')

            } else {
              message.error(resp.data.msg)
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              history.push('/login')
            }
            else {
              message.error(`删除失败(网络故障-${error.response.status})`)
            }
          })
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }
}

function mapStateToProps (state) {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps)(CabinetTable)

