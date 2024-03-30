import { getCookie, myAxios } from "@/lib/helpers"

//state
export const websiteList = async () => {
    const { data } = await myAxios.get(`/website/list`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data
}


export const activeWebsite = async ({ is_active, id }) => {
    const { data } = await myAxios.put(`/website/update/${id}`, { is_active }, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

//delete
export const deleteWebsite = async ({ websiteId }) => {

    const { data } = await myAxios.delete(`/website/delete/${websiteId}`, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}

//update Website
export const updateWebsite = async ({ websiteId, value }) => {
    const { data } = await myAxios.put(`/website/update/${websiteId}`, value, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
//add Website
export const addWebsite = async (value) => {
    const { data } = await myAxios.post(`/website/create`, value, {
        headers: {
            'Authorization': `Bearer ${getCookie("access_token")}`,
        }
    })
    return data?.data || data
}
