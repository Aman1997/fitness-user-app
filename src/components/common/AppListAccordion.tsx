import React from "react";
import {List} from "react-native-paper";
import {Text} from "react-native";
import {ScaledSheet, scale} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, OFF_WHITE} from "../../assets/constants/colors";

interface IProps {
  data: Array<{
    id: number;
    heading: string;
    descText: string;
  }>;
}

export default function AppListAccordion({data}: IProps) {
  return (
    <List.AccordionGroup>
      {data.map((item) => {
        return (
          <List.Section key={item.id} style={{marginBottom: scale(2)}}>
            <List.Accordion
              title={item.heading}
              id={item.id}
              titleNumberOfLines={2}
              titleStyle={{color: HEAD_TEXT, fontSize: scale(13)}}
              style={styles.contentContainer}
            >
              <Text style={styles.descText}>{item.descText}</Text>
            </List.Accordion>
          </List.Section>
        );
      })}
    </List.AccordionGroup>
  );
}

const styles = ScaledSheet.create({
  contentContainer: {
    paddingVertical: "2@s",
    backgroundColor: OFF_WHITE,
  },
  descText: {
    marginTop: "2@s",
    paddingVertical: "10@s",
    paddingHorizontal: "12@s",
    fontSize: "13@s",
    borderBottomLeftRadius: "10@s",
    borderBottomRightRadius: "10@s",
    backgroundColor: OFF_WHITE,
    color: CONTENT,
  },
});
