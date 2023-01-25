import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";

export default function modalTask(props) {
  const { visible, onClose, onSubmit, selectedData } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toUTCString());
  const [error, setError] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePick, setIsDatePick] = useState(false);

  useEffect(() => {
    if (selectedData?.id) {
      setTitle(selectedData.title);
      setDescription(selectedData.description);
      setDate(selectedData.date);
    }
  }, [selectedData]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
  };

  const formValidation = () => {
    const newError = { ...error };
    let formIsValid = true;

    if (!title) {
      newError.title = "Title is required";
      formIsValid = false;
    }

    if (!description) {
      newError.description = "Description is required";
      formIsValid = false;
    }

    if (!date) {
      newError.date = "Date is required";
      formIsValid = false;
    }

    setError(newError);

    return formIsValid;
  };

  useEffect(() => {
    setModalVisible(visible);

    setError({
      title: "",
      description: "",
      date: "",
    });
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={styles.modal}
    >
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={() => {
            onClose();
            clearForm();
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <FontAwesomeIcon icon={faXmark} size={30} />
        </TouchableOpacity>

        {isDatePick && (
          <>
            <Text style={styles.modalText}>Select Date</Text>
            <DatePicker
              style={{
                marginTop: 40,
              }}
              options={{
                date: date,
                backgroundColor: "#fff",
                mainColor: "#7B55D3",
              }}
              onSelectedChange={(date) => {
                setDate(date);
                setIsDatePick(false);
              }}
            />
          </>
        )}

        {!isDatePick && (
          <>
            <Text style={styles.modalText}>
              {selectedData?.id ? "Edit Task" : "Add Task"}
            </Text>

            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Title
            </Text>

            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
              }}
              onChangeText={(text) => setTitle(text)}
              value={title}
              placeholder="Enter title"
            />

            {error.title ? (
              <Text style={{ color: "red", marginTop: 5 }}>{error.title}</Text>
            ) : null}

            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Description
            </Text>

            <TextInput
              style={{
                height: 100,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="Enter description"
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setDescription(text)}
              value={description}
            />

            {error.description ? (
              <Text style={{ color: "red", marginTop: 5 }}>
                {error.description}
              </Text>
            ) : null}

            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Deadline
            </Text>

            <TouchableOpacity
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
              }}
              onPress={() => {
                setIsDatePick(true);
              }}
            >
              <Text>{date}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#7B55D3",
                padding: 10,
                borderRadius: 5,
                marginTop: 50,
              }}
              onPress={() => {
                const validation = formValidation();

                if (validation) {
                  onSubmit({
                    action: selectedData?.id ? "update" : "add",
                    id: selectedData?.id || new Date().getTime(),
                    title,
                    description,
                    date,
                  });
                  clearForm();
                }
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                {selectedData?.id ? "Update Task" : "Add Task"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
  modalText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
});
