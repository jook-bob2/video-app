import styled, { css } from 'styled-components';

// 컨테이너
const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const LiveTop = styled.div`
  display: flex;
`;

const LiveBottom = styled.div`
  display: flex;
  /* height: 100%; */
  position: relative;
  /* width: 100%; */

  @media screen and (max-width: 1024px) {
    width: 0;
    height: 0;
    display: none;
  }
`;

const Left = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Right = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  /* width: 28%; */

  @media screen and (max-width: 1023px) {
    flex-direction: column;
    width: 0;
    display: none;
  }
`;

// 비디오 영역
const VideoArea = styled.article<{ isVertical?: boolean }>`
  background-color: rgb(0, 0, 0);
  width: 100%;

  @media screen and (min-width: 1024px) {
    padding-top: 56.25%;
  }
  @media screen and (max-width: 1023px) {
    ${({ isVertical }) => {
      if (isVertical) {
        return css`
          height: 100%;
          padding: 0;
        `;
      }

      return css`
        padding-top: 56.25%;
      `;
    }}
  }
`;

// 채팅 영역
const ChatArea = styled.aside`
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(228, 228, 228);
  border-left: 1px solid rgb(228, 228, 228);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  @media screen and (max-width: 1023px) {
    display: none;
    width: 0;
    height: 0;
  }
`;

const ChatHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid rgb(228, 228, 228);
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  position: relative;
  width: 351px;
`;

const ChatContent = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatBody = styled.div`
  padding-left: 1rem;
  padding-top: 0.5rem;
`;

const ChatInputBox = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;

const ChatForm = styled.form`
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgb(228, 228, 228);
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem 1rem;
  position: relative;
  width: 100%;
`;

const ChatInput = styled.input`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(211, 211, 211);
  border-radius: 0.25rem;
  flex: 1 1 0%;
  font-size: 12px;
  height: 100%;
  outline: transparent solid 2px;
  outline-offset: 2px;
  overflow: hidden;
  padding: 0.25rem 0.5rem;
`;

// MC정보 영역
const McInfoArea = styled.article`
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(228, 228, 228);
  padding: 1rem 1rem 1.25rem;
  width: 100%;
`;

// 꿀잼 라이브 목록 영영
const HoneyLiveListArea = styled.article`
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 100%;
`;

// PC
// 방송자 정보
const MCInfoWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto 0;
  overflow: hidden;
  /* padding-bottom: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem; */

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

// 방송 / 방송자 정보
const MCInfo = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 1rem;

  // mc 뱃지, 닉네임, 아이디
  .mc-info-wrap {
    align-items: center;
    cursor: pointer;
    display: flex;
    margin-bottom: 10px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Container,
  VideoArea,
  ChatArea,
  McInfoArea,
  HoneyLiveListArea,
  LiveTop,
  LiveBottom,
  Left,
  Right,
  ChatHeader,
  ChatContent,
  ChatForm,
  ChatBody,
  ChatInputBox,
  ChatInput,
  MCInfoWrapper,
  MCInfo,
};
