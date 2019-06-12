import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { getFingerprintData,getMachineData } from '../../actions/fingerprint';
import { connect } from 'react-redux';
import { Table, Row, Col, FormGroup, Input, Button, Label } from 'reactstrap'
import DropdownComponent from '../../components/reusableComponents/dropdown';
import DefaultSelect from '../../constants/defaultSelect';
import styles from '../../components/newUI/common.css'


class FingerPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            flats: '',
            editModal: false,
            editData: {
                isActive: false
            },
            filterName: 'flatNo',
            flatDetailId:'',
            modalLoading: false,
            modal: false,
            isDisabled: true,
            ids: [],
            search: '',
            message: '',
            errors: {},
        }

    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        this.props.getFingerprintData();
        // .then(() => this.setState({ loading: false, modalLoading: false, modal: false }))
        // this.props.getRateForElectricityExpense();
    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    onChangeInput = (e) => {
        console.log("^^edit ", this.state, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.getMachineData(e.target.value);
    }

    getMachineComponent(){
        console.log("userId",this.state.flatDetailId);
         this.props.history.push('/superDashboard/getMachineData');
    }

    getDropdownForFlats = ({ fingerprintDetails},userId) => {
        if (fingerprintDetails && fingerprintDetails.userData) {
            return fingerprintDetails.userData.filter((flatRecord) => {        
                return flatRecord.userId == userId
            }).map((item) => {
                return item.flats.map((item) => {
                    return (
                        <option key={item.flatDetailId} value={item.flatDetailId} >
                            {item.flatNo}
                        </option>
                    )
                })
            })
        }
    }

    getFingerprintDetail({ fingerprintDetails }) {
        if (fingerprintDetails && fingerprintDetails.userData) {
            return fingerprintDetails.userData.map((item, index) => {
                return (
                    <tr key={item.userId}>
                        <td> {index + 1}</td>
                        <td> {item.firstName + " " + item.lastName}</td>
                        <td> {item.email}</td>
                        <td> {item.contact}</td>
                        <td>
                            <DropdownComponent
                                name="flatDetailId"
                                type="select"
                                inputChange={this.onChangeInput}
                                value={this.state.flatDetailId}
                            // className="error"
                            // error={this.state.errors.rate}
                            ><DefaultSelect />
                                {this.getDropdownForFlats(this.props.fingerprintReducer,item.userId)}
                            </DropdownComponent>
                            {/* <Input type="select" value={this.state.flatDetailId}  name="flatDetailId" onChange={this.onChangeInput} selected={this.state.flatDetailId}>
                                <DefaultSelect/>

                                {this.getDropdownForFlats(this.props.fingerprintReducer)}
                            </Input> */}
                        </td>
                        <td>
                            <Button color="success" className="mr-2" onClick={this.getMachineComponent.bind(this,item.userId)}>Get Machine</Button>
                        </td>
                    </tr>
                )
            })
        }

    }

    render() {

        let tableData = <Table bordered>
            <thead>
                <tr>
                    {/* <th style={{ width: '4%' }}></th> */}
                    <th style={{ width: '4%' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Flats</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.getFingerprintDetail(this.props.fingerprintReducer)}
            </tbody>
        </Table>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3 align="center">Finger Print Data Master</h3>
                        <Button color="primary" onClick={this.addExpense}>Finger Print Data Master</Button>
                    </div>
                    {tableData}
                </div>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fingerprintReducer: state.fingerprintReducer,
    }
}
export default connect(mapStateToProps, { getFingerprintData,getMachineData })(FingerPrint);