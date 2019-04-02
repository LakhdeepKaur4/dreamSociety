import React,{Component} from 'react';
import {connect} from 'react-redux';
import  UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import Select from 'react-select';
import {getCountry,getState,getCity, getLocation} from  '../../actionCreators/societyMasterAction';
import {AddEmployee} from '../../actionCreators/employeeMasterAction';
import {getEmployee,getEmployeeType,getEmployeeWorkType} from  '../../actionCreators/employeeTypeMasterAction';
import {bindActionCreators} from 'redux';
import DefaultSelect from '../../constants/defaultSelect'
import _ from 'underscore';
import './employeeMaster.css';
import { Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap';

class EmployeeMaster extends Component{



    state={
        loading:true,
        countryId1:'',
        countryId:'',
        stateId:'',
        cityId:'',
        locationId:'',
        countryName: '',
        stateId1: '',
        stateName:'',
        cityId1: '',
        cityName:'',
        locationName:'',
        locationId1:'',
        countryId2:'',
        countryName: '',
        stateId2: '',
        stateName:'',
        cityId2: '',
        cityName:'',
        locationName:'',
        locationId2:'',
        address:'',
        documentOne:null,
        documentTwo:null,
        profilePicture:null,
        firstName:'',
        middleName:'',
        lastName:'',
        startDate:'',
        serviceType:'',
        salary:'',
        file:'',
        errors:{},
        contact:'',
        email:'',
        employeeDetailId:'',
        permanentAddress:'',
        currentAddress:'',
        defaultPermanent:'',
        permanentAddrDefault:true,
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
            contactServerError:'',
            currentAddressDefault:'',
            currentState:'',
            currentStateId:'',
            currentCity:'',
            currentCityId:'',
            currentState:'',
            currentStateId:'',
            currentLocation:'',
            permanentLocationId:'',
            currentAddressVisible:false,
            readOnly:'',
            permanentAddressDefault:'',
            editCurrent:true,
            pin:'',
            pin1:'',
            gender:'',
            pinCode:'',
            pinCode1:'',
            defaultCurrentAddress:'',
            emailServerError:'',
            userNameServerError:'',
            contactServerError:'',

    }





  OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

onPicChange=(event)=>{
    if(!!this.state.errors[event.target.name]){

        let errors =Object.assign({},this.state.errors)
        delete  errors[event.target.name]
        this.setState({[event.target.name]:event.target.files[0],errors});
    }
    else{
  this.setState({ profilePicture : event.target.files[0]})

    }

}

onFileChange=(event)=>{
       if(!!this.state.errors[event.target.name]){
           let errors =Object.assign({},this.state.errors)
           delete errors[event.target.name]
           this.setState({[event.target.name]:event.target.files[0],errors});

       }
          else{this.setState({ documentOne: event.target.files[0]})
    }
         }


FileChange=(event)=>{
    if(!!this.state.errors[event.target.name]){
        let errors =Object.assign({},this.state.errors)
        delete errors[event.target.name]
        this.setState({[event.target.name]:event.target.files[0],errors});
    }

    else{
              this.setState({ documentTwo: event.target.files[0]})

        }
    }

    componentDidMount(){

        //  this.props.getCountryName().then(()=>this.setState({loading:false}));
        // this.props.getStateName().then(()=>this.setState({loading:false}))
        // this.props.getCityName().then(()=>this.setState({loading:false}))
        //  this.props.getLocationName().then(()=>this.setState({loading:false}))
        this.props.getEmployee().then(()=>this.setState({loading:false}))
        this.props.getCountry().then(() => this.setState({loading:  false})).catch(() => this.setState({loading:false}));
        this.props.getState().then(() => this.setState({loading:  false})).catch(() => this.setState({loading:false}));
        this.props.getCity().then(() => this.setState({loading:  false})).catch(() => this.setState({loading:false}));
        this.props.getLocation().then(() => this.setState({loading:  false})).catch(() => this.setState({loading:false}));

    }



    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }



    submit=(event)=> {
        console.log(this.state.employeeDetailId)
        event.preventDefault();
        let errors ={};
        // const {  countryId,stateId,cityId,locationId,documentOne,documentTwo,profilePicture,firstName,middleName,lastName,startDate,endDate,CTC }=  this.state

        // if(!this.state.countryId){
        //   errors.countryId= "Country Name  can't be empty. "
        //  }
        //  if(!this.state.stateId){
        //   errors.stateId="State Name can't be empty. "
        //  }
        //   if(!this.state.cityId){
        //   errors.cityId ="City Name can't be empty."
        //  }
        //  if(!this.state.locationId){
        //   errors.locationId="Location Name can't be empty."
        //  }
         if(!this.state.documentOne){
          errors.documentOne ="please select an ID."
         }
         if(!this.state.documentTwo){
            errors.documentTwo ="please select an ID"
         }
         if(!this.state.profilePicture){
          errors.profilePicture =" Profile picture can't be empty."
         }
         if(!this.state.firstName){
         errors.firstName ="First Name can't be empty. "
         }

         if(!this.state.lastName){
       errors.lastName ="Last Name can't be empty."
         }
         if(!this.state.salary){
            errors.salary ="salary can't be empty."
              }

         if(!this.state.startDate){
          errors.startDate =" Start Date can't be empty ."
         }
         if(this.state.pin1 === '') {
            errors.pin1 = `Please enter Pin/Zip Code.`}
        if(document.getElementById('isChecked').checked === false){
            if(this.state.currentAddressDefault === '') errors.currentAddressDefault = `Current Address can't be empty.`;
        }
        if(document.getElementById('isChecked').checked === false){
            if(this.state.pin === '') {
                errors.pin = `Please enter Pin/Zip Code.`}
        }


         const data = new FormData()

  this.setState({ errors });
  const isValid = Object.keys(errors).length === 0
  if (isValid) {

      this.setState({loading:true})

      data.append('profilePicture',this.state.profilePicture)
        data.append('documentOne',this.state.documentOne,  this.state.documentOne.name)
        data.append('documentTwo',this.state.documentTwo,  this.state.documentTwo.name)
        data.append('firstName',this.state.firstName)
        data.append('middleName',this.state.middleName)
        data.append('lastName',this.state.lastName)
        data.append('salary',this.state.salary)
        data.append('startDate',this.state.startDate)
        data.append('permanentAddress',this.state.permanentAddress)
        data.append('currentAddress',this.state.currentAddress)
        data.append('stateId1',this.state.stateId)
        data.append('countryId1',this.state.countryId)
        data.append('cityId1',this.state.cityId)
        data.append('locationId1',this.state.locationId)
        data.append('stateId2',this.state.stateId)
        data.append('countryId2',this.state.countryId)
        data.append('cityId2',this.state.cityId)
        data.append('locationId2',this.state.locationId)
        data.append('email',this.state.email)
        data.append('contact',this.state.contact)
        data.append('employeeDetailId',this.state.employeeDetailId)


         this.props.AddEmployee(data).then(()=>this.props.history.push('/superDashboard/displayEmployee')).catch(err =>  {
            err.response.data;
            console.log(err.response.data)
            this.setState({emailServerError:  err.response.data.messageEmailErr,
                contactServerError:  err.response.data.messageContactErr,loading: false})
        });

    }



    }


    getService=({getEmployee})=>{
 console.log("abc",getEmployee)
 if(getEmployee){
     return getEmployee.employeeDetail.map((item)=>{
   return(
       <option key={item.employeeDetailId} value={item.employeeDetailId}>
            {item.serviceType}-{item.employee_work_type_master.employeeWorkType}-
                            {item.employee_type_master.employeeType}
       </option>
   )
     })
 }
  }

  countryName = ({countryResult}) => {
    if(countryResult){

       return(
        countryResult.map((item) =>{
               return(
                { ...item, label: item.countryName, value: item.countryId }
               )
           })
       )

    }
}
countryName1 = ({countryResult}) => {
    if(countryResult){

       return(
        countryResult.map((item) =>{
               return(
                { ...item, label: item.countryName, value: item.countryId }
               )
           })
       )

    }
}

onChangeCountry = (countryId, countryName, selectOption) => {
    console.log(countryId, countryName, selectOption)

    this.setState({
        countryName: selectOption.countryName,
        countryId:selectOption.countryId,
    })

    this.props.getState(selectOption.countryId)
}

stateName = ({stateResult}) => {
    if(stateResult){
      console.log(stateResult)
       return(
        stateResult.map((item) =>{
               return(
                { ...item, label: item.stateName, value: item.stateId }
               )
           })
       )

    }
}

stateName1 = ({stateResult}) => {
    if(stateResult){
      console.log(stateResult)
       return(
        stateResult.map((item) =>{
               return(
                { ...item, label: item.stateName, value: item.stateId }
               )
           })
       )

    }
}

onChangeState = (stateName, stateId, selectOption) => {
    console.log(stateName, stateId, selectOption)
    this.setState({
        stateName: selectOption.stateName,
        stateId:selectOption.stateId
    })
    this.props.getCity(selectOption.stateId);
}

cityName=({cityResult})=>{

    if(cityResult){

       return(
        cityResult.map((item) =>{
               return(
                { ...item, label: item.cityName, value: item.cityId }
               )
           }
           )
       )

    }
}

cityName1=({cityResult})=>{

    if(cityResult){

       return(
        cityResult.map((item) =>{
               return(
                { ...item, label: item.cityName, value: item.cityId }
               )
           }
           )
       )

    }
}

onChangeCity = (cityName, cityId, selectOption) => {
    console.log(cityName, cityId, selectOption)
    this.setState({
        cityName: selectOption.cityName,
        cityId:selectOption.cityId
    })
    this.props.getLocation(selectOption.cityId)
}


locationName=({locationResult})=>{
   if(locationResult){

       return(
           locationResult.map((item) =>{
               return(
                { ...item, label: item.locationName, value: item.locationId }
               )
           }
           )
       )

    }
}

locationName1=({locationResult})=>{
    if(locationResult){

        return(
            locationResult.map((item) =>{
                return(
                 { ...item, label: item.locationName, value: item.locationId }
                )
            }
            )
        )

     }
 }

onChangeLocation = (locationName, locationId, selectOption) => {
    console.log(locationName, locationId, selectOption)
    this.setState({
        locationName: selectOption.locationName,
        locationId:selectOption.locationId,

    })
    this.updatePermanentAddress1(selectOption.locationName)
}

updatePermanentAddress1 = (location) => {
    console.log(location)
    this.setState({location})
    this.setState({permanentAddress:  this.state.permanentAddressDefault  + ', ' + location + ', ' +
    this.state.cityName + ', ' + this.state.stateName + ', ' +  this.state.countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('updatePermanentAddress', this.state.permanentAddress)
}


countryChange = (currentCountryId, currentCountry, selectOption) => {
    console.log(currentCountryId, currentCountry, selectOption)

    this.setState({
        currentCountry: selectOption.countryName,
        currentCountryId:selectOption.countryId,
    })

    this.props.getState(selectOption.countryId)
}


stateChange = (currentState, currentStateId, selectOption) => {
    console.log(currentState, currentStateId, selectOption)
    this.setState({
        currentState: selectOption.stateName,
        currentStateId:selectOption.stateId
    })
    this.props.getCity(selectOption.stateId);
}

cityChange = (currentCity, currentCityId, selectOption) => {
    console.log(currentCity, currentCityId, selectOption)
    this.setState({
        currentCity: selectOption.cityName,
        currentCityId:selectOption.cityId
    })
    this.props.getLocation(selectOption.cityId)
}

locationChange = (currentLocation, currentLocationId, selectOption) => {
    console.log(currentLocation, currentLocationId, selectOption)
    this.setState({
        currentLocation: selectOption.locationName,
        currentLocationId:selectOption.locationId,

    })
    this.updateCurrentAddress1(selectOption.locationName)
}

updateCurrentAddress1 = (location) => {
    console.log(location)
    this.setState({location})
    this.setState({currentAddress: this.state.currentAddressDefault   + ', ' + location + ', ' +
    this.state.currentCity + ', ' + this.state.currentState + ', ' +  this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('currentAddress', this.state.currentAddress)
}

 close=()=>{
    return this.props.history.replace('/superDashBoard')
}

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/');
}

defaultPermanentAddressChange = (e) =>{
    this.setState({defaultCurrentAddress:  this.state.correspondenceAddress ,permanentAddress: e.target.value})
}

onChange = (e) => {
    this.setState({emailServerError:'',contactServerError:''  })
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.trim(), errors });
    }
    else {
        this.setState({ [e.target.name]: e.target.value.trim() });
    }

}

fetchDesignation = ({designation}) => {
    console.log(designation)
    if(designation){
       return designation.designation.map((item) => {
            return (
                <option key={item.designationId}  value={item.designationId}>{item.designationName}</option>
            )
        })
    }
}

// sameAddress = (e) => {
//     if(!!document.getElementById('isChecked').checked){
//         console.log('is checked')
//        this.setState({permanentAddress: this.state.currentAddress.trim()})
//        document.getElementById('currenttaddr').disabled = true;
//     }
//    else{
//         this.setState({permanentAddress: ''})
//         document.getElementById('currenttaddr').disabled = false;
//     }
// }
sameAddress = () => {
    console.log(this.state)
    if(!!document.getElementById('isChecked').checked){
        console.log('is checked')
       this.setState({currentAddress: this.state.permanentAddress,  currentAddressVisible:true, editCurrent:false})
    }
   else{
        this.setState({currentAddress: '' ,  currentAddressVisible:false, editCurrent:true})
    }
}

permanentAddressChange = (e) => {
    console.log(this.state)
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ permanentAddressDefault: e.target.value,  permanentAddress: e.target.value  + (this.state.locationName ? (', ' +  this.state.locationName + ', ') : ', ') +
        this.state.cityName + ', ' + this.state.stateName + ', ' +  this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1 ,  errors });
    }
    else {
        this.setState({permanentAddressDefault: e.target.value,  permanentAddress: e.target.value  + (this.state.locationName ? (', ' +  this.state.locationName + ', ') : ', ') +
        this.state.cityName + ', ' + this.state.stateName + ', ' +  this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1})
    }
    if(!!document.getElementById('isChecked').checked){
        this.setState({currentAddress: e.target.value +  (this.state.locationName ? (', ' + this.state.locationName + ', ') :  ', ') +
        this.state.cityName + ', ' + this.state.stateName + ', ' +  this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1})
    }
}

