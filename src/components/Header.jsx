import { View, Text, Touchable, StyleSheet, TouchableOpacity } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({setTime, setCurrentTime, currentTime}) {

    function handlePress(index) {
        const newTime = index == 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
    <View style={{ flexDirection: "row"}}>
        {options.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(index)} 
            style={[
                styles.itemStyle, 
                currentTime !== index && {borderColor: 'transparent'}
                ]}>
                <Text style={{fontWeight: "bold"}}>{item}</Text>
            </TouchableOpacity>
        ))}
    </View>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        width: "33%",
        borderWidth:3,
        padding: 5,
        borderColor: "white",
        borderRadius: 10,
        marginVertical: 20,
        alignItems: "center"
    }
})