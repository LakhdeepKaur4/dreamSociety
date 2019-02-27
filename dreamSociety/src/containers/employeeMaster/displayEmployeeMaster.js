import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Modal, Button, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { getCountryName, getStateName, getCityName, getLocationName, getLocation } from '../../actionCreators/locationMasterAction';
import { ViewEmployee,updateEmployee } from '../../actionCreators/employeeMasterAction';
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

            firstName: '',
            middleName: '',
            lastName: '',
            CTC: '',
            profilePicture: '',
            startDate: '',
            endDate: '',
            loading: true,
            selectedDocumentUrl: null,

            documentOne: [],
            modal: false,
            modalIsOpen: false,
        },
        editEmployeeModal: false,
        loading: true,
        search:'',

    }
    componentDidMount() {
        this.refreshData()
    }

    refreshData() {
        this.props.ViewEmployee().then(() => this.setState({ loading: false }));
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


    editEmployee(employeeId,picture,firstName, middleName, lastName, CTC, documentOne, documentTwo, startDate, endDate) {
        console.log("first", employeeId,firstName, middleName, lastName, CTC, documentOne, documentTwo, startDate, endDate);
        this.setState({ editEmployeeData: {picture, firstName, middleName, lastName, CTC, documentOne, documentTwo, startDate, endDate }, editEmployeeModal: !this.state.editEmployeeModal })
     
    }
        
    updateEmployee = () => {

        let { employeeId,picture,firstName, middleName, lastName, CTC, documentOne, documentTwo, startDate, endDate } = this.state.editEmployeeData;
        this.props.updateEmployee(employeeId,picture,firstName, middleName, lastName, CTC, documentOne, documentTwo, startDate, endDate).then(() => { this.refreshData() })




        this.setState({
            editEmployeeModal: false, loading: true, editEmployeeData: { employeeTypeId: '', employeeWorkTypeId: '', serviceType: '' }
        })
    }

    searchOnChange = (e) => {
        //  this.setState({})
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
                                <button className="btn btn-success" onClick={this.editEmployee.bind(this,item.employeeId, item.picture,item.firstName, item.middleName, item.lastName, item.CTC, item.documentOne, item.documentTwo, item.startDate, item.endDate)} >Edit</button>
                                <button className="btn btn-danger"   > Delete</button>
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


    render() {
        let tableData;

        tableData =
            <Table >
                <thead>
                    <tr>
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
                                    <Label > profile Picture</Label>
                                   
                                </FormGroup>
                                <img style={{ width: "30%", height: "35%" }} class="img-rounded"  src={UR + this.state.editEmployeeData.picture} alt="desc">
                            </img>


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

                                            editEmployeeData.startDate= e.target.value;

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
        locationMasterReducer: state.locationMasterReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ViewEmployee, getCountryName, getStateName, getCityName, getLocationName, getLocation,updateEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEmployeeMaster) 