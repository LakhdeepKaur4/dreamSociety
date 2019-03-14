import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { connect } from 'react-redux';
import Select from 'react-select';
import { detailSociety } from '../../actionCreators/societyMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { getRelation } from './../../actionCreators/relationMasterAction';
import Spinner from '../../components/spinner/spinner';
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
            aadhaarNumber:'',
            panCardNumber:'',
            IFSCCode:'',
            noOfMembers:'',
            flatNo: '',
            flatDetailId: '',
            societyName : '',
            societyId: '',
            member:[],
            towerId:'',
            towerName:'',
            fileName: '',
            imageSizeError:'',
            errors:{},
            emailValidError:'',
            loading: false,
        }
    }

    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
        let societyId = localStorage.getItem('societyId')
        console.log(societyId);
        this.setState({societyId})
        console.log(this.state.societyId)
        this.setState({societyId: localStorage.getItem('societyId')})
        console.log(this.state.societyId) 
    }

    

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close = () => {
        return this.props.history.replace('/superDashBoard');
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

    ifscChange = (e) => {
        this.setState({IFSCCode:e.target.value.toUpperCase()})
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
        let societyId = selectOption.societyId;

        this.setState(function (prevState, props) {
            return {
                'societyName': selectOption.value,
                societyId
            }
        }, function () {
        });
    }

    fetchFlatDetail = ({getFlatDetail}) => {
        console.log(getFlatDetail)
        if(getFlatDetail && getFlatDetail.owner){
            console.log(getFlatDetail)
            return getFlatDetail.owner.map((item) => {
            return (
                <option value={item.flatDetailId} key={item.flatDetailId}>{item.flatNo}</option>
            )
            })
        }
    }

    

    towerChangeHandler = (selectTower) => {
        this.setState({towerName:selectTower.towerName, towerId:selectTower.towerId})
        this.props.getFlatDetailViaTowerId(selectTower.towerId)
    }


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
        console.log(this.state.societyId)
        e.preventDefault()
        let { tenantName, dob, gender, email, contact, profilePicture, aadhaarNumber, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, member, fileName, societyId, towerName, towerId } = this.state;
        console.log(this.state)
        let data = []
        for(let i = 0; i < this.state.noOfMembers; i++){
            console.log(this.state.member)
             data.push({
                memberName: this.state['memberName'+i],
                dob: this.state['dob'+i],
                relation: this.state['relationId'+i],
                gender:this.state['gender'+i]
            })
        }
        
        this.setState({member:data})
        console.log(tenantName, dob, gender,aadhaarNumber, email, contact, profilePicture, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, societyId, member, towerName, fileName, towerId);

        if(this.state.imageSizeError === ''){
            this.props.addTenantDetail({tenantName, dob,aadhaarNumber, gender, email, contact, profilePicture, permanentAddress, bankName, 
                accountHolderName, accountNumber, panCardNumber, towerName, towerId, IFSCCode, noOfMembers, flatDetailId, societyId, member, fileName})
                .then(() => this.props.history.push('/superDashboard/tenantDetails'))
                .catch(err => err.response.data);
        }
    }

    routeToDetail = () => {
        this.props.history.push('/superDashboard/tenantDetails')
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
        console.log(file)
        let fileName = file.name;
        if (files && file && file.size <= 40096) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                profilePicture :  reader.result,
                fileName,
                imageSizeError:''
              })
              console.log(this.state.profilePicture)
          };
        }
        else {
            this.setState({imageSizeError:'Image size should not be more than 4 MB.'});
        }
    }

    nextPrev = () => {
        let errors = {};
        const {tenantName, dob, gender, contact, email, correspondingAddress, aadhaarNumber, permanentAddress} = this.state;
        if(this.state.step === 1){
            if(tenantName === '') errors.tenantName = `Tenant Name can't be empty.`;
            if(dob === '') errors.dob = `Date of Birth can't be empty.`;
            if(gender === '') errors.gender = `Gender can't be empty`;
            if(contact === '') errors.contact= `Contact can't be empty.`;
            if(email === '') errors.email = `Email can't be empty.`;
            if(correspondingAddress === '') errors.correspondingAddress = `Corresponding Address can't be empty.`;
            if(permanentAddress === '') errors.permanentAddress = `Permanent Address can't be empty.`;
            if(aadhaarNumber === '') errors.aadhaarNumber=`Aadhaar Number can't be empty.`
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }
        const { bankName, accountHolderName, accountNumber, panCardNumber, IFSCCode } = this.state;
        if(this.state.step === 2){
            if(bankName === '') errors.bankName = `Bank name can't be empty.`;
            if(accountHolderName === '') errors.accountHolderName = `Account Holder name can't be empty.`;
            if(accountNumber === '') errors.accountNumber = `Account number can't be empty.`;
            if(panCardNumber === '') errors.panCardNumber = `Pan Card number can't be empty.`;
            if(IFSCCode === '') errors.IFSCCode = `IFSC code can't be empty.`;
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }
        if(this.state.step === 3){
            this.setState({ step: this.state.step + 1 })
        }
        const { towerId, flatDetailId } = this.state;
        if(this.state.step === 4){
            if(towerId === '') errors.towerId = `Please select Tower.`;
            if(flatDetailId === '') errors.flatDetailId = `Please select a flat.`;
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }

    }

    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    emailChange = (e) => {
        console.log(this.state.email)
        
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            console.log(this.state.email)
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        
    }

    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    bankValidation(e){
        const pattern = /^[a-zA-Z0-9_, ]+$/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }

    render(){
        
        let userDatas = [];
        for (let i = 0; i < this.state.noOfMembers; i++) {
            userDatas.push(<FormGroup key={i}>
                <Row form>
                    <Col md={4}>
                        <Label>Name</Label>
                        <Input placeholder="Name Of Member"
                        onKeyPress={this.OnKeyPressUserhandler}
                         name = {`memberName${i}`} onChange={this.memberDetailChange} 
                        className="input" />
                    </Col>
                    <Col md={5}>
                        <Label>Relation With Owner</Label>
                        <Select name={`relationId${i}`} options={this.getRelationList(this.props.relationList)} 
                          onChange={this.relationHandler.bind(this,'relationId'+i )}  required/>
                    </Col>
                    <Col md={3} style={{display: 'flex'}}>
                    <Label>Gender: </Label>
                        <Col md={1}>
                            <Label>M</Label>
                            <Input name={`gender${i}`} style={{margin: '0px'}} onChange={this.memberDetailChange} 
                            type="radio" value="Male"  required />
                        </Col>
                        <Col md={1}>
                            <Label>F</Label>
                            <Input name={`gender${i}`} style={{margin: '0px'}} onChange={this.memberDetailChange}
                             type="radio" value="Female"  required />
                        </Col>
                        <Col md={1}>
                            <Label>O</Label>
                            <Input name={`gender${i}`} style={{margin: '0px'}} onChange={this.memberDetailChange} 
                            type="radio" value="Other"  required />
                        </Col>
                    </Col>
                    <Col md={3}>
                        <Label>Date of Birth</Label>
                        <Input type="date" max={this.maxDate()}  name={`dob${i}`} onChange={this.memberDetailChange}  required />
                    </Col>
                </Row>
            </FormGroup>);
        }

        let formData = <div>
            <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                        <h3>Tenant Details</h3>
                        <FormGroup>
                            <Label>Tenant Name</Label>
                            <Input type="text" placeholder="Name" onKeyPress={this.OnKeyPressUserhandler} 
                            onChange={this.onChange} 
                            maxLength={50} name='tenantName' />
                            {!this.state.tenantName ? <span className="error">{this.state.errors.tenantName}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input type="date" onChange={this.onChange} name="dob"
                             max={this.maxDate()} name="dob" />
                             {!this.state.dob ? <span className="error">{this.state.errors.dob}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <div style={{display: 'flex'}}>
                            <Label>Gender: </Label>
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
                            </div>
                            <div style={{marginTop:'20px'}}>
                            {!this.state.gender ? <span className="error">
                                {this.state.errors.gender}
                            </span> : ''}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.onChange}
                             name="contact" placeholder="Contact Number" type="text" maxLength="10" />
                             {!this.state.contact ? <span className="error">
                                {this.state.errors.contact}
                            </span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Email" onChange={this.emailChange}
                            onKeyPress={this.emailValid} name="email" type="email" />
                            {!this.state.email ? <span className="error">
                                {this.state.errors.email}
                            </span> : ''}
                            {<span className="error">{this.state.emailValidError}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Aadhaar Number</Label>
                            <Input placeholder="Aadhaar number" onChange={this.onChange}
                            name="aadhaarNumber"  onKeyPress={this.numberValidation} type="text"
                            maxLength="12" />
                            {!this.state.aadhaarNumber ? <span className="error">
                                {this.state.errors.aadhaarNumber}
                            </span> : ''}
                        </FormGroup>
                        {/* <FormGroup>
                            <Label>Society Name</Label>
                            <Select placeholder="Society Name"
                             options={this.getSociety(this.props.societyReducer)}
                                onChange={this.societyChangeHandler.bind(this)}
                                     />
                            {!this.state.societyId ? <span className="error">
                                {this.state.errors.societyId}
                            </span> : ''}
                        </FormGroup> */}
                        <FormGroup>
                            <Label>Corresponding Address</Label>
                            <Input type="textarea" onChange={this.onChange} maxLength="250"
                             name="correspondingAddress" placeholder="Corresponding Address" />
                             {!this.state.correspondingAddress ? <span className="error">
                                {this.state.errors.correspondingAddress}
                            </span> : ''}
                        </FormGroup >
                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="textarea" onChange={this.onChange}
                            maxLength="250"
                             name="permanentAddress" placeholder="Permanent Address" />
                             {!this.state.permanentAddress ? <span className="error">
                                {this.state.errors.permanentAddress}
                            </span> : ''}
                        </FormGroup>
                    </div>
                    <div style={{ 'display': this.state.step == 2 ? 'block' : 'none' }}>
                        <h3>Bank Details</h3>
                        <FormGroup>
                                <Label>Bank Name</Label>
                                <Input placeholder="Bank Name" onChange={this.onChange}
                                onKeyPress={this.bankValidation}
                                maxLength="50"
                                 type="text" name="bankName" />
                                 {!this.state.bankName ? <span className="error">{this.state.errors.bankName}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Account Holder Name</Label>
                            <Input placeholder="Holder Name" onChange={this.onChange}
                            onKeyPress={this.OnKeyPressUserhandler} maxLength="14"
                             type="text" name='accountHolderName' />
                             {!this.state.accountHolderName ? <span className="error">{this.state.errors.accountHolderName}</span> : ''}
                        </FormGroup>
                        <FormGroup >
                            <Label>Account Number</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.onChange}
                             placeholder="Account Number"
                             type="text" className="quantity" name='accountNumber' maxLength='14'/>
                             {!this.state.accountNumber ? <span className="error">{this.state.errors.accountNumber}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>PAN Card Number</Label>
                            <Input placeholder="Pan Number" onChange={this.onChange}
                             type='text' name="panCardNumber" minLength='10'
                             value={this.state.panCardNumber.toUpperCase()}
                             maxLength='10' onKeyPress={(e) => {
                                const pattern = /^[a-zA-Z0-9]+$/;
                                let inputChar = String.fromCharCode(e.charCode);
                                if (!pattern.test(inputChar)) {
                                    e.preventDefault();
                                }
                            }}  />
                             {!this.state.panCardNumber ? <span className="error">{this.state.errors.panCardNumber}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>IFSC Code</Label>
                            <Input placeholder="IFSC code" onChange={this.ifscChange}
                            maxLength="16"
                            value={this.state.IFSCCode.toUpperCase()}
                            onKeyPress={(e) => {
                                const pattern = /^[a-zA-Z0-9]+$/;
                                let inputChar = String.fromCharCode(e.charCode);
                                if (!pattern.test(inputChar)) {
                                    e.preventDefault();
                                }
                            }}
                             type='text' name="IFSCCode" />
                             {!this.state.IFSCCode ? <span className="error">{this.state.errors.IFSCCode}</span> : ''}
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
                            {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
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
                            {!this.state.flatDetailId ? <span className="error">{this.state.errors.flatDetailId}</span> : ''}
                        </FormGroup>
                    </div>
                    <div style={{ 'display': this.state.step == 5 ? 'block' : 'none' }}>
                        <h3>Upload Your Image</h3>
                        <FormGroup>
                            <Label>Image</Label>
                            <Input accept='image/*' onChange={this.imageChangeHandler}
                             type='file' name="profilePicture" />
                        </FormGroup>
                        <span className="error">{this.state.imageSizeError}</span>
                    </div>
                    <div>
                        <Button color="primary" className="mr-2" id="prevBtn" style={{ display: this.state.step == 1 ? 'none' : 'inline-block' }} disabled={this.state.step == 1} onClick={() => { this.setState({ step: this.state.step - 1 }) }}>Previous</Button>
                        <Button color="primary" id="nextBtn" style={{ display: this.state.step == 5 ? 'none' : 'inline-block' }} disabled={this.state.step == 5} onClick={this.nextPrev}>Next</Button>
                        <Button color="success" className="mr-2" style={{ display: this.state.step == 5 ? 'inline-block' : 'none' }}>Submit</Button>
                        <Button color="danger" style={{ display: this.state.step == 5 ? 'inline-block' : 'none' }} onClick={this.routeToDetail}>Cancel</Button>
                    </div>
        </div>

        return(
            <UI onClick={this.logout}>
                <Form onSubmit={this.onSubmit} method="post">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    {!this.state.loading ? formData : <Spinner />}
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