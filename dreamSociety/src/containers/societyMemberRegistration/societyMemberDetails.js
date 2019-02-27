import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import SocietyComponent from '../../components/societyComponent/societyComponent';
import { Form, FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { connect } from 'react-redux';
import _ from 'underscore';
import {getCountry,getState,getCity, getLocation} from '../../actionCreators/societyMasterAction';
import {getMemberDetails,getSocietyId, getMemberDesignation,updateSocietyMemberDetails} from '../../actionCreators/societyMemberRegistrationAction';


class SocietyMemberDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            societyId:'',
            societyMemberId:'',
            societyName:'',
            societyMemberName:'',
            designationName:'',
            countryName:'',
            stateName:'',
            cityName:'',
            locationName:'',
            currentAddress:'',
            permanentAddress:'',
            contactNumber:'',
            email:'',
            bankName:'',
            IFSCCode:'',
            accountNumber:'',
            dob:'',
            designationId:'',
            countryId:'',
            stateId:'',
            cityId:'',
            locationId:'',
            ids: [],
            isDisabled: true,
            editSocietyMember: false
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData(){
        this.props.getSocietyId();
        this.props.getMemberDetails();
        this.props.getMemberDesignation();
        this.props.getCountry();
        this.props.getState();
        this.props.getCity();
        this.props.getLocation(); 
    }

    editMember(societyId,societyMemberId,societyName,societyMemberName,designationName,countryName,stateName,cityName,
        locationName,currentAddress,permanentAddress,
        contactNumber,email,bankName,
        accountNumber,panCardNumber,dob,designationId,countryId,stateId,cityId,locationId){
        console.log(societyId,societyMemberId,societyName,societyMemberName,designationName,countryName,stateName,cityName,
            locationName,currentAddress,permanentAddress,
            contactNumber,email,bankName,
            accountNumber,panCardNumber,dob,designationId,countryId,stateId,cityId,locationId)
        this.setState({societyId,societyMemberId,societyName,societyMemberName,designationName,countryName,stateName,cityName,
            locationName,currentAddress,permanentAddress,
            contactNumber,email,bankName,
            accountNumber,panCardNumber,dob,designationId,countryId,stateId,cityId,locationId,editSocietyMember: !this.state.editSocietyMember});
    }

    fetchMemberDetails = ({memberDetails}) => {
        if(memberDetails){
            return memberDetails.societyMember.map((item, index) => {
                return (
                    <tr key={item.societyMemberId}>
                        <td><input type="checkbox" name="ids" className="SelectAll"  value={item.societyMemberId}
                         onChange={(e) => {
                            let {societyMemberId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyMemberId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, societyMemberId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }  
                             }}/></td>
                        <td>{index + 1}</td>
                        <td>{item.society_master.societyName}</td>
                        <td>{item.societyMemberName}</td>
                        <td>{item.designation_master.designationName}</td>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.state_master.stateName}</td>
                        <td>{item.city_master.cityName}</td>
                        <td>{item.location_master.locationName}</td>
                        <td>{item.currentAddress}</td>
                        <td>{item.permanentAddress}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.email}</td>
                        <td>{item.bankName}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.panCardNumber}</td>
                        <td>{item.dob}</td>
                        <td>
                            <Button color="success" className="mr-2" onClick={this.editMember.bind(this,
                                item.societyId,
                                item.societyMemberId,
                                item.society_master.societyName,item.societyMemberName,item.designation_master.designationName,
                                item.country_master.countryName,
                                item.state_master.stateName,
                                item.city_master.cityName,
                                item.location_master.locationName,
                                item.currentAddress,
                                item.permanentAddress,
                                item.contactNumber,
                                item.email,item.bankName,item.accountNumber,item.panCardNumber,item.dob,
                                item.designation_master.designationId,
                                item.country_master.countryId,item.state_master.stateId,
                                item.city_master.cityId,
                                item.location_master.locationId
                                )} >Edit</Button>
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }

    route = () => {
        return this.props.history.replace('/superDashboard/societyMemberRegistartionForm');
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value));
                    selectMultiple[i].checked = true;
            }
            this.setState({ids: ar});
            if(ar.length > 0){
                this.setState({isDisabled: false});
            }
    }

    unSelectAll = () =>{
        
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for(var i = 0; i < unSelectMultiple.length; i++){
                unSelectMultiple[i].checked = false
        }
        
        this.setState({ids: [ ...allIds]});
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
        
    }

    deleteSelected = id => e => {
        e.preventDefault()
        console.log(id);
    }

    toggleEditSocietyMember(){
        this.setState({editSocietyMember: !this.state.editSocietyMember})
    }

    onChange = (e) => {
        console.log(this.state);
        this.setState({[e.target.name]: e.target.value})
    }

    fetchSocietyId = ({societyId}) => {
        if(societyId){
            return societyId.map((item) => {
                return (
                    <option value={item.societyId} key={item.societyId}>{item.societyName}</option>
                )
            })
        }
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

     update = (e) => {
        e.preventDefault();
         let {societyId,countryId,stateId,cityId,
            locationId,currentAddress,permanentAddress,
            contactNumber,email,bankName,
            accountNumber,panCardNumber,dob,societyMemberId} = this.state;
        this.props.updateSocietyMemberDetails(societyId,countryId,stateId,cityId,
            locationId,currentAddress,permanentAddress,
            contactNumber,email,bankName,
            accountNumber,panCardNumber,dob,societyMemberId)
            .then(() => this.refreshData());
        this.setState({editSocietyMember: !this.state.editSocietyMember})
     }

    render(){
        let deleteSelectedButton = <Button
         disabled={this.state.isDisabled}
         color="danger"
        className="mb-3"
        onClick={this.deleteSelected(this.state.ids)}>Delete Selected</Button>
        return(
            <UI>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Society Member Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Society Member</Button>
                    </div>
                    <Modal isOpen={this.state.editSocietyMember} toggle={this.toggleEditSocietyMember.bind(this)}>
                        <ModalHeader toggle={this.toggleEditSocietyMember.bind(this)}>Edit Society Member Details</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Society Name</Label>
                                <Input name="societyId" type="select" onChange={this.onChange} >
                                    <option>{this.state.societyName}</option>
                                    <DefaultSelect />
                                    {this.fetchSocietyId(this.props.societyMemberReducer)}
                                 </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Society Member Name</Label>
                                <Input name="societyMemberName" type="text" value={this.state.societyMemberName} 
                                    onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Designation</Label>
                                <Input name="designationId" type="select" onChange={this.onChange} >
                                    <option>{this.state.designationName}</option>
                                    <DefaultSelect />
                                    {this.fetchDesignation(this.props.societyMemberReducer)}
                                 </Input>
                            </FormGroup>
                            {/* <SocietyComponent onChangeCountry={this.onChangeCountry}
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
                                /> */}
                             <FormGroup>
                                <Label>Country Name</Label>
                                <Input type="select" name="countryId"  onChange={this.onChangeCountry} required>
                                    <option>{this.state.countryName}</option>
                                    <DefaultSelect />
                                    {this.countryName(this.props.societyReducer)}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label>State Name</Label>
                                <Input type="select" name="stateId"   onChange={this.onChangeState} required>
                                    <option>{this.state.stateName}</option>
                                    <DefaultSelect/>
                                    {this.stateName(this.props.societyReducer)}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label>City Name</Label>
                                <Input type="select" name="cityId"  onChange={this.onChangeCity} required>
                                    <option>{this.state.cityName}</option>
                                    <DefaultSelect/>
                                    {this.cityName(this.props.societyReducer)}  
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label>Location Name</Label>
                                <Input type="select" name="locationId"  onChange={this.onChangeLocation} required>
                                    <option>{this.state.locationName}</option>
                                    <DefaultSelect/>
                                    {this.locationName(this.props.societyReducer)}  
                                </Input>
                            </FormGroup>  
                            <FormGroup>
                                <Label>Current Address</Label>
                                <Input onKeyPress={this.keyPress} 
                                value={this.state.currentAddress} 
                                type="textarea" 
                                placeholder="Current Address" 
                                name="currentAddress" 
                                onChange={this.onChange}
                                maxLength='150' />
                                
                            </FormGroup>
                            <FormGroup >
                                <Label>Permanent Address</Label>
                                <Input type="textarea" 
                                value={this.state.permanentAddress} 
                                placeholder="Permanent Address" 
                                name="permanentAddress" 
                                onChange={this.onChange}
                                maxLength='150' />
                            </FormGroup>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input placeholder="Contact Number"
                                type="text"
                                name="contactNumber" 
                                onChange={this.onChange}
                                value={this.state.contactNumber}
                                onKeyPress={this.OnKeyPresshandlerPhone}
                                maxLength='10'
                                minLength='10' />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input 
                                placeholder="Email" 
                                type="email" 
                                value={this.state.email}
                                name="email" 
                                onChange={this.onChange}
                                onKeyPress={this.emailValid} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Bank Name</Label>
                                <Input 
                                placeholder="Bank Name" 
                                type="text" 
                                name="bankName" 
                                onChange={this.onChange}
                                value={this.state.bankName}
                                onKeyPress={this.bankValidation} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Account Number</Label>
                                <Input
                                placeholder="Account Number" 
                                type="text" 
                                name="accountNumber"
                                value={this.state.accountNumber} 
                                onChange={this.onChange}
                                maxLength='14'
                                onKeyPress={this.OnKeyPresshandlerPhone} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Pan Card Number</Label>
                                <Input 
                                className="TextTransformToCapital" 
                                placeholder="Pan Card Number"
                                type="text"
                                name="panCardNumber"
                                value={this.state.panCardNumber}
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
                            </FormGroup>
                            <FormGroup>
                                <Label>Date of Birth</Label>
                                <Input type="date" name="dob" value={this.state.dob} onChange={this.onChange} />
                            </FormGroup>  
                            <FormGroup>
                                    <Button type="submit" color="primary" onClick={this.update}>Save</Button>{' '}
                                    <Button color="danger" onClick={this.toggleEditSocietyMember.bind(this)}>Cancel</Button>
                            </FormGroup>
                        </ModalBody>
                    </Modal>
                    {deleteSelectedButton}
                    <Table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{alignContent:'baseline'}}>Select All<input
                                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                                    if(e.target.checked) {
                                        this.selectAll();
                                    }
                                    else if(!e.target.checked){
                                        this.unSelectAll();
                                    } 
                                }}/></th>
                                <th>#</th>
                                <th>Society Name</th>
                                <th>Member Name</th>
                                <th>Designation</th>
                                <th>Country Name</th>
                                <th>State Name</th>
                                <th>City Name</th>
                                <th>Location Name</th>
                                <th>Current Address</th>
                                <th>Permanent Address</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Bank Name</th>
                                <th>Account Number</th>
                                <th>Pan No.</th>
                                <th>Date of Birth</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.fetchMemberDetails(this.props.societyMemberReducer)}
                        </tbody>
                    </Table>
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        societyReducer: state.societyReducer,
        societyMemberReducer: state.societyMemberReducer  
    }
}

export default connect(mapStateToProps, { getMemberDetails, getSocietyId, getMemberDesignation,
    getCountry,getState,getCity, getLocation, updateSocietyMemberDetails })(SocietyMemberDetails);