import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {} from '../../actionCreators/assignRolesAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label, Row, Col } from 'reactstrap';

import Spinner from '../../components/spinner/spinner';
import DefaultSelect from './../../constants/defaultSelect';

class IndividualVendor extends Component{

    constructor(props){
        super(props);

        this.state={
            firstName:'',
            lastName:'',
            countryName:'',
            stateName:'',
            cityName:'',
            locationName:'',
            currentAddress:'',
            permanentAddress:'',
            email:'',
            contactNumber:'',
            serviceType:'',
            rateType:'',
            rate:'',
            form:'',
            to:'',
            profilePicture:'',
            documentOne:'',
            documentTwo:'',
            errors:{}
           
        }
    }

    sameAddress = (e) => {
        if(!!document.getElementById('isChecked').checked){
            console.log('is checked')
           this.setState({permanentAddress: this.state.currentAddress.trim()})
           document.getElementById('permanentaddr').disabled = true;
        }
       else{
            this.setState({permanentAddress: ''})
            document.getElementById('permanentaddr').disabled = false;
        }
    }

    keyPress = (event) => {
        const pattern = /^[a-zA-Z0-9_, ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
        else{
            document.getElementById('isChecked').checked = false;
            document.getElementById('permanentaddr').disabled = false;
            this.setState({permanentAddress: ''});
        }
        
    }

    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    emailChange = (e) => {
        console.log(this.state.email)
        this.setState({errors:{email: ''}})
        this.setState({email:e.target.value, emailServerError:''})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value.trim()});
            console.log(this.state.email)
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log(this.state.email)
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
        }
        else {
            this.setState({email:e.target.value});
        }
        
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim() });
        }
        
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        if(this.state.firstName==='') {
            errors.firstName= "cant be empty"
        }
        else if(this.state.lastName ==='') {
          errors.lastName= "cant be empty"
        }

        else if(this.state.countryName ==='') {
            errors.countryName = "cant be empty"
        }
        else if(this.state.stateName ==='') {
            errors.stateName = "cant be empty"
        }
        else if(this.state.cityName ==='') {
            errors.cityName= "cant be empty"
        }
        else if(this.state.locationName ==='') {
            errors.locationName = "cant be empty"
        }
        else if(this.state.currentAddress ==='') {
            errors.currentAddress = "cant be empty"
        }
        else if(this.state.permanentAddress ==='') {
            errors.permanentAddress = "cant be empty"
        }
        else if(this.state.email ==='') {
            errors.email = "cant be empty"
        }

        else if(this.state.contactNumber ==='') {
            errors.contactNumber = "cant be empty"
        }

        else if(this.state.serviceType ==='') {
            errors.serviceType = "cant be empty"
        }

        else if(this.state.rateType ==='') {
            errors.rateType = "cant be empty"
        }

        else if(this.state.rate ==='') {
            errors.rate = "cant be empty"
        }

        else if(this.state.from ==='') {
            errors.from = "cant be empty"
        }

        else if(this.state.to ==='') {
            errors.to= "cant be empty"
        }

        else if(this.state.profilePicture ==='') {
            errors.profilePicture= "cant be empty"
        }

        else if(this.state.documentOne ==='') {
            errors.documentOne= "cant be empty"
        }

        else if(this.state.documentTwo ==='') {
            errors.documentTwo= "cant be empty"
        }

       
        this.setState({errors})

        console.log("submitted-----------------");
    }

     
    dashbordPage=()=>{
        this.props.history.push('/superDashboard');
    }

    render(){
          let formData=<div>
            <FormGroup>
                <Label>First Name</Label>
                <Input  type="text" name="firstName" placeholder="firstname"></Input>  
            </FormGroup>
             <span className='error'>{this.state.errors.firstName}</span>
            <FormGroup>
                <Label>Last Name</Label>
                <Input  type="text" name="lastName" placeholder="lastname"></Input>  
            </FormGroup>
            <span className='error'>{this.state.errors.lastName}</span>
            <Row form>
            <Col md={6}>
            <FormGroup>
            <Label>Country Name</Label>
            <Input type="select" defaultValue='no-value' name="countryName" >
                <DefaultSelect/>
                {/* {this.countryName(this.props.societyReducer)} */}
            </Input>
            <span className='error'>{this.state.errors.countryName}</span>
            </FormGroup>
            </Col>
            
                <Col md={6}>
            <FormGroup>
                <Label>State Name</Label>
                <Input type="select" defaultValue='no-value' name="stateName"  >
            <DefaultSelect/>
                    {/* {this.stateName(this.props.societyReducer)} */}
                </Input>
                <span className='error'>{this.state.errors.stateName}</span>
            </FormGroup>
            </Col>
            </Row>
            
            <Row form>
                <Col md={6}>
            <FormGroup>
                <Label>City Name</Label>
                <Input type="select" defaultValue='no-value' name="cityName" >
            <DefaultSelect/>
                    {/* {this.cityName(this.props.societyReducer)}   */}
                </Input>
                <span className='error'>{this.state.errors.cityName}</span>
            </FormGroup>
            </Col>
            
            <Col md={6}>
            <FormGroup>
                <Label>Location Name</Label>
                <Input type="select" defaultValue='no-value' name="locationName"  >
                <DefaultSelect/>
                    {/* {this.locationName(this.props.societyReducer)} */}
                </Input>
                <span className='error'>{this.state.errors.locationName}</span>
            </FormGroup>
            </Col>
            </Row>
            <FormGroup>
                <Label>Current Address</Label>
                <Input  type="textarea" name="currentAddress" id="currentAddress"  placeholder="Current Address"  onKeyPress={this.keyPress}  onChange={this.onChange} ></Input>  
            </FormGroup>
            <span className='error'>{this.state.errors.currentAddress}</span>
            <FormGroup>
                    Is Your permanent address same as above?<Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
            </FormGroup>
            <FormGroup>
                <Label>Permanent Address</Label>
                <Input id="permanentaddr"  type="textarea" name="permanentAddress" placeholder="Permanent Address"  onChange={this.onChange}></Input>  
            </FormGroup>
            <span className='error'>{this.state.errors.permanentAddress}</span>
            <Row form>
            <Col md={6}>
            <FormGroup>
                <Label>Email Id</Label>
                <Input placeholder="Email Id" type="email" name="email" maxLength={200} onChange={this.emailChange}
                        onKeyPress={this.emailValid}/>
                <span className='error'>{this.state.errors.email}</span>
            </FormGroup>
            </Col>


            <Col md={6}>
            <FormGroup>
                <Label>Contact No.</Label>
                {/* <Input placeholder="Contact No." type="text" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10}/> */}
                <Input placeholder="Contact No." type="text" name="contactNumber"  onKeyPress={this.OnKeyPresshandlerPhone}  maxLength={10}/>
                <span className='error'>{this.state.errors.contactNumber}</span>
                </FormGroup>
                </Col>
                </Row>
                <Row form>
                <Col md={5}>
                <FormGroup>
                <Label>Service Type</Label>
                <Input type="select" defaultValue='no-value' name="serviceType" >
                    <DefaultSelect/>
                    {/* {this.countryName(this.props.societyReducer)} */}
                </Input>
                <span className='error'>{this.state.errors.serviceType}</span>
                </FormGroup>
                </Col>
                
                <Col md={4}>
                <FormGroup>
                    <Label>Rate Type</Label>
                    <Input type="select" defaultValue='no-value' name="rateType">
                    <DefaultSelect/></Input>
                    <span className='error'>{this.state.errors.rateType}</span>
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup>
                    <Label>Rate</Label>
                    <Input type="text" name="rate" placeholder="Service Rate"></Input>
                    <span className='error'>{this.state.errors.rate}</span>
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="date"  name="from" >
                    </Input>
                    <span className='error'>{this.state.errors.from}</span>
                </FormGroup>
                </Col>
                
                <Col md={6}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="date" name="to" >
                    </Input>
                    <span className='error'>{this.state.errors.to}</span>
                </FormGroup>
                </Col>
                </Row>

                <FormGroup>
                <Label>Upload Your Picture</Label>
                    <Input type="file" name="profilePicture" accept="image/*"  />
                    <span className="error">{this.state.errors.profilePicture}</span>     
                </FormGroup>

                <FormGroup>
                <Label>Upload Your Id</Label>
                    <Input type="file" name="documentOne" accept="image/*"  />
                    <span className="error">{this.state.errors.documentOne}</span>     
                </FormGroup>

                <FormGroup>
                <Label>Upload Another Id</Label>
                    <Input type="file" name="documentTwo" accept="image/*"  />
                    <span className="error">{this.state.errors.documentTwo}</span>     
                </FormGroup>

               

                <Button color="success" className="mr-2">Submit</Button>
                <Button color="danger" onClick={this.dashbordPage}>Cancel</Button>
            </div>
        return(
           <div>
               <UI onClick={this.logout}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                  <span aria-hidden="true">&times;</span>
                   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Individual Vendor</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                </UI>
           </div>
        )
    }
}

function mapStateToProps(state) {
   
 return {
    // AssignRolesReducer: state.AssignRolesReducer
 }

}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({ }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(IndividualVendor));

