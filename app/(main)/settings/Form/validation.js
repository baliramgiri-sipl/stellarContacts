import * as Yup from "yup"

export const ContactEmailSchema = Yup.object().shape({
    WebsiteId: Yup.string().trim().required("Website name is required!"),
    email: Yup.string().trim().email("invalid email address").required("Email address is required"),
    is_active: Yup.boolean().optional(),
    smtp_host: Yup.string().trim().required("Smtp host is required!"),
    smtp_port: Yup.string().trim().required("Smtp port is required!"),
    smtp_service: Yup.string().trim().required("Smtp service is required!"),
    smtp_password: Yup.string().trim().required("Smtp password is required!"),
})
