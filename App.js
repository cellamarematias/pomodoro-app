import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if(isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
      //correr el timer
    } else {
      // limpiar el interval
      clearInterval(interval);
    }

    if(time === 0) {
      setIsActive(false);
      // los setter nos permiten acceder a un state previo
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  },[isActive, time]);


  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={{
        paddingHorizontal: 15,
        flex: 1,
        paddingTop: Platform.OS === "android" && 30,
      }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setTime={setTime}
          setCurrentTime={setCurrentTime}
        />
        <StatusBar style="auto" />
        <Timer time={time}></Timer>
        <TouchableOpacity style={styles.button} onPress={() => handleStartStop()}>
          <Text style={{ color: "white", fontWeight: "bold"}}>{ isActive ? "STOP": "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//SafeAreaView -> solo para IOS (pone el contenido dentro del área disponible sin meterlo en la barra superior)
// PLatForm -> para distinguir en qué tipo de SO estamos => paddingTop: Platform.OS === "android" && 30 
//


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 32,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center"
  }
});
