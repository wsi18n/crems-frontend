import React from 'react'
import { Button, Modal, message} from 'antd'
import {Link} from 'react-router-dom'
import BaseTable from './BaseTable'
import axios from 'axios'
import history from '../../history'
import { connect } from 'react-redux';

class DepartmentTable extends BaseTable {
  constructor (props) {
    super(props)

    this.error_message='单位表格数据加载失败'
    this.get_url = this.BASE_URL + '/api/users/department/'
    this.delete_url = this.BASE_URL + '/api/users/delete-department/'
    this.cols = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '上级部门',
      dataIndex: 'parent_name',
      key: 'parent_name',
    }, {
      title: '操作',
      key: 'action',
      render: (row) => (
        <span>
          <Link to={`/Department/${row.id}/`}>
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
    window.DepartmentTable = this
  }
  showDeleteConfirm = id => {
    Modal.confirm({
      title: '确定删除该项吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=>{
        axios.post(this.delete_url, {department_id : id})
          .then((resp) => {
            if (resp.data.success) {
              message.success(resp.data.msg)
              history.push('/DepartmentList')

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
export default connect(mapStateToProps)(DepartmentTable);
