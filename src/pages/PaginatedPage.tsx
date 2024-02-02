import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EpisodeDto, EpisodesResponse } from "../api/dtos.ts";
import { fetchEpisodes } from "../api/api.ts";
import { EpisodeBlock } from "../components/EpisodeBlock.tsx";
import styled from "styled-components";
import { Spinner } from "../components/Spinner.tsx";

export const PaginatedPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { isPending, isError, data, error, isFetching } = useQuery<EpisodesResponse, Error>({
    queryKey: ["episodes", pageNumber],
    queryFn: () => fetchEpisodes(pageNumber),
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <span>An error occurred: {error.message}</span>;
  }

  return (
    <>
      <PaginationButtons>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prevPage) => prevPage - 1)}
        >
          Prev
        </button>
        <button
          disabled={pageNumber === data.info.pages}
          onClick={() => setPageNumber((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </PaginationButtons>
      <Refetch>{isFetching && <p>refetching...</p>}</Refetch>

      <Episodes>
        {data.results.map((result: EpisodeDto) => (
          <EpisodeBlock
            key={result.id}
            episodeId={result.id}
            name={result.name}
            airDate={result.air_date}
          />
        ))}
      </Episodes>
    </>
  );
};

const Episodes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 51.2rem;
`;

const PaginationButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 10rem;
`;

const Refetch = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
