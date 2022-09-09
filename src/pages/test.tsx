import type { NextPage } from "next";
import Head from "next/head";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { usesResults } from "../common/api";
import { z } from "zod";

const queryClient = new QueryClient();

const Uses = () => {
  const { isLoading, isError, data } = useQuery("uses", async () => {
    const { data } = await axios("/api/uses");
    return data as z.infer<typeof usesResults>;
  });
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="max-w-screen grid grid-cols-5 gap-1 bg-black">
      {data?.uses.map((use, index) => (
        <>
          {use.font_families.map((font, index) => (
            <div
              className="flex aspect-square items-center justify-center bg-white"
              key={index}
            >
              <img src={font.sample_src} alt={font.name} />
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

const Test: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full">
        <Head>
          <title>Zodios Example App</title>
          <meta name="description" content="Zodios app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Uses />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default Test;
