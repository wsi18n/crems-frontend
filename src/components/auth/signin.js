import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signinUser} from '../../actions/auth'
import {Row, Icon, Col, Form, Button, Input,Alert} from 'antd'
import validateInput from '../../utils/validations/login'
import classnames from 'classnames'

const FormItem = Form.Item

class Signin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
    }
  }

  isValid = () => {
    const {errors, isValid} = validateInput(this.state)
    if (!isValid) {
      this.setState({errors})
    }

    return isValid
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true})
      this.props.signinUser(this.state)
    }
    this.setState({isLoading: false})
  }

  render () {
    const errors = this.state.errors
    return (
      <Row style={{paddingTop: '100px', align: 'center'}}>
        <Col xs={{span: 20, offset: 2}}
             md={{span: 12, offset: 6}}
             lg={{span: 6, offset: 9}}
        >
          <div className="login_form">
            <Form onSubmit={this.onSubmit} style={{maxWidth: '300px', margin: '0 auto'}}>
              <h3 style={{textAlign: 'center'}}>登录系统</h3>
               {this.props.errorMessage && <Alert message={this.props.errorMessage} type="error"/>}
              <FormItem>
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  type="text"
                  value={this.state.username}
                  onChange={this.onChange}
                  name="username"
                  className={classnames('form-control', {'is-invalid': errors.username})}
                  placeholder="请输入用户名"
                />
                {errors.username && <span className="form-text text-muted">{errors.username}</span>}
              </FormItem>
              <FormItem className="form-group">
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  className={classnames('form-control', {'is-invalid': errors.password})}
                  placeholder="请输入密码"
                />
                {errors.password && <span className="form-text text-muted">{errors.password}</span>}
              </FormItem>
              <FormItem>
                <Button disabled={this.state.isLoading} type="primary" htmlType="submit"
                        style={{float: 'right', width: '100%'}}>登录</Button>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps (state) {
  return {errorMessage: state.authReducer.error}
}

export default connect(mapStateToProps, {signinUser})(Signin)
