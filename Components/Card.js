import {
  faDotCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Card(props) {
  const { title, description, date, onDelete, onEdit } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={{
          minHeight: 75,
          maxHeight: 150,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faDotCircle}
              size={10}
              color="#7B55D3"
              style={{
                marginRight: 10,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                textDecoration: "capitalize",
                fontWeight: "600",
              }}
            >
              {title.substring(0, 20)}
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "#7B55D3",
              padding: 10,
              borderRadius: 10,
              color: "#fff",
              fontSize: 12,
            }}
          >
            {date.substring(0, 16)}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 12,
            marginTop: 10,
            marginVertical: 10,
          }}
        >
          {description.substring(0, 100)}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <FontAwesomeIcon
            icon={faEdit}
            size={10}
            color="#fff"
            style={{
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              color: "#fff",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <FontAwesomeIcon
            icon={faTrash}
            size={10}
            color="#fff"
            style={{
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              color: "#fff",
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: "100%",
    borderRadius: 15,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 25,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
