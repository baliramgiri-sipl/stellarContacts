export const UPDATE_USER_DATA_INFO = "UPDATE_USER_DATA_INFO"
export const UPDATE_USER_MODAL = "UPDATE_USER_MODAL"



const initialState = {
    userDataInfo: null,
    userModal: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_DATA_INFO:
            return {
                ...state, userDataInfo: action.payload,
            }
        case UPDATE_USER_MODAL:
            return {
                ...state, userModal: action.payload,
            }
        default:
            return state
    }
}

// "data": [
//     {
//         "id": 1,
//         "name": "Super Admin"
//     },
//     {
//         "id": 2,
//         "name": "Admin"
//     },
//     {
//         "id": 3,
//         "name": "Company Admin"
//     },
//     {
//         "id": 4,
//         "name": "Company User"
//     },
//     {
//         "id": 5,
//         "name": "Client Admin"
//     },
//     {
//         "id": 6,
//         "name": "Client User"
//     }
// ],