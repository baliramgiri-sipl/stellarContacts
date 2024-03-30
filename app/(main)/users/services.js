import { getCookie, myAxios } from "@/lib/helpers"

//state
export const usersList = async () => {
    const { data } = await myAxios.get(`/user/list`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data
}

//add new product
export const addUser = async (values) => {
    const { data } = await myAxios.post(`/user/create`, values, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

//delete
export const deleteUser = async ({ userId }) => {

    const { data } = await myAxios.delete(`/user/delete/${userId}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

//update user
export const updateUser = async ({ userId, value }) => {
    const { data } = await myAxios.put(`/user/update/${userId}`, value, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
