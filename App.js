import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import ModalTask from "./Components/modalTask";
import GradientBackground from "./assets/gradient.svg";
import Card from "./Components/Card";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const sortedData = data.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    setFilteredData(sortedData);
  }, [data]);

  const deleteData = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const editData = (id) => {
    const newData = data.find((item) => item.id === id);
    setSelectedData(newData);
    setModalVisible(true);
  };

  const filterData = (text) => {
    if (text != "") {
      const newData = data.filter((item) => {
        const itemData = item.title.toLowerCase();
        const textData = text.toLowerCase();

        return itemData.indexOf(textData) > -1;
      });

      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData([]);
      setSearch(text);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ width: "100%" }}
    >
      <ModalTask
        visible={modalVisible}
        selectedData={selectedData}
        onClose={() => {
          setModalVisible(false);
        }}
        onSubmit={(item) => {
          if (item.action === "add") {
            setData([...data, item]);
          } else {
            const newData = data.map((dataItem) => {
              if (dataItem.id === item.id) {
                return item;
              } else {
                return dataItem;
              }
            });
            setData(newData);
          }
          setModalVisible(false);
        }}
      />

      <View style={styles.topViews}>
        <GradientBackground style={styles.gradient} />
        <Text style={styles.bannerText}>Hi, Raditya!</Text>
        <Text style={styles.descriptionText}>Ready to start your day?</Text>

        <View style={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} size={20} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onSubmitEditing={(e) => {
              filterData(e.nativeEvent.text);
            }}
          />
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View style={styles.overviewContainer}>
          <View>
            <Text style={styles.projectText}>Project</Text>
            <Text style={styles.countProject}>
              {search.length > 0
                ? `Found ${filteredData.length || 0} project`
                : `${data.length || 0} Projects`}
            </Text>
          </View>

          <View
            style={{
              width: 100,
              height: 40,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={(e) => {
                setSelectedData(null);
                setModalVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} size={20} color="#FFF" />
              <Text style={{ color: "#FFF" }}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={search.length ? filteredData : data}
          renderItem={({ item }) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                date={item.date}
                onDelete={() => {
                  deleteData(item.id);
                }}
                onEdit={() => {
                  editData(item.id);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          alwaysBounceVertical={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    backgroundColor: "#FAFAFA",
  },
  modal: {
    position: "absolute",
    width: 500,
    height: 500,
    top: 0,
    backgroundColor: "#000",
  },
  modalText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  button: {
    backgroundColor: "#7B55D3",
    borderRadius: 15,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  searchContainer: {
    width: "90%",
    height: 55,
    backgroundColor: "#fff",
    border: "1px solid #000",
    marginTop: 30,
    alignSelf: "center",
    flexDirection: "row",
    display: "flex",
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
  },
  itemContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    backgroundColor: "#FAFAFA",
    padding: 20,
    minHeight: "100%",
  },
  searchInput: {
    marginLeft: 10,
    height: "100%",
    width: "100%",
  },
  bannerText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
  },
  descriptionText: {
    marginTop: 8,
    color: "#fff",
    textOpacity: 0.8,
    fontSize: 18,
  },
  topViews: {
    height: 250,
    width: "100%",
    display: "flex",
    padding: 20,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  projectText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  countProject: {
    fontSize: 18,
    marginTop: 8,
  },
  overviewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
