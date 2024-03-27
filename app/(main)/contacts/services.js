
import { getCookie, myAxios } from "@/lib/helpers"
//state
export const contactList = async ({ query, }) => {
    const { data } = await myAxios.get(`/contact/list${query}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data || data
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

export const contactCountsList = async ({ website }) => {
    const { data } = await myAxios.get(`/contact/counts?website=${website}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
export const contactWebsite = async () => {
    const { data } = await myAxios.get(`/website/users/list`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

export const contactReplay = async (values) => {
    const { data } = await myAxios.get(`/contact-reply/create`, values, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
