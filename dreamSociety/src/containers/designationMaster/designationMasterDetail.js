import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  getDesignation, deleteDesignation, updateDesignation } from './../../actionCreators/designationMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class DesignationMasterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editDesignationData: {
                designationName: '',
                designationId: '',
                
                isActive: false,

            },
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},

        };
    }

    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }


    toggle = (designationId, designationName) => {

        this.setState({
            designationId,
            designationName,
           
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
        this.props.getDesignation().then(() => this.setState({ loading: false }))
       
    }


    editdesignation = () => {
       
        const { designationId, designationName } = this.state
        
        let errors = {};
        if(this.state.designationName===''){
            errors.designationName="designationName can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        
        if (isValid) {
            this.setState({
                loading: true
            })
        this.props.updateDesignation(designationId, designationName)
            .then(() => this.refreshData())
        this.setState({
            editDesignationData: { designationId, designationName },
            modal: !this.state.modal
        })
    }
    }

      deleteDesignationName = (designationId) => {
        let { isActive } = this.state.editDesignationData
        this.setState({ loading: true })
        this.props.deleteDesignation(designationId, isActive)
            .then(() => this.refreshData())
        this.setState({editDesignationData: { isActive: false } })

      }



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
         
            return x.designationName.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }

   


    renderDesignation = ({ designationResult }) => {
         console.log(designationResult,"fgfjhkjkjjjjjjjjjjjj")
        if (designationResult) {
            return designationResult.designation.filter(this.searchFilter(this.state.search)).map((item, index) => {

                return (
                    <tr key={item.designationId}>
                        <td>{index+1}</td>
                        <td>{item.designationName}</td>
                        <td> 
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.designationId, item.designationName)} >Edit</Button>
                            <Button color="danger" onClick={this.deleteDesignationName.bind(this, item.designationId)} >Delete</Button>

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

    routeToAddNewDesignation = () => {
        this.props.history.push('/superDashboard/designationMaster')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z]+$/;
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
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Designation Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderDesignation(this.props.DesignationMasterReducer)}
                </tbody>
            </Table></div>
        return (
            <div>

                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                        <div className="top-details">
                            <h3>Designation Details</h3>
                            <Button onClick={this.routeToAddNewDesignation} color="primary">Add Designation</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        {!this.state.loading ? tableData : <Spinner />}
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label>Designation Type</Label>
                                    <Input type="text" id="designationId" name="designationName" onChange={this.onChangeHandler} value={this.state.designationName} maxLength={50} onKeyPress={this.OnKeyPressUserhandler} />
                                    <span className="error">{this.state.errors.designationName}</span>
                                </FormGroup>


                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editdesignationName}>Save</Button>

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
        DesignationMasterReducer: state.DesignationMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getDesignation, deleteDesignation, updateDesignation }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(DesignationMasterDetail);