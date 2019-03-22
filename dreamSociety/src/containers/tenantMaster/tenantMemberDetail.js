import React, {Component} from 'react';
import {viewMember, deleteTenantMember, deleteSelectedTenantMember,editTenantMember,
    addNewTenantDetail} from '../../actionCreators/tenantMasterAction';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { getRelation } from './../../actionCreators/relationMasterAction';
import Select from 'react-select';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
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
            loadingAfterAdd:false
        }
        console.log(props)
    }

    componentDidMount(){
        this.refreshData()
        
        this.props.getRelation();
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

    fetchMemberDetails = ({getMemberDetail}) => {
        console.log(getMemberDetail)
        if(getMemberDetail){
            return getMemberDetail.members.map((item, i) => {
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
        this.setState({addTenantMember: !this.state.addTenantMember})
    }

    toggleEditTenant(){
        this.setState({editTenantMember: !this.state.editTenantMember})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    addNewMemberChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
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
        this.props.editTenantMember(memberName, memberDob, gender, relationId, memberId)
        .then(() => {
            this.refreshData()
        })
        .catch(err => err)
    }

    addNewTenantMember(member, dob, gen, relId, tenId){
        console.log(member, dob, gen, relId, tenId);
        this.setState({loadingAfterAdd:true})
        let {memberName, memberDob, gender, relationId, tenantId} = this.state;
        this.setState({memberName:member, memberDob:dob, gender:gen, relationId:relId, tenantId:tenId})
        this.props.addNewTenantDetail({memberName, memberDob, gender, relationId, tenantId})
        .then(() => {
            this.loadDetailAfterAdd()
        })
        .catch(err => err)
    }

    loadDetailAfterAdd = () => {
        this.props.viewMember(this.state.tenantId).then(() => this.setState({loadingAfterAdd:false,addTenantMember:false}))
    }

    render(){
        let tableData = <Table className="table table-bordered">
        <thead>
            <tr>
                <th style={{alignContent:'baseline'}}></th>
                <th>#</th>
                <th>Member Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
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
            <Input name="memberName" onChange={this.addNewMemberChange} />
        </FormGroup>
        <FormGroup>
            <Label>Date of Birth</Label>
            <Input max={this.maxDate()} type="date" name="memberDob" value={this.state.memberDob} onChange={this.addNewMemberChange} />
        </FormGroup>
        <FormGroup>
            <Label>Gender:</Label>
            <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
            <span><Input name="gender"
                    onChange={this.addNewMemberChange} type="radio" value="Male"/></span>
            
            
            <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
            <span><Input name="gender" onChange={this.addNewMemberChange} type="radio" value="Female" /></span>
            
            
            <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
            <span><Input name="gender" onChange={this.addNewMemberChange} type="radio"
                    value="Other"/></span>
        </FormGroup>
        <FormGroup>
            <Select name='relationId' options={this.getRelationList(this.props.relationList)} 
                onChange={this.relationHandler.bind(this,'relationId' )}  required/>
        </FormGroup>
        <FormGroup>
            <Button className="mr-2" color="primary" onClick={this.addNewTenantMember.bind(this,
                this.state.memberName, this.state.memberDob, this.state.gender, this.state.relationId,
                this.state.tenantId)}>Save</Button>
            <Button color="danger" onClick={this.toggleTenantMemberForm.bind(this)}>Cancel</Button> 
        </FormGroup>
        </div>
        return (
            <UI  onClick={this.logout}>
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
                            <FormGroup>
                                <Label>Member Name</Label>
                                <Input name="memberName" value={this.state.memberName} onChange={this.changeHandler} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Date of Birth</Label>
                                <Input max={this.maxDate()} type="date" name="memberDob" value={this.state.memberDob} onChange={this.changeHandler} />
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
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" name='relationId'onChange={this.changeHandler} value={this.state.relationId} >
                                <DefaultSelect />
                                {this.getRelationOption(this.props.relationList)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Button className="mr-2" color="primary" onClick={this.updateTenantMember}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditTenant.bind(this)}>Cancel</Button> 
                            </FormGroup>
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