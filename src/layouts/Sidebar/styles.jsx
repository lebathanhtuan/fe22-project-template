import styled, { css } from "styled-components";

export const SidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ isShow }) => (isShow ? "0" : "-200px")};
  width: 200px;
  background-color: #d3adf7;
  overflow: hidden;
  transition: 0.3s all;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #b37feb;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #b37feb;
      border-right: 5px solid #722ed1;

      &:hover {
        background-color: #b37feb;
      }
    `}
`;
