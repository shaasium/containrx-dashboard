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
import {
  listContainers,
  pauseContainer,
  removeContainer,
  resumeContainer,
  stopContainer,
  unpauseContainer,
} from "@/api";

import Navbar from "@/components/custom/Navbar";

import { MdOutlineRestartAlt } from "react-icons/md";
import { FaStop } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdNotStarted } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { triggerToast } from "@/utils/triggerToast";

const Page = () => {
  const { user } = useAuth();
  const [containers, setContainers] = useState<DockerContainer[]>([]);
  const [fetchKey, refetch] = useState(0);

  useEffect(() => {
    listContainers(user.token)
      .then((res) => {
        console.log(res.data.containers);

        setContainers(() => res.data.containers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token, fetchKey]);

  const pauseContainerFunc = (containerId: string) => {
    triggerToast(`pausing container ${containerId.slice(0, 12)}`);
    pauseContainer(user.token, containerId)
      .then((res) => {
        console.log(res.data, 123);

        triggerToast(`Container ${res.data.slice(0, 12)} paused`);

        refetch((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unpauseContainerFunc = (containerId: string) => {
    triggerToast(`unpausing container ${containerId.slice(0, 12)}`);
    unpauseContainer(user.token, containerId)
      .then((res) => {
        triggerToast(`Container ${res.data.slice(0, 12)} unpaused`);
        refetch((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopContainerFunc = (containerId: string) => {
    triggerToast(`stopping container ${containerId.slice(0, 12)}`);
    stopContainer(user.token, containerId)
      .then((res) => {
        console.log(res.data);

        triggerToast(`Container ${res.data.slice(0, 12)} stopped`);
        refetch((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resumeContainerFunc = (containerId: string) => {
    triggerToast(`resuming container ${containerId.slice(0, 12)}`);
    resumeContainer(user.token, containerId)
      .then((res) => {
        triggerToast(`Container ${res.data.slice(0, 12)} resumed`);
        refetch((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeContainerFunc = (containerId: string) => {
    triggerToast(`removeing container ${containerId.slice(0, 12)}`);
    removeContainer(user.token, containerId)
      .then((res) => {
        triggerToast(`Container ${res.data.slice(0, 12)} removed`);
        refetch((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                <TableHead className="text-center"></TableHead>
                <TableHead className="text-center"></TableHead>
                <TableHead className="text-center"></TableHead>
                <TableHead className="text-center"></TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {containers?.map((container, id) => {
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
                      {container.Ports.length === 0
                        ? "-"
                        : `${container?.Ports[0]?.IP} : ${container?.Ports[0]?.PublicPort} -> ${container?.Ports[0]?.PrivatePort}`}
                    </TableCell>
                    <TableCell className="text-center">
                      {container.Status}
                    </TableCell>
                    <TableCell className="text-center">
                      {container.State}
                    </TableCell>

                    <TableCell className="">
                      <Button
                        onClick={() => resumeContainerFunc(container.Id)}
                        variant="outline"
                        disabled={
                          container.State === "running" ||
                          container.State == "paused"
                        }
                      >
                        <MdOutlineRestartAlt />
                      </Button>
                    </TableCell>

                    <TableCell className="">
                      <Button
                        onClick={() => stopContainerFunc(container.Id)}
                        variant="outline"
                        disabled={container.State == "exited"}
                      >
                        <FaStop />
                      </Button>
                    </TableCell>

                    <TableCell className="">
                      <Button
                        onClick={() => pauseContainerFunc(container.Id)}
                        variant="outline"
                        disabled={
                          container.State === "paused" ||
                          container.State == "exited"
                        }
                      >
                        <FaPause />
                      </Button>
                    </TableCell>

                    <TableCell className="">
                      <Button
                        onClick={() => unpauseContainerFunc(container.Id)}
                        variant="outline"
                        disabled={
                          container.State === "running" ||
                          container.State == "exited"
                        }
                      >
                        <MdNotStarted />
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => removeContainerFunc(container.Id)}
                        variant="outline"
                      >
                        <MdDelete />
                      </Button>
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
