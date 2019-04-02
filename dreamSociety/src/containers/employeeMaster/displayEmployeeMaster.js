import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Modal, Button, FormGroup, ModalBody, ModalHeader, ModalFooter, Label,Row,Col } from 'reactstrap';

import { getCountry, getState, getCity, getLocation } from './../../actionCreators/societyMasterAction';
import {getEmployee,getEmployeeType,getEmployeeWorkType} from '../../actionCreators/employeeTypeMasterAction';

import { ViewEmployee, updateEmployee, deleteEmployee,deleteMultipleEmployee} from '../../actionCreators/employeeMasterAction';
import { bindActionCreators } from 'redux';
import { UR } from '../../actions';
import Spinner from '../../components/spinner/spinner'
import UI from '../../components/newUI/superAdminDashboard'
import SearchFilter from '../../components/searchFilter/searchFilter';
import DefaultSelect from '../../constants/defaultSelect'
import _ from 'underscore';
import './employeeMaster.css'
import GoogleDocsViewer from 'react-google-docs-viewer';

class DisplayEmployeeMaster extends Component {
constructor(props){
    super(props);
    this.state = {
        editEmployeeData: {
            employeeId: '',
           

            startDate: '',
            endDate: '',
         
            selectedDocumentUrl: null,

           
            modal: false,
            modalIsOpen: false,
            isActive: false
        },
        picture:'',
        profilePicture: '',
        editEmployeeModal: false,
        loading: true,
        search: '',
        countryId: '',
        countryName: '',
        stateName: '',
        stateId: '',
        cityName: '',
        cityId: '',
        locationName: '',
        locationId: '',
        countryId1:'',
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
        firstName: '',
        middleName: '',
        lastName: '',
        salary: '',
        address:'',
        serviceType:'',
        employeeDetailId:'',
        ids: [],
        isDisabled: true,
        documentOne: '',
        documentTwo:'',
        errors:{},
        filterName:"firstName",
        modalLoading:false

    }
}

    
    componentDidMount() {
        this.refreshData()
    }

          
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    refreshData() {
        this.props.ViewEmployee().then(() => this.setState({ loading: false,modalLoading:false,editEmployeeModal:false }));
        this.props.getCountry().then(() => this.setState({ loading: false,modalLoading:false}))
        this.props.getState().then(() => this.setState({ loading: false,modalLoading:false }))
        this.props.getCity().then(() => this.setState({ loading: false,modalLoading:false }))
        this.props.getLocation().then(() => this.setState({ loading: false,modalLoading:false }))
        this.props.getEmployee().then(()=>this.setState({loading:false}))
    }

    onChange= (e)=> {

        if(!!this.state.errors[e.target.name]) {
          let errors = Object.assign({}, this.state.errors);
          delete errors[e.target.name];
          this.setState({ [e.target.name]: e.target.value, errors });
      }
      else {
          this.setState({ [e.target.name]: e.target.value });
      }
       
      } 
    openModal = (documentOne) => {

        this.setState({
            documentOne
        })
        console.log(documentOne, "ads")
        this.setState({ modalIsOpen: true });

    }

    Modal = (documentTwo) => {

        this.setState({
            documentTwo
        })

        this.setState({ modal: true });

    }

    toggleModal() {
        this.setState({ modalIsOpen: false });
    }
    toggle() {
        this.setState({ modal: false });
    }

