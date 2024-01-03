import { Select } from "@radix-ui/themes";
import React from "react";

const AsigneeSelect = () => {
  return (
    <Select.Root defaultValue="ebben">
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="ebben">Ebben</Select.Item>
        <Select.Item value="gift">Gift</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
