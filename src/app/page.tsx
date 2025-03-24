"use client";

import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";
import Link from "next/link";

import Image from "next/image";

import { FaLayerGroup, FaRegTrashAlt } from "react-icons/fa";
import { LuContainer } from "react-icons/lu";
import { CiPlay1 } from "react-icons/ci";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listImages, pullImage } from "@/api";
import { useEffect, useState } from "react";

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

const Page = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<
    {
      Id: string;
      RepoTags: string[];
      Created: number;
      Size: number;
    }[]
  >();

  useEffect(() => {
    listImages(user.token)
      .then((res) => {
        console.log(res.data.images);

        setImages(res.data.images);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token]);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      tag: "latest",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: imagePullValidator,

    onSubmit: async (values) => {
      const { data, err } = await pullImage(
        user.token,
        values.name,
        values.tag
      );

      if (err) {
        console.log(err);
        return;
      }

      console.log(data);
    },
  });

  if (!user.token) return redirect("/login");

  return (
    <div>
      <div className="flex space-x-10 px-10 py-2 border mb-8 shadow">
        <Image src="/logo.png" width={70} height={70} alt="containrx-logo" />

        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="font-medium flex items-center space-x-2 hover:bg-gray-50 px-4 py-2 rounded-sm"
          >
            <FaLayerGroup /> <span>Images</span>
          </Link>
          <Link
            href="/"
            className="font-medium flex items-center space-x-2 hover:bg-gray-50 px-4 py-2 rounded-sm"
          >
            <LuContainer /> <span>Containers</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center px-10 justify-between pb-3">
        <h1 className="text-black text-3xl font-medium">Images</h1>

        <Dialog>
          <DialogTrigger asChild className="cursor-pointer">
            <Button variant="outline">Pull New Image</Button>
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

      <div className=" border mx-10 rounded-sm shadow py-1">
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
                  <CiPlay1 className="hover:text-green-700 cursor-pointer" />
                </TableCell>
                <TableCell className="text-center">
                  <FaRegTrashAlt className="hover:text-red-700 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
