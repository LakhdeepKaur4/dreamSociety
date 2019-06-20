import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFacilityUser } from './../../actions/facilitySubMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/ownerDashboard';
import { Table, Button, Modal, FormGroup, Form, ModalBody, ModalHeader, Input, Label, Row, Col } from 'reactstrap';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';


class OwnerFacility extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            selected: '',
            type: 'activated',
            isDisabled: true,
            ids: [],
            facilityDetailId:'',
            duration:''
            

        }
    }

    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getFacilityUser().then(() => this.setState({ loading: false }));

    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    changePassword = () => {
        return this.props.history.replace('/ownerDashboard/changePasswordOwner')
    }

    activatedChange = async (e) => {
        let selected = e.target.value;
        console.log(selected)
        await this.setState({
            type: selected
        })

        this.refreshData()
        this.setState({ loading: true })
    }


    
    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        console.log(this.state.ids,"selectAll==========")
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
        console.log(this.state.ids,"unSelectAll==========")
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }

    onChangeHandler = (event) => {
        this.setState({ message: '' })

        this.setState({ [event.target.name]: event.target.value, errors:{} });
    }

    submitFacilityData=(facilityDetailId,monthlyRate,unitRate,duration)=>{
       
        
            console.log(facilityDetailId,monthlyRate,unitRate,duration)
    }

    



    getUserData = ({ getFacilityUser }) => {
        if (getFacilityUser) {
            console.log(getFacilityUser)
            return getFacilityUser.facilities.map((item) => { 
                console.log(item, "==========")
                return (
                    <tr key={item.facilityDetailId}>
                        <td scope="row" ><Input type="checkbox" name="ids" className="SelectAll" value={this.state.facilityDetailId} style={{ marginLeft: '1px' }}   onChange={(e) => {
                                const { facilityDetailId } = item
                                if (!e.target.checked) {
                                    
                                    let indexOfId = this.state.ids.indexOf(facilityDetailId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {

                                    this.setState({ ids: [...this.state.ids, facilityDetailId] });
                                    console.log(this.state.ids,"ids===========")

                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }}></Input></td>
                        <td>{item.facilities_master.facilityName}</td>
                        <td>{item.monthlyRate ? item.monthlyRate + " Per Monthly Rate" : item.unitRate + " Per Unit Rate"}</td>
                        <th><Input type="select" defaultValue='no-value' name="duration"  onChange={this.onChangeHandler}>
                         <DefaultSelect />
                            <option>1 Month</option>
                            <option>2 Months</option>
                            <option>Quarterly</option>
                            <option>Half Yearly</option>
                            <option>Yearly</option>
                      </Input ></th>
                        <th><Button color="success" onClick={this.submitFacilityData.bind(this,item.facilityDetailId,item.monthlyRate,item.unitRate, this.state.duration)}>Submit</Button></th>
                    </tr>
                )
            })
        }
    }

    render() {
        let radioData = <div>
            <Label style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}><input className="ml-2"
                id="activated"
                type="radio"
                name="activated"
                onChange={this.activatedChange}
                value='activated'
                checked={this.state.type === 'activated' ? true : false}
            />{' '}In Use</Label>

            <Label style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}><input className="ml-2"
                id="deActivated"
                type="radio"
                name="deactivated"
                onChange={this.activatedChange}
                checked={this.state.type === 'deactivated' ? true : false}
                value='deactivated'
            />{' '}Not In Use</Label>

            <Label style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}><input className="ml-2"
                id="all"
                type="radio"
                name="all"
                onChange={this.activatedChange}
                value='all'
                checked={this.state.type === 'all' ? true : false}
            />{' '}All</Label>
        </div>
        let table = <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Facility Name</th>
                        <th>Rate/Type</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {this.getUserData(this.props.FacilitySubMasterReducer)}
                </tbody>

            </Table>

            {/* <FormGroup>
                <Label >Date</Label>
                <Input type="date" >
                </Input>
            </FormGroup>

            <FormGroup>
                <Button color="success">Submit</Button>
            </FormGroup> */}
        </div>


        //     let facilityForm = <div>
        //         {radioData}



        //     </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Owner Facility</h3>
                        {radioData}
                        {!this.state.loading ? table : <Spinner />}

                    </Form>
                </UI>
            </div>
        )
    }
}

function mapStatToProps(state) {

    return {
        FacilitySubMasterReducer: state.FacilitySubMasterReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFacilityUser }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(OwnerFacility);