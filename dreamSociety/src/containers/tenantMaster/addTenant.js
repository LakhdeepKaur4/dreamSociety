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
            floorId:'',
            flatDetailId: '',
            societyName : '',
            societyId: '',
            member:[],
            towerId:'',
            towerName:'',
            fileName: '',
            imageSizeError:'',
            errors:{},
            loading: false,
            messageContactErr:'',
            messageEmailErr:''
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
        
        console.log(this.state);
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim(),messageContactErr:''});
        }
    }

    ifscChange = (e) => {
        
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase(), errors });
        }
        else {
            this.setState({IFSCCode:e.target.value.toUpperCase()});
        }
    }

    getTower = ({ tower }) => {
        if (tower) {
            return tower.tower.map((item) => {
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

    fetchFloorDetail = ({getFlatDetail}) => {
        console.log(getFlatDetail)
        if(getFlatDetail){
            console.log(getFlatDetail)
            return getFlatDetail.tower.Floors.map((item) => {
            return (
                <option value={item.floorId} key={item.floorId}>{item.floorName}</option>
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
        this.setState({loading: true})
        console.log(this.state.societyId)
        e.preventDefault()
        let { tenantName, dob, gender, email, contact, profilePicture, aadhaarNumber, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, member, fileName, societyId, towerName, towerId, floorId } = this.state;
        console.log(this.state)
        
        let data;
        for(let i = 0; i < this.state.noOfMembers; i++){
            console.log(this.state.member)
             data = {
                memberName: this.state['memberName'+i],
                memberDob: this.state['memberDob'+i],
                relationId: this.state['relationId'+i],
                gender:this.state['gender'+i]
            }
                    this.state.member.push(data)
        }
        
        
        console.log(tenantName, dob, gender,aadhaarNumber, email, contact, profilePicture, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, societyId, member, towerName, fileName, towerId, floorId);

        const data1 = {tenantName, dob, gender,aadhaarNumber, email, contact, profilePicture, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, societyId, member, towerName, fileName, towerId, floorId}

        if(this.state.imageSizeError === '' && this.state.messageContactErr==='' && this.state.messageEmailErr===''){
            this.props.addTenantDetail(data1)
                .then(() => this.props.history.push('/superDashboard/tenantDetails'))
                .catch(err => {
                    err.response.data.message
                    this.setState({messageContactErr:err.response.data.messageContactErr,messageEmailErr:err.response.data.messageEmailErr,
                         loading:false, member:[]})
                });
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
        if (files && file) {
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
            else if(aadhaarNumber.length !== 12) errors.aadhaarNumber=`Aadhaar Number should be of digit 12.`
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
            else if(IFSCCode.length !== 11) errors.IFSCCode=`IFSC code should be of digit 11.`
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }
        if(this.state.step === 3){
            this.setState({ step: this.state.step + 1 })
        }
        const { towerId, floorId, flatDetailId } = this.state;
        if(this.state.step === 4){
            if(towerId === '') errors.towerId = `Please select Tower.`;
            if(floorId === '') errors.floorId = `Please select a Floor.`;
            if(flatDetailId === '') errors.flatDetailId = `Please select a Flat.`;
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
        this.setState({email:e.target.value, messageEmailErr:''})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            console.log(this.state.email)
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log(this.state.email)
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({email:e.target.value});
        }
        
        
    }

    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }
    
    bankValidation(e){
        const pattern = /^[a-zA-Z0-9_, ]+$/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }

    fetchFlatDetail = ({getFlatDetail}) => {
        console.log(getFlatDetail)
        console.log(this.state.floorId)
        if(getFlatDetail){
            console.log(getFlatDetail.flatDetail)
            
             return getFlatDetail.flatDetail.filter((i) => {
                
                return this.state.floorId == i.floorId
            }).map((item) => {
                if(item){
                    return (
                        <option value={item.flatDetailId} key={item.flatDetailId} >{item.flatNo}</option>
                    )
                }
            })
        }
    }

    floorChange = (e) => {
        this.setState({floorId:e.target.value})
        
    }

    render(){
        
        let userDatas = [];
        for (let i = 0; i < this.state.noOfMembers; i++) {
            userDatas.push(<FormGroup key={i}>
                <Row form>
                    <Col md={6}>
                        <Label>Name</Label>
                        <Input placeholder="Name Of Member"
                        onKeyPress={this.OnKeyPressUserhandler}
                         name = {`memberName${i}`} onChange={this.memberDetailChange} 
                        className="input" />
                    </Col>
                    <Col md={6}>
                        <Label>Relation With Owner</Label>
                        <Select name={`relationId${i}`} options={this.getRelationList(this.props.relationList)} 
                          onChange={this.relationHandler.bind(this,'relationId'+i )}  required/>
                    </Col>
                    <Col md={12} style={{marginTop:'20px', marginBottom:'20px'}}>
                        <Label>Gender:</Label>
                        <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                        <span><Input name={`gender${i}`} onChange={this.memberDetailChange}
                                        type="radio" value="Female" /></span>
                        
                        
                        <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                        <span><Input name={`gender${i}`} onChange={this.memberDetailChange}
                                        type="radio" value="Female"/></span>
                        
                        
                        <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                        <span><Input type="radio" onKeyPress={this.OnKeyPressUserhandler}
                                    name = {`memberName${i}`} onChange={this.memberDetailChange} 
                                    className="input"/></span>
                    </Col>
                    <Col md={12}>
                        <Label>Date of Birth</Label>
                        <Input type="date" max={this.maxDate()}  name={`memberDob${i}`} onChange={this.memberDetailChange} />
                    </Col>
                </Row>
            </FormGroup>

            );
        }

        let formData = <div>
            <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                        <h3>Tenant Details</h3>
                        <FormGroup>
                            <Label>Tenant Name</Label>
                            <Input type="text" placeholder="Name" onKeyPress={this.OnKeyPressUserhandler} 
                            onChange={this.onChange} 
                            maxLength={100} name='tenantName' />
                            {<span className="error">{this.state.errors.tenantName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input type="date" onChange={this.onChange} name="dob"
                             max={this.maxDate()} name="dob" />
                             {<span className="error">{this.state.errors.dob}</span>}
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <Label>Gender:</Label>
                                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                                <span><Input type="radio" id="Gender1" name="gender" onChange={this.onChange} value="Male"/></span>
                                
                                
                                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                                <span><Input type="radio" id="Gender2" name="gender" onChange={this.onChange} value="Female"/></span>
                                
                                
                                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                                <span><Input type="radio" id="Gender3" name="gender" onChange={this.onChange} value="Other"/></span>
                            </div>
                            <div>
                                {<span className="error">{this.state.errors.gender}</span>}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.onChange}
                             name="contact" placeholder="Contact Number" type="text" minLength="10" maxLength="10" />
                             {<span className="error">
                                {this.state.errors.contact}
                            </span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Email" onChange={this.emailChange}
                            onKeyPress={this.emailValid} name="email" type="email" maxLength="70" />
                            {<span className="error">{this.state.emailValidError}</span>}
                            <span><br/></span>
                            {<span className="error">{this.state.errors.email}</span>}
                            
                        </FormGroup>
                        <FormGroup>
                            <Label>Aadhaar Number</Label>
                            <Input placeholder="Aadhaar number" onChange={this.onChange}
                            name="aadhaarNumber"  onKeyPress={this.numberValidation} type="text"
                            maxLength="12" />
                            {<span className="error">
                                {this.state.errors.aadhaarNumber}
                            </span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Corresponding Address</Label>
                            <Input type="textarea" onChange={this.onChange} maxLength="250"
                             name="correspondingAddress" placeholder="Corresponding Address" />
                             {<span className="error">
                                {this.state.errors.correspondingAddress}
                            </span>}
                        </FormGroup >
                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="textarea" onChange={this.onChange}
                            maxLength="250"
                             name="permanentAddress" placeholder="Permanent Address" />
                             {<span className="error">
                                {this.state.errors.permanentAddress}
                            </span>}
                        </FormGroup>
                    </div>
                    <div style={{ 'display': this.state.step == 2 ? 'block' : 'none' }}>
                        <h3>Bank Details</h3>
                        <FormGroup>
                                <Label>Bank Name</Label>
                                <Input placeholder="Bank Name" onChange={this.onChange}
                                onKeyPress={this.bankValidation}
                                maxLength="100"
                                 type="text" name="bankName" />
                                 {<span className="error">{this.state.errors.bankName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Account Holder Name</Label>
                            <Input placeholder="Holder Name" onChange={this.onChange}
                            onKeyPress={this.OnKeyPressUserhandler} maxLength="80"
                             type="text" name='accountHolderName' />
                             {<span className="error">{this.state.errors.accountHolderName}</span>}
                        </FormGroup>
                        <FormGroup >
                            <Label>Account Number</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.onChange}
                             placeholder="Account Number"
                             type="text" className="quantity" name='accountNumber' maxLength='18'/>
                             {<span className="error">{this.state.errors.accountNumber}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>PAN Card Number</Label>
                            <Input placeholder="Pan Number" onChange={this.onChange}
                             type='text' name="panCardNumber"
                             value={this.state.panCardNumber.toUpperCase()}
                             maxLength='10' onKeyPress={(e) => {
                                const pattern = /^[a-zA-Z0-9]+$/;
                                let inputChar = String.fromCharCode(e.charCode);
                                if (!pattern.test(inputChar)) {
                                    e.preventDefault();
                                }
                            }}  />
                             {<span className="error">{this.state.errors.panCardNumber}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>IFSC Code</Label>
                            <Input placeholder="IFSC code" onChange={this.ifscChange}
                            maxLength="11"
                            value={this.state.IFSCCode.toUpperCase()}
                            onKeyPress={(e) => {
                                const pattern = /^[a-zA-Z0-9]+$/;
                                let inputChar = String.fromCharCode(e.charCode);
                                if (!pattern.test(inputChar)) {
                                    e.preventDefault();
                                }
                            }}
                             type='text' name="IFSCCode" />
                             {<span className="error">{this.state.errors.IFSCCode}</span>}
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
                        <h3>Flat Details</h3>
                        <FormGroup>
                            <Label>Tower</Label>
                            <Select onChange={this.towerChangeHandler} placeholder="Tower" name="towerId"
                            options={this.getTower(this.props.towerList)} />
                            {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
                        </FormGroup >
                        <FormGroup>
                            <Label>Floor</Label>
                            <Input defaultValue="no-value"
                            type='select' name="floorId" onChange = {this.floorChange}  >
                            <DefaultSelect />
                            {/* {this.getFlats(this.props.tenantReducer)} */}
                            {this.fetchFloorDetail(this.props.tenantReducer)}
                            </Input>
                            {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Flat No.</Label>
                            <Input onKeyPress={this.numberValidation} onChange={this.flatChangeHandler}
                             placeholder="Flat No." defaultValue="no-value"
                            type='select' name="flatDetailId" >
                            <DefaultSelect />
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
                        {this.state.messageEmailErr ? <span className="error">{this.state.messageEmailErr}</span>:''}<br/>
                        {this.state.messageContactErr ? <span className="error">{this.state.messageContactErr}</span>:''}
                    </div>
                    <div>
                        <Button color="primary" className="mr-2" id="prevBtn" style={{ display: this.state.step == 1 ? 'none' : 'inline-block' }} disabled={this.state.step == 1} onClick={() => { this.setState({ step: this.state.step - 1 }) }}>Previous</Button>
                        <Button color="primary"className="mr-2" id="nextBtn" style={{ display: this.state.step == 5 ? 'none' : 'inline-block' }} disabled={this.state.step == 5} onClick={this.nextPrev}>Next</Button>
                        <Button color="success" className="mr-2" style={{ display: this.state.step == 5 ? 'inline-block' : 'none' }}>Submit</Button>
                        <Button color="danger" onClick={this.routeToDetail}>Cancel</Button>
                    </div>
        </div>

        return(
            <UI onClick={this.logout} change={this.changePassword}>
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