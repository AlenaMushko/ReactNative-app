import PropTypes from "prop-types";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const Button = ({ onSubmit, text, disabledBtn }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: disabledBtn ? "#dcdcdc" : "#FF6C00",
      }}
      onPress={onSubmit}
      disabled={disabledBtn}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    padding: 16,
    alignItems: "center",
    borderRadius: 100,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
});

Button.propTypes = {
  onSubmit: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Button;
