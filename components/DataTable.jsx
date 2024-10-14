"use client";

import React, { useState } from "react";

import { Table, Input, Button } from "antd";
const { Search } = Input;

import { useQuery } from "react-query";
import Image from "next/image";

import { ArrowUpRight } from "lucide-react";
import { Link } from "next-view-transitions";

export default function DataTable() {
  // States for table
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("ascend");

  // Start Handle table changes for pagination
  const handleTableChange = (pagination, filter, sorter) => {
    setCurrentPage(pagination.current); // Update current page
    setPageSize(pagination.pageSize); // Update page size

    setSortOrder(sorter.order || "ascend");
  };
  // End Handle table changes for pagination

  // Start Handle Search State
  const handleSearch = (value) => {
    setSearch(value); // Set search when the input value changed
    setCurrentPage(1); // Reset to first page after searched
  };
  // End Handle Search State

  // Start Fetch data using React Query
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["users", search, currentPage, pageSize, sortOrder],
    () =>
      fetch(
        search
          ? // If there is user searched, construct the URL to search for users
            `https://dummyjson.com/users/search?q=${search}&limit=${pageSize}&skip=${
              (currentPage - 1) * pageSize
            }&sortBy=firstName&order=${sortOrder === "ascend" ? "asc" : "desc"}`
          : // If there is no user searched, construct the URL to get a paginated list of users
            `https://dummyjson.com/users?limit=${pageSize}&skip=${
              (currentPage - 1) * pageSize
            }&sortBy=firstName&order=${sortOrder === "ascend" ? "asc" : "desc"}`
      ).then((response) => response.json()),
    { keepPreviousData: true }
  );
  // End Fetch data using React Query

  // Start Handle Error State
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  // End Handle Error State

  // Start Handle Loading State
  if (isLoading) {
    return (
      <div className="w-screen h-screen grid place-content-center">
        <div className="loader"></div>
      </div>
    );
  }
  // End Handle Loading State

  return (
    <div className="grid gap-y-4 w-5/6  md:w-4/5 mx-auto">
      <h1 className="text-center text-stone-200 font-semibold text-4xl font-[family-name:var(--font-noto)]">
        User Dashboard
      </h1>
      <div className="h-full w-full rounded-md p-px animated-gradient ">
        <Search
          placeholder="Search Name"
          onSearch={handleSearch}
          loading={isFetching}
          className="custom-search font-[family-name:var(--font-roboto)]"
        />
      </div>

      <div className="overflow-x-auto">
        <Table
          title={() => (
            <p className="font-[family-name:var(--font-roboto)]">
              All Users: <span className="font-bold">{data.total}</span>
            </p>
          )}
          dataSource={data.users || []} // Use fetched data or empty array
          columns={columns} // Table columns
          loading={isFetching} // Show loading indicator while fetching
          pagination={{
            current: currentPage, // Current page
            pageSize: pageSize, // Number of items per page
            total: data?.total || 0, // Total number of items

            position: ["bottomCenter"],
          }}
          onChange={handleTableChange} // Handles pagination change
          rowKey={data.users.id} // Unique key for each row
          defaultSortOrder={sortOrder} // Default sort order for initial load
          bordered={true}
          scroll={{
            x: "max-content",
            y: 500,
          }}
          size="middle"
        />
      </div>
    </div>
  );
}

// Table columns
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    className: "font-[family-name:var(--font-roboto)]",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (userImage) => (
      <Image
        src={userImage}
        alt={userImage.id}
        width={30}
        height={30}
        className="rounded-md w-10 h-10"
      />
    ),
    key: "image",
    className: "font-[family-name:var(--font-roboto)]",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    sorter: true,
    sortDirections: ["descend"],
    className: "font-[family-name:var(--font-roboto)]",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    className: "font-[family-name:var(--font-roboto)]",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    className: "font-[family-name:var(--font-roboto)]",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    className: "font-[family-name:var(--font-roboto)]",
  },
  {
    title: "Action",
    render: (userData) => (
      <Link href={`/users/${userData.id}`}>
        <Button color="primary" variant="filled">
          More Info
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </Link>
    ),
    className: "font-[family-name:var(--font-roboto)]",
    key: "action",
  },
];
