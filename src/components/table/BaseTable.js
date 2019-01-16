import React, {Component} from 'react'
import {Table, Button, Modal, message} from 'antd'
import {Link} from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'
import {connect} from 'react-redux'

/**
 * 带数据的表格
 */
class BaseTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      loading: false
    }
    this.BASE_URL = BASE_URL
    /**
     * 继承时覆盖以下3个属性
     */
    this.cols = []
    this.get_url = BASE_URL + '/api/'
    this.error_message = '表格数据加载失败'
    window.TABLE = this
  }

  axiosGet = () => {
    this.setState({loading: true})
    axios.get(this.get_url, {params: this.props.filter})
      .then((response) => {
        if (response.data) {
          this.setState({list: response.data, loading: false})
        } else {
          message.error(this.error_message)
          this.setState({loading: false})
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          history.push('/login')
        }
        else {
          message.error(this.error_message)
        }
        this.setState({loading: false})
      })
  }

  componentDidMount () {
    this.axiosGet()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) {//filter不能是指向同一对象。指向同一对象，即使属性更改也不会更新
      this.axiosGet()
    }
  }

  render () {
    return <Table dataSource={this.state.list} columns={this.cols} rowKey={'id'}
                  loading={this.state.loading} {...this.props}/>
  }
}

export default BaseTable
