import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import SocietyComponent from '../../components/societyComponent/societyComponent';
import { connect } from 'react-redux';
import _ from 'underscore';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity, getLocation} from '../../actionCreators/societyMasterAction';
import {addMemberDetails, getMemberDesignation, getMemberDetails,getSocietyId} from '../../actionCreators/boardMemberRegistrationAction';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';

class BoardMemberRegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            societyId:'',
            societyBoardMemberName:'',
            designationName:'',
            designationId:'',
            cityName:'',
            countryName:'',
            stateName:'',
            email:'',
            optionalMail:'',
            accountHolderName: '',
            bankName:'',
            locationId:'',
            locationName:'',
            currentAddress:'',
            permanentAddress:'',
            accountNumber:'',
            countryId:'',
            contactNumber:'',
            IFSCCode:'',
            panCardNumber:'',
            emailValidError:'',
            optionalContactNumber: '',
            stateId:'',
            cityId:'',
            dob:'',
            loading: true,
            errors: {},
            emailServerError:'',
            userNameServerError:'',
            contactServerError:''
        }

        this.cityName=this.cityName.bind(this);
    }

    componentDidMount=()=>{
        this.props.getCountry().then(() => this.setState({loading: false}));
        this.props.getState().then(() => this.setState({loading: false}));
        this.props.getCity().then(() => this.setState({loading: false}));
        this.props.getMemberDetails().then(() => this.setState({loading: false}));
        this.props.getMemberDesignation().then(() => this.setState({loading: false}));
        this.props.getSocietyId().then(() => this.setState({loading: false}));
        this.props.getLocation().then(() => this.setState({loading: false}));  
        let societyId = localStorage.getItem('societyId')
        console.log(societyId);
        this.setState({societyId})
        console.log(this.state.societyId)
        this.setState({societyId: localStorage.getItem('societyId')})
        console.log(this.state.societyId)           
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
         this.props.getLocation(data2.cityId)
 }

 onChangeLocation = (event) => {
    console.log(this.state);
     let selected=event.target.value;

     var data3= _.find(this.props.societyReducer.locationResult, function(obj){
         return obj.locationName === selected
     });
     this.setState({
         locationName:data3.locationName,
         locationId:data3.locationId
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

 locationName=({locationResult})=>{
    if(locationResult){
         
        return( 
            locationResult.map((item) =>{ 
                return(
                    <option key={item.locationId} value={item.locationName}>
                     {item.locationName}
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
    this.setState({[e.target.name]:e.target.value.trim()});
    
}

fetchDesignation = ({designation}) => {
    console.log(designation)
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
        this.setState({permanentAddress: ''})
        document.getElementById('permanentaddr').disabled = false;
    }
}

keyPress = (event) => {
    const pattern = /^[a-zA-Z0-9, ]+$/;
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

submit = (e) => {
    e.preventDefault()
            
    let errors = {};
        if(this.state.societyBoardMemberName === ''){
            errors.societyBoardMemberName = `Board Member Name can't be empty.`
        }
        if(!this.state.designationId){
            errors.designationId = `Designation can't be empty.`
        }
        if(!this.state.countryId) errors.countryId = `Country can't be empty.`;
        if(!this.state.stateId) errors.stateId = `State can't be empty.`;
        if(!this.state.cityId) errors.cityId = `City can't be empty.`;
        if(!this.state.locationId) errors.locationId = `Location can't be empty.`;
        if(this.state.currentAddress === '') errors.currentAddress = `Current Address can't be empty.`;
        if(this.state.permanentAddress === '') errors.permanentAddress = `Permanent Address can't be empty.`;
        if(this.state.contactNumber === '') errors.contactNumber = `Contact can't be empty.`;
        if(this.state.email === '') errors.email = `Email can't be empty.`;
        if(this.state.bankName === '') errors.bankName = `Bank Name can't be empty.`;
        if(this.state.accountHolderName === '') errors.accountHolderName = `Account Holder Name can't be empty.`;
        if(this.state.accountNumber === '') errors.accountNumber = `Account number can't be empty.`;
        if(this.state.panCardNumber === '') errors.panCardNumber = `Pan card number can't be empty.`;
        if(this.state.IFSCCode === '') errors.IFSCCode = `IFSC code can't be empty.`;
        if(this.state.dob === '') errors.dob = `cDate of birth can't be empty.`;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.emailValidError===''){
           
            this.setState({loading: true});
            console.log(this.state)
            this.props.addMemberDetails(this.state)
            .then(() => this.props.history.push('/superDashboard/boardMemberDetails'))
            .catch(err => {
                err.response.data;
                console.log(err.response.data)
                this.setState({emailServerError: err.response.data.messageEmailErr, userNameServerError:err.response.data.messageUsernameErr,
                    contactServerError: err.response.data.messageContactErr,loading: false})
            });
            
        }
        
}

OnKeyPresshandlerPhone(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

OnKeyPressUserhandler(event) {
    const pattern = /^[a-zA-Z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

bankValidation(e){
    const pattern = /^[a-zA-Z0-9_, ]+$/;
    let inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
        e.preventDefault();
    }
}

emailValid(event) {
    const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

emailChange = (e) => {
    console.log(this.state.email)
    this.setState({errors:{email: ''}})
    if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state.email)
        this.setState({emailValidError: ''})
    }
    else{ this.setState({emailValidError: 'Invalid Email.'})}
    
}

fetchSocietyId = ({boardId}) => {
    if(boardId){
        return boardId.map((item) => {
            return (
                <option value={item.societyId} key={item.societyId}>{item.societyName}</option>
            )
        })
    }
}
route =() =>{
    this.props.history.push('/superDashboard/boardMemberDetails');
}

maxDate = () => {
    var d = new Date();
    return d.toISOString().split('T')[0];
}

    render(){
        let formData = <div>
            {/* <FormGroup>
                        <Label>Society Name</Label>
                        <Input type="select"
                        name="societyId"
                        onChange={this.onChange}
                        defaultValue="no-value"
                         >
                            <DefaultSelect />
                            {this.fetchSocietyId(this.props.boardMemberReducer)}
                        </Input>
                        {!this.state.societyId ? <span className="error">{this.state.errors.societyId}</span>: ''}
                    </FormGroup> */}
                    <FormGroup>
                        <Label>Member Name</Label>
                        <Input type='text'
                         placeholder="Member Name"
                         name='societyBoardMemberName' 
                         onChange={this.onChange}
                         onKeyPress={this.OnKeyPressUserhandler} />
                        {!this.state.societyBoardMemberName ? <span className="error">{this.state.errors.societyBoardMemberName}</span>: ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>Designation</Label>
                        <Input type='select'
                         defaultValue='no-value' 
                         name='designationId' 
                         onChange={this.onChange} >
                            <DefaultSelect />
                            {this.fetchDesignation(this.props.boardMemberReducer)}
                        </Input>
                        {!this.state.designationId ? <span className="error">{this.state.errors.designationId}</span> : ''}
                    </FormGroup>
                    <SocietyComponent onChangeCountry={this.onChangeCountry}
                        onChangeState={this.onChangeState}
                        onChangeCity={this.onChangeCity}
                        onChangeLocation={this.onChangeLocation}
                        countryName={this.countryName}
                        stateName = {this.stateName}
                        cityName = {this.cityName}
                        locationName={this.locationName}
                        countryReducer={this.countryName(this.props.societyReducer)}
                        stateReducer={this.stateName(this.props.societyReducer)}
                        cityReducer={this.cityName(this.props.societyReducer)}
                        locationReducer={this.locationName(this.props.societyReducer)}
                        countryError={this.state.errors.countryId}
                        stateError={this.state.errors.stateId}
                        cityError={this.state.errors.cityId}
                        locationError={this.state.errors.locationId}
                        countryData={this.state.countryId}
                        stateData={this.state.stateId}
                        cityData={this.state.cityId}
                        locationData={this.state.locationId} />
                        
                    <FormGroup>
                        <Label>Current Address</Label>
                        <Input id="currentAddress" 
                        onKeyPress={this.keyPress} 
                        value={this.state.currentAddress} 
                        type="textarea" 
                        placeholder="Current Address" 
                        name="currentAddress" 
                        onChange={this.onChange}
                        maxLength='150' />
                        {!this.state.currentAddress ? <span className="error">{this.state.errors.currentAddress}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                    Is Your permanent address same as above?<Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
                    </FormGroup>
                    <FormGroup >
                        <Label>Permanent Address</Label>
                        <Input id="permanentaddr"
                         type="textarea" 
                         value={this.state.permanentAddress} 
                         placeholder="Permanent Address" 
                         name="permanentAddress" 
                         onChange={this.onChange}
                         maxLength='150' />
                         {!this.state.permanentAddress ? <span className="error">{this.state.errors.permanentAddress}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>Contact Number</Label>
                        <Input placeholder="Contact Number"
                         type="text"
                          name="contactNumber" 
                          onChange={this.onChange}
                          onKeyPress={this.OnKeyPresshandlerPhone}
                          maxLength='10'
                          minLength='10' />
                          {this.state.contactServerError ? <span className='error'>{this.state.contactServerError}</span> : null}
                        {!this.state.contactNumber ? <span className="error">{this.state.errors.contactNumber}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>Optional Contact Number</Label>
                        <Input 
                        placeholder="Optional Contact Number" 
                        type="text" 
                        name="optionalContactNumber" 
                        onChange={this.onChange}
                        onKeyPress={this.OnKeyPresshandlerPhone}
                        maxLength='10'
                        minLength='10' />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input 
                        placeholder="Email" 
                        type="email" 
                        name="email" 
                        onChange={this.emailChange}
                        onKeyPress={this.emailValid} />
                        {!this.state.email ? <span className="error">{this.state.errors.email}</span> : ''}
                        {<span className="error">{this.state.emailValidError}</span>}
                        {this.state.emailServerError ? <span className='error'>{this.state.emailServerError}</span> : null}
                    </FormGroup>
                    <FormGroup>
                        <Label>Optional Mail</Label>
                        <Input 
                        placeholder="Optional Mail" 
                        type="email" 
                        name="optionalMail" 
                        onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Bank Name</Label>
                        <Input 
                        placeholder="Bank Name" 
                        type="text" 
                        name="bankName" 
                        onChange={this.onChange}
                        onKeyPress={this.bankValidation} />
                        {!this.state.bankName ? <span className="error">{this.state.errors.bankName}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>Account Holder Name</Label>
                        <Input placeholder="Account Holder Name"
                         type="text"
                         name="accountHolderName" 
                         onChange={this.onChange}
                         onKeyPress={this.OnKeyPressUserhandler} />
                        {!this.state.accountHolderName ? <span className="error">{this.state.errors.accountHolderName}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>Account Number</Label>
                        <Input
                         placeholder="Account Number" 
                         type="text" 
                         name="accountNumber" 
                         onChange={this.onChange}
                         maxLength='16'
                         onKeyPress={this.OnKeyPresshandlerPhone} />
                         {!this.state.accountNumber ? <span className="error">{this.state.errors.accountNumber}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>Pan Card Number</Label>
                        <Input 
                        className="TextTransformToCapital" 
                        placeholder="Pan Card Number"
                        type="text"
                        value={this.state.panCardNumber.toUpperCase()} 
                        name="panCardNumber"
                        minLength='10'
                        maxLength='10'
                        onKeyPress={(e) => {
                            const pattern = /^[a-zA-Z0-9]+$/;
                            let inputChar = String.fromCharCode(e.charCode);
                            if (!pattern.test(inputChar)) {
                                e.preventDefault();
                            }
                        }} 
                        onChange={this.onChange} />
                        {!this.state.panCardNumber ? <span className="error">{this.state.errors.panCardNumber}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>IFSC Code</Label>
                        <Input className="TextTransformToCapital" 
                        placeholder="IFSC Code"
                        type="text" 
                        name="IFSCCode" 
                        value={this.state.IFSCCode.toUpperCase()}
                        onChange={this.onChange}
                        onKeyPress={(e) => {
                            const pattern = /^[a-zA-Z0-9]+$/;
                            let inputChar = String.fromCharCode(e.charCode);
                            if (!pattern.test(inputChar)) {
                                e.preventDefault();
                            }
                        }} 
                        minLength='11'
                        maxLength='11' />
                        {!this.state.IFSCCode ? <span className="error">{this.state.errors.IFSCCode}</span> : ''}
                    </FormGroup>
                    <FormGroup>
                        <Label>Date of Birth</Label>
                        <Input type="date" max={this.maxDate()} name="dob" onChange={this.onChange} />
                        {!this.state.dob ? <span className="error">{this.state.errors.dob}</span> : ''}
                    </FormGroup>
                    <Button color="success" className="mr-2">Add Member</Button>
                    <Button color="danger" onClick={this.route}>Cancel</Button>
        </div>
        return(
            <UI onClick={this.logout}>
                <Form onSubmit={this.submit} method="POST">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Board Member Details</h3></div>
                    {!this.state.loading ? formData : <Spinner />}
                </Form>
            </UI>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        societyReducer: state.societyReducer,
        boardMemberReducer: state.boardMemberReducer    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,addMemberDetails,
        getMemberDesignation, getMemberDetails, getSocietyId, getLocation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardMemberRegistrationForm);