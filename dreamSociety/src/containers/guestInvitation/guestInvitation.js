import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UI from '../../components/newUI/tenantDashboard';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner'
import {Form, Button,  FormGroup,  Input, Label, Col, Row } from 'reactstrap';
import DefaultSelect from './../../constants/defaultSelect';
import {OnKeyPressUserhandler,numberValidation} from '../../validation/validation';
import { node } from 'prop-types';



class GuestInvitation extends Component{
    constructor(){
        super();

        this.state={

            errors:{},
            message:''
        }
    }

    onChange = (e) => {
        console.log(e.target.value)
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

    render(){

        let data=
        <div>
                       <FormGroup>
                           <Row>
                               <Col md={6}>
                                   <Label>Name</Label>
                                   <Input type="text" placeholder="Enter full name" onKeyPress={OnKeyPressUserhandler} maxLength={200}></Input>
                               </Col>

                               <Col md={6}>
                                    <Label>Contact No.</Label>
                                    <Input type="text" placeholder="Enter contact no" onKeyPress={numberValidation} maxLength={10}></Input>
                                </Col>
                           </Row>
                       </FormGroup>

                       <FormGroup>
                           <Label>Address</Label>
                           <Input type="textarea" placeholder="Enter address"></Input>
                       </FormGroup>

                       <FormGroup >
                           <Label >Cooming for Purpose</Label>
                           <Input type="select" defaultValue='no-value' onChange={this.onChange}>
                           <DefaultSelect />
                                <option>Private Event</option>
                                <option>Public Event</option>
                           </Input>
                       </FormGroup>

                       <FormGroup>
                           <Label>No. of Person</Label>
                           <Input type="text" onKeyPress={numberValidation} placeholder="no. of person" ></Input>
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