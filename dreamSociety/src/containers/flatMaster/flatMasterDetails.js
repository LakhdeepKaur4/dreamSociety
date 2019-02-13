import React, { Component } from 'react';
import { getDetails, AddDetails, getDrop, getSizeDrop } from '../../actionCreators/flatMasterAction';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { authHeader } from '../../helper/authHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label,Input } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';
import { URN } from '../../actions/index'

class flatMasterDetails extends Component {
    state = {
        editUserData: {
            flatId: '',
            societyId: '',
            societyName: '',
            flatType: '',
            flatSuperArea: '',
            sizeId: '',
            sizeType: '',
            sizeType1: '',
            coverArea: '',
            loading:true,
            isActive: false,

        },
        editUserModal: false,
        menuVisible: false,
        search: ''
    }


    componentDidMount() {

        this.refreshData()

    }

    // componentDidUpdate(){
    //     if(this.props.AddDetails){

    //     }
    // }



    refreshData() {
        this.props.getDetails().then(() => this.setState({loading:false}));
        this.props.getDrop().then(() => this.setState({loading:false}));
        this.props.getSizeDrop().then(() => this.setState({loading:false}));

    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    updateBook = () => {
        let { flatId, societyId, flatType, flatSuperArea, sizeId, coverArea } = this.state.editUserData;

        axios.put(`${URN}/flat/` + flatId, {
            societyId, flatType, flatSuperArea,
            sizeId, coverArea
        }, { headers: authHeader() }).then((response) => {
            this.refreshData();
        })
        this.setState({
            editUserModal: false,loading:true, editUserData: { flatId: '', societyName: '', flatType: '', flatSuperArea: '', sizeType: '', CoverArea: '' }
        })


    }

    selectflatType = (e) => {

        let { editUserData } = this.state;

        editUserData.flatType = e.target.value;

        this.setState({ editUserData })

    }
    setFlatSuperArea = (e) => {

        let { editUserData } = this.state;

        editUserData.flatSuperArea = e.target.value;

        this.setState({ editUserData })

    }
    setCoverArea = (e) => {

        let { editUserData } = this.state;

        editUserData.coverArea = e.target.value;

        this.setState({ editUserData })

    }

    societyNameType = (e) => {
        let { editUserData } = this.state
        editUserData.societyId = e.target.value
        this.setState({ editUserData })
        console.log(this.state.editUserData.societyId)

    }
    sizeNameType = (e) => {
        let { editUserData } = this.state
        editUserData.sizeId = e.target.value
        this.setState({ editUserData })


    }

    searchFilter(search) {
        return function (x) {
            const flatSuperArea = x.flatSuperArea.toString();
            const coverArea = x.coverArea.toString()
            return x.society_master.societyName.toLowerCase().includes(search.toLowerCase()) ||
                x.flatType.toLowerCase().includes(search.toLowerCase()) ||
                flatSuperArea.toLowerCase().includes(search.toLowerCase()) ||
                x.size_master.sizeType.toLowerCase().includes(search.toLowerCase()) ||
                coverArea.toLowerCase().includes(search.toLowerCase()) ||
                !search;
            
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }


    editBook(flatId, societyName, flatType, flatSuperArea, sizeType, coverArea) {
        this.setState({
            editUserData: { flatId, societyName, flatType, flatSuperArea, sizeType, coverArea }, editUserModal: !this.state.editUserModal
        })
    }

    deleteUser(flatId) {
        let { isActive } = this.state.editUserData
        axios.put(`${URN}/flat/delete/` + flatId, { isActive }, { headers: authHeader() }).then((response) => {
            this.refreshData()
            this.setState({ editUserData: { isActive: false },loading:true })

        })
    }

    fetchUsers({ list1 }) {
        if (list1) {

            return list1.filter(this.searchFilter(this.state.search)).map((item) => {

                return (
                    <tr key={item.flatId}>
                        <td>{item.society_master.societyName}</td>
                        <td>{item.flatType}</td>
                        <td>{item.flatSuperArea}</td>
                        <td>{item.size_master.sizeType}</td>
                        <td>{item.coverArea}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2"
                                onClick={this.editBook.bind(this, item.flatId, item.society_master.societyName,
                                    item.flatType, item.flatSuperArea, item.size_master.sizeType, item.coverArea)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.flatId)} >Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }
    fetchDrop({ list2 }) {
        if (list2) {

            return (
                list2.map((item) => {
                    return (
                        <option key={item.societyId} value={item.societyId}>
                            {item.societyName}
                        </option>
                    )
                })
            )

        }
    }

    fetchSizeDrop({ list3 }) {
        if (list3) {

            return (
                list3.map((item) => {
                    return (
                        <option key={item.sizeId} value={item.sizeId}>
                            {item.sizeType}
                        </option>
                    )
                })
            )

        }
    }
    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/flatmaster')
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    OnKeyPresshandlerPhone=(event)=>{
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
        let tableData;
        tableData=<Table className="table table-bordered">
        <thead>
            <tr>
                <th>Society Name</th>
                <th>Flat Type</th>
                <th>Flat SuperArea</th>
                <th>SizeType</th>
                <th>Cover Area</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.fetchUsers(this.props.flats)}
        </tbody>
    </Table>
     
     if(!this.props.flats.list1 && !this.props.flats.list2 && !this.props.flats.list3 ){
        tableData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner /></div>
    }
        return (
            <div>
                <UI onClick={this.logout}>
                        <div className="w3-container w3-margin-top  w3-responsive">
                        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                            <div className="top-details">                               
                             <h3>Flat Master Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Add Flats</Button>
                                </div>

                            
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="roles">SocietyName</Label>
                                    <Input type="select" value={this.state.editUserData.societyId} onChange={this.societyNameType}>
                                            
                                            <option>{this.state.editUserData.societyName}</option>
                                            <option disabled>Select</option>
                                            {this.fetchDrop(this.props.flats)}
                                            
                                        </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">flatType</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter  flat type"
                                        value={this.state.editUserData.flatType}
                                        onChange={this.selectflatType} 
                                        maxLength='4'/>
                                        
                                </FormGroup>
                                <FormGroup>
                                    <Label for="firstName">Flat Super Area</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter flat super area"
                                        value={this.state.editUserData.flatSuperArea}
                                        onChange={this.setFlatSuperArea}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='3' />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">sizeType</Label>
                                    <Input type="select" 
                                    value={this.state.editUserData.sizeId} onChange={this.sizeNameType}>
                                        <option>{this.state.editUserData.sizeType}</option>
                                        <option disabled>Select</option>
                                        {this.fetchSizeDrop(this.props.flats)}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Cover Area</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter cover area"
                                        value={this.state.editUserData.coverArea}
                                        onChange={this.setCoverArea}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='3' />

                                </FormGroup>
                                <FormGroup>
                                <Button color="primary mr-2" onClick={this.updateBook}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                </FormGroup>
                            </ModalBody>
                            
                        </Modal>
                        <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {!this.state.loading ? tableData : <Spinner />}
                     
                    </div>
                </UI>
                
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        flats: state.flats

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetails,
        AddDetails,
        getDrop,
        getSizeDrop
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
