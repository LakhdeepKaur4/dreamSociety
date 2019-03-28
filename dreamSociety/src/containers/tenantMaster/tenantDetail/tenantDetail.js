import React, { Component } from 'react';
import UI from '../../../components/newUI/superAdminDashboard';
import { FormGroup, Input, Table, Label, Button, Modal, Row, Col, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../../constants/defaultSelect';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import { getTenantDetail, deleteTenant,getFlatDetailViaTowerId, deleteSelectedTenant,getOwnerDetailViaFlatId,
updateTenantDetail } from '../../../actionCreators/tenantMasterAction';
import Select from 'react-select';
import {getCountry,getState,getCity, getLocation} from '../../../actionCreators/societyMasterAction';
import {getAllFloor} from '../../../actionCreators/flatOwnerAction';
import {PicURN} from '../../../actions/index';
import { viewTower } from '../../../actionCreators/towerMasterAction';
import { connect } from 'react-redux';
import Spinner from '../../../components/spinner/spinner';
import "./tenantDetail.css"

class TenantDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            search:'',
            societyName:'',
            filterName:'firstName',
            ids:[],
            isActive: false,
            isDisabled: true,
            modalLoading:false,
            editTenant:false,
            firstName:'',
            lastName:'',
            tenantId:'',
            email:'',
            contact:'',
            aadhaarNumber:'',
            dob:'',
            permanentAddress:'',
            panCardNumber:'',
            accountNumber:'',
            fileName:'',
            towerName:'',
            flatNo:'',
            towerId:'',
            picture:'',
            flatDetailId:'',
            loading:true,
            messageEmailErr:'',
            errors:{},
            emailValidError:'',
            messageContactErr:'',
            gender:'',
            Male:'Male',
            Female:'Female',
            Other:'Other',
            floorId:'',
            floorName:'',
            readOnly:'',
            permanentAddressVisible:true,
            countryId:'',
            countryName:'',
            stateId:'',
            stateName:'',
            cityId:'',
            cityName:'',
            locationId:'',
            locationName:'',
            editPermanent:false,
            editAddress:''
        }
    }

    componentDidMount(){
        this.refreshData();
        this.props.viewTower();
        this.props.getCountry()
        this.props.getState()
        this.props.getCity()
        this.props.getLocation()
        console.log(this.state.societyName)
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    route = () => {
        this.props.history.push('/superDashBoard/addTenant');
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
    }
    unSelectAll = () => {
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }
      
        this.setState({ ids: [...allIds] });
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
    }

    delete(id){
        console.log(id)
        this.setState({isDisabled:true, loading:true})
        this.props.deleteTenant(id).then(() => {
            this.refreshData()
        })
    }

    edit = (picture,firstName,gender, email, contact, aadhaarNumber, panCardNumber, accountNumber ,
         dob, permanentAddress, towerName, floorName,flatNo,towerId,floorId,flatDetailId, tenantId) =>{
        console.log(floorName, floorId)
        this.setState({picture,firstName,gender, email, contact, aadhaarNumber,panCardNumber, accountNumber,
             dob, permanentAddress,towerName,floorName,flatNo,towerId,floorId,flatDetailId,tenantId, readOnly:permanentAddress,
              editTenant: true})
    }

    searchFilter(search){
        return function(x){
            console.log(x.flat_detail_master.flatNo)
            if(x){
                return (x.firstName + ' ' + x.lastName).toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.lastName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.gender.toLowerCase()[0] === search.toLowerCase()[0] ||
                x.email.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.contact.toString().indexOf(search.toString())  !== -1 ||
                x.dob.toString().indexOf(search.toString())  !== -1 ||
                x.permanentAddress.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                !search;
            }
        }
    }

    viewMembers(id){
        localStorage.setItem('tenantId', id)
        this.props.history.push('/superDashBoard/tenantMemberDetail');
    }

    viewTenantDetail = (picture,firstName, gender, email, contact, aadhaar, panNumber, accNumber, dob, address, towerName, floor, flatNo) => {
        console.log(picture,firstName, gender, email, contact, aadhaar, panNumber, accNumber, dob, address, towerName, floor, flatNo)
        // localStorage.setItem('picture', picture);
        // localStorage.setItem('firstName', firstName);
        // localStorage.setItem('gender', gender);
        // localStorage.setItem('email', email);
        // localStorage.setItem('contact', contact);
        // localStorage.setItem('aadhaar', aadhaar);
        // localStorage.setItem('panNumber', panNumber);
        // localStorage.setItem('accNumber', accNumber);
        // localStorage.setItem('dob', dob);
        // localStorage.setItem('address', address);
        // localStorage.setItem('towerName', towerName);
        // localStorage.setItem('floor', floor);
        // localStorage.setItem('flatNo', flatNo);
        let tenant = [{
            picture,firstName, gender, email, contact, aadhaar, panNumber, accNumber, dob, address, towerName, floor, flatNo
        }]

        localStorage.setItem('tenantDetails', JSON.stringify(tenant))
        this.props.history.push('/superDashBoard/viewTenantDetail');
    }

    renderList = ({getTenantDetail}) => {
        console.log(getTenantDetail)
        if(getTenantDetail && getTenantDetail.tenants){
            return getTenantDetail.tenants.sort((item1,item2)=>{
                if(item1 && item2){
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }
            }).filter(this.searchFilter(this.state.search && this.state.search)).map((item, index) => {
                if(item){
                    console.log(item.permanentAddress)
                    return (
                        <tr key={item.tenantId}>
                            <td><input type="checkbox" name="ids" value={item.tenantId} className="SelectAll"
                             onChange={(e, i) => {
                                const {tenantId} = item
                                if(!e.target.checked){
                                    if(this.state.ids.length>-1){
                                        document.getElementById('allSelect').checked=false;
                                    let indexOfId = this.state.ids.indexOf(tenantId);
                                    if(indexOfId > -1){
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if(this.state.ids.length === 0){
                                        this.setState({isDisabled: true})
                                    }
                                }
                            }
                                else {
                                    this.setState({ids: [...this.state.ids, tenantId]})
                                    if(this.state.ids.length >= 0){
                                        this.setState({isDisabled: false})
                                    }
                            } 
                                 }}/></td>
                            <td>{index + 1}</td>
                            <td style={{width:'4%'}}><img style={{ width: "100%", height: "20%" }} src={PicURN+item.picture} alt="Profile Pic" /></td>
                            <td>{item.firstName}{`  `}{item.lastName} </td>
                            <td>{item.gender}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.dob}</td>
                            <td>{item.permanentAddress}</td>
                            <td><Button color="success" onClick={this.viewMembers.bind(this, item.tenantId)}>
                                View</Button></td>
                            <td>
                                <Button color="success" onClick={this.viewTenantDetail.bind(this,PicURN+item.picture.replace('../../',''),
                                     item.firstName, item.gender, item.email,
                                    item.contact, item.aadhaarNumber,item.panCardNumber,item.accountNumber,
                                     item.dob, item.permanentAddress,
                                    item.tower_master ? item.tower_master.towerName:'',
                                    item.floor_master ? item.floor_master.floorName: '',item.flat_detail_master.flatNo,
                                    item.tower_master ? item.tower_master.towerId: '',
                                    item.floor_master ? item.floor_master.floorId: '',
                                    item.flat_detail_master.flatDetailId, item.tenantId )}>View</Button>
                            </td>
                            <td>
                                <Button color="success" onClick={this.edit.bind(this,PicURN+item.picture.replace('../../',''),
                                     item.firstName, item.gender, item.email,
                                    item.contact, item.aadhaarNumber,item.panCardNumber,item.accountNumber,
                                     item.dob, item.permanentAddress,
                                    item.tower_master ? item.tower_master.towerName:'',
                                    item.floor_master ? item.floor_master.floorName: '',item.flat_detail_master.flatNo,
                                    item.tower_master ? item.tower_master.towerId: '',
                                    item.floor_master ? item.floor_master.floorId: '',
                                    item.flat_detail_master.flatDetailId, item.tenantId)} className="mr-2">Edit</Button>
                                <Button color="danger" onClick={this.delete.bind(this, item.tenantId)}>Delete</Button>
                            </td>
                        </tr>
                    )
                }
                else return false
            })
        }
    }

    deleteSelected(ids){
        console.log(ids)
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedTenant(ids)
        
        .then(() => this.refreshData())
        .catch(err => err);
    }

    toggleTenant(){
        this.setState({editTenant: !this.state.editTenant, emailValidError:'',messageContactErr:'',messageEmailErr:'',
    permanentAddressVisible:true, editPermanent:false, permanentAddress:this.state.readOnly, countryId:'',
    stateId:'', cityId:'', locationId:''})
    }

    browseBtn = (e) => {
        document.getElementById('real-input').click();
    }

    imgChange = (event) => {
        
        const files = event.target.files
        const file = files[0];
        console.log(this.state)
        let fileName = file ? file.name : '';
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                picture :  reader.result,
                fileName,
                imageSizeError:''
              })
              console.log(this.state.picture)
          };
        }
        console.log(document.querySelector('#real-input'))
        const name = document.querySelector('#real-input').value.split(/\\|\//).pop();
            const truncated = name.length > 20 
              ? name.substr(name.length - 20) 
              : name;
            
              document.querySelector('.file-info').innerHTML = truncated;
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    getTower = ({ tower }) => {
        console.log(tower)
        if (tower) {
            return tower.tower.map((item) => {
                return (
                    { ...item, label: item.towerName, value: item.towerId }
                )
            }
            );
        }
        return [];
    }

    getFloor=({floor})=>{
        console.log("floor",floor)
        if(floor && floor.tower.Floors){
            return floor.tower.Floors.map((item)=>{
                      
                return {...item ,label: item.floorName, value: item.floorId }
            })
          //   this.setState({
          //     floorId:item.floorId
          //   })
        }
        else {
            return []
        }}

        getFlats=({floor})=>{
            console.log('7777777jjjjjj',floor)
            if(floor){
              return  floor.flatDetail.filter((flatRecord)=>{
                    return flatRecord.floorId===this.state.floorId
                }).map((selectFlat)=>{
                    console.log('bbbbbbbbbbbbbbbbb',selectFlat)
                    return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                });
            }
            else {
                return []
              }
        }

    // towerChangeHandler = (e) => {
    //     console.log(e)
    //     console.log(this.state)
    //     this.setState({towerId:e.target.value, flatNo:'', floorId:'', floorName:'', flatDetailId:''})
    //     this.props.getFlatDetailViaTowerId(this.state.towerId)
    // }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.towerId)
        });
        this.props.getAllFloor(selectOption.towerId);
    }

    floorChangeHandler=(name,selectOption)=>{
        console.log('=======selectOption=======',selectOption.value);
        this.setState({
            [name]: selectOption.value
        })
        console.log('lllllllll=======',this.state.floorId)
        // this.getFlats(this.props.towerFloor);
    
        }
        flatChangeHandler=(name,selectOption)=>{
            this.setState({
                [name]: selectOption.value
            })
            this.props.getAllFloor(selectOption.towerId);
        }

    contactChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,messageContactErr:'' });
        }
        else {
            this.setState({ [e.target.name]: e.target.value,messageContactErr:'' });
        }
    }

    // fetchFlatDetail = ({getFlatDetail}) => {
    //     console.log(getFlatDetail)
    //     console.log(this.state.floorId)
    //     if(getFlatDetail && getFlatDetail.flatDetail){
    //         console.log(getFlatDetail.flatDetail)
            
    //          return getFlatDetail.flatDetail.filter((i) => {
                
    //             return this.state.floorId == i.floorId
    //         }).map((item) => {
    //             if(item){
    //                 return (
    //                     <option value={item.flatDetailId} key={item.flatDetailId} >{item.flatNo}</option>
    //                 )
    //             }
    //         })
    //     }
    // }

    // flatChangeHandler = (e) => {
    //     this.setState({flatDetailId: e.target.value});
    //     console.log(this.state);
    //     this.props.getOwnerDetailViaFlatId(e.target.value)
    // }

    refreshData = () => {
        this.setState({societyName: localStorage.getItem('societyName')});
        this.props.getTenantDetail().then(() => this.setState({editTenant:false, loading: false}))
        .catch(() => this.setState({loading:false,editTenant:false}));
    }

    refreshDataAfterUpdate = () => {
        this.props.getTenantDetail().then(() => this.setState({editTenant:false, modalLoading: false}))
        .catch(() => this.setState({modalLoading:false}));
    }

    updateTenant = (e) => {
        e.preventDefault();
        
        let {firstName,gender, email, contact, aadhaarNumber, panCardNumber, accountNumber ,dob,
             permanentAddress, fileName, towerName, flatNo, towerId,
        picture, flatDetailId, tenantId, floorId} = this.state;
        let errors = {};
        if(this.state.firstName === '') {
            console.log('tenant');
            errors.firstName = `Tenant Name can't be empty.`;}

        if(this.state.email === '')  {console.log('email');
            errors.email = `Email can't be empty.`};
        if(this.state.contact === '') {console.log('contact');
            errors.contact = `Contact can't be empty.`;}
        else if(this.state.contact.length !== 10) {
        errors.contact = `Contact number should be of 10 digit.`;}    
        if(this.state.aadhaarNumber === '') {console.log('aadhaar');
            errors.aadhaarNumber = `Aadhaar Number can't be empty.`;}
        else if(this.state.aadhaarNumber.length !== 12) {console.log('aadhaarLimit');
            errors.aadhaarNumber = `Aadhaar Number should be of 12 digit.`}
        if(panCardNumber === '') errors.panCardNumber = `Pan number can't be empty.`;
        else if(panCardNumber.length !== 10) errors.panCardNumber = `Pan card should be of 10 digit.`
        if(accountNumber === '') errors.accountNumber = `Bank account number can't be empty.`;
        if(this.state.dob === '') {
            console.log('dob');
            errors.dob = `Date of birth can't be empty.`;
        }
        if(this.state.editAddress === '' && !!this.state.editPermanent) errors.editAddress = `Permanent Address can't be empty.`;
        // if(!this.state.towerId) {
        //     console.log('1');
        //     errors.towerId = `Please select tower.`;
        // }
        // if(!this.state.flatDetailId) {
        //     console.log('2');
        //     errors.flatDetailId=`Please select flat no.`;
        // }
        // if(!this.state.floorId) {
        //     console.log('3');
        //     errors.floorId=`Please select floor.`
        // }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        console.log(flatDetailId, picture, tenantId)
        if(isValid){
            console.log(this.state.floorId)
            this.setState({modalLoading: true})
            this.props.updateTenantDetail(firstName,gender, email, contact, aadhaarNumber, panCardNumber, accountNumber,
                 dob, permanentAddress, fileName, towerName, flatNo, towerId, floorId, picture, flatDetailId, tenantId)
                .then(() => this.refreshDataAfterUpdate())
                .catch((err) => {
                    console.log(err.response.data)
                    this.setState({messageEmailErr: err.response.data.messageEmailErr, messageContactErr: err.response.data.messageContactErr,
                         modalLoading:false})
                })
        }
        
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
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
        // this.setState({email:e.target.value, messageEmailErr:''})
        // if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
        //     this.setState({[e.target.name]:e.target.value});
        //     console.log(this.state.email)
        //     this.setState({emailValidError: ''})
        // }
        // else{ this.setState({emailValidError: 'Invalid Email.'})}

        this.setState({email:e.target.value, messageEmailErr:''})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            console.log(this.state.email)
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log(this.state.email)
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({email:e.target.value});
        }
        
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    //  fetchFloorDetail = ({getFlatDetail}) => {
    //     console.log(getFlatDetail)
    //     if(getFlatDetail && getFlatDetail.tower){
    //         console.log(getFlatDetail)
    //         return getFlatDetail.tower.Floors.map((item) => {
    //         return (
    //             <option value={item.floorId} key={item.floorId}>{item.floorName}</option>
    //         )
    //         })
    //     }
    // }

    // floorChange = (e) => {
    //     this.setState({floorId:e.target.value, flatDetailId:'', flatNo:''})
        
    // }

    //  fetchFloorDetail = ({getFlatDetail}) => {
    //     console.log(getFlatDetail)
    //     if(getFlatDetail && getFlatDetail.tower.Floors){
    //         console.log(getFlatDetail)
    //         return getFlatDetail.tower.Floors.map((item) => {
    //         return (
    //             <option value={item.floorId} key={item.floorId}>{item.floorName}</option>
    //         )
    //         })
    //     }
    // }


    numberValidation = (event) => {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    panChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase(), errors });
        }
        else {
            this.setState({panCardNumber:e.target.value.toUpperCase()});
        }
    }

    maxDate = () => {
        var d = new Date();
        d.setFullYear(d.getFullYear()-18, d.getMonth());
        return d.toISOString().split('T')[0];
    }

    sameAddress = () => {
        console.log(this.state.readOnly)
        if(!!document.getElementById('isChecked').checked){
            console.log('is checked')
           this.setState({permanentAddress: '', permanentAddressVisible:false, editPermanent:true})
           
           
        }
       else{
            this.setState({permanentAddress: this.state.readOnly , permanentAddressVisible:true, editPermanent:false})
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

    onChangeLocation = (locationName, locationId, selectOption) => {
        console.log(locationName, locationId, selectOption)
        this.setState({
            locationName: selectOption.locationName,
            locationId:selectOption.locationId,
            
        })
    }

    permanentAddressChange = (e) => {
            if (!!this.state.errors[e.target.name]) {
                let errors = Object.assign({}, this.state.errors);
                delete errors[e.target.name];
                this.setState({editAddress:e.target.value, permanentAddress: e.target.value + ' , ' + this.state.locationName + ' , ' +
                this.state.cityName + ' , ' + this.state.stateName + ' , ' + this.state.countryName , errors })
                console.log(this.state)
            }
            else {
                this.setState({editAddress:e.target.value, permanentAddress: e.target.value + ' , ' + this.state.locationName + ' , ' +
                this.state.cityName + ' , ' + this.state.stateName + ' , ' + this.state.countryName })
                console.log(this.state)
            }
    }

    render(){
        
        let TableData = <Table bordered>
                           <thead>
                                <tr>
                                    <th></th>
                                    <th>#</th>
                                    <th>Profile Pic</th>
                                    <th style={{cursor: 'pointer'}} onClick={()=>{
                                        this.setState((state)=>{return {sortVal:!state.sortVal,
                                        filterName:'firstName'}});
                                    }}>Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Contact No.</th>
                                    <th>Date of Birth</th>
                                    <th>Permanent Address</th>
                                    <th>Member details</th>
                                    <th>Tenant Detail</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList(this.props.tenantReducer)}
                            </tbody>
                        </Table>
                        console.log(this.state.readOnly)
                        
                        let lastIndex = this.state.picture.lastIndexOf('/');

                        console.log(this.state.societyName)

        let modalData = <div>
            {/* <FormGroup>
                <Label>Society Name</Label>
                <Input value={this.state.societyName} readOnly />
            </FormGroup> */}
            <FormGroup>
                <Row>
                    <Col md={8}>
                        <Input type="file" accept='image/*' id="real-input" onChange={this.imgChange} />
                        <Button className="browse-btn" onClick={this.browseBtn}>
                            Update pic
                        </Button>
                        <span className="file-info" >upload New Pic</span>
                    </Col>
                    <Col md={4}>
                        <div style={{border: '1px solid black', textAlign:'center'}}>
                            <img src={this.state.picture} height='100px' width='100px' />
                        </div>
                    </Col>
                    
                </Row>
                
                <span className="error">{this.state.imageSizeError}</span>
            </FormGroup>
            <FormGroup>
                <Label>First Name</Label>
                <Input value={this.state.firstName} name="firstName" maxLength="70" onChange={this.onChange} />
                {<span className='error'>{this.state.errors.firstName}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Last Name</Label>
                <Input value={this.state.lastName} name="firstName" maxLength="70" onChange={this.onChange} />
                {<span className='error'>{this.state.errors.lastName}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Gender:</Label>
                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                <span><Input name="gender"
                        onChange={this.onChange} type="radio" value={this.state.Male}
                        checked={this.state.Male===this.state.gender ? true : false}/></span>
                
                
                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                <span><Input name="gender" onChange={this.onChange} type="radio"
                        value={this.state.Female} checked={this.state.Female===this.state.gender ? true : false} /></span>
                
                
                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                <span><Input name="gender" onChange={this.onChange} type="radio"
                        value={this.state.Other} checked={this.state.Other===this.state.gender ? true : false}/></span>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input value={this.state.email} name="email" onChange={this.emailChange} onKeyPress={this.emailValid} />
                {this.state.messageEmailErr ? <span className='error'>{this.state.messageEmailErr}</span> : ''}
                {<span className="error">{this.state.emailValidError}</span>}
                <span><br/></span>
                {<span className="error">{this.state.errors.email}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Contact</Label>
                <Input value={this.state.contact} maxLength="10" name="contact" onKeyPress={this.numberValidation}
                 onChange={this.contactChange} />
                {this.state.messageContactErr ? <span className='error'>{this.state.messageContactErr}</span> : ''}
                {<span className='error'>{this.state.errors.contact}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Aadhar Number</Label>
                <Input value={this.state.aadhaarNumber} maxLength="12" 
                onKeyPress={this.numberValidation} name="aadhaarNumber" onChange={this.onChange} />
                {<span className='error'>{this.state.errors.aadhaarNumber}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Pan Number</Label>
                <Input value={this.state.panCardNumber} maxLength="10" name="panCardNumber" 
                onKeyPress={(e) => {
                    const pattern = /^[a-zA-Z0-9]+$/;
                    let inputChar = String.fromCharCode(e.charCode);
                    if (!pattern.test(inputChar)) {
                        e.preventDefault();
                    }}} onChange={this.panChange} />
                {<span className='error'>{this.state.errors.panCardNumber}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Bank Account Number</Label>
                <Input value={this.state.accountNumber} maxLength="18" 
                 onKeyPress={this.numberValidation} name="accountNumber" onChange={this.onChange} />
                {<span className='error'>{this.state.errors.accountNumber}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Date of Birth</Label>
                <Input value={this.state.dob} type="date" name="dob" max={this.maxDate()} onChange={this.onChange} />
                {<span className='error'>{this.state.errors.dob}</span>}
            </FormGroup>
            <FormGroup>
                Do you want to edit your permanent address?<Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
            </FormGroup>
            {this.state.permanentAddressVisible ? <FormGroup>
                <Label>Permanent Address</Label>
                <Input type="textarea" id="permanentaddr" disabled maxLength="500" value={this.state.permanentAddress} name="permanentAddress" onChange={this.onChange} />
            </FormGroup> : ''}
            {this.state.editPermanent ? <div>
                <h3 style={{textAlign:'center'}}>Permanent Address</h3>
                <FormGroup>
                <Label>Country</Label>
                <Select placeholder={<DefaultSelect/>} options={this.countryName(this.props.societyReducer)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
            </FormGroup>
            <FormGroup>
                <Label>State</Label>
                <Select placeholder={<DefaultSelect/>} options={this.stateName(this.props.societyReducer)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
            </FormGroup>
            <FormGroup>
                <Label>City</Label>
                <Select placeholder={<DefaultSelect/>} options={this.cityName(this.props.societyReducer)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
            </FormGroup>
            <FormGroup>
                <Label>Location</Label>
                <Select placeholder={<DefaultSelect/>} options={this.locationName(this.props.societyReducer)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
            </FormGroup>
            <FormGroup>
                <Label>Address</Label>
                <Input type="textarea" disabled={!(this.state.countryId && this.state.stateId
                && this.state.cityId && this.state.locationId) ? true : false} onChange={this.permanentAddressChange}
                maxLength="250"
                    name="editAddress" placeholder="Permanent Address" />
                    {<span className="error">
                    {this.state.errors.editAddress}
                </span>}
            </FormGroup>
            </div> : ''}
            
            {/* <FormGroup>
                <Label>Tower Name</Label>
                <Select type="select" options =  {this.getTower(this.props.towerList)} onChange={this.towerChangeHandler.bind(this, 'towerId')} value={this.state.towerId} placeholder="Tower" name="towerId" />
                   
                {!this.state.towerId ? <span className='error'>{this.state.errors.towerId}</span>: ''}
            </FormGroup>
            <FormGroup>
                <Label>Floor</Label>
                <Input  name="floorId" onChange = {this.floorChange} type="select">
                    {this.state.floorName ? <option>{this.state.floorName}</option> : <option disabled>--Select--</option>}
                    {this.state.floorName ? <DefaultSelect />: null}
                    {this.state.floorName ? null : this.fetchFloorDetail(this.props.tenantReducer)}
                </Input>
                {!this.state.floorId ? <span className='error'>{this.state.errors.floorId}</span>: ''}
            </FormGroup>
            <FormGroup>
                <Label>Flat No</Label>
                <Input onKeyPress={this.numberValidation} onChange={this.flatChangeHandler}
                    type='select' name="flatDetailId" >
                    {this.state.flatNo ? <option>{this.state.flatNo}</option> : <option disabled>--Select--</option>}
                    {this.state.flatNo ? <DefaultSelect />: null}
                    {this.state.flatNo ? null : this.fetchFlatDetail(this.props.tenantReducer)}
                </Input>
                {!this.state.flatDetailId ? <span className='error'>{this.state.errors.flatDetailId}</span>: ''}
            </FormGroup> */}
            {/* <FormGroup>
                <Label>Tower</Label>
                <Select options={this.getTower(this.props.towerList)} placeholder={this.state.towerName}
                defaultValue={this.state.towerName}
                    onChange={this.towerChangeHandler.bind(this, 'towerId')} />
                <span className="error">{this.state.errors.tower}</span>
            </FormGroup >
            <FormGroup>
                <Label>Floor</Label>
                <Select options={this.getFloor(this.props.towerFloor)} placeholder={this.state.floorName}
                 defaultValue={this.state.floorName}
                name="floorId"
                onChange={this.floorChangeHandler.bind(this,'floorId')}
                />
            </FormGroup>
            <FormGroup>
                <Label>Flat Number</Label>
                <Select options={this.getFlats(this.props.towerFloor)} name="flatDetailId" placeholder={this.state.flatNo}
                defaultValue={this.state.flatNo}
                    onChange={this.flatChangeHandler.bind(this,'flatDetailId')}
                    />
            </FormGroup > */}
            <FormGroup>
                <Button className="mr-2" color="primary" onClick={this.updateTenant}>Save</Button>
                <Button color="danger" onClick={this.toggleTenant.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>


        return(
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Tenant Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Tenant</Button>
                    </div>
                    <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                     <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
                        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
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
                    <Modal isOpen={this.state.editTenant} toggle={this.toggleTenant.bind(this)}>
                        <ModalHeader toggle={this.toggleTenant.bind(this)}>Edit Tenant Details</ModalHeader>
                        <ModalBody>
                            {!this.state.modalLoading ? modalData : <Spinner/>}
                        </ModalBody>
                    </Modal>
                    {!this.state.loading ? TableData: <Spinner />}
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        tenantReducer:state.tenantReducer,
        towerList: state.TowerDetails,
        flatList:state.flatDetailMasterReducer,
        towerFloor:state.FlatOwnerReducer,
        societyReducer: state.societyReducer
    }
}

export default connect(mapStateToProps, {getTenantDetail, getFlatDetailViaTowerId, deleteTenant, getAllFloor,
    deleteSelectedTenant,viewTower, getOwnerDetailViaFlatId, updateTenantDetail,getCountry,getState,getCity, getLocation})(TenantDetail);




