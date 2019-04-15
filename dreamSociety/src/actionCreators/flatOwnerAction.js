import axios from 'axios'
import { URN,ADD_FLAT_OWNER,GET_FLAT_OWNER,DELETE_MULTIPLE_OWNER,REMOVE_OWNER,UPDATE_OWNER,GET_OWNER_MEMBER,OWNER_MEMBER_DELETE,DELETE_MULTIPLE_OWNER_MEMBER,MEMBER_OWNER_UPDATE,ADD_NEW_MEMBER,GET_ALL_FLOOR,GET_OWNER_FLAT,DELETE_OWNER_FLAT,ADD_MORE_FLATS} from '../actions/index';
import { authHeader } from '../helper/authHeader';

export function addFlatOwner(data){
    const data1={
        firstName:data.firstName,
        lastName:data.lastName,
        dob:data.DOB,
        contact:data.number,
        email:data.email,
        societyId:data.societyName,
        correspondenceAddress:data.currentAddress,
        permanentAddress:data.permanentAddress,
        towerId:data.towerId,
        flatDetailIds:data.flatDetailIds,
        noOfMembers:data.familyMember,
        member:data.member,
        profilePicture:data.profilePicture,
        gender:data.ownerGender,
        fileName:data.fileName,
        adhaarCardNo:data.Aadhaar,
        floorId:data.floorId,
        
    }
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
const request=axios.post(`${URN}/owner`,data1,{ headers: authHeader(),config })
.then(response=>response.data)
return {
    type:ADD_FLAT_OWNER,
    payload:request
}
}

export function getOwnerList(){
    const request=axios.get(`${URN}/owner`,{ headers: authHeader()})
    .then(response=>response.data)
    return{
        type:GET_FLAT_OWNER,
        payload:request
    }
}
export function multipleDelete(ids){

    const request=axios.put(`${URN}/owner/delete/deleteSelected`,{ids},{ headers: authHeader() })
    .then(response=>response.data)
    return{
        type:DELETE_MULTIPLE_OWNER,
        payload:request
    }
}


export function removeOwner(id){
    
    const data={
        // assetsId:id,
        isActive:false
    }
    const request=axios.put(`${URN}/owner/delete/`+id,data,{headers:authHeader()})
    .then(reponse=>reponse.data)
    .catch(error=>error)
    return{
        type:REMOVE_OWNER,
        payload:request
    }
}
export function updateFlatOwner(
    ownerId,
    firstName,
    lastName,
    email,
    contact,
    permanentAddress,
    gender,
    Aadhaar,
    profilePicture,fileName){

  
        const data={
            ownerId,
            firstName,
            lastName,
            email,
            contact,
            permanentAddress,
            gender,
            adhaarCardNo:Aadhaar,
            profilePicture,fileName}
            console.log('=============data============',data)
    const request=axios.put(`${URN}/owner/`+ownerId,data,{headers:authHeader()})
        .then(reponse=>reponse.data)
        return {
            type:UPDATE_OWNER,
            payload:request
        }
}

export function getOwnerMember(id){
    console.log(id)
    const request =axios.get(`${URN}/owner/ownerMember/`+id,{headers:authHeader()})
    .then(response=>response.data)
    return{
        type:GET_OWNER_MEMBER,
        payload:request
    }
}
export function deleteMember(id){
    const data={    
        isActive:false
    }
    const request =axios.put(`${URN}/ownerMember/delete/`+id,data,{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:OWNER_MEMBER_DELETE,
        payload:request
    }
}

export function deleteMultipleMember(ids){
    console.log(ids)
    // const data={    
    //     isActive:false
    // }
    const request=axios.put(`${URN}/ownerMember/delete/deleteSelected`,{ids},{headers:authHeader()})
    .then(response=>response)
    return {
        type:DELETE_MULTIPLE_OWNER_MEMBER,
        payload:request
    }
}

export function memberUpdate(memberName,gender,memberDob,relationId,memberId){
    
    const request=axios.put(`${URN}/owner/ownerMember/update/${memberId}`,{memberName,gender,memberDob,relationId},{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:MEMBER_OWNER_UPDATE,
        payload:request
    }
}

export function addNewMember(memberName,memberDob,gender,relationId,id){
    console.log(memberName,memberDob,gender,relationId,id)
    const request=axios.post(`${URN}/owner/ownerMember/${id}`,{memberName,memberDob,gender,relationId},{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:ADD_NEW_MEMBER,
        payload:request
    }
}

export function getAllFloor (id){
    console.log(id)
    const request =axios.get(`${URN}/towerFloor/${id}`,{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:GET_ALL_FLOOR,
        payload:request
    }
}

export function getOwnerFlats(ownerId){
    console.log(ownerId)
    const request =axios.get(`${URN}/owner/getFlats/${ownerId}`,{headers:authHeader()})
    .then(response=>response.data)
    return{
        type:GET_OWNER_FLAT,
        payload:request
    }
}

export function deleteOwnerFlats(flatDetailId,ownerId){
    console.log(flatDetailId,ownerId)
    const request =axios.put(`${URN}/owner/deleteFlat/${ownerId}`,{flatDetailId},{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:DELETE_OWNER_FLAT,
        payload:request
    }
}

export function addAnotherFlats(ownerId,flatDetailId){
    console.log(ownerId,flatDetailId)
    const request = axios.post(`${URN}/owner/addMoreFlats`,{flatDetailId,ownerId},{headers:authHeader()})
    .then(response=>console.log(response.data))
    return{
        type:ADD_MORE_FLATS,
        payload:request
    }
}
