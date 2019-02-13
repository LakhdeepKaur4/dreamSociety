import React, { Component } from 'react';
import { getDetails,getCountry,updateDetails,deleteDetails} from '../../actionCreators/countryAction';

import { bindActionCreators } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Label,Input } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
class flatMasterDetails extends Component {

   constructor(props){
      super(props);
    this.state = {
        editUserData: {
            stateId:'',
            countryId:'',
            countryName:'',
            stateName:'',
            coverArea:'',
            loading:true,
            isActive:false
        }    
        ,
        editUserModal: false,
        menuVisible: false,
        search:''
        

    }
    
    }


    componentDidMount(){
        
        this.refreshData()
        
    }

    // componentDidUpdate(){
    //     if(this.props.AddDetails){
           
    //     }
    // }

    

    refreshData=()=>{
        console.log('data is refreshed')
        this.props.getDetails().then(() => this.setState({loading:false}));
        this.props.getCountry().then(() => this.setState({loading:false}));
        
        // this.props.updateDetails();
        // this.props.getDrop();
        // this.props.getSizeDrop();
        
    }

    toggleEditUserModal() {
        this.setState({
          editUserModal: ! this.state.editUserModal
        });
      }
    
      updateBook=()=> {
         let{ stateId,countryId,stateName} =this.state.editUserData;
         this.props.updateDetails(stateId,countryId,stateName).then(() => this.refreshData());
         

         this.setState({

            editUserModal:false ,loading:true, editUserData:{stateId:'',countryId:'',stateName:''}
         })
  
    
    }

    searchFilter(search) {
        return function (x) {
            return x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) ||
                x.stateName.toLowerCase().includes(search.toLowerCase()) ||!search;
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

      stateName =(e) =>{
         
        let{ editUserData } = this.state;

        editUserData.stateName = e.target.value;

        this.setState({editUserData})
        console.log(this.state.editUserData.stateName)
          
      }
      

      countryName = (e) => {
             let{ editUserData }= this.state
             editUserData.countryId = e.target.value
             this.setState({editUserData})
             console.log(this.state.editUserData.countryId)
        
      }
      
      editBook(stateId,countryName,stateName) {
          this.setState({
              editUserData:{stateId,countryName,stateName}, editUserModal: ! this.state.editUserModal
          })    
      }

        deleteUser(stateId){
            // this.setState({loading: true})
            let { isActive } = this.state.editUserData
            this.props.deleteDetails(stateId,isActive).then(()=>this.refereshData())
            // axios.put(`${URN}/state/delete/` + stateId, { isActive }, { headers: authHeader() })
            // .then(() => this.refreshData())
            .then(() => this.setState({isActive:false}));
            // this.setState({ editUserData: { isActive: false }})
            // .then(()=>{console.log('ereeere')
            //     this.props.getDetails()})    
    }

    fetchDetails=({country3})=> {
        console.log(country3)
        if(country3){
          
            return country3.filter(this.searchFilter(this.state.search)).map((item) => {
                
                return (
                    <tr key={item.stateId}>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.stateName}</td>
                        
                        {/* <td>{item.size_master.sizeType}</td> */}
                        
                        <td>
                            <Button color="success" size="sm" className="mr-2" 
                            onClick={this.editBook.bind(this, item.stateId,item.country_master.countryName, 
                            item.stateName)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.stateId)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }
    fetchDrop({country1}){
        console.log(country1)
        if(country1){
            
           return( 
            country1.map((item) =>{
                   return(
                       <option key={item.countryId} value={item.countryId}>
                        {item.countryName}
                       </option>
                   )
               })
           )
            
        }
    }
    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/statemaster')
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    onStateChange=(event)=>{
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    // searchFilter=(event)=>{
    //     const pattern = /^[a-zA-Z]+$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (!pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
        let tableData;
        tableData=<Table className="table table-bordered">
        
        <thead>
            <tr>
                <th>Country Name</th>
                <th>State Name</th>
                <th>Actions</th>

            </tr>
        </thead>
        <tbody>
            {this.fetchDetails(this.props.countryDetails)}
        </tbody>
       </Table>
       
       if(!this.props.countryDetails.country3 && !this.props.countryDetails.country1){
        tableData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner /></div>
    }
        return (
            <div>  
                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top  w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

                        <div className="top-details">
                                <h3>State Master Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Add State</Button>
                            </div>
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit Details</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="roles">CountryName</Label>
                                    <Input type="select"
                                    value={this.state.editUserData.countryId} onChange={this.countryName}>
                                        <option>{this.state.editUserData.countryName}</option>
                                        <option disabled>Select</option>
                                        {this.fetchDrop(this.props.countryDetails)}/>
                                        </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">StateName</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter state name"
                                        value={this.state.editUserData.stateName}
                                        onChange={this.stateName}
                                        maxLength='50'
                                        onKeyPress={this.onStateChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary" className="mr-2" onClick={this.updateBook} >Save</Button>
                                    <Button color="danger" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                </FormGroup>

                            </ModalBody>
                            
                            
                        </Modal>
                        <SearchFilter
                         type="text" 
                         value={this.state.search}
                         
                         onChange={this.searchOnChange} 
                        />
                            {!this.state.loading ? tableData : <Spinner />}
                       
                    </div>
                </UI>
                
                 
            </div>
        )
    }
}

function mapStateToProps(state) {
   
    return {
        countryDetails: state.countryDetails
        
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetails,
    
        getCountry,
        updateDetails,
        deleteDetails
        // AddDetails,
        // getDrop,
        // getSizeDrop
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
