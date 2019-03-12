import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { connect } from 'react-redux';
import _ from 'underscore';
import SearchFilter from '../../components/searchFilter/searchFilter';
import {getCountry,getState,getCity, getLocation} from '../../actionCreators/societyMasterAction';
import {getMemberDetails,getSocietyId, getMemberDesignation,updateSocietyMemberDetails
,deleteSocietyMemberDetail, deleteMultipleSocietyMemberDetail} from '../../actionCreators/boardMemberRegistrationAction';
import Spinner from '../../components/spinner/spinner';


class BoardMemberDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            filterName:'societyBoardMemberName',
            societyId:'',
            societyBoardMemberId:'',
            societyName:'',
            societyBoardMemberName:'',
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
            errors: {},
            loading:true,
            editSocietyMember: false,
            emailValidError: '',
            search:'',
            modalLoading: false
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    refreshData(){
        this.props.getSocietyId().then(() => this.setState({loading:false}));;
        this.props.getMemberDetails().then(() => this.setState({loading:false}));;
        this.props.getMemberDesignation().then(() => this.setState({loading:false}));;
        this.props.getCountry().then(() => this.setState({loading:false}));;
        this.props.getState().then(() => this.setState({loading:false}));;
        this.props.getCity().then(() => this.setState({loading:false}));;
        this.props.getLocation().then(() => this.setState({loading:false}));; 
    }

    editMember(societyId,societyBoardMemberId,societyBoardMemberName,designationName,countryName,stateName,cityName,
        locationName,currentAddress,permanentAddress,
        contactNumber,email,bankName,
        accountNumber,panCardNumber,dob,designationId,countryId,stateId,cityId,locationId){
        this.setState({societyId,societyBoardMemberId,societyBoardMemberName,designationName,countryName,stateName,cityName,
            locationName,currentAddress,permanentAddress,
            contactNumber,email,bankName,
            accountNumber,panCardNumber,dob,designationId,countryId,stateId,cityId,locationId,editSocietyMember: !this.state.editSocietyMember});
        }

        searchFilter(search){
            console.log(search)
            return function(x){
                if(x){
                    return x.societyBoardMemberName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.designation_master.designationName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.country_master.countryName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.state_master.stateName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.city_master.cityName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.location_master.locationName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.currentAddress.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.permanentAddress.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.contactNumber.toString().indexOf(search.toString())  !== -1 ||
                    x.email.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.bankName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.accountNumber.toString().indexOf(search.toString())  !== -1 ||
                    x.panCardNumber.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    x.dob.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                    !search;
                }
            }
        }   

    fetchMemberDetails = ({memberDetails}) => {
        if(memberDetails){
            return memberDetails.societyBoardMember.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                return (
                    <tr key={item.societyBoardMemberId}>
                        <td><input type="checkbox" name="ids" className="SelectAll"  value={item.societyBoardMemberId}
                         onChange={(e) => {
                            let {societyBoardMemberId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyBoardMemberId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, societyBoardMemberId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }  
                             }}/></td>
                        <td>{index + 1}</td>
                        <td>{item.societyBoardMemberName}</td>
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
                                item.societyBoardMemberId,item.societyBoardMemberName,item.designation_master.designationName,
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
                            <Button color="danger" onClick={this.deleteSocietyMember.bind(this, item.societyBoardMemberId)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        } 
    }

    deleteSocietyMember(societyBoardMemberId) {
        this.setState({loading:true, isDisabled:true})
        this.props.deleteSocietyMemberDetail(societyBoardMemberId)
        .then(() => this.refreshData())
    }

    route = () => {
        return this.props.history.replace('/superDashboard/boardMemberRegistartionForm');
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

    deleteSelected = ids => e => {
        e.preventDefault()
        this.setState({loading: true, isDisabled: true})
        console.log(ids);
        this.props.deleteMultipleSocietyMemberDetail(ids)
        .then(() => this.refreshData())
    }

    toggleEditSocietyMember(){
        this.setState({editSocietyMember: !this.state.editSocietyMember})
    }

    onChange = (e) => {
        console.log(this.state);
        this.setState({[e.target.name]: e.target.value.toUpperCase()})
    }

    fetchDesignation = ({designation}) => {
        if(designation){
           return designation.designation.map((item) => {
                return (
                    <option key={item.designationId} value={item.designationId}>{item.designationName}</option>
                );
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
                 countryId:country.countryId,
                 stateName: '',
                 cityName: '',
                 locationName: ''
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
        this.setState({email:e.target.value})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            console.log(this.state.email)
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        
    }

     loadingInactive = () => {
         this.setState({modalLoading: false,editSocietyMember: !this.state.editSocietyMember})
     }

     update = (e) => {
         console.log('hello')
        e.preventDefault();
        let {societyId,societyBoardMemberName,designationId,countryId,stateId,cityId,
            locationId,currentAddress,permanentAddress,
            contactNumber,email,bankName,
            accountNumber,panCardNumber,dob,societyBoardMemberId} = this.state;
        let errors = {};
        if(this.state.countryName==='') errors.countryName = `Country can't be empty.`
        if(this.state.stateName==='') errors.stateName = `State can't be empty.`
        if(this.state.cityName==='') errors.cityName = `City can't be empty.`
        if(this.state.locationName ==='') errors.locationName = `Location Can't be empty`
        if(this.state.societyBoardMemberName === '') errors.societyBoardMemberName = `Board Member can't be empty.`
        if(this.state.currentAddress === '') { errors.currentAddress = `Current Address can't be empty.`}
        if(this.state.permanentAddress === ''){ errors.permanentAddress = `Permanent Address can't be empty.`}
        if(this.state.contactNumber.length !== 10) { errors.contactNumber = `Contact no should be 10 digits.`}
        if(this.state.email === '') { errors.email = `Email can't be empty.`}
        if(this.state.bankName === '') { errors.bankName = `Bank Name can't be empty.`}
        if(this.state.accountHolderName === '') { errors.accountHolderName = `Account Holder Name can't be empty.`}
        if(this.state.accountNumber === '') { errors.accountNumber = `Account Number can't be empty.`}
        if(this.state.panCardNumber === '') { errors.panCardNumber = `Pan Card Number can't be empty.`}
        if(this.state.dob === '') { errors.dob = `Date of birth can't be empty.`};
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.emailValidError===''){
            console.log('hello1')
            this.setState({modalLoading:true})
            
            this.props.updateSocietyMemberDetails(societyId,societyBoardMemberName,designationId,
                countryId,stateId,cityId,
                locationId,currentAddress,permanentAddress,
                contactNumber,email,bankName,
                accountNumber,panCardNumber,dob,societyBoardMemberId)
                .then(() => this.loadingInactive())
                .catch(err => {
                    err.response.data.message
                    this.setState({modalLoading: false})
                })
        }
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

    render(){
        console.log(this.props.societyReducer.countryResult)
        let tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{alignContent:'baseline'}}></th>
                    <th>#</th>
                    <th style={{cursor: 'pointer'}} onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'societyBoardMemberName'}});
                        }}>Member Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
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
                {this.fetchMemberDetails(this.props.boardMemberReducer)}
            </tbody>
        </Table>

        let modalData = <div>
            <FormGroup>
                                <Label>Society Member Name</Label>
                                <Input name="societyBoardMemberName" type="text" value={this.state.societyBoardMemberName} 
                                    onChange={this.onChange} />
                                {!this.state.societyBoardMemberName ? <span className="error">{this.state.errors.societyBoardMemberName}</span>: ''}
                            </FormGroup>
                            <FormGroup>
                                <Label>Designation</Label>
                                <Input name="designationId" type="select" onChange={this.onChange} value={this.state.designationId}>
                                    <DefaultSelect />
                                    {this.fetchDesignation(this.props.boardMemberReducer)}
                                 </Input>
                            </FormGroup>
                             <FormGroup>
                                <Label>Country Name</Label>
                                <Input type="select" name="countryId"  onChange={this.onChangeCountry} 
                                value={this.state.countryName} required>
                                    <DefaultSelect />
                                    {this.countryName(this.props.societyReducer)}
                                </Input>
                                {!this.state.countryName ? <span className="error">{this.state.errors.countryName}</span>: ''}
                            </FormGroup>

                            <FormGroup>
                                <Label>State Name</Label>
                                <Input type="select" name="stateId"
                                  onChange={this.onChangeState}
                                    required>
                                  {this.state.stateName ? <option>{this.state.stateName}</option> : <option disabled>--Select--</option>}
                                  {this.state.stateName ? <DefaultSelect />: null}
                                    {this.state.stateName ? null : this.stateName(this.props.societyReducer)}
                                </Input>
                                {!this.state.stateName ? <span className="error">{this.state.errors.stateName}</span>: ''}
                            </FormGroup>

                            <FormGroup>
                                <Label>City Name</Label>
                                <Input type="select" name="cityId"
                                 onChange={this.onChangeCity} required>
                                {this.state.cityName ? <option>{this.state.cityName}</option> : <option disabled>--Select--</option>}
                                {this.state.cityName ? <DefaultSelect />: null}
                                {this.state.cityName ? null : this.cityName(this.props.societyReducer)}  
                                </Input>
                                {!this.state.cityName ? <span className="error">{this.state.errors.cityName}</span>: ''}
                            </FormGroup>

                            <FormGroup>
                                <Label>Location Name</Label>
                                <Input type="select" name="locationId"
                                  onChange={this.onChangeLocation}
                                 required>
                                 {this.state.locationName ? <option>{this.state.locationName}</option> : <option disabled>--Select--</option>}
                                 {this.state.locationName ? <DefaultSelect />: null}
                                 {this.state.locationName ? null : this.locationName(this.props.societyReducer)}  
                                </Input>
                                {!this.state.locationName ? <span className="error">{this.state.errors.locationName}</span>: ''}
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
                                {!this.state.currentAddress ? <span className="error">{this.state.errors.currentAddress}</span>: ''}
                            </FormGroup>
                            <FormGroup >
                                <Label>Permanent Address</Label>
                                <Input type="textarea" 
                                value={this.state.permanentAddress} 
                                placeholder="Permanent Address" 
                                name="permanentAddress" 
                                onChange={this.onChange}
                                maxLength='150' />
                                {!this.state.permanentAddress ? <span className="error">{this.state.errors.permanentAddress}</span>: ''}
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
                                {!this.state.contactNumber ? <span className="error">{this.state.errors.contactNumber}</span>: ''}
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input 
                                placeholder="Email" 
                                type="email" 
                                value={this.state.email}
                                name="email" 
                                onChange={this.emailChange}
                                onKeyPress={this.emailValid} />
                                {!this.state.email ? <span className="error">{this.state.errors.email}</span>: ''}
                                {<span className="error">{this.state.emailValidError}</span>}
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
                                {!this.state.bankName ? <span className="error">{this.state.errors.bankName}</span>: ''}
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
                                {!this.state.accountNumber ? <span className="error">{this.state.errors.accountNumber}</span>: ''}
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
                                {!this.state.panCardNumber ? <span className="error">{this.state.errors.panCardNumber}</span>: ''}
                            </FormGroup>
                            <FormGroup>
                                <Label>Date of Birth</Label>
                                <Input type="date" max={this.maxDate()} name="dob" value={this.state.dob} onChange={this.onChange} />
                                {!this.state.dob ? <span className="error">{this.state.errors.dob}</span>: ''}
                            </FormGroup>  
                            <FormGroup>
                                    <Button type="submit" color="primary" onClick={this.update}>Save</Button>{' '}
                                    <Button color="danger" onClick={this.toggleEditSocietyMember.bind(this)}>Cancel</Button>
                            </FormGroup>
        </div>

        let deleteSelectedButton = <Button
         disabled={this.state.isDisabled}
         color="danger"
        className="mb-3"
        onClick={this.deleteSelected(this.state.ids)}>Delete Selected</Button>
        return(
            <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Board Member Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Board Member</Button>
                    </div>
                    <Modal isOpen={this.state.editSocietyMember} toggle={this.toggleEditSocietyMember.bind(this)}>
                        <ModalHeader toggle={this.toggleEditSocietyMember.bind(this)}>Edit Board Member Details</ModalHeader>
                        <ModalBody>
                            {/* <FormGroup>
                                <Label>Society Name</Label>
                                <Input name="societyId" type="select" onChange={this.onChange}  >
                                    <DefaultSelect />
                                    {this.fetchSocietyId(this.props.boardMemberReducer)}
                                 </Input>
                            </FormGroup> */}
                            {!this.state.modalLoading ? modalData : <Spinner/>}
                        </ModalBody>
                    </Modal>
                    <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                    {deleteSelectedButton}
                    <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></Label>
                    {!this.state.loading ? tableData : <Spinner/>}
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        societyReducer: state.societyReducer,
        boardMemberReducer: state.boardMemberReducer  
    }
}

export default connect(mapStateToProps, { getMemberDetails, getSocietyId, getMemberDesignation,
    getCountry,getState,getCity, getLocation, updateSocietyMemberDetails,deleteSocietyMemberDetail,
    deleteMultipleSocietyMemberDetail })(BoardMemberDetails);