"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const AsigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("/api/users");
      const fetchedUsers = (await data.json()) as User[];
      setUsers(fetchedUsers);
    };
    getData();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content position="popper">
        {!!users.length &&
          users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
