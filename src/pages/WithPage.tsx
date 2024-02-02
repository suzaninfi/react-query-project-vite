import { EpisodeDto, EpisodesResponse } from "../api/dtos.ts";
import { EpisodeBlock } from "../components/EpisodeBlock.tsx";
import styled from "styled-components";
import { fetchEpisodes } from "../api/api.ts";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner.tsx";
import { UseQueryHookOptions } from "../types/queryTypes.ts";

export const WithPage = () => {
  const { data, isPending, error } = useEpisodesQuery();
  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <>
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

const useEpisodesQuery = (options?: UseQueryHookOptions<EpisodesResponse>) => {
  return useQuery<EpisodesResponse>({
    queryKey: ["episodes"],
    queryFn: () => fetchEpisodes(1),
    ...options,
  });
};

const Episodes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 51.2rem;
`;
