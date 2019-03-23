import React, { Component } from 'react';
import UI from '../../../components/newUI/superAdminDashboard';
import { FormGroup, Input, Table, Label, Button, Modal, Row, Col, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../../constants/defaultSelect';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import { getTenantDetail, deleteTenant,getFlatDetailViaTowerId, deleteSelectedTenant,getOwnerDetailViaFlatId,
updateTenantDetail } from '../../../actionCreators/tenantMasterAction';
import {PicURN} from '../../../actions/index';
import { viewTower } from '../../../actionCreators/towerMasterAction';
import { connect } from 'react-redux';
import Spinner from '../../../components/spinner/spinner';
import "./tenantDetail.css"

class TenantDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            search:'',
            filterName:'tenantName',
            ids:[],
            isActive: false,
            isDisabled: true,
            modalLoading:false,
            editTenant:false,
            tenantName:'',
            tenantId:'',
            email:'',
            contact:'',
            aadhaarNumber:'',
            dob:'',
            permanentAddress:'',
            fileName:'',
            towerName:'',
            flatNo:'',
            towerId:'',
            picture:'',
            flatDetailId:'',
            loading:true,
            messageEmailErr:'',
            errors:{},
            emailValidError:'',
            messageContactErr:'',
            gender:'',
            Male:'Male',
            Female:'Female',
            Other:'Other',
            floorId:'',
            floorName:''
        }
    }

    componentDidMount(){
        this.refreshData();
        this.props.viewTower();
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    route = () => {
        this.props.history.push('/superDashBoard/addTenant');
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
    }
    unSelectAll = () => {
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }
      
        this.setState({ ids: [...allIds] });
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
    }

    delete(id){
        console.log(id)
        this.setState({isDisabled:true, loading:true})
        this.props.deleteTenant(id).then(() => {
            this.refreshData()
        })
    }

    edit = (picture,tenantName,gender, email, contact, aadhaarNumber, dob, permanentAddress, towerName, floorName,flatNo,towerId,floorId,flatDetailId, tenantId) =>{
        console.log(floorName, floorId)
        this.setState({picture,tenantName,gender, email, contact, aadhaarNumber, dob, permanentAddress,
            towerName,floorName,flatNo,towerId,floorId,flatDetailId,tenantId, editTenant: true})
    }

    searchFilter(search){
        return function(x){
            console.log(x.flat_detail_master.flatNo)
            if(x){
                return x.tenantName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.gender.toLowerCase()[0] === search.toLowerCase()[0] ||
                x.email.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.contact.toString().indexOf(search.toString())  !== -1 ||
                x.aadhaarNumber.toString().indexOf(search.toString())  !== -1 ||
                x.dob.toString().indexOf(search.toString())  !== -1 ||
                x.permanentAddress.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                !search;
            }
        }
    }

    viewMembers(id){
        localStorage.setItem('tenantId', id)
        this.props.history.push('/superDashBoard/tenantMemberDetail');
    }

    renderList = ({getTenantDetail}) => {
        console.log(getTenantDetail)
        if(getTenantDetail && getTenantDetail.tenants){
            return getTenantDetail.tenants.sort((item1,item2)=>{
                if(item1 && item2){
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }
            }).filter(this.searchFilter(this.state.search && this.state.search)).map((item, index) => {
                if(item){
                    return (
                        <tr key={item.tenantId}>
                            <td><input type="checkbox" name="ids" value={item.tenantId} className="SelectAll"
                             onChange={(e, i) => {
                                const {tenantId} = item
                                if(!e.target.checked){
                                    if(this.state.ids.length>-1){
                                        document.getElementById('allSelect').checked=false;
                                    let indexOfId = this.state.ids.indexOf(tenantId);
                                    if(indexOfId > -1){
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if(this.state.ids.length === 0){
                                        this.setState({isDisabled: true})
                                    }
                                }
                            }
                                else {
                                    this.setState({ids: [...this.state.ids, tenantId]})
                                    if(this.state.ids.length >= 0){
                                        this.setState({isDisabled: false})
                                    }
                            } 
                                 }}/></td>
                            <td>{index + 1}</td>
                            <td style={{width:'4%'}}><img style={{ width: "100%", height: "20%" }} src={PicURN+item.picture} alt="Profile Pic" /></td>
                            <td>{item.tenantName}</td>
                            <td>{item.gender}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.aadhaarNumber}</td>
                            <td>{item.dob}</td>
                            <td>{item.permanentAddress}</td>
                            <td>{item.tower_master ? item.tower_master.towerName : ''}</td>
                            <td>{item.floor_master ? item.floor_master.floorName : ''}</td>
                            <td>{item.flat_detail_master ? item.flat_detail_master.flatNo : ''}</td>
                            <td><Button color="success" onClick={this.viewMembers.bind(this, item.tenantId)}>
                                Member Details</Button></td>
                            <td>
                                <Button color="success" onClick={this.edit.bind(this,PicURN+item.picture.replace('../../',''),
                                     item.tenantName, item.gender, item.email,
                                    item.contact, item.aadhaarNumber, item.dob, item.permanentAddress,
                                    item.tower_master ? item.tower_master.towerName:'',
                                    item.floor_master ? item.floor_master.floorName: '',item.flat_detail_master.flatNo,
                                    item.tower_master ? item.tower_master.towerId: '',
                                    item.floor_master ? item.floor_master.floorId: '',
                                    item.flat_detail_master.flatDetailId, item.tenantId)} className="mr-2">Edit</Button>
                                <Button color="danger" onClick={this.delete.bind(this, item.tenantId)}>Delete</Button>
                            </td>
                        </tr>
                    )
                }
                else return false
            })
        }
    }

    deleteSelected(ids){
        console.log(ids)
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedTenant(ids)
        
        .then(() => this.refreshData())
        .catch(err => err);
    }

    toggleTenant(){
        this.setState({editTenant: !this.state.editTenant, emailValidError:'',messageContactErr:''})
    }

    browseBtn = (e) => {
        document.getElementById('real-input').click();
    }

    imgChange = (event) => {
        
        const files = event.target.files
        const file = files[0];
        console.log(this.state)
        let fileName = file ? file.name : '';
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                picture :  reader.result,
                fileName,
                imageSizeError:''
              })
              console.log(this.state.picture)
          };
        }
        console.log(document.querySelector('#real-input'))
        const name = document.querySelector('#real-input').value.split(/\\|\//).pop();
            const truncated = name.length > 20 
              ? name.substr(name.length - 20) 
              : name;
            
              document.querySelector('.file-info').innerHTML = truncated;
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    getTower = ({ tower }) => {
        console.log(tower)
        if (tower) {
            console.log(tower)
            return tower.tower.map((item) => {
                console.log(item)
                return (
                    <option value={item.towerId} key={item.towerId}>{item.towerName}</option>
                )
            }
            );
        }
        return [];
    }

    towerChangeHandler = (e) => {
        console.log(e)
        console.log(this.state)
        this.setState({towerId:e.target.value, flatNo:'', floorId:'', floorName:'', flatDetailId:''})
        this.props.getFlatDetailViaTowerId(this.state.towerId)
    }

    contactChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,messageContactErr:'' });
        }
        else {
            this.setState({ [e.target.name]: e.target.value,messageContactErr:'' });
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

    flatChangeHandler = (e) => {
        this.setState({flatDetailId: e.target.value});
        console.log(this.state);
        this.props.getOwnerDetailViaFlatId(e.target.value)
    }

    refreshData = () => {
        this.props.getTenantDetail().then(() => this.setState({editTenant:false, loading: false}))
        .catch(err => err)
    }

    refreshDataAfterUpdate = () => {
        this.props.getTenantDetail().then(() => this.setState({editTenant:false, modalLoading: false}))
    }

    updateTenant = (e) => {
        e.preventDefault();
        
        let {tenantName,gender, email, contact, aadhaarNumber,dob, permanentAddress, fileName, towerName, flatNo, towerId,
        picture, flatDetailId, tenantId, floorId} = this.state;
        let errors = {};
        if(this.state.tenantName === '') {
            console.log('tenant');
            errors.tenantName = `Tenant Name can't be empty.`;}

        if(this.state.email === '')  {console.log('email');
            errors.email = `Email can't be empty.`};
        if(this.state.contact === '') {console.log('contact');
            errors.contact = `Contact can't be empty.`;}
        else if(this.state.contact.length !== 10) {
        errors.contact = `Contact number should be of 10 digit.`;}    
        if(this.state.aadhaarNumber === '') {console.log('aadhaar');
            errors.aadhaarNumber = `Aadhaar Number can't be empty.`;}
        else if(this.state.aadhaarNumber.length !== 12) {console.log('aadhaarLimit');
            errors.aadhaarNumber = `Aadhaar Number should be of 12 digit.`}
        if(this.state.dob === '') {
            console.log('dob');
            errors.dob = `Date of birth can't be empty.`;
        }
        if(this.state.permanentAddress === '') errors.permanentAddress = `Permanent Address can't be empty.`;
        if(!this.state.towerId) {
            console.log('1');
            errors.towerId = `Please select tower.`;
        }
        if(!this.state.flatDetailId) {
            console.log('2');
            errors.flatDetailId=`Please select flat no.`;
        }
        if(!this.state.floorId) {
            console.log('3');
            errors.floorId=`Please select floor.`
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        console.log(flatDetailId, picture, tenantId)
        if(isValid){
            this.setState({modalLoading: true})
            this.props.updateTenantDetail(tenantName,gender, email, contact, aadhaarNumber, dob,
                permanentAddress, fileName, towerName, flatNo, towerId, floorId,
                picture, flatDetailId, tenantId)
                .then(() => this.refreshDataAfterUpdate())
                .catch((err) => {
                    console.log(err.response.data)
                    this.setState({messageEmailErr: err.response.data.messageEmailErr, messageContactErr: err.response.data.messageContactErr,
                         modalLoading:false})
                })
        }
        
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
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
        // this.setState({email:e.target.value, messageEmailErr:''})
        // if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
        //     this.setState({[e.target.name]:e.target.value});
        //     console.log(this.state.email)
        //     this.setState({emailValidError: ''})
        // }
        // else{ this.setState({emailValidError: 'Invalid Email.'})}

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

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
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

    floorChange = (e) => {
        this.setState({floorId:e.target.value})
        
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
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

    floorChange = (e) => {
        this.setState({floorId:e.target.value})
        
    }

    render(){
        let TableData = <Table>
                           <thead>
                                <tr>
                                    <th></th>
                                    <th>#</th>
                                    <th>Profile Pic</th>
                                    <th style={{cursor: 'pointer'}} onClick={()=>{
                                        this.setState((state)=>{return {sortVal:!state.sortVal,
                                        filterName:'tenantName'}});
                                    }}>Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Contact No.</th>
                                    <th>Aadhaar Number</th>
                                    <th>Date of Birth</th>
                                    <th>Permanent Address</th>
                                    <th>Tower Name</th>
                                    <th>Floor</th>
                                    <th>Flat No.</th>
                                    <th>Member details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList(this.props.tenantReducer)}
                            </tbody>
                        </Table>

                        
                        let lastIndex = this.state.picture.lastIndexOf('/');

        let modalData = <div>
            <FormGroup>
                <Row>
                    <Col md={8}>
                        <Input type="file" accept='image/*' id="real-input" onChange={this.imgChange} />
                        <Button className="browse-btn" onClick={this.browseBtn}>
                            Update pic
                        </Button>
                        <span className="file-info" >upload New Pic</span>
                    </Col>
                    <Col md={4}>
                        <div style={{border: '1px solid black', textAlign:'center'}}>
                            <img src={this.state.picture} height='100px' width='100px' />
                        </div>
                    </Col>
                    
                </Row>
                
                <span className="error">{this.state.imageSizeError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Tenant Name</Label>
                <Input value={this.state.tenantName} name="tenantName" maxLength="70" onChange={this.onChange} />
                {<span className='error'>{this.state.errors.tenantName}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Gender:</Label>
                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                <span><Input name="gender"
                        onChange={this.onChange} type="radio" value={this.state.Male}
                        checked={this.state.Male===this.state.gender ? true : false}/></span>
                
                
                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                <span><Input name="gender" onChange={this.onChange} type="radio"
                        value={this.state.Female} checked={this.state.Female===this.state.gender ? true : false} /></span>
                
                
                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                <span><Input name="gender" onChange={this.onChange} type="radio"
                        value={this.state.Other} checked={this.state.Other===this.state.gender ? true : false}/></span>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input value={this.state.email} name="email" onChange={this.emailChange} onKeyPress={this.emailValid} />
                {this.state.messageEmailErr ? <span className='error'>{this.state.messageEmailErr}</span> : ''}
                {<span className="error">{this.state.emailValidError}</span>}
                <span><br/></span>
                {<span className="error">{this.state.errors.email}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Contact</Label>
                <Input value={this.state.contact} maxLength="10" name="contact" onChange={this.contactChange} />
                {this.state.messageContactErr ? <span className='error'>{this.state.messageContactErr}</span> : ''}
                {<span className='error'>{this.state.errors.contact}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Aadhar Number</Label>
                <Input value={this.state.aadhaarNumber} maxLength="12" name="aadhaarNumber" onChange={this.onChange} />
                {<span className='error'>{this.state.errors.aadhaarNumber}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Date of Birth</Label>
                <Input value={this.state.dob} type="date" name="dob" onChange={this.onChange} />
                {<span className='error'>{this.state.errors.dob}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Permanent Address</Label>
                <Input type="textarea" maxLength="500" value={this.state.permanentAddress} name="permanentAddress" onChange={this.onChange} />
                { <span className='error'>{this.state.errors.permanentAddress}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Tower Name</Label>
                <Input type="select" onChange={this.towerChangeHandler} value={this.state.towerId} placeholder="Tower" name="towerId">
                    <DefaultSelect />
                    {this.getTower(this.props.towerList)}
                </Input>
                {!this.state.towerId ? <span className='error'>{this.state.errors.towerId}</span>: ''}
            </FormGroup>
            <FormGroup>
                <Label>Floor</Label>
                <Input  name="floorId" onChange = {this.floorChange} type="select">
                    {this.state.floorName ? <option>{this.state.floorName}</option> : <option disabled>--Select--</option>}
                    {this.state.floorName ? <DefaultSelect />: null}
                    {this.state.floorName ? null : this.fetchFloorDetail(this.props.tenantReducer)}
                    {/* <option>{this.state.flatNo}</option>
                    <DefaultSelect />
                    {this.fetchFlatDetail(this.props.tenantReducer)} */}
                </Input>
                {!this.state.floorId ? <span className='error'>{this.state.errors.floorId}</span>: ''}
            </FormGroup>
            <FormGroup>
                <Label>Flat No</Label>
                <Input onKeyPress={this.numberValidation} onChange={this.flatChangeHandler}
                    type='select' name="flatDetailId" >
                    {this.state.flatNo ? <option>{this.state.flatNo}</option> : <option disabled>--Select--</option>}
                    {this.state.flatNo ? <DefaultSelect />: null}
                    {this.state.flatNo ? null : this.fetchFlatDetail(this.props.tenantReducer)}
                    {/* <option>{this.state.flatNo}</option>
                    <DefaultSelect />
                    {this.fetchFlatDetail(this.props.tenantReducer)} */}
                </Input>
                {!this.state.flatDetailId ? <span className='error'>{this.state.errors.flatDetailId}</span>: ''}
            </FormGroup>
            <FormGroup>
                <Button className="mr-2" color="primary" onClick={this.updateTenant}>Save</Button>
                <Button color="danger" onClick={this.toggleTenant.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>

        return(
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Tenant Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Tenant</Button>
                    </div>
                    <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                     <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
                        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
                    <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></Label>
                    <Modal isOpen={this.state.editTenant} toggle={this.toggleTenant.bind(this)}>
                        <ModalHeader toggle={this.toggleTenant.bind(this)}>Edit Tenant Details</ModalHeader>
                        <ModalBody>
                            {!this.state.modalLoading ? modalData : <Spinner/>}
                        </ModalBody>
                    </Modal>
                    {!this.state.loading ? TableData: <Spinner />}
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        tenantReducer:state.tenantReducer,
        towerList: state.TowerDetails,
        flatList:state.flatDetailMasterReducer,
    }
}

export default connect(mapStateToProps, {getTenantDetail, getFlatDetailViaTowerId, deleteTenant, 
    deleteSelectedTenant,viewTower, getOwnerDetailViaFlatId, updateTenantDetail})(TenantDetail);




