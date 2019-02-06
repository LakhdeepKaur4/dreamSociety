import { URN } from '../../actions/index';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { getCountry,updateCountry,deleteCountry } from '../../actionCreators/countryAction';
import { authHeader } from '../../helper/authHeader';
import { bindActionCreators } from 'redux';
import { Table, Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Label, } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar'

class CountryDetails extends Component{

    constructor(){
        super();
       this.state = {
            editUserData: {
                countryId:'',
                countryName:'',
                code:'',
                currency:'',
                phoneCode:'',
                isActive:false
            }
            ,
            editUserModal: false,
            menuVisible: false
        }
    }

   componentDidMount(){
       this.refreshData()
   }

     refreshData(){
    this.props.getCountry();
    }  

    toggleEditUserModal() {
        this.setState({
          editUserModal: ! this.state.editUserModal
        });
      }

    editCountry(countryId,countryName,code,currency,phoneCode) {
        this.setState({
            editUserData:{countryId,countryName,code,currency,phoneCode}, editUserModal: ! this.state.editUserModal
        })    
    }

    updateBook=()=> {
        
        let{ countryId,countryName,code,currency,phoneCode} =this.state.editUserData;
        this.props.updateCountry(countryId,countryName,code,currency,phoneCode);
    //    axios.put(`${URN}/country/`+ countryId ,{  countryName,code,currency,phoneCode}
    //    ,{headers:authHeader()}).then((response) => this.refreshData())
         this.setState({
           editUserModal: false, editUserData: {  countryId: '',countryName:'',code:'',currency:'', phoneCode: ''  }
       })
     
   
   }

    selectCountry=(e)=>{
        let{ editUserData } = this.state;

        editUserData.countryName= e.target.value;

        this.setState({editUserData})
        // console.log('shunag',this.editUserData.countryName)
    }

    selectCode=(e)=>{
        let{ editUserData } = this.state;

        editUserData.code= e.target.value;

        this.setState({editUserData})
    }

    selectCurrency=(e)=>{
        let{ editUserData } = this.state;

        editUserData.currency= e.target.value;

        this.setState({editUserData})
    }

    selectPhoneCode=(e)=>{
        let{ editUserData } = this.state;

        editUserData.phoneCode= e.target.value;

        this.setState({editUserData})
    }

    deleteUser(countryId){
        let { isActive } = this.state.editUserData
        this.props.deleteCountry(countryId, isActive)
        .then(() => this.setState({isActive: false}))
    // axios.put(`${URN}/country/`+ countryId, {isActive},{headers:authHeader()}).then((response) => {
    //     this.refreshData()
    //     this.setState({editUserData: {isActive: false}})
        
    // })
}

   getCountryDetails=({country1})=>{
    //    console.log('dcdcdcdc',country1);
       if(country1){
            return country1.map((item) =>{
                //  console.log('shub',item);
                return (
                    <tr key={item.countryId}>
                        <td>{item.countryName}</td>
                        <td>{item.code}</td>
                        <td>{item.currency}</td>
                        <td>{item.phoneCode}</td>
                        
                        <td>
                            <Button color="success" size="sm" className="mr-2"onClick={this.editCountry.bind(this, item.countryId,item.countryName, 
                            item.code, item.currency,item.phoneCode)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.countryId)} >Delete</Button>
                        </td>
                    </tr>
                )
             })
       }
   }


    render(){
        return(
            <div>
                <MenuBar onClick={() => this.setState({menuVisible: !this.state.menuVisible})}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({menuVisible: false})}
                        visible={this.state.menuVisible}>
            <div>
                <Link to ="/superDashboard/countrymaster">Add Country</Link>
                <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                    <ModalBody>
                    <FormGroup>
                        <Label for="roles">countryName</Label>
                        <input
                            type="textbox"
                            placeholder="enter countryName"
                            // name="countryName"
                            value={this.state.editUserData.countryName} 
                            onChange={this.selectCountry } /> 
                    </FormGroup>
                    <FormGroup>
                        <Label for="roles">code</Label>
                        <input
                            type="textbox"
                            placeholder="enter code"
                            value={this.state.editUserData.code} 
                            onChange={this.selectCode } />
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstName">currency</Label>
                        <input
                            type="textbox"
                            placeholder="enter currency"
                            value={this.state.editUserData.currency} 
                            onChange={this.selectCurrency } />
                    </FormGroup>
                    <FormGroup>
                        <Label for="roles">phoneCode</Label>
                        <input
                            type="textbox"
                            placeholder="enter currency"
                            value={this.state.editUserData.phoneCode} 
                            onChange={this.selectPhoneCode } />
                    </FormGroup>
                    
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.updateBook}>Update Flat</Button>
                    <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                <thead>
                        <tr>
                            <th>countryName</th>
                            <th>code</th>
                            <th>currency</th>
                            <th>phoneCode</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                      {this.getCountryDetails(this.props.countryDetails)}
                     </tbody>
                     </Table>
            </div>
            </SideBar>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        countryDetails:state.countryDetails
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCountry,
        updateCountry,
        deleteCountry
    },dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(CountryDetails);