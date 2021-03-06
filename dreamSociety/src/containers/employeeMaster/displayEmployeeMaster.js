import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Modal, Button, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';

import { getCountry, getState, getCity, getLocation } from './../../actionCreators/societyMasterAction';
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


    state = {
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
        firstName: '',
        middleName: '',
        lastName: '',
        salary: '',
        address:'',
        ids: [],
        isDisabled: true,
        documentOne: '',
            documentTwo:'',
            errors:{},
            filterName:"firstName",
            modalLoading:false

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
    }

    onChange=(e)=> {


        if (!!this.state.errors[e.target.name]) {
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
    onImageChange =(event)=>{
    // if (event.target.files && event.target.files[0]) {
        const files = event.target.files
        const file = files[0];
        let fileName = file ? file.name : '';
        if (files && file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState({picture:  reader.result,fileName});
      };
   
    }
// }
console.log(picture,"picture")
    

      const name = document.querySelector('#real-input').value.split(/\\|\//).pop();
            const truncated = name.length > 20 
              ? name.substr(name.length - 20) 
              : name;
            
              document.querySelector('.file-info').innerHTML = truncated;
 
  }


    onFileChange=(event)=>{
        // if (event.target.files && event.target.files[0]) {
        //     let reader = new FileReader();
        //     reader.onload = (e) => {
        //       this.setState({documentOne:  reader.result});
        //     };
        //     reader.readAsDataURL(event.target.files[0]);
        //   }

    //     <GoogleDocsViewer
    //     width="400px"
    //     height="600px"
    //     fileUrl={this.setState({documentOne:event.target.files[0]})}
    // />
          }
 
         
 FileChange=(event)=>{
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({documentTwo:  reader.result});
        };
        reader.readAsDataURL(event.target.files[0]);
      }
     }
     

    editEmployee(employeeId, picture, firstName, middleName, lastName, salary,address, countryName, stateName, cityName, locationName, documentOne, documentTwo, startDate) {

        this.setState({ editEmployeeData: { employeeId,  startDate },   documentOne, documentTwo, picture, firstName, middleName, lastName, salary, address,countryName, stateName, cityName, locationName, editEmployeeModal: !this.state.editEmployeeModal })

    }

    updateEmployee = (employeeId) => {
        console.log(employeeId, "employeeId")

        // console.log(this.state.documentOne, this.state.documentTwo, this.state.profilePicture, this.state.locationId, "documents");
        // let errors = {};
        // const {firstName,middleName,lastName,CTC}=this.state;
        // if(!this.state.firstName){
        //     errors.firstName= "first Name can't be empty. Please select."
        // }
        // if(!this.state.middleName){
        //     errors.middleName= "middle Name can't be empty. Please select."
        // }
        // if(!this.state.lastName){
        //     errors.lastName= "last Name can't be empty. Please select."
        // }
        // if(!this.state.CTC){
        //     errors.CTC= "CTC can't be empty. Please select."
        // }
        // this.setState({ errors });

        // const isValid = Object.keys(errors).length === 0
    
        // // const isValid = this.validate();
        // if (isValid) {
     
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
    
        data.append('picture', this.state.picture)
        console.log(this.state.picture, "picture")

        this.props.updateEmployee(this.state.editEmployeeData.employeeId,data).then(() =>  this.refreshData())

        this.setState({
            modalLoading:true

        })

    }
// }

    deleteEmployee(employeeId) {
        this.setState({ loading: true })

        let { isActive } = this.state.editEmployeeData;

        this.props.deleteEmployee(employeeId, isActive).then(() => this.refreshData())
        this.setState({ editEmployeeData: { isActive: false } })
    }

    searchOnChange = (e) => {

        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }


    getEmployee({ getEmployee }) {
        console.log(getEmployee, "1223");
        if (getEmployee) {
            return (
                getEmployee.data.employee.sort((item1,item2)=>{
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
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
                            <td > <img style={{ width: "70%", height: "35%" }} src={UR + item.picture} alt="desc">
                            </img></td>
                            <td >{item.firstName}</td>
                            <td>{item.middleName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.salary}</td>

                            <td> {item.address},{item.location_master.locationName},{item.city_master.cityName},{item.state_master.stateName},{item.country_master.countryName}</td>

                            <td>
                                <button className="btn btn-light" onClick={this.openModal.bind(this, UR+item.documentOne)}>View Document</button>
                            </td>
                            <td>  <button className="btn btn-light" onClick={this.Modal.bind(this, UR+item.documentTwo)}>View Document </button></td>

                            <td>{item.startDate}</td>
                            

                            <td>
                                <button className="btn btn-success" onClick={this.editEmployee.bind(this, item.employeeId, UR+item.picture, item.firstName, item.middleName, item.lastName, item.salary, item.address,item.country_master.countryName, item.state_master.stateName, item.city_master.cityName, item.location_master.locationName, UR+item.documentOne, UR+item.documentTwo, item.startDate)} >Edit</button>
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
   
    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        if (window.confirm()) {
            this.props.deleteMultipleEmployee(ids)
                .then(() => {
                    this.props.ViewEmployee()
                        .then(() => this.setState({ loading: false }))
                })
                .catch(err => err.response.data.message);
        }
        else {
            this.props.ViewEmployee()
                .then(() => this.setState({ loading: false }))
        }
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
     changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }
     browseBtn = (e) => {
        document.getElementById('real-input').click();
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
                        <th>Address</th>
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
                                  


                          
                                  <input accept='image/*' type="file" name="profilePicture" id="real-input"    onChange={this.onImageChange} />
                                  {/* <img  id="target" style={{ width: "30%", height: "35%" }} src={UR + this.state.picture} alt="desc"/> */}
                                  <Button className="browse-btn" onClick={this.browseBtn}>
                             update
                        </Button>
                        <span className="file-info" >upload New Pic</span>
                                  <img id="target" src={this.state.picture}/>
                               
                                      
                                 
                              </FormGroup>
                                       

                              <FormGroup>
                                  <Label > First Name</Label>
                                  <Input  name="firstName" value={this.state.firstName}
                                      onChange={this.onChange}
              
                                      maxLength={25}
                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                                  <span className="error">{this.state.errors.firstName}</span>
                              </FormGroup>
                              <FormGroup>
                                  <Label > Middle Name</Label>
                                  <Input name="middleName" value={this.state.middleName}
                                      onChange={this.onChange}
                                          
                                      maxLength={25}
                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                                   <span  className="error">{this.state.errors.middleName}</span>
                              </FormGroup>
                              <FormGroup>
                                  <Label > Last Name</Label>
                                  <Input name="lastName" value={this.state.lastName}
                                      onChange={this.onChange}
                                         
                                      maxLength={25}
                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                                   <span  className="error">{this.state.errors.lastName}</span>
                              </FormGroup>
                              <FormGroup>
                                  <Label > Salary</Label>
                                  <Input name="salary" value={this.state.salary}
                                      onChange={this.onChange}

                                      onKeyPress={this.OnKeyPresshandler}

                                  />
                                   <span  className="error" >{this.state.errors.salary}</span>
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
                                  <Label > Address</Label>
                                  <Input name="address" value={this.state.address}
                                      onChange={this.onChange}

                                    

                                  />
                                   <span  className="error" >{this.state.errors.address}</span>
                                   </FormGroup>
                              <FormGroup>
                                
                                  <Label > Document One</Label>

                                  <GoogleDocsViewer
                                      width="400px"
                                      height="600px"
                                      fileUrl={this.state.documentOne}
                                  />
                                
                             
                              <Label> Update your Id</Label>
                                  <input accept='.docx ,.doc,application/pdf' type="file" name="documentOne" onChange={this.onFileChange} />
                               
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

                              <FormGroup>
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
                            
      

           </div>


            let deleteSelectedButton = <Button color="danger" className="mb-2"  disabled={this.state.isDisabled} 
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI  change={this.changePassword}>
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
        societyReducer: state.societyReducer

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ViewEmployee, getCountry, getState, getCity, getLocation, updateEmployee, deleteEmployee,deleteMultipleEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEmployeeMaster) 