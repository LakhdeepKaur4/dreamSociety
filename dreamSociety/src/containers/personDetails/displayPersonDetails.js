import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { authHeader } from '../../helper/authHeader';
import { URN } from '../../actions/index';
import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { viewPerson, getFlat, getTower, getRoles } from '../../actionCreators/personDetailsMasterAction';
import SearchFilter from '../../components/searchFilter/searchFilter'
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import UI from '../../components/newUI/superAdminDashboard';


class displayPersonDetails extends Component {


        constructor(props) {
                super(props)
                this.state = {
                        editPersonData: {
                                userName: '',
                                email: '',

                                towerId: [],
                                roleName: '',
                                flatDetailId: '',
                                roles: [],
                                id: '',

                                familyMember: '',
                                parking: '',
                                isActive: false
                        },
                        editPersonModal: false,
                        search: ''
                }
        }
        componentDidMount() {
                this.props.viewPerson()
                this.props.getTower()
                this.props.getRoles()

                console.log(this.props.viewPerson(), "abc")
        }

        OnKeyPresshandler(event) {
                const pattern = /[a-zA-Z]/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }


        OnKeyPressNumber(event) {
                const pattern = /^[0-9]$/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }


        getRole({ roles }) {
                console.log(roles, 'sdfasfsdf')
                if (roles) {
                        return (
                                roles.map((item) => {
                                        return (
                                                <option key={item.id} value={item.roleName}>{item.roleName} </option>
                                        )
                                })
                        )
                }

        }
        refreshData() {

                this.props.viewPerson()
        }
        toggleEditPersonModal() {

                this.setState({
                        editPersonModal: !this.state.editPersonModal
                })
        }
        editPerson(userId, userName, roleName, email, towerId, id, roles, familyMember, parking, flatDetailId) {
                console.log('i m in edit ', userName, email, towerId, id, roles, familyMember, parking);
                this.setState({
                        editPersonData: { userId, userName, email, towerId, id, familyMember, parking, flatDetailId },
                        editPersonModal: !this.state.editPersonModal
                })
        }
        updatePerson = () => {
                let { userId, userName, email, towerId, id, roles, familyMember, parking, roleName, flatDetailId } = this.state.editPersonData;
                console.log('dfdsf', userName, email, towerId, id, roles, familyMember, parking);

                axios.put(`${URN}/user/` + userId, { userId, userName, email, towerId, id, roles, familyMember, parking, roleName, flatDetailId },
                        { headers: authHeader() }).then((response) => {

                                this.refreshData();
                        })
                this.setState({
                        editPersonModal: false, editPersonData: { userName: '', email: '', towerId: '', id: '', roles: '', familyMember: '', parking: '', roleName: '', flatDetailId: '' }
                })
        }




        deletePerson(userId) {
                let { isActive } = this.state.editPersonData;
                axios.put(`${URN}/user/delete/` + userId, { isActive }, { headers: authHeader() }).then((response) => {
                        this.refreshData();
                        this.setState({ editPersonData: { isActive: false } })
                })
        }
        searchFilter(search) {
                return function (x) {
                        return x.userName.toLowerCase().includes(search.toLowerCase()) || !search;
                }
        }

        searchOnChange = (e) => {
                this.setState({ search: e.target.value })
        }

