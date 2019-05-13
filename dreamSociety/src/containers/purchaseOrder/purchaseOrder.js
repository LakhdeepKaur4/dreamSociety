import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import { getVendorMaster} from '../../actionCreators/vendorMasterAction';
import { Form,FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import DefaultSelect from './../../constants/defaultSelect';
class PurchaseOrder extends Component {
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
      vendorList=({vendors})=>{
          console.log(vendors)
        if (vendors && vendors.vendor) {
            return vendors.vendor.map((item) => {
                return (
                    <option key={item.vendorId} value={item.vendorId}>{item.firstName+" "+item.lastName}</option>
                )
            })
        } 
      }
    componentDidMount(){
        this.props.getVendorMaster()
    }
    onVendorChangeHandler=()=>{

    }
    render() {
        return (
            <div>
               <UI  onClick={this.logout} change={this.changePassword}>
               <Form onSubmit={this.onSubmit} style={{width: '1100px'}}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                            <h3>Purchase Order</h3> 
                            <FormGroup>
                                <Label>Vendor Name</Label>
                                <Input type="select" defaultValue='no-value' onChange={this.onVendorChangeHandler} name="assetId" style={{ 'textTransform': 'capitalize' }}>
                                 <DefaultSelect/>
                                {this.vendorList(this.props.vendorMasterReducer)}
                              </Input>
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                            <FormGroup>
                                <Label>Address</Label>
                                <Input type='textarea' readOnly/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input type='text' readOnly/>
                            </FormGroup>
                            </Col>
                            </Row>
                            <FormGroup>
                               <h3>Select AnyOne</h3>
                                <Label style={{marginRight:'40px'}}>Assets</Label>
                                <Input type="radio" name="asset"/>
                                </FormGroup>
                                <FormGroup>
                                <Label style={{marginRight:'35px'}}>Service</Label>
                                <Input type="radio" name="service"/>
                            </FormGroup> 
                    <FormGroup>
                        
                            <Table>
                                <tr>
                                    <th>S.no.</th>
                                    <th>Asset</th>
                                    <th>Asset Type</th>
                                    <th>Rate</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Date Of Delivery</th>
                                </tr>
                                <tr>
                                    <td style={{width:'30px'}}>1</td>
                                    <td><input type='select' style={{width:'150px'}}></input></td>
                                    <td><input type='select' style={{width:'150px'}}></input></td>
                                    <td><input type='select' style={{width:'50px'}}></input></td>
                                    <td><input type='select' style={{width:'50px'}}></input></td>
                                    <td><input type='select' style={{width:'80px'}} readOnly></input></td>
                                    <td><input type='date'></input></td>
                                </tr>
                            </Table>
                      
                    </FormGroup>
                </Form>             
               </UI> 
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        vendorMasterReducer: state.vendorMasterReducer,
    }
}
function mapDispatchToProps(dispatch){
  return  bindActionCreators({getVendorMaster},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PurchaseOrder);