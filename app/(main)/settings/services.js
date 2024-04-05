import { getCookie, myAxios } from "@/lib/helpers"

//state
export const contctEmailList = async () => {
    const { data } = await myAxios.get(`/contact-email/list`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data
}
//add new contact email
export const addNewContctEmail = async (value) => {
    const { data } = await myAxios.post(`/contact-email/create`, value, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data
}
//update new contact email
export const updateContctEmail = async ({ value, contactEmailId }) => {
    const { data } = await myAxios.put(`/contact-email/update/${contactEmailId}`, value, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

//add new contact email
export const deleteContctEmail = async (id) => {
    const { data } = await myAxios.delete(`/contact-email/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data
}