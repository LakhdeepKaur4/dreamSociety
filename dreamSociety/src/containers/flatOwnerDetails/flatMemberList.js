import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PlaceHolder } from '../../actions/index';
import Select from 'react-select';
import { getRelation } from './../../actionCreators/relationMasterAction';
import Spinner from '../../components/spinner/spinner';
import { getOwnerMember, deleteMember, deleteMultipleMember, memberUpdate, addNewMember } from '../../actionCreators/flatOwnerAction';
import UI from '../../components/newUI/superAdminDashboard';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label } from 'reactstrap';
var id;
class FlatMemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            ids: [],
            isDisabled: true,
            modal: false,
            memberName: '',
            gender: '',
            memberDob: '',
            relationId: '',
            memberId: '',
            formModal: false,
            ownerId: '',
            errors: {},
        }

    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    componentWillMount() {
        id = localStorage.getItem('ownerId')
    }
    componentDidMount() {
        this.props.getRelation();
        this.props.getOwnerMember(id)
            .then(() => this.setState({ loading: false }))
    }
    deleteMember(id) {
        this.props.deleteMember(id)
            .then(() => this.props.getOwnerMember(id))
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
    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        if (window.confirm('Are You Sure ?')) {
            this.props.deleteMultipleMember(ids)
                .then(() => this.props.getOwnerMember(id).then(() => this.setState({ loading: false })))
                .catch(err => err.response.data.message);
        }
        else {
            this.props.getOwnerMember()
                .then(() => this.setState({ loading: false }))
        }
    }

    renderList = ({ ownerMember }) => {
        if (ownerMember) {
            return ownerMember.memberArr.map((item, index) => {
                return (
                    <tr key={item.memberId}>
                        <td><input type="checkbox" name="ids" value={item.memberId} className="SelectAll"
                            onChange={(e, i) => {
                                const { memberId } = item
                                if (!e.target.checked) {
                                    if (this.state.ids.length > -1) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(memberId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1)
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true })
                                        }
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, memberId] })
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }
                            }} /></td>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.memberName}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.memberDob}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.relation_master ? item.relation_master.relationName : ''}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.gender}</td>
                        <td style={{ textAlign: "center" }}>
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, item.memberId, item.memberName, item.memberDob, item.relationId, item.gender)} >Edit</button>
                            <button className="btn btn-danger" onClick={this.deleteMember.bind(this, item.memberId)} >Delete</button>
                        </td>

                    </tr>
                )
            })
        }
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    toggles1 = () => {
        this.setState({ formModal: !this.state.formModal })
    }
    toggle = (memberId, memberName, memberDob, relationId, gender) => {
        this.setState({
            memberName, gender, memberDob, relationId, memberId,
            modal: !this.state.modal
        })
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
    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    editMember = () => {
        const { memberId, memberName, gender, memberDob, relationId } = this.state
        this.setState({ loading: true })
        this.setState({ modal: !this.state.modal })
        this.props.memberUpdate(memberName, gender, memberDob, relationId, memberId)
            .then(() => this.props.getOwnerMember(id).then(() => this.setState({ loading: false })))
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
    relationHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.value)
        });
    }
    close = () => {
        return this.props.history.replace('/superDashBoard/flatOwnerList')
    }
    addMember = () => {
        const { memberName, memberDob, gender, relationId } = this.state
        let errors = {};
        if (this.state.memberName === '') {
            errors.memberName = "Member Name can't be empty"
        }
        else if (this.state.memberDob === '') {
            errors.memberDob = "Date Of Birth can't be empty"
        }
        else if (this.state.gender === '') {
            errors.gender = "Gender can't be empty"
        }
        else if (this.state.relationId === '') {
            errors.relationId = "Relation can't be empty"
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({ loading: true })
            this.setState({ formModal: !this.state.formModal })
            this.props.addNewMember(memberName, memberDob, gender, relationId, id)
                .then(() => this.props.getOwnerMember(id).then(() => this.setState({ loading: false })))
        }
    }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ width: "4%" }}></th>
                    <th style={{ textAlign: "center", width: "4%" }}>#</th>
                    <th style={{ textAlign: "center", width: "16%" }}>Name</th>
                    <th style={{ textAlign: "center", width: "16%" }}>Date of Birth</th>
                    <th style={{ textAlign: "center" }}>Relation With Owner</th>
                    <th style={{ textAlign: "center" }}>Gender</th>
                    <th style={{ textAlign: "center", width: '15%' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.OwnerMemberList)}
            </tbody>
        </Table>
        let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Flat Member List</h3>
                            <Button color="primary" onClick={this.toggles1} id="addMember" >Add Member</Button>
                        </div>
                        <div>
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
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input placeholder="Name Of Member" name="memberName" onChange={this.onChangeHandler} value={this.state.memberName} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Relation With Owner</Label>
                                        <Select options={this.getRelationList(this.props.relationList)}
                                            onChange={this.relationHandler.bind(this, 'relationId')}
                                            name="relationId"
                                            placeholder={PlaceHolder}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Date Of Birth</Label>
                                        <Input type='date' max={this.maxDate()} name="memberDob" onChange={this.onChangeHandler} />
                                    </FormGroup>
                                    <Label>Gender</Label>
                                    <div>
                                        <div>
                                            <Label style={{ paddingRight: ' 55px' }}>Male</Label>
                                            <span><Input type="radio" name="gender" onChange={this.onChangeHandler} value="male" /></span>
                                        </div>
                                        <div>
                                            <Label style={{ paddingRight: ' 35px' }}>Female</Label>
                                            <span><Input type="radio" name="gender" onChange={this.onChangeHandler} value="female" /></span>
                                        </div>
                                        <div>
                                            <Label style={{ paddingRight: ' 49px' }}>Other</Label>
                                            <span><Input type="radio" name="gender" onChange={this.onChangeHandler} value="other" /></span>
                                        </div>
                                    </div>
                                    <FormGroup>
                                        <Button color="primary mr-2" onClick={this.editMember}>Save</Button>
                                        <Button color="danger" onClick={this.toggles}>Cancel</Button>
                                    </FormGroup>
                                </ModalBody>
                            </Modal>

                            <Modal isOpen={this.state.formModal} toggle={this.toggles1}>
                                <ModalHeader>Add Member</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input placeholder="Name Of Member" name="memberName" onChange={this.onChangeHandler} value={this.state.memberName} />
                                        <span className="error">{this.state.errors.memberName}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Relation With Owner</Label>
                                        <Select options={this.getRelationList(this.props.relationList)}
                                            onChange={this.relationHandler.bind(this, 'relationId')}
                                            name="relationId"
                                            placeholder={PlaceHolder}
                                        />
                                        <span className="error">{this.state.errors.relationId}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Date Of Birth</Label>
                                        <Input type='date' max={this.maxDate()} name="memberDob" onChange={this.onChangeHandler} />
                                        <span className="error">{this.state.errors.memberDob}</span>
                                    </FormGroup>
                                    <Label>Gender</Label>
                                    <div>
                                        <div>
                                            <Label style={{ paddingRight: ' 55px' }}>Male</Label>
                                            <span><Input type="radio" name="gender" onChange={this.onChangeHandler} value="male" /></span>
                                        </div>
                                        <div>
                                            <Label style={{ paddingRight: ' 35px' }}>Female</Label>
                                            <span><Input type="radio" name="gender" onChange={this.onChangeHandler} value="female" /></span>
                                        </div>
                                        <div>
                                            <Label style={{ paddingRight: ' 49px' }}>Other</Label>
                                            <span><Input type="radio" name="gender" onChange={this.onChangeHandler} value="other" /></span>
                                        </div>
                                    </div>
                                    <span className="error">{this.state.errors.gender}</span>
                                    <FormGroup>
                                        <Button color="primary mr-2" onClick={this.addMember}>Add Member</Button>
                                        <Button color="danger" onClick={this.toggles1}>Cancel</Button>
                                    </FormGroup>
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
        OwnerMemberList: state.FlatOwnerReducer,
        relationList: state.RelationMasterReducer,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOwnerMember, deleteMember, deleteMultipleMember, getRelation, memberUpdate, addNewMember }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FlatMemberList);