currentAddressChange = (e) => {
    console.log(this.state)
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ currentAddressDefault: e.target.value,  currentAddress: e.target.value  + (this.state.currentLocation ? (', '  + this.state.currentLocation + ', ') : ', ') +
        this.state.currentCity + ', ' + this.state.currentState + ',  ' + this.state.currentCountry + ', ' + 'Pin/Zip code: ' +  this.state.pin , errors });
    }
    else {
        this.setState({currentAddressDefault: e.target.value,  currentAddress: e.target.value  + (this.state.currentLocation ? (', '  + this.state.currentLocation + ', ') : ', ') +
        this.state.currentCity + ', ' + this.state.currentState + ',  ' + this.state.currentCountry + ', ' + 'Pin/Zip code: ' +  this.state.pin})
    }
}

pinChange = (e) => {
    console.log(this.state)
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value, errors });
    }
    else {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
    }
    this.updateCurrentAddress(e.target.value)
}

updateCurrentAddress = (pin) => {
    console.log(pin)
    this.setState({pin})
    this.setState({currentAddress: this.state.currentAddressDefault   + (this.state.currentLocation ? (', ' + this.state.currentLocation +  ', ') : ', ') +
    this.state.currentCity + ', ' + this.state.currentState + ', ' +  this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + pin})
    console.log('currentAddress', this.state.currentAddress)
}

