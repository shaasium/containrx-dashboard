import * as Yup from "yup";

export default Yup.object({
  name: Yup.string().optional(),
  cmd: Yup.string().optional(),
  portMappings: Yup.array()
    .of(
      Yup.object({
        hostPort: Yup.string().required("Provide a host port number"),
        containerPort: Yup.string().required("Provide a container port"),
      })
    )
    .optional(),
});
