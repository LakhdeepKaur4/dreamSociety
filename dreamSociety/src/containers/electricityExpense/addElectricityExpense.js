import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import { Col, Row, Form, Button, FormGroup } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { getTowerName } from '../../actionCreators/flatDetailMasterAction';
import { getfloorsOfTowers, addElectricityExpense, getRateForElectricityExpense } from '../../actionCreators/electricityExpense';
import { numberValidation, memberMaxDate, emailValid, panCardValidation, fNameKeyPress, OnKeyPressUserhandler } from '../../validation/validation';

class AddElectricityExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            towerId: '',
            floorId: '',
            flatId: '',
            lastReading: '',
            sign: '',
            amountdue: true,
            amount: '',
            sanctionedLoad: '',
            lastReadingDate: '',
            rate: '',
            // unitConsumed: '',
            // currentReading: '',
            // startDate: '',
            // endDate: ''
        }
    }


    componentDidMount() {
        this.props.getTowerName();
        this.props.getRateForElectricityExpense();
        // console.log(this.props.getTowerName)
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    towerChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.towerId);
        this.props.getfloorsOfTowers(event.target.value)
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    cancel = () => {
        return this.props.history.push('/superDashboard/electricityExpenseDetail');
    }

    onSignChange = (event) => {
        this.setState({ sign: event.target.value });
        if (this.state.sign == '+') {
            this.setState({
                amountDue: false
            })
        } else {
            this.setState({
                amountDue: true
            })
        }
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

    getDropdownForRate = ({ rate }) => {
        // console.log("dropdown of rate ", rate)
        if (rate) {
            return rate.maintenanceType.map((item) => {
                return (
                    <option key={item.maintenanceTypeId} value={item.rate} >
                        {item.rate}
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


    getFlatData = ({ floorDetails }) => {
        console.log(floorDetails)
        if (floorDetails && floorDetails.flatDetail) {
            console.log(floorDetails)
            return floorDetails.flatDetail.filter((flatRecord) => {
                // console.log("***flatREcord ", flatRecord.floorId)
                // console.log("***flatREcord ", this.state.floorId)
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
    }

    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value });
        }
    }


    submit = (e) => {
        e.preventDefault();
        let { towerId, floorId, flatDetailId, lastReading, amount, sign, rate, lastReadingDate, sanctionedLoad, amountDue } = this.state;
        let data = { towerId, floorId, flatDetailId, lastReading, amount, sign, rate, lastReadingDate, sanctionedLoad, amountDue };
        console.log(data);
        this.props.addElectricityExpense(data).then(() => { this.props.history.push('/superDashboard/electricityExpenseDetail') });
    }

    startDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');

        if (start.value) {
            end.min = start.value;
        }

        this.setState({ [e.target.name]: e.target.value });
    }

    endDateChange = (e) => {
        // var start = document.getElementById('start');
        // var end = document.getElementById('end');

        // if (end.value) {
        //     start.max = end.value;
        // }

        this.setState({ [e.target.name]: e.target.value });
    }

    close = () => {
        console.log('close form')
        return this.props.history.push('/superDashBoard');
    }

    render() {
        // return <div>Electricity Expense</div>
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
                        <label>Flats</label>
                        <select className="form-control" defaultValue='no-value' name="flatDetailId" onChange={this.flatChangeHandler}>
                            <DefaultSelect />
                            {this.getFlatData(this.props.electricityExpenseReducer)}
                        </select>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={5}>
                        <label>Last Reading</label>
                        <input className="form-control" placeholder="Last Reading"
                            type="text" name="lastReading"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={this.state.lastReading} ></input>
                    </Col>
                    <Col md={3}>
                        <label><br /></label>
                        <select required className="form-control" defaultValue='no-value' name="sign" onChange={this.onSignChange}>
                            <DefaultSelect />
                            <option value="+">+</option>
                            <option value="-">-</option>
                            {/* {this.getDropdownForTower(this.props.flatDetailMasterReducer)} */}
                        </select>
                    </Col>
                    <Col md={4}>
                        <label>Amount</label>
                        <input className="form-control"
                            placeholder="Amount"
                            type="text" name="amount"
                            maxLength="10"
                            onChange={this.rateChange}
                        // value={this.state.currentReading} 
                        />
                    </Col>
                    <Col md={4}>
                        <label>Rate Per Unit</label>
                        <select required className="form-control" defaultValue='no-value' name="rate" onChange={this.flatChangeHandler}>
                            <DefaultSelect />
                            {this.getDropdownForRate(this.props.electricityExpenseReducer)}
                        </select>
                    </Col>
                    <Col md={4}>
                        <label>Sanctioned Load</label>
                        <input className="form-control"
                            placeholder="Sanctioned Load"
                            type="text" name="sanctionedLoad"
                            maxLength="16"
                            onChange={this.flatChangeHandler}
                        // value={this.state.currentReading}
                        />
                    </Col>
                    <Col md={4}>
                        <label>Last Reading Date</label>
                        <input className="form-control" type="date" name="lastReadingDate" id="end" onChange={this.endDateChange} />
                    </Col>
                    {/* <Col md={4}>
                        <label>Unit Consumed</label>
                        <input className="form-control"
                            placeholder="Unit Consumed"
                            type="text"
                            name="unitConsumed"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={this.state.unitConsumed} />
                    </Col> */}
                </Row>
            </FormGroup>
            {/* <FormGroup>
                <Row md={12}> }
                    <Col md={6}>
                        <label>Start Date</label>
                        <input min={memberMaxDate()} className="form-control" type="date" name="startDate" id="start" onChange={this.startDateChange} />
                    </Col>
                    <Col md={6}>
                        <label>Last Reading Date</label>
                        <input className="form-control" type="date" name="endDate" id="end" onChange={this.endDateChange} />
                    </Col>
                 </Row>
            </FormGroup> */}
            <FormGroup>
                <Button className="btn btn-success mr-2">Add Expense</Button>
                <Button className="btn btn-danger" onClick={this.cancel}>Cancel</Button>
            </FormGroup>
        </div>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.submit} method="POST">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Add Electricity Expense</h3>
                    </div>
                    {form}
                </Form>
            </UI>
        )
    }
}

function mapStateToProps(state) {
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        electricityExpenseReducer: state.electricityExpenseReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getTowerName, getfloorsOfTowers, getRateForElectricityExpense, addElectricityExpense }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddElectricityExpense);


