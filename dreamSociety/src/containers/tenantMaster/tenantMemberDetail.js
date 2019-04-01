import React, {Component} from 'react';
import {viewMember, deleteTenantMember, deleteSelectedTenantMember,editTenantMember,
    addNewTenantDetail} from '../../actionCreators/tenantMasterAction';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { getRelation } from './../../actionCreators/relationMasterAction';
import Select from 'react-select';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Spinner from '../../components/spinner/spinner';

class TenantMemberDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            ids:[],
            isDisabled:true,
            addTenantMember:false,
            editTenantMember: false,
            memberName:'',
            memberId:'',
            Male:'Male',
            Female:'Female',
            Other:'Other',
            memberDob:'',
            gender:'',
            relationId:'',
            relationName:'',
            loading:true,
            tenenatId:'',
            loadingAfterAdd:false,
            loadingAfterEdit:false,
            errors:{},
            search:'',
            filterName:'memberName'
        }
        console.log(props)
    }

    componentDidMount(){
        this.refreshData()
        
        this.props.getRelation();
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    close = () => {
        return this.props.history.replace('/superDashBoard/');
    }

    refreshData = () => {
        let id  = localStorage.getItem('tenantId');
        this.setState({tenantId: id})
        this.props.viewMember(id).then(() => this.setState({loading: false,editTenantMember:false,addTenantMember:false}))
        console.log(id)
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    route = (e) => {
        e.preventDefault()
        return this.props.history.push('/superDashBoard/tenantDetails')
    }

    edit = (member, dob, gen, relationName, relationId, memberId) => {
        console.log(member, dob, gen, relationName, relationId, memberId)
        this.setState({memberName:member, memberDob:dob, gender:gen, relationName, relationId,memberId, editTenantMember: !this.state.editTenantMember})
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

    searchFilter(search){
        return function(x){
            console.log(x)
            if(x){
                return x.memberName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.memberDob.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.gender.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.relation_master.relationName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                !search;
            }
        }
    }

    fetchMemberDetails = ({getMemberDetail}) => {
        console.log(getMemberDetail)
        if(getMemberDetail){
            return getMemberDetail.members.sort((item1,item2)=>{
                if(item1 && item2){
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }
            }).filter(this.searchFilter(this.state.search))
            .map((item, i) => {
                 if(item){
                    return (
                        <tr key={item.memberId}>
                            <td><input type="checkbox" name="ids" className="SelectAll"  value={item.memberId}
                         onChange={(e) => {
                            let {memberId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(memberId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, memberId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }  
                             }}/></td>
                            <td>{i + 1}</td>
                            <td>{item.memberName}</td>
                            <td>{item.memberDob}</td>
                            <td>{item.gender}</td>
                            <td>{item.relation_master ? item.relation_master.relationName : ''}</td>
                            <td>
                                <Button className="mr-2" color="success" onClick={this.edit.bind(this,item.memberName,item.memberDob,
                                    item.gender, item.relation_master.relationName, item.relationId, item.memberId)}>Edit</Button>
                                <Button color="danger" onClick={this.deleteMemberSelected.bind(this, item.memberId)}>Delete</Button>
                            </td>
                        </tr>
                    )
                 }
            })
        }
    }

    deleteMemberSelected(id){
        this.setState({loading:true})
        console.log(id)
        this.props.deleteTenantMember(id)
        .then(() => this.refreshData())
        .catch(err => err)
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value));
                    selectMultiple[i].checked = true;
            }
            this.setState({ids: ar});
            if(ar.length > 0){
                this.setState({isDisabled: false});
            }
    }

    unSelectAll = () =>{
        
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for(var i = 0; i < unSelectMultiple.length; i++){
                unSelectMultiple[i].checked = false
        }
        
        this.setState({ids: [ ...allIds]});
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
        
    }

    toggleTenantMemberForm(){
        this.setState({addTenantMember: !this.state.addTenantMember, errors:{}})
    }

    toggleEditTenant(){
        this.setState({editTenantMember: !this.state.editTenantMember, errors:{}})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value.trim()})
    }

    addNewMemberChange = (e) => {
        this.setState({[e.target.name]:e.target.value.trim()})
        console.log(this.state)
    }

    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
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

    getRelationOption = ({relationResult}) => {
        console.log(relationResult)
        if(relationResult){
            return relationResult.relation.map((item) => {
                return (
                    <option value={item.relationId} key={item.relationId}>{item.relationName}</option>
                )
            })
        }
    }

    deleteSelected(ids){
        console.log(ids)
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedTenantMember(ids)
        
        .then(() => {
            this.refreshData()
        })
        .catch(err => err);
    }

    updateTenantMember = (e) => {
        e.preventDefault();
        
        let { memberName, memberDob, gender, relationId, memberId } = this.state;
        console.log(memberName, memberDob, gender, relationId, memberId)
        let errors = {};
        if(memberName === '') errors.memberName = `Member Name can't be empty.`;

        if(memberDob === '') errors.memberDob = `Date of Birth can't be empty.`;
        if(gender === '') errors.gender = `Please select any gender.`;
        if(!relationId) errors.relationId = `Select relation with tenant.`;
        
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            this.setState({loadingAfterEdit:true})
            this.props.editTenantMember(memberName, memberDob, gender, relationId, memberId)
            .then(() => {
                this.loadDetailAfterEdit()
            })
            .catch(err => {
                err;
                this.setState({loadDetailAfterEdit:false})
            })
        }
        
    }

    addNewTenantMember(member, dob, gen, relId, tenId){
        console.log(member, dob, gen, relId, tenId);
        
        let {memberName, memberDob, gender, relationId, tenantId} = this.state;
        
        this.setState({memberName:member, memberDob:dob, gender:gen, relationId:relId, tenantId:tenId})
        let errors = {};
        if(memberName === '') errors.memberName = `Member Name can't be empty.`;

        if(memberDob === '') errors.memberDob = `Date of Birth can't be empty.`;
        if(gender === '') errors.gender = `Please select any gender.`;
        if(!relationId) errors.relationId = `Select relation with tenant.`;
        
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            this.setState({loadingAfterAdd:true})
            this.props.addNewTenantDetail({memberName, memberDob, gender, relationId, tenantId})
            .then(() => {
                this.loadDetailAfterAdd()
            })
            .catch(err => {
                err;
                this.setState({loadDetailAfterAdd:false})
            })
        }
        
    }

    loadDetailAfterAdd = () => {
        this.props.viewMember(this.state.tenantId).then(() => this.setState({loadingAfterAdd:false,addTenantMember:false}))
    }

    loadDetailAfterEdit = () => {
        this.props.viewMember(this.state.tenantId).then(() => this.setState({loadingAfterEdit:false,editTenantMember:false}))
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    render(){
        let tableData = <Table className="table table-bordered">
        <thead>
            <tr>
                <th style={{alignContent:'baseline'}}></th>
                <th>#</th>
                <th style={{cursor: 'pointer'}} onClick={()=>{
                                        this.setState((state)=>{return {sortVal:!state.sortVal,
                                        filterName:'memberName'}});
                                    }}>Member Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Relation with Tenant</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.fetchMemberDetails(this.props.tenantReducer)}
        </tbody>
    </Table>
    let addForm = <div>
        <FormGroup>
            <Label>Member Name</Label>
            <Input name="memberName" onChange={this.addNewMemberChange} placeholder="Member Name" />
            {!this.state.memberName ? <span className="error">{this.state.errors.memberName}</span> : ''}
        </FormGroup>
        <FormGroup>
            <Label>Date of Birth</Label>
            <Input max={this.maxDate()} type="date" name="memberDob" onChange={this.addNewMemberChange} />
            {!this.state.memberDob ? <span className="error">{this.state.errors.memberDob}</span> : ''}
        </FormGroup>
        <FormGroup>
            <div>
                <Label>Gender:</Label>
                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                <span><Input name="gender"
                        onChange={this.addNewMemberChange} type="radio" value="Male"/></span>
                
                
                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                <span><Input name="gender" onChange={this.addNewMemberChange} type="radio" value="Female" /></span>
                
                
                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                <span><Input name="gender" onChange={this.addNewMemberChange} type="radio"
                        value="Other"/></span>
            </div>
            <div>
                {!this.state.gender ? <span className="error">{this.state.errors.gender}</span> : ''}
            </div>
        </FormGroup>
        <FormGroup>
            <Label>Relation with Tenant</Label>
            <Select name='relationId' options={this.getRelationList(this.props.relationList)}
            placeholder={<DefaultSelect />} 
                onChange={this.relationHandler.bind(this,'relationId' )}  required/>
            {!this.state.relationId ? <span className="error">{this.state.errors.relationId}</span> : ''}
        </FormGroup>
        <FormGroup>
            <Button className="mr-2" color="primary" onClick={this.addNewTenantMember.bind(this,
                this.state.memberName, this.state.memberDob, this.state.gender, this.state.relationId,
                this.state.tenantId)}>Save</Button>
            <Button color="danger" onClick={this.toggleTenantMemberForm.bind(this)}>Cancel</Button> 
        </FormGroup>
        </div>

        let editForm = <div>
            <FormGroup>
                <Label>Member Name</Label>
                <Input name="memberName" value={this.state.memberName} maxLength="70" onChange={this.changeHandler} />
                {!this.state.memberName ? <span className="error">{this.state.errors.memberName}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Date of Birth</Label>
                <Input max={this.maxDate()} type="date" name="memberDob" value={this.state.memberDob} onChange={this.changeHandler} />
                {!this.state.memberDob ? <span className="error">{this.state.errors.memberDob}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Gender:</Label>
                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                <span><Input name="gender"
                        onChange={this.changeHandler} type="radio" value={this.state.Male}
                        checked={this.state.Male===this.state.gender ? true : false}/></span>
                
                
                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                <span><Input name="gender" onChange={this.changeHandler} type="radio"
                        value={this.state.Female} checked={this.state.Female===this.state.gender ? true : false} /></span>
                
                
                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                <span><Input name="gender" onChange={this.changeHandler} type="radio"
                        value={this.state.Other} checked={this.state.Other===this.state.gender ? true : false}/></span>
                {!this.state.gender ? <span className="error">{this.state.errors.gender}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Relation with Tenant</Label>
                <Input type="select" name='relationId'onChange={this.changeHandler} value={this.state.relationId} >
                <DefaultSelect />
                {this.getRelationOption(this.props.relationList)}
                </Input>
                {!this.state.relationId ? <span className="error">{this.state.errors.relationId}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Button className="mr-2" color="primary" onClick={this.updateTenantMember}>Save</Button>
                <Button color="danger" onClick={this.toggleEditTenant.bind(this)}>Cancel</Button> 
            </FormGroup>
        </div>
        return (
            <UI  onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Tenant's Members Detail</h3>
                        <div>
                            <Button className="mr-2" color="primary" onClick={this.toggleTenantMemberForm.bind(this)} color="primary">Add Member Details</Button>
                            <Button color="primary" onClick={this.route} color="primary">View Tenant Detail</Button>
                        </div>
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
                    <Modal isOpen={this.state.addTenantMember} toggle={this.toggleTenantMemberForm.bind(this)}>
                        <ModalHeader toggle={this.toggleTenantMemberForm.bind(this)}>Add New Members</ModalHeader>
                        <ModalBody>
                            {!this.state.loadingAfterAdd ? addForm : <Spinner />}
                        </ModalBody>
                    </Modal>
                    
                    <Modal isOpen={this.state.editTenantMember} toggle={this.toggleEditTenant.bind(this)}>
                        <ModalHeader toggle={this.toggleEditTenant.bind(this)}>Edit Member Detail</ModalHeader>
                        <ModalBody>
                            {!this.state.loadingAfterEdit ? editForm : <Spinner />}
                        </ModalBody>
                    </Modal>
                    {!this.state.loading ? tableData : <Spinner />}
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        relationList: state.RelationMasterReducer,
        tenantReducer:state.tenantReducer
    }
}

export default connect(mapStateToProps, { viewMember, getRelation, deleteTenantMember,
     deleteSelectedTenantMember, editTenantMember, addNewTenantDetail})(TenantMemberDetail);