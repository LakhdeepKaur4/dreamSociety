import React,{Component} from 'react';
import {getFlatDetails,getFlatType,getTowerName} from '../../actionCreators/flatDetailMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import  axios from 'axios';
import {authHeader} from '../../helper/authHeader';
import {URN} from '../../actions/index';


class flatDetails extends Component{
        
    state={
        editFlatData:{
            flatDetailId:'',
            flatNo:'',
            flatId:'',
            flatType:'',
            floor:'',
            towerId:'',
            towerName:'',
            isActive: false
    },
    editFlatModal: false
}


componentDidMount(){
    this.props.getFlatDetails();
    this.props.getFlatType();
    this.props.getTowerName();
}


componentWillMount(){
    this.refreshData()
}

refreshData(){
     this.props.getFlatDetails();
}

  
edit(flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName){console.log("ttttttttt",towerName)
    this.setState({
        editFlatData:{
            flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName},editFlatModal: !this.state.editFlatModal
    })

}


updateDetails(){
    let { flatNo,flatId,flatType,floor,towerId,towerName} = this.state.editFlatData;
    
    axios.put(`${URN}/flatDetail/` + this.state.editFlatData.flatDetailId, {
        flatNo,flatId,flatType,floor,towerId,towerName
    },{headers:authHeader()}).then((response) => {
      this.refreshData();
           
      this.setState({
        editFlatModal: false, editFlatData: {flatDetailId:'', flatNo:'',flatId:'',flatType:'',floor:'',towerId:'',towerName:''}
      })
    });
}  

delete(flatDetailId){
    let{isActive}=this.state.editFlatData;
    axios.put(`${URN}/flatDetail/delete/` +flatDetailId,{isActive},{headers:authHeader()}).then((response)=>{
        this.refreshData();
        this.setState({
            editFlatData:{isActive:false}
        })
    })
}

toggleEditFlatModal(){
    this.setState({
        editFlatModal: ! this.state.editFlatModal
    });
}

getDropdown1 =({type})=>{
    console.log('hhhhhhhhhhhhhhhhhh',type)
    if(type){
        return type.map((item)=>{
            console.log('hhhhhhhhhhhhhhhhhh',item.flatType)
            return(
                <option key={item.flatId} value={item.flatType}>
                {item.flatType}
                </option>
            )
        })
    }
}


getDropdown2 =({name})=>{
    console.log(name)
    if(name){
        return name.map((item)=>{
            return(
                <option key={item.towerId} value={item.towerId}>
                {item.towerName}
                </option>
            )
        })
    }
}

push=()=>{
    this.props.history.push('/superDashboard/flatDetailMaster')
}

renderList =({details})=>{
    
    if(details){
        return details.flatDetail.map((item,j) =>{
        
            return(
                   
                    <tr  key={j}>
                                          
                            <td>{item.flatNo}</td>
                            <td>{item.flat_master.flatType}</td>
                            <td>{item.floor}</td>
                            <td>{item.tower_master.towerName}</td>
                            
                                <td>
                                   <button className="btn btn-primary" onClick={this.edit.bind(this,item.flatDetailId,item.flatNo,item.flatId,item.flat_master.flatType,item.floor,item.towerId,item.tower_master.towerName)} >Edit</button>
                                </td>
                                 <td>
                                   <button className="btn btn-danger" onClick={this.delete.bind(this, item.flatDetailId)}>Delete</button>
                                 </td>  
                    </tr>
       
            )
        })
    }  
}    

render(){
    return(
        <div>
             <Modal isOpen={this.state.editFlatModal} toggle={this.toggleEditFlatModal.bind(this)}>
                 <ModalHeader toggle={this.toggleEditFlatModal.bind(this)}>Edit Details</ModalHeader>
                     <ModalBody>
                        <FormGroup>
                            <Label for="flatNo">Flat No</Label>
                            <Input id="flatNo" value={this.state.editFlatData.flatNo} onChange={(e) => {
                            let { editFlatData } = this.state;

                            editFlatData.flatNo = e.target.value;

                             this.setState({ editFlatData });
                             }} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="flatType">Flat Type</Label>
                            <Input type="select"  id="flatType" value={this.state.editFlatData.flatId}  onChange={(e)=>{
                                let {editFlatData}=this.state;

                                editFlatData.flatId=e.target.value;

                                this.setState({editFlatData})
                                }}
                                
                                >
                               <option disabled>--Select--</option>
                               {this.getDropdown1(this.props.flatDetailMasterReducer)}
                             </Input>   
      
                          
                        </FormGroup>
                        <FormGroup>
                            <Label for="floor">Floor</Label>
                            <Input id="floor" value={this.state.editFlatData.floor} onChange={(e) => {
                                 let { editFlatData } = this.state;

                                    editFlatData.floor = e.target.value;

                                    this.setState({ editFlatData });
                                 }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="towerName">Tower Name</Label>
                            <Input type="select"  id="towerName" value={this.state.editFlatData.towerId} onChange={(e)=>{
                                let {editFlatData}=this.state;

                                editFlatData.towerId=e.target.value;

                                this.setState({editFlatData})
                                }}>
                               <option disabled>--Select--</option>
                               {this.getDropdown2(this.props.flatDetailMasterReducer)}
                             </Input>  
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                         <Button color="primary" onClick={this.updateDetails.bind(this)}>Update </Button>
                         <Button color="secondary" onClick={this.toggleEditFlatModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
             </Modal>
   
            
            <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Flat No</th>
                        <th>Flat Type</th>
                        <th>Floor</th>
                        <th>Tower Name</th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {this.renderList(this.props.flatDetailMasterReducer)}
                    </tbody>
                </table>    
                
                <button onClick={this.push}> Add Flat</button>
        </div>
    )
}

}

function mapStateToProps(state){
    return{
        flatDetailMasterReducer:state.flatDetailMasterReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getFlatDetails,getFlatType,getTowerName},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(flatDetails);