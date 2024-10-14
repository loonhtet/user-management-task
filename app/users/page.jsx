"use client";

import React from "react";

import { Flex } from "antd";

import { ConfigProvider, theme } from "antd";

import DataTable from "@/components/DataTable";

export default function page() {
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Flex
          justify="center"
          align="center"
          className="min-h-screen bg-center bg-no-repeat bg-[#141414] overflow-auto"
        >
          <Flex vertical gap={14} className="my-12">
            <DataTable className="" />
          </Flex>
        </Flex>
      </ConfigProvider>
    </>
  );
}
