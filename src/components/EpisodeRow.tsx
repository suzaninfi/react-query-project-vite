import React from "react";
import styled from "styled-components";
import { Colors } from "../GlobalStyle.ts";

export interface Props {
  name: string;
}

export const EpisodeRow: React.FC<Props> = ({ name }) => {
  return (
    <Row>
      <h3>{name}</h3>
    </Row>
  );
};

const Row = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${Colors.lightGray};
`;
