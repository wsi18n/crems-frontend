import React from 'react'
import {Button, Modal, message} from 'antd'
import {Link} from 'react-router-dom'
import BaseTable from './BaseTable'
import axios from 'axios'
import history from '../../history'
import { connect } from 'react-redux';

class UserTable extends BaseTable {
  constructor (props) {
    super(props)

    this.error_message = '用户表格数据加载失败'
    this.get_url = this.BASE_URL + '/api/users/'
    this.delete_url = this.BASE_URL + '/api/users/delete-user'
    this.cols = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '姓名',
      dataIndex: 'full_name',
      key: 'full_name',
    }, {
      title: '所属单位',
      dataIndex: 'department_name',
      key: 'department_name',
    }, {
      title: '操作',
      key: 'action',
      render: (row) => (
        <span>
          <Link to={`/User/${row.id}/`}>
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

    window.UserTable = this
  }

  showDeleteConfirm = id => {
    Modal.confirm({
      title: '确定删除该项吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=>{
        axios.post(this.delete_url, {user_id: id})
          .then((resp) => {
            if (resp.data.success) {
              message.success(resp.data.msg)
              history.push('/UserList')

            } else {
              message.error(resp.data.msg)
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
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

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}
export default connect(mapStateToProps)(UserTable);


