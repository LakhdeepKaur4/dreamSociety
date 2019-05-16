import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';
import { getTowerName } from '../../actionCreators/flatDetailMasterAction';
import { numberValidation, memberMaxDate, emailValid, panCardValidation, fNameKeyPress, OnKeyPressUserhandler } from '../../validation/validation';
import ModalBox from '../../components/modal/modal';
import InputField from '../../components/reusableComponents/inputs';
import DropdownComponent from '../../components/reusableComponents/dropdown';
import ButtonComponent from '../../components/reusableComponents/button';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { getExpenseDetail, getMonthlyElecExpense,calculateCharges, updateElecExpense } from '../../actionCreators/monthlyElectricityExpense';
import { Table, Row, Col, FormGroup, Input, Button, Label } from 'reactstrap';

class MonthlyElectricityExpenseDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            towerName:'',
            floorName:'', 
            flatNo:'', 
            lastReading :'', 
            currentReading:'', 
            monthlyCharge:'', 
            mdi:'', 
            sanctionedLoad:'', 
            rate:'', 
            rent:'', 
            amount:'', 
            amountDue:null,
            electricityConsumerId:'',
            towerId:'',
            floorId:'', 
            flatDetailId:'',
            editModal:false,
            unitConsumed:'',
            errors:'',
            errMessage:''
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData(){
        this.props.getMonthlyElecExpense()
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    addExpense = () => {
        this.props.history.push('/superDashboard/addMonthlyElectricityExpenseDetail');
    }

    getElectricityExpense = ({getMonthlyElectricityExpense}) => {
        if(getMonthlyElectricityExpense){
            console.log(getMonthlyElectricityExpense && getMonthlyElectricityExpense.electricityConsumer)
            return getMonthlyElectricityExpense.electricityConsumer.map((item,index) => {
                if(item && item.flat_detail_master){
                    return (
                        <tr key={item.electricityConsumerId}>
                            <td>{index + 1}</td>
                            <td>{item.flat_detail_master.tower_master.towerName}</td>
                            <td>{item.flat_detail_master.floor_master.floorName}</td>
                            <td>{item.flat_detail_master.flatNo}</td>
                            <td>{item.lastReading}</td>
                            <td>{item.currentReading}</td>
                            <td>{item.monthlyCharge}</td>
                            <td>
                                <ButtonComponent color="success" title="Edit" className="mr-2" buttonClicked= {this.edit.bind(this, item.flat_detail_master.tower_master.towerName,
                                   item.flat_detail_master.floor_master.floorName, item.flat_detail_master.flatNo,item.lastReading,item.currentReading, item.unitConsumed,
                                   item.monthlyCharge, item.mdi, item.sanctionedLoad, item.rate,item.rent, item.amount, item.amountDue
                                   , item.electricityConsumerId, item.flat_detail_master.tower_master.towerId, item.flat_detail_master.floor_master.floorId,
                                   item.flat_detail_master.flatDetailId)} />
                                <ButtonComponent color="danger" title="Delete" />
                            </td>
                        </tr>
                    );
                }
            })
        }
    }

    edit = (towerName, floorName, flatNo, lastReading , currentReading,unitConsumed, monthlyCharge, mdi, sanctionedLoad, rate, rent, amount, amountDue,electricityConsumerId, towerId, floorId, flatDetailId ) => {
            console.log(towerName, floorName, flatNo, lastReading , currentReading,unitConsumed, monthlyCharge, mdi, sanctionedLoad, rate, rent, amount, amountDue,
                electricityConsumerId, towerId, floorId, flatDetailId);
                this.setState({towerName, floorName, flatNo, lastReading , currentReading,unitConsumed, monthlyCharges:monthlyCharge, mdi, sanctionedLoad, rate, rent, amount, amountDue,
                    electricityConsumerId, towerId, floorId, flatDetailId, editModal:true})
    }

    editExpenseModal = () => {
        this.setState({editModal:!this.state.editModal})
    }

    currentReadingChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ currentReading: e.target.value, unitConsumed:(e.target.value - this.state.lastReading),errMessage:'' });
        }
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                errors,errMessage:''
            });
        }
    }

    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value,errMessage:''});
            console.log(this.state);
        }
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                errors,errMessage:''
            });
        }
    }

    calcCharges = () => {
        let { unitConsumed, sanctionedLoad, amountDue, amount, mdi, rate, rent } = this.state;
        let data = { unitConsumed, sanctionedLoad, amountDue, amount, mdi, rate, rent };
        this.props.calculateCharges(data)
        .then(() => this.getMonthlyCharges(this.props.monthlyElectricityExpenseReducer))
    }

    getMonthlyCharges = ({getCharges}) => {
        if(getCharges && getCharges.monthlyCharges){
            console.log(getCharges);
            this.setState({monthlyCharges:getCharges.monthlyCharges})
        }
    }

    update = (e) => {
        e.preventDefault();
        let { towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
            mdi,amountDue, amount, monthlyCharges, errors, towerName, floorName, flatNo,electricityConsumerId } = this.state;
        
        console.log(towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
                mdi,amountDue, amount, monthlyCharges, errors, towerName, floorName, flatNo, electricityConsumerId);
        
        let data= {
            towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
                mdi,amountDue, amount, monthlyCharge:monthlyCharges, errors, towerName, floorName, flatNo,electricityConsumerId
        }

        this.props.updateElecExpense(data)
        .then(() => this.refreshData());

    }

    render(){
        let { towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
            mdi,amountDue, amount, monthlyCharges, errors, towerName, floorName, flatNo } = this.state;
        let tableData = <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tower</th>
                    <th>Floor</th>
                    <th>Flat</th>
                    <th>Last Reading</th>
                    <th>Current Reading</th>
                    <th>Monthly Electricity Charges</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.getElectricityExpense(this.props.monthlyElectricityExpenseReducer)}
            </tbody>
        </Table>

        let editInputs = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <InputField label="Tower"
                            name="towerName"
                            type="text"
                            value={towerName}
                            disabled={true} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Floor"
                            name="floorName"
                            type="text"
                            value={floorName}
                            disabled={true} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Flat No."
                            name="flatNo"
                            type="text"
                            value={flatNo}
                            disabled={true} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <InputField label="Last Reading"
                            name="lastReading"
                            type="text"
                            value={lastReading}
                            disabled={true} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Current Reading"
                            name="currentReading"
                            type="text"
                            value={currentReading}
                            inputChange={this.currentReadingChange} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Unit Consumed"
                            name="unitConsumed"
                            type="text"
                            value={unitConsumed}
                            disabled={true} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={3}>
                        <InputField label="Last Amount Due"
                            name="lastAmountDue"
                            type="text"
                            value={(amountDue == true ? '-' : amountDue == false ? '+':'') + amount}
                            disabled={true} />
                    </Col>
                    <Col md={3}>
                        <InputField label="Rate"
                            name="rate"
                            type="text"
                            value={rate}
                            disabled={true}
                            inputChange={this.currentReadingChange} />
                    </Col>
                    <Col md={3}>
                        <InputField label="Rent"
                            name="rent"
                            type="text"
                            value={rent}
                            inputChange={this.rateChange} />
                    </Col>
                    <Col md={3}>
                        <InputField label="Sanctioned Load"
                            name="sanctionedLoad"
                            type="text"
                            value={sanctionedLoad}
                            disabled={true} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <InputField label="MDI"
                            name="mdi"
                            type="text"
                            value={mdi}
                            disabled={true} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Monthly Charges"
                            name="monthlyCharges"
                            type="text"
                            value={monthlyCharges}
                            disabled={true}
                            inputChange={this.rateChange} />
                    </Col>
                    <Col md={4}>
                        <ButtonComponent 
                            title="Calculate Charges"
                            disabled={(!towerId || !floorId || !flatDetailId || !lastReading || !currentReading || !unitConsumed || !amount || !rate || !rent || !sanctionedLoad ||
                                !mdi)}
                            color="primary"
                            style={{marginTop:'28px'}}
                            buttonClicked={this.calcCharges} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <ButtonComponent
                    title="Save"
                    className="mr-2"
                    color="primary"
                    buttonClicked={this.update} />
                <ButtonComponent
                    title="Save"
                    className="mr-2"
                    color="danger"
                    buttonClicked={this.editExpenseModal.bind(this)} />
            </FormGroup>
        </div>
        return (
            <UI>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details" >
                        <h3 align="center"> Monthly Electricity Expense Detail</h3>
                        <ButtonComponent title="Add Expense" color="primary" buttonClicked={this.addExpense} />
                    </div>
                    <ModalBox openModal = {this.state.editModal}
                     toggle={this.editExpenseModal.bind(this)}
                     title="Monthly Electricity Expense">
                        {editInputs}
                    </ModalBox>
                    {tableData}
                </div>
            </UI>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        electricityExpenseReducer: state.electricityExpenseReducer,
        monthlyElectricityExpenseReducer: state.monthlyElectricityExpenseReducer
    }
}

export default connect(mapStateToProps, {getMonthlyElecExpense, calculateCharges,updateElecExpense})(MonthlyElectricityExpenseDetail);