        getTower({ get }) {
                console.log('abcd', get)
                if (get) {
                        return (
                                get.map((item) => {
                                        return (

                                                <option key={item.towerId} value={item.towerId}> {item.towerName} </option>
                                        )
                                })
                        )
                }
        }
        person({ person1 }) {
                console.log(person1);

                if (person1) {
                        console.log("xyz", person1)
                        let currentRole;
                        return (
                                person1.filter(this.searchFilter(this.state.search)).map((item) => {
                                        console.log(item.roles, "ancdd")

                                        return (
                                                <tr key={item.userId}>
                                                        <td>{item.userName}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.tower_master.towerName}</td>

                                                        <td>{item.roles.map((i) => {
                                                                currentRole = i.roleName
                                                                return currentRole
                                                        })}</td>
                                                        {/* <td>{item.flatName}</td> */}
                                                        <td>{item.familyMember}</td>
                                                        <td>{item.parking}</td>

                                                        <td>

                                                                <button className="btn btn-primary" onClick={this.editPerson.bind(this, item.userId, item.userName, currentRole, item.email, item.towerId, item.flatDetailId, item.roles, item.familyMember, item.parking)}> Edit</button>

                                                                <button className="btn btn-danger" onClick={this.deletePerson.bind(this, item.userId)}>Delete</button>
                                                        </td>
                                                </tr>

                                        )
                                })
                        )
                }
        }


        render() {
                return (
                        <div>
                                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}> */}
                                <UI>
                                        <div>


                                                <h3>Display Person Details</h3>

                                                <Modal isOpen={this.state.editPersonModal} toggle={this.toggleEditPersonModal.bind(this)}>
                                                        <ModalHeader toggle={this.toggleEditPersonModal.bind(this)}>Edit  Event Details</ModalHeader>
                                                        <ModalBody>


                                                                <FormGroup>
                                                                        <Label>User Name</Label>
                                                                        <Input type="text" value={this.state.editPersonData.userName} onChange={(e) => {
                                                                                let { editPersonData } = this.state
                                                                                editPersonData.userName = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}
                                                                                onKeyPress={this.OnKeyPresshandler} required
                                                                        />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                        <Label> Email</Label>
                                                                        <Input type="text" value={this.state.editPersonData.email} onChange={(e) => {
                                                                                let { editPersonData } = this.state
                                                                                editPersonData.email = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}

                                                                        />
                                                                </FormGroup>

                                                                <FormGroup>
                                                                        <Label> Tower Name</Label>
                                                                        <select id="towerId" value={this.state.editPersonData.towerId} onChange={(e) => {
                                                                                let { editPersonData } = this.state
                                                                                editPersonData.towerId = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}
                                                                        >
                                                                                {this.getTower(this.props.personDetails)}
                                                                        </select>
                                                                </FormGroup>
                                                                {/* <FormGroup>
                        <Label> Flat Details</Label>
                        <Input type="text"  value={this.state.editPersonData.id} onChange={(e) => {
                                let { editPersonData } = this.state
                                editPersonData.roleName = e.target.value;
                                this.setState({
                                        editPersonData
                                })
                        }}
                        />
                </FormGroup> */}


                                                                <FormGroup>
                                                                        <Label> Roles</Label>

                                                                        <select value={this.state.editPersonData.roleName} onChange={(e) => {

                                                                                let { editPersonData } = this.state
                                                                                editPersonData.roleName = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}

                                                                        >

                                                                                {this.getRole(this.props.personDetails)}

                                                                        </select>
                                                                </FormGroup>
                                                                {/* 
                <FormGroup>
                        <Label> Floor</Label>
                        <Input type="text"  value={this.state.editPersonData.floor} onChange={(e) => {
                                let { editPersonData } = this.state
                                editPersonData.floor = e.target.value;
                                this.setState({
                                        editPersonData
                                })
                        }}
                        />
                </FormGroup> */}
                                                                <FormGroup>
                                                                        <Label> Number of family Members</Label>
                                                                        <Input type="text" value={this.state.editPersonData.familyMember} onChange={(e) => {
                                                                                let { editPersonData } = this.state
                                                                                editPersonData.familyMember = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}
                                                                                onKeyPress={this.onkePressNumber}
                                                                        />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                        <Label> Parking</Label>
                                                                        <Input type="text" value={this.state.editPersonData.parking} onChange={(e) => {
                                                                                let { editPersonData } = this.state
                                                                                editPersonData.parking = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}
                                                                                onKeyPress={this.onKeyPressNumber}
                                                                        />
                                                                </FormGroup>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                                <Button color="primary" onClick={this.updatePerson} >Update Details</Button>
                                                                <Button color="secondary" onClick={this.toggleEditPersonModal.bind(this)}>Cancel</Button>
                                                        </ModalFooter>
                                                </Modal>
                                                <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                                                <Table>
                                                        <thead>
                                                                <tr>
                                                                        <th>UserName</th>
                                                                        <th>Email</th>
                                                                        <th>Tower Name </th>
                                                                        {/* <th>Flat</th> */}
                                                                        <th>Roles</th>
                                                                        <th>Number of
                      family member</th>
                                                                        <th>Parking</th>

                                                                </tr>
                                                        </thead>
                                                        <tbody>

                                                                {this.person(this.props.personDetails)}

                                                        </tbody>
                                                </Table>

                                        </div>
                                </UI>
                                {/* </SideBar>
            </div> */}
                        </div>

                )
        }


}


function mapStateToProps(state) {

        console.log(state, "state")
        return {
                personDetails: state.personDetails,
                role: state.role
        }

}

function mapDispatchToProps(dispatch) {
        return bindActionCreators({ viewPerson, getFlat, getRoles, getTower }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(displayPersonDetails)