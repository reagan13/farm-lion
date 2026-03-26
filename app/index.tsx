import { ActivityIndicator, Text, View } from "react-native";

export default function Splash() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a",
      }}
    >
      <Text style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>
        MATI-ECOM
      </Text>

      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
}
