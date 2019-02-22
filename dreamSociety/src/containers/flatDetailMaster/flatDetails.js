import React,{Component} from 'react';
import {getFlatDetails,getFlatType,getTowerName,deleteSelectedFlat} from '../../actionCreators/flatDetailMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Table,Input, Label } from 'reactstrap';
import  axios from 'axios';
import {authHeader} from '../../helper/authHeader';
import {URN} from '../../actions/index';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

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
    ids:[],
    editFlatModal: false,
    isDisabled:true,
    search:'',
    loading:true,
}


componentDidMount(){
    this.refreshData();
}


componentWillMount(){
    this.refreshData();
    
}

refreshData(){
     this.props.getFlatDetails().then(()=> this.setState({loading:false}));
     this.props.getFlatType().then(()=> this.setState({loading:false}));
     this.props.getTowerName().then(()=> this.setState({loading:false}));
}

  
edit(flatNo,flatType,floor,towerName, flatId,flatDetailId){console.log("ttttttttt",flatType)
    this.setState({
        editFlatData:{
            flatNo,flatType,floor,towerName,flatId,flatDetailId},editFlatModal: !this.state.editFlatModal
    })

}


searchFilter(search) {
    return function (x) {
        return x.floor.toLowerCase().includes(search.toLowerCase()) ||
            x.tower_master.towerName.toLowerCase().includes(search.toLowerCase()) ||
            x.flat_master.flatType.toLowerCase().includes(search.toLowerCase()) ||
            x.flatNo.toLowerCase().includes(search.toLowerCase()) 

            || !search;
    }
}



searchOnChange = (e) => {
    this.setState({search:e.target.value})
}


updateDetails(){
    let { flatNo,flatId,flatType,floor,towerId,towerName} = this.state.editFlatData;
    axios.put(`${URN}/flatDetail/` + this.state.editFlatData.flatDetailId, {
        flatNo,flatId,flatType,floor,towerId,towerName
    },{headers:authHeader()}).then((response) => {
      this.refreshData();
      this.setState({
        editFlatModal: false,loading:true, editFlatData: {flatDetailId:'', flatNo:'',flatId:'',flatType:'',floor:'',towerId:'',towerName:''}
      })
    });
}  

delete(flatDetailId){
    this.setState({loading:true})
    let{isActive}=this.state.editFlatData;
    axios.put(`${URN}/flatDetail/delete/` +flatDetailId,{isActive},{headers:authHeader()}).then((response)=>{
        this.refreshData();
        this.setState({
            editFlatData:{isActive:false}
        })
    })
}


deleteSelected(ids){
    this.setState({loading:true,
    isDisabled:true});
    this.props.deleteSelectedFlat(ids)
    .then(() => this.refreshData())
    .catch(err => err.response.data.message);
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
        return details.flatDetail.filter(this.searchFilter(this.state.search)).map((item,index) =>{
        
            return(
                   
                    <tr  key={item.flatDetailId}>
                            <td><input type="checkbox" name="ids" className="SelectAll" value={item.flatDetailId}
                         onChange={(e) => {
                            const {flatDetailId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(flatDetailId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, flatDetailId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                            <td>{index+1}</td>             
                            <td>{item.flatNo}</td>
                            <td>{item.flat_master.flatType}</td>
                            <td>{item.floor}</td>
                            <td>{item.tower_master.towerName}</td>
                            
                                <td>
                                   <Button color="success"   className="mr-2" onClick={this.edit.bind(this,item.flatNo, item.flat_master.flatType,item.floor,item.tower_master.towerName,item.flat_master.flatId, item.flatDetailId)} >Edit</Button>
                              
                                   <Button color="danger" onClick={this.delete.bind(this, item.flatDetailId)}>Delete</Button>
                                 </td>  
                    </tr>
       
            )
        })
    }  
}    

OnKeyPresshandlerPhone(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

OnKeyPressUserhandler(event) {
    const pattern = /[a-zA-Z_ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

selectAll = () => {
    let selectMultiple = document.getElementsByClassName('SelectAll');
    let ar =[];
        for(var i = 0; i < selectMultiple.length; i++){
                ar.push(parseInt(selectMultiple[i].value));
                selectMultiple[i].checked = true;
        }
        this.setState({ids: ar});
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
}

unSelectAll = () =>{
    
    let unSelectMultiple = document.getElementsByClassName('SelectAll');
    let allIds = [];
    for(var i = 0; i < unSelectMultiple.length; i++){
            unSelectMultiple[i].checked = false
    }
    
    this.setState({ids: [ ...allIds]});
    if(allIds.length === 0){
        this.setState({isDisabled: true});
    }
    
}


logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}
close=()=>{
    return this.props.history.replace('/superDashBoard')
}
render(){
    let tableData;
    tableData=
    <Table className="table table-bordered">
    <thead>
    <tr>
    <th>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th>
        <th>#</th>
        <th>Flat No</th>
        <th>Flat Type</th>
        <th>Floor</th>
        <th>Tower Name</th>
        <th>Actions</th>
    </tr>
    </thead>
    
    <tbody>
    {this.renderList(this.props.flatDetailMasterReducer)}
    </tbody>
</Table>    
             let deleteSelectedButton = <Button color="danger" className="mb-2"
             onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>;

    return(
        <div>
        <UI onClick={this.logout}>
      
        <div className="w3-container w3-margin-top w3-responsive">
        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
             <Modal isOpen={this.state.editFlatModal} toggle={this.toggleEditFlatModal.bind(this)}>
                 <ModalHeader toggle={this.toggleEditFlatModal.bind(this)}>Edit Details</ModalHeader>
                     <ModalBody>
                        <FormGroup>
                            <Label for="flatNo">Flat No</Label>
                            <Input id="flatNo" value={this.state.editFlatData.flatNo} maxLength={20} onKeyPress={this.OnKeyPresshandlerPhone} onChange={(e) => {
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
                            <Input id="floor" value={this.state.editFlatData.floor} maxLength={10} onKeyPress={this.OnKeyPressUserhandler} onChange={(e) => {
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

                    
                         <Button color="primary" className="mr-2" onClick={this.updateDetails.bind(this)}>Save </Button>
                         <Button color="danger" onClick={this.toggleEditFlatModal.bind(this)}>Cancel</Button>
                  
                    
                    </ModalBody>
             </Modal>
                <div className="top-details"  style={{ fontWeight: 'bold' }}><h3>Flat Details</h3>
             
                 <Button color="primary" type="button" onClick={this.push}> Add Flat</Button>
                </div>
                    <SearchFilter  type="text" value={this.state.search}
                                            onChange={this.searchOnChange} />
                                            {deleteSelectedButton}
                                                 {!this.state.loading ? tableData : <Spinner />}
          
        </div>
        </UI>
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
    return bindActionCreators({getFlatDetails,getFlatType,getTowerName,deleteSelectedFlat},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(flatDetails);