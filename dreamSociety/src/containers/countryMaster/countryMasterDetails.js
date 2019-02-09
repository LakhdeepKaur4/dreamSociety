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
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';

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
            menuVisible: false,
            search: ''
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

    
    searchFilter(search) {
        return function (x) {
            return x.countryName.toLowerCase().includes(search.toLowerCase()) ||
                x.code.toLowerCase().includes(search.toLowerCase()) ||
                x.currency.toLowerCase().includes(search.toLowerCase()) ||
                x.phoneCode.toLowerCase().includes(search.toLowerCase()) ||!search;
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }


    updateBook=()=> {
        
        let{ countryId,countryName,code,currency,phoneCode} =this.state.editUserData;
        this.props.updateCountry(countryId,countryName,code,currency,phoneCode).then(() => this.refreshData());;
  
         this.setState({
           editUserModal: false, editUserData: {  countryId: '',countryName:'',code:'',currency:'', phoneCode: ''  }
       })
     
   
   }

    selectCountry=(e)=>{
        let{ editUserData } = this.state;

        editUserData.countryName= e.target.value;

        this.setState({editUserData})
      
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
        this.props.deleteCountry(countryId, isActive).then(() => this.refreshData())
        .then(() => this.setState({isActive: false}))
    
}

   getCountryDetails({country1}){
    //    console.log('dcdcdcdc',country1);
       if(country1){
            return country1.filter(this.searchFilter(this.state.search)).map((item) =>{
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
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render(){
        return(
            <div>
                
               
                   
                <UI onClick={this.logout}>
                    <div>
                        <Link to="/superDashboard/countrymaster">Add Country</Link>
                        <div className="search">
                                <h3>Country Master Details</h3>
                                <SearchFilter type="text" value={this.state.search}
                                    onChange={this.searchOnChange} />
                            </div>
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
                                        onChange={this.selectCountry} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">code</Label>
                                    <input
                                        type="textbox"
                                        placeholder="enter code"
                                        value={this.state.editUserData.code}
                                        onChange={this.selectCode} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="firstName">currency</Label>
                                    <input
                                        type="textbox"
                                        placeholder="enter currency"
                                        value={this.state.editUserData.currency}
                                        onChange={this.selectCurrency} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">phoneCode</Label>
                                    <input
                                        type="textbox"
                                        placeholder="enter currency"
                                        value={this.state.editUserData.phoneCode}
                                        onChange={this.selectPhoneCode} />
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
                </UI>
               
                    
            
            
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