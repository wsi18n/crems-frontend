import React from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
import BaseTable from './BaseTable'

class CabinetUnitTable extends BaseTable {
  constructor (props) {
    super(props)

    this.error_message = '机位表格数据加载失败'
    this.get_url = this.BASE_URL + '/api/computer-room/cabinet-unit/'
    this.cols = [{
      title: '标识',
      dataIndex: 'name',
    }, {
      title: '所属机柜',
      dataIndex: 'cabinet_name',
    }, {
      title: '规划单位',
      render: (row) => row.plan_department_name
    },{
      title: '使用单位',
      render: (row) => row.used_department_name
    },{
      title: '状态',
      render: (row) => row.state?'空':'已用'
    }, {
      title: '操作',
      key: 'action',
      render: row => (
        <span>
          <Link to={`/CabinetUnit/${row.id}/`}>
          <Button type="default" style={{marginRight: '2px'}}>
           详情
          </Button>
          </Link>
        </span>
      ),
    }]

  }

}

export default  CabinetUnitTable

