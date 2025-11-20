import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomNumberBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    generateRandomNumberBetween(min, max, exclude);
  }
  return randomNumber;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen(userNumber) {
  const initialGuess = generateRandomNumberBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // direction >> lower or greater
  function nextGuessHandler(direction) {
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } 
    if (direction === "greater") {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomNumberBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber)
  }

  return (
    <View style={styles.screen}>
      <Title style={styles.title}>Opponent's Guess</Title>
      {/* GUESS */}
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
        {/* + - */}
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent500,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
});
