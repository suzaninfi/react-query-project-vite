import { EpisodeDto, EpisodesResponse } from "../api/dtos.ts";
import { EpisodeBlock } from "../components/EpisodeBlock.tsx";
import styled from "styled-components";
import { fetchEpisodes } from "../api/api.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner.tsx";
import { UseQueryHookOptions } from "../types/queryTypes.ts";
import { useState } from "react";
import { delay } from "../util/util.ts";

export const OptimisticPage = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState<EpisodeDto[]>([]);

  const { data, isPending, error } = useEpisodesQuery();

  const addFavoriteMutation = useMutation<EpisodeDto, Error, EpisodeDto>({
    mutationFn: (episode: EpisodeDto) => {
      return new Promise(() => {
        delay(2000).then(() => setFavoriteEpisodes((prevEpisodes) => [...prevEpisodes, episode]));
      });
    },
  });

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <>
      <h3>Favorite episodes</h3>
      <FavoriteEpisodes>
        {favoriteEpisodes.map((episode: EpisodeDto) => (
          <EpisodeBlock
            key={episode.id}
            episodeId={episode.id}
            name={episode.name}
            airDate={episode.air_date}
          />
        ))}
      </FavoriteEpisodes>

      <Episodes>
        {data.results
          .filter((result) => !favoriteEpisodes.find((favEp) => favEp.id === result.id))
          .map((result: EpisodeDto) => (
            <EpisodeBlock
              key={result.id}
              episodeId={result.id}
              name={result.name}
              airDate={result.air_date}
              onClick={() => addFavoriteMutation.mutate(result)}
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

const FavoriteEpisodes = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid white;
  flex-wrap: wrap;
  width: 70rem;
`;

const Episodes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 51.2rem;
`;
