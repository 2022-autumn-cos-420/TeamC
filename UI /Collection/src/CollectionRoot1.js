import React from "react";
import styled from "styled-components";

export const CollectionRoot1 = ({}) => {
  const EditButtonFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const AssignButtonFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  const DeleteButtonFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  return (
    <CollectionRootRoot>
      <FlexColumn>
        <MementoLogo>memento</MementoLogo>
        <Collection2>
          <br />
          <Collection>
            Collection
            <br />
          </Collection>
          <Collection1>
            <br />
          </Collection1>
        </Collection2>
      </FlexColumn>
      <FlexColumn1>
        <FlexRow>
          <Text1>Decks</Text1>
          <Collection3>
            Collection
            <br />
          </Collection3>
          <Text1>Study</Text1>
          <Text1>Import</Text1>
        </FlexRow>
        <FlexRow1>
          <FlexColumn2>
            <EditButton onClick={(e) => EditButtonFunction(e, "EditButton")}>
              <IconPencil
                src={`https://file.rendit.io/n/wQNcqjZtH3Pkdx3nlwcT.svg`}
              />
            </EditButton>
            <Edit>
              Edit
              <br />
            </Edit>
          </FlexColumn2>
          <FlexColumn3>
            <AssignButton
              onClick={(e) => AssignButtonFunction(e, "AssignButton")}
            >
              <IconFolderOpen
                src={`https://file.rendit.io/n/WXCzH8U22m3EMPlLJJUe.svg`}
              />
            </AssignButton>
            <Edit>
              Assign
              <br />
            </Edit>
          </FlexColumn3>
          <FlexColumn4>
            <DeleteButton
              onClick={(e) => DeleteButtonFunction(e, "DeleteButton")}
            >
              <IconTrash
                src={`https://file.rendit.io/n/AWXeYQKewibNjaYdcviF.svg`}
              />
            </DeleteButton>
            <Edit>
              Delete <br />
            </Edit>
          </FlexColumn4>
        </FlexRow1>
      </FlexColumn1>
      <OutterMenu>
        <FlexRow2>
          <Name1>
            Name
            <br />
            <br />
          </Name1>
          <FlexColumn5>
            <Front>
              Front
              <br />
              <br />
            </Front>
            <Text4>In today’s lecture</Text4>
          </FlexColumn5>
          <COS>
            COS 420 <br />
          </COS>
        </FlexRow2>
        <FlexColumn6>
          <PHI>
            PHI 100
            <br />
          </PHI>
          <Text4>
            Quote by ...
            <br />
          </Text4>
        </FlexColumn6>
        <FlexColumn7>
          <PHI>
            NMD 324
            <br />
          </PHI>
          <Text4>
            Exposure triangle...
            <br />
          </Text4>
        </FlexColumn7>
        <Image1 src={`https://file.rendit.io/n/QFWBpIgLDjKw86ZEy0qc.svg`} />
      </OutterMenu>
    </CollectionRootRoot>
  );
};

const Text1 = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const Edit = styled.div`
  position: relative;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const Text4 = styled.div`
  width: 838px;
  height: 29px;
  position: relative;
  color: #ffffff;
  font-size: 24px;
  font-family: Inter;
`;
const PHI = styled.div`
  width: 838px;
  height: 29px;
  left: 0px;
  top: 6px;
  position: absolute;
  color: #ffffff;
  font-size: 24px;
  font-family: Inter;
`;
const CollectionRootRoot = styled.div`
  width: 1393px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 29px 36px 777px 9px;
  border-width: 1px;
  border-style: solid;
  border-color: #000000;
  background-image: linear-gradient(154deg, #78ca80 0%, #4293a4 149%);
  overflow: hidden;
`;
const FlexColumn = styled.div`
  width: 350px;
  height: 216px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const MementoLogo = styled.div`
  left: 21px;
  top: 0px;
  position: absolute;
  color: #ffffff;
  font-size: 53px;
  font-family: Inter;
  white-space: nowrap;
`;
const Collection2 = styled.div`
  width: 350px;
  height: 160px;
  position: relative;
  color: #818181;
  font-size: 32px;
  font-family: Inter;
  text-align: center;
`;
const Collection = styled.div`
  display: contents;
  color: #ffffff;
  font-size: 40px;
  font-family: Inter;
`;
const Collection1 = styled.div`
  display: contents;
  color: #818181;
  font-size: 32px;
  font-family: Inter;
`;
const FlexColumn1 = styled.div`
  width: 534px;
  height: 178px;
  position: relative;
  gap: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 19px 0px;
`;
const FlexRow = styled.div`
  width: 534px;
  gap: 41px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`;
const Collection3 = styled.div`
  align-self: center;
  color: #ffffff;
  font-size: 22px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const FlexRow1 = styled.div`
  width: 534px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const FlexColumn2 = styled.div`
  width: 30px;
  height: 45px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 58px 0px 72px;
`;
const EditButton = styled.button`
  height: 23px;
  left: 0px;
  top: 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
  padding-top: 5px;
  padding-right: 91px;
  padding-bottom: 5px;
  padding-left: 49px;
  border-width: 0px;
  border-radius: 12px;
  box-sizing: content-box;
  background-color: #78ca80;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const IconPencil = styled.img`
  width: 20px;
  height: 20px;
`;
const FlexColumn3 = styled.div`
  width: 52px;
  height: 45px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 45px 0px 63px;
`;
const AssignButton = styled.button`
  left: 0px;
  top: 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
  padding-top: 9px;
  padding-right: 103px;
  padding-bottom: 11px;
  padding-left: 41px;
  border-width: 0px;
  border-radius: 12px;
  box-sizing: content-box;
  background-color: #44c4b6;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const IconFolderOpen = styled.img`
  width: 16px;
  height: 13px;
`;
const FlexColumn4 = styled.div`
  width: 54px;
  height: 45px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 45px 0px 61px;
`;
const DeleteButton = styled.button`
  left: 0px;
  top: 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
  padding-top: 9px;
  padding-right: 104px;
  padding-bottom: 10px;
  padding-left: 45px;
  border-width: 0px;
  border-radius: 12px;
  box-sizing: content-box;
  background-color: #bc4c4d;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const IconTrash = styled.img`
  width: 11.2px;
  height: 14px;
`;
const OutterMenu = styled.div`
  width: 1198px;
  height: 742px;
  left: 89px;
  top: 193px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 32px 42px 32px 40px;
  border-radius: 16px;
  background-color: rgba(223, 223, 223, 0.4);
  backdrop-filter: blur(0px);
`;
const FlexRow2 = styled.div`
  width: 1198px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 16px 0px;
`;
const Name1 = styled.div`
  position: relative;
  color: #ffffff;
  font-size: 24px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const FlexColumn5 = styled.div`
  width: 838px;
  height: 69px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 9px 0px;
`;
const Front = styled.div`
  left: 0px;
  top: 0px;
  position: absolute;
  color: #ffffff;
  font-size: 24px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const COS = styled.div`
  width: 838px;
  height: 29px;
  left: 0px;
  top: 55px;
  position: absolute;
  color: #ffffff;
  font-size: 24px;
  font-family: Inter;
`;
const FlexColumn6 = styled.div`
  width: 838px;
  height: 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0px 0px 21px 0px;
  padding: 0px 0px 0px 360px;
`;
const FlexColumn7 = styled.div`
  width: 838px;
  height: 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px 0px 0px 360px;
`;
const Image1 = styled.img`
  width: 1227px;
  height: 668px;
  left: 20px;
  top: 68.5px;
  position: absolute;
`;
