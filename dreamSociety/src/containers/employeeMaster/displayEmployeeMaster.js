import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Modal, Button, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { getCountryName, getStateName, getCityName, getLocationName, getLocation } from '../../actionCreators/locationMasterAction';
import { ViewEmployee } from '../../actionCreators/employeeMasterAction';
import { bindActionCreators } from 'redux';
import { UR } from '../../actions';
import Spinner from '../../components/spinner/spinner'
import UI from '../../components/newUI/superAdminDashboard'
import FileViewer from 'react-file-viewer';
import defaultSelect from '../../constants/defaultSelect'
const type = 'docx'
class DisplayEmployeeMaster extends Component {


    state = {
        profilePicture: '',
        firstName: '',
        middleName: '',
        lastName: '',
        CTC: '',
        startDate: '',
        endDate: '',
        loading: true,
        selectedDocumentUrl: null,

        documentOne: [],
        modal: false,
        modalIsOpen: false,

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

       editEmployee(firstName,middleName,lastName,CTC,documentOne,documentTwo,startDate,endDate){
              this.setState({editEmployeeData:{ firstName:'',middleName:'',lastName:'',CTC:'',documentOne:'',documentTwo:'',startDate:'',endDate:''}, editEmployeeModal: !this.state.editEmployeeModal})
       }


    getEmployee({ getEmployee }) {
        console.log(getEmployee, "1223");
        if (getEmployee) {
            return (
                getEmployee.data.employee.map((item, index) => {

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
                                <button className="btn btn-success" onClick={this.editEmployee.bind(this, item.id, item.firstName, item.middleName, item.lastName, item.CTC, item.documentOne, item.documentTwo, item.CTC, item.startDate, item.endDate)} >Edit</button>
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
                    {!this.state.loading ? (
                        <div>
                            {tableData}

                        </div>
                    ) : <Spinner />}
                    <Modal
                        isOpen={this.state.modalIsOpen} >
                        <ModalHeader toggle={this.toggleModal.bind(this)}></ModalHeader>
                        <ModalBody>
                            <FileViewer
                                fileType={type}
                                filePath={UR + this.state.documentOne} />

                        </ModalBody>

                    </Modal>
                    <Modal
                        isOpen={this.state.modal} >
                        <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
                        <ModalBody>
                            <FileViewer
                                fileType={type}
                                filePath={UR + this.state.documentTwo} />

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
    return bindActionCreators({ ViewEmployee, getCountryName, getStateName, getCityName, getLocationName, getLocation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEmployeeMaster)