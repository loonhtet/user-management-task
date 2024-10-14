"use client";

import Image from "next/image";

import { Button, ConfigProvider, theme } from "antd";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const mockup = "/mockup.png";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)] bg-[#141414] text-white">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 w-full md:w-3/4 mx-4 md:mx-0">
          <div className="grid place-content-center gap-y-3 md:gap-y-6">
            <h1 className="text-5xl lg:text-7xl font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 bg-clip-text text-transparent mb-4 font-[family-name:var(--font-noto)]">
              User Management
            </h1>
            <p className="w-4/5 text-xs lg:text-lg text-stone-300 font-[family-name:var(--font-roboto)]">
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
            alt="mockup"
            width={3600}
            height={2700}
            className="w-full"
          />
        </div>
      </ConfigProvider>
    </main>
  );
}
