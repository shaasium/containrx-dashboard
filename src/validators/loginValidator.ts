import * as Yup from "yup";

export default Yup.object({
  email: Yup.string().email("Not a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
