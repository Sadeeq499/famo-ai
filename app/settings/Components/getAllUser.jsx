"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditUser from "./editUser";

const GetAllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={user.imageUrl}
              width={110}
              height={110}
              className="rounded-full"
              alt=""
            />
            <p className="font-semibold mt-6">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-[#202224] opacity-60 leading-5 my-1.5">
              {user.publicMetadata.role === "admin" ? "admin" : "editor"}
            </p>
            <p className="text-sm text-[#202224] opacity-80 leading-5 mb-3">
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </p>
            <EditUser
              userId={user.id}
              primaryEmailAddressId={user.primaryEmailAddressId}
            />
          </div>
        );
      })}
    </>
  );
};

export default GetAllUser;
