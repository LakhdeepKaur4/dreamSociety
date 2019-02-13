import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addMaintenance} from './../../actionCreators/maintenanceMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';



class MaintenanceMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maintenanceId:'',
            category:'',

            loading: true,
           

            menuVisible: false,
         }

       

    }


   
    onMaintenanceChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
  
        })
      }

    // OnKeyPressUserhandler(event) {
    //     const pattern = /^[a-zA-Z]+$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (!pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }

    handleSubmit=(e)=>{
        e.preventDefault();

        
        this.props.addMaintenance(this.state)
        .then(()=>this.props.history.push('/superDashboard/maintenanceMasterDetail'))

        this.setState({
          state:{
            category:'',
            maintenanceId:'',
        
            menuVisible: false,
          }


        });
    
    }

    logout=()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/') 
            }

    maintenanceDetails=()=>{
        this.props.history.push('/superDashboard/maintenanceMasterDetail');
    }

    render() {
        let formData;
        formData =<div>
      <FormGroup>
            <Label htmlFor='category'><h4>Maintenance Category</h4></Label>
            <Input  type="text" name="category" value={this.state.category}  value={this.state.category} onChange={this.onMaintenanceChange}  placeholder="Maintenance Category" maxLength={30}
        minLength={3} required/>
           
        </FormGroup>
         
        <Button color="success" className="mr-2">Submit</Button>
        <Button color="danger" onClick={this.maintenanceDetails}>Cancel</Button>
        </div>

        
        return (
            <div>
                <UI onClick={this.logout}>
                <Form onSubmit={this.handleSubmit}>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Maintenance Master</h3>
                    {/* {!this.state.loading ? formData : <Spinner />} */}
                    {formData}
                </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        MaintenanceMasterReducer: state.MaintenanceMasterReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addMaintenance }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(MaintenanceMaster));
