import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";

let ScreenHeight = Dimensions.get("window").height;

const GeniusApi = {
  async search(query) {
    try {
      const accessToken = "680qJIcaw5_5F24rG8fgXTCuOTWG0_qZjiS-Y_y24sSiJ9X6G_CkiWnzfm5of3AC";
      const geniusSearchUrl = `http://api.genius.com/search?q=${query}&access_token=${accessToken}`;
      return (await fetch(geniusSearchUrl)).json();
    } catch (error) {
      console.error(error);
    };
  },

  async searchSongs(query) {
    const data = await this.search(query);

    if (!data) {
      return;
    };

    return data.response.hits.filter((v) => {
      return v.type === "song";
    });
  },
};

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const setAsyncData = async () => {
      setData(await GeniusApi.searchSongs(query));
    }

    setAsyncData();
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>Pesquise uma música:</Text>

        <TextInput multiline style={styles.input} onChangeText={(text) => setQuery(text)} value={query} />

        {
          data.length < 1
          ? (
            <View>
              <Text>Nenhum resultado encontrado</Text>
            </View>
          )
          : data.map((v) => (
            <View key={v.id}>
              <Text style={styles.info}>Título: {v.result?.title}</Text>
            </View>
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    gap: 20,
    maxHeight: ScreenHeight,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    fontSize: 22,
  },
  image: {
    width: 250,
    height: 250,
  },
});
