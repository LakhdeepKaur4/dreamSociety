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
import defaultSelect from '../../constants/defaultSelect'


import GoogleDocsViewer from 'react-google-docs-viewer';

class DisplayEmployeeMaster extends Component {


    state = {
        editEmployeeData: {
            employeeId: '',
            firstName: '',
            middleName: '',
            lastName: '',
            CTC: '',

            startDate: '',
            endDate: '',
         
            selectedDocumentUrl: null,

            documentOne: '',
            documentTwo:'',
            modal: false,
            modalIsOpen: false,
            isActive: false
        },

        profilePicture: null,
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
        ids: [],
        isDisabled: true,
        documentOne: '',
            documentTwo:'',

    }
    componentDidMount() {
        this.refreshData()
    }

    refreshData() {
        this.props.ViewEmployee().then(() => this.setState({ loading: false }));
        this.props.getCountry().then(() => this.setState({ loading: false }))
        this.props.getState().then(() => this.setState({ loading: false }))
        this.props.getCity().then(() => this.setState({ loading: false }))
        this.props.getLocation().then(() => this.setState({ loading: false }))
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

    onPicChange = (event) => {
        this.setState({ profilePicture: event.target.files[0] })



    }

    onFileChange = (event) => {
        console.log('jjjjjjjjjjjj', event);

        this.setState({ documentOne: event.target.files[0] })
    }


    FileChange = (event) => {

        this.setState({ documentTwo: event.target.files[0] })
    }


    editEmployee(employeeId, picture, firstName, middleName, lastName, CTC, countryName, stateName, cityName, locationName, documentOne, documentTwo, startDate, endDate) {
        console.log("first", employeeId, firstName, middleName, lastName, CTC, countryName, stateName, cityName, locationName, documentOne, documentTwo, startDate, endDate);
        this.setState({ editEmployeeData: { employeeId, picture, firstName, middleName, lastName, CTC, documentOne, documentTwo, startDate, endDate }, countryName, stateName, cityName, locationName, editEmployeeModal: !this.state.editEmployeeModal })

    }

    updateEmployee = (employeeId) => {
        console.log(employeeId, "employeeId")

        console.log(this.state.documentOne, this.state.documentTwo, this.state.profilePicture, this.state.locationId, "documents");

        const data = new FormData()
        data.append('documentOne', this.state.documentOne)
        data.append('documentTwo', this.state.documentTwo)
        data.append('firstName', this.state.editEmployeeData.firstName)
        data.append('middleName', this.state.editEmployeeData.middleName)
        data.append('lastName', this.state.editEmployeeData.lastName)
        data.append('CTC', this.state.editEmployeeData.CTC)
        data.append('countryId', this.state.countryId)
        data.append('stateId', this.state.stateId)
        data.append('cityId', this.state.cityId)
        data.append('locationId', this.state.locationId)
        data.append('startDate', this.state.editEmployeeData.startDate)
        data.append('endDate', this.state.editEmployeeData.endDate)
        data.append('profilePicture', this.state.profilePicture)
        console.log(this.state.editEmployeeData.picture, "picture")

        this.props.updateEmployee(this.state.editEmployeeData.employeeId, data).then(() => { this.refreshData() })

        this.setState({
            editEmployeeModal: false

        })

    }

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
                getEmployee.data.employee.filter(this.searchFilter(this.state.search)).map((item, index) => {

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
                            <td>{item.CTC}</td>

                            <td>{item.location_master.locationName},{item.city_master.cityName},{item.state_master.stateName},{item.country_master.countryName}</td>

                            <td>
                                <button className="btn btn-light" onClick={this.openModal.bind(this, item.documentOne)}>View Document</button>
                            </td>
                            <td>  <button className="btn btn-light" onClick={this.Modal.bind(this, item.documentTwo)}>View Document </button></td>

                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>

                            <td>
                                <button className="btn btn-success" onClick={this.editEmployee.bind(this, item.employeeId, item.picture, item.firstName, item.middleName, item.lastName, item.CTC, item.country_master.countryName, item.state_master.stateName, item.city_master.cityName, item.location_master.locationName, item.documentOne, item.documentTwo, item.startDate, item.endDate)} >Edit</button>
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
        if (window.confirm('Are You Sure ?')) {
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

    render() {
        let tableData;

        tableData =
            <Table >
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
                        }  
                    }/></th>
                        <th>#</th>
                        <th>Profile Picture</th>
                        <th> First Name</th>
                        <th> Middle Name</th>
                        <th> Last Name</th>
                        <th> CTC</th>
                        <th>Address</th>
                        <th>ID</th>
                        <th>ID2</th>
                        <th>Start Date</th>
                        <th>End Date</th>

                        <th> Actions  </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployee(this.props.EmpDetails)}
                </tbody>
            </Table>
            let deleteSelectedButton = <Button color="danger" className="mb-2"  disabled={this.state.isDisabled} 
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI>
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

                                <FormGroup>
                                    <Label> Update your Profile photo</Label>
                                    <input accept='image/*' type="file" name="profilePicture" onChange={this.onPicChange} />
                                    <img style={{ width: "30%", height: "35%" }} src={UR + this.state.editEmployeeData.picture} alt="desc">
                                    </img>
                                </FormGroup>


                                <FormGroup>
                                    <Label > First Name</Label>
                                    <Input value={this.state.editEmployeeData.firstName}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.firstName = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                        required
                                        maxLength={25}
                                        onKeyPress={this.OnKeyPresshandler}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label > Middle Name</Label>
                                    <Input id="middleName" value={this.state.editEmployeeData.middleName}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.middleName = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                        required
                                        maxLength={25}
                                        onKeyPress={this.OnKeyPresshandler}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label > Last Name</Label>
                                    <Input id="serviceType" value={this.state.editEmployeeData.lastName}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.lastName = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                        required
                                        maxLength={25}
                                        onKeyPress={this.OnKeyPresshandler}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label > CTC</Label>
                                    <Input id="serviceType" value={this.state.editEmployeeData.CTC}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.CTC = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                        required

                                        onKeyPress={this.OnKeyPresshandler}

                                    />
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

                                        }}>
                                            <option value={this.state.locationId}>{this.state.locationName}</option>
                                            <option disabled>Select</option>
                                            {this.fetchLocation(this.props.societyReducer)}
                                        </Input>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label > Document One</Label>

