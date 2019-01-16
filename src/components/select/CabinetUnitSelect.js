import BaseSelect from './BaseSelect'

class CabinetUnitSelect extends BaseSelect {
  constructor (props) {
    super(props)
    this.get_url = this.BASE_URL + '/api/computer-room/cabinet-unit/'
    this.error_message = '机位选择框数据加载失败'
    window.CabinetUnitSelect =this
  }

}
export default CabinetUnitSelect
