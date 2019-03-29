import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { detailSociety } from '../../actionCreators/societyMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import {getCountry,getState,getCity, getLocation} from '../../actionCreators/societyMasterAction';
import { getRelation } from './../../actionCreators/relationMasterAction';
import {getAllFloor} from '../../actionCreators/flatOwnerAction';
import Spinner from '../../components/spinner/spinner';
import { getOwnerDetailViaFlatId, getFlatDetailViaTowerId, addTenantDetail } from '../../actionCreators/tenantMasterAction';

class AddTenant extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            tab: "none",
            lastName:'',
            step: 1,
            firstName:'',
            tenantId:'',
            dob:'',
            gender:'',
            email:'',
            contact:'',
            profilePicture:'',
            permanentAddress:'',
            correspondenceAddress:'',
            bankName:'',
            accountHolderName:'',
            accountNumber:'',
            aadhaarNumber:'',
            panCardNumber:'',
            IFSCCode:'',
            noOfMembers:'',
            flatNo: '',
            floorId:'',
            floorName:'',
            flatDetailId: '',
            societyName : '',
            societyId: '',
            member:[],
            towerId:'',
            towerName:'',
            fileName: '',
            flatNo: '',
            imageSizeError:'',
            errors:{},
            loading: false,
            messageContactErr:'',
            defaultPermanent: false,
            messageEmailErr:'',
            countryId:'',
            countryName:'',
            cityName:'',
            cityId:'',
            stateName:'',
            stateId:'',
            locationName:'',
            locationId:'',
            permanentAddrDefault:true,
            permanentAddressUser:'',
            societyCountry:'',
            societyState:'',
            societyCity:'',
            societyLocation:"",
            defaultPermanentAddress:''
        }
    }

    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
        this.props.getCountry()
        this.props.getState()
        this.props.getCity()
        this.props.getLocation()
        let societyId = localStorage.getItem('societyId')
        console.log(societyId);
        this.setState({societyId})
        console.log(this.state.societyId)
        this.setState({societyId: localStorage.getItem('societyId')})
        this.setState({societyName: localStorage.getItem('societyName')})
        this.setState({societyCountry: localStorage.getItem('countryName')})
        this.setState({societyState: localStorage.getItem('stateName')})
        this.setState({societyCity: localStorage.getItem('cityName')})
        this.setState({societyLocation: localStorage.getItem('locationName')})
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

    correspondenceAddressChange = (e) => {
        console.log(this.state);
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors, defaultPermanentAddress: e.target.value,
             });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim(),messageContactErr:'', defaultPermanentAddress: e.target.value,
            });
        }

        if(!!document.getElementById('isChecked').checked){
            this.setState({permanentAddress: e.target.value})
        }
    }



    panChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase(), errors });
        }
        else {
            this.setState({panCardNumber:e.target.value.toUpperCase()});
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
        d.setFullYear(d.getFullYear()-18, d.getMonth());
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
        let { firstName,lastName, dob, gender, email, contact, profilePicture, aadhaarNumber, permanentAddress, correspondenceAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, member, fileName, societyId, towerName, towerId, floorId, countryId, stateId, cityId, locationId } = this.state;
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
        
        
        console.log(firstName,lastName, dob, gender,aadhaarNumber, email, contact, profilePicture, correspondenceAddress, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, societyId, member, towerName, fileName, towerId, floorId, countryId, stateId, cityId, locationId );

        const data1 = {firstName,lastName, dob, gender,aadhaarNumber, email, contact, profilePicture, correspondenceAddress, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, societyName, societyId, member, towerName, fileName, towerId, floorId, countryId, stateId, cityId, locationId }

        if(this.state.imageSizeError === '' && this.state.messageContactErr==='' && this.state.messageEmailErr===''){
            this.props.addTenantDetail(data1)
                .then(() => this.props.history.push('/superDashboard/tenantDetails'))
                .catch(err => {
                    err.response
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
        const {firstName, lastName, dob, gender, contact, email, correspondenceAddress, aadhaarNumber, permanentAddress} = this.state;
        if(this.state.step === 1){
            if(firstName === '') errors.firstName = `First Name can't be empty.`;
            if(lastName === '') errors.lastName = `Last Name can't be empty.`;
            if(dob === '') errors.dob = `Date of Birth can't be empty.`;
            if(gender === '') errors.gender = `Gender can't be empty`;
            if(contact === '') errors.contact= `Contact can't be empty.`;
            else if(contact.length !== 10) errors.contact= `Contact should be og 10 digit.`;
            if(email === '') errors.email = `Email can't be empty.`;
            if(aadhaarNumber === '') errors.aadhaarNumber=`Aadhaar Number can't be empty.`
            else if(aadhaarNumber.length !== 12) errors.aadhaarNumber=`Aadhaar Number should be of 12 digit.`
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
            else if(panCardNumber.length !== 10) errors.panCardNumber = `Pan Card number should be of 10 digit.`;
            if(IFSCCode === '') errors.IFSCCode = `IFSC code can't be empty.`;
            else if(IFSCCode.length !== 11) errors.IFSCCode = `IFSC code should be of 11 digit.`;
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
            if(correspondenceAddress === '') errors.correspondenceAddress = `Corresponding Address can't be empty.`;
            if(permanentAddress === '') errors.permanentAddress = `Permanent Address can't be empty.`;
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

    getFloor=({floor})=>{
        console.log("floor",floor)
        if(floor && floor.tower.Floors){
            return floor.tower.Floors.map((item)=>{
                      
                return {...item ,label: item.floorName, value: item.floorId }
            })
          //   this.setState({
          //     floorId:item.floorId
          //   })
        }
        else {
            return []
        }}

        getFlats=({floor})=>{
            console.log('7777777jjjjjj',floor)
            if(floor){
              return  floor.flatDetail.filter((flatRecord)=>{
                    return flatRecord.floorId===this.state.floorId
                }).map((selectFlat)=>{
                    console.log('bbbbbbbbbbbbbbbbb',selectFlat)
                    return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                });
            }
            else {
                return []
              }
        }

        

        towerChangeHandler = (towerId, towerName, selectOption) => {
            console.log(towerId, towerName, selectOption)
            this.setState(function (prevState, props) {
                return {
                    towerId: selectOption.towerId,
                    towerName: selectOption.towerName,
                    correspondenceAddress: 'Tower : ' + selectOption.towerName
                }
            }, function () {
                console.log(selectOption.towerId)
            });
            this.props.getAllFloor(selectOption.towerId);
        }
    
        floorChangeHandler=(floorName, floorId,selectOption)=>{
            console.log(floorName, floorId,selectOption);
            this.setState({
                floorName: selectOption.floorName,
                floorId: selectOption.floorId,
                correspondenceAddress: 'Floor : ' + selectOption.floorName + ' , ' + this.state.correspondenceAddress
                
            })
            console.log('lllllllll=======',this.state.floorId)
            // this.getFlats(this.props.towerFloor);
        
            }
            flatChangeHandler=(flatNo, flatDetailId ,selectOption)=>{
                console.log(flatNo, flatDetailId ,selectOption)
                console.log(this.state.flatDetailId)
                this.setState({
                    flatNo: selectOption.flatNo,
                    flatDetailId: selectOption.flatDetailId,
                    correspondenceAddress: ('Flat Number : ' + selectOption.flatNo  + ' , ' + this.state.correspondenceAddress) + 
                    ' , ' +this.state.societyName + ' , ' +this.state.societyLocation + ' , ' + this.state.societyCity +
                    ' , ' + this.state.societyState + ' , ' + this.state.societyCountry
                })
                this.props.getAllFloor(selectOption.towerId);
            }

            countryName = ({countryResult}) => {
                if(countryResult){
                  
                   return( 
                    countryResult.map((item) =>{
                           return(
                            { ...item, label: item.countryName, value: item.countryId }
                           )
                       })
                   )
                    
                }
            }

            onChangeCountry = (countryId, countryName, selectOption) => {
                console.log(countryId, countryName, selectOption)
            
                this.setState({
                    countryName: selectOption.countryName,
                    countryId:selectOption.countryId, 
                })
                
                this.props.getState(selectOption.countryId)
            }
           
            stateName = ({stateResult}) => {
                if(stateResult){
                  console.log(stateResult)
                   return( 
                    stateResult.map((item) =>{ 
                           return(
                            { ...item, label: item.stateName, value: item.stateId }
                           )
                       })
                   )
                    
                }
            }

            onChangeState = (stateName, stateId, selectOption) => {
                console.log(stateName, stateId, selectOption)
                this.setState({
                    stateName: selectOption.stateName,
                    stateId:selectOption.stateId
                })
                this.props.getCity(selectOption.stateId);
            }
           
            cityName=({cityResult})=>{
               
                if(cityResult){
                    
                   return( 
                    cityResult.map((item) =>{ 
                           return(
                            { ...item, label: item.cityName, value: item.cityId }
                           )
                       }
                       )
                   )
                    
                }
            }

            onChangeCity = (cityName, cityId, selectOption) => {
                console.log(cityName, cityId, selectOption)
                this.setState({
                    cityName: selectOption.cityName,
                    cityId:selectOption.cityId
                })
                this.props.getLocation(selectOption.cityId)
            }
            
           
            locationName=({locationResult})=>{
               if(locationResult){
                    
                   return( 
                       locationResult.map((item) =>{ 
                           return(
                            { ...item, label: item.locationName, value: item.locationId }
                           )
                       }
                       )
                   )
                    
                }
            }

            onChangeLocation = (locationName, locationId, selectOption) => {
                console.log(locationName, locationId, selectOption)
                this.setState({
                    locationName: selectOption.locationName,
                    locationId:selectOption.locationId,
                    
                })
            }

    
            sameAddress = (e) => {
                if(!!document.getElementById('isChecked').checked){
                    console.log('is checked')
                   this.setState({permanentAddress: this.state.correspondenceAddress.trim(), defaultPermanent:true,
                permanentAddrDefault:false})
                   
                }
               else{
                    this.setState({permanentAddress: '', defaultPermanent:false, permanentAddrDefault:true})
                }
            }

            permanentAddressChange = (e) => {
                this.setState({[e.target.name]: e.target.value, 
                    permanentAddress: this.state.permanentAddressUser + ' , ' + this.state.locationName + ' , ' +
                this.state.cityName + ' , ' + this.state.stateName + ' , ' + this.state.countryName })
                    console.log(this.state)
            }
            
    defaultPermanentAddressChange = (e) =>{
        this.setState({defaultPermanentAddress: this.state.correspondenceAddress ,permanentAddress: e.target.value})
    }

    fNameKeyPress(event){
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    render(){
        console.log(this.state.societyCountry)
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
                        <Label>Relation With Tenant</Label>
                        <Select name={`relationId${i}`} options={this.getRelationList(this.props.relationList)} 
                          onChange={this.relationHandler.bind(this,'relationId'+i )}/>
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
                            <Label>First Name</Label>
                            <Input type="text" placeholder="First Name"  onKeyPress={this.fNameKeyPress}
                            onChange={this.onChange} 
                            maxLength={100} name='firstName' />
                            {<span className="error">{this.state.errors.firstName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" placeholder="Last Name"  onKeyPress={this.fNameKeyPress} 
                            onChange={this.onChange} 
                            maxLength={100} name='lastName' />
                            {<span className="error">{this.state.errors.lastName}</span>}
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
                             name="contact" placeholder="Contact Number" type="text" maxLength="10" />
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
                            <Input placeholder="Pan Number" onChange={this.panChange}
                            value={this.state.panCardNumber.toUpperCase()}
                             type='text' name="panCardNumber"
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
                            <Select onChange={this.towerChangeHandler.bind(this, 'towerId', 'towerName')} placeholder="Tower" name="towerId"
                            options={this.getTower(this.props.towerList)} />
                            {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
                        </FormGroup >
                        <FormGroup>
                            <Label>Floor</Label>
                            <Select options={this.getFloor(this.props.towerFloor)}
                            name="floorId"
                            onChange={this.floorChangeHandler.bind(this,'floorName','floorId')}
                            />
                            {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Flat Number</Label>
                            <Select options={this.getFlats(this.props.towerFloor)} name="flatDetailId"
                                onChange={this.flatChangeHandler.bind(this, 'flatNo' , 'flatDetailId')}
                                />
                            {!this.state.flatDetailId ? <span className="error">{this.state.errors.flatDetailId}</span> : ''}
                        </FormGroup >
                        <FormGroup>
                            <Label>Corresponding Address</Label>
                            <Input type="textarea" value={this.state.correspondenceAddress} onChange={this.correspondenceAddressChange} maxLength="250"
                             name="correspondenceAddress" placeholder="Corresponding Address" />
                             {<span className="error">
                                {this.state.errors.correspondenceAddress}
                            </span>}
                        </FormGroup >
                        
                        <FormGroup>
                           <span style={{fontWeight:'bold'}}>Is Your permanent address same as correspondence address?</span><Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
                        </FormGroup>
                        <h3 style={{textAlign:'center'}}>Permanent Address</h3>
                        {this.state.defaultPermanent ? <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input id="permanentaddr" readOnly type="textarea" onChange={this.defaultPermanentAddressChange}
                            maxLength="250" value={this.state.defaultPermanentAddress}
                             name="defaultPermanentAddress" placeholder="Permanent Address" />
                        </FormGroup> : ''}
                        {this.state.permanentAddrDefault ? <div>
                            <FormGroup>
                            <Label>Country</Label>
                            <Select options={this.countryName(this.props.societyReducer)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <Select options={this.stateName(this.props.societyReducer)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>City</Label>
                            <Select options={this.cityName(this.props.societyReducer)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Location</Label>
                            <Select options={this.locationName(this.props.societyReducer)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="textarea" onChange={this.permanentAddressChange}
                            maxLength="250" disabled={!(this.state.countryId && this.state.stateId
                                && this.state.cityId)}
                             name="permanentAddressUser" placeholder="Permanent Address" />
                             {<span className="error">
                                {this.state.errors.permanentAddress}
                            </span>}
                        </FormGroup>
                        </div> : ''}
                        {/* <FormGroup>
                            <Label>Floor</Label>
                            <Input defaultValue="no-value"
                            type='select' name="floorId" onChange = {this.floorChange}  >
                            <DefaultSelect />
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
                        </FormGroup> */}
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
        towerFloor:state.FlatOwnerReducer,
        relationList: state.RelationMasterReducer,
        flatList:state.flatDetailMasterReducer,
        tenantReducer:state.tenantReducer,
        
    }
}

export default connect(mapStateToProps, {detailSociety, viewTower, getRelation,getAllFloor,
    getOwnerDetailViaFlatId, getFlatDetailViaTowerId, addTenantDetail, getCountry,getState,getCity, getLocation})(AddTenant);