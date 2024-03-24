
import { getCookie, myAxios } from "@/lib/helpers"
//state
export const contactList = async ({ query, }) => {
    const { data } = await myAxios.get(`/contact/list${query}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
export const contactUpdate = async ({ contactId, values }) => {
    const { data } = await myAxios.put(`/contact/update/${contactId}`, values, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
export const contactDelete = async ({ contactId }) => {
    const { data } = await myAxios.delete(`/contact/delete/${contactId}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

export const contactCountsList = async ({ email }) => {
    const { data } = await myAxios.get(`/contact/counts?email=${email}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
export const contactEmails = async () => {
    const { data } = await myAxios.get(`/website/email/list`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}