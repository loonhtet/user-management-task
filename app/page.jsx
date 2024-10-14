"use client";

import Image from "next/image";

import { Button, ConfigProvider, theme } from "antd";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const mockup = "/mockup.png";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)] bg-[#141414] text-white">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div className="grid grid-cols-2 w-3/4">
          <div className="grid place-content-center gap-y-6">
            <h1 className="text-7xl font-semibold mb-4">User Management</h1>
            <p className="w-4/5 text-stone-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              aliquid sunt ipsam beatae delectus tempore quo saepe neque
              dignissimos nam?
            </p>
            <Link href={"/users"} className="mt-2">
              <Button color="primary" variant="filled">
                User Dashboard
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <Image
            unoptimized={true}
            src={mockup}
            width={3600}
            height={2700}
            className="w-full"
          />
        </div>
      </ConfigProvider>
    </div>
  );
}
