import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { connect } from 'react-redux';
import { login } from '../../actionCreators/loginAction';
import { bindActionCreators } from 'redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Button, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import UI from '../../components/newUI/loginDashboard';
import Spinner from '../../components/spinner/spinner';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', message: '', menuVisible: false, editUserModal: false , loading:false,};
        this.toggleEditUserModal = this.toggleEditUserModal.bind(this);
        this.editUser = this.editUser.bind(this);

    }
    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    editUser() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    submit = (e) => {
        this.setState({
            loading:true
        })
        e.preventDefault();
        const { username, password } = this.state
        if (username!==null && password!==null ) {
            this.props.login(username,password)
           .then((loginData)=>{
            if(loginData.payload.data.status===200){
                this.setState({
                    message:loginData.payload.data.message
                })
                localStorage.setItem('token',loginData.payload.data.accessToken);
                localStorage.setItem('user-type',loginData.payload.data.userType);
                localStorage.setItem('firstName',loginData.payload.data.firstName);
        
                
                        switch(loginData.payload.data.user.roles[0].roleName) {
                            case 'SUPER_ADMIN':
                                return this.props.history.push('/superDashboard');
                            case 'ADMIN':
                                return this.props.history.push('/adminDashboard');
                            case 'SOCIETY_MEMBER_OWNER':
                                return this.props.history.push('/ownerDashboard');
                            case 'SOCIETY_MEMBER_TENENT':
                                return this.props.history.push('/tenantDashboard');
                            case 'VENDOR':
                                return this.props.history.push('/vendorDashboard')
                            default:
                                return null;
                        }
                    }
                    else if (loginData.payload.data.status === 401) {
                        this.setState({
                            loading:false,
                            message: loginData.payload.data.message
                        })
                    }
                })

        }
    }

    onChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if(this.state.message.length>0){
          this.setState({
              message:''
          })
      }
  }
  
  handleResponse=(response)=> {
      if(response.payload.data.status===200){
      var data={
               accessToken:response.payload.data.accessToken,
               userType:response.payload.data.user.roles[0].roleName,
               auth:response.payload.data.auth,
               status:response.payload.data.status,
               firstName:response.payload.data.user.firstName
              }
          }
          else if(response.payload.data.status===401){
           data={
                 error:response.payload.data.message
             }
          return <Redirect to='/'></Redirect>
          }
      return data;
  
    }


    message = () => {
        if (this.state.message.length < 0) {
            this.setState({
                message: ''
            })
        }
        else {
            this.setState({
                message: ''
            })
        }
    }

    render() {
        let loginForm;
        loginForm=
        <div>
        <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>User Login</ModalHeader>
        <ModalBody>
                <div style={{ 'color': 'red' }}>{this.state.message}</div>
                <FormGroup>
                    <Label>Username</Label>
                    <Input name="username" type="text" value={this.state.username} onChange={this.onChangeHandler}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="password" value={this.state.password} onChange={this.onChangeHandler}></Input>
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.submit} color="primary" >Login</Button>{' '}
                </FormGroup>

        </ModalBody>
        <ModalFooter>

        </ModalFooter>
        </div>
        return (
        <div>    
                <UI onClick={this.editUser}>
                <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                    {!this.state.loading?loginForm:<Spinner/>}
                </Modal>
                </UI>

            </div>
        );
    }
}

  function mapStateToProps(state) {
    return {
        loginReducer: state.loginReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Login));