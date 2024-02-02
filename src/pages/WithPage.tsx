import { EpisodeDto, EpisodesResponse } from "../api/dtos.ts";
import { EpisodeBlock } from "../components/EpisodeBlock.tsx";
import styled from "styled-components";
import { fetchEpisodes } from "../api/api.ts";
import { useQuery } from "@tanstack/react-query";

export const WithPage = () => {
  const { data, isPending, error } = useQuery<EpisodesResponse, Error>({
    queryKey: ["episodes"],
    queryFn: () => fetchEpisodes(1),
  });

  if (isPending) {
    return <p>Loading...</p>;
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

const Episodes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 51.2rem;
`;
