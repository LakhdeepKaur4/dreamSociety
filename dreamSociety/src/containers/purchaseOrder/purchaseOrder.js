import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from 'react-select';
import { PlaceHolder } from '../../actionCreators/index';
import UI from '../../components/newUI/superAdminDashboard';
import { getVendorMaster} from '../../actions/vendorMasterAction';
import { Form,FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { fetchAssets} from '../../actions/assetsSubAction';

class PurchaseOrder extends Component {
    constructor(){
        super()
        this.state={
            vendorId:'',
            vendorAddress:'',
            vendorContact:'',
            asset:false,
            service:false
        }
    }
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
        // if (vendors && vendors.vendor) {
        //     return vendors.vendor.map((item) => {
        //         return (
        //             <option key={item.vendorId} value={item.vendorId}>{item.firstName+" "+item.lastName}</option>
        //         )
        //     })
        // } 
        if(vendors && vendors.vendor){
            return (
                vendors && vendors.vendor.map((item)=>{
                   return ({ ...item, label:item.firstName+" "+item.lastName, value:item.vendorId})
               })
            )
        }
      }
    componentDidMount(){
        this.props.getVendorMaster();
        this.props.fetchAssets();
    }
    onVendorChangeHandler=(selectOption)=>{
        this.setState({
            vendorId:selectOption.vendorId,
            vendorAddress:selectOption.permanentAddress,
            vendorContact:selectOption.contact
        })   
    }
    getAsset=({getAssetsType})=>{
        console.log(getAssetsType)
        if(getAssetsType && getAssetsType.assetsType){
            return (
              getAssetsType.assetsType.map((item)=>{
                  console.log(item)
                    return ({...item, label:item.asset_master.assetName ,value:item.asset_master.assetId})
                })
            )
        }
    }
    getAssetType=({getAssetsType})=>{
        console.log(getAssetsType)
        if(getAssetsType && getAssetsType.assetsType){
            return (
              getAssetsType.assetsType.map((item)=>{
                  console.log(item)
                    return ({...item, label:item.assetType ,value:item.assetId})
                })
            )
        }
    }
    onAssetsChangeHandler=(selectOption)=>{
        console.log(selectOption)
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
                              <Select options= {this.vendorList(this.props.vendorMasterReducer)}
                               onChange={this.onVendorChangeHandler.bind(this)}
                              placeholder={PlaceHolder} />
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                            <FormGroup>
                                <Label>Address</Label>
                                <Input type='textarea' readOnly value={this.state.vendorAddress}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input type='text' readOnly value={this.state.vendorContact}/>
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
                        
                            {/* <Table>
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
                                    <td><input type='select' style={{width:'150px'}}/></td>
                                    <td><input type='select' style={{width:'150px'}}></input></td>
                                    <td><input type='text' style={{width:'50px'}}></input></td>
                                    <td><input type='text' style={{width:'50px'}}></input></td>
                                    <td><input type='text' style={{width:'80px'}} readOnly></input></td>
                                    <td><input type='date'></input></td>
                                </tr>
                               
                            </Table> */}
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={4}>
                     <Label>Asset</Label>  
                     <Select options={this.getAsset(this.props.ListOfAssets)}
                     onChange={this.onAssetsChangeHandler.bind(this)}
                     />
                     </Col> 
                     <Col md={4}>
                     <Label>Asset Type</Label>  
                     <Select options={this.getAssetType(this.props.ListOfAssets)}
                     onChange={this.onAssetsChangeHandler.bind(this)}
                     />
                     </Col> 
                     </Row>
                    </FormGroup>
                </Form>             
               </UI> 
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state.AssetsTypeReducer)
    return{
        ListOfAssets: state.AssetsTypeReducer,
        vendorMasterReducer: state.vendorMasterReducer,
    }
}
function mapDispatchToProps(dispatch){
  return  bindActionCreators({getVendorMaster,fetchAssets},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PurchaseOrder);