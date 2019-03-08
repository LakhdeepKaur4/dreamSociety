import React,{Component} from 'react';
import {getFlatDetails,getFlatType,getTowerName,deleteSelectedFlat,updateFlatDetails} from '../../actionCreators/flatDetailMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Table,Input, Label } from 'reactstrap';
import  axios from 'axios';
import {authHeader} from '../../helper/authHeader';
import {URN} from '../../actions/index';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';

class flatDetails extends Component{
        
    state={
            filterName:'flatNo',
            flatDetailId:'',
            flatNo:'',
            flatId:'',
            flatType:'',
            floor:'',
            towerId:'',
            towerName:'',
            isActive: false,
            ids:[],
            editFlatModal: false,
            isDisabled:true,
            search:'',
            errors:{},
            loading:true,
            message:''
}


componentDidMount(){
    this.refreshData();
}


componentWillMount(){
    this.refreshData();
    
}

   
onHandleChange=(event)=>{
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value, errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value });
    }
}

refreshData(){
     this.props.getFlatDetails().then(()=> this.setState({loading:false}));
     this.props.getFlatType().then(()=> this.setState({loading:false}));
     this.props.getTowerName().then(()=> this.setState({loading:false}));
}

  
edit(flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName){
    this.setState({
        flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName,editFlatModal: !this.state.editFlatModal
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
    const {flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName } = this.state;
    let errors={};
    if(this.state.flatNo===''){
        errors.flatNo="Flat No can't be empty";
    }
        else if(this.state.floor===''){
            errors.floor="Floor can't be empty";
        }
            this.setState({errors});
            const isValid =Object.keys(errors).length===0;
            if(isValid){
            this.props.updateFlatDetails(flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName)
            .then(() => this.refreshData())
            this.setState({loading:true,
                flatDetailId,flatNo,flatId,flatType,floor,towerId,towerName,
                editFlatModal: !this.state.editFlatModal
    }).catch(err=>{
        this.setState({message: err.response.data.message, loading: true})
    
    })
}
}

delete(flatDetailId){
    this.setState({loading:true})
    let{isActive}=this.state;
    axios.put(`${URN}/flatDetail/delete/` +flatDetailId,{isActive},{headers:authHeader()}).then((response)=>{
        this.refreshData();
        this.setState({
            isActive:false
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
        return flattype.flat.map((item)=>{
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
        return details.flatDetail.sort((item1,item2)=>{
            var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
            return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index) =>{
        
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
                            <td>{item.flat_master?item.flat_master.flatType:''}</td>
                            <td>{item.floor}</td>
                            <td>{item.tower_master.towerName}</td>
                            
                                <td>
                                   <Button color="success"   className="mr-2" onClick={this.edit.bind(this,item.flatDetailId,item.flatNo,item.flat_master.flatId,item.flat_master?item.flat_master.flatType:'',item.floor,item.tower_master.towerId,item.tower_master.towerName)} >Edit</Button>
                              
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
        <th  style={{width:'4%'}}></th>
        <th  style={{width:'4%'}}>#</th>
        <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'flatNo'}});
                        }}>Flat No <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
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
                            <Input name="flatNo" value={this.state.flatNo} maxLength={6} onKeyPress={this.OnKeyPresshandlerPhone}  onChange={this.onHandleChange}/>
                            <span className="error">{this.state.errors.flatNo}</span>
                            <span className="error">{this.state.message}</span>  
                        </FormGroup>

                        <FormGroup>
                            <Label for="flatType">Flat Type</Label>
                            <Input type="select" name="flatId" value={this.state.flatId} onChange={(e)=>{
                               let {flatId}=this.state;

                               flatId=e.target.value;

                               this.setState({flatId});
                            }}>
                                <option>{this.state.flatType}</option>
                                <DefaultSelect/>
                                {this.getDropDown1(this.props.flatDetailMasterReducer)}
                            </Input>                  
                        </FormGroup>

                        <FormGroup>
                            <Label for="floor">Floor</Label>
                            <Input name="floor" value={this.state.floor} maxLength={10} onKeyPress={this.OnKeyPressUserhandler}  onChange={this.onHandleChange}/>
                            <span className="error">{this.state.errors.floor}</span>
                        </FormGroup>

                        <FormGroup>
                            <Label>Tower Name</Label>
                            <Input type="select" name="towerId" value={this.state.towerId} onChange={(e)=>{
                                let{towerId}=this.state;

                                towerId=e.target.value;

                                this.setState({towerId});
                            }}>
                            <option>{this.state.towerName}</option>
                            <DefaultSelect/>
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
                            <SearchFilter  type="text" value={this.state.search}  onChange={this.searchOnChange} />
                          
                            {deleteSelectedButton}
                            <Label style={{padding:'10px'}}><b>Select All</b><input className="ml-2"
                                id="allSelect"
                                type="checkbox" onChange={(e) => {
                                        if(e.target.checked) {
                                            this.selectAll();
                                        }
                                        else if(!e.target.checked){
                                            this.unSelectAll();
                                        } 
                                    }  
                                }/>
                            </Label>
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
    return bindActionCreators({getFlatDetails,getFlatType,getTowerName,deleteSelectedFlat,updateFlatDetails},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(flatDetails);