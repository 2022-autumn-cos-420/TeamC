import React from "react";
import styled from "styled-components";

export const ImportRoot1 = ({}) => {
  const BrowseButtonFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  return (
    <ImportRootRoot>
      <FlexRow>
        <MementoLogo>memento</MementoLogo>
        <FlexRow1>
          <Text1>Decks</Text1>
          <Collection>
            Collection
            <br />
          </Collection>
          <Text1>Study</Text1>
          <Text1>Import</Text1>
        </FlexRow1>
      </FlexRow>
      <ImportUIMenu>
        <Text4>Drag and drop files here</Text4>
        <OutterMenu>
          <IconCloudUpload
            src={`https://file.rendit.io/n/OwHc9p6xiFUsKIJ7w0TZ.svg`}
          />
          <FlexColumn>
            <BrowseButton
              onClick={(e) => BrowseButtonFunction(e, "BrowseButton")}
            />
            <BrowseFiles>
              Browse files
              <br />
            </BrowseFiles>
          </FlexColumn>
        </OutterMenu>
      </ImportUIMenu>
    </ImportRootRoot>
  );
};

const Text1 = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const ImportRootRoot = styled.div`
  width: 1372px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 29px 36px 193px 30px;
  border-width: 1px;
  border-style: solid;
  border-color: #000000;
  background-image: linear-gradient(154deg, #78ca80 0%, #4293a4 149%);
  overflow: hidden;
`;
const FlexRow = styled.div`
  width: 1372px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;
const MementoLogo = styled.div`
  align-self: flex-start;
  color: #ffffff;
  font-size: 53px;
  font-family: Inter;
  white-space: nowrap;
`;
const FlexRow1 = styled.div`
  width: 422px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 19px 0px 0px 0px;
`;
const Collection = styled.div`
  align-self: center;
  color: #ffffff;
  font-size: 22px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const ImportUIMenu = styled.div`
  width: 1087px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 139px 0px 0px;
`;
const Text4 = styled.div`
  left: 407px;
  top: 316px;
  position: absolute;
  color: #ffffff;
  font-size: 24px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const OutterMenu = styled.div`
  width: 253px;
  position: relative;
  gap: 98px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 179px 417px 174px 417px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.5);
`;
const IconCloudUpload = styled.img`
  width: 97px;
  height: 97px;
`;
const FlexColumn = styled.div`
  width: 115px;
  height: 61px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-self: stretch;
  padding: 0px 68px 0px 70px;
`;
const BrowseButton = styled.button`
  width: 253px;
  height: 50px;
  left: 0px;
  top: 23px;
  position: absolute;
  padding: 0px;
  border-width: 0px;
  border-radius: 29px;
  box-sizing: content-box;
  background-color: rgba(105, 171, 94, 0.91);
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const BrowseFiles = styled.div`
  position: relative;
  color: #ffffff;
  font-size: 20px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
