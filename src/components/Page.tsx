import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Nav } from "./Nav.tsx";
import { Link } from "react-router-dom";
import { Colors } from "../GlobalStyle.ts";

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PageStyled>
      <Link to="/">
        <Title>React Query</Title>
      </Link>
      <SubTitle>Kennisdeling</SubTitle>
      <Nav />
      {children}
    </PageStyled>
  );
};

const PageStyled = styled.div`
  padding: 2rem;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${Colors.orange};
`;

const SubTitle = styled.h2`
  color: white;
`;
