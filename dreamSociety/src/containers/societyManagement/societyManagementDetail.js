import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountry, getState, getCity, getLocation, getSociety, detailSociety, deleteSociety, updateSociety,deleteSelectSociety } from './../../actionCreators/societyMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import {Table, Button, Modal, FormGroup, ModalBody, ModalHeader,  Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';


class SocietyManagementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editSocietyData: {
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                locationName: '',
                locationId: '',
                societyId: '',
                societyName: '',
                societyAddress:'',
                bankName:'',
                accountHolderName:'',
                accountNumber:'',
                IFSCCode:'',
                email:'',
                contactNumber:'',
                registrationNumber:'',
                totalBoardMembers:'',
                isActive:false,

            },
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors:{},
            ids:[],
            isDisabled: true,
            

        };
    }
    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    

  

    onKeyPressHandler=(event)=> {
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


    toggle = (societyId, countryName, stateName, cityName, locationName, societyName, societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber,registrationNumber,totalBoardMembers) => {

        this.setState({
            societyId,
            countryName,
            stateName,
            cityName,
            locationName,
            societyName,
            societyAddress,
            bankName,
            accountHolderName,
            accountNumber,
            IFSCCode,
            email,
            contactNumber,
            registrationNumber,
            totalBoardMembers,
            
            modal: !this.state.modal
        })
    }
    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentDidMount() {
        this.refreshData()
      
    }

    refreshData() {
        this.props.detailSociety().then(() => this.setState({loading: false}))
        this.props.getCountry().then(() => this.setState({loading: false}))
        this.props.getState().then(() => this.setState({loading: false}))
        this.props.getCity().then(() => this.setState({loading: false}))
        this.props.getLocation().then(() => this.setState({loading: false}))
        this.props.getSociety().then(() => this.setState({loading: false}))
    }


    editSocietyType = () => {
        const { societyId, countryId, stateId, cityId, locationId, societyName, societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber, registrationNumber,totalBoardMembers } = this.state

        let errors={};

        if(this.state.societyName === ''){
            errors.societyName="Society Name can't be empty"
        }

        if(this.state.societyAddress === ''){
            errors.societyAddress="Society Address can't be empty"
        }

        
        if(this.state.bankName === ''){
            errors.bankName="Bank Name can't be empty"
        }
        
        
        if(this.state.accountHolderName === ''){
            errors.accountHolderName="Account Holder Name can't be empty"
        }
        
        
        if(this.state.accountNumber === ''){
            errors.accountNumber="Account Number can't be empty"
        }
        
        
        if(this.state.IFSCCode === ''){
            errors.IFSCCode="IFSC Code can't be empty"
        }
        
        
        if(this.state.email === ''){
            errors.email="Email Id can't be empty"
        }


        if(this.state.contactNumber === ''){
            errors.contactNumber="Society Contact No. can't be empty"
        }
        if(this.state.registrationNumber === ''){
            errors.registrationNumber="Registration No. can't be empty"
        }

        if(this.state.totalBoardMembers === ''){
            errors.totalBoardMembers="Total Board Members can't be empty"
        }

        this.setState({errors})

        const isValid= Object.keys(errors).length === 0

        if(isValid){
            this.setState({loading:true})
        this.props.updateSociety(societyId, countryId, stateId, cityId, locationId, societyName,  societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber, registrationNumber,totalBoardMembers)
            .then(() => this.refreshData())
        this.setState({
            editSocietyData: { societyId, countryId, stateId, cityId, locationId, societyName,  societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber, registrationNumber,totalBoardMembers },
            modal: !this.state.modal
        })
      }
    }

    deleteSocietyName = (societyId) => {
        let {isActive}=this.state.editSocietyData
        this.setState({
            loading: true
        })

        if(window.confirm('Are You Sure ?')){
        this.props.deleteSociety(societyId, isActive)
            .then(() => this.refreshData())
            this.setState({editSocietyData:{isActive:false}})
        }
        else{
            this.refreshData()
            this.setState({editSocietyData:{isActive:false}})
        }
    }

    deleteSelected=(ids)=>{
        console.log(ids)
        this.setState({loading:true, isDisabled:true});
        if(window.confirm('Are You Sure ?')){
        this.props.deleteSelectSociety(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
        }
        else{
            this.refreshData()
        }
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





    societyData = ({ detail_Society }) => {
     
        if (detail_Society) {
            return detail_Society.filter(this.searchFilter(this.state.search)).map((item,index) => {
              

                return (
                    <tr key={item.societyId}>
                  <td><input type="checkbox" name="ids" className="SelectAll" value={item.societyId}
                         onChange={(e) => {
                            const {societyId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                               
                                this.setState({ids: [...this.state.ids, societyId]});
                                
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index+1}</td>
                        <td>{item.societyName}</td>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.state_master.stateName}</td>
                        <td>{item.city_master.cityName}</td>
                        <td>{item.location_master.locationName}</td>
                        <td>{item.societyAddress}</td>
                        <td>{item.bankName}</td>
                        <td>{item.accountHolderName}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.IFSCCode}</td>
                        <td>{item.email}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.registrationNumber}</td>
                        <td>{item.totalBoardMembers}</td>
                            <td>
                                <Button color="success mr-2" onClick={this.toggle.bind(this, 
                                    item.societyId, 
                                    item.country_master.countryName, 
                                    item.state_master.stateName,
                                    item.city_master.cityName, 
                                    item.location_master.locationName, 
                                    item.societyName,
                                    item.societyAddress,
                                    item.bankName,
                                    item.accountHolderName,
                                    item.accountNumber,
                                    item.IFSCCode,
                                    item.email, 
                                    item.contactNumber,
                                    item.registrationNumber,
                                    item.totalBoardMembers)} >Edit</Button>
                            
                                <Button color="danger" onClick={this.deleteSocietyName.bind(this, item.societyId)} >Delete</Button>
                            </td>
                    </tr>
                )
            })
        }
    }

    fetchCountry({ countryResult }) {
        if (countryResult) {
            return (
                countryResult.map((item) => {
                    return (
                        <option value={item.countryId} key={item.countryId}>
                            {item.countryName}
                        </option>
                    )
                })
            )
        }
    }

    fetchState({ stateResult }) {
        if (stateResult) {

            return (
                stateResult.map((item) => {

                    return (
                        <option value={item.stateId} key={item.stateId}>
                            {item.stateName}
                        </option>
                    )
                })
            )
        }
    }

    fetchCity({ cityResult }) {
        if (cityResult) {

            return (
                cityResult.map((item) => {

                    return (
                        <option value={item.cityId} key={item.cityId}>
                            {item.cityName}
                        </option>
                    )
                })
            )
        }
    }

    fetchLocation({ locationResult }) {
        if (locationResult) {
            return (
                locationResult.map((item) => {
                    return (
                        <option value={item.locationId} key={item.locationId}>
                            {item.locationName}
                        </option>
                    )
                })
            )
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.societyName.toLowerCase().includes(search.toLowerCase()) ||
                x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) ||
                x.state_master.stateName.toLowerCase().includes(search.toLowerCase()) ||
                x.city_master.cityName.toLowerCase().includes(search.toLowerCase()) ||
                x.location_master.locationName.toLowerCase().includes(search.toLowerCase()) ||
                x.societyAddress.toLowerCase().includes(search.toLowerCase()) ||
                x.bankName.toLowerCase().includes(search.toLowerCase()) ||
                x.accountHolderName.toLowerCase().includes(search.toLowerCase()) ||
                x.accountNumber.toLowerCase().includes(search.toLowerCase()) ||
                x.IFSCCode.toLowerCase().includes(search.toLowerCase()) ||
                x.email.toLowerCase().includes(search.toLowerCase()) ||
                x.contactNumber.toLowerCase().includes(search.toLowerCase()) ||
                x.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
                x.totalBoardMembers.toLowerCase().includes(search.toLowerCase()) 
                || !search;
        }
    }

    
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    routeToAddNewSociety =() => {
        this.props.history.push('/superDashboard/societyManagement')
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
        let tableData;

        tableData= <div style={{backgroundColor:'lightgray'}}>
        <Table className="table table-bordered">
            <thead>
                <tr>
                <th>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th>
                    <th>#</th>
                    <th>Society Name</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Location</th>
                    <th>Society Address</th>
                    <th>Bank Name</th>
                    <th>Account Holder Name</th>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th>Email Id</th>
                    <th>ContactNo.</th>
                    <th>RegistrationNo.</th>
                    <th>Total Board Members</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.societyData(this.props.societyReducer)}
            </tbody>
        </Table>
        </div>
        return (
            <div>
                <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                <div className="top-details">
                                <h3>Society Details</h3>
                                {/* <Button onClick={this.routeToAddNewSociety} color="primary">Add Society</Button> */}
                            </div>
                            <div>
                              
                                <SearchFilter type="text" value={this.state.search}
                                    onChange={this.searchOnChange} />
                            </div>
                            <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
                            {!this.state.loading ? tableData : <Spinner />}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                    <ModalBody>

                    <FormGroup>
                            <Label>Society Name</Label>
                            <Input type="text" id="societyId" name="societyName" onChange={this.onChangeHandler} value={this.state.societyName} maxLength={50}/>
                            <span className="error">{this.state.errors.societyName}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Country Name</Label>

                            <Input type="select" id="countryId" name="countryName" onChange={(e) => {

                                let { countryId } = this.state;
                                countryId = e.target.value;
                                this.setState({ countryId });
                                this.props.getState(countryId)
                            }} >
                                <option value={this.state.countryId}>{this.state.countryName}</option>
                                <option disabled>Select</option>
                                {this.fetchCountry(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>State Name</Label>
                            <Input type="select" id="stateId" name="stateName" onChange={(e) => {
                                let { stateId } = this.state;
                                stateId = e.target.value;
                                this.setState({ stateId });
                                this.props.getCity(stateId)
                            }} >
                                <option value={this.state.stateId}>{this.state.stateName}</option>
                                <option disabled>Select</option>
                                {this.fetchState(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>City Name</Label>
                            <Input type="select" id="cityId" name="cityName" onChange={(e) => {
                                let { cityId } = this.state;
                                cityId = e.target.value;
                                this.setState({ cityId });
                                this.props.getLocation(cityId)
                            }} >
                                <option value={this.state.cityId}>{this.state.cityName}</option>
                                <option disabled>Select</option>
                                {this.fetchCity(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Location Name</Label>
                            <Input type="select" id="locationId" name="locationName" onChange={(e) => {
                                let { locationId } = this.state;
                                locationId = e.target.value;
                                this.setState({ locationId });
                                this.props.getSociety(locationId)
                            }}>
                                <option value={this.state.locationId}>{this.state.locationName}</option>
                                <option disabled>Select</option>
                                {this.fetchLocation(this.props.societyReducer)}
                            </Input>
                        </FormGroup>
                       
                        
                        <FormGroup>
                            <Label>Society Address</Label>
                            <Input type="textarea"  name="societyAddress" onChange={this.onChangeHandler} value={this.state.societyAddress}  maxLength={100}/>
                            <span className="error">{this.state.errors.societyAddress}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Bank Name</Label>
                            <Input type="text"  name="bankName" onChange={this.onChangeHandler} value={this.state.bankName} onKeyPress={this.onKeyPressHandler} maxLength={30}/>
                            <span className="error">{this.state.errors.bankName}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Account Holder Name</Label>
                            <Input type="text"  name="accountHolderName" onChange={this.onChangeHandler} value={this.state.accountHolderName} onKeyPress={this.onKeyPressHandler}  maxLength={30}/>
                            <span className="error">{this.state.errors.accountHolderName}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Account Number</Label>
                            <Input type="text"  name="accountNumber" onChange={this.onChangeHandler} value={this.state.accountNumber}  onKeyPress={this.OnKeyPresshandlerPhone} maxLength={50}/>
                            <span className="error">{this.state.errors.accountNumber}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>IFSC Code</Label>
                            <Input type="text"  name="IFSCCode" onChange={this.onChangeHandler} value={this.state.IFSCCode}  maxLength={50}/>
                            <span className="error">{this.state.errors.IFSCCode}</span> 
                        </FormGroup>
                        
                        <FormGroup>
                            <Label>Email Id</Label>
                            <Input type="email"  name="email" onChange={this.onChangeHandler} value={this.state.email}   maxLength={50}/>
                            <span className="error">{this.state.errors.email}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input type="text"  name="contactNumber" onChange={this.onChangeHandler} value={this.state.contactNumber}  onKeyPress={this.OnKeyPresshandlerPhone} maxLength={50}/>
                            <span className="error">{this.state.errors.contactNumber}</span> 
                        </FormGroup>
                        <FormGroup>
                            <Label>Registration Number</Label>
                            <Input type="text"  name="registrationNumber" onChange={this.onChangeHandler} value={this.state.registrationNumber}  maxLength={50}/>
                            <span className="error">{this.state.errors.registrationNumber}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Total Board Members</Label>
                            <Input type="text"  name="totalBoardMembers" onChange={this.onChangeHandler} value={this.state.totalBoardMembers}  onKeyPress={this.OnKeyPresshandlerPhone} maxLength={50}/>
                            <span className="error">{this.state.errors.totalBoardMembers}</span> 
                        </FormGroup>
                        <Button color="primary mr-2" onClick={this.editSocietyType}>Save</Button> 

                        <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                    </ModalBody>
                </Modal>
               </div>
               </UI>
         </div>
        );
    }
}


function mapStatToProps(state) {
    return {
        societyReducer: state.societyReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, getState, getCity, getLocation, getSociety, detailSociety, deleteSociety, updateSociety, deleteSelectSociety }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(SocietyManagementDetail);