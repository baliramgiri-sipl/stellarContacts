export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPDATE_USER_ACCESS = "UPDATE_USER_ACCESS"


const initialState = {
    userInfo: null,
    roles: {
        asideMenu: [],
        asideMenuSubMenu: {
            settings: []
        }
    }
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return {
                ...state, userInfo: action.payload,
            }
        case UPDATE_USER_ACCESS:
            switch (action.payload) {
                //super admin or admin
                case 1:
                case 2:
                    return {
                        ...state, roles: {
                            asideMenu: ["Dashboard", "Search", "Orders", "Reports"],
                            asideMenuSubMenu: {
                                settings: ["Company", "Client", "Users", "Products"]
                            }
                        }
                    }

                case 3:
                    return {
                        ...state, roles: {
                            asideMenu: ["Dashboard", "Search", "Orders", "Reports"],
                            asideMenuSubMenu: {
                                settings: ["Client", "Users"]
                            }
                        }
                    }

                case 4:
                    return {
                        ...state, roles: {
                            asideMenu: ["Dashboard", "Search", "Orders", "Reports"],
                            asideMenuSubMenu: {
                                settings: ["Users"]
                            }
                        }
                    }
                case 5:
                    return {
                        ...state, roles: {
                            asideMenu: ["Dashboard", "Search", "Orders", "Reports"],
                            asideMenuSubMenu: {
                                settings: ["Users"]
                            }
                        }
                    }
                case 6:
                    return {
                        ...state, roles: {
                            asideMenu: ["Dashboard", "Search", "Orders", "Reports"],
                        }
                    }
                default:
                    return { ...state, roles: initialState.roles }
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