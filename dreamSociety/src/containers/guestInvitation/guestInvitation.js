import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UI from '../../components/newUI/superAdminDashboard';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner'
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import DefaultSelect from './../../constants/defaultSelect';



class GuestInvitation extends Component{
    constructor(){
        super();
    }

    render(){

        let data=
        <div>
                       <FormGroup>
                           <Label>Name</Label>
                           <Input type="text" placeholder="Enter full name"></Input>
                       </FormGroup>

                       <FormGroup>
                           <Label>Contact No.</Label>
                           <Input type="text" placeholder="Enter contact no"></Input>
                       </FormGroup>

                       <FormGroup>
                           <Label>Address</Label>
                           <Input type="textarea" placeholder="Enter address"></Input>
                       </FormGroup>
                       
                       
                       
                       <FormGroup>
                           <Button color="success" type="submit" >Submit</Button>
                       </FormGroup>
                   </div>
        return(  
            <div>
               <UI>
                   <Form>
                       <h3>Guest Invitation</h3>
                        {data}
                   </Form>
               </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {
   
    return {
        
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(GuestInvitation));