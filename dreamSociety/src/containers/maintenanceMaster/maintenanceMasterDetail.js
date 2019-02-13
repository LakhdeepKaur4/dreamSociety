import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMaintenance, deleteMaintenance, updateMaintenance } from './../../actionCreators/maintenanceMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class MaintenanceMasterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMaintenanceData: {
                category: '',
                maintenanceId: '',
                
                isActive: false,

            },
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,

        };
    }
    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggle = (maintenanceId,category) => {

        this.setState({
            maintenanceId,
            category,
           
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }


    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getMaintenance().then(() => this.setState({ loading: false }))
       
    }




    // editcategory = () => {
    //     this.setState({
    //         loading: true
    //     })
    //     const { maintenanceId, category } = this.state


    //     this.props.updateMaintenance(maintenanceId, category)
    //         .then(() => this.refreshData())
    //     this.setState({
    //         editMaintenanceData: { maintenanceId, category },
    //         modal: !this.state.modal
    //     })


    // }

    // deleteCityName = (maintenanceId) => {
    //     let { isActive } = this.state.editMaintenanceData
    //     this.setState({ loading: true })
    //     this.props.deleteMaintenance(maintenanceId, isActive)
    //         .then(() => this.refreshData())
    //     this.setState({editMaintenanceData: { isActive: false } })

    // }



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            console.log(x)
            return x.category.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }


    renderMaintenance = ({ maintenanceResult }) => {

        if (maintenanceResult) {
            return maintenanceResult.maintenance.filter(this.searchFilter(this.state.search)).map((item) => {

                return (
                    <tr key={item.maintenanceId}>
                        <td>{item.category}</td>
                        <td>
                            <Button color="success mr-2" >Edit</Button>
                            <Button color="danger">Delete</Button>
                             
                            {/* <Button color="success mr-2" onClick={this.toggle.bind(this, item.maintenanceId, item.category)} >Edit</Button> */}
                            {/* <Button color="danger" onClick={this.deleteMaintenanceName.bind(this, item.maintenanceId)} >Delete</Button> */}

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

    routeToAddNewMaintence = () => {
        this.props.history.push('/superDashboard/maintenanceMaster')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    render() {
        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Maintenance Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderMaintenance(this.props.MaintenanceMasterReducer)}
                </tbody>
            </Table></div>
        return (
            <div>

                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top w3-responsive">

                        <div className="top-details">
                            <h3>Maintenance Category</h3>
                            <Button onClick={this.routeToAddNewMaintence} color="primary">Add Category</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        {!this.state.loading ? tableData : <Spinner />}
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="category"></Label>
                                    <Input type="text" id="maintenanceId" name="category" onChange={this.onChangeHandler} value={this.state.category} maxLength={50} onKeyPress={this.OnKeyPressUserhandler} />
                                </FormGroup>


                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editcategory}>Save</Button>

                                    <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                                </FormGroup>
                            </ModalBody>
                        </Modal>


                    </div>
                </UI>

            </div>
        );
    }
}


function mapStatToProps(state) {
   console.log(state)
    return {
        MaintenanceMasterReducer: state.MaintenanceMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMaintenance,deleteMaintenance, updateMaintenance }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(MaintenanceMasterDetail);