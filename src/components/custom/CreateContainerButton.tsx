import { createContainer } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { triggerToast } from "@/utils/triggerToast";
import createContainerValidator from "@/validators/createContainerValidator";
import { useFormik } from "formik";
import { useState } from "react";
import { CiPlay1 } from "react-icons/ci";

const CreateContainerButton: React.FC<{
  imageName: string;
  imageTag: string;
}> = ({ imageName, imageTag }) => {
  const { user } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik<{
      name: string;
      cmd: string;
      portMappings: { hostPort: string; containerPort: string }[];
      env: { key: string; value: string }[];
    }>({
      initialValues: {
        name: "",
        cmd: "",
        portMappings: [],
        env: [],
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: createContainerValidator,
      onSubmit: async (values) => {
        
        triggerToast(`Creating ${imageName}:${imageTag} container`);

        const { data, err } = await createContainer(user.token, {
          imageName,
          imageTag,
          ...values,
        });

        if (err) {
          console.log(err);
          return;
        }

        setIsDialogOpen(false);

        triggerToast(data.message)
      },
    });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <Button onClick={() => setIsDialogOpen(true)} variant="outline">
          <CiPlay1 className="hover:text-green-700 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Container</DialogTitle>
            <DialogDescription>
              {imageName} : {imageTag}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Container Name (optional)"
                className="col-span-3"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cmd" className="text-right">
                Command
              </Label>
              <Input
                id="cmd"
                name="cmd"
                placeholder="Enter Command (optional)"
                className="col-span-3"
                value={values.cmd}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Port Mappings</span>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue("portMappings", [
                    ...values.portMappings,
                    { hostPort: "", containerPort: "" },
                  ]);
                }}
                variant="outline"
                className="cursor-pointer"
              >
                add port
              </Button>
            </div>

            {values.portMappings.map(({ containerPort, hostPort }, id) => {
              return (
                <div key={id} className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id={`portMappings.${id}.hostPort`}
                    name={`portMappings.${id}.hostPort`}
                    placeholder="Host Port"
                    className="col-span-2"
                    value={hostPort}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Input
                    id={`portMappings.${id}.containerPort`}
                    name={`portMappings.${id}.containerPort`}
                    placeholder="Container Port"
                    className="col-span-2"
                    value={containerPort}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-sm">Env Variables</span>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setFieldValue("env", [...values.env, { key: "", value: "" }]);
              }}
              variant="outline"
              className="cursor-pointer"
            >
              add env vars
            </Button>
          </div>

          {values.env.map(({ key, value }, id) => {
            return (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Input
                  id={`env.${id}.key`}
                  name={`env.${id}.key`}
                  placeholder="Key"
                  className="col-span-2"
                  value={key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Input
                  id={`env.${id}.value`}
                  name={`env.${id}.value`}
                  placeholder="Value"
                  className="col-span-2"
                  value={value}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            );
          })}

          <DialogFooter>
            <Button type="submit" className="cursor-pointer mt-4">
              Start Container
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContainerButton;
