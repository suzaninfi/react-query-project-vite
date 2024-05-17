import { EpisodeDto, EpisodesResponse } from "../api/dtos.ts";
import { EpisodeBlock } from "../components/EpisodeBlock.tsx";
import styled from "styled-components";
import { fetchEpisodes } from "../api/api.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner.tsx";
import { UseQueryHookOptions } from "../types/queryTypes.ts";
import { EpisodeRow } from "../components/EpisodeRow.tsx";
import { addToWatchList, fetchWatchList } from "../api/backendApi.ts";

export const OptimisticPage = () => {
  const queryClient = useQueryClient();
  const episodesResult = useEpisodesQuery();

  const addToWatchListMutation = useMutation({
    mutationFn: addToWatchList,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["toWatchList"] });
    },
  });

  const watchListResult = useQuery({
    queryKey: ["toWatchList"],
    queryFn: fetchWatchList,
  });

  if (episodesResult.isPending) {
    return <Spinner />;
  }

  if (episodesResult.error) {
    return <p>An error occurred: {episodesResult.error.message}</p>;
  }

  return (
    <Page>
      <h3>Watch List</h3>
      {watchListResult.isLoading && <Spinner />}
      <EpisodesGroup>
        {watchListResult.data?.map((episode) => (
          <EpisodeRow key={episode.id} name={episode.name} />
        ))}
      </EpisodesGroup>

      <h3>All episodes</h3>
      {addToWatchListMutation.isPending && <Spinner />}
      <EpisodesGroup>
        <Episodes>
          {episodesResult.data.results.map((episode: EpisodeDto) => (
            <div>
              <EpisodeBlock
                key={episode.id}
                episodeId={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                onClick={() =>
                  addToWatchListMutation.mutate({ id: episode.id.toString(), name: episode.name })
                }
              />
            </div>
          ))}
        </Episodes>
      </EpisodesGroup>
    </Page>
  );
};

const useEpisodesQuery = (options?: UseQueryHookOptions<EpisodesResponse>) => {
  return useQuery<EpisodesResponse>({
    queryKey: ["episodes"],
    queryFn: () => fetchEpisodes(1),
    ...options,
  });
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
`;

const EpisodesGroup = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid gray;
  flex-wrap: wrap;
  width: 70rem;
  padding: 1rem;
  gap: 1rem;
  min-height: 3rem;
`;

const Episodes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
