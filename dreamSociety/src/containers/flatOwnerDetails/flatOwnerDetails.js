import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { PlaceHolder } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { detailSociety } from '../../actionCreators/societyMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { getRelation } from './../../actionCreators/relationMasterAction';
import {getFlatDetails} from '../../actionCreators/flatDetailMasterAction';

class FlatOwnerDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            tab: "none",
            step: 1,
            societyId: '',
            countryName: '',
            stateName: '',
            cityName: '',
            locationName: '',
            number: '',
            ownerName: '',
            DOB: '',
            email: '',
            tower: '',
            errors: {},
            societyName: '',
            bankName: '',
            holderName: '',
            accountNumber: '',
            panNumber: '',
            ifscCode: '',
            flatNO:'',
            flatDetailId:'',
            memberDOB:'',
            memberName:'',
            relationName:'',
            profilePic:'',
            permanentAddress:'',
            familyMember:''
        }
    }
    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
        this.props.getFlatDetails();
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close = () => {
        return this.props.history.replace('/superDashBoard')
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
    getTower = ({ tower }) => {
        if (tower) {
            return tower.map((item) => {
                return (
                    { ...item, label: item.towerName, value: item.towerId }
                )
            }
            );
        }
        return [];
    }
    getflat=({details})=>{
    if(details){
        return details.flatDetail.map((item)=>{
            return (
                {...item,label:item.flatNo,value:item.flatDetailId}
            )
        })
   }
    }
    societyChangeHandler = (selectOption) => {
        let countryName = selectOption.country_master.countryName;
        let stateName = selectOption.state_master.stateName;
        let cityName = selectOption.city_master.cityName;
        let locationName = selectOption.location_master.locationName;

        this.setState(function (prevState, props) {
            return {
                'societyName': selectOption.value,
                countryName,
                stateName,
                cityName,
                locationName
            }
        }, function () {
        });
    }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.towerId)
        });
    }
    flatChangeHandler=(name,selectOption)=>{
        this.setState({
            [name]: selectOption.value
        })
        console.log(this.state.flatNO)
    }
    relationHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.value)
        });
    }
    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    nextPrev = () => {
        let errors = {};
        const { societyName, number, ownerName, DOB, email, tower, flatNO } = this.state
        if (this.state.step === 1) {
            if (ownerName === '') {
                errors.ownerName = "Owern Name can't be empty"
            }
            else if (DOB === '') {
                errors.DOB = "Date of birth can't be empty"
            }
            else if (number.length <= 9) {
                errors.number = "Please enter 10 digit number"
            }
            else if (email === '') {
                errors.email = "email can't be empty"
            }
            else if (flatNO === '') {
                errors.flatNO = "flat number can't be empty"
            }
            else if (tower === '') {
                errors.tower = "tower can't be empty"
            }
            else if (societyName === '') {
                errors.societyName = "society name can't be empty"
            }
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }
        const { bankName, holderName, accountNumber, panNumber, ifscCode } = this.state

        if (this.state.step == 2) {
            if (bankName === '') {
                errors.bankName = "Bank Name can't be empty"
            }
            else if (holderName === '') {
                errors.holderName = "Holder Name can't be empty"
            }
            else if (accountNumber === '') {
                errors.accountNumber = "Account Number enter 10 digit number"
            }
            else if (ifscCode === '') {
                errors.ifscCode = "IFSC Code can't be empty"
            }
            else if (panNumber === '') {
                errors.panNumber = "Pan number can't be empty"
            }
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                console.log('isValid')
                this.setState({ step: this.state.step + 1 })
            }
        }


    }
    onChangeHandler = (event) => {
        console.log(this.state)
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }

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
    userMemberHandler = (e) => {
        if (e.target.value != '') {
            this.setState({
                familyMember: e.target.value
            });
        }
    }
    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        // console.log('yyyyyyyyyyyyyyyyy',this.state)
        const {           
            number,
            ownerName,
            DOB,
            email,
            tower,
            bankName,
            holderName,
            accountNumber,
            panNumber,
            ifscCode,
            flatNO,
            familyMember,
            memberName,
            memberDOB,
            relationName,
            profilePic,
            permanentAddress} = this.state
            console.log('yyyyyyyyyyyyyyyyy',this.state)
            const data = new FormData()
            data.append('ownerName',ownerName)
            data.append('dob',DOB)
            data.append('contact',number)
            data.append('email',email)
            data.append('societyId',ownerName)
            data.append('permanentAddress',permanentAddress)
            data.append('towerId',tower)
            data.append('flatDetailId',flatNO)
            data.append('bankName',bankName)
            data.append('accountHolderName', holderName)
            data.append('accountNumber', accountNumber)
            data.append('panCardNumber', panNumber)
            data.append('IFSCCode', ifscCode)
            data.append('noOfMembers', familyMember)
            data.append('memberName', memberName)
            data.append('memberDob', memberDOB)
            data.append('relationId', relationName)
            data.append('profilePicture', profilePic.name)
            // console.log('ooooooooooooooooooooooooo',data);
        }
    FileChange=(event)=>{
        this.setState({ profilePic: event.target.files[0]})
  }
    render() {
            
        let userDatas = [];
        for (let i = 0; i < this.state.familyMember; i++) {
           
            userDatas.push(<FormGroup key={i} >
                <Row form>
                    <Col md={4}>
                        <Label>Name</Label>
                        <Input placeholder="Name Of Member" name={`memberName${i}`} onChange={this.onChangeHandler}/>
                    </Col>
                    <Col md={4}>
                        <Label>Relation With Owner</Label>
                        <Select options={this.getRelationList(this.props.relationList)}
                            onChange={this.relationHandler.bind(this,"relationName" )}
                            placeholder={PlaceHolder}
                            name={`relationId${i}`} />
                    </Col>
                    <Col md={4}>
                                <Label>Date Of Birth</Label>
                                <Input  type='date' max={this.maxDate()} name={`memberDob${i}`} onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.DOB}</span>
                                </Col>
                </Row>
            </FormGroup>);
          
        }
        return (
            <div>
                <UI onClick={this.logout}>
                    <Form onSubmit={this.onSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                            <h3>Flat Owner Details</h3>
                            <FormGroup>
                                <Label>Owner Name</Label>
                                <Input placeholder="Full Name" maxLength={50} name='ownerName' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.ownerName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Date Of Birth</Label>
                                <Input  type='date' max={this.maxDate()} name='DOB' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.DOB}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input placeholder="Contact Number" onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={10} value={this.state.number} onChange={this.onChangeHandler} name="number" />
                                <span className="error">{this.state.errors.number}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email </Label>
                                <Input placeholder="Email" type='email' name='email' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.email}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Society Name</Label>
                                <Select options={this.getSociety(this.props.societyName)}
                                    onChange={this.societyChangeHandler.bind(this)}
                                    placeholder={PlaceHolder} />
                                <span className="error">{this.state.errors.societyName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Country</Label>
                                <Input readOnly placeholder="Country" type='text' value={this.state.countryName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>State</Label>
                                <Input readOnly type="text" placeholder="State Name" value={this.state.stateName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>City</Label>
                                <Input readOnly type="text" placeholder="City Name" value={this.state.cityName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Location</Label>
                                <Input readOnly type="text" placeholder="Location Name" value={this.state.locationName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Permanent Address</Label>
                                <Input type="text" placeholder="Permanent Address" name="permanentAddress" onChange={this.onChangeHandler} />
                            </FormGroup >
                            <FormGroup>
                                <Label>Tower</Label>
                                <Select options={this.getTower(this.props.towerList)}
                                    onChange={this.towerChangeHandler.bind(this, 'tower')}
                                    placeholder={PlaceHolder} />
                                <span className="error">{this.state.errors.tower}</span>
                            </FormGroup >
                            <FormGroup>
                                <Label>Flat Number</Label>
                                <Select options={this.getflat(this.props.flatList)}
                                    onChange={this.flatChangeHandler.bind(this, 'flatNO')}
                                    placeholder={PlaceHolder} />
                                <span className="error">{this.state.errors.flatNO}</span>
                            </FormGroup >
                        </div>
                        <div style={{ 'display': this.state.step == 2 ? 'block' : 'none' }}>
                            <h3>Bank Details</h3>
                            <FormGroup>
                                <Label>Bank Name</Label>
                                <Input placeholder="Bank Name" type="text" name="bankName" onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.bankName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Account Holder Name</Label>
                                <Input placeholder="Holder Name" type="text" name='holderName' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.holderName}</span>
                            </FormGroup>
                            <FormGroup >
                                <Label>Account Number</Label>
                                <Input placeholder="Account Number" type="text" maxLength={18} onKeyPress={this.OnKeyPresshandlerPhone} name='accountNumber' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.accountNumber}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>PAN Card Number</Label>
                                <Input placeholder="Pan Number" type='text'maxLength={10} name="panNumber" onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.panNumber}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>IFSC Code</Label>
                                <Input placeholder="IFSC code" type='text' maxLength={11} name="ifscCode" onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.ifscCode}</span>
                            </FormGroup>
                        </div>
                        <div style={{ 'display': this.state.step == 3 ? 'block' : 'none' }}>
                            <h3>Owner Member Details</h3>
                            <FormGroup>
                                <Label>Number of Member</Label>
                                <Input placeholder="number of member" type='text' onKeyPress={this.OnKeyPresshandlerPhone} name="familyMember" onChange={this.userMemberHandler} />
                            </FormGroup>
                    
                            {userDatas}
                 
                            <FormGroup>
                            <Label>Upload Profile Pic</Label>                               
                                <Input accept='image/*' type="file" name ="profilePic" onChange={this.FileChange} />
                            </FormGroup>
                        </div>
                        <div>
                            <Button className="mr-2" type="button" id="prevBtn" style={{ display: this.state.step == 1 ? 'none' : 'inline-block' }} disabled={this.state.step == 1} onClick={() => { this.setState({ step: this.state.step - 1 }) }}>Previous</Button>
                            <Button type="button" id="nextBtn" style={{ display: this.state.step == 3 ? 'none' : 'inline-block' }} disabled={this.state.step == 3} onClick={this.nextPrev}>Next</Button>
                            <Button type="submit" style={{ display: this.state.step == 3 ? 'inline-block' : 'none' }}>Submit</Button>
                        </div>
                    </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        societyName: state.societyReducer,
        towerList: state.TowerDetails,
        relationList: state.RelationMasterReducer,
        flatList:state.flatDetailMasterReducer,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ detailSociety, viewTower, getRelation,getFlatDetails }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FlatOwnerDetails);

