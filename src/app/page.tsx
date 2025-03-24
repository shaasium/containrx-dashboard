"use client";

import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";

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

import Navbar from "@/components/custom/Navbar";
import ImageTable from "@/components/custom/ImageTable";

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
      <Navbar />

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

      <ImageTable />
    </div>
  );
};

export default Page;
