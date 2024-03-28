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

//edit product
export const editProduct = async ({ productId }) => {

    const { data } = await myAxios.get(`/edit-product/${productId}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

//u[date] product
export const updateProduct = async ({ productId, value }) => {

    const { data } = await myAxios.post(`/update-product/${productId}`, value, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
