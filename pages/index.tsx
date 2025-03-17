import fs from "fs";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { parse, stringify } from "yaml";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useCallback } from "react";
import Invoice from "@/components/Invoice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps() {
  // read all files from ./invoices
  const invoices = fs.readdirSync("./invoices");
  const invoiceData = await Promise.all(
    invoices.map(async (invoice) => {
      const content = await fs.promises.readFile(
        `./invoices/${invoice}`,
        "utf-8"
      );
      const { mtime } = await fs.promises.stat(`./invoices/${invoice}`);
      const contentJson = parse(content);
      console.log(contentJson);
      return {
        ...contentJson,
        lastModified: mtime.toISOString(),
      };
    })
  );
  return {
    props: {
      invoices: invoiceData,
    },
  };
}

TimeAgo.addDefaultLocale(en);
export default function Home({ invoices }: { invoices: any[] }) {
  const timeAgo = new TimeAgo("en-US");
  const [activeInvoice, setActiveInvoice] = React.useState<any>({});
  const onActivateInvoice = useCallback(
    (invoice: any) => () => {
      setActiveInvoice(invoice);
    },
    []
  );
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-row gap-8 py-4">
        <div className="h-screen overflow-auto max-w-[300px] border-r border-solid border-black/[.08] dark:border-white/[.145]">
          <h1 className="text-2xl mb-4 px-3">Invoices</h1>
          <ol className="list-none text-left">
            {invoices.map((invoice) => (
              <li
                onClick={onActivateInvoice(invoice)}
                className="cursor-pointer p-2 px-3 border-t border-black/[0.15] hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
              >
                <div className="font-semibold">{invoice.name}</div>
                <small>
                  Last modified {timeAgo.format(new Date(invoice.lastModified))}
                </small>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl mb-4">
            {activeInvoice.name ? activeInvoice.name : "Select an Invoice"}
          </h1>
          <div className="">
            <Invoice data={activeInvoice} />
          </div>
        </div>
      </main>
    </div>
  );
}
