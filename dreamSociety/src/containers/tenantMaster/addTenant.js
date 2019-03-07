import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { connect } from 'react-redux';
import Select from 'react-select';
import { detailSociety } from '../../actionCreators/societyMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { getRelation } from './../../actionCreators/relationMasterAction';
import { getOwnerDetailViaFlatId, getFlatDetailViaTowerId, addTenantDetail } from '../../actionCreators/tenantMasterAction';

class AddTenant extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            tab: "none",
            step: 1,
            tenantName:'',
            tenantId:'',
            dob:'',
            gender:'',
            email:'',
            contact:'',
            profilePicture:'',
            permanentAddress:'',
            correspondingAddress:'',
            bankName:'',
            accountHolderName:'',
            accountNumber:'',
            panCardNumber:'',
            IFSCCode:'',
            noOfMembers:'',
            countryName : '',
            countryId: '',
            stateName : '',
            stateId: '',
            cityName : '',
            cityId: '',
            locationName : '',
            locationId: '',
            flatNo: '',
            flatDetailId: '',
            societyName : '',
            societyId: '',
            ownerId1: '',
            ownerId2: '',
            ownerId3: '',
            member:[],
            fileName: '',
        }
    }

    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
    }

    componentWillReceiveProps(){

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

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
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

    getSociety = ({detail_Society}) => {
        console.log(detail_Society)
        if (detail_Society) {
            console.log(detail_Society)
            return detail_Society.map((item1) => {
                return (
                    { ...item1, label: item1.societyName, value: item1.societyId }
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

    fetchFlatDetail = ({getFlatDetail}) => {
        console.log(getFlatDetail)
        if(getFlatDetail){
            return getFlatDetail.owner.map((item) => {
                return (
                    <option value={item.flatDetailId} key={item.flatDetailId}>{item.flatNo}</option>
                )
            })
        }
        
        
    }

    

    towerChangeHandler = (selectTower) => {
        
        this.props.getFlatDetailViaTowerId(selectTower.towerId)
    }

    // fetchOwnerDetail1 = ({getOwnerDetail}) => {
    //     console.log(getOwnerDetail)
    //         if(getOwnerDetail){
    //             console.log(this.state.ownerId1)
    //             if(getOwnerDetail.owner[0]){
    //                 return (
    //                     <option key={getOwnerDetail.owner[0].ownerId} value={getOwnerDetail.owner[0].ownerId}>
    //                         {getOwnerDetail.owner[0].ownerName}
    //                     </option>
    //                 )
    //             }
                
            
    //     }
    // }

    // fetchOwnerDetail2 = ({getOwnerDetail}) => {
    //     console.log(getOwnerDetail)
    //         if(getOwnerDetail){
    //             console.log(this.state.ownerId2)
    //             if(getOwnerDetail.owner[1]){
    //                 return (
    //                     <option key={getOwnerDetail.owner[1].ownerId} value={getOwnerDetail.owner[1].ownerId}>
    //                         {getOwnerDetail.owner[1].ownerName}
    //                     </option>
    //                 );
    //             }
                
    //         }
    //     }

    // fetchOwnerDetail3 = ({getOwnerDetail}) => {
    //     console.log(getOwnerDetail)
    //         if(getOwnerDetail){
    //             console.log(this.state.ownerId3)
    //             if(getOwnerDetail.owner[2]){
    //                 return (
    //                     <option key={getOwnerDetail.owner[2].ownerId} value={getOwnerDetail.owner[2].ownerId}>
    //                         {getOwnerDetail.owner[2].ownerName}
    //                     </option>
    //                 )
    //             }
                
          
    //         }
    //     }

    flatChangeHandler = (e) => {
        this.setState({flatDetailId: e.target.value});
        console.log(this.state);
        this.props.getOwnerDetailViaFlatId(e.target.value)
    }

    getRelationList = ({ relationResult }) => {
        console.log(this.state)
        if (relationResult) {
            return relationResult.relation.map((item) => {
                return (
                    { ...item, name:"relation", label: item.relationName, value: item.relationId }
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

    userMemberHandler = (e) => {
        if (e.target.value != '') {
            this.setState({
                noOfMembers: e.target.value
            });
        }
    }

    

    memberDetailChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state)
    }
    onSubmit = (e) => {
        e.preventDefault()
        let { tenantName, dob, gender, email, contact, profilePicture, permanentAddress, correspondingAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, countryName, countryId, 
            stateName, stateId, cityName, cityId, locationName, locationId, flatNo, flatDetailId, 
            societyName, societyId, member, fileName } = this.state;
        console.log(this.state)
        let data = []
        for(let i = 0; i < this.state.noOfMembers; i++){
            console.log(this.state.member)
             data.push({
                memberName: this.state['memberName'+i],
                dob: this.state['dob'+i],
                relation: this.state['relation'+i],
                gender:this.state['gender'+i]
            })
        }
        
        this.setState({member:data})
        console.log(tenantName, dob, gender, email, contact, profilePicture, permanentAddress, correspondingAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, countryName, countryId, 
            stateName, stateId, cityName, cityId, locationName, locationId, flatNo, flatDetailId, 
            societyName, societyId, member, fileName);

        this.props.addTenantDetail({tenantName, dob, gender, email, contact, profilePicture, permanentAddress, correspondingAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, countryName, countryId, 
            stateName, stateId, cityName, cityId, locationName, locationId, flatNo, flatDetailId, 
            societyName, societyId, member, fileName});
    }

    relationHandler = (name,selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.value)
        });
        console.log(this.state)
    }

    imageChangeHandler = (event) => {
        const files = event.target.files
        const file = files[0];
        console.log(file.name)
        let fileName = file.name;
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                profilePicture :  reader.result,
                fileName
              })
              console.log(this.state.profilePicture)
          };
        }
        
    }

    render(){
        
        let userDatas = [];
        for (let i = 0; i < this.state.noOfMembers; i++) {
            userDatas.push(<FormGroup key={i}>
                <Row form>
                    <Col md={4}>
                        <Label>Name</Label>
                        <Input placeholder="Name Of Member" name = {`memberName${i}`} onChange={this.memberDetailChange} className="input" />
                    </Col>
                    <Col md={5}>
                        <Label>Relation With Owner</Label>
                        <Select name={`relation${i}`} options={this.getRelationList(this.props.relationList)} 
                          onChange={this.relationHandler.bind(this,'relation'+i )}  />
                    </Col>
                    <Col md={3} style={{display: 'flex'}}>
                        <Col md={1}>
                            <Label>M</Label>
                            <Input name={`gender${i}`} style={{margin: '0px'}} onChange={this.memberDetailChange} type="radio" value="Male" />
                        </Col>
                        <Col md={1}>
                            <Label>F</Label>
                            <Input name={`gender${i}`} style={{margin: '0px'}} onChange={this.memberDetailChange} type="radio" value="Female" />
                        </Col>
                        <Col md={1}>
                            <Label>O</Label>
                            <Input name={`gender${i}`} style={{margin: '0px'}} onChange={this.memberDetailChange} type="radio" value="Other" />
                        </Col>
                    </Col>
                    <Col md={3}>
                        <Label>Date of Birth</Label>
                        <Input type="date"  name={`dob${i}`} onChange={this.memberDetailChange} />
                    </Col>
                </Row>
            </FormGroup>);
        }

        

        return(
            <UI onClick={this.logout}>
                <Form onSubmit={this.onSubmit} method="post">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                        <h3>Tenant Details</h3>
                        <FormGroup>
                            <Label>Tenant Name</Label>
                            <Input type="text" placeholder="Name" onChange={this.onChange} 
                            maxLength={50} name='tenantName' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input type="date" onChange={this.onChange} name="dob"
                             max={this.maxDate()} name="dob" />
                        </FormGroup>
                        <FormGroup>
                            <Col md={3} style={{display: 'flex'}}>
                                <Col md={1}>
                                    <Label>M</Label>
                                    <Input name="gender" style={{margin: '0px'}} onChange={this.onChange} type="radio" value="Male" />
                                </Col>
                                <Col md={1}>
                                    <Label>F</Label>
                                    <Input name="gender" style={{margin: '0px'}} onChange={this.onChange} type="radio" value="Female" />
                                </Col>
                                <Col md={1}>
                                    <Label>O</Label>
                                    <Input name="gender" style={{margin: '0px'}} onChange={this.onChange} type="radio" value="Other" />
                                </Col>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.onChange}
                             name="contact" placeholder="Contact Number" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Email" onChange={this.onChange} name="email" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Society Name</Label>
                            <Select placeholder="Society Name"
                             options={this.getSociety(this.props.societyReducer)}
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
                            <Label>Corresponding Address</Label>
                            <Input type="textarea" onChange={this.onChange}
                             name="correspondingAddress" placeholder="Corresponding Address" />
                        </FormGroup >
                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="textarea" onChange={this.onChange}
                             name="permanentAddress" placeholder="Permanent Address" />
                        </FormGroup>
                    </div>
                    <div style={{ 'display': this.state.step == 2 ? 'block' : 'none' }}>
                        <h3>Bank Details</h3>
                        <FormGroup>
                                <Label>Bank Name</Label>
                                <Input placeholder="Bank Name" onChange={this.onChange}
                                 type="text" name="bankName" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Account Holder Name</Label>
                            <Input placeholder="Holder Name" onChange={this.onChange}
                             type="text" name='accountHolderName' />
                        </FormGroup>
                        <FormGroup >
                            <Label>Account Number</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.onChange}
                             placeholder="Account Number"
                             type="text" className="quantity" name='accountNumber' />
                        </FormGroup>
                        <FormGroup>
                            <Label>PAN Card Number</Label>
                            <Input placeholder="Pan Number" onChange={this.onChange}
                             type='text' name="panCardNumber" />
                        </FormGroup>
                        <FormGroup>
                            <Label>IFSC Code</Label>
                            <Input placeholder="IFSC code" onChange={this.onChange}
                             type='text' name="IFSCCode" />
                        </FormGroup>
                    </div>
                    <div style={{ 'display': this.state.step == 3 ? 'block' : 'none' }}>
                        <h3>Tenant Member Details</h3>
                        <FormGroup>
                            <Label>Number of Member</Label>
                            <Input onKeyPress={this.numberValidation} placeholder="number of member"
                             onChange={this.userMemberHandler} type='text' 
                             className="quantity" name="noOfMembers" />
                        </FormGroup>
                        {userDatas}
                    </div>
                    <div style={{ 'display': this.state.step == 4 ? 'block' : 'none' }}>
                        <h3>Flat Owner Details</h3>
                        <FormGroup>
                            <Label>Tower</Label>
                            <Select onChange={this.towerChangeHandler} placeholder="Tower" name="towerId"
                            options={this.getTower(this.props.towerList)} />
                        </FormGroup >
                        <FormGroup>
                            <Label>Flat No.</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.flatChangeHandler}
                             placeholder="Flat No." defaultValue="no-value"
                            type='select' name="flatDetailId" >
                            <DefaultSelect />
                            {/* {this.getFlats(this.props.tenantReducer)} */}
                            {this.fetchFlatDetail(this.props.tenantReducer)}
                            </Input>
                        </FormGroup>
                        {/* <FormGroup>
                            <Label>Owner Name 1</Label>
                            <Input placeholder="Owner Name"
                             onChange={this.onChange}
                             type='select' name='ownerId1' defaultValue="no-value">
                                <DefaultSelect />
                                {this.fetchOwnerDetail1(this.props.tenantReducer)}
                             </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Owner Name 2</Label>
                            <Input placeholder="Owner Name"
                             onChange={this.onChange}
                             type='select' name='ownerId2' defaultValue="no-value">
                                <DefaultSelect />
                                {this.fetchOwnerDetail2(this.props.tenantReducer)}
                             </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Owner Name 3</Label>
                            <Input placeholder="Owner Name"
                             onChange={this.onChange}
                             type='select' name='ownerId3' defaultValue="no-value">
                                <DefaultSelect />
                                {this.fetchOwnerDetail3(this.props.tenantReducer)}
                             </Input>
                        </FormGroup> */}
                    </div>
                    <div style={{ 'display': this.state.step == 5 ? 'block' : 'none' }}>
                        <h3>Upload Your Image</h3>
                        <FormGroup>
                            <Label>Image</Label>
                            <Input accept='image/*' placeholder="Owner Name" onChange={this.imageChangeHandler}
                             type='file' name="profilePicture" />
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
        societyReducer: state.societyReducer,
        towerList: state.TowerDetails,
        relationList: state.RelationMasterReducer,
        flatList:state.flatDetailMasterReducer,
        tenantReducer:state.tenantReducer,
    }
}

export default connect(mapStateToProps, {detailSociety, viewTower, getRelation,
    getOwnerDetailViaFlatId, getFlatDetailViaTowerId, addTenantDetail})(AddTenant);