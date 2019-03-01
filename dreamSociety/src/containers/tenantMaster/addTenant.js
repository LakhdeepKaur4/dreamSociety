import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { connect } from 'react-redux';
import Select from 'react-select';
import { detailSociety } from '../../actionCreators/societyMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { getRelation } from './../../actionCreators/relationMasterAction';
import { getTenantDetail } from '../../actionCreators/tenantMasterAction';

class AddTenant extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            tab: "none",
            step: 1,
            countryName : '',
            countryId: '',
            stateName : '',
            stateId: '',
            cityName : '',
            cityId: '',
            locationName : '',
            locationId: '',
            societyName : '',
            societyId: ''
        }
    }

    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
        this.props.getTenantDetail();
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    nextPrev = () => {
        this.setState({ step: this.state.step + 1 })
    }

    numberValidation = (event) => {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    userMemberHandler = (e) => {
        if (e.target.value != '') {
            this.setState({
                familyMember: e.target.value
            });
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
    }

    getSociety = ({ detail_Society }) => {
        if (detail_Society) {
            return detail_Society.map((item) => {
                return (
                    { ...item, label: item.societyName, value: item.societyId }
                )
            }
            );
        }
        return [];
    }

    societyChangeHandler = (selectOption) => {
        console.log(this.state)
        console.log(selectOption)
        let countryName = selectOption.country_master.countryName;
        let countryId = selectOption.country_master.countryId;
        let stateName = selectOption.state_master.stateName;
        let stateId = selectOption.state_master.stateId;
        let cityName = selectOption.city_master.cityName;
        let cityId = selectOption.city_master.cityId;
        let locationName = selectOption.location_master.locationName;
        let locationId = selectOption.location_master.locationId;
        let societyId = selectOption.societyId;

        this.setState(function (prevState, props) {
            return {
                'societyName': selectOption.value,
                countryName,
                stateName,
                cityName,
                cityId,
                stateId,
                countryId,
                societyId,
                locationName,
                locationId
            }
        }, function () {
        });
    }

    getRelationList = ({ relationResult }) => {
        if (relationResult) {
            return relationResult.relation.map((item) => {
                return (
                    { ...item, label: item.relationName, value: item.relationId }
                )
            }
            );
        }
        return [];

    }

    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

    render(){
        
        let userDatas = [];
        for (let i = 0; i < this.state.familyMember; i++) {
            userDatas.push(<FormGroup key={i}>
                <Row form>
                    <Col md={4}>
                        <Label>Name</Label>
                        <Input placeholder="Name Of Member" name = {`member${i}`} onChange={this.onChange} className="input" />
                    </Col>
                    <Col md={4}>
                        <Label>Relation With Owner</Label>
                        <Select name={`relation${i}`} options={this.getRelationList(this.props.relationList)}/>
                    </Col>
                    <Col md={4}>
                        <Label>Date of Birth</Label>
                        <Input type="date" name={`dob${i}`} onChange={this.onChange} />
                    </Col>
                </Row>
            </FormGroup>);
        }
        return(
            <UI onClick={this.logout}>
                <Form>
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                        <h3>Tenant Details</h3>
                        <FormGroup>
                            <Label>Tenant Name</Label>
                            <Input type="text" placeholder="Name" maxLength={50} name='tenantName' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input type="date" max={this.maxDate()} name="dob" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input onKeyPress={this.numberValidation} placeholder="Contact Number" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Email" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Society Name</Label>
                            <Select placeholder="Society Name" 
                             options={this.getSociety(this.props.societyName)}
                                name="societyName" 
                                onChange={this.societyChangeHandler.bind(this)}
                                     />
                        </FormGroup>
                        <FormGroup>
                            <Label>Country</Label>
                            <Input readOnly placeholder="Country"
                             name="countryName" value={this.state.countryName} type='text' />
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <Input type="select" readOnly type="text" placeholder="StateName"
                            value={this.state.stateName} name="stateName" />
                        </FormGroup>
                        <FormGroup>
                            <Label>City</Label>
                            <Input type="select" readOnly type="text" placeholder="CityName" name="cityName"
                            value={this.state.cityName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Location</Label>
                            <Input type="select" readOnly type="text" placeholder="Location"
                            value={this.state.locationName} name="locationName" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="textarea" placeholder="Permanent Address" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Correspondance Address</Label>
                            <Input type="textarea" placeholder="Permanent Address" />
                        </FormGroup >
                        <FormGroup>
                            <Label>Tower</Label>
                            <Select placeholder="Tower" />
                        </FormGroup >
                    </div>
                    <div style={{ 'display': this.state.step == 2 ? 'block' : 'none' }}>
                        <h3>Bank Details</h3>
                        <FormGroup>
                                <Label>Bank Name</Label>
                                <Input placeholder="Bank Name" type="text" name="bankName" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Account Holder Name</Label>
                            <Input placeholder="Holder Name" type="text" name='holderName' />
                        </FormGroup>
                        <FormGroup >
                            <Label>Account Number</Label>
                            <Input onKeyPress={this.numberValidation} placeholder="Account Number" type="text" className="quantity" name='accountNumber' />
                        </FormGroup>
                        <FormGroup>
                            <Label>PAN Card Number</Label>
                            <Input placeholder="Pan Number" type='text' name="panNumber" />
                        </FormGroup>
                        <FormGroup>
                            <Label>IFSC Code</Label>
                            <Input placeholder="IFSC code" type='text' name="ifscCode" />
                        </FormGroup>
                    </div>
                    <div style={{ 'display': this.state.step == 3 ? 'block' : 'none' }}>
                        <h3>Tenant Member Details</h3>
                        <FormGroup>
                            <Label>Number of Member</Label>
                            <Input onKeyPress={this.numberValidation} placeholder="number of member"
                             onChange={this.userMemberHandler} type='text' 
                             className="quantity" name="familyMember" />
                        </FormGroup>
                        {userDatas}
                    </div>
                    <div style={{ 'display': this.state.step == 4 ? 'block' : 'none' }}>
                        <h3>Flat Owner Details</h3>
                        <FormGroup>
                            <Label>Owner Name</Label>
                            <Input placeholder="Owner Name" type='select' name="familyMember" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Flat No.</Label>
                            <Input  onKeyPress={this.numberValidation} placeholder="Flat No." 
                            type='select' name="familyMember" />
                        </FormGroup>
                    </div>
                    <div style={{ 'display': this.state.step == 5 ? 'block' : 'none' }}>
                        <h3>Upload Your Image</h3>
                        <FormGroup>
                            <Label>Image</Label>
                            <Input placeholder="Owner Name" type='file' name="Image" />
                        </FormGroup>
                    </div>
                    <div>
                        <Button color="primary" className="mr-2" id="prevBtn" style={{ display: this.state.step == 1 ? 'none' : 'inline-block' }} disabled={this.state.step == 1} onClick={() => { this.setState({ step: this.state.step - 1 }) }}>Previous</Button>
                        <Button color="primary" id="nextBtn" style={{ display: this.state.step == 5 ? 'none' : 'inline-block' }} disabled={this.state.step == 5} onClick={this.nextPrev}>Next</Button>
                        <Button color="success" className="mr-2" style={{ display: this.state.step == 5 ? 'inline-block' : 'none' }}>Submit</Button>
                        <Button color="danger" style={{ display: this.state.step == 5 ? 'inline-block' : 'none' }}>Cancel</Button>
                    </div>
                </Form>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        societyName: state.societyReducer,
        towerList: state.TowerDetails,
        relationList: state.RelationMasterReducer,
        flatList:state.flatDetailMasterReducer,
        tenantReducer:state.tenantReducer
    }
}

export default connect(mapStateToProps, {detailSociety, viewTower, getRelation, getTenantDetail})(AddTenant);