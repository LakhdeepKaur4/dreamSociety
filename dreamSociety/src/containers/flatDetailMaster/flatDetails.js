import React,{Component} from 'react';
import {getFlatDetails,getFlatType,getTowerName} from '../../actionCreators/flatDetailMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import  axios from 'axios';
import {authHeader} from '../../helper/authHeader';
import {URN} from '../../actions/index';
import SearchFilter from '../../components/searchFilter/searchFilter';


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
    editFlatModal: false,
    search:''
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

  
edit(flatNo,flatType,floor,towerName, flatId,flatDetailId){console.log("ttttttttt",flatType)
    this.setState({
        editFlatData:{
            flatNo,flatType,floor,towerName,flatId,flatDetailId},editFlatModal: !this.state.editFlatModal
    })

}

searchFilter(search){
    return function(x){
        return x.floor.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}




searchOnChange = (e) => {
    this.setState({search:e.target.value})
}


updateDetails(){
    let { flatNo,flatId,flatType,floor,towerId,towerName} = this.state.editFlatData;
    console.log(flatId,flatType,"priya");
    axios.put(`${URN}/flatDetail/` + this.state.editFlatData.flatDetailId, {
        flatNo,flatId,flatType,floor,towerId,towerName
    },{headers:authHeader()}).then((response) => {
      this.refreshData();
           console.log(response.data)
      this.setState({
        editFlatModal: false, editFlatData: {flatDetailId:'', flatNo:'',flatId:'',flatType:'',floor:'',towerId:'',towerName:''}
      })
      console.log(flatType)
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


getDropDown1=({flattype})=>{
    if(flattype){
        return flattype.map((item)=>{
            return(
                <option key={item.flatId} value={item.flatId}>
                    {item.flatType}
                </option>
            )
        })
    }
}

getDropDown2=({name})=>{
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
        return details.flatDetail.filter(this.searchFilter(this.state.search)).map((item,j) =>{
        
            return(
                   
                    <tr  key={j}>
                                          
                            <td>{item.flatNo}</td>
                            <td>{item.flat_master.flatType}</td>
                            <td>{item.floor}</td>
                            <td>{item.tower_master.towerName}</td>
                            
                                <td>
                                   <button className="btn btn-primary" onClick={this.edit.bind(this,item.flatNo, item.flat_master.flatType,item.floor,item.tower_master.towerName,item.flat_master.flatId, item.flatDetailId)} >Edit</button>
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
                            <Input type="select" value={this.state.editFlatData.flatId} onChange={(e)=>{
                               let {editFlatData}=this.state;

                               editFlatData.flatId=e.target.value;

                               this.setState({editFlatData});
                            }}>
                                <option>{this.state.editFlatData.flatType}</option>
                                <option disabled>--SELECT--</option>
                                {this.getDropDown1(this.props.flatDetailMasterReducer)}
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
                            <Label>Tower Name</Label>
                            <Input type="select" value={this.state.editFlatData.towerId} onChange={(e)=>{
                                let{editFlatData}=this.state;

                                editFlatData.towerId=e.target.value;

                                this.setState({editFlatData});
                            }}>
                            <option>{this.state.editFlatData.towerName}</option>
                            <option disabled>--SELECT--</option>
                            {this.getDropDown2(this.props.flatDetailMasterReducer)}
                           </Input>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                         <Button color="primary" onClick={this.updateDetails.bind(this)}>Update </Button>
                         <Button color="secondary" onClick={this.toggleEditFlatModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
             </Modal>
   
             <SearchFilter type="text" value={this.state.search}
                                            onChange={this.searchOnChange} />
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