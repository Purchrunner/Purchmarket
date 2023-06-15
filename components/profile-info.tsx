﻿import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";

const VIEWER = gql`
  query viewer {
    viewer {
      avatar(size: 400) {
        url
      }
      name
    }
  }
`;

export default function profileInfo() {
  const { data, loading, error } = useQuery(VIEWER);

  if (loading)
    return (
      <div className="mt-24 mb-6 flex flex-col items-center">
        <Skeleton className="mb-4 h-[200px] w-[200px] rounded-full bg-slate-200" />
        <Skeleton className="h-8 w-[250px] bg-slate-200" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-24 mb-6 flex flex-col items-center">
      <Image
        width={200}
        height={200}
        className="mb-4 rounded-full"
        alt="arrow right"
        src={data.viewer.avatar.url}
      />
      <h2 className="text-4xl font-bold">{data.viewer.name}</h2>
    </div>
  );
}
