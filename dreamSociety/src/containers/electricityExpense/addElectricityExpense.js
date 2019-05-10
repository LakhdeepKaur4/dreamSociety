import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import { Col, Row, Form, Button, FormGroup } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';

import { getTowerName } from '../../actionCreators/flatDetailMasterAction';
import { getfloorsOfTowers } from '../../actionCreators/electricityExpense';

class AddElectricityExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            towerId: '',
            floorId: '',
            flatId: '',
            lastReading: '',
        }
    }
    componentDidMount() {

        this.props.getTowerName();
        console.log(this.props.getTowerName)
        this.props.getfloorsOfTowers();
        console.log(this.props.getfloorsOfTowers())
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.towerId);
        this.props.getfloorsOfTowers(event.target.value)
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
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

    getFlats = ({ floor }) => {
        if (floor) {
            return floor.flatDetail.filter((flatRecord) => {
                return flatRecord.floorId === this.state.floorId
            }).map((selectFlat) => {
                return { ...selectFlat, label: selectFlat.flatNo, value: selectFlat.flatDetailId }
            });
        }
        else {
            return []
        }
    }

    floorChangeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.floorId);
    }

    render() {
        // return <div>Electricity Expense</div>
        let form;
        form = <div>
            <div>
                <Row md={12}>
                    <Col md={3}>
                        <label>Tower Name</label>
                        <select required className="form-control" defaultValue='no-value' name="towerId" onChange={this.onChange}>
                            <DefaultSelect />
                            {this.getDropdownForTower(this.props.flatDetailMasterReducer)}
                        </select>
                    </Col>
                    <Col md={3}>
                        <label>Floor</label>
                        <select className="form-control" defaultValue='no-value' name="floorId" onChange={this.floorChangeHandler}>
                            <DefaultSelect />
                            {this.getFloorData(this.props.electricityExpenseReducer)}
                        </select>
                    </Col>
                    <Col md={3}>
                        <label>Flats</label>
                        <select className="form-control" defaultValue='no-value' name="flatDetailId">
                            <DefaultSelect />
                            {this.getFlatData(this.props.electricityExpenseReducer)}
                        </select>
                    </Col>
                    <Col md={3}>
                        <label>Last Reading</label>
                        <input className="form-control" placeholder="Last Reading" type="text" name="lastReading" maxLength={6} value={this.state.lastReading} ></input>
                    </Col>
                </Row>

            </div>
            <FormGroup>
                <Button className="btn btn-success mt-2">Add Flat</Button>
            </FormGroup>
        </div>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                < Form>{form}</Form>
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
    return bindActionCreators({ getTowerName, getfloorsOfTowers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddElectricityExpense);


