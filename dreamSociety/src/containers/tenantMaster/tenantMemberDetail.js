import React, {Component} from 'react';
import {viewMember} from '../../actionCreators/tenantMasterAction';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { getRelation } from './../../actionCreators/relationMasterAction';
import Select from 'react-select';
import { FormGroup, Input, Table, Label, Button, Modal, Row, Col, ModalBody, ModalHeader } from 'reactstrap';

class TenantMemberDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            ids:[],
            isDisabled:false,
            addTenantMember:false,
            editTenantMember: false,
            memberName:'',
            Male:'Male',
            Female:'Female',
            Other:'Other',
            memberDob:'',
            gender:'',
            relationId:'',
            relationName:''
        }
        console.log(props)
    }

    componentDidMount(){
        let id  = localStorage.getItem('tenantId');
        console.log(id)
        this.props.viewMember(id)
        this.props.getRelation();
    }

    close = () => {
        return this.props.history.replace('/superDashBoard/');
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

    edit = (member, dob, gen) => {
        console.log(member, dob, gen)
        this.setState({memberName:member, memberDob:dob, gender:gen, editTenantMember: !this.state.editTenantMember})
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
                            <td>{item.relationId}</td>
                            <td>
                                <Button className="mr-2" color="success" onClick={this.edit.bind(this,item.memberName,item.memberDob,
                                    item.gender)}>Edit</Button>
                                <Button color="danger">Delete</Button>
                            </td>
                        </tr>
                    )
                 }
            })
        }
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

    render(){
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
                            <FormGroup>
                                <Label>Member Name</Label>
                                <Input name="memberName" onChange={this.addNewMemberChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Date of Birth</Label>
                                <Input max={this.maxDate()} type="date" name="memberDob" value={this.state.memberDob} onChange={this.addNewMemberChange} />
                            </FormGroup>
                            <FormGroup>
                                <div style={{display: 'flex'}}>
                                <Label>Gender: </Label>
                                <Col md={3} style={{display: 'flex'}}>
                                    <Col md={1}>
                                        <Label>M</Label>
                                        <Input name="gender" value="Male" style={{margin: '0px'}}
                                        onChange={this.addNewMemberChange} type="radio"
                                         />
                                    </Col>
                                    <Col md={1}>
                                        <Label>F</Label>
                                        <Input name="gender" value="Female" style={{margin: '0px'}} onChange={this.addNewMemberChange} type="radio"
                                         />
                                    </Col>
                                    <Col md={1}>
                                        <Label>O</Label>
                                        <Input name="gender" value="Other" style={{margin: '0px'}} onChange={this.addNewMemberChange} type="radio"
                                        />
                                    </Col>
                                </Col>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Select name='relationId' options={this.getRelationList(this.props.relationList)} 
                                    onChange={this.relationHandler.bind(this,'relationId' )}  required/>
                            </FormGroup>
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
                                <Input max={this.maxDate()} name="memberDob" value={this.state.memberDob} onChange={this.changeHandler} />
                            </FormGroup>
                            <FormGroup>
                                <div style={{display: 'flex'}}>
                                <Label>Gender: </Label>
                                <Col md={3} style={{display: 'flex'}}>
                                    <Col md={1}>
                                        <Label>M</Label>
                                        <Input name="gender" style={{margin: '0px'}}
                                        onChange={this.changeHandler} type="radio" value={this.state.Male}
                                        checked={this.state.Male===this.state.gender ? true : false} />
                                    </Col>
                                    <Col md={1}>
                                        <Label>F</Label>
                                        <Input name="gender" style={{margin: '0px'}} onChange={this.changeHandler} type="radio"
                                        value={this.state.Female} checked={this.state.Female===this.state.gender ? true : false} />
                                    </Col>
                                    <Col md={1}>
                                        <Label>O</Label>
                                        <Input name="gender" style={{margin: '0px'}} onChange={this.changeHandler} type="radio"
                                        value={this.state.Other} checked={this.state.Other===this.state.gender ? true : false}/>
                                    </Col>
                                </Col>
                                </div>
                            </FormGroup>
                            
                        </ModalBody>
                    </Modal>
                    <Table className="table table-bordered">
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

export default connect(mapStateToProps, { viewMember, getRelation })(TenantMemberDetail);