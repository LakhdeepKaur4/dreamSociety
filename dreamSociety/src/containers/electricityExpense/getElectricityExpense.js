import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, FormGroup, Input, Button } from 'reactstrap'
import { getElectricityExpense } from '../../actionCreators/electricityExpense';
import UI from '../../components/newUI/superAdminDashboard';
import ModalBox from '../../components/modal/modal';

class GetElectricityExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false,
            currentReading:'',
            lastReading:''
        }
    }

    componentDidMount() {
        this.props.getElectricityExpense();
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    edit = () =>{
        this.setState({
            editModal:true
        })
    }

    addExpense = () => {
        this.props.history.push('/superDashboard/electricityExpenseMaster');
    }

    onChange = (item, e) => {
        // this.setState({[e.target.name]:e.target.value, lastReading: value});
        var input = document.getElementById(`currentReading` + item);
        console.log(input.value);
    }

    getExpenseDetail = ({ expenseDetail }) => {
        console.log("&%$%%$$%$%$%% ", expenseDetail)
        if (expenseDetail && expenseDetail.electricityConsumer) {
            return expenseDetail.electricityConsumer.map(item => {
                return (
                    <tr key={item.electricityConsumerId}>
                        <td>{item.flat_detail_master.tower_master ? item.flat_detail_master.tower_master.towerName : ''}</td>
                        <td>{item.flat_detail_master.floor_master ? item.flat_detail_master.floor_master.floorName : ''}</td>
                        <td>{item.flat_detail_master ? item.flat_detail_master.flatNo : ''}</td>
                        <td>{item.lastReading}</td>
                        <td>{item. lastAmountDue}</td>
                        {/* <td>{item.currentReading ? item.currentReading : <Input name="currentReading" id={`currentReading` + item} onChange={this.onChange.bind(this, item)} />}</td> */}
                        {/* <td>{item.unitConsumed  ? item.unitConsumed : (item.currentReading - item.lastReading)}</td> */}
                        {/* <td>{item.totalConsumption}</td> */}
                        {/* <td>{item.startDate}</td> */}
                        {/* <td>{item.endDate}</td> */}
                        <td>
                            <Button color="success" className="mr-2" onClick={this.edit}>Edit</Button>
                            <Button color="danger" className="danger ">Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    toggleModal = () => {
        this.setState({
            editModal:!this.state.editModal
        })
    }

    render() {
        let tableData = <Table className="table">
            <thead>
                <tr>
                    <th>Tower</th>
                    <th>Floor</th>
                    <th>Flat No</th>
                    <th>Last Reading</th>
                    <th>Last Amount Due</th>
                    {/* <th>Current Reading</th> */}
                    {/* <th>Unit Consumed</th> */}
                    {/* <th>Total Consumption</th> */}
                    {/* <th>Start Date</th> */}
                    {/* <th>End Date</th> */}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.getExpenseDetail(this.props.electricityExpenseReducer)}
            </tbody>
        </Table>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details" >
                        <h3 align="center"> Electricity Expense Detail</h3>
                        <Button color="primary" onClick={this.addExpense} > Add Expense</Button>
                    </div>
                    <ModalBox
                        openModal={this.state.editModal}
                        toggle={this.toggleModal.bind(this)}
                        title="Edit Electricity Expense"
                    >

                    </ModalBox>
                    {tableData}
                </div>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("^^", state);
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        electricityExpenseReducer: state.electricityExpenseReducer
    }
}

export default connect(mapStateToProps, { getElectricityExpense })(GetElectricityExpense);