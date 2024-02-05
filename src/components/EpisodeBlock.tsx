import React from "react";
import styled from "styled-components";
import { Colors } from "../GlobalStyle.ts";

export interface EpisodeBlock {
  episodeId: number;
  name: string;
  airDate: string;
  onClick?: () => void;
}

export const EpisodeBlock: React.FC<EpisodeBlock> = ({ episodeId, name, airDate, onClick }) => {
  return (
    <Block onClick={onClick}>
      <h3>{name}</h3>
      <p>
        {episodeId} - {airDate}
      </p>
    </Block>
  );
};

const Block = styled.div`
  width: 15rem;
  height: 8rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${Colors.lightGray};
`;
