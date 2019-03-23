import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import { PicURN } from '../../actions/index'
import { PlaceHolder } from '../../actions/index';
import Select from 'react-select';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { detailSociety } from '../../actionCreators/societyMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { getFlatDetails } from '../../actionCreators/flatDetailMasterAction';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label } from 'reactstrap';
import { getOwnerMember, getOwnerList, multipleDelete, removeOwner, updateFlatOwner,getAllFloor } from '../../actionCreators/flatOwnerAction'
class FlatOwnerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "ownerName",
            ownerId: '',
            profilePic: '',
            ownerName: '',
            contact: '',
            dob: '',
            email: '',
            accountHolderName: '',
            panCardNumber: '',
            societyName: '',
            bankName: '',
            IFSCCode: '',
            permanentAddress: '',
            towerName: '',
            flatDetailId: '',
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            ids: [],
            isDisabled: true,
            societyId: '',
            countryName: '',
            countryId: '',
            stateName: '',
            stateId: '',
            cityName: '',
            cityId: '',
            locationName: '',
            locationId: '',
            towerId: '',
            modalError: false,
            messageError: '',
            Aadhaar:'',
            floorId:'',
            accountNumber:''
        }
    }
    toggles = () => {
        this.setState({ modalError: !this.state.modalError })
    }
    componentDidMount() {
        this.props.getOwnerList();
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getFlatDetails()
            .then(() => this.setState({ loading: false }))
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    toggle = (ownerId, ownerName, dob, gender, contact, email,Aadhaar, permanentAddress, bankName, accountHolderName, accountNumber, panCardNumber, IFSCCode,) => {
        this.setState({
            ownerId,
            ownerName,
            dob,
            gender,
            contact,
            email,
            permanentAddress,
            bankName,
            accountHolderName,
            accountNumber,
            panCardNumber,
            IFSCCode,
            Aadhaar,
            modal: !this.state.modal
        })
    }
    delete = (ownerId) => {
        this.setState({ loading: true })
        if (window.confirm('Are You Sure ?')) {
            this.props.removeOwner(ownerId)
                .then(() => {
                    this.props.getOwnerList()
                        .then(() => this.setState({ loading: false }))
                })
        }
        else {
            this.props.getOwnerList()
                .then(() => this.setState({ loading: false }))
        }
    }
    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.ownerName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
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
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }
    }
    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        if (window.confirm('Are You Sure ?')) {
            this.props.multipleDelete(ids)
                .then(() => this.props.getOwnerList().then(() => this.setState({ loading: false })))
                .catch(err => err.response.data.message);
        }
        else {
            this.props.getOwnerList()
                .then(() => this.setState({ loading: false }))
        }
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
    viewMember(id) {
        localStorage.setItem('ownerId', id)
        this.props.history.push('/superDashBoard/flatMemberList')

    }
    societyChangeHandler = (selectOption) => {
        let countryName = selectOption.country_master ? selectOption.country_master.countryName : '';
        let countryId = selectOption.country_master ? selectOption.country_master.countryId : '';
        let stateName = selectOption.state_master ? selectOption.state_master.stateName : '';
        let stateId = selectOption.state_master.stateId;
        let cityName = selectOption.city_master.cityName ? selectOption.city_master.cityName : '';
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
                countryId
            }
        }, function () {
        });
    }
    renderList = ({ owners }) => {
        if (owners) {
            console.log('owner',owners)
            return owners.getOwners.sort((item1,item2)=>{
                let cmpValue=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal?cmpValue: -cmpValue;}).filter(this.searchFilter(this.state.search)).map((items, index) => {
                return (

                    <tr key={items.ownerId}>
                        <td><input type="checkbox" name="ids" value={items.ownerId} className="SelectAll"
                            onChange={(e, i) => {
                                const { ownerId } = items
                                if (!e.target.checked) {
                                    if (this.state.ids.length > -1) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(ownerId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1)
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true })
                                        }
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, ownerId] })
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }
                            }} /></td>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ width: "8%", height: "8%" }}> <img style={{ width: "100%", height: "15%" }} src={PicURN + items.picture} alt="Profile Pic">
                        </img></td>
                        <td style={{ textAlign: "center", width: '10px' }}>{items.ownerName}</td>
                        <td style={{ textAlign: "center" }}>{items.contact}</td>
                        <td style={{ textAlign: "center" }}>{items.permanentAddress}</td>
                        <td style={{ textAlign: "center" }}>{items.tower_master.towerName}</td>
                        <td style={{ textAlign: "center" }}>{items.flat_detail_master.flatNo}</td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewMember.bind(this, items.ownerId)}>View Member</button></td>
                        <td style={{ textAlign: "center" }}>
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, items.ownerId, items.ownerName, items.dob, items.gender, items.contact, items.email,items.adhaarCardNo, items.permanentAddress, items.bankName, items.accountHolderName, items.accountNumber, items.panCardNumber, items.IFSCCode)}>Edit</button>
                            <button className="btn btn-danger" onClick={this.delete.bind(this, items.ownerId)} >Delete</button>
                        </td>
                    </tr>
                )
            })
        }


    }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.towerId)
        });
        this.props.getAllFloor(selectOption.towerId);
    }
    flatChangeHandler = (name, selectOption) => {
        this.setState({
            [name]: selectOption.value
        })
        console.log(this.state.flatNO)
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
    getflat = ({ details }) => {
        if (details) {
            return details.flatDetail.map((item) => {
                return (
                    { ...item, label: item.flatNo, value: item.flatDetailId }
                )
            })
        }
    }
    flatChangeHandler=(name,selectOption)=>{
        this.setState({
            [name]: selectOption.value
        })
        this.props.getAllFloor(selectOption.towerId);
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    errorToggles = () => {
        this.setState({ modalError: !this.state.modalError })
    }
    editFlatOwnerDetails = () => {
        let errors = {};
        const { ownerId, ownerName,
            countryName,
            stateName,
            cityName,
            locationName,
            locationId,
            cityId,
            stateId,
            countryId,
            dob,
            contact,
            email,
            societyName,
            permanentAddress,
            towerId,
            flatDetailId,
            bankName, panCardNumber, IFSCCode, accountHolderName, gender,floorId,Aadhaar,accountNumber } = this.state
        if (ownerName === '') {
            errors.ownerName = "Owern Name can't be empty"
        }
        else if (dob === '') {
            errors.DOB = "Date of birth can't be empty"
        }
        else if (contact.length <= 9) {
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

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({ loading: true })
            this.setState({ modal: !this.state.modal })
          console.log(  this.state.accountNumber)
            this.props.updateFlatOwner(ownerId, ownerName,
                email,
                societyName,
                contact,
                permanentAddress,
                towerId,
                flatDetailId,
                accountHolderName,
                bankName,
                panCardNumber,
                IFSCCode, countryName,
                stateName,
                cityName,
                locationName,
                locationId,
                cityId,
                stateId,
                countryId,
                gender,floorId,Aadhaar,accountNumber)
                .then(() => this.props.getOwnerList().then(() => this.setState({ loading: false })))
                .catch(err => {
                    this.setState({ messageError: err.response.data.message, modal: !this.state.modal })
                    this.setState({ modal: !this.state.modal })
                    this.errorToggles()
                })
        }
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
        floorChangeHandler=(name,selectOption)=>{
            console.log('=======selectOption=======',selectOption.value);
            this.setState({
                [name]: selectOption.value
            })
    console.log('lllllllll=======',this.state.floorId)
        // this.getFlats(this.props.towerFloor);
    
        }
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
    
    close = () => {
        return this.props.history.replace('/superDashBoard')
    }
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ width: "4%" }}></th>
                    <th style={{ textAlign: "center", width: "4%" }}>#</th>
                    <th style={{ textAlign: "center", width: "12%" }}>Profile Pic</th>
                    <th style={{ textAlign: "center", width: "12%" }} onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'ownerName'
                                }
                            });
                        }}>Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th style={{ textAlign: "center" }}>Contact No.</th>
                    <th style={{ textAlign: "center", width: "16%" }}>Permanent Address</th>
                    <th style={{ textAlign: "center" }}>Tower Name</th>
                    <th style={{ textAlign: "center" }}>Flat No.</th>
                    <th style={{ textAlign: "center", width: "8%" }}>View Member</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.Owner)}
            </tbody>
        </Table>
        let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Flat Owner List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/flatOwnerDetail')} id="addOwner" >Add Owner</Button>
                        </div>
                        <div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {deleteSelectedButton}
                            <Label htmlFor="allSelect" style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}>Select All<input
                                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                                    if (e.target.checked) {
                                        this.selectAll();
                                    }
                                    else if (!e.target.checked) {
                                        this.unSelectAll();
                                    }
                                }
                                } /></Label>
                            {!this.state.loading ? tableData : <Spinner />}
                            <Modal isOpen={this.state.modal} toggle={this.toggles}>
                                <ModalHeader toggle={this.toggle}>Edit Flat Owner</ModalHeader>
                                <ModalBody>
                                    <h3>Flat Owner Details</h3>
                                    <FormGroup>
                                        <span className="error">{this.state.message}</span>
                                        <Label>Owner Name</Label>
                                        <Input style={{ 'textTransform': 'capitalize' }} placeholder="Full Name" maxLength={50} name='ownerName' onChange={this.onChangeHandler} value={this.state.ownerName} />
                                        <span className="error">{this.state.errors.ownerName}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Date Of Birth</Label>
                                        <Input type='date' max={this.maxDate()} name='dob' onChange={this.onChangeHandler} />
                                        <span className="error">{this.state.errors.DOB}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Gender:</Label>
                                        <Label htmlFor="Gender1" style={{ paddingRight: '35px', paddingLeft: '20px' }}>Male</Label>
                                        <span><Input type="radio" id="Gender1" name="gender" onChange={this.onChangeHandler} value="male" /></span>
                                        <Label htmlFor="Gender2" style={{ paddingRight: '35px', paddingLeft: '20px' }}>Female</Label>
                                        <span><Input type="radio" id="Gender2" name="gender" onChange={this.onChangeHandler} value="female" /></span>
                                        <Label htmlFor="Gender3" style={{ paddingRight: '35px', paddingLeft: '20px' }}>Other</Label>
                                        <span><Input type="radio" id="Gender3" name="gender" onChange={this.onChangeHandler} value="other" /></span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Contact Number</Label>
                                        <Input placeholder="Contact Number" onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={10} value={this.state.contact} onChange={this.onChangeHandler} name="contact" />
                                        <span className="error">{this.state.errors.number}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email </Label>
                                        <Input placeholder="Email" type='email' name='email'
                                            onChange={this.onChangeHandler}
                                            onBlur={this.OnKeyPresshandlerEmail}
                                            onKeyPress={this.OnKeyPresshandlerEmail} value={this.state.email} />
                                        <span className="error">{this.state.errors.email}</span>
                                        <span style={{ display: this.state.emailError ? 'block' : 'none', color: 'red' }}>email is not valid</span>
                                    </FormGroup>
                                    <FormGroup>
                                <Label>Aadhaar Number</Label>
                                <Input placeholder='Aadhaar Number' onChange={this.onChangeHandler} name='Aadhaar' onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={12}/>
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
                                        <Label>Permanent Address</Label>
                                        <Input type="text" style={{ 'textTransform': 'capitalize' }} maxLength={100} placeholder="Permanent Address" name="permanentAddress" onChange={this.onChangeHandler} value={this.state.permanentAddress} />
                                    </FormGroup >
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
                                    <h3>Bank Details</h3>
                                    <FormGroup>
                                        <Label>Bank Name</Label>
                                        <Input placeholder="Bank Name" type="text" name="bankName" onChange={this.onChangeHandler} value={this.state.bankName} />
                                        <span className="error">{this.state.errors.bankName}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Account Holder Name</Label>
                                        <Input style={{ 'textTransform': 'capitalize' }} placeholder="Holder Name" type="text" name='accountHolderName' value={this.state.accountHolderName} onChange={this.onChangeHandler} />
                                        <span className="error">{this.state.errors.holderName}</span>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label>Account Number</Label>
                                        <Input placeholder="Account Number" type="text" maxLength={18} onKeyPress={this.OnKeyPresshandlerPhone} name='accountNumber' onChange={this.onChangeHandler} value={this.state.accountNumber} />
                                        <span className="error">{this.state.errors.accountNumber}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>PAN Card Number</Label>
                                        <Input placeholder="Pan Number" type='text' maxLength={10} name="panCardNumber" onChange={this.onChangeHandler} value={this.state.panNumber} value={this.state.panCardNumber} />
                                        <span className="error">{this.state.errors.panNumber}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>IFSC Code</Label>
                                        <Input placeholder="IFSC code" type='text' maxLength={11} name="IFSCCode" onChange={this.onChangeHandler} value={this.state.IFSCCode} />
                                        <span className="error">{this.state.errors.ifscCode}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color="primary mr-2" onClick={this.editFlatOwnerDetails}>Save</Button>
                                        <Button color="danger" onClick={this.toggles}>Cancel</Button>
                                    </FormGroup>
                                </ModalBody>
                            </Modal>
                            <Modal isOpen={this.state.modalError} toggle={this.errorToggles}>
                                <ModalHeader toggle={this.toggle}>Edit Flat Owner</ModalHeader>
                                <ModalBody>
                                    <h1 style={{ display: "block", background: 'black' }}>{this.state.messageError}</h1>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </UI>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        societyName: state.societyReducer,
        Owner: state.FlatOwnerReducer,
        towerList: state.TowerDetails,
        // flatList: state.flatDetailMasterReducer,
        towerFloor:state.FlatOwnerReducer,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOwnerList, multipleDelete, removeOwner, detailSociety, getFlatDetails, viewTower, updateFlatOwner, getOwnerMember,getAllFloor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlatOwnerList);