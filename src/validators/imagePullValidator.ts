import * as Yup from "yup";

export default Yup.object({
  name: Yup.string().required("Image name is required"),
  tag: Yup.string().required().default("latest"),
});
