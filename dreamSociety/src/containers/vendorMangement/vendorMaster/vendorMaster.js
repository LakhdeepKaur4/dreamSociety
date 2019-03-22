import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { addVendorMaster, getRateType,getVendorMaster } from '../../../actionCreators/vendorMasterAction';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import UI from '../../../components/newUI/vendorDashboardInside';
import DefaultSelect from '../../../constants/defaultSelect';



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
            documentOne: '',
            documentTwo:'',
            profilePicture: '',
            loading:false,
            menuVisible: false,
            errors:{}
            
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
    
    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    handleChange(e) {
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({[e.target.name]:e.target.value});
            }
    }

    onRateChange=(e)=>{
    if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
        this.setState({[e.target.name]:e.target.value});
        
    }}

    onServiceChange1 =(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ serviceId1: { serviceId: e.target.value } })
        }
    }

    onServiceChange2 =(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ serviceId2: { serviceId: e.target.value } })
        }
    }

    onServiceChange3 =(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ serviceId3: { serviceId: e.target.value } })
        }
    }

    onRateChange1=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ rateId1: { rateId: e.target.value } })
        }
    }

    onRateChange2=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ rateId2: { rateId: e.target.value } })
        }
    }

    onRateChange3=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value.errors});
        }
        else{
            this.setState({ rateId3: { rateId: e.target.value } })
        }
    }


    selectImages = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.files[0],errors});
        }
        else{
        this.setState({
            profilePicture: e.target.files[0]
        })
    }
    }

    selectImage = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.files[0],errors});
        }
        else{
        this.setState({
            documentOne: e.target.files[0]
        })
    }
    }
     
    selectImage2=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.files[0],errors});
        }
        else{
        this.setState({
            documentTwo: e.target.files[0]
        })
    }
    }

  

    componentDidMount() {
        this.refreshData();
    }
    
    refreshData=()=>{
        this.props.getVendorMaster();
        this.props.getServiceType();
        this.props.getRateType();
    }

    push=()=>{
        this.props.history.push('/superDashboard/displayVendorMaster');
     
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
        let errors = {};
        if(this.state.vendorName===''){
            errors.vendorName="Vendor Name can't be empty"
        }
           else if(this.state.currentAddress===''){
                errors.currentAddress="Current Address can't be empty"
            }
            else if(this.state.permanentAddress===''){
                errors.permanentAddress="Permanent Address can't be empty"
            }
            else if(this.state.contact===''){
                errors.contact="Contact can't be empty"                
            }
            else if(this.state.serviceId1.serviceId===''){
                errors.serviceId1="Service Id1 can't be empty"
            }      
            else if(this.state.rateId1.rateId===''){
                errors.rateId1="Rate Id1 can't be empty"
            }       
            else if(this.state.rate1===''){
                errors.rate1="Rate1 can't be empty"
            }
            else if(this.state.serviceId2.serviceId===''){
                errors.serviceId2="Service Id2 can't be empty"
            } 
            else if(this.state.rateId2.rateId===''){
                errors.rateId2="Rate Id2 can't be empty"
            }   
            else if(this.state.rate2===''){
                errors.rate2="Rate2 can't be empty"
            }
            else if(this.state.serviceId3.serviceId===''){
                errors.serviceId3="Service Id3 can't be empty"
            } 
            else if(this.state.rateId3.rateId===''){
                errors.rateId3="Rate Id3 can't be empty"
            }  
            else if(this.state.rate3===''){
                errors.rate3="Rate3 can't be empty"
            }
            else if(this.state.documentOne===''){
                errors.documentOne="Document One can't be empty"
            }
            else if(this.state.documentTwo===''){
                errors.documentTwo="Document Two can't be empty"
            }
            else if(this.state.profilePicture===''){
                errors.profilePicture="Picture can't be empty"
            }
        const formData=new FormData();
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
        this.setState({loading: true})
        
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
        this.refreshData();

        }
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
                            <Input type="text" placeholder="Vendor Name" name="vendorName" maxLength={20} value={this.state.vendorName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  />
                            <span className="error">{this.state.errors.vendorName}</span>
                        </FormGroup>


                        <FormGroup>
                            <Label>Current Address</Label>
                            <Input type="text" placeholder="Current Address" name="currentAddress" maxLength={50} value={this.state.currentAddress} onChange={this.handleChange} />
                            <span className="error">{this.state.errors.currentAddress}</span>
                        </FormGroup>


                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="text" placeholder="Permanent Address" name="permanentAddress" maxLength={50} value={this.state.permanentAddress} onChange={this.handleChange} />
                            <span className="error">{this.state.errors.permanentAddress}</span>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input type="text" placeholder="Contact Number" name="contact" maxLength={10} onKeyPress={this.OnKeyPresshandlerPhone} value={this.state.contact} onChange={this.handleChange} />
                            <span className="error">{this.state.errors.contact}</span>
                        </FormGroup>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label> Service Type 1</Label>
                                    <Input type="select" name="serviceId1" defaultValue='no-value'  onChange={this.onServiceChange1} >
                                        <DefaultSelect/>
                                        {this.getDropDown(this.props.displayServiceMasterReducer)}                                    
                                    </Input>
                                    <span className="error">{this.state.errors.serviceId1}</span>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label> Rate Type 1</Label>
                                    <Input type="select" name="rateId1" defaultValue='no-value' onChange={this.onRateChange1}>                                     
                                         <DefaultSelect/>
                                        {this.getRate(this.props.vendorMasterReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.rateId1}</span>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label> Rate 1</Label>
                                    <Input type="text" placeholder="Rate" name="rate1" maxLength={4}  value={this.state.rate1} onChange={this.onRateChange}/>
                                    <div>{!this.state.rate1 ? <span className="error">{this.state.errors.rate1}</span>: null}</div>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label> Service Type 2</Label>
                                    <Input type="select" name="serviceId2" defaultValue='no-value'onChange={this.onServiceChange2} >
                                        <DefaultSelect/>
                                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.serviceId2}</span>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label> Rate Type 2</Label>
                                    <Input type="select" name="rateId2" defaultValue='no-value'  onChange={this.onRateChange2}>
                                         <DefaultSelect/>
                                        {this.getRate(this.props.vendorMasterReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.rateId2}</span>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label> Rate 2</Label>
                                    <Input type="text" placeholder="Rate" name="rate2" maxLength={4} value={this.state.rate2}onChange={this.onRateChange}/>
                                    <div>{!this.state.rate2 ? <span className="error">{this.state.errors.rate2}</span>: null}</div>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label> Service Type 3</Label>
                                    <Input type="select" name="serviceId3" defaultValue='no-value' onChange={this.onServiceChange3} >
                                        <DefaultSelect/>
                                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.serviceId3}</span>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label> Rate Type 3</Label>
                                    <Input type="select" name="rateId3" defaultValue='no-value'   onChange={this.onRateChange3}>
                                         <DefaultSelect/>
                                        {this.getRate(this.props.vendorMasterReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.rateId3}</span>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label> Rate 3</Label>
                                    <Input type="text" placeholder="Rate" name="rate3"  maxLength={4} value={this.state.rate3} onChange={this.onRateChange}/>
                                    <div>{!this.state.rate3 ? <span className="error">{this.state.errors.rate3}</span>: null}</div>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label>Upload Your Id</Label>
                            <Input type="file" name="documentOne"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage}/>
                            <span className="error">{this.state.errors.documentOne}</span>
                        </FormGroup>

                        <FormGroup>
                            <Label>Upload Another Id</Label>
                            <Input type="file" name="documentTwo"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage2}/>
                            <span className="error">{this.state.errors.documentTwo}</span>
                        </FormGroup>

                        <FormGroup>
                            <Label>Upload Your Picture</Label>
                            <Input type="file" name="profilePicture" accept="image/*" onChange={this.selectImages} />
                            <span className="error">{this.state.errors.profilePicture}</span>
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

    return bindActionCreators({ getServiceType, addVendorMaster, getRateType ,getVendorMaster}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(vendorMaster);

