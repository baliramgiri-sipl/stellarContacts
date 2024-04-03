import * as Yup from "yup"

export const loginSchema = (isProfile) => {
    return Yup.object().shape({
        first_name: Yup.string().trim().required("First Name is required!"),
        middle_name: Yup.string().trim(),
        is_active: Yup.boolean().optional(),
        last_name: Yup.string().trim().required("Last Name is required!"),
        UserTypeId: Yup.string().trim().required("User Type is required!"),
        WebsiteId: Yup.string().trim().required("Website is required!"),
        mobile: Yup.string().matches(/^\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}$/, 'Please enter a valid 10-digit mobile number').optional(),
        email: Yup.string().trim().email("Invalid Email").required("Email is required!"),
        ...(isProfile ? {} : { password: Yup.string().trim().required("Password is required!") })
    })
}
