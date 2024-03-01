import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender : false,
    genders: [],
    positions: [],
    roles: [],
    times: [],
    listUser: [],
    userToastMessage:'',
    userToastMessageErr: '',
    user:[],
    isEdit: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false
            };
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                isLoadingGender: false
            }
        ;
        
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            };
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
            }
        ;

        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            };
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
            }
        ;

        case actionTypes.FETCH_TIME_SUCCESS:
            return {
                ...state,
                times: action.data,
            };
        case actionTypes.FETCH_TIME_FAIL:
            return {
                ...state,
            }
        ;

        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                userToastMessage: action.data,
                userToastMessageErr: ''
            };
        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state,
                userToastMessageErr: action.data
            }
        ;

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            return {
                ...state,
                listUser: action.data,
                userToastMessageErr: ''
            };
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.listUser = []
            return {
                ...state,
                userToastMessageErr: action.data
            }
        ;

        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                userToastMessageErr: ''
            };
        case actionTypes.FETCH_USER_FAIL:
            state.user = []
            return {
                ...state,
                userToastMessageErr: action.data
            }
        ;

        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                userToastMessage: action.data,
                userToastMessageErr: ''
            };
        case actionTypes.DELETE_USER_FAIL:
            return {
                ...state,
                userToastMessageErr: action.data
            }
        ;

        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isEdit: false,
                userToastMessage: action.data,
                userToastMessageErr: ''
            };
        case actionTypes.UPDATE_USER_FAIL:
            return {
                ...state,
                isEdit: false,
                userToastMessageErr: action.data
            }
        ;
        case actionTypes.IS_EDIT_USER:
            return {
                ...state,
                isEdit: action.data
            }
        ;
        
        case actionTypes.RESET_MESSAGE:
            return{
                ...state,
                userToastMessage: action.data,
                userToastMessageErr: action.data
            }
        default:
            return state;
    }
};

export default adminReducer;