                                    <GoogleDocsViewer
                                        width="400px"
                                        height="780px"
                                        fileUrl={UR + this.state.editEmployeeData.documentOne}
                                    />

                                </FormGroup>
                                <FormGroup>
                                <Label> Update your Id</Label>
                                    <input accept='.docx ,.doc,application/pdf' type="file" name="documentOne" onChange={this.onFileChange} />
                                </FormGroup>
                                <FormGroup>
                                <Label> Update your Id</Label>
                                    <input accept='.docx,application/pdf' type="file" name="documentTwo" onChange={this.FileChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label > Document Two</Label>

                                    <GoogleDocsViewer
                                        width="400px"
                                        height="780px"
                                        fileUrl={UR + this.state.editEmployeeData.documentTwo}
                                    />

                                </FormGroup>
                                <FormGroup>
                                    <Label > Start Date</Label>
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
                                <FormGroup>
                                    <Label > End Date</Label>
                                    <Input type="date" value={this.state.editEmployeeData.endDate}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.endDate = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                        required

                                        onKeyPress={this.OnKeyPresshandler}

                                    />
                                </FormGroup>



                                <Button color="primary" className="mr-2" onClick={this.updateEmployee}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditEmployeeModal.bind(this)}>Cancel</Button>

                            </ModalBody>
                        </Modal>
                        <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                        {deleteSelectedButton}
                        {!this.state.loading ? tableData : <Spinner />}
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen} >
                        <ModalHeader toggle={this.toggleModal.bind(this)}></ModalHeader>
                        <ModalBody>

                            <GoogleDocsViewer
                                width="400px"
                                height="780px"
                                fileUrl={UR + this.state.documentOne}
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
                                fileUrl={UR + this.state.documentTwo}
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