import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import Logo from '../../assets/2.jpg';
import {Segment,Menu,Icon,Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {login} from '../../actionCreators/loginAction';
import { bindActionCreators } from 'redux';
import { Form,Modal,ModalHeader,ModalBody,ModalFooter, FormGroup, Input, Button, Label } from 'reactstrap';

  
class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {username:'',password:'', menuVisible: false,editUserModal: false};
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

  submit=(e)=>{
        e.preventDefault(); 
        const { username, password } = this.state
        if (username!==null && password!==null ) {
            this.props.login(username,password)
            .then(response=>{
                console.log('response',response)
            }) 
        }
    }

    onChangeHandler=(e)=>{
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state)
    }
    
    render() {
      return (<div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
        {/* <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
            <Icon name="sidebar" style={{color:'white',cursor:'pointer'}} />
            
          </Menu.Item>   */}
        <i style={{fontSize:'24px', color: 'skyblue',cursor:'pointer'}} className="fa">&#xf1ad;</i> <Link className="navbar-brand" to="#">DRE@M SOCIETY</Link>
        <div className="navbar-collapse collapse" id="navbarCollapse" style={{marginLeft: '20%'}}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="#">Home<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">About Us</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Contact Us</Link>
            </li>
          </ul>
          <form className="form-inline mt-2 mt-md-0">
            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
            onClick={this.editUser}>Login</button>
          </form>
        </div>
        </nav>
        <div style={{marginTop:'48px'}}>
        <Sidebar.Pushable as={Segment} attached="bottom">
        <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
          <Menu.Item><Icon name="user" /><Link to='/superDashboard/registration'>Register</Link></Menu.Item>
          <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
          <Menu.Item><Icon name="smile" />Friends</Menu.Item>
          <Menu.Item><Icon name="calendar" />History</Menu.Item>    
        </Sidebar>
         <Sidebar.Pusher dimmed={this.state.menuVisible}>
              <Segment basic>
                {/* <Header as="h3">Application Content</Header> */}
                {/* <Image src='//unsplash.it/800/480' /> */}
                <img src={Logo} alt="society" />
              </Segment>
         </Sidebar.Pusher>
      </Sidebar.Pushable>
        </div>
        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit User</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.submit}>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input name="username" type="text" value={this.state.username} onChange={this.onChangeHandler}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input name="password" type="password" value={this.state.password} onChange={this.onChangeHandler}></Input>
                            </FormGroup>
                            <FormGroup>
                            <Button color="primary" >Login</Button>{' '}
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                </Modal>

      </div>
      );
    }
  }

  function mapStateToProps(state) {
      console.log(state)
    return {
        loginReducer:state.loginReducer
    }
}

function mapDispatchToProps(dispatch){
return bindActionCreators({login},dispatch);
}

export default (connect(mapStateToProps,mapDispatchToProps )(Login));