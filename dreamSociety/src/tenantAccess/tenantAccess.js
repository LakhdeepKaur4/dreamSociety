import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {  } from './../../actions/designationMasterAction';
import UI from '../components/newUI/tenantDashboard';
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import Spinner from '../components/spinner/spinner';

class TenantAccess extends Component{
    constructor(props){
        super();

        this.state={

        }
    }

    handleSubmit=()=>{

    }

    
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }


    changePassword = () => {
        return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    }

    close = () => {
        return this.props.history.replace('/tenantDashBoard')
    }

    render(){
        let formData=<div>

            <FormGroup>
            <Label>Access List</Label>
               <Input type="text"></Input>
            </FormGroup>
            <Button color="success">Access</Button>
            
        </div>
        return(
            <div>
               <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Tenant Access</h3>

                        {!this.state.loading ? formData : <Spinner />}
                    </Form>

                </UI>
            </div>
        )
    }


}

function mapStatToProps(state) {

    return {

        
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(TenantAccess);