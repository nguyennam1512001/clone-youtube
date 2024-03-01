import actionTypes from "./actionTypes";
import { toast } from 'react-toastify';
import { createNewUserSevice, getAllCodeSevice, getUsers, deleteUserSevice, updateUserSevice } from "../../services/userSevice";


// get allcode
const fetchCodeStart = (codeType, successAction, failAction) => {
  return async (dispatch) => {
    try {
        dispatch({type: actionTypes.FETCH_GENDER_START})
      let res = await getAllCodeSevice(codeType);
      if (res && res.errCode === 0) {
        dispatch(successAction(res.data));
      } else {
        dispatch(failAction());
      }
    } catch (e) {
      dispatch(failAction());
      console.log(`Error fetching ${codeType}:`, e);
    }
  };
};

export const fetchGenderStart = () => fetchCodeStart( "gender", fetchGenderSuccess, fetchGenderFail);
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPositionStart = () => fetchCodeStart("position", fetchPositionSuccess, fetchPositionFail);
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRoleStart = () => fetchCodeStart( "role", fetchRoleSuccess, fetchRoleFail);
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const fetchTimeStart = () => fetchCodeStart( "time", fetchTimeSuccess, fetchTimeFail);
export const fetchTimeSuccess = (TimeData) => ({
  type: actionTypes.FETCH_TIME_SUCCESS,
  data: TimeData,
});
export const fetchTimeFail = () => ({
  type: actionTypes.FETCH_TIME_FAIL,
});

// create user
export const createNewUser = (data)=>{
  return async(dispatch, getState)=>{
    try {
      // dispatch({type: actionTypes.CREATE_USER_SUCCESS})
      let res = await createNewUserSevice(data)
      if(res && res.errCode === 0){
        toast.success(res.message)
        dispatch(saveUserSuccess(res.message))
        dispatch(fetchAllUserStart())
      }else{
        dispatch(saveUserFail(res.errMessage))
      }
    } catch (e) {
      dispatch(saveUserFail(e.message))
      console.log(e);
    }
  }
}
export const saveUserSuccess =(message)=>({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: message
})
export const saveUserFail =(errMessage)=>({
  type: actionTypes.CREATE_USER_FAIL,
  data: errMessage
})

export const fetchAllUserStart = ()=>{
  return async(dispatch, getState)=>{
    try {
      // dispatch({type: actionTypes.CREATE_USER_SUCCESS})
      let res = await getUsers('all')
      if(res && res.errCode === 0){
        dispatch(fetchAllUserSuccess(res.users.reverse()))
      }else{
        dispatch(fetchAllUserFail(res.errMessage))
      }
    } catch (e) {
      dispatch(fetchAllUserFail(e.message))
      console.log(e);
    }
  }
}
export const fetchAllUserSuccess =(data)=>({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data: data
})
export const fetchAllUserFail =(errMessage)=>({
  type: actionTypes.FETCH_ALL_USER_FAIL,
  data: errMessage
})


export const fetchUserStart = (id)=>{
  return async(dispatch, getState)=>{
    try {
      // dispatch({type: actionTypes.CREATE_USER_SUCCESS})
      let res = await getUsers(id)
      if(res && res.errCode === 0){
        dispatch(fetchUserSuccess(res.users))
      }else{
        dispatch(fetchUserFail(res.errMessage))
      }
    } catch (e) {
      dispatch(fetchUserFail(e.message))
      console.log(e);
    }
  }
}
export const fetchUserSuccess =(data)=>({
  type: actionTypes.FETCH_USER_SUCCESS,
  data: data
})
export const fetchUserFail =(errMessage)=>({
  type: actionTypes.FETCH_USER_FAIL,
  data: errMessage
})

export const deleteUserStart = (id)=>{
  return async(dispatch, getState)=>{
    try {
      // dispatch({type: actionTypes.CREATE_USER_SUCCESS})
      let res = await deleteUserSevice(id)
      if(res && res.errCode === 0){
        toast.success(res.message)
        dispatch(deleteUserSuccess(res.message))
        dispatch(fetchAllUserStart())
      }else{
        dispatch(deleteUserFail(res.errMessage))
        toast.error(res.errMessage)
      }
    } catch (e) {
      dispatch(deleteUserFail(e.message))
      console.log(e);
    }
  }
}
export const deleteUserSuccess =(data)=>({
  type: actionTypes.DELETE_USER_SUCCESS,
  data: data
})
export const deleteUserFail =(errMessage)=>({
  type: actionTypes.DELETE_USER_FAIL,
  data: errMessage
})


export const updateUserStart = (data)=>{
  return async(dispatch, getState)=>{
    try {
      let res = await updateUserSevice(data)
      if(res && res.errCode === 0){
        toast.success(res.message)
        dispatch(updateUserSuccess(res.message))
        dispatch(fetchAllUserStart())
      }else{
        toast.error(res.errMessage)
        dispatch(updateUserFail(res.errMessage))
      }
    } catch (e) {
      dispatch(updateUserFail(e.message))
      console.log(e);
    }
  }
}
export const updateUserSuccess =(data)=>({
  type: actionTypes.UPDATE_USER_SUCCESS,
  data: data
})
export const updateUserFail =(errMessage)=>({
  type: actionTypes.UPDATE_USER_FAIL,
  data: errMessage
})

export const isEdit = (isEdit)=>({
  type: actionTypes.IS_EDIT_USER,
  data: isEdit
})



export const resetUserToastMessage = () =>({
  type: actionTypes.RESET_MESSAGE,
  data: ''
})

export const resetUserToastMessageErr = () =>({
  type: actionTypes.RESET_MESSAGE,
  data: ''
})