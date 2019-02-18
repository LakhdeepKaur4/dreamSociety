import React, { Component } from 'react';
import { getDetails, AddDetails, getDrop, getSizeDrop,getPageDetails,noOfCount } from '../../actionCreators/flatMasterAction';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { authHeader } from '../../helper/authHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label,Input } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';
import { URN } from '../../actions/index'
import Pagination from "react-js-pagination";

class flatMasterDetails extends Component {
   constructor(props){
       super(props);
         this.state = {
        
        flatId: '',
        societyId: '',
        societyName: '',
        flatType: '',
        flatSuperArea: '',
        sizeId: '',
        sizeType: '',
        sizeType1: '',
        coverArea: '',
        loading:true,
        isActive: false,
        editUserModal: false,
        menuVisible: false,
        search: '',
        errors:{},
        activePage: '1',
        limit:'5'
        // itemsCountPerPage :1,
        // totalItemsCount:1
        }

   } 

    componentDidMount() {

        this.refreshData()

    }



    refreshData() {
        const defaultPage=this.state.activePage;
        this.props.getDetails(defaultPage).then(() => this.setState({loading:false}));
        this.props.getDrop().then(() => this.setState({loading:false}));
        this.props.getSizeDrop().then(() => this.setState({loading:false}));

    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    updateBook = (e) => {
        e.preventDefault();
        let { flatId, societyId, flatType, flatSuperArea,sizeId,  coverArea } = this.state

        let errors = {};
        if (!this.state.societyId) {
            errors.societyId = "Select Society Name Again"
        }
        if (flatType === '') errors.flatType = "Cant be empty";
        else if (flatType.length < 3) errors.flatType = "Characters should be less than four"
        if (flatSuperArea === '') errors.flatSuperArea = "Cant be empty";

        if (!this.state.sizeId) {
            errors.sizeId = "Select  SizeType Again";
        }
        if (coverArea === '') errors.coverArea = "Cant be empty";
        else if (parseInt(coverArea) >= parseInt(flatSuperArea)) errors.coverArea=
         "CoverArea cannot be greater then flatSuperArea";
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        if(isValid){
        
        axios.put(`${URN}/flat/` + flatId, {societyId,
             flatType, flatSuperArea,sizeId,
             coverArea   
        }, { headers: authHeader() }).then((response) => {
            this.refreshData();
        })
        this.setState({
            editUserModal: false,loading:true, flatId: '',societyId:'',
            flatType: '', flatSuperArea: '',sizeId:'', CoverArea: ''
        })
    }
        
    }
    onChange=(e)=>{
        console.log(this.state);
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

    searchFilter(search) {
        return function (x) {
            const flatSuperArea = x.flatSuperArea.toString();
            const coverArea = x.coverArea.toString()
            return x.society_master.societyName.toLowerCase().includes(search.toLowerCase()) ||
                x.flatType.toLowerCase().includes(search.toLowerCase()) ||
                flatSuperArea.toLowerCase().includes(search.toLowerCase()) ||
                x.size_master.sizeType.toLowerCase().includes(search.toLowerCase()) ||
                coverArea.toLowerCase().includes(search.toLowerCase()) ||
                !search;
            
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }


    editBook(flatId, societyName, flatType, flatSuperArea, sizeType, coverArea) {
        this.setState({
            flatId, societyName, flatType, flatSuperArea, sizeType, coverArea , editUserModal: !this.state.editUserModal
        })
    }

    deleteUser(flatId) {
        let { isActive } = this.state
        axios.put(`${URN}/flat/delete/` + flatId, { isActive }, { headers: authHeader() }).then((response) => {
            this.refreshData()
            this.setState({ isActive: false ,loading:true })

        })
    }

    fetchUsers({ list1 }) {
        
        if (list1) {
            console.log(list1);
            return list1.flat.filter(this.searchFilter(this.state.search)).map((item) => {
        
                     
                return (
                    
                    
                    <tr key={item.flatId}>
                        <td>{item.society_master.societyName}</td>
                        <td>{item.flatType}</td>
                        <td>{item.flatSuperArea}</td>
                        <td>{item.size_master.sizeType}</td>
                        <td>{item.coverArea}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2"
                                onClick={this.editBook.bind(this, item.flatId, item.society_master.societyName,
                                    item.flatType, item.flatSuperArea, item.size_master.sizeType, item.coverArea)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.flatId)} >Delete</Button>
                        </td>
                    </tr>
                )
        
            })
        }
    }
    fetchDrop({ list2 }) {
        if (list2) {

            return (
                list2.map((item) => {
                    return (
                        <option key={item.societyId} value={item.societyId}>
                            {item.societyName}
                        </option>
                    )
                })
            )

        }
    }

    fetchSizeDrop({ list3 }) {
        if (list3) {

            return (
                list3.map((item) => {
                    return (
                        <option key={item.sizeId} value={item.sizeId}>
                            {item.sizeType}
                        </option>
                    )
                })
            )

        }
    }
    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/flatmaster')
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    OnKeyPresshandlerPhone=(event)=>{
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    handlePageChange=(pageNumber)=> {
        console.log(`active page is ${pageNumber}`);
        // this.setState({activePage: pageNumber}) ;
        this.state.activePage=pageNumber;        
        const activePage=this.state.activePage;
        
            this.props.getPageDetails(activePage);
        
        
      
      }

    //   countPerPage=(e)=>{
    //        e.preventDefault();
    //   }

      onChange1=(e)=>{
            e.preventDefault();
            console.log('hii');
            // this.setState({itemsCountPerPage:e.target.value})
            const activePage=this.state.activePage;
            this.state.limit=e.target.value;
            console.log(this.state.limit,activePage)
            let countPerPage= parseInt(this.state.limit);
            this.props.noOfCount(countPerPage,activePage)
    }

    render() {
        let tableData;
       
        
        tableData=<Table className="table table-bordered">
        <thead>
            <tr>
                <th>Society Name</th>
                <th>Flat Type</th>
                <th>Flat SuperArea</th>
                <th>SizeType</th>
                <th>Cover Area</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.fetchUsers(this.props.flats)}
        </tbody>
        {/* <Pagination/> */}
       
    </Table>
   
   
    
     
     if(!this.props.flats.list1 && !this.props.flats.list2 && !this.props.flats.list3 ){
        tableData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner /></div>
    }
    <div>
        
    </div>
        
        return (
            <div>
                <UI onClick={this.logout}>
                        <div className="w3-container w3-margin-top  w3-responsive">
                        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                            <div className="top-details">                               
                             <h3>Flat Master Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Add Flats</Button>
                                </div>

                            
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="roles">SocietyName</Label>
                                    <Input type="select" 
                                    name="societyId"
                                            value={this.state.societyId} 
                                            onChange={this.onChange}>
                                            <option>{this.state.societyName}</option>
                                            <option disabled>Select</option>
                                            {this.fetchDrop(this.props.flats)}     
                                        </Input>
                                        <span  className='error'>{this.state.errors.societyId}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">flatType</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter  flat type"
                                        name="flatType"
                                        value={this.state.flatType}
                                        onChange={this.onChange} 
                                        maxLength='4'/>
                                        <span  className='error'>{this.state.errors.flatType}</span>
                                        
                                </FormGroup>
                                <FormGroup>
                                    <Label for="firstName">Flat Super Area</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter flat super area"
                                        name="flatSuperArea"
                                        value={this.state.flatSuperArea}
                                        onChange={this.onChange}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='3' />
                                        <span  className='error'>{this.state.errors.flatSuperArea}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">sizeType</Label>
                                    <Input type="select" 
                                    value={this.state.sizeId} 
                                    name="sizeId"
                                    onChange={this.onChange}>
                                        <option>{this.state.sizeType}</option>
                                        <option disabled>Select</option>
                                        {this.fetchSizeDrop(this.props.flats)}
                                    </Input>
                                    <span  className='error'>{this.state.errors.sizeId}</span>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Cover Area</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter cover area"
                                        name="coverArea"
                                        value={this.state.coverArea}
                                        onChange={this.onChange}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='3' />
                                        <span  className='error'>{this.state.errors.coverArea}</span>

                                </FormGroup>
                                <FormGroup>
                                <Button color="primary mr-2" onClick={this.updateBook}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                </FormGroup>
                            </ModalBody>
                            
                        </Modal>
                        <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                                 {/* <input type="number"
                                 placeholder="enter no of entries to display"
                                 onChange={this.onChange1}/> */}
                            {!this.state.loading ? tableData : <Spinner />}
                           
                            <Pagination 
                            // hideDisabled
                            
                             activePage={this.state.activePage}
                             itemsCountPerPage={this.state.limit}
                             totalItemsCount={11}
                            //  pageRangeDisplayed={5}
                             onChange={this.handlePageChange}
                             itemClass='page-item'
                             linkClasss='page-link'   />      
                          
                    </div>
                
                    
                </UI>
           
                <div>
        
      </div>
                
            </div>
           
        )
        
    }
   
}

function mapStateToProps(state) {

    return {
        flats: state.flats

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetails,
        AddDetails,
        getDrop,
        getSizeDrop,
        getPageDetails,
        noOfCount
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
