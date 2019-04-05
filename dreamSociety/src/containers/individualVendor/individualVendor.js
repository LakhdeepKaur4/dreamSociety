import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addVendor} from './../../actionCreators/individualVendorAction';
import {getCountry,getState,getCity, getLocation} from '../../actionCreators/societyMasterAction';
import {getServiceType} from './../../actionCreators/serviceMasterAction';
import {getRateType} from './../../actionCreators/vendorMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label, Row, Col } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from './../../constants/defaultSelect';
import _ from 'underscore';


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
            countryId:'',
            stateId:'',
            cityId:'',
            locationId:'',
            currentAddress:'',
            currentAddressInfo:'',
            permanentAddress:'',
            permanentPinCode:'',
            email:'',
            contact:'',
            serviceId:'',
            rateId:'',
            rate:'',
            startTime:'',
            endTime:'',
            startTime1:'',
            endTime1:'',
            startTime2:'',
            endTime2:'',
            profilePicture:'',
            documentOne:'',
            documentTwo:'',
            fileName1:'',
            fileName2:'',
            fileName3:'',
            errors:{},
            emailValidError:''
           
        }
    }


    componentDidMount=()=>{
        this.refreshData()     
    }

    refreshData=()=>{
         this.props.getCountry().then(() => this.setState({loading: false}));
         this.props.getState().then(() => this.setState({loading: false}));
         this.props.getCity().then(() => this.setState({loading: false}));
         this.props.getLocation().then(() => this.setState({loading: false}));
         this.props.getServiceType().then(() => this.setState({loading: false}));
         this.props.getRateType().then(() => this.setState({loading: false}));
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
        const pattern = /^[a-zA-Z0-9_, -]+$/;
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

    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    
    emailChange = (e) => {
   
        this.setState({email:e.target.value})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        
    }


    

    FileChange=(event)=>{

        const files = event.target.files;
        const file = files[0];
        const fileName1=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                profilePicture :
                  reader.result,
                  fileName1
              })
           
          };
        }  
    }

    FileChange1=(event)=>{

        const files = event.target.files;
        const file = files[0];
        const fileName2=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                documentOne :
                  reader.result,
                  fileName2
              })
           
          };
        }  
    }

    
    FileChange2=(event)=>{
        // this.setState({ documentTwo : event.target.files[0]})
        const files = event.target.files;
        const file = files[0];
        const fileName3=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                documentTwo :
                  reader.result,
                  fileName3
              })
           
          };
        }  
    }

      onChangeCurrentAddress=(event)=>{
           this.setState({
               currentAddressInfo: event.target.value, 
               currentAddress: this.state.currentAddressInfo+ ','+ this.state.locationName+','+this.state.cityName+','+this.state.stateName+','+this.state.countryName+'-'+this.state.permanentPinCode

           },function(){
               console.log(this.state.currentAddress)
           })
           
      }


      onChange=(e) =>{
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
    onChangeCountry= (event)=>{
        this.onChange(event);
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
        this.onChange(event);
      
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
        this.onChange(event);
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

    onChangeLocation= (event)=>{
        this.onChange(event);
         let selected= event.target.value
        var data3 = _.find(this.props.societyReducer.locationResult,function(obj){
            return obj.locationName === selected
            })

            this.setState({
                locationName:data3.locationName,
                locationId:data3.locationId
            })

            // this.props.getSociety(data3.locationId)
  
    }



    
    countryName({countryResult}){
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

    stateName({stateResult}){
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

    locationName({locationResult}){
        if(locationResult){
          
           return( 
            locationResult.map((item) =>{ 
                   return(
                       <option key={item.locationId} value={item.locationName}>
                        {item.locationName}
                       </option>
                   )
               })
           )
            
        }
    }

    service({item}){
        if(item){
           return( 
            item.map((item) =>{ 
                   return(
                       <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName}
                       </option>
                   )
               })
           )
            
        }
    }

    rateTypeDetail({rate}){
        if(rate){
            console.log(rate)
          
           return( 
            rate.rate.map((item) =>{ 
                   return(
                       <option key={item.rateId} value={item.rateId}>
                        {item.rateType}
                       </option>
                   )
               })
           )
            
        }
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        if(!this.state.firstName) {
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

        else if(this.state.permanentPinCode.length !== 6) {
            errors.permanentPinCode = "Pin Code must be 6 digits"
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

        else if(this.state.contact.length !== 10){
            errors.contact="Contact No. must be 10 digits"
        }

        else if(this.state.serviceId ==='') {
            errors.serviceId = "cant be empty"
        }

        else if(this.state.rateId ==='') {
            errors.rateId = "cant be empty"
        }

        else if(this.state.rate ==='') {
            errors.rate = "cant be empty"
        }

        else if(this.state.startTime ==='') {
            errors.startTime = "cant be empty"
        }

        else if(this.state.endTime ==='') {
            errors.endTime= "cant be empty"
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
        
        const isValid= Object.keys(errors).length === 0;

        console.log("submitted-----------------", this.state);
             if(isValid){
                
                this.props.addVendor(this.state).then(()=>this.props.history.push('/superDashboard/individualVendorDetail'))
             }
    }

     
    dashbordPage=()=>{
        this.props.history.push('/superDashboard/individualVendorDetail');
    }

    render(){
          let formData=<div>
            <FormGroup>
                <Label>First Name</Label>
                <Input  type="text" name="firstName" placeholder="firstname" onChange={this.onChange} onKeyPress={this.OnKeyPressUserhandler} maxLength={50}></Input>
                <span className='error'>{this.state.errors.firstName}</span>  
            </FormGroup>
           
            <FormGroup>
                <Label>Last Name</Label>
                <Input  type="text" name="lastName" placeholder="lastname" onChange={this.onChange} onKeyPress={this.OnKeyPressUserhandler} maxLength={50}></Input> 
                <span className='error'>{this.state.errors.lastName}</span> 
            </FormGroup>
          
            
            <Row form>
            <Col md={6}>
            <FormGroup>
            <Label>Country Name</Label>
            <Input type="select" defaultValue='no-value' name="countryName" onChange={this.onChangeCountry}>
                <DefaultSelect/>
                {this.countryName(this.props.societyReducer)}    
            </Input>
            <span className='error'>{this.state.errors.countryName}</span>
            </FormGroup>
            </Col>
            
                <Col md={6}>
            <FormGroup>
                <Label>State Name</Label>
                <Input type="select" defaultValue='no-value' name="stateName" onChange={this.onChangeState} >
            <DefaultSelect/>
                    {this.stateName(this.props.societyReducer)}        
                </Input>
                <span className='error'>{this.state.errors.stateName}</span>
            </FormGroup>
            </Col>
            </Row>
            
            <Row form>
                <Col md={6}>
            <FormGroup>
                <Label>City Name</Label>
                <Input type="select" defaultValue='no-value' name="cityName" onChange={this.onChangeCity} >
            <DefaultSelect/>
                    {this.cityName(this.props.societyReducer)}  
                </Input>
                <span className='error'>{this.state.errors.cityName}</span>
            </FormGroup>
            </Col>
            
            <Col md={6}>
            <FormGroup>
                <Label>Location Name</Label>
                <Input type="select" defaultValue='no-value' name="locationName" onChange={this.onChangeLocation}  >
                <DefaultSelect/>
                    {this.locationName(this.props.societyReducer)}
                </Input>
                <span className='error'>{this.state.errors.locationName}</span>
            </FormGroup>
            
            </Col>
            </Row>
            <FormGroup>
                <Label>Pin Code</Label>
                <Input type="text" placeholder="Enter Pin Code " name="permanentPinCode" onChange={this.onChange} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={6}/>
            </FormGroup> 
            <FormGroup>
                <Label>Current Address</Label>
                <Input  type="textarea" name="currentAddressInfo" id="currentAddressInfo"  placeholder="Current Address"  onKeyPress={this.keyPress}  onChange={this.onChangeCurrentAddress} ></Input>
                <span className='error'>{this.state.errors.currentAddress}</span>  
            </FormGroup>
         
            <FormGroup>
                    Is Your permanent address same as above?<Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
            </FormGroup>
            <FormGroup>
                <Label>Permanent Address</Label>
                <Input id="permanentaddr"  type="textarea" name="permanentAddress" placeholder="Permanent Address"  onChange={this.onChange}></Input>
                <span className='error'>{this.state.errors.permanentAddress}</span>  
            </FormGroup>
          
            <Row form>
            <Col md={6}>
            <FormGroup>
                <Label>Email Id</Label>
                <Input placeholder="Email Id" type="email" name="email" maxLength={200} onChange={this.emailChange}
                        onKeyPress={this.emailValid}/>
                     {!this.state.email ? <span className="error">{this.state.errors.email}</span> : ''}
                            <span className="error">{this.state.emailValidError}</span>
            </FormGroup>
            </Col>


            <Col md={6}>
            <FormGroup>
                <Label>Contact No.</Label>
                {/* <Input placeholder="Contact No." type="text" name="contact" value={this.state.contact} onChange={this.onChange} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10}/> */}
                <Input placeholder="Contact No." type="text" name="contact"  onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.onChange} maxLength={10}/>
                <span className='error'>{this.state.errors.contact}</span>
                </FormGroup>
                </Col>
                </Row>
                <Row form>
                <Col md={5}>
                <FormGroup>
                <Label>Service Type</Label>
                <Input type="select" defaultValue='no-value' name="serviceId" onChange={this.onChange}>
                    <DefaultSelect/>
                    {this.service(this.props.displayServiceMasterReducer)}
                </Input>
                <span className='error'>{this.state.errors.serviceId}</span>
                </FormGroup>
                </Col>
                
                <Col md={4}>
                <FormGroup>
                    <Label>Rate Type</Label>
                    <Input type="select" defaultValue='no-value' name="rateId" onChange={this.onChange}>
                    <DefaultSelect/>
                    {this.rateTypeDetail(this.props.vendorMasterReducer)}
                    </Input>
                    <span className='error'>{this.state.errors.rateId}</span>
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup>
                    <Label>Rate</Label>
                    <Input type="text" name="rate" placeholder="Service Rate" onChange={this.onChange}></Input>
                    <span className='error'>{this.state.errors.rate}</span>
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>Slot 1</Label>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="time"  name="startTime" onChange={this.onChange} >
                    <span className='error'>{this.state.errors.startTime}</span>
                    </Input>
                   
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime" onChange={this.onChange}>
                    <span className='error'>{this.state.errors.endTime}</span>
                    </Input>
                    
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>Slot 2</Label>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="time"  name="startTime1" onChange={this.onChange}>
                    </Input>
                    
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime1" onChange={this.onChange}>
                    </Input>
                   
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>Slot 3</Label>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="time"  name="startTime2" onChange={this.onChange} >
                    </Input>
                   
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime2" onChange={this.onChange} >
                    </Input>
                    
                </FormGroup>
                </Col>
                </Row>

                <FormGroup>
                <Label>Upload Your Picture</Label>
                    <Input type="file" name="profilePicture" accept="image/*" onChange={this.FileChange} />
                    <span className="error">{this.state.errors.profilePicture}</span>     
                </FormGroup>

                <FormGroup>
                <Label>Document 1</Label>
                    <Input type="file" name="documentOne" accept="image/*" onChange={this.FileChange1} />
                    <span className="error">{this.state.errors.documentOne}</span>     
                </FormGroup>

                <FormGroup>
                <Label>Document 2</Label>
                    <Input type="file" name="documentTwo" accept="image/*" onChange={this.FileChange2} />
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
    IndividualVendorReducer: state.IndividualVendorReducer,
    societyReducer : state.societyReducer,
    displayServiceMasterReducer :state.displayServiceMasterReducer,
    vendorMasterReducer : state.vendorMasterReducer
 }

}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({addVendor, getCountry,getState,getCity, getLocation, getServiceType, getRateType }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(IndividualVendor));

