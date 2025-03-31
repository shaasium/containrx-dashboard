"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaRegTrashAlt } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";

import { useEffect, useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { listImages, pullImage, removeImage } from "@/api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import imagePullValidator from "@/validators/imagePullValidator";

const ImageTable = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<DockerImage[]>();
  const [fetchKey, refetch] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    listImages(user.token)
      .then((res) => setImages(() => res.data.images))
      .catch((err) => {
        console.log(err);
      });
  }, [user.token, fetchKey]);

  const pullImageFunc = async (values: { name: string; tag: string }) => {
    const { data, err } = await pullImage(user.token, values.name, values.tag);

    if (err) {
      console.log(err);
      return;
    }

    console.log(data);
    refetch((prev) => prev + 1);
    setIsDialogOpen(false);
  };

  const removeImageFunc = async (imageId: string) => {
    const { data, err } = await removeImage(user.token, imageId);
    if (err) {
      console.log(err);
      return;
    }

    console.log(data);
    refetch((prev) => prev + 1);
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      tag: "latest",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: imagePullValidator,
    onSubmit: pullImageFunc,
  });

  return (
    <div className="mb-8">
      <div className="flex items-center px-10 justify-between pb-3">
        <h1 className="text-black text-3xl font-medium">Images</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild className="cursor-pointer">
            <Button onClick={() => setIsDialogOpen(true)} variant="outline">
              Pull New Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Pull New Image</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter image name"
                    className="col-span-3"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tag" className="text-right">
                    Tag
                  </Label>
                  <Input
                    id="tag"
                    name="tag"
                    placeholder="Enter tag name"
                    className="col-span-3"
                    value={values.tag}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="cursor-pointer">
                  Pull Image
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border mx-10 rounded-sm shadow py-1">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Tag</TableHead>
              <TableHead className="text-center">Image ID</TableHead>
              <TableHead className="text-center">Created</TableHead>
              <TableHead className="text-center">Size</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images?.map((image) => (
              <TableRow key={image.Id}>
                <TableCell className="text-center">
                  {image.RepoTags[0].split(":")[0]}
                </TableCell>
                <TableCell className="text-center ">
                  {image.RepoTags[0].split(":")[1]}
                </TableCell>
                <TableCell className="text-center ">
                  {image.Id.split(":")[1].slice(0, 12)}
                </TableCell>
                <TableCell className="text-center ">
                  {new Date(image.Created * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center ">
                  {(image.Size / (1024 * 1024)).toFixed(2)} MB
                </TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild className="cursor-pointer">
                      <Button variant="outline">
                        <CiPlay1 className="hover:text-green-700 cursor-pointer" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form>
                        <DialogHeader>
                          <DialogTitle>Create Container</DialogTitle>
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
                              value={values.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Port Mappings</span>
                            <Button variant="outline" className="cursor-pointer">add port</Button>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                              id="cmd"
                              name="cmd"
                              placeholder="Host Port"
                              className="col-span-2"
                              value={values.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <Input
                              id="cmd"
                              name="cmd"
                              placeholder="Container Port"
                              className="col-span-2"
                              value={values.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="cursor-pointer">
                            Start Container
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-center">
                  <FaRegTrashAlt
                    onClick={() => removeImageFunc(image.Id)}
                    className="hover:text-red-700 cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ImageTable;
