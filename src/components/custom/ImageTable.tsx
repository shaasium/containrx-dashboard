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
import { listImages } from "@/api";

const ImageTable = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<DockerImage[]>();

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

  return (
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
  );
};

export default ImageTable;
