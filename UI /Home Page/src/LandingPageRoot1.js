import React from "react";
import styled from "styled-components";

export const LandingPageRoot1 = ({}) => {
  const AddButtonCircleFunction = (e, name) => {
    alert(`${name} was clicked`);
  };
  return (
    <LandingPageRootRoot>
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
      <FlexRow2>
        <FlexColumn>
          <FlexColumn1>
            <Flashcard1>
              <Flashcard>
                <MarkerCircle
                  src={`https://file.rendit.io/n/blhJHdJX04Ad0kThszDL.svg`}
                />
                <Write2>
                  <br />
                  <Write>
                    Write
                    <br />
                  </Write>
                  <Write1>
                    <br />
                  </Write1>
                </Write2>
                <IconLoop
                  src={`https://file.rendit.io/n/LsR2mcjg91OKPwpy7ouG.svg`}
                />
              </Flashcard>
              <Class4>
                <br />
                <Class1>
                  Class
                  <br />
                </Class1>
                <Class2>
                  <br />
                </Class2>
                <Write1>
                  <br />
                </Write1>
              </Class4>
              <Deck3>
                <br />
                <Class1>
                  Deck
                  <br />
                </Class1>
                <Class2>
                  {" "}
                  <br />
                  <br />
                  <br />
                </Class2>
                <Write1>
                  <br />
                </Write1>
              </Deck3>
            </Flashcard1>
            <Component>
              <SilverFlexColumn>
                <Ellipse
                  src={`https://file.rendit.io/n/km03RJnyezew6C20HsVO.svg`}
                />
              </SilverFlexColumn>
            </Component>
          </FlexColumn1>
          <FlexColumn2>
            <AddButtonCircle
              onClick={(e) => AddButtonCircleFunction(e, "AddButtonCircle")}
            >
              <IconPlus
                src={`https://file.rendit.io/n/524pMiI0DZnz7aSJH61r.svg`}
              />
            </AddButtonCircle>
            <Text4>Add</Text4>
          </FlexColumn2>
        </FlexColumn>
        <IconSettings
          src={`https://file.rendit.io/n/lGfMgAJfqcIjVv2iZg78.svg`}
        />
      </FlexRow2>
    </LandingPageRootRoot>
  );
};

const Text1 = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const Write1 = styled.div`
  display: contents;
  color: #818181;
  font-size: 32px;
  font-family: Inter;
`;
const Class1 = styled.div`
  display: contents;
  color: #818181;
  font-size: 18px;
  font-family: Inter;
`;
const Class2 = styled.div`
  display: contents;
  color: #818181;
  font-size: 16px;
  font-family: Inter;
`;
const LandingPageRootRoot = styled.div`
  width: 1382px;
  height: 968px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 29px 26.4px 25px 30px;
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
  align-items: center;
  padding: 0px 9.59px 0px 0px;
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
const FlexRow2 = styled.div`
  width: 1140px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 0px 242px;
`;
const FlexColumn = styled.div`
  width: 964px;
  height: 746px;
  gap: 61px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const FlexColumn1 = styled.div`
  width: 964px;
  gap: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Flashcard1 = styled.div`
  width: 908px;
  height: 197px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: flex-start;
  padding: 0px 0px 313px 56px;
`;
const Flashcard = styled.div`
  width: 837px;
  height: 452px;
  left: 0px;
  top: 9px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px 22.8px 19px 34px;
  border-radius: 21px;
  background-color: #f9f9f9;
`;
const MarkerCircle = styled.img`
  width: 14px;
  height: 14px;
  margin: 0px 249px 0px 0px;
`;
const Write2 = styled.div`
  width: 300px;
  height: 155px;
  margin: 143px 244px 0px 0px;
  color: #818181;
  font-size: 32px;
  font-family: Inter;
  text-align: center;
`;
const Write = styled.div`
  display: contents;
  color: #7b7979;
  font-size: 64px;
  font-family: Inter;
`;
const IconLoop = styled.img`
  width: 30.2px;
  height: 27px;
  align-self: flex-end;
`;
const Class4 = styled.div`
  width: 265px;
  position: relative;
  color: #818181;
  font-size: 32px;
  font-family: Inter;
`;
const Deck3 = styled.div`
  width: 141px;
  position: relative;
  align-self: flex-end;
  color: #818181;
  font-size: 32px;
  font-family: Inter;
`;
const Component = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 0px 0px 427px;
`;
const SilverFlexColumn = styled.div`
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 1.18px 0px 27.1px;
  border-radius: 30px;
  background-color: #bfbfbf;
`;
const Ellipse = styled.img`
  width: 11.8px;
  height: 11.7px;
`;
const FlexColumn2 = styled.div`
  width: 60px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0px 487px 0px 417px;
`;
const AddButtonCircle = styled.button`
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  padding: 0px;
  padding-right: 15px;
  padding-left: 15px;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/mcdTH6hqFzuawSSYm8si.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const IconPlus = styled.img`
  width: 30px;
  height: 30px;
`;
const Text4 = styled.div`
  margin: 0px 14px 0px 0px;
  color: #ffffff;
  font-size: 16px;
  font-family: Inter;
  text-align: center;
  white-space: nowrap;
`;
const IconSettings = styled.img`
  width: 41.6px;
  height: 44px;
  align-self: flex-end;
`;
