import styled from "styled-components";
import rwdConfig from "../config/rwdConfig";

const Wrapper = styled.div`
  position: relative;
  width: 70%;
  height: 80%;
  left: 15%;
  top: 5%;
  border: 2px solid ${process.env.REACT_APP_GRAY};
  border-radius: 1rem;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Title = styled.div`
  position: relative;
  weight: 100%;
  font-size: 1.5rem;
  font-weight: 900;
  margin: 1rem;
  border-bottom: 2px solid ${process.env.REACT_APP_BLACK};
`;

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  // border: 1px solid ${process.env.REACT_APP_BLACK};
  > label {
    margin-right: 1rem;
    > input {
      width: 9rem;
    }
  }
  > button {
    width: 6rem;
    height: 1.8rem;
    margin-right: 1rem;
    border: 1px solid ${process.env.REACT_APP_BLACK};
  }
  @media ${rwdConfig.laptopL} {
    flex-direction: column;
    align-items:flex-start;
    font-size: 1.2rem;
    > label {
      margin-top:0.5rem;
      > input {
        width: 6rem;
      }
    }
    >button{
      width:5rem;
      margin-top:0.5rem;
    }
  }
  @media ${rwdConfig.tablet} {
    font-size: 1rem;
  }
  @media ${rwdConfig.mobileL} {
  }
`;

const Button = styled.button`
  &:hover {
    background-color: ${process.env.REACT_APP_LIGHT_GRAY};
  }
`;

const SearchResultWrapper = styled.div`
  position: relative;
  min-height: 10rem;
  margin: 1rem 3rem;
  // border: 1px solid ${process.env.REACT_APP_BLACK};
  > div:nth-child(1) {
    color: ${process.env.REACT_APP_GRAY};
    margin-bottom: 0.5rem;
  }
  > div:nth-child(2) {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }
  > div:nth-child(3) {
    > div {
      > span:nth-child(1) {
        display: inline-block;
        width: 8rem;
        color: ${process.env.REACT_APP_GRAY};
      }
      > span:nth-child(2) {
        color: ${process.env.REACT_APP_BLACK};
      }
    }
  }
`;

const ErrorMsg = styled.div`
  position: relative;
  margin: 1rem;
  padding: 0.3rem 0.6rem;
  background-color: ${process.env.REACT_APP_ERROR_MSG_BG};
  border: 1px solid ${process.env.REACT_APP_ERROR_MSG_BORDER};
  border-radius: 0.2rem;
`;

const SearchHistoryWrapper = styled.div`
  position: relative;
  margin: 1rem;
  // border: 1px solid #000;
`;

const SearchHistoryItemDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1.3rem 0rem;
  padding: 0.4rem;
  font-weight: 700;
  border-bottom: 1px solid ${process.env.REACT_APP_LIGHT_GRAY};
  > div {
    display: flex;
    align-items: center;
  }
  //border:1px solid #000;
`;

const IconWrapper = styled.div`
  & svg {
    cursor: pointer;
    width: 1rem;
    height: auto;
    padding: 0.4rem;
    background-color: ${process.env.REACT_APP_LIGHT_GRAY};
    border-radius: 50%;
    & path {
      fill: ${process.env.REACT_APP_BLACK};
    }
    &:hover {
      & path {
        fill: #fff;
      }
    }
  }
  //border: 1px solid #fff;
`;

export {
  Wrapper,
  Title,
  SearchBarWrapper,
  Button,
  SearchResultWrapper,
  ErrorMsg,
  SearchHistoryWrapper,
  SearchHistoryItemDiv,
  IconWrapper,
};
