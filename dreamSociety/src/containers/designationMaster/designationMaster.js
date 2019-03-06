import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addDesignation} from './../../actionCreators/designationMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class DesignationMaster extends Component{

    constructor(props) {
        super(props);
        this.state = {
            designationId:'',
            designationName:'',
            errors: {},
            message:'',
           

            menuVisible: false,
         }
    }


    
    onDesignationChange=(e)=> {
        this.setState({message:'' })
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.trim(''), errors });
    }
    else {
        this.setState({ [e.target.name]: e.target.value.trim('') });
    }
}

      
  
    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        

        const isValid=Object.keys(errors).length === 0

        if(isValid){
            this.setState({loading:true})

            this.props.addDesignation(this.state)
            .then(()=>this.props.history.push('/superDashboard/designationMasterDetail'))
            .catch(err=>{
                this.setState({message: err.response.data.message, loading: false})
            })
        }
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    designationDetails=()=>{
    this.props.history.push('/superDashboard/designationMasterDetail');
    }

    close=()=>{
    return this.props.history.replace('/superDashBoard')
    }
    render(){

    
        let formData;
        formData =<div>
        <FormGroup>
            <Label>Designation Name</Label>
            <Input  type="text" name="designationName" value={this.state.designationName}  value={this.state.designationName} onChange={this.onDesignationChange} onKeyPress={this.OnKeyPressUserhandler}  placeholder="Designation Name" maxLength={50}
        minLength={3} required/>
        <span className="error">{this.state.message}</span>          
        </FormGroup>

       

        
        <Button color="success" className="mr-2">Submit</Button>
        <Button color="danger"  onClick={this.designationDetails} >Cancel</Button>
        </div>
        return(
            <div>
                  <UI onClick={this.logout}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                 <span aria-hidden="true">&times;</span>
                   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Designation Master</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                
                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        designationMasterReducer: state.designationMasterReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addDesignation }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(DesignationMaster));