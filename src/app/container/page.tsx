"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { listContainers } from "@/api";

import Navbar from "@/components/custom/Navbar";

const Page = () => {
  const { user } = useAuth();
  const [containers, setContainers] = useState();
  const [fetchKey, refetch] = useState(0);

  useEffect(() => {
    listContainers(user.token)
      .then((res) => setContainers(() => res.data.containers))
      .catch((err) => {
        console.log(err);
      });
  }, [user.token, fetchKey]);

  return (
    <div>
      <Navbar />
      <div className="mb-8">
        <div className="flex items-center px-10 justify-between pb-3">
          <h1 className="text-black text-3xl font-medium">Containers</h1>
        </div>
        <div className="border mx-10 rounded-sm shadow py-1">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center">Image ID</TableHead>
                <TableHead className="text-center">Container ID</TableHead>
                <TableHead className="text-center">Ports</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {containers?.map((container, id) => {
                console.log(container);

                return (
                  <TableRow key={id}>
                    <TableCell className="text-center">
                      {container.Names[0].slice(1)}
                    </TableCell>
                    <TableCell className="text-center ">
                      {container.Image}
                    </TableCell>
                    <TableCell className="text-center ">
                      {container.ImageID.split(":")[1].slice(0, 12)}
                    </TableCell>
                    <TableCell className="text-center ">
                      {container.Id.slice(0, 12)}
                    </TableCell>
                    <TableCell className="text-center ">
                      {container.Ports[0].IP}:{container.Ports[0].PublicPort}{" "}
                      -&gt; {container.Ports[0].PrivatePort}
                    </TableCell>
                    <TableCell className="text-center">
                      {container.Status}
                    </TableCell>
                    <TableCell className="text-center">
                      {container.State}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
