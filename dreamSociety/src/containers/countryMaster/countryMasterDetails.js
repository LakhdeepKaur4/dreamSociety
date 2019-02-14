import { URN } from '../../actions/index';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { getCountry,updateCountry,deleteCountry } from '../../actionCreators/countryAction';
import { authHeader } from '../../helper/authHeader';
import { bindActionCreators } from 'redux';
import { Table, Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Label,Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';

class CountryDetails extends Component{

    constructor(){
        super();
       this.state = {
            
                countryId:'',
                countryName:'',
                code:'',
                currency:'',
                phoneCode:'',
                loading:true,
                isActive:false ,
                editUserModal: false,
                 menuVisible: false,
                 search: '',
                 errors:''
        }
    }

   componentDidMount(){
       this.refreshData()
   }

     refreshData(){
    this.props.getCountry().then(() => this.setState({loading:false}));
    }  

    toggleEditUserModal() {
        this.setState({
          editUserModal: ! this.state.editUserModal
        });
      }

    editCountry(countryId,countryName,code,currency,phoneCode) {
        this.setState({
            countryId,countryName,code,currency,phoneCode, editUserModal: ! this.state.editUserModal
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


    updateBook=(e)=> {
        
        e.preventDefault();
        let { countryId, countryName, code, currency,phoneCode} = this.state

        let errors = {};
        
        if (countryName === '') errors.countryName = "Cant be empty";
       
        if (code === '') errors.code = "Cant be empty";

        if (currency === '') errors.currency = "Cant be empty";

       
        if (phoneCode === '') errors.phoneCode = "Cant be empty";
        
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        if(isValid){
        this.props.updateCountry(countryId,countryName,code,currency,phoneCode).then(() => this.refreshData());;
  
         this.setState({
           editUserModal: false,loading:true, countryId: '',countryName:'',code:'',currency:'', phoneCode: '' 
       })
    }
   
   }
    onChange=(e)=>{
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            console.log('hii');
            this.setState( {[e.target.name]: [e.target.value]});
         }

        console.log(this.state)
    }

    deleteUser(countryId){
        this.setState({loading:true});
        let { isActive } = this.state
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
  

    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z.]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onKeyPressHandle1=(event)=>{
        const pattern = /^[a-zA-Z$]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandle=(event)=> {
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }   
    onKeyPressCode=(event)=>{
        const pattern = /^[A-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/countrymaster')
    }

    render(){
         let tableData;
          tableData= <Table className="table table-bordered">
        <thead>
            <tr>
                <th>Country Name</th>
                <th>Country Code</th>
                <th>Currency</th>
                <th>Phone Code</th>
                <th>Action</th>
                


            </tr>
        </thead>
        <tbody>
            {this.getCountryDetails(this.props.countryDetails)}
        </tbody>
    </Table>

    if(!this.props.countryDetails.country1){
    tableData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner /></div>
}
        return(
            <div>
                <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                        <div className="top-details">
                                <h3>Country Master Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Add Country</Button>
                            </div>
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="roles">countryName</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter countryName"
                                        name="countryName"
                                        value={this.state.countryName}
                                        maxLength='20'
                                        onKeyPress={this.onKeyPressHandler}
                                        onChange={this.onChange}
                                         />
                                         <span  className='error'>{this.state.errors.countryName}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">code</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter code"
                                        name="code"
                                        value={this.state.code}
                                        maxLength='3'
                                        onKeyPress={this.onKeyPressCode}
                                        onChange={this.onChange} />
                                         <span  className='error'>{this.state.errors.code}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="firstName">currency</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter currency"
                                        name="currency"
                                        value={this.state.currency}
                                        onKeyPress={this.onKeyPressHandle1}
                                        maxLength='10'
                                        onChange={this.onChange} />
                                         <span  className='error'>{this.state.errors.currency}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">phoneCode</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter currency"
                                        name="phoneCode"
                                        value={this.state.phoneCode}
                                        maxLength='3'
                                        onKeyPress = {this.onKeyPressHandle}
                                        onChange={this.onChange} />
                                         <span  className='error'>{this.state.errors.phoneCode}</span>
                                </FormGroup>
                                <FormGroup>
                                <Button color="primary mr-2" onClick={this.updateBook}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                </FormGroup>
                            </ModalBody>
                           
                        </Modal>
                        <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {!this.state.loading ? tableData : <Spinner />}
                       
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