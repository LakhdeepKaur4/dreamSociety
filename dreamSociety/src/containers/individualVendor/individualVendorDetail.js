import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import {DocURN, PicURN } from '../../actions/index'
import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { getIndividualVendor, deleteIndividualVendor, deleteSelectVendor, updateIndividualVendor } from './../../actionCreators/individualVendorAction';
import { getCountry, getState, getCity, getLocation } from '../../actionCreators/societyMasterAction';
import { getServiceType } from './../../actionCreators/serviceMasterAction';
import { getRateType } from './../../actionCreators/vendorMasterAction';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label, Col, Row } from 'reactstrap';
import _ from 'underscore';
import Select from 'react-select';
import GoogleDocsViewer from 'react-google-docs-viewer';




class IndividualVendorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
                firstName: '',
                lastName: '',
                countryName: '',
                stateName: '',
                cityName: '',
                locationName: '',
                countryId: '',
                stateId: '',
                cityId: '',
                locationId: '',
                currentAddress: '',
                permanentAddress: '',
                email: '',
                contact: '',
                serviceId: '',
                rateId: '',
                rate: '',
                startTime: '',
                endTime: '',
                startTime1: '',
                endTime1: '',
                startTime2: '',
                endTime2: '',
                profilePicture: '',
                documentOne: '',
                documentTwo: '',
                fileName1: '',
                fileName2: '',
                fileName3: '',
                isActive: false,

            
            userPermanent: false,
            editPermanent: false,
            message: '',
            filterName: "firstName",
            menuVisible: false,
            search: '',
            modal: false,
            modal1:false,
            modalIsOpen: false,
            loading: true,
            errors: {},
            ids: [],

            isDisabled: true,


        };
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


    FileChange1=(event)=>{

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
  FileChange2=(event)=>{

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

FileChange3=(event)=>{

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

editPermanentAddress = () => {
    if (!!document.getElementById('isChecked').checked) {
        console.log('is checked')
        //    this.setState({permanentAddress: this.state.currentAddress, permanentAddressVisible:true, editPermanent:false})
        this.setState({ editPermanent: true, permanentAddress: '', userPermanent: true, countryId:'',stateId:'',
    cityId:'', locationId:'' })
    }
    else {
        // this.setState({permanentAddress: '' , permanentAddressVisible:false, editPermanent:true})
        this.setState({ editPermanent: false, permanentAddress: this.state.readOnlyPermanent, userPermanent: false,
        countryId:this.state.readOnlyCountryId, stateId:this.state.readOnlyStateId, cityId:this.state.readOnlyCityId,
    locationId: this.state.readOnlyLocationId })
    }
}
    onChangeHandler = (event) => {
        this.setState({ message: '' })
        this.setState({
            [event.target.name]: event.target.value

        })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z -]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    toggles=()=>{
         this.setState({ modal: !this.state.modal })
    }


    toggle = (individualVendorId, profilePicture,firstName, lastName,email, contact,currentAddress, permanentAddress,documentOne,documentTwo,rate, serviceId, rateId, startTime, endTime,startTime1, endTime1, startTime2, endTime2, fileName1, fileName2, fileName3 ) => {

        this.setState({
            individualVendorId, profilePicture,firstName, lastName,email, contact,currentAddress, permanentAddress,documentOne,documentTwo,rate,serviceId, rateId,startTime, endTime,startTime1, endTime1, startTime2, endTime2,fileName1, fileName2, fileName3,
            modal: !this.state.modal
        })
    }
    toggle1() {
        this.setState({ modal1: false });
    }


    toggleModal1() {
        this.setState({  modal: !this.state.modal });
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    openModal = (documentOne) => {
        this.setState({
            documentOne
        })
        this.setState( { modalIsOpen: true  });

    }

    Modal = (documentTwo) => {
        this.setState({
            documentTwo
        })
        this.setState({ modal1: true });

    }


    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getIndividualVendor().then(() => this.setState({ loading: false }))
        this.props.getCountry().then(() => this.setState({ loading: false }))
        this.props.getState().then(() => this.setState({ loading: false }))
        this.props.getCity().then(() => this.setState({ loading: false }))
        this.props.getServiceType().then(() => this.setState({ loading: false }))
        this.props.getRateType().then(() => this.setState({ loading: false }))

    }


    onKeyPressHandler1 = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    editVendorDetail = (e) => {
        e.preventDefault();
        const {individualVendorId, profilePicture,firstName, lastName,email, contact,currentAddress, permanentAddress,documentOne,documentTwo,rate, serviceId, rateId,startTime, endTime,startTime1, endTime1, startTime2, endTime2, fileName1,fileName2,fileName3 } = this.state

        let errors = {};

        if(this.state.contact.length !== 10){
            errors.contact="Contact No. must be 10 digits"
        }

        else if(this.state.email ==='') {
            errors.email = "cant be empty"
        }

        this.setState({ errors })

        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            this.setState({
                loading: true
            })

            this.props.updateIndividualVendor(individualVendorId, profilePicture,firstName, lastName,email, contact,currentAddress, permanentAddress,documentOne,documentTwo,rate, serviceId, rateId,startTime, endTime,startTime1, endTime1, startTime2, endTime2,fileName1,fileName2,fileName3)
                .then(() => this.refreshData())
                .catch(err=>{ console.log(err.response.data.message)
                    this.setState({message: err.response.data.message, loading: false})
                    })
            this.setState({
                individualVendorId, profilePicture,firstName, lastName,email, contact,currentAddress, permanentAddress,documentOne,documentTwo,rate, serviceId, rateId ,startTime, endTime,startTime1, endTime1, startTime2, endTime2,fileName1,fileName2,fileName3,
                modal: !this.state.modal
            })

        }
    }

    deleteVendorDetail = (individualVendorId) => {
        let { isActive } = this.state
        this.setState({ loading: true })


        this.props.deleteIndividualVendor(individualVendorId, isActive)
            .then(() => this.refreshData())
        this.setState({ isActive: false  })

    }

    deleteSelected = (ids) => {
        this.setState({ loading: true, isDisabled: true });


        this.props.deleteSelectVendor(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);

    }





    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {

        return function (x) {
            console.log(x)
            return x.firstName.toLowerCase().includes(search.toLowerCase())  ||
            !search

        }
    }


    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if (ar.length > 0) {
            this.setState({ isDisabled: false });
        }
    }

    unSelectAll = () => {

        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }

    
    viewServices(individualVendorId){
        console.log(individualVendorId)
        localStorage.setItem('individualVendorId',individualVendorId)
        this.props.history.push('/superDashBoard/vendorServiceDetail')
    }




    renderVendor = ({ getVendor }) => {

        if (getVendor && getVendor.vendors) {
            console.log('getVendor', getVendor)
            return getVendor.vendors.sort((item1,item2)=>{
                var cmprVal = (item1.firstName && item2.firstName ) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                console.log(item)

                return (
                    <tr key={item.individualVendorId}  >
                        <td><input type="checkbox" className="SelectAll" name="ids" value={item.individualVendorId}
                            onChange={(e, i) => {
                                const { individualVendorId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    this.setState({ isChecked: false });
                                    let indexOfId = this.state.ids.indexOf(individualVendorId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, individualVendorId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td>{index + 1}</td>
                        <td style={{ width: "8%", height: "8%" }}> <img style={{ width: "100%", height: "15%" }} src={PicURN + item.profilePicture} alt="Profile Pic">
                        </img></td>
                        <td style={{ textAlign: "center", width: '10px', textTransform: 'capitalize' }}  >{item.firstName + ' ' + item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>

                        <td style={{ textAlign: "center" }}>{item.currentAddress}</td>
                        <td style={{ textAlign: "center" }}>{item.permanentAddress}</td>
                        <td><button className="btn btn-light" onClick={this.openModal.bind(this, item.documentOne)}>View Document</button></td>
                        <td><button className="btn btn-light" onClick={this.Modal.bind(this, item.documentTwo)}>View Document </button></td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewServices.bind(this,item.individualVendorId)}>View Services</button></td>   

                        <td>
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.individualVendorId, item.profilePicture,item.firstName, item.lastName,item.email, item.contact,item.currentAddress, item.permanentAddress, item.documentOne, item.documentTwo,item.rate, item.serviceId, item.rateId, item.startTime, item.endTime, item.startTime1, item.endTime1, item.startTime2, item.endTime2,item.fileName1, item.fileName2, item.fileName3)} >Edit</Button>
                            {/* <Button color="success mr-2">Edit</Button> */}

                            <Button color="danger" onClick={this.deleteVendorDetail.bind(this, item.individualVendorId)} >Delete</Button>
,

                        </td>
                    </tr>

                )

            })
        }
    }



    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }


    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }

    routeToAddNewVendor = () => {
        this.props.history.push('/superDashboard/individualVendor')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    close = () => {
        return this.props.history.replace('/superDashBoard')
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
        this.setState({permanentAddress: this.state.permanentAddressDefault  + ', ' + location + ', ' +
        this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin})
        console.log('updatePermanentAddress', this.state.permanentAddress)
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



    render() {

        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr  >
                        <th style={{ width: '4%' }}></th>
                        <th>#</th>
                        <th>Profile Picture</th>

                        <th onClick={() => { console.log("ahdgshgdjhsgd")
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'firstName'
                                }
                            });
                        }} >Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Current Address</th>
                        <th>Permanent Address</th>
                        <th>Document 1</th>
                        <th>Document 2</th>
                        <th>View Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderVendor(this.props.IndividualVendorReducer)}
                </tbody>
            </Table></div>

        let modalData = <div>
            <FormGroup>
                <Label>Upload Profile Pic</Label>
                <Input accept='image/*' style={{ display: 'inline-block' }} type="file" name="profilePic" onChange={this.FileChange1} />
            </FormGroup>
            <FormGroup>
                <Label>First Name</Label>
                <Input style={{ 'textTransform': 'capitalize' }} placeholder="First Name" maxLength={50} name='firstName' onKeyPress={this.onKeyPressHandler1} onChange={this.onChangeHandler} value={this.state.firstName} />
                <span className="error">{this.state.errors.ownerName}</span>
            </FormGroup>
            <FormGroup>
                <Label>Last Name</Label>
                <Input style={{ 'textTransform': 'capitalize' }} placeholder="Last Name" maxLength={50} name='lastName' onKeyPress={this.onKeyPressHandler1} onChange={this.onChangeHandler} value={this.state.lastName} />
                <span className="error">{this.state.errors.ownerName}</span>
            </FormGroup>
    
            <FormGroup>
                <Label>Contact Number</Label>
                <Input placeholder="Contact Number" onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={10} value={this.state.contact} onChange={this.onChangeHandler} name="contact" />
                <span className="error">{this.state.errors.contact}</span>
            </FormGroup>
            <FormGroup>
                <Label>Email </Label>
                <Input placeholder="Email" type='email' name='email'
                    onChange={this.emailChange}
                    onKeyPress={this.emailValid}
                    value={this.state.email} />
                {!this.state.email ? <span className="error">{this.state.errors.email}</span> : ''}
                            <span className="error">{this.state.emailValidError}</span>
            </FormGroup>
            
            <FormGroup>
                <Row md={12}>
                    {!this.state.editPermanent ? <Col md={6}>
                        <Label>Permanent Address</Label>
                        <Input type="textarea"
                            value={this.state.readOnlyPermanent}
                            placeholder="Permanent Address"
                            name="readOnlyPermanent" disabled
                            onChange={this.onChange}
                            maxLength='250' />
                        {/* {!this.state.permanentAddress ? <span className="error">{this.state.errors.permanentAddress}</span>: ''} */}
                    </Col> : ''}
                    {this.state.editPermanent ? <Col md={12} style={{ textAlign: 'center' }}><span style={{ fontWeight: '600' }}>Do you want to edit permanent address?</span><Input type="checkbox" onChange={this.editPermanentAddress} name="isChecked" id="isChecked" className="ml-3" /></Col> :
                        <Col md={6} style={{ paddingTop: '44px' }}><span style={{ fontWeight: '600' }}>Do you want to edit permanent<br /> address?</span><Input type="checkbox" onChange={this.editPermanentAddress} name="isChecked" id="isChecked" className="ml-3" /></Col>}
                </Row>
            </FormGroup>

            {this.state.userPermanent ? <div>
                <h4 style={{ textAlign: 'center', fontWeight: '600', textDecoration: 'underline' }}>Edit Permanent Address</h4>
                <FormGroup>
                    <Row md={12}>
                        <Col md={3}>
                            <Label>Country</Label>
                            <Select placeholder={<DefaultSelect />} options={this.countryName(this.props.societyReducer)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                        </Col>
                        <Col md={3}>
                            <Label>State</Label>
                            <Select placeholder={<DefaultSelect />} options={this.stateName(this.props.societyReducer)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                        </Col>
                        <Col md={3}>
                            <Label>City</Label>
                            <Select placeholder={<DefaultSelect />} options={this.cityName(this.props.societyReducer)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                        </Col>
                        <Col md={3}>
                            <Label>Location</Label>
                            <Select placeholder={<DefaultSelect />} options={this.locationName(this.props.societyReducer)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row md={12}>
                        <Col md={4}>
                            <Label>Pin/Zip Code</Label>
                            <Input type="text" onChange={this.pinChange1}
                                maxLength="6" minLength="5" onKeyPress={this.OnKeyPresshandlerPhone}
                                name="pin1" placeholder="Pin/Zip Code" />
                            <span className="error">{this.state.errors.pin1}</span>
                        </Col>
                        <Col md={8}>
                            <Label>Address</Label>
                            <Input id="currentAddress"
                                disabled={!(this.state.countryId && this.state.stateId
                                    && this.state.cityId)}
                                type="textarea"
                                placeholder="Permanent Address"
                                name="permanentAddressDefault"
                                onChange={this.permanentAddressChange}
                                maxLength='250' />
                            {<span className="error">{this.state.errors.permanentAddressDefault}</span>}
                        </Col>
                    </Row>
                </FormGroup> 
            
            </div> : ''}

               <FormGroup>
                <Label>Service Type</Label>
                        <Input type="select"  name="serviceId"  onChange={this.onChangeHandler} value={this.state.serviceId} >
                        <DefaultSelect/>
                        {this.service(this.props.displayServiceMasterReducer)}
                        </Input>
                        <span className="error">{this.state.errors.serviceId}</span>            
                </FormGroup>

                
                <FormGroup>
                    <Label>Rate Type</Label>
                    <Input type="select" defaultValue='no-value' name="rateId" onChange={this.onChangeHandler} value={this.state.rateId}>
                    <DefaultSelect/>
                    {this.rateTypeDetail(this.props.vendorMasterReducer)}
                    </Input>
                    <span className='error'>{this.state.errors.rateId}</span>
                </FormGroup>

                <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>Slot 1</Label>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="time"  name="startTime" onChange={this.onChangeHandler} value={this.state.startTime} >
                    <span className='error'>{this.state.errors.startTime}</span>
                    </Input>
                   
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime" onChange={this.onChangeHandler} value={this.state.endTime}>
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
                    <Input type="time"  name="startTime1" onChange={this.onChangeHandler} value={this.state.startTime1}>
                    </Input>
                    
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime1" onChange={this.onChangeHandler} value={this.state.endTime1}>
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
                    <Input type="time"  name="startTime2" onChange={this.onChangeHandler} value={this.state.startTime2}>
                    </Input>
                   
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime2" onChange={this.onChangeHandler} value={this.state.endTime2} >
                    </Input>
                    
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                   <Label>Document One</Label>
                   <Input accept='image/*' style={{ display: 'inline-block' }} type="file" name="documentOne" onChange={this.FileChange2} />
               </FormGroup>

               <FormGroup>
                   <Label>Document Two</Label>
                   <Input accept='image/*' style={{ display: 'inline-block' }} type="file" name="documentTwo" onChange={this.FileChange3} />
               </FormGroup>

            <FormGroup>
                <Button color="primary mr-2" onClick={this.editVendorDetail}>Save</Button>
                <Button color="danger" onClick={this.toggles}>Cancel</Button>
            </FormGroup>
        </div>
        return (
            <div>

                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Individual Vendor Details</h3>
                            <Button onClick={this.routeToAddNewVendor} color="primary">Add Vendor</Button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        <Button color="danger" className="mb-3" onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled} >Delete Selected</Button>
                        <Label htmlFor="allSelect" style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}>Select All<input className="ml-2"
                            id="allSelect"
                            type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    this.selectAll();
                                }
                                else if (!e.target.checked) {
                                    this.unSelectAll();
                                }
                            }
                            } /></Label>

                        {(this.state.loading) ? <Spinner /> : tableData}
                        {/* {tableData} */}



                    </div>

                    <Modal 
                                 isOpen={this.state.modalIsOpen} >
                                <ModalHeader toggle={this.toggleModal1.bind(this)}/>
                                <ModalBody style={{paddingLeft:"45px", paddingRight:"2px"}}>
                                    <GoogleDocsViewer
                                        width="400px"
                                        height="700px"
                                        fileUrl={DocURN+this.state.documentOne.replace('../../','')}/>
                                </ModalBody>
                                </Modal>

                                <Modal
                                    isOpen={this.state.modal1} >
                                <ModalHeader toggle={this.toggle1.bind(this)}/>
                                <ModalBody style={{paddingLeft:"45px", paddingRight:"2px"}}>
                                
                                    <GoogleDocsViewer
                                        width="400px"
                                        height="700px"
                                        fileUrl={DocURN+this.state.documentTwo.replace('../../','')}/>

                                </ModalBody>
                            </Modal>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state, "=============individual vendor")
    return {

        IndividualVendorReducer: state.IndividualVendorReducer,
        societyReducer: state.societyReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        vendorMasterReducer: state.vendorMasterReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getIndividualVendor, getCountry, getState, getCity, getLocation, getServiceType, getRateType, deleteIndividualVendor, deleteSelectVendor, updateIndividualVendor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualVendorDetail);