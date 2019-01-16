import BaseSelect from './BaseSelect'

class ComputerRoomSelect extends BaseSelect {
  constructor (props) {
    super(props)
    this.get_url = this.BASE_URL + '/api/computer-room/'
    this.error_message = '机房选择框数据加载失败'
  }

}
export default ComputerRoomSelect
