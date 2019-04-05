import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form,Modal,ModalBody,ModalHeader, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { PlaceHolder } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { detailSociety } from '../../actionCreators/societyMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { getRelation } from './../../actionCreators/relationMasterAction';
import {getFlatDetails} from '../../actionCreators/flatDetailMasterAction';
import {addFlatOwner,getAllFloor} from '../../actionCreators/flatOwnerAction';
import {Link} from 'react-router-dom';
import {getCountry,getState,getCity, getLocation} from '../../actionCreators/societyMasterAction';

class FlatOwnerDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            tab: "none",
            step: 1,
            societyId: '',
            countryName: '',
            countryId:'',
            stateName: '',
            stateId:'',
            cityName: '',
            cityId:'',
            locationName: '',
            locationId:'',
            number: '',
            firstName: '',
            lastName:'',
            DOB: '',
            email: '',
            tower: '',
            errors: {},
            societyName: '',
            flatNO:'',
            flatDetailId:'',
            profilePicture:'',
            currentAddress:'',
            permanentAddress:'',
            familyMember:'',
            member:[],
            ownerGender:'',
            message:'',
            emailError:false,
            modal: false,
            loading: true,
            Aadhaar:'',
            floorId:'',
            society:'',
            towerName:'',
            floorName:'',
            defaultPermanent: false,
            permanentAddrDefault:true,
            permanentAddressUser:'',
            pinCode:'',
            flat:'flatNo.',
            permanentPinCode:''
        }
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
        this.props.getFlatDetails();
        this.props.getCountry()
        this.props.getState()
        this.props.getCity()
        this.props.getLocation()
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
            return tower.tower.map((item) => {
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
        let countryName = selectOption.country_master?selectOption.country_master.countryName:'';
        let countryId= selectOption.country_master?selectOption.country_master.countryId:'';
        let stateName = selectOption.state_master?selectOption.state_master.stateName:'';
        let stateId = selectOption.state_master.stateId;
        let cityName = selectOption.city_master.cityName?selectOption.city_master.cityName:'';
        let cityId = selectOption.city_master.cityId;
        let locationName = selectOption.location_master.locationName;
        let locationId = selectOption.location_master.locationId;
        this.setState(function (prevState, props) {
            return {
                'societyName': selectOption.value,
                countryName,
                stateName,
                cityName,
                locationName,
                locationId,
                cityId,
                stateId,
                countryId,
                society:selectOption.label,
                currentAddress:selectOption.label+','+locationName+','+cityName+','+stateName+' '+','+countryName
            }
        }, function () {
        });
    }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value,
                towerName:selectOption.label
            }
        }, function () {
            console.log(selectOption.towerId)
        });
        this.props.getAllFloor(selectOption.towerId);
    }
    flatChangeHandler=(name,selectOption)=>{
        let flatName=selectOption.label
        this.setState({
            [name]: selectOption.value,
            currentAddress:this.state.flat+flatName+','+this.state.floorName+','+this.state.towerName+','+this.state.currentAddress+' '+this.state.pinCode
        })
        // this.props.getAllFloor(selectOption.towerId);
    }
    floorChangeHandler=(name,selectOption)=>{
        console.log('=======selectOption=======',selectOption.value);
        this.setState({
            [name]: selectOption.value,
            floorName:selectOption.label
        })
console.log('lllllllll=======',this.state.floorId)
    // this.getFlats(this.props.towerFloor);

    }
    relationHandler = (name,selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.value)
        })
    }
    maxDateMember = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    maxDate = () => {
        var d = new Date();
        d.setFullYear(d.getFullYear()-18, d.getMonth());
        return d.toISOString().split('T')[0];
    }
    nextPrev = () => {
        let errors = {};
        const { societyName, number, ownerName, DOB, email, towerId, flatDetailId,Aadhaar  } = this.state
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
            else if (flatDetailId === '') {
                errors.flatNO = "flat number can't be empty"
            }
            else if (towerId === '') {
                errors.tower = "tower can't be empty"
            }
            else if (societyName === '') {
                errors.societyName = "society name can't be empty"
            }
            else if(Aadhaar.length<12){
                errors.Aadhaar='Please enter 12 digit number'
            }
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }
        // const { bankName, holderName, accountNumber, panNumber, ifscCode } = this.state

        // if (this.state.step === 2) {
        //     if (bankName === '') {
        //         errors.bankName = "Bank Name can't be empty"
        //     }
        //     else if (holderName === '') {
        //         errors.holderName = "Holder Name can't be empty"
        //     }
        //     else if (accountNumber === '') {
        //         errors.accountNumber = "Account Number enter 10 digit number"
        //     }
        //     else if (ifscCode === '') {
        //         errors.ifscCode = "IFSC Code can't be empty"
        //     }
        //     else if (panNumber === '') {
        //         errors.panNumber = "Pan number can't be empty"
        //     }
        //     // const isValid = Object.keys(errors).length === 0
        //     // this.setState({ errors });
        //     // if (isValid) {
        //     //     console.log('isValid')
        //     //     this.setState({ step: this.state.step + 1 })
        //     // }
        // }
        const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                console.log('isValid')
                this.setState({ step: this.state.step + 1 })
            }

    }
    onChangeHandler = (event) => {
        console.log(this.state)
        this.setState({message:''})
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
OnKeyPresshandlerEmail=(event)=> {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    let inputChar = event.target.value;
    if (!pattern.test(inputChar)) {
        this.setState({
            emailError:true
        })
    }
    else{
        this.setState({
            emailError:false
        })
    }
}
    onSubmit=(e)=>{
        e.preventDefault();
        const {          
            number,
            firstName,
            lastName,
            DOB,
            email,
            towerId,
            // bankName,
            // holderName,
            // accountNumber,
            // panNumber,
            // ifscCode,
            flatDetailId,
            familyMember,
            profilePicture,
            societyName,
            permanentAddress,
            countryName,
            stateName,
            cityName,
            countryId,
            stateId,
            cityId,
            locationId,
            locationName,
            member,
            fileName,
            ownerGender,Aadhaar,floorId} = this.state
            const d = new FormData()
            console.log(this.state.profilePicture)
            d.append('profilePicture',this.state.profilePicture)        
            for(let i = 0; i < this.state.familyMember; i++){
                const data={
                    memberName: this.state['memberName'+i],
                    memberDob: this.state['memberDOB'+i],
                    relationId: this.state['relationName'+i],
                    gender:this.state['gender'+i]
                }
                this.state.member.push(data)
            }

            console.log(this.state)
            const FlatOwnerData={
                number,
                firstName,
                lastName,
                DOB,
                email,
                towerId,
                flatDetailId,
                familyMember,
                profilePicture,
                societyName,
                permanentAddress,
                member,
                countryName,
                stateName,
                cityName,
                countryId,
                stateId,
                cityId,
                locationId,
                locationName,
                ownerGender,
                fileName,
                Aadhaar,floorId
            }
           
            this.setState({loading: true})
            this.props.addFlatOwner(this.state)
            .then(() => this.props.history.push('/superDashBoard/flatOwnerList'))
            .catch(err=>{
                console.log(err.response.data.message)
                this.setState({message:err.response.data.message})
                this.toggle()
                
            })
        

        }
        toggle = () => {
                    this.setState({
                        modal: !this.state.modal
                    })
                }
                onModalClosed=()=>{
                   this.setState({
                       step:1
                   })
                }
    FileChange=(event)=>{

        const files = event.target.files;
        const file = files[0];
        const fileName=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                profilePicture :
                  reader.result,
                  fileName
              })
           
          };
        }  
  }
  changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
 }

 getFloor=({floor})=>{
    console.log("floor",floor)
    if(floor){
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
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
      onCurrentAddressChangeHandler=(event)=>{
          const {countryName,stateName,cityName,locationName,society,pinCode}=this.state
          console.log('9999999999',pinCode)
        this.setState({
            currentAddress:event.target.value+', '+society+', '+' '+locationName+', '+cityName+','+stateName+','+countryName+' '+pinCode
        },function(){
            console.log(this.state.currentAddress)
        })

      }
      sameAddress = (e) => {
        if(!!document.getElementById('isChecked').checked){
            console.log('is checked')
           this.setState({permanentAddress: this.state.currentAddress.trim(), defaultPermanent:true,
        permanentAddrDefault:false})
           
        }
       else{
            this.setState({permanentAddress: '', defaultPermanent:false, permanentAddrDefault:true})
        }
    }
    countryName = ({countryResult}) => {
        console.log(countryResult)
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
     permanentAddressChange = (e) => {
        this.setState({[e.target.name]: e.target.value, 
            permanentAddress: this.state.permanentAddressUser + ',' + this.state.locationName + ',' +
        this.state.cityName + ' , ' + this.state.stateName + ',' + this.state.countryName+' '+this.state.permanentPinCode })
            console.log(this.state)
    }
      
    render() {
            
        let userDatas = [];
        for (let i = 0; i < this.state.familyMember; i++) {
           
            userDatas.push(<FormGroup key={i} >
                <Row form>
                    <Col md={3}>
                        <Label>Name</Label>
                        <Input placeholder="Name Of Member" name={`memberName${i}`} onChange={this.onChangeHandler}/>
                    </Col>
                    <Col md={3}>
                        <Label>Relation With Owner</Label>
                        <Select options={this.getRelationList(this.props.relationList)}
                            onChange={this.relationHandler.bind(this,'relationName'+i )}
                            placeholder={PlaceHolder}
                            name={`relationName${i}`}/>
                    </Col>
                    <Col md={3}>
                                <Label>Date Of Birth</Label>
                                <Input  type='date' max={this.maxDateMember()} name={`memberDOB${i}`} onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.DOB}</span>
                                </Col>
                    <Col md={3}>
                                <Label>Gender</Label>
                                <div>
                                <div>
                                <Label style={{paddingRight:' 55px'}}>Male</Label>
                                <span><Input type="radio" name={'gender'+i} onChange={this.onChangeHandler} value="male"/></span>
                                </div>
                                <div>
                                <Label style={{paddingRight:' 35px'}}>Female</Label>
                                <span><Input type="radio" name={'gender'+i} onChange={this.onChangeHandler} value="female"/></span>
                                </div>
                                <div>
                                <Label style={{paddingRight:' 49px'}}>Other</Label>
                                <span><Input type="radio" name={'gender'+i} onChange={this.onChangeHandler} value="other"/></span>
                                </div>
                                </div>
                                </Col>
                </Row>
            </FormGroup>);
          
        }
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.onSubmit} style={{width: '769px'}}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                            <h3>Flat Owner Details</h3>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input  style={{'textTransform': 'capitalize' }} placeholder="First Name" maxLength={50} name='firstName' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.ownerName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input  style={{'textTransform': 'capitalize' }} placeholder="Last Name" maxLength={50} name='lastName' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.ownerName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Date Of Birth</Label>
                                <Input  type='date' max={this.maxDate()} name='DOB' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.DOB}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender:</Label>
                                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                                <span><Input type="radio" id="Gender1" name="ownerGender" onChange={this.onChangeHandler} value="male"/></span>
                                
                                
                                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                                <span><Input type="radio" id="Gender2" name="ownerGender" onChange={this.onChangeHandler} value="female"/></span>
                               
                               
                                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                                <span><Input type="radio" id="Gender3" name="ownerGender" onChange={this.onChangeHandler} value="other"/></span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input placeholder="Contact Number" onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={10} value={this.state.number} onChange={this.onChangeHandler} name="number" />
                                <span className="error">{this.state.errors.number}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email </Label>
                                <Input placeholder="Email" type='email' name='email' 
                                onChange={this.onChangeHandler} 
                                onBlur={this.OnKeyPresshandlerEmail}
                                onKeyPress={this.OnKeyPresshandlerEmail} />
                                <span className="error">{this.state.errors.email}</span>
                                <span style={{display:this.state.emailError?'block':'none',color:'red'}}>email is not valid</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Aadhaar Number</Label>
                                <Input placeholder='Aadhaar Number' onChange={this.onChangeHandler} name='Aadhaar' onKeyPress={this.OnKeyPresshandlerPhone} type="text"  maxLength={12}/>
                                <span className="error">{this.state.errors.Aadhaar}</span>
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
                                <Label>Pin Code</Label>
                                <Input type="text" placeholder="Enter Pin Code " name="pinCode" onChange={this.onChangeHandler} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={6}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tower</Label>
                                <Select options={this.getTower(this.props.towerList)}
                                    onChange={this.towerChangeHandler.bind(this, 'towerId')}
                                    placeholder={PlaceHolder} />
                                <span className="error">{this.state.errors.tower}</span>
                            </FormGroup >
                            <FormGroup>
                                <Label>Floor</Label>
                                <Select options={this.getFloor(this.props.towerFloor)} 
                                placeholder={PlaceHolder}
                                onChange={this.floorChangeHandler.bind(this,'floorId')}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Flat Number</Label>
                                <Select options={this.getFlats(this.props.towerFloor)}
                                    placeholder={PlaceHolder} 
                                  onChange={this.flatChangeHandler.bind(this,'flatDetailId')}
                                    />
                            </FormGroup >
                            <FormGroup>
                                <Label>Current Address</Label>
                                <Input readOnly type="text" style={{ 'textTransform': 'capitalize' }} maxLength={100} placeholder="Current Address" name="currentAddress" value={this.state.currentAddress}/>
                            </FormGroup >
                            <FormGroup>
                            Is Your permanent address same as current address?<Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
                        </FormGroup>
                        <h3 style={{textAlign:'center'}}>Permanent Address</h3>
                        {this.state.defaultPermanent ? <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input id="permanentaddr" disabled type="textarea" onChange={this.onChange}
                            maxLength="250" value={this.state.permanentAddress}
                             name="permanentAddress" placeholder="Permanent Address" />
                             {<span className="error">
                                {this.state.errors.permanentAddress}
                            </span>}
                        </FormGroup> : ''}
                        {this.state.permanentAddrDefault ? <div>
                            <FormGroup>
                            <Label>Country</Label>
                            <Select  options={this.countryName(this.props.societyName)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <Select options={this.stateName(this.props.societyName)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>City</Label>
                            <Select  options={this.cityName(this.props.societyName)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Location</Label>
                            <Select options={this.locationName(this.props.societyName)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
                        </FormGroup>
                        <FormGroup>
                                <Label>Pin Code</Label>
                                <Input type="text" placeholder="Enter Pin Code " name="permanentPinCode" onChange={this.onChangeHandler} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={6}/>
                            </FormGroup>
                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="textarea" onChange={this.permanentAddressChange} value={this.state.permanentAddressUser}
                            maxLength={50}
                             name="permanentAddressUser" placeholder="Permanent Address"/>
                             {<span className="error">
                                {this.state.errors.permanentAddress}
                            </span>}
                        </FormGroup>
                        </div> : ''}
                        </div>
                        <div style={{ 'display': this.state.step === 2 ? 'block' : 'none' }}>
                            <h3>Owner Member Details</h3>
                            <FormGroup>
                                <Label>Number of Member</Label>
                                <Input placeholder="number of member" type='text' onKeyPress={this.OnKeyPresshandlerPhone} name="familyMember" onChange={this.userMemberHandler} />
                            </FormGroup>
                    
                            {userDatas}
                 
                            <FormGroup>
                            <Label>Upload Profile Pic</Label>                               
                                <Input accept='image/*' style={{display:'inline-block'}}type="file" name ="profilePic" onChange={this.FileChange} />
                            </FormGroup>
                        </div>
                        <div>
                        <Link to='/superDashBoard/flatOwnerList'>
                <Button color="danger" className="mr-2" style={{ display: this.state.step == 1 ? 'inline-block' : 'none', marginLeft: '20px'}} >Cancel</Button>
                              </Link>
                            <Button className="mr-2" color="danger" type="button" id="prevBtn" style={{ display: this.state.step == 1 ? 'none' : 'inline-block' }} disabled={this.state.step == 1} onClick={() => { this.setState({ step: this.state.step - 1 }) }}>Previous</Button>
                            <Button type="button" color="primary" id="nextBtn" style={{ display: this.state.step == 2 ? 'none' : 'inline-block' }} disabled={this.state.step == 3} onClick={this.nextPrev}>Next</Button>
                            <Button type="submit" color="success" style={{ display: this.state.step == 2 ? 'inline-block' : 'none' }}>Submit</Button>

                        </div>
                    </Form>
                    <Modal isOpen={this.state.modal} toggle={this.toggles} onClosed={this.onModalClosed}>
                    <ModalHeader toggle={this.toggle}>Edit Flat Owner</ModalHeader>
                    <ModalBody>
                        <h1 style={{display:"block",background: 'black'}}>{this.state.message}</h1> 
                    </ModalBody>
                    </Modal>
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
        // flatList:state.flatDetailMasterReducer,
        towerFloor:state.FlatOwnerReducer,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({detailSociety, viewTower, getRelation,getFlatDetails,addFlatOwner,getAllFloor,getCountry,getState,getCity, getLocation}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FlatOwnerDetails);

