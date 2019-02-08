import React, { Component } from 'react';
import { getDetails, deleteDetails, getCountry, updateDetails, AddDetails, getDrop, getSizeDrop } from '../../actionCreators/countryAction';
import { URN } from '../../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { authHeader } from '../../helper/authHeader';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import UI from '../../components/newUI/superAdminDashboard';


class flatMasterDetails extends Component {



    state = {
        editUserData: {
            stateId: '',
            countryId: '',
            countryName: '',
            stateName: '',
            coverArea: '',
            isActive: false
        }
        ,
        editUserModal: false,
        menuVisible: false




    }


    componentDidMount() {

        this.refreshData()

    }

    // componentDidUpdate(){
    //     if(this.props.AddDetails){

    //     }
    // }



    refreshData() {
        this.props.getDetails();
        this.props.getCountry();
        // this.props.getDrop();
        // this.props.getSizeDrop();

    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    updateBook = () => {
        let { stateId, countryId, stateName } = this.state.editUserData;
        this.props.updateDetails(stateId, countryId, stateName);

        this.setState({

            editUserModal: false, editUserData: { stateId: '', countryId: '', stateName: '' }
        })

        // axios.put(`${URN}/flat/` +flatId,{  societyId, flatType, flatSuperArea,
        // sizeId,coverArea},{headers:authHeader()}).then((response) => {
        //   this.refreshData();
        // })
        //   this.setState({
        //     editUserModal: false, editUserData: {  flatId: '',societyName:'',flatType:'', flatSuperArea: '',sizeType:'',CoverArea:''  }
        // })


    }

    stateName = (e) => {

        let { editUserData } = this.state;

        editUserData.stateName = e.target.value;

        this.setState({ editUserData })
        console.log(this.state.editUserData.stateName)

    }


    countryName = (e) => {
        let { editUserData } = this.state
        editUserData.countryId = e.target.value
        this.setState({ editUserData })
        console.log(this.state.editUserData.countryId)

    }

    editBook(stateId, countryName, stateName) {
        this.setState({
            editUserData: { stateId, countryName, stateName }, editUserModal: !this.state.editUserModal
        })
    }

    deleteUser(stateId) {
        let { isActive } = this.state.editUserData
        this.props.deleteDetails(stateId, isActive)
            .then(() => this.setState({ isActive: false }))
        // axios.put(`${URN}/flat/delete/`+stateId, {isActive},{headers:authHeader()}).then((response) => {
        //     this.refreshData()
        //     this.setState({editUserData: {isActive: false}})

        // })
    }

    fetchDetails({ country3 }) {
        console.log(country3)
        if (country3) {

            return country3.map((item) => {

                return (
                    <tr key={item.stateId}>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.stateName}</td>

                        {/* <td>{item.size_master.sizeType}</td> */}

                        <td>
                            <Button color="success" size="sm" className="mr-2"
                                onClick={this.editBook.bind(this, item.stateId, item.country_master.countryName,
                                    item.stateName)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.stateId)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }
    fetchDrop({ country1 }) {
        console.log(country1)
        if (country1) {

            return (
                country1.map((item) => {
                    return (
                        <option key={item.countryId} value={item.countryId}>
                            {item.countryName}
                        </option>
                    )
                })
            )

        }
    }

    // fetchSizeDrop({list3}){
    //     if(list3){

    //        return( 
    //            list3.map((item) =>{
    //                return(
    //                    <option key={item.sizeId} value={item.sizeId}>
    //                     {item.sizeType}
    //                    </option>
    //                )
    //            })
    //        )

    //     }
    // }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render() {
        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({menuVisible: !this.state.menuVisible})}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({menuVisible: false})}
                        visible={this.state.menuVisible}> */}
                <UI onClick={this.logout}>

                    <div>
                        <Link to="/superDashboard/statemaster">Add state</Link>
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit Details</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="roles">CountryName</Label>
                                    <select value={this.state.editUserData.countryId} onChange={this.countryName}>
                                        <option>{this.state.editUserData.countryName}</option>
                                        <option disabled>Select</option>
                                        {this.fetchDrop(this.props.countryDetails)}
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">StateName</Label>
                                    <input
                                        type="textbox"
                                        placeholder="enter state name"
                                        value={this.state.editUserData.stateName}
                                        onChange={this.stateName} />
                                </FormGroup>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.updateBook}>Update Flat</Button>
                                <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <Table>
                            <thead>
                                <tr>
                                    <th>countryName</th>
                                    <th>stateName</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.fetchDetails(this.props.countryDetails)}
                            </tbody>
                        </Table>
                    </div>
                </UI>
                {/* </SideBar>
                 </div> */}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        countryDetails: state.countryDetails

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetails,
        deleteDetails,
        getCountry,
        updateDetails
        // AddDetails,
        // getDrop,
        // getSizeDrop
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