pinChange1 = (e) => {
    console.log(this.state)
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ pin1: e.target.value, errors });
    }
    else {
        this.setState({pin1: e.target.value});
    }
    this.updatePermanentAddress(e.target.value)
}

updatePermanentAddress = (pin) => {
    console.log(pin)
    this.setState({pin})
    this.setState({permanentAddress:  this.state.permanentAddressDefault  + (this.state.locationName ? (', '  + this.state.locationName + ', ') : ', ') +
    this.state.cityName + ', ' + this.state.stateName + ', ' +  this.state.countryName + ', ' + 'Pin/Zip Code: ' + pin})
    console.log('updatePermanentAddress', this.state.permanentAddress)
}


    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
  displayEmployee=()=>{
      this.props.history.push('/superDashboard/displayEmployee');
  }

  changePassword=()=>{
    return this.props.history.replace('/superDashboard/changePassword')
 }

render(){
let form;
<Spinner/>

let formData=
<form onSubmit={this.submit}>
<div style={{ cursor: 'pointer' }} className="close"  aria-label="Close" onClick={this.close}>
<span aria-hidden="true">&times;</span>
</div>
<div>
<h3 align="center">Employee Master </h3>

  <div className="input-container">
        <label >Select Your Image</label>
        <input type="file" accept =".png, .jpg, .jpeg"    data-max-size="4194304"   name="profilePicture"  onChange={this.onPicChange}/>

        <span className="error">{this.state.errors.profilePicture}</span>
    </div>

    <div className="row">
    <div className="form-group col-md-4 ">
    <label>First Name</label>
    <input  className="form-control" name="firstName" type="text"   onChange ={this.onChange}  onKeyPress={this.OnKeyPresshandler}  maxLength={30}/>

    <span className="error">{this.state.errors.firstName}</span>
    </div>


    <div className="form-group  col-md-4">
    <label> Middle Name</label>
    <input  className="form-control" type="text" name ="middleName"   onKeyPress={this.OnKeyPresshandler}  onChange ={this.onChange}  maxLength={30}/>
    <span className="error">{this.state.errors.middleName}</span>
    </div>


    <div className="form-group col-md-4">
    <label> Last Name</label>
    <input  className="form-control" type="text"  name="lastName"   onKeyPress={this.OnKeyPresshandler} onChange ={this.onChange}  maxLength={30}/>
    <span className="error">{this.state.errors.lastName}</span>
    </div>
    </div>


      <div>
          <label> Service Type</label>
          <select className="form-control" name="employeeDetailId"   onChange ={this.onChange} defaultValue='no-value'>
          <DefaultSelect/>
          {this.getService(this.props.employeeDetails)}
          </select>

      </div>
    <div>
                        <label>Contact Number</label>
                        <input className ="form-control"
                         type="text"
                          name="contact"
                          onChange={this.onChange}
                          onKeyPress={this.OnKeyPressNumber}
                          maxLength='10'
                          minLength='10' />
                          {this.state.contactServerError ? <span  className='error'>{this.state.contactServerError}</span> : null}
                        {<span  className="error">{this.state.errors.contactNumber}</span> }
                        </div>
                         <div>
                        <label>Email</label>
                        <input  className ="form-control"

                        type="email"
                        name="email"
                        maxLength="70"
                        onChange={this.onChange}
                        onKeyPress={this.emailValid} />
                        {this.state.emailServerError ? <span  className="error">{this.state.emailServerError}</span> : null}
                        <span><br/></span>
                        {<span  className="error">{this.state.errors.email}</span>}
                        {<span  className="error">{this.state.emailValidError}</span>}
                    </div>

    <div className="form-group">

        <label> Salary(In Terms of CTC)</label>

        <input type="text"  className="form-control" name ="salary"  onChange ={this.onChange} onKeyPress={ this.OnKeyPressNumber}  maxLength={20}/>
        <span className="error">{this.state.errors.salary}</span>
    </div>

     {/* <div className="form-group">
                <label>  current Address</label>
                <input type="text" className="form-control" name  ="currentAddress"   onChange ={this.onChange} maxLength={30}/>
                <span  className="error">{this.state.errors.currentAddress}</span>
                  </div>

    <div  className="row">


                    <div className="col-md-6">
                            <label>Country Name</label>
                           <select   className ="form-control"  name="countryName"  defaultValue='no-value'  onChange={this.onChangeCountry} >
                        <DefaultSelect/>
                             {this.getDropdown1(this.props.locationMasterReducer)}
                        </select>
                           {!this.state.countryId1?<span  className="error">{this.state.errors.countryId1}</span>:''}
                    </div>



                    <div className="col-md-6">
                        <label>State Name</label>
                        <select  className ="form-control"   defaultValue='no-value'  name="stateName" onChange={this.onChangeState}>
                               <DefaultSelect/>
                             {this.getDropdown2(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.stateId1?<span  className="error">{this.state.errors.stateId1}</span>:''}
                    </div>
                          </div>

                          <div className="row">
                      <div  className="col-md-6">
                        <label>City Name</label>
                        <select  className ="form-control"  defaultValue='no-value'  name="cityName" onChange={this.onChangeCity} >
                            <DefaultSelect/>
                             {this.getDropdown3(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.cityId1?<span  className="error">{this.state.errors.cityId1}</span>:''}
                     </div>
                     <div  className="col-md-6" >
                        <label>location</label>
                        <select  className ="form-control"  name="locationName" defaultValue='no-value'  onChange={this.onLocationChange} >
                             <DefaultSelect/>
                             {this.getDropdown4(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.locationId1?<span  className="error">{this.state.errors.locationId1}</span>:''}
                      </div>
                     </div>
                     <div>
                            Is Your permanent address same as current  address?<input type="checkbox" onChange={this.sameAddress}  name="isChecked" id="isChecked" className="ml-3" />
                        </div>
                        <h3 style={{textAlign:'center'}}>Permanent  Address</h3>


                          {this.state.defaultPermanent ? <div>
                            <label>Permanent Address</label>
                            <input   type="textarea"  className="form-control" id="permanentaddr" disabled   onChange={this.onChange}
                            maxLength="250"  value={this.state.permanentAddress}
                             name="permanentAddress"  placeholder="Permanent Address" />
                             {<span className="error">
                                {this.state.errors.permanentAddress}
                            </span>}
                        </div> : ''}
                        {this.state.permanentAddrDefault ? <div>

                     <div className="form-group">
                <label>  Permanent  Address</label>
                <input type="text" className="form-control" name  ="permanentAddress"    onChange ={this.onChange} maxLength={30}/>
                <span className="error">{this.state.errors.address}</span>
                  </div>

                          <div  className="row">



                    <div className="col-md-6">
                            <label>Country Name</label>
                           <select   className ="form-control"  name="countryId"         defaultValue='no-value'  onChange={this.onChangeCountry} >
                        <    DefaultSelect/>
                            {this.getDrop1(this.props.locationMasterReducer)}
                        </select>
                           {!this.state.countryId?<span  className="error">{this.state.errors.countryId}</span>:''}
                    </div>



                    <div className="col-md-6">
                        <label>State Name</label>
                        <select  className ="form-control"   defaultValue='no-value'  name="stateId" onChange={this.onChangeState}>
                               <DefaultSelect/>
                            {this.getDrop2(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.stateId?<span  className="error">{this.state.errors.stateId}</span>:''}
                    </div>
                          </div>

                          <div className="row">
                      <div  className="col-md-6">
                        <label>City Name</label>
                        <select  className ="form-control"  defaultValue='no-value'  name="cityId" onChange={this.onChangeCity} >
                            <DefaultSelect/>
                            {this.getDrop3(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.cityId?<span  className="error">{this.state.errors.cityId}</span>:''}
                     </div>
                     <div  className="col-md-6" >
                        <label>location</label>
                        <select  className ="form-control"  name="locationId" defaultValue='no-value'  onChange={this.onLocationChange} >
                             <DefaultSelect/>
                            {this.getDrop4(this.props.locationMasterReducer)}
                        </select>
                        {!this.state.locationId?<span  className="error">{this.state.errors.locationId}</span>:''}
                      </div>
                     </div>
</div>:''} */}
<FormGroup style={{paddingTop:'20px'}}>
                        <h4 style={{textAlign:'center',  fontWeight:'600', marginBottom:'20px'}}>Permanent Address</h4>
                        <FormGroup>
                            <Row md={12}>
                                <Col md={3}>
                                    <Label>Country</Label>
                                    <Select  placeholder={<DefaultSelect/>}  options={this.countryName(this.props.societyReducer)}  onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')}  />
                                </Col>
                                <Col md={3}>
                                    <Label>State</Label>
                                    <Select  placeholder={<DefaultSelect/>}  options={this.stateName(this.props.societyReducer)}  onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                                </Col>
                                <Col md={3}>
                                    <Label>City</Label>
                                    <Select  placeholder={<DefaultSelect/>}  options={this.cityName(this.props.societyReducer)}  onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                                </Col>
                                <Col md={3}>
                                    <Label>Location</Label>
                                    <Select  placeholder={<DefaultSelect/>}  options={this.locationName(this.props.societyReducer)}  onChange={this.onChangeLocation.bind(this, 'locationName',  'locationId')} />
                                </Col>
                            </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row md={12}>
                            <Col md={4}>
                                <Label>Pin/Zip Code</Label>
                                <Input type="text" onChange={this.pinChange1}
                                maxLength="6" minLength="5"  onKeyPress={this.OnKeyPresshandlerPhone}
                                    name="pin1" placeholder="Pin/Zip Code" />
                                    <span  className="error">{this.state.errors.pin1}</span>
                            </Col>
                            <Col md={8}>
                                <Label>Address</Label>
                                <Input id="currentAddress"
                                disabled={!(this.state.countryId &&  this.state.stateId
                                    && this.state.cityId)}
                                type="textarea"
                                placeholder="Permanent Address"
                                name="permanentAddressDefault"
                                onChange={this.permanentAddressChange}
                                maxLength='250' />
                                { <span  className="error">{this.state.errors.permanentAddressDefault}</span> }
                            </Col>
                        </Row>
                </FormGroup>
                    </FormGroup>

                    <FormGroup style={{paddingTop:'20px'}}>
                        <h4 style={{textAlign:'center',  fontWeight:'600', marginBottom:'20px'}}>Current Address</h4>
                        <FormGroup>
                            <span style={{fontWeight:'600'}}>Is Your  Current address same as above?</span><Input type="checkbox"  onChange={this.sameAddress} name="isChecked" id="isChecked"  className="ml-3" />
                        </FormGroup>
                        {this.state.currentAddressVisible ? <FormGroup>
                            <Label>Current Address</Label>
                            <Input type="textarea" id="currenttaddr"  disabled maxLength="500" value={this.state.permanentAddress}  name="defaultCurrentAddress" onChange={this.defaultCurrentAddress} />
                        </FormGroup> : ''}
                        {this.state.editCurrent ? <div>
                            <FormGroup>
                                <Row md={12}>
                                    <Col md={3}>
                                        <Label>Country</Label>
                                        <Select  placeholder={<DefaultSelect/>}  options={this.countryName1(this.props.societyReducer)}  onChange={this.countryChange.bind(this, 'currentCountry',  'currentCountryId')} />
                                    </Col>
                                    <Col md={3}>
                                        <Label>State</Label>
                                        <Select  placeholder={<DefaultSelect/>}  options={this.stateName1(this.props.societyReducer)}  onChange={this.stateChange.bind(this, 'currentState',  'currentStateId')} />
                                    </Col>
                                    <Col md={3}>
                                        <Label>City</Label>
                                        <Select  placeholder={<DefaultSelect/>}  options={this.cityName1(this.props.societyReducer)}  onChange={this.cityChange.bind(this, 'currentCity', 'currentCityId')} />
                                    </Col>
                                    <Col md={3}>
                                        <Label>Location</Label>
                                        <Select  placeholder={<DefaultSelect/>}  options={this.locationName1(this.props.societyReducer)}  onChange={this.locationChange.bind(this, 'currentLocation',  'currentLocationId')} />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup>
                                <Row md={12}>
                                    <Col md={4}>
                                        <Label>Pin/Zip Code</Label>
                                        <Input type="text"  onChange={this.pinChange}
                                        maxLength="6" minLength="5"  onKeyPress={this.OnKeyPresshandlerPhone}
                                            name="pin"  placeholder="Pin/Zip Code" />
                                        <span  className="error">{this.state.errors.pin}</span>
                                    </Col>
                                    <Col md={8}>
                                        <Label>Address</Label>
                                        <Input id="currenttaddr"
                                        type="textarea"
                                         disabled={!(this.state.currentCountryId && this.state.currentStateId  && this.state.currentCityId)}
                                        placeholder="Current Address"
                                        name="currentAddressDefault"
                                        onChange={this.currentAddressChange}
                                        maxLength='250' />
                                        {<span  className="error">{this.state.errors.currentAddressDefault}</span> }
                                    </Col>
                                </Row>
                            </FormGroup>
                        </div> : ''}
                    </FormGroup>



        <div className="form-group">
          <label> Employment  Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            onChange={this.onChange}
            />
          <span className="error">{this.state.errors.startDate}</span>
        </div>



          <div className ="row">
          <div className=" input-contain  col-md-4">
          <label> upload your ID</label>
         <input  accept='.docx ,.doc,application/pdf' type="file"   name ="documentOne" onChange={this.onFileChange}/>
        <span className="error">{this.state.errors.documentOne}</span>
        </div>



        <div  className="input-contain  col-md-1">
        <label> upload your ID</label>
        <input  accept='.docx,application/pdf' type="file" name  ="documentTwo" onChange={this.FileChange}/>
        <span className="error">{this.state.errors.documentTwo}</span>
        </div>
        </div>
<div style={{paddingTop:"30px"}}>
  <button className="btn btn-success mr-2">Submit</button>
  <button className="btn btn-danger"  onClick  ={this.displayEmployee}>Cancel</button>
  </div>
  </div>
  </form>







    return(
        <div  >
            <UI   onClick ={this.logout } change={this.changePassword}>



  {!this.state.loading ? formData: <Spinner />}

        </UI>
        </div>

    )
}

}

function mapStateToProps(state){
    console.log("location", state)
 return {
     empDetails:state.empDetails,
     locationMasterReducer : state.locationMasterReducer,
     employeeDetails:state.employeeDetails,
     societyReducer: state.societyReducer

 }
}
function mapDispatchToProps(dispatch){
    return  bindActionCreators({AddEmployee,getCountry,getState,getCity,getLocation,getEmployee,getEmployeeType,getEmployeeWorkType},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeMaster)