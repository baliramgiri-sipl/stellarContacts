import { passwordRules, phoneRules } from "@/lib/pattern"
import * as Yup from "yup"

export const userCreatevalidation = (isEdit) => {
    return Yup.object().shape({
        user_type_id: Yup.string().required("User type is required"),
        client_id: Yup.string().required("Client name is required"),
        company_id: Yup.string().required("Company name is required"),
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        phone_number: Yup
            .string()
            .matches(phoneRules, "Invalid phone number format").required("Phone number is required"),
        email: Yup.string().email("invalid email").required("Email is required"),
        ...(isEdit ? {} : {
            password: Yup
                .string()
                .matches(passwordRules, { message: "Please create a stronger password" })
                .required("Required").nullable(),
        }),
        is_active: Yup.boolean().optional()
    })
}