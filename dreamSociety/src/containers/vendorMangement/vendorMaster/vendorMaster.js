
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { addVendorMaster, getRateType } from '../../../actionCreators/vendorMasterAction';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import UI from '../../../components/newUI/vendorDashboardInside';




class vendorMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorName: '',
            contact: '',
            currentAddress: '',
            permanentAddress: '',
            serviceId1: {
                serviceId: '',
            },
            serviceId2: {
                serviceId: ''
            },
            serviceId3: {
                serviceId: ''
            },
            rateId1: {
                rateId: ''
            },
            rateId2: {
                rateId: ''
            },
            rateId3: {
                rateId: ''
            },
            rate1: '',
            rate2: '',
            rate3: '',
            documentOne: null,
            documentTwo:null,
            profilePicture: '',
            loading:false,
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

    selectImages = (e) => {
        this.setState({
            profilePicture: e.target.files[0]
        })

    }

    selectImage = (e) => {
        this.setState({
            documentOne: e.target.files[0]
        })

    }
     
    selectImage2=(e)=>{
        this.setState({
            documentTwo: e.target.files[0]
        })
    }

  

    componentDidMount() {
        this.props.getServiceType();
        this.props.getRateType();


    }
    
    push=()=>{
        this.props.history.push('/superDashboard/displayVendorMaster')
    }

    getDropDown = ({ item }) => {
        if (item) {
            return item.map((item) => {
                return (
                    <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName + " | " + item.service_detail_master.service_detail}
                    </option>
                )
            })
        }

    }



    getRate = ({ rate }) => {
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



    onSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData=new FormData();
        formData.append('vendorName',this.state.vendorName)
        formData.append('contact',this.state.contact)
        formData.append('currentAddress',this.state.currentAddress)
        formData.append('permanentAddress',this.state.permanentAddress)
        formData.append('serviceId1',this.state.serviceId1.serviceId)
        formData.append('serviceId2',this.state.serviceId2.serviceId)
        formData.append('serviceId3',this.state.serviceId3.serviceId)
        formData.append('rateId1',this.state.rateId1.rateId)
        formData.append('rateId2',this.state.rateId2.rateId)
        formData.append('rateId3',this.state.rateId3.rateId)
        formData.append('rate1',this.state.rate1)
        formData.append('rate2',this.state.rate2)
        formData.append('rate3',this.state.rate3)
        formData.append('profilePicture',this.state.profilePicture,this.state.profilePicture.name)
        formData.append('documentOne',this.state.documentOne,this.state.documentOne.name)
        formData.append('documentTwo',this.state.documentTwo,this.state.documentTwo.name)      
        this.props.addVendorMaster(formData).then(()=>this.push());
        this.setState({loading:true});

    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close = () => {
        return this.props.history.replace('/superDashBoard')
    }








    render() {
        console.log("==================", this.state)
        return (
            <div>
                <UI onClick={this.logout}>

                    <Form onSubmit={this.onSubmit} >

                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Vendor</h3></div>

                        <FormGroup>
                            <Label>Vendor Name</Label>
                            <Input type="text" placeholder="Vendor Name" name="vendorName" maxLength={20} value={this.state.vendorName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange} required />
                        </FormGroup>


                        <FormGroup>
                            <Label>Current Address</Label>
                            <Input type="text" placeholder="Current Address" name="currentAddress" maxLength={50} value={this.state.currentAddress} onChange={this.handleChange} required />
                        </FormGroup>


                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="text" placeholder="Permanent Address" name="permanentAddress" maxLength={50} value={this.state.permanentAddress} onChange={this.handleChange} required />
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input type="text" placeholder="Contact Number" name="contact" maxLength={10} value={this.state.contact} onChange={this.handleChange} required />
                        </FormGroup>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label> Service Type 1</Label>
                                    <Input type="select" name="serviceId1" value={this.state.serviceId1.serviceId} onChange={(e) => {
                                        this.setState({ serviceId1: { serviceId: e.target.value } })
                                    }} required >
                                        <option value="" disabled selected>--Select--</option>
                                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label> Rate Type 1</Label>
                                    <Input type="select" name="rateId1" value={this.state.rateId1.rateId} onChange={(e) => {
                                        this.setState({ rateId1: { rateId: e.target.value } })
                                    }} required>
                                        <option value="" disabled selected>--Select--</option>
                                        {this.getRate(this.props.vendorMasterReducer)}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label> Rate 1</Label>
                                    <Input type="text" placeholder="Rate" name="rate1" maxLength={4} value={this.state.rate1} onChange={this.handleChange} required />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label> Service Type 2</Label>
                                    <Input type="select" name="serviceId2" value={this.state.serviceId2.serviceId} onChange={(e) => {
                                        this.setState({ serviceId2: { serviceId: e.target.value } })
                                    }} required >
                                        <option value="" disabled selected>--Select--</option>
                                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label> Rate Type 2</Label>
                                    <Input type="select" name="rateId2" value={this.state.rateId2.rateId} onChange={(e) => {
                                        this.setState({ rateId2: { rateId: e.target.value } })
                                    }} required>
                                        <option value="" disabled selected>--Select--</option>
                                        {this.getRate(this.props.vendorMasterReducer)}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label> Rate 2</Label>
                                    <Input type="text" placeholder="Rate" name="rate2" maxLength={4} value={this.state.rate2} onChange={this.handleChange} required />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label> Service Type 3</Label>
                                    <Input type="select" name="serviceId3" value={this.state.serviceId3.serviceId} onChange={(e) => {
                                        this.setState({ serviceId3: { serviceId: e.target.value } })
                                    }} required >
                                        <option value="" disabled selected>--Select--</option>
                                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label> Rate Type 3</Label>
                                    <Input type="select" name="rateId3" value={this.state.rateId3.rateId} onChange={(e) => {
                                        this.setState({ rateId3: { rateId: e.target.value } })
                                    }} required>
                                        <option value="" disabled selected>--Select--</option>
                                        {this.getRate(this.props.vendorMasterReducer)}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label> Rate 3</Label>
                                    <Input type="text" placeholder="Rate" name="rate3" maxLength={4} value={this.state.rate3} onChange={this.handleChange} required />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label>Upload Your Id</Label>
                            <Input type="file" name="documentOne"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage} required  />

                        </FormGroup>

                        <FormGroup>
                            <Label>Upload Another Id</Label>
                            <Input type="file" name="documentTwo"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage2} required  />

                        </FormGroup>

                        <FormGroup>
                            <Label>Upload Your Picture</Label>
                            <Input type="file" name="profilePicture" accept="image/*" onChange={this.selectImages} required />
                        
                        </FormGroup>


                    
                            <Button color="success" className="mr-2">Submit</Button>
                     
                        <Button color="danger" onClick={this.push}>Cancel</Button>

                    </Form>

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

    return bindActionCreators({ getServiceType, addVendorMaster, getRateType }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(vendorMaster);

