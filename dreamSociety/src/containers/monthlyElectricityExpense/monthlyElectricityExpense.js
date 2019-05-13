import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import { Col, Row, Form, Button, FormGroup } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { getTowerName } from '../../actionCreators/flatDetailMasterAction';
import { getfloorsOfTowers, addElectricityExpense } from '../../actionCreators/electricityExpense';
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
            sanctionLoad:'',
            mdi:'',
            startDate:'',
            endDate:''
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
    }

    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    close = () => {
        return this.props.history.push('/superDashBoard');
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
                    <Col md={4}>
                        <label>Last Reading</label>
                        <input className="form-control" placeholder="Last Reading"
                            type="text" name="lastReading"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={this.state.lastReading} ></input>
                    </Col>
                    <Col md={4}>
                        <label>Last Amount Due</label>
                        <input className="form-control"
                            placeholder="Last Amount Due"
                            type="text" name="lastAmountDue"
                            maxLength="10"
                            // onChange={this.rateChange}
                            // value={this.state.currentReading} 
                            />
                    </Col>
                    <Col md={4}>
                        <label>Current Reading</label>
                        <input className="form-control"
                            placeholder="Last Amount Due"
                            type="text" name="currentReading"
                            maxLength="10"
                            onChange={this.flatChangeHandler}
                            // value={this.state.currentReading} 
                            />
                    </Col>
                    <Col md={4}>
                        <label>Sanctioned Load</label>
                        <input className="form-control"
                            placeholder="Current Reading"
                            type="text" name="currentReading"
                            maxLength="16"
                            onChange={this.flatChangeHandler}
                            // value={this.state.currentReading} 
                            />
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
                <Form method="POST">
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
    return bindActionCreators({ getTowerName, getfloorsOfTowers, addElectricityExpense }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyElectricityExpense);