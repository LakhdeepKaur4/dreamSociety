import React,{Component}  from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {authHeader} from '../../helper/authHeader';
import {URN} from '../../actions/index';     
import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';                
import {viewPerson} from '../../actionCreators/personDetailsMasterAction';
import SearchFilter from '../../components/searchFilter/searchFilter'

class displayPersonDetails extends Component{


    constructor(props){
        super(props)
        this.state={
            editPersonData:{
            userName:'',
            email:'',
          
            towerId:[],
        
            flatDetailId:'',    
          roles:'',
        
           
            familyMember:'',
            parking:'',  
            isActive:false
        },
        editPersonModal:false,
        search:''
    }
    }
componentDidMount(){
     this.props.viewPerson()

    console.log(this.props.viewPerson(),"abc")
}


toggleEditPersonModal(){
    this.setState({
    editPersonModal:!this.editPersonModal
})
}
editPerson(userName,email,towerId, towerName,flatDetailId,roles,familyMember,parking  ) {
    console.log('i m in edit ',userName,email,towerId,flatDetailId,roles,familyMember,parking );
    this.setState({
            editPersonData: { userName,email,towerId,flatDetailId,roles,familyMember,parking,towerName },
            editPersonModal: !this.state.editPersonModal
    })
}

deletePerson(userId){
    let {isActive} = this.state.editPersonData;
    axios.put(`${URN}/user/delete`+userId,{isActive},{headers:authHeader()}).then((response)=>
    {
        this.setState({editPersonData:{isActive:false}})
    })
}
searchFilter(search){
        return function(x){
            return x.userName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    searchOnChange =(e)=>{
        this.setState({search:e.target.value})        
    }
person({person1}){
   console.log(person1);

            if(person1){
                console.log("xyz",person1)
                return(
                    person1.filter(this.searchFilter(this.state.search)).map((item)=>{
                     console.log(item.roles,"ancdd")
                     console.log(item.roles.id)
                        return(
                            <tr key={item.userId}>
                            <td>{item.userName}</td>
                            <td>{item.email}</td>
                            {/* <td>{item.tower_master.towerName}</td> */}
                            
                            <td>{item.roles.roleName}</td>
                            <td>{item.flatName}</td>
                            <td>{item.familyMember}</td>
                            <td>{item.parking}</td>
                        
                            <td>

<button className="btn btn-primary"   onClick={  this.editPerson.bind(this,item.userName,item.email,item.towerId,item.flatDetailId,item.roles,item.familyMember,item.parking )}> Edit</button>

<button className="btn btn-danger" >Delete</button>
</td>  
                        </tr>

                        )
                    })
                )
            }
}

  
    render(){
        return(
            <div>
                 <h3>Display Event Details</h3>

<Modal isOpen={this.state.editPersonModal} toggle={this.toggleEditPersonModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditPersonModal.bind(this)}>Edit  Event Details</ModalHeader>
        <ModalBody>


                 <FormGroup>
                        <Label>User Name</Label>
                        <Input type="text"  value={this.state.editPersonData.userName} onChange={(e) => {
                                let { editPersonData } = this.state
                                editPersonData.userName = e.target.value;
                                this.setState({
                                        editPersonData
                                })
                        }}
                        />
                </FormGroup> 
                <FormGroup>
                        <Label> Email</Label>
                        <Input type="text"  value={this.state.editPersonData.email} onChange={(e) => {
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
                        <select  value={this.state.editPersonData.towerId} onChange={(e) => {
                                let { editPersonData } = this.state
                                editPersonData.towerId = e.target.value;
                                this.setState({
                                        editPersonData
                                })
                        }}
                        >
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
                        <Input type="text"  value={this.state.editPersonData.id} onChange={(e) => {
                                let { editPersonData } = this.state
                                editPersonData.roleName = e.target.value;
                                this.setState({
                                        editPersonData
                                })
                        }}
                        />
                </FormGroup>
                <FormGroup>
                        <Label> Number of family Members</Label>
                        <Input type="text"  value={this.state.editPersonData.familyMember} onChange={(e) => {
                                let { editPersonData } = this.state
                                editPersonData.familyMember = e.target.value;
                                this.setState({
                                        editPersonData
                                })
                        }}
                        />
                </FormGroup>
                <FormGroup>
                        <Label> Parking</Label>
                        <Input type="text"  value={this.state.editPersonData.parking} onChange={(e) => {
                                let { editPersonData } = this.state
                                editPersonData.parking = e.target.value;
                                this.setState({
                                        editPersonData
                                })
                        }}
                        />
                </FormGroup>
        </ModalBody>
        <ModalFooter>
                <Button color="primary" >Update Details</Button>
                <Button color="secondary" >Cancel</Button>
        </ModalFooter>
</Modal>
<SearchFilter type ="text"   value={this.state.search}  onChange ={this.searchOnChange} />
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
            </div>
        )
    }


}


function mapStateToProps(state){

    console.log(state,"state")
 return{
     personDetails:state.personDetails,
     role:state.role
  }   
    
}

function mapDispatchToProps(dispatch){
 return bindActionCreators({viewPerson},dispatch)   
}


export default connect(mapStateToProps,mapDispatchToProps)(displayPersonDetails)