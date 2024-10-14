"use client";

import { Flex, Button, Descriptions, Space, ConfigProvider, theme } from "antd";
import Image from "next/image";
import { Link } from "next-view-transitions";
import React from "react";
import { useQuery } from "react-query";

export default function Page({ params }) {
  // Start Fetch data using React Query
  const { data, isLoading, isError, error } = useQuery(
    ["data", params.id],
    () => {
      // Fetch Data based on userId
      return fetch(`https://dummyjson.com/users/${params.id}`).then(
        (response) => {
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          return response.json();
        }
      );
    }
  );
  // End Fetch data using React Query

  // Start Handle Error State
  if (isError) {
    return (
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#141414]">
          <p className="text-2xl text-red-500 mb-6">Error: {error.message}</p>
          <Link href={"/users"}>
            <Button color="danger" variant="filled">
              Go Back
            </Button>
          </Link>
        </div>
      </ConfigProvider>
    );
  }
  // End Handle Error State

  // Start Handle Loading State
  if (isLoading) {
    return (
      <div className="w-screen h-screen grid place-content-center bg-[#141414]">
        <div className="loader"></div>
      </div>
    );
  }
  // Start Handle Loading State

  return (
    <div className="bg-[#141414] min-h-screen">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Flex justify="center" align="center">
          <div className="w-full lg:w-3/4 grid gap-y-12 lg:gap-y-0 gap-x-4 mx-3 lg:mx-0 my-12 items-center">
            <Image
              src={data.image}
              alt={data.id}
              width={500}
              height={500}
              className="w-56 h-56 rounded-lg object-cover"
            />

            <div className="grid gap-y-12 mt-12 bg-cover">
              <Descriptions
                layout="vertical"
                bordered={true}
                className="backdrop-blur-3xl"
              >
                <Descriptions.Item label="Name">
                  {data.firstName} {data.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {data.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {data.email}
                </Descriptions.Item>
                <Descriptions.Item label="Age">{data.age}</Descriptions.Item>
                <Descriptions.Item label="City">
                  {data.address?.city}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {data.address?.address}
                </Descriptions.Item>
              </Descriptions>

              <Space size="small" className="ms-auto">
                <Link href={"/users"}>
                  <Button color="primary" variant="link">
                    Dashboard
                  </Button>
                </Link>

                {parseInt(params.id) === 1 ? null : (
                  <Link href={`/users/${parseInt(params.id) - 1}`}>
                    <Button color="primary" variant="filled">
                      Previous
                    </Button>
                  </Link>
                )}

                <Link href={`/users/${parseInt(params.id) + 1}`}>
                  <Button color="primary" variant="filled">
                    Next
                  </Button>
                </Link>
              </Space>
            </div>
          </div>
        </Flex>
      </ConfigProvider>
      )
    </div>
  );
}