    toggleEditEmployeeModal() {
        this.setState({
            editEmployeeModal: !this.state.editEmployeeModal
        })
    }
    onPicChange=(event)=>{
        if(!!this.state.errors[event.target.name]){
        
            let errors =Object.assign({},this.state.errors)
            delete  errors[event.target.name]
            this.setState({[event.target.name]:event.target.files,errors});
        }
        else{
      this.setState({ profilePicture : event.target.files[0]})
       
        }

}   

// onImageChange = (event) => {
//     if(!!this.state.errors[event.target.name]){
        
//         let errors =Object.assign({},this.state.errors)
//         delete  errors[event.target.name]
//         this.setState({[event.target.name]:event.target.files,errors});
//     }
//     else{
ImageChange =(event)=>{
        if(!!this.state.errors[event.target.name]){
        
            let errors =Object.assign({},this.state.errors)
            delete  errors[event.target.name]
            this.setState({[event.target.name]:event.target.files,errors});
        }
        else{
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({picture:  reader.result});
          };
        
          reader.readAsDataURL(event.target.files[0]);
          this.setState({profilePicture:event.target.files[0]})
        }
    }
}

    onFileChange=(event)=>{
        if(!!this.state.errors[event.target.name]){
        
            let errors =Object.assign({},this.state.errors)
            delete  errors[event.target.name]
            this.setState({[event.target.name]:event.target.files,errors});
        }
        else{
      this.setState({ documentOne : event.target.files[0]})
       
        }
          }
 
         
 FileChange=(event)=>{
    if(!!this.state.errors[event.target.name]){
        
        let errors =Object.assign({},this.state.errors)
        delete  errors[event.target.name]
        this.setState({[event.target.name]:event.target.files,errors});
    }
    else{
  this.setState({ documentTwo: event.target.files[0]})
   
    }
     }
     

    editEmployee(employeeId, picture, firstName, middleName, lastName, salary,currentAddress, countryName, stateName, cityName, locationName,permanentAddress, countryName1,stateName1,cityName1, documentOne, documentTwo, startDate,contact,email,employeeDetailId) {
          console.log(employeeDetailId,"emp");
        this.setState({ editEmployeeData: { employeeId,  startDate },contact,email,  documentOne, documentTwo, picture, firstName, middleName, lastName, salary, currentAddress,countryName, stateName, cityName, locationName,permanentAddress, countryName1,stateName1,cityName1,employeeDetailId, editEmployeeModal: !this.state.editEmployeeModal })

    }

    updateEmployee = (employeeId) => {
        let errors ={};
        // const { countryId,stateId,cityId,locationId,documentOne,documentTwo,profilePicture,firstName,middleName,lastName,startDate,endDate,CTC }= this.state   
       
        
    
         
         if(this.state.firstName ===''){
            errors.firstName ="First Name can't be empty. "
         }
       
         if(!this.state.lastName){
       errors.lastName ="Last Name can't be empty."
         }
         if(!this.state.salary){
            errors.salary ="salary can't be empty."
              }
              if(!this.state.address){
                errors.address ="Address can't be empty."
                  }
         if(!this.state.editEmployeeData.startDate){
          errors.startDate =" Start Date can't be empty ."
         }
    
      

  this.setState({ errors });
  const isValid = Object.keys(errors).length === 0
  if (isValid) {    
        const data = new FormData()
        data.append('documentOne', this.state.documentOne)
        data.append('documentTwo', this.state.documentTwo)
        data.append('firstName', this.state.firstName)
        data.append('middleName', this.state.middleName)
        data.append('lastName', this.state.lastName)
        data.append('salary',this.state.salary)
        data.append('address',this.state.address)
        data.append('countryId', this.state.countryId)
        data.append('stateId', this.state.stateId)
        data.append('cityId', this.state.cityId)
        data.append('locationId', this.state.locationId)
        data.append('startDate', this.state.editEmployeeData.startDate)
        data.append('email',this.state.email)
        data.append('contact',this.state.contact)
        data.append('serviceType',this.state.serviceType)
        data.append('permanentAddress',this.state.address)
        data.append('currentAddress',this.state.address)
        data.append('stateId1',this.state.stateId)
        data.append('countryId1',this.state.countryId)
        data.append('cityId1',this.state.cityId)
        data.append('locationId1',this.state.locationId)
        data.append('stateId2',this.state.stateId)
        data.append('countryId2',this.state.countryId)
        data.append('cityId2',this.state.cityId)
        data.append('locationId2',this.state.locationId)
        data.append('profilePicture', this.state.profilePicture)

        this.props.updateEmployee(this.state.editEmployeeData.employeeId,data).then(() =>  this.refreshData())

        this.setState({
            modalLoading:true

        })

    }
}

    deleteEmployee(employeeId) {
        this.setState({ loading: true })

        let { isActive } = this.state.editEmployeeData;

        this.props.deleteEmployee(employeeId, isActive).then(() => this.refreshData())
        this.setState({ editEmployeeData: { isActive: false } })
    }

    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }   

    searchOnChange = (e) => {

        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            console.log(x.firstName)
            return x.firstName.toLowerCase().indexOf(search) !== -1 || !search;
        }
    }


    getEmployee({ getEmployee }) {
        console.log(getEmployee, "1223");
        console.log(getEmployee)
        if (getEmployee &&  getEmployee.data.employee) {
            return (
                getEmployee.data.employee.sort((item1,item2)=>{
                    if(item1 && item2){
                        console.log(item1)
                        var cmprVal = (item1.firstName.localeCompare(item2.firstName))
                        return this.state.sortVal ? cmprVal : -cmprVal;
                    }
                    
                }).filter(this.searchFilter(this.state.search)).filter(this.searchFilter(this.state.search)).map((item, index) => {

                    return (
                        <tr key={item.employeeId}>
                                                      <td><input type="checkbox" name="ids" value={item.employeeId} className="SelectAll"
                         onChange={(e, i) => {
                            const {employeeId} = item
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(employeeId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                            else {
                                this.setState({ids: [...this.state.ids, employeeId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
                            <td>{index + 1}</td>
                            <td > <img  style={{maxWidth: "100%",height: "auto",width: "auto\9"}}  src={UR + item.picture} alt="desc">
                            </img></td>
                            <td >{item.firstName}</td>
                            < td>{item.middleName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.salary}</td>
                            <td> {item.employee_detail_master.serviceType}-{item.employee_detail_master.employee_work_type_master.employeeWorkType}-
                            {item.employee_detail_master.employee_type_master.employeeType}</td>
                            <td>{item.contact}</td>
                            <td> {item.email}</td>
                            <td> {item.currentAddress},{item.Location1.locationName},{item.City1.cityName},{item.State1.stateName},{item.Country1.countryName}</td>
                            <td>  {item.permanentAddress}, {item.Location2.locationName},{item.City2.cityName},{item.State2.stateName},{item.Country2.countryName}</td>
                            <td>
                                <button className="btn btn-light" onClick={this.openModal.bind(this, UR+item.documentOne)}>View Document</button>
                            </td>
        
                            <td>  <button className="btn btn-light" onClick={this.Modal.bind(this, UR+item.documentTwo)}>View Document </button></td>

                            <td>{item.startDate}</td>
                            

                            <td>
                                <button className="btn btn-success" onClick={this.editEmployee.bind(this, item.employeeId, UR+item.picture, item.firstName, item.middleName, item.lastName, item.salary, item.currentAddress,item.Country1.countryName, item.State1.stateName, item.City1.cityName,item.permanentAddress,item.Country2.countryName, item.State2.stateName, item.City2.cityName, item.Location1.locationName, UR+item.documentOne, UR+item.documentTwo, item.startDate,item.contact,item.email,item.employee_detail_master.employeeDetailId)} >Edit</button>
                                <button className="btn btn-danger" onClick={this.deleteEmployee.bind(this, item.employeeId)}> Delete</button>
                            </td>


                        </tr>
                    )
                })
            )
        }
    }
    close = () => {
        return this.props.history.replace('/superDashBoard/displayemployee');
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
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }
    }
   
    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteMultipleEmployee(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

    addEmployee =()=>{

        this.props.history.push('/superDashboard/employee')
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
                        <option key={item.countryId1} value={item.countryName}>
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
                        <option key={item.stateId1} value={item.stateName}>
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
                        <option key={item.cityId1} value={item.cityName}>
                         {item.cityName}
                        </option>
                    )
                }
                )
            )
             
         }
     }
     logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    
     locationName=({locationResult})=>{
        if(locationResult){
             
            return( 
                locationResult.map((item) =>{ 
                    return(
                        <option key={item.locationId1} value={item.locationName}>
                         {item.locationName}
                        </option>
                    )
                }
                )
            )
             
         }
     }
     country = ({countryResult}) => {
        if(countryResult){
          
           return( 
            countryResult.map((item) =>{
                   return(
                       <option key={item.countryId2} value={item.countryName}>
                        {item.countryName}
                       </option>
                   )
               })
           )
            
        }
    }
   
    state = ({stateResult}) => {
        if(stateResult){
          
           return( 
            stateResult.map((item) =>{ 
                   return(
                       <option key={item.stateId2} value={item.stateName}>
                        {item.stateName}
                       </option>
                   )
               })
           )
            
        }
    }
   
    city=({cityResult})=>{
       
        if(cityResult){
            
           return( 
            cityResult.map((item) =>{ 
                   return(
                       <option key={item.cityId2} value={item.cityName}>
                        {item.cityName}
                       </option>
                   )
               }
               )
           )
            
        }
    }
    location=({locationResult})=>{
        if(locationResult){
             
            return( 
                locationResult.map((item) =>{ 
                    return(
                        <option key={item.locationId2} value={item.locationName}>
                         {item.locationName}
                        </option>
                    )
                }
                )
            )
             
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
     changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }
   
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    changeFirst = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    

    render() {
        let tableData;

        tableData =
            <Table >
                <thead>
                    <tr>
                    <th style={{width:"4px"}}></th>
                        <th style={{width:"4px"}}>#</th>
                        <th>Profile Picture</th>
                        <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'firstName'}})
                        }} >First Name      <i class="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th> Middle Name</th>
                        <th> Last Name</th>
                        <th> salary</th>
                        <th> Service Type</th>
                         <th> Contact</th>
                        <th>Email Address </th>
                        <th> Current Address</th>
                        <th> Permanent Address</th>
                        
                        <th>ID</th>
                        <th>ID2</th>
                        <th> Employment  Date</th>
                          <th> Actions  </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployee(this.props.EmpDetails)}
                </tbody>
            </Table>

           let modalData =<div>
                          

                          <FormGroup>
                      
                <Row>
                    <Col md={8}>
                               <label>update your Photo</label> 
                                  <input accept='image/*' type="file" name="profilePicture"   onChange={this.ImageChange} />
                                
                                  
                                  </Col>
                    <Col md={4}>
                        <div style={{ textAlign:'center'}}>
                            <img   id="target" src={this.state.picture} height='100px' width='100px' />
                        </div>
                    </Col>
                    
                </Row>
                                      
                                 
                              </FormGroup>
                                       

                              <FormGroup>
                                  <Label > First Name</Label>
                                  <Input  name="firstName" value={this.state.firstName}
                                      onChange={this.changeFirst}
              
                                      maxLength={25}
                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                                  {/* <span className="error">{this.state.errors.firstName}</span> */}
                              </FormGroup>
                              <FormGroup>
                                  <Label > Middle Name</Label>
                                  <Input name="middleName" value={this.state.middleName}
                                      onChange={this.onChange}
                                          
                                      maxLength={25}
                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                                   {/* <span  className="error">{this.state.errors.middleName}</span> */}
                              </FormGroup>
                              <FormGroup>
                                  <Label > Last Name</Label>
                                  <Input name="lastName" value={this.state.lastName}
                                      onChange={this.onChange}
                                         
                                      maxLength={25}
                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                                   {/* <span  className="error">{this.state.errors.lastName}</span> */}
                              </FormGroup>
                              <FormGroup>
                                  <Label > Salary(In terms of CTC)</Label>
                                  <Input name="salary" value={this.state.salary}
                                      onChange={this.onChange}
                                       maxLength={20}
                                      onKeyPress={this.OnkeyPressNumber}
                                             
                                  />
                                   {/* <span  className="error" >{this.state.errors.salary}</span> */}
                                   </FormGroup>
                                   <FormGroup>
                                  <Label > Service Type</Label>
                                  <Input type="select" name="employeeDetailId" value={this.state.employeeDetailId}
                                      onChange={this.onChange}
                                       maxLength={20}
                                      
                                             
                                  >
                                     <DefaultSelect/>
          {this.getService(this.props.employeeDetails)}
                             </Input>
                                   </FormGroup>

                                   <FormGroup>
                                  <Label > Contact</Label>
                                  <Input name="contact" value={this.state.contact}
                                      onChange={this.onChange}
                                       maxLength={20}
                                      
                                             
                                  />
                                    
                                   </FormGroup>
                                   <FormGroup>
                                  <Label > Email</Label>
                                  <Input name="email" value={this.state.email}
                                      onChange={this.onChange}
                                       maxLength={100}
                                      
                                             
                                  />
                                   
                                   </FormGroup>
                                   <FormGroup>
                                  <Label > Current Address</Label>
                                  <Input name="address" value={this.state.currentAddress}
                                      onChange={this.onChange}

                                    

                                  />
                                   {/* <span  className="error" >{this.state.errors.address}</span> */}
                                   </FormGroup>
                                   <FormGroup>
                              <Label>Country Name</Label>
                              <Input type="select" name="countryId"  onChange={this.onChangeCountry} 
                              value={this.state.countryName} required>
                                  <DefaultSelect />
                                  {this.countryName(this.props.societyReducer)}
                              </Input>
                         
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
                          
                          </FormGroup>

                          <FormGroup>
                              <Label>City Name</Label>
                              <Input type="select" name="cityId"
                               onChange={this.onChangeCity} required>
                              {this.state.cityName ? <option>{this.state.cityName}</option> : <option disabled>--Select--</option>}
                              {this.state.cityName ? <DefaultSelect />: null}
                              {this.state.cityName ? null : this.cityName(this.props.societyReducer)}  
                              </Input>
                    
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
                           
                          </FormGroup> 
                          <FormGroup>
                                  <Label >  Permanent Address</Label>
                                  <Input name="permanentAddress" value={this.state.permanentAddress}
                                      onChange={this.onChange}

                                    

                                  />
                                   {/* <span  className="error" >{this.state.errors.address}</span> */}
                                   </FormGroup>
                                   <FormGroup>
                              <Label>Country Name</Label>
                              <Input type="select" name="countryId"  onChange={this.onChangeCountry} 
                              value={this.state.country1Name} required>
                                  <DefaultSelect />
                                  {this.country(this.props.societyReducer)}
                              </Input>
                         
                          </FormGroup>

                          <FormGroup>
                              <Label>State Name</Label>
                              <Input type="select" name="stateId"
                                onChange={this.onChangeState}
                                  required>
                                {/* {this.state.stateName ? <option>{this.state.stateName}</option> : <option disabled>--Select--</option>}
                                {this.state.stateName ? <DefaultSelect />: null}
                                  {this.state.stateName ? null : this.state(this.props.societyReducer)} */}
                              </Input>
                          
                          </FormGroup>

                          <FormGroup>
                              <Label>City Name</Label>
                              <Input type="select" name="cityId"
                               onChange={this.onChangeCity} required>
                              {/* {this.state.cityName ? <option>{this.state.cityName}</option> : <option disabled>--Select--</option>}
                              {this.state.cityName ? <DefaultSelect />: null}
                              {this.state.cityName ? null : this.city(this.props.societyReducer)}   */}
                              </Input>
                    
                          </FormGroup>

                          <FormGroup>
                              <Label>Location Name</Label>
                              <Input type="select" name="locationId"
                                onChange={this.onChangeLocation}
                               required>
                               {/* {this.state.locationName ? <option>{this.state.locationName}</option> : <option disabled>--Select--</option>}
                               {this.state.locationName ? <DefaultSelect />: null}
                               {this.state.locationName ? null : this.location(this.props.societyReducer)}   */}
                              </Input>
                           
                          </FormGroup> 
                                 
                                
                              <FormGroup>
                                
                                  <Label > Document One</Label>

                                  <GoogleDocsViewer
                                      width="400px"
                                      height="600px"
                                      fileUrl={this.state.documentOne}
                                  />
                                
                             
                              <Label> Update your Id</Label>
                                  <input accept='.docx ,.doc,application/pdf' type="file" name="documentOne"  onChange={this.onFileChange} />
                               
                              </FormGroup>
                              
                              <FormGroup>
                                  <Label > Document Two</Label>

                                  <GoogleDocsViewer
                                      width="400px"
                                      height="600px"
                                      fileUrl={this.state.documentTwo}
                                  />
                             
                              </FormGroup>

                              <FormGroup>
                              <div  className="input-contain">
                              <Label> Update your Id</Label>
                                  <input accept='.docx,application/pdf' type="file" name="documentTwo" onChange={this.FileChange} />
                                  </div>
                              </FormGroup>

                              {/* <FormGroup>
                                  <Label > Employment Date</Label>
                                  <Input type="date" value={this.state.editEmployeeData.startDate}
                                      onChange={(e) => {
                                          let { editEmployeeData } = this.state;

                                          editEmployeeData.startDate = e.target.value;

                                          this.setState({ editEmployeeData });
                                      }}
                                      required

                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                              </FormGroup>
                            
       */}

           </div>


            let deleteSelectedButton = <Button color="danger" className="mb-2"  disabled={this.state.isDisabled} 
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" >
                            <h3 align="center"> Employee Details</h3>
                            <Button color="primary" onClick={this.addEmployee} > Add Employee</Button>
                        </div>
                        <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEditEmployeeModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditEmployeeModal.bind(this)}>Edit  Employee Details</ModalHeader>
                            <ModalBody>
                            {!this.state.modalLoading ? modalData : <Spinner />}
                               
                                <Button color="primary" className="mr-2" onClick={this.updateEmployee}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditEmployeeModal.bind(this)}>Cancel</Button>

                            </ModalBody>
                        </Modal>
                        <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                         
                        {deleteSelectedButton}
                        <label><b> Select All</b><input
                         type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></label>
                        {!this.state.loading ? tableData : <Spinner />}
                    </div>
  

                    <Modal
                        isOpen={this.state.modalIsOpen} >
                        <ModalHeader toggle={this.toggleModal.bind(this)}></ModalHeader>
                        <ModalBody>

                            <GoogleDocsViewer
                                width="400px"
                                height="780px"
                                fileUrl={ this.state.documentOne}
                            />

                        </ModalBody>

                    </Modal>
                    <Modal
                        isOpen={this.state.modal} >
                        <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
                        <ModalBody>

                            <GoogleDocsViewer
                                width="400px"
                                height="780px"
                                fileUrl={ this.state.documentTwo}
                            />
                        </ModalBody>

                    </Modal>
                </UI>

            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        EmpDetails: state.EmpDetails,
        locationMasterReducer: state.locationMasterReducer,
        societyReducer: state.societyReducer,
        employeeDetails:state.employeeDetails

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ViewEmployee, getCountry, getState, getCity, getLocation, updateEmployee, deleteEmployee,deleteMultipleEmployee,getEmployee}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEmployeeMaster) 