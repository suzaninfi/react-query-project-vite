import { useEffect, useState } from "react";
import { EpisodeDto, EpisodesResponse } from "../api/dtos.ts";
import { EpisodeBlock } from "../components/EpisodeBlock.tsx";
import styled from "styled-components";
import { fetchEpisodes } from "../api/api.ts";
import { Spinner } from "../components/Spinner.tsx";

export const WithoutPage = () => {
  const [episodesResponse, setEpisodesResponse] = useState<EpisodesResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    setLoading(true);
    fetchEpisodes(1)
      .then((response) => setEpisodesResponse(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!episodesResponse) {
    return <p>No episodes found</p>;
  }

  return (
    <>
      <Episodes>
        {episodesResponse.results.map((result: EpisodeDto) => (
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
