import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFacilitySubMaster } from './../../actions/facilitySubMasterAction';
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

        }
    }

    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getFacilitySubMaster().then(() => this.setState({ loading: false }));

    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    changePassword = () => {
        return this.props.history.replace('/ownerDashboard/changePasswordOwner')
    }

    render() {
        let radioData=<div>
            <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
                    id="activated"
                    type="radio"
                    name="activated"
                    value='activated'
                    checked={ this.state.type === 'activated' ? true : false}
                    />{' '}In Use</Label>

                    <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
                    id="deActivated"
                    type="radio"
                    name="deactivated"
                
                    checked={this.state.type === 'deactivated' ? true : false}
                    value='deactivated'
                    />{' '}Not In Use</Label>

                    <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
                    id="all"
                    type="radio"
                    name="all"
                    
                    value='all'
                    checked={this.state.type === 'all' ? true : false}
                    />{' '}All</Label>
                    <FormGroup>
                        <tr>
                            <td></td>
                        </tr>
                    </FormGroup>
        </div>

        let facilityForm = <div>
            {radioData}
            {/* <FormGroup>
                        <Label >Date</Label>
                        <Input type="date" >
                        </Input>
            </FormGroup> */}
           
            
        </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Owner Facility</h3>

                        {!this.state.loading ? facilityForm : <Spinner />}
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
    return bindActionCreators({ getFacilitySubMaster }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(OwnerFacility);