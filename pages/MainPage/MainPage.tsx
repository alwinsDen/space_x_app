import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { ActivityIndicator, Card, Paragraph, Title } from "react-native-paper";
import CardTile from "../../components/button tiles/CardTile";

interface IData {
  id: string,
  full_name: string,
  status: string,
  details: string,
  launches: string[],
  images: {
    large: string[]
  }
}

const MainPage = ({ navigation }: (any)) => {
  const [rocketData, setRocketData] = useState<null | IData[]>(null);

  const getAllLaunchPads = async () => {
    const returnData: any = await fetch("https://api.spacexdata.com/v4/landpads");
    const jsonData: IData[] = await returnData.json();
    setRocketData(jsonData);
  };

  useEffect(() => {
    getAllLaunchPads();
  }, []);

  return !rocketData ? <ActivityIndicator animating /> : (
    <ScrollView>
      {
        rocketData && rocketData.map((data: IData, index) => {
          return <Card
            style={{
              margin: 10,
              elevation: 20,
              shadowColor: "#52006A",
              borderRadius: 8,
            }}
            key={data.id}
          >
            <Card.Cover source={{ uri: data.images.large[0] }} />
            <Card.Content style={{
              padding: 10,
              width: "100%",
            }}>
              <Title
              >
                <Text
                  style={{
                    color: "#000000",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                    }}
                  >
                    {data.full_name}
                  </Text>
                  {"     "}
                  <Text
                    style={{
                      fontSize: 14,
                      color: data.status === "active" ? "#2be122" : "#e50808",
                    }}
                  >
                    {"\u2B24"}{" "}{data.status}
                  </Text>
                </Text>
              </Title>
              <Paragraph
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  lineHeight: 20,
                }}
              >
                {data.details.split("").splice(0, 400).join("") + "..."}
                <Text style={{ color: "#2536e7" }}>read more</Text>
              </Paragraph>
            </Card.Content>
            <Card.Content
              style={{
                margin: 0,
              }}
            >
              <Title
                style={{
                  fontSize: 12,
                }}
              >
                Launch pads:
              </Title>
              {
                data.launches.length && data.launches.slice(0, 3).map((launch: string, indexString) => {
                  return <CardTile id={launch} navigation={navigation} key={indexString + data.id}/>;
                })
              }
            </Card.Content>
          </Card>;
        })
      }
    </ScrollView>
  );
};

export default MainPage;
