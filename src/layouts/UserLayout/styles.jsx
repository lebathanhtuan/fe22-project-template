import styled from "styled-components";

export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: calc(100vh - 156px);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 16px;
  margin-left: ${({ isShowSidebar }) => (isShowSidebar ? "200px" : "0")};
  transition: 0.3s all;
`;
