import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

function OrderForm(props) {
  // set the default values for the form inputs
  const [inputs, setInputs] = useState({
    name: {
      value: props.defaultValues ? props.defaultValues.name: "Fulp",
      isValid: true,
    },
    date: {
      value: props.defaultValues
        ? getFormattedDate(props.defaultValues.date)
        : "",
      isValid: true,
    },
    time: {
      value: props.defaultValues ? props.defaultValues.time : "",
      isValid: true,
    },
    size: {
      value: props.defaultValues ? props.defaultValues.size : "",
      isValid: true,
    },
  });


  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const orderData = {
      name: inputs.name.value,
      date: new Date(inputs.date.value),
      time: inputs.time.value,
      size: inputs.size.value,
    };

    const dateIsValid = orderData.date.toString() !== "Invalid Date";
    const timeIsValid = orderData.time.trim().length > 0;
    const sizeIsValid = orderData.size.trim().length > 0;

    if (!dateIsValid || !sizeIsValid || !timeIsValid) {
      setInputs((currentInputs) => {
        return {
          name: { value: currentInputs.name.value },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          time: { value: currentInputs.time.value, isValid: timeIsValid },
          size: {
            value: currentInputs.size.value,
            isValid: sizeIsValid,
          },
        };
      });
    } else {
      props.onSubmit(orderData);
    }
  }

  const formIsInvalid =
    !inputs.date.isValid ||
    !inputs.time.isValid ||
    !inputs.size.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Reservation Details</Text>
    
      <View style={styles.rowContainer}>
        <Input
          style={styles.rowItem}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
        <Input
          style={styles.rowItem}
          label="Time"
          invalid={!inputs.time.isValid}
          textInputConfig={{
            placeholder: "HH:MM AM/PM",
            maxLength: 8,
            onChangeText: inputChangeHandler.bind(this, "time"),
            value: inputs.time.value,
          }}
        />
        <Input
        style={styles.rowItem}
        label="Size"
        invalid={!inputs.size.isValid}
        textInputConfig={{
          placeholder: "Party size",
          onChangeText: inputChangeHandler.bind(this, "size"),
          value: inputs.size.value,
        }}
      />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check inputs!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={props.onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {props.submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default OrderForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  rowItem: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error50,
    margin: 8,
    fontWeight: "bold",
    fontSize: 15
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});