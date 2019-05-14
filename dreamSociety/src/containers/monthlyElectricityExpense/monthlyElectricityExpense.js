import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import { Col, Row, Form, Button, FormGroup } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { getTowerName } from '../../actionCreators/flatDetailMasterAction';
import { getfloorsOfTowers, addElectricityExpense } from '../../actionCreators/electricityExpense';
import { getExpenseDetail, calculateCharges } from '../../actionCreators/monthlyElectricityExpense';
import { numberValidation, memberMaxDate, emailValid, panCardValidation, fNameKeyPress, OnKeyPressUserhandler } from '../../validation/validation';

class MonthlyElectricityExpense extends Component {
    constructor(props){
        super(props);
        this.state = {
            towerId:'',
            floorId:'',
            flatDetailId:'',
            lastAmountDue:'',
            rate:'',
            rent:'',
            sanctionedLoad:'',
            mdi:'',
            startDate:'',
            endDate:'',
            unitConsumed:'',
            monthlyCharges:'',
            electricityConsumerId:'',
            amount:'',
            amountDue:null,
        }
    }

    componentDidMount() {
        this.props.getTowerName();
        console.log(this.props.getTowerName)
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    towerChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.towerId);
        this.props.getfloorsOfTowers(event.target.value)
    }

    getDropdownForTower = ({ name }) => {
        console.log("tower ?", name)
        if (name) {
            return name.map((item) => {
                return (
                    <option key={item.towerId} value={item.towerId} >
                        {item.towerName}
                    </option>
                )
            })
        }
    }

    getFloorData = ({ floorDetails }) => {
        console.log(floorDetails)
        if (floorDetails && floorDetails.tower && floorDetails.tower.Floors) {
            console.log(floorDetails)
            return floorDetails.tower.Floors.map((items) => {
                return (
                    <option key={items.floorId} value={items.floorId}>
                        {items.floorName}
                    </option>
                )
            })
        }
    }

    // componentDidUpdate(){
    //     if(getExpenseDetail){
    //         console.log(this.props.monthlyElectricityExpenseReducer.getExpenseDetail)
    //     }
    // }


    getFlatData = ({ floorDetails }) => {
        console.log(floorDetails)
        if (floorDetails && floorDetails.flatDetail) {
            console.log(floorDetails)
            return floorDetails.flatDetail.filter((flatRecord) => {
                console.log("***flatREcord ", flatRecord.floorId)
                console.log("***flatREcord ", this.state.floorId)
                return flatRecord.floorId == this.state.floorId
            }).map((items) => {
                return (
                    <option key={items.flatDetailId} value={items.flatDetailId}>
                        {items.flatNo}
                    </option>
                )
            })
        }
    }


    floorChangeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.floorId);
    }

    flatChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state.flatDetailId);
        this.props.getExpenseDetail(e.target.value)
        .then(() => this.getAllDetail(this.props.monthlyElectricityExpenseReducer))
    }


    rateChange = (e) => {
        console.log(this.state.unitConsumed)
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value });
            console.log(this.state.unitConsumed)
        }
    }

    currentReadingChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ currentReading: e.target.value, unitConsumed:(e.target.value - this.state.lastReading) });
        }
    }

    close = () => {
        return this.props.history.push('/superDashBoard');
    }

    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    getAllDetail({getExpenseDetail}){
        if(getExpenseDetail && getExpenseDetail.electricityConsumer){
            console.log(getExpenseDetail)
            let data = getExpenseDetail.electricityConsumer;
            console.log(data);
            this.setState({sanctionedLoad:data.sanctionedLoad, lastReading:data.lastReading, amount:data.amount, amountDue:data.amountDue,
            rate:data.rate})
        }
    }

    // componentDidUpdate(){
    //     if(this.props.monthlyElectricityExpenseReducer.getExpenseDetail && this.props.monthlyElectricityExpenseReducer.getExpenseDetail.electricityConsumer){
    //         console.log(this.props.monthlyElectricityExpenseReducer.getExpenseDetail)
    //         let data = this.props.monthlyElectricityExpenseReducer.getExpenseDetail.electricityConsumer;
    //         console.log(data);
    //         let { electricityConsumerId, amount, amountDue, lastReading } = data;
    //     }
    // }

    getAllExpenseDetail = (getExpenseDetail) => {
        console.log(getExpenseDetail)
        if(getExpenseDetail){
            console.log(getExpenseDetail)
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

    render(){
        
        let form;
        form = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <label>Tower Name</label>
                        <select required className="form-control" defaultValue='no-value' name="towerId" onChange={this.towerChangeHandler}>
                            <DefaultSelect />
                            {this.getDropdownForTower(this.props.flatDetailMasterReducer)}
                        </select>
                    </Col>
                    <Col md={4}>
                        <label>Floor</label>
                        <select className="form-control" defaultValue='no-value' name="floorId" onChange={this.floorChangeHandler}>
                            <DefaultSelect />
                            {this.getFloorData(this.props.electricityExpenseReducer)}
                        </select>
                    </Col>
                    <Col md={4}>
                        <label>Flat</label>
                        <select className="form-control" defaultValue='no-value' name="flatDetailId" onChange={this.flatChangeHandler}>
                            <DefaultSelect />
                            {this.getFlatData(this.props.electricityExpenseReducer)}
                        </select>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <label>Last Reading</label>
                        <input className="form-control" placeholder="Last Reading"
                            type="text" name="lastReading"
                            maxLength="16"
                            onChange={this.flatChangeHandler}
                            readOnly
                            value={this.state.lastReading}/>
                    </Col>
                    <Col md={4}>
                        <label>Current Reading</label>
                        <input className="form-control"
                            placeholder="Last Amount Due"
                            type="text" name="currentReading"
                            maxLength="10"
                            onChange={this.currentReadingChange}
                            // value={this.state.currentReading} 
                            />
                    </Col>
                    <Col md={4}>
                        <label>Unit Consumed</label>
                        <input className="form-control"
                            placeholder="Unit Consumed"
                            type="text" name="unitConsumed"
                            maxLength="16"
                            readOnly
                            value={(this.state.currentReading && this.state.lastReading) ? (this.state.currentReading - this.state.lastReading):''}
                            onChange={this.rateChange}
                            // value={this.state.currentReading} 
                            />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={3}>
                        <label>Last Amount Due</label>
                        <input className="form-control"
                            placeholder="Last Amount Due"
                            readOnly
                            type="text" name="lastAmountDue"
                            maxLength="10" onChange={this.flatChangeHandler}
                            value={(this.state.amountDue == true ? '-' : this.state.amountDue == false ? '+':'') + this.state.amount}
                            />
                    </Col>
                    <Col md={3}>
                        <label>Rate</label>
                        <input className="form-control"
                            placeholder="Rate"
                            type="text" name="rate"
                            readOnly
                            value={this.state.rate}
                            maxLength="10" onChange={this.flatChangeHandler}
                            // onChange={this.rateChange}
                            // value={this.state.currentReading} 
                            />
                    </Col>
                    <Col md={3}>
                        <label>Rent</label>
                        <input className="form-control"
                            placeholder="Rent"
                            type="text" name="rent"
                            maxLength="16"
                            onChange={this.flatChangeHandler}
                            value={this.state.rent} 
                            />
                    </Col>
                    <Col md={3}>
                        <label>Sanctioned Load</label>
                        <input className="form-control"
                            placeholder="Sanctioned Load"
                            type="text" name="sanctionedLoad"
                            maxLength="16"
                            readOnly
                            value={this.state.sanctionedLoad}
                            onChange={this.flatChangeHandler}
                            // value={this.state.currentReading} 
                            />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={5}>
                        <label>MDI</label>
                        <input className="form-control"
                            placeholder="MDI"
                            type="text" name="mdi"
                            maxLength="16"
                            onChange={this.flatChangeHandler}
                            value={this.state.mdi} 
                            />
                    </Col>
                    <Col md={4}>
                        <label>Monthly Charges</label>
                        <input className="form-control"
                            placeholder="Monthly Charges"
                            type="text" name="monthlyCharges"
                            maxLength="16"
                            readOnly
                            value={this.state.monthlyCharges}
                            onChange={this.rateChange}
                            // value={this.state.currentReading} 
                            />
                    </Col>
                    <Col md={3} style={{textAlign:'center'}}>
                        <Button color="primary" style={{marginTop:'28px'}} onClick={this.calcCharges}>Calculate Charges</Button>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <label>Start Date</label>
                        <input min={memberMaxDate()} className="form-control" type="date" name="startDate" id="start" onChange={this.startDateChange} />
                    </Col>
                    <Col md={6}>
                        <label>End Date</label>
                        <input className="form-control" type="date" name="endDate" id="end" onChange={this.endDateChange} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Button className="btn btn-success mr-2">Add Expense</Button>
                <Button className="btn btn-danger">Cancel</Button>
            </FormGroup>
        </div>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <Form method="POST" onSubmit = {this.submit}>
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Add Monthly Electricity Expense</h3>
                    </div>
                    {form}
                </Form>
            </UI>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        electricityExpenseReducer: state.electricityExpenseReducer,
        monthlyElectricityExpenseReducer: state.monthlyElectricityExpenseReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getTowerName, getfloorsOfTowers, addElectricityExpense, getExpenseDetail, calculateCharges }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyElectricityExpense);