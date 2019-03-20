import React,{Component} from 'react';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { matchUser,clearMessage } from '../../actionCreators/forgetPassword';


class resetPassword extends Component{
    constructor(props){
        super(props);

        this.state={
           newPassword:'',
           confirmPassword:'',
           type:'password',
           type1:'password',
            
            errors:{}
        }
    }

    submit=(e)=>{
        e.preventDefault();
      
        let errors = {};

        if (this.state.newPassword === '') errors.newPassword = "Cant be empty";
        if (this.state.confirmPassword === '') errors.confirmPassword = "Cant be empty";
        this.setState({ errors });
    
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            
        }  
        
    }
    showHide=(e)=>{
        this.setState({
          type: this.state.type === 'password' ? 'input' : 'password',
        })
      }

      showHide1=(e)=>{
        this.setState({

          type1: this.state.type1 === 'password' ? 'input' : 'password',

        })
      }   
    

    onChange=(e)=>{
           
            this.setState({ [e.target.name]: e.target.value});
    }
    render(){
        let show = (<i className="fa fa-eye" style={{'position': 'absolute', 'right': '15px', 'top': '40px'}}></i>);
        let hide = (<i className="fa fa-eye-slash" style={{'position': 'absolute', 'right': '15px', 'top': '40px'}}></i>);
       
        return(
            <div>
                <Form onSubmit={this.submit}>
                  <FormGroup>
                      <Label>Enter New Password</Label>
                    <Input type="password"
                        name="newPassword"
                        type={this.state.type}
                        maxLength='40'
                        onChange={this.onChange}/>
                    <span className="error">{this.state.errors.newPassword}</span>
                    <span className="newPassword" onClick={this.showHide}>{this.state.type === 'password' ? hide: show}</span>
                

                  </FormGroup>

                  <FormGroup>
                      <Label>Confirm Password</Label>
                    <Input type="password"
                        name="confirmPassword"
                        maxLength='40'
                        onChange={this.onChange}
                        type={this.state.type1}/>
                    <span className="error">{this.state.errors.confirmPassword}</span>
                    <span className="newPassword" onClick={this.showHide1}>{this.state.type1 === 'password' ? hide: show}</span>
                

                  </FormGroup>
                  
                  <FormGroup>
                      <Button color="success">Submit</Button>
                  </FormGroup>
                  </Form>

                  {/* {this.fetchUser(this.props.forgetPasswordReducer)} */}
                  
                  
            </div>
        )
    }
}
// function mapStateToProps(state) {

//     return {
//         forgetPasswordReducer: state.forgetPasswordReducer

//     }
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         matchUser ,
//         clearMessage
            
           
    
//     }, dispatch)
// }
export default connect()(resetPassword);