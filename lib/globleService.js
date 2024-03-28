import { getCookie, myAxios } from "./helpers"

//user type list
export const usersTypeList = async () => {
    const { data } = await myAxios.get(`/usertype/list`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
//user type list
export const websiteList = async () => {
    const { data } = await myAxios.get(`/website/list`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
