import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ActivityIndicator, Card, Paragraph, Title } from "react-native-paper";

interface IData {
  name: string,
  date_utc: string,
  details: string,
  cores: [{
    reused: string
  }]
  links: {
    flickr: {
      original: string[]
    }
  }
}

const LaunchPage = ({ route }: (any)) => {
  const { lauchpadId } = route.params;

  const [launchPad, setLaunchPad] = useState<null | IData>(null);
  const [readMoreState, setReadMoreStae] = useState<boolean>(false);
  const getLaunchPad = async () => {
    const responseData: any = await fetch("https://api.spacexdata.com/v4/launches/" + lauchpadId);
    const jsonData: IData = await responseData.json();
    setLaunchPad(jsonData);
  };
  useEffect(() => {
    getLaunchPad();
  }, []);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return !launchPad ? <ActivityIndicator animating={true} /> : <ScrollView>
    {
      launchPad && <Card
        style={{
          margin: 10,
          elevation: 100,
          shadowColor: "#52006A",
          borderRadius: 8,
        }}
      >
        <Card.Content>
          <Title>
            {launchPad.name}
          </Title>
          <Card.Cover source={launchPad.links.flickr.original[0] ?
            { uri: launchPad.links.flickr.original[0] } :
            require("../../assets/spacex.jpg")
          } />
          {
            launchPad.details && <Paragraph>
              {launchPad.details.split("").splice(0, readMoreState ? launchPad.details.length - 1 : 400).join("")}{"  "}
              <Text style={{ color: "#2536e7" }}
                    onPress={() => {
                      setReadMoreStae(!readMoreState);
                    }
                    }
              >{readMoreState ? "read less" : "read more"}</Text>
            </Paragraph>
          }
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              <Text>
                Date of Launch
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {launchPad.date_utc.split("T")[0].split("-")[2] + " " + month[Number(launchPad.date_utc.split("T")[0].split("-")[1]) - 1] + " " + launchPad.date_utc.split("T")[0].split("-")[0]}
              </Text>
            </View>
            <View>
              <Text>
                Reused?
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {launchPad.cores[0].reused ? <Text style={{ color: "#13ea0b" }}>Yes</Text> :
                  <Text style={{ color: "#ee2409" }}>No</Text>}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    }
  </ScrollView>;
};

export default LaunchPage;
