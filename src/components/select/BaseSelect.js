import React, {Component} from 'react'
import {Select, message} from 'antd'
import history from '../../history'
import axios from 'axios'
import {BASE_URL} from '../../config/config'

/**
 * 根据this.get_url对应的API自动获取<option>s
 *
 * props 接口继承 antd Select
 *
 * props 扩展:
 *    filter <Object>: 过滤参数
 *        e.g.:{parent_id: 1}
 *
 *    filterRequired <Boolean>: 无filter时不向后台获取数据，常用于级联框
 *
 *    optionsRender <Function>: 定义options的render模板，接收3个参数 row,id,array
 *        e.g.:this.default_options_render
 *
 */
class BaseSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [],
    }
    this.BASE_URL = BASE_URL

    this.get_url = BASE_URL + '/api/' //继承时请覆盖这个参数
    this.error_message = '选择框数据加载失败' //继承时请覆盖这个参数
    this.default_options_render = ((row) => <Select.Option key={row.id}>{row.name}</Select.Option>)
  }

  axiosGet = (callback) => {
    axios.get(this.get_url, {params: this.props.filter})
      .then((response) => {
        if (response.data) {
          this.setState({options: response.data}, callback)
        } else {
          message.error(this.error_message)
        }
      })
      .catch((error) => {

        if (error.response && error.response.status === 401) {
          history.push('/login')
        }
        else {
          message.error(this.error_message)
        }
      })
  }

  componentDidMount () {
    if (!this.props.filterRequired || this.props.filter) {
      this.axiosGet()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    function isObjEqual (o1, o2) { //比较两个object值
        if(!o1 || !o2){
          return null
        }
        var props1 = Object.getOwnPropertyNames(o1)
        var props2 = Object.getOwnPropertyNames(o2)
        if (props1.length != props2.length) {
          return false
        }
        for (var i = 0, max = props1.length; i < max; i++) {
          var propName = props1[i]
          if (o1[propName] !== o2[propName]) {
            return false
          }
        }
        return true
      }

    if (this.props.filterRequired && !this.props.filter) {
      if (this.state.options.length) {
        this.setState({options: []})
      }
    }
    //filter不能是指向同一对象。指向同一对象，即使属性更改也不会更新
    else if (this.props.filter !== prevProps.filter && !isObjEqual(this.props.filter , prevProps.filter)) {
       this.axiosGet()
    }
  }

  render () {
    const options_render = this.props.optionsRender || this.default_options_render
    return (
      <Select {...this.props}>
        {this.props.children}
        {
          this.state.options.map((row, id, array) => {
            return options_render(row, id, array)
          })
        }
      </Select>
    )
  }

}

BaseSelect.Option = Select.Option
export default BaseSelect
