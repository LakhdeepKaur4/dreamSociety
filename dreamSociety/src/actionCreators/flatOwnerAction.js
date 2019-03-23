import axios from 'axios'
import { URN,ADD_FLAT_OWNER,GET_FLAT_OWNER,DELETE_MULTIPLE_OWNER,REMOVE_OWNER,UPDATE_OWNER,GET_OWNER_MEMBER,OWNER_MEMBER_DELETE,DELETE_MULTIPLE_OWNER_MEMBER,MEMBER_OWNER_UPDATE,ADD_NEW_MEMBER,GET_ALL_FLOOR } from '../actions/index';
import { authHeader } from '../helper/authHeader';

export function addFlatOwner(data){
    // console.log('hughjgjhgjjlkl;k;',data)
    // console.log('hugh;',...d)
    // console.log(...data)
    const data1={
        ownerName:data.ownerName,
        dob:data.DOB,
        contact:data.number,
        email:data.email,
        societyId:data.societyName,
        permanentAddress:data.permanentAddress,
        towerId:data.towerId,
        flatDetailId:data.flatDetailId,
        bankName:data.bankName,
        accountHolderName:data.holderName,
        accountNumber:data.accountNumber,
        panCardNumber:data.panNumber,
        IFSCCode:data.ifscCode,
        noOfMembers:data.familyMember,
        member:data.member,
        profilePicture:data.profilePicture,
        gender:data.ownerGender,
        fileName:data.fileName,
        adhaarCardNo:data.Aadhaar,
        floorId:data.floorId
    }
    // const data2={
    //     data1,
    //     d
    // }
    console.log(data1)

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
    console.log('getflatOwnerlist')
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
export function updateFlatOwner(ownerId,ownerName,
    email,
    societyId,
    contact,
    permanentAddress,
    towerId,
    flatDetailId,
    accountHolderName,
    bankName,
    panCardNumber,
    IFSCCode,     countryName,
    stateName,
    cityName,
    locationName,
    locationId,
    cityId,
    stateId,
    countryId,gender){
        const data={ownerId,ownerName,
            email,
            societyId,
            contact,
            permanentAddress,
            towerId,
            flatDetailId,
            accountHolderName,
            bankName,
            panCardNumber,
            IFSCCode,     countryName,
            stateName,
            cityName,
            locationName,
            locationId,
            cityId,
            stateId,
            countryId,gender}
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
    const request=axios.post(`${URN}/owner/ownerMember/${id}`,{memberName,memberDob,gender,relationId},{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:ADD_NEW_MEMBER,
        payload:request
    }
}

export function getAllFloor (id){
    const request =axios.get(`${URN}/towerFloor/${id}`,{headers:authHeader()})
    .then(response=>response.data)
    return {
        type:GET_ALL_FLOOR,
        payload:request
    }
}