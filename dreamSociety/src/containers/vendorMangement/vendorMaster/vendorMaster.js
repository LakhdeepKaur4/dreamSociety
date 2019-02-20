
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType} from '../../../actionCreators/serviceMasterAction';
import { addVendorMaster,getRateType } from '../../../actionCreators/vendorMasterAction';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import UI from '../../../components/newUI/vendorDashboardInside';
// import ImageUploader from 'react-images-upload';



class vendorMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorName: '',
            contact:'',
            currentAddress:'',
            permanentAddress:'',                  
            serviceId1:{
                serviceId:'',
            },
            serviceId2:{
                serviceId:''
            },
            serviceId3:{
                serviceId:''
            },
            rateId1:{
                rateId:''
            },
            rateId2:{
                rateId:''
            },
            rateId3:{
                rateId:''
            },
            rate1:'',
            rate2:'',
            rate3:'',
            document:'',
            profilePicture:'',

            selectedFile:null,
            menuVisible: false
        }
        this.handleChange = this.handleChange.bind(this);

    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    selectImages=(e)=>{
        this.setState({
            profilePicture: e.target.files[0]
        })
       
    }

    selectImage=(e)=>{
        this.setState({
            document: e.target.files[0]
        })
       
    }


    // selectImages = (picture) => {console.log(picture)
    //     this.setState({
    //         profilePicture: picture.target.files[0]
    //     });
    //     console.log(this.state.profilePicture);
    //     }

    componentDidMount() {
        this.props.getServiceType();
        this.props.getRateType();


    }

    getDropDown = ({item}) => {
        if (item) {
            return item.map((item) => {
                return (
                    <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName + " | "+ item.service_detail_master.service_detail}
                    </option>
                )
            })
        }

    }

    

    getRate = ({rate}) => {
        if (rate) {
            return rate.rate.map((item) => {
                return (
                    <option key={item.rateId} value={item.rateId}>
                        {item.rateType}
                    </option>
                )
            })
        }

    }



    onSubmit = (event) => {console.log(event)
        event.preventDefault();
        this.props.addVendorMaster(this.state);
        this.setState(
            {
                vendorName: '',
                contact:'',
                currentAddress:'',
                permanentAddress:'',                  
                serviceId1:{
                    serviceId:'',
                },
                serviceId2:{
                    serviceId:''
                },
                serviceId3:{
                    serviceId:''
                },
                rateId1:{
                    rateId:''
                },
                rateId2:{
                    rateId:''
                },
                rateId3:{
                    rateId:''
                },
                rate1:'',
                rate2:'',
                rate3:'',
                document:'',
                profilePicture:''             
            }

        ) 
     
      
      
        

    }


    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }


    
   



    
    render() {
        return (
            <div>
                <UI onClick={this.logout}>

                    <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                        
                        <div style={{cursor:'pointer'}}  className="close" aria-label="Close" onClick={this.close}>
                         <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{textAlign:'center',  marginBottom: '10px'}}>Add Vendor</h3></div>

                            <FormGroup>
                                <Label>Vendor Name</Label>
                                <Input type="text"  placeholder="Vendor Name"  name="vendorName"  maxLength={20} value={this.state.vendorName}  onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  required />
                            </FormGroup>
                            
                            
                            <FormGroup>
                                <Label>Current Address</Label>
                                <Input type="text"  placeholder="Current Address"  name="currentAddress"  maxLength={50} value={this.state.currentAddress}  onChange={this.handleChange}  required />
                            </FormGroup>

                            
                            <FormGroup>
                                <Label>Permanent Address</Label>
                                <Input type="text"  placeholder="Permanent Address"  name="permanentAddress"  maxLength={50} value={this.state.permanentAddress}  onChange={this.handleChange}  required />
                            </FormGroup>

                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input type="text"  placeholder="Contact Number"  name="contact"  maxLength={10} value={this.state.contact}  onChange={this.handleChange}  required />
                            </FormGroup>

                                <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label> Service Type 1</Label>
                                        <Input type="select" name="serviceId1" value={this.state.serviceId1.serviceId} onChange={(e) => {
                                            this.setState({serviceId1:{ serviceId:  e.target.value }})
                                            }} required >
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getDropDown(this.props.displayServiceMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label> Rate Type 1</Label>
                                        <Input type="select" name="rateId1" value={this.state.rateId1.rateId} onChange={(e) => {
                                            this.setState({rateId1:{ rateId:  e.target.value }})
                                            }} required>
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getRate(this.props.vendorMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label> Rate 1</Label>
                                        <Input type="text"  placeholder="Rate"  name="rate1"  maxLength={4} value={this.state.rate1}  onChange={this.handleChange}  required />
                                    </FormGroup>
                                </Col>
                                </Row>

                                <Row form>
                                 <Col md={6}>
                                    <FormGroup>
                                        <Label> Service Type 2</Label>
                                        <Input type="select" name="serviceId2" value={this.state.serviceId2.serviceId} onChange={(e) => {
                                            this.setState({serviceId2:{ serviceId:  e.target.value }})
                                            }} required >
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getDropDown(this.props.displayServiceMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                               
                                <Col md={4}>
                                    <FormGroup>
                                        <Label> Rate Type 2</Label>
                                        <Input type="select" name="rateId2"  value={this.state.rateId2.rateId} onChange={(e) => {
                                            this.setState({rateId2:{ rateId:  e.target.value }})
                                            }} required>
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getRate(this.props.vendorMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label> Rate 2</Label>
                                        <Input type="text"  placeholder="Rate"  name="rate2"  maxLength={4} value={this.state.rate2}  onChange={this.handleChange}  required />
                                    </FormGroup>
                                </Col>
                                </Row>

                                <Row form>
                                <Col md={6}>
                                <FormGroup>
                                        <Label> Service Type 3</Label>
                                        <Input type="select" name="serviceId3" value={this.state.serviceId3.serviceId} onChange={(e) => {
                                            this.setState({serviceId3:{ serviceId:  e.target.value }})
                                            }} required >
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getDropDown(this.props.displayServiceMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                <FormGroup>
                                        <Label> Rate Type 3</Label>
                                        <Input type="select" name="rateId3"  value={this.state.rateId3.rateId} onChange={(e) => {
                                            this.setState({rateId3:{ rateId:  e.target.value }})
                                            }} required>
                                            <option value="" disabled  selected>--Select--</option>
                                            {this.getRate(this.props.vendorMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label> Rate 3</Label>
                                        <Input type="text"  placeholder="Rate"  name="rate3"  maxLength={4} value={this.state.rate3}  onChange={this.handleChange}  required />
                                    </FormGroup>
                                </Col>
                                </Row>

                                <FormGroup>
                                <Label>Upload Your Id</Label>
                                <Input type="file" name="document" accept='.doc,application/pdf' onChange={this.selectImage}  required />
                                
                            </FormGroup>

                            <FormGroup>
                                <Label>Upload Your Picture</Label>
                                <Input type="file" name="profilePicture"  accept="image/*"  onChange={this.selectImages}  required />
                                <p className="text-info">{this.state.message}</p>
                            </FormGroup>
                            
                       
                            <FormGroup>
                                <Button color="success">Submit</Button>
                            </FormGroup>
                   
                    </Form>
                            
{/* 
                           
                            <div className="mt-4">
                                <Button type="submit" color="success"  className="mr-2" value="submit">Submit</Button>

                                <Link  to='/superDashboard/displayVendorMaster'>
                                    <Button color="danger"  className="btn">Cancel</Button>
                                </Link>
                            </div> */}
                        
       
                </UI>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        vendorMasterReducer: state.vendorMasterReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ getServiceType, addVendorMaster,getRateType}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(vendorMaster);

