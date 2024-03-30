import * as Yup from "yup"

export const websiteSchema = Yup.object().shape({
    name: Yup.string().trim().required("Website Name is required!"),
    is_active: Yup.boolean().optional(),
})
