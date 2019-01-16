import BaseSelect from './BaseSelect'

class CabinetSelect extends BaseSelect {
  constructor (props) {
    super(props)
    this.get_url = this.BASE_URL + '/api/computer-room/cabinet/'
    this.error_message = '机柜选择框数据加载失败'
  }

}
export default CabinetSelect
