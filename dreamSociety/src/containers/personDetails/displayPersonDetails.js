import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { viewPerson, getFlat, getTower, getRoles,updatePerson,deletePerson } from '../../actionCreators/personDetailsMasterAction';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import {Link} from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
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
                                roleId:'',
                                familyMember: '',
                                parking: '',
                                isActive: false
                        },
                        editPersonModal: false,
                        loading:true,
                        search: ''
                }
        }
        componentDidMount() {
                this.refreshData()
        
        }

        

        OnKeyPresshandler(event) {
                const pattern = /[a-zA-Z _]/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }

        
OnKeyPressmail(event){
        const pattern = /^[a-zA-Z0-9@._]+$/;
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

                this.props.viewPerson().then(() => this.setState({loading:false}));
                this.props.getTower().then(() => this.setState({loading:false}));
                this.props.getRoles().then(() => this.setState({loading:false}));
                
        }
        toggleEditPersonModal() {

                this.setState({
                        editPersonModal: !this.state.editPersonModal
                })
        }
        editPerson(userId, userName, roleName, email, towerId, id, roles, familyMember, parking, flatDetailId) {
                console.log('i m in edit ', userName, email, towerId, id, roles, familyMember, parking);
                this.setState({
                        editPersonData: { userId, userName, email, towerId, id, familyMember,roleName, parking, flatDetailId },
                        editPersonModal: !this.state.editPersonModal
                })
        }
     
updatePerson = ( ) => {

        let {  userId,userName,email,towerId,familyMember,parking,roleName } = this.state.editPersonData;
     
  console.log("person check" , userId,userName,email,towerId,familyMember,parking,roleName)
        
  this.props.updatePerson( userId,userName,email,towerId,familyMember,parking,roleName).then(()=>{this.refreshData()})

        //   this.refreshData()
                this.setState({
                        editPersonModal: false,loading:true, editPersonData: { userName:'',email:'',towerId:'',familyMember:'',parking:'',roleName:''  }
                })
        
}





      
deletePerson(userId){
        this.setState({loading:true})

        let {isActive} = this.state.editPersonData;
       
        this.props.deletePerson(userId,isActive).then(()=>{this.refreshData()})
    
            this.setState({editPersonData:{isActive:false}})
      
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

                                                                <button className="btn btn-success" onClick={this.editPerson.bind(this, item.userId, item.userName, currentRole, item.email, item.towerId, item.flatDetailId, item.roles, item.familyMember, item.parking)}> Edit</button>

                                                                <button className="btn btn-danger" onClick={this.deletePerson.bind(this, item.userId)}>Delete</button>
                                                        </td>
                                                </tr>

                                        )
                                })
                        )
                }
        }
        Addperson=()=>{
                this.props.history.push('/superDashboard/persondetails')
        }
        logout=()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/') 
            }

        render() {
                let tableData;
                tableData= <Table  className="table table-bordered">
                                                        <thead>
                                                                <tr>
                                                                        <th>UserName</th>
                                                                        <th>Email</th>
                                                                        <th>Tower Name </th>
                                                                        <th>Roles</th>
                                                                        <th>Number of
                                                                            family member</th>
                                                                        <th>Parking</th>
                                                                        <th> Actions  </th>
                                                                </tr>
                                                        </thead>
                                                        <tbody>

                                                                {this.person(this.props.personDetails)}

                                                        </tbody>
                                                </Table>
                return (
                        <div>
                                <UI onClick={this.logout}>
                                        <div className ="w3-container w3-margin-top">
                                        <div  className ="top-details" >         
                                        <h3 align="center"> Person Details</h3>
<Button  className="btn btn-success" onClick ={this.Addperson} colr="primary"> Add person</Button>
</div>
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
                                                                                onKeyPress={this.OnKeyPresshandler}  maxLength ={30} required
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
                                                                        onKeyPress={this.OnKeyPressmail}  maxLength ={40} required
                                                                        />
                                                                </FormGroup>

                                                                <FormGroup>
                                                                        <Label> Tower Name</Label>
                                                                        <Input type="select" id="towerId" value={this.state.editPersonData.towerId} onChange={(e) => {
                                                                                let { editPersonData } = this.state
                                                                                editPersonData.towerId = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}
                                                                        >
                                                                        
                                                                        <option> --Select--</option>
                                                                                {this.getTower(this.props.personDetails)}
                                                                        </Input>
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

                                                                        <Input type="select" value={this.state.editPersonData.roleName} onChange={(e) => {

                                                                                let { editPersonData } = this.state
                                                                                editPersonData.roleName    = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}
                                                                      
                                                                        >       
                                                                                <option>{this.state.editPersonData.roleName}</option>
                                                                                <option> --Select--</option>
                                                                                {this.getRole(this.props.personDetails)}

                                                                        </Input>
                                                                </FormGroup>
                                                                
                                                                <FormGroup>
                                                                        <Label> Number of family Members</Label>
                                                                        <Input type="text" value={this.state.editPersonData.familyMember} onChange={(e) => {
                                                                                let { editPersonData } = this.state
                                                                                editPersonData.familyMember = e.target.value;
                                                                                this.setState({
                                                                                        editPersonData
                                                                                })
                                                                        }}
                                                                                onKeyPress={this.OnkeyPressNumber}  maxLength ={2} required
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
                                                                                onKeyPress={this.OnKeyPressNumber} maxLength={2} required
                                                                        />
                                                                </FormGroup>
                                                        
                                                        
                                                                <Button color="primary" onClick={this.updatePerson} className="mr-2" >Save</Button>
                                                                <Button color="danger" onClick={this.toggleEditPersonModal.bind(this)}>Cancel</Button>
                                                                </ModalBody>
                                                </Modal>
                                                <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                                                {!this.state.loading? tableData:<Spinner/>}

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
        return bindActionCreators({ viewPerson, getFlat, getRoles, getTower,updatePerson,deletePerson}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(displayPersonDetails)