import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import SocietyComponent from '../../components/societyComponent/societyComponent';
import { connect } from 'react-redux';
import _ from 'underscore';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity} from '../../actionCreators/societyMasterAction';
import {addMemberDetails, getMemberDesignation} from '../../actionCreators/societyMemberRegistrationAction';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';

class SocietyMemberRegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            societyMemberName:'',
            designationName:'',
            designationId:'',
            cityName:'',
            countryName:'',
            stateName:'',
            email:'',
            optionalMail:'',
            accountHolderName: '',
            bankName:'',
            currentAddress:'',
            permanentAddress:'',
            accountNumber:'',
            countryId:'',
            contactNumber:'',
            IFSCCode:'',
            optionalContactNumber: '',
            stateId:'',
            cityId:'',
            dob:'',
            errors: {}
        }

        this.cityName=this.cityName.bind(this);
    }

    componentDidMount=()=>{
        this.props.getCountry();
        this.props.getState();
        this.props.getCity();
        this.props.getMemberDesignation();
                    
 }



 onChangeCountry= (event)=>{
    console.log(this.state);
     let selected= event.target.value
 
     var country = _.find(this.props.societyReducer.countryResult,function(obj){
         return obj.countryName === selected
         })
     
         this.setState({
             countryName: country.countryName,
             countryId:country.countryId
         })
         
         this.props.getState(country.countryId)
       
 }

 
 onChangeState= (event)=>{
    console.log(this.state);
     let selected= event.target.value
     
     var data1 = _.find(this.props.societyReducer.stateResult,function(obj){
         return obj.stateName === selected
         })
 
         this.setState({
             stateName: data1.stateName,
             stateId:data1.stateId
         })
         this.props.getCity(data1.stateId);
 }

 onChangeCity= (event)=>{
     console.log(this.state);
     let selected= event.target.value
 
     var data2 = _.find(this.props.societyReducer.cityResult,function(obj){
         return obj.cityName === selected
         })
         this.setState({
             cityName:data2.cityName,
             cityId:data2.cityId
         })
 }
 
 countryName = ({countryResult}) => {
     if(countryResult){
       
        return( 
         countryResult.map((item) =>{
                return(
                    <option key={item.countryId} value={item.countryName}>
                     {item.countryName}
                    </option>
                )
            })
        )
         
     }
 }

 stateName = ({stateResult}) => {
     if(stateResult){
       
        return( 
         stateResult.map((item) =>{ 
                return(
                    <option key={item.stateId} value={item.stateName}>
                     {item.stateName}
                    </option>
                )
            })
        )
         
     }
 }

 cityName=({cityResult})=>{
    
     if(cityResult){
         
        return( 
         cityResult.map((item) =>{ 
                return(
                    <option key={item.cityId} value={item.cityName}>
                     {item.cityName}
                    </option>
                )
            }
            )
        )
         
     }
 }

 close=()=>{
    return this.props.history.replace('/superDashBoard')
}

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/');
}

onChange = (e) => {
    console.log(this.state);
    this.setState({[e.target.name]:e.target.value});
    
}

fetchDesignation = ({designation}) => {
    if(designation){
       return designation.designation.map((item) => {
            return (
                <option key={item.designationId} value={item.designationId}>{item.designationName}</option>
            )
        })
    }
}

sameAddress = (e) => {
    if(!!document.getElementById('isChecked').checked){
        console.log('is checked')
       this.setState({permanentAddress: this.state.currentAddress})
       document.getElementById('permanentaddr').disabled = true;
    }
   else{
        console.log('is not checked')
        this.setState({permanentAddress: ''})
        document.getElementById('permanentaddr').disabled = false;
    }
}

keyPress = () => {
    document.getElementById('isChecked').checked = false;
    document.getElementById('permanentaddr').disabled = false;
    this.setState({permanentAddress: ''});
}

    render(){
        return(
            <UI onClick={this.logout}>
                <Form>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Society Member Details</h3></div>
                    <FormGroup>
                        <Label>Member Name</Label>
                        <Input type='text' placeholder="Member Name" name='societyMemberName' onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Designation</Label>
                        <Input type='select' defaultValue='no-value' name='designationId' onChange={this.onChange} >
                            <DefaultSelect />
                            {this.fetchDesignation(this.props.societyMemberReducer)}
                        </Input>
                    </FormGroup>
                    <SocietyComponent onChangeCountry={this.onChangeCountry}
                        onChangeState={this.onChangeState}
                        onChangeCity={this.onChangeCity}
                        countryName={this.countryName}
                        stateName = {this.stateName}
                        cityName = {this.cityName}
                        countryReducer={this.countryName(this.props.societyReducer)}
                        stateReducer={this.stateName(this.props.societyReducer)}
                        cityReducer={this.cityName(this.props.societyReducer)}/>
                    <FormGroup>
                        <Label>Current Address</Label>
                        <Input id="currentAddress" onKeyPress={this.keyPress} value={this.state.currentAddress} type="textarea" placeholder="Current Address" name="currentAddress" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                    Is Your permanent address same as above?<Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
                    </FormGroup>
                    <FormGroup >
                        <Label>Permanent Address</Label>
                        <Input id="permanentaddr" type="textarea" value={this.state.permanentAddress} placeholder="Permanent Address" name="permanentAddress" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Contact Number</Label>
                        <Input placeholder="Contact Number" type="text" name="contactNumber" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Optional Contact Number</Label>
                        <Input placeholder="Optional Contact Number" type="text" name="optionalContactNumber" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input placeholder="Email" type="email" name="email" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Optional Mail</Label>
                        <Input placeholder="Optional Mail" type="email" name="optionalMail" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Bank Name</Label>
                        <Input placeholder="Bank Name" type="text" name="bankName" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Account Holder Name</Label>
                        <Input placeholder="Account Holder Name" type="text" name="accountHolderName" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Account Number</Label>
                        <Input placeholder="Account Number" type="text" name="accountNumber" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>IFSC Code</Label>
                        <Input placeholder="IFSC Code" type="text" name="IFSCCode" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Date of Birth</Label>
                        <Input type="date" name="dob" onChange={this.onChange} />
                    </FormGroup>
                    <Button color="success">Add Member</Button>
                </Form>
            </UI>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        societyReducer: state.societyReducer,
        societyMemberReducer: state.societyMemberReducer    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,addMemberDetails,
        getMemberDesignation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SocietyMemberRegistrationForm);