import { EpisodesResponse } from "./dtos";

const url = "http://localhost:3000";

export const fetchWatchList = async (): Promise<{ id: string; name: string }[]> => {
  await sleep(500);
  const response = await fetch(url + "/watch-list");

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  return await response.json();
};

export const addToWatchList = async (episode: {
  id: string;
  name: string;
}): Promise<EpisodesResponse> => {
  await sleep(500);
  const response = await fetch(url + "/watch-list", {
    method: "POST",
    body: JSON.stringify(episode),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  return await response.json();
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
