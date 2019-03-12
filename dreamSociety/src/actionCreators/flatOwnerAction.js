import axios from 'axios'
import { URN,ADD_FLAT_OWNER,GET_FLAT_OWNER,DELETE_MULTIPLE_OWNER,REMOVE_OWNER,UPDATE_OWNER } from '../actions/index';
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
        fileName:data.fileName
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