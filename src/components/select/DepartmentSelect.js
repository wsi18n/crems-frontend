import BaseSelect from './BaseSelect'

class DepartmentSelect extends BaseSelect {
  constructor (props) {
    super(props)
    this.get_url = this.BASE_URL + '/api/users/department/'
    this.error_message = '部门选择框数据加载失败'
  }

}
export default DepartmentSelect
