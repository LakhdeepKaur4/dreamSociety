import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, FormGroup, Input, Button, Label } from 'reactstrap'
import { getElectricityExpense, getRateForElectricityExpense, deleteElectricityExpense, deleteSelectedElectricityExpense, updateElectricityExpense } from '../../actionCreators/electricityExpense';
import UI from '../../components/newUI/superAdminDashboard';
import ModalBox from '../../components/modal/modal';
import InputField from '../../components/reusableComponents/inputs';
import DropdownComponent from '../../components/reusableComponents/dropdown';
import ButtonComponent from '../../components/reusableComponents/button';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';
import SearchFilter from '../../components/searchFilter/searchFilter';

class GetElectricityExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false,
            editData: {
                isActive: false
            },
            filterName: 'flatNo',
            modalLoading: false,
            modal: false,
            isDisabled: true,
            ids: [],
            loading: false,
            currentReading: '',
            lastReading: '',
            rate: '',
            lastReadingDate: '',
            sanctionedLoad: '',
            amount: '',
            electricityConsumerId: '',
            sign: '',
            amountDue: null,
            defaultSign: true,
            editSign: false,
            amountDueInput: null,
            search: ''
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        this.props.getElectricityExpense().then(() => this.setState({ loading: false, modalLoading: false, modal: false }))
        this.props.getRateForElectricityExpense();
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
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

    edit = (electricityConsumerId, lastReading, rate, amount, lastReadingDate, sanctionedLoad, amountDue) => {
        this.setState({
            electricityConsumerId,
            lastReading,
            rate,
            amount,
            lastReadingDate,
            sanctionedLoad,
            amountDue,
            amountDueInput: amountDue,
            editModal: true
        });
        console.log(amountDue, this.state.amountDueInput)
    }

    deleteSelected(ids) {
        this.setState({ loading: true, isDisabled: true });
        this.props.deleteElectricityExpense(ids)
            .then(() => this.getExpenseDetail())
            .catch(err => err.response.data.message);
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if (ar.length > 0) {
            this.setState({ isDisabled: false });
        }
    }

    unSelectAll = () => {

        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }

    addExpense = () => {
        this.props.history.push('/superDashboard/electricityExpenseMaster');
    }

    onChange = (item, e) => {
        // this.setState({[e.target.name]:e.target.value, lastReading: value});
        var input = document.getElementById(`currentReading` + item);
        console.log(input.value);
    }

    update = () => {
        let { electricityConsumerId, rate, amount, sanctionedLoad, lastReading, lastReadingDate, amountDue } = this.state;
        console.log(electricityConsumerId, rate, amount, sanctionedLoad, lastReading, lastReadingDate, amountDue)
        this.props.updateElectricityExpense(electricityConsumerId, rate, amount, sanctionedLoad, lastReading, lastReadingDate, amountDue)
            .then(() => {
                this.refreshData()
                this.setState({ editModal: false, editSign: false, defaultSign: true })
            });

    }

    getExpenseDetail = ({ expenseDetail }) => {
        console.log("&%$%%$$%$%$%% ", expenseDetail);
        if (expenseDetail && expenseDetail.electricityConsumer) {
            // return expenseDetail.electricityConsumer
            return expenseDetail.electricityConsumer.sort((item1, item2) => {
                var items1=item1.flat_detail_master
                var items2=item2.flat_detail_master
                var cmprVal = (items1 && items2) ? (items1[this.state.filterName].localeCompare(items2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            })
            .filter(this.searchFilter(this.state.search)).map((item, index) => {
                console.log(item.amountDue)
                return (
                    <tr key={item.electricityConsumerId}>
                        <td><input type="checkbox" name="ids" className="SelectAll" value={item.electricityConsumerId}
                            onChange={(e) => {
                                const { electricityConsumerId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    let indexOfId = this.state.ids.indexOf(electricityConsumerId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, electricityConsumerId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td>{index + 1}</td>
                        <td>{item.flat_detail_master.tower_master ? item.flat_detail_master.tower_master.towerName : ''}</td>
                        <td>{item.flat_detail_master.floor_master ? item.flat_detail_master.floor_master.floorName : ''}</td>
                        <td>{item.flat_detail_master ? item.flat_detail_master.flatNo : ''}</td>
                        <td>{item.lastReading}</td>
                        <td>{item.amountDue == true ? '-' + item.amount : '+' + item.amount}</td>
                        <td>{item.lastReadingDate}</td>
                        <td>{item.rate}</td>
                        <td>{item.sanctionedLoad}</td>
                        {/* <td>{item.currentReading ? item.currentReading : <Input name="currentReading" id={`currentReading` + item} onChange={this.onChange.bind(this, item)} />}</td> */}
                        {/* <td>{item.unitConsumed  ? item.unitConsumed : (item.currentReading - item.lastReading)}</td> */}
                        {/* <td>{item.totalConsumption}</td> */}
                        {/* <td>{item.startDate}</td> */}
                        {/* <td>{item.endDate}</td> */}
                        <td>
                            <Button color="success" className="mr-2" onClick={this.edit.bind(this, item.electricityConsumerId, item.lastReading, item.rate, item.amount, item.lastReadingDate, item.sanctionedLoad, item.amountDue)}>Edit</Button>
                            <Button color="danger" className="danger" onClick={this.delete.bind(this, item.electricityConsumerId)}>Delete</Button>
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
            editModal: !this.state.editModal,
            editSign: false,
            defaultSign: true
        })
    }

    onChangeInput = (e) => {
        console.log("^^edit ", this.state, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChangeSign = (e) => {
        this.setState({
            amountDue: e.target.value
        })
    }

    delete = (electricityConsumerId) => {
        let { isActive } = this.state.editData;
        this.setState({ loading: true })
        this.props.deleteElectricityExpense(electricityConsumerId, isActive)
            .then(() => this.refreshData())
        this.setState({ editData: { isActive: false } })

    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter = (search) => {
        return function (x) {

            return x.flat_detail_master.tower_master.towerName.toLowerCase().includes(search.toLowerCase()) ||
                x.flat_detail_master.floor_master.floorName.toLowerCase().includes(search.toLowerCase()) ||
                x.flat_detail_master.flatNo.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }

    sameSign = () => {
        console.log(this.state.amountDueInput)
        if (!!document.getElementById('isChecked').checked) {
            console.log('is checked')
            this.setState({ amountDue: '', defaultSign: false, editSign: true })
        }
        else {
            this.setState({ amountDue: this.state.amountDueInput, defaultSign: true, editSign: false })
        }
    }

    render() {
        let tableData = <Table className="table">
            <thead>
                <tr>
                    <th style={{ width: '4%' }}></th>
                    <th style={{ width: '4%' }}>#</th>
                    <th>Tower</th>
                    <th>Floor</th>
                    <th onClick={() => {
                        this.setState((state) => {
                            return {
                                sortVal: !state.sortVal,
                                filterName: 'flatNo'
                            }
                        });
                    }}>Flat No<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th>Last Reading</th>
                    <th>Amount</th>
                    <th>Last Reading Date</th>
                    <th>Rate</th>
                    <th>Sanctioned Load</th>
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
                    <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                    <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
                        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
                    <Label htmlFor="allSelect" style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}>Select All<input className="ml-2"
                        id="allSelect"
                        type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                this.selectAll();
                            }
                            else if (!e.target.checked) {
                                this.unSelectAll();
                            }
                        }
                        } /></Label>

                    {/* {tableData} */}
                    <ModalBox
                        openModal={this.state.editModal}
                        toggle={this.toggleModal.bind(this)}
                        title="Edit Electricity Expense"
                    >
                        <InputField
                            label="Last Reading"
                            placeholder="Last Reading"
                            name="lastReading"
                            type="text"
                            inputChange={this.onChangeInput}
                            value={this.state.lastReading}
                        />
                        <DropdownComponent
                            label="Rate"
                            name="rate"
                            type="select"
                            inputChange={this.onChangeInput}
                            value={this.state.rate}
                        ><DefaultSelect />
                            {this.getDropdownForRate(this.props.electricityExpenseReducer)}
                        </DropdownComponent>
                        <InputField
                            label="Last Reading Date"
                            placeholder="Last Reading Date"
                            name="lastReadingDate"
                            type="date"
                            inputChange={this.onChangeInput}
                            value={this.state.lastReadingDate}
                        />
                        <InputField
                            label="Sanctioned Load"
                            placeholder="Sanctioned Load"
                            name="sanctionedLoad"
                            type="text"
                            inputChange={this.onChangeInput}
                            value={this.state.sanctionedLoad}
                        />

                        <FormGroup>
                            <Row md={12}>
                                {this.state.defaultSign ? <Col md={6}>
                                    <Input type="text" id="permanentaddr" disabled maxLength="500" value={this.state.amountDue == true ? '-' : '+'} name="amountDueInput" onChange={this.onChangeInput} />
                                </Col> : ''}
                                {this.state.defaultSign ? <Col md={6}>
                                    <span style={{ fontWeight: 'bold' }}>Do you want to edit?</span><Input type="checkbox" onChange={this.sameSign} name="isChecked" id="isChecked" className="ml-3" />
                                </Col> :
                                    <Col md={12} style={{ textAlign: 'center' }}>
                                        <span style={{ fontWeight: 'bold' }}>Do you want to edit ?</span><Input type="checkbox" onChange={this.sameSign} name="isChecked" id="isChecked" className="ml-3" />
                                    </Col>}
                            </Row>
                        </FormGroup>
                        {this.state.editSign ? <DropdownComponent
                            name="amountDue"
                            type="select"
                            inputChange={this.onChangeSign}
                            defaultValue="no-value"
                        ><DefaultSelect />
                            <option value="false" >+</option>
                            <option value="true" >-</option>
                        </DropdownComponent> : ''}
                        <InputField
                            label="Amount"
                            placeholder="Amount"
                            name="amount"
                            type="text"
                            inputChange={this.onChangeInput}
                            value={this.state.amount}
                        />
                        <FormGroup>
                            <ButtonComponent color="success"
                                className='mr-2'
                                buttonClicked={this.update}
                                title='Save' />

                            <ButtonComponent color="danger"
                                buttonClicked={this.toggleModal.bind(this)}
                                title='Cancel' />
                        </FormGroup>
                    </ModalBox>
                    {(this.state.loading) ? <Spinner /> : tableData}
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

export default connect(mapStateToProps, { getElectricityExpense, getRateForElectricityExpense, deleteElectricityExpense, deleteSelectedElectricityExpense, updateElectricityExpense })(GetElectricityExpense);