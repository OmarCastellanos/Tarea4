import React, {useState, useEffect} from "react";
import {View,Text, StyleSheet, TouchableOpacity,Animated,Easing} from 'react-native';
import {Card} from '../components/Card';
import { shuffle } from "lodash";

const GameScreen =()=> {
    const [cards, SetCards]=useState<string[]>([]);
    const [selectedCards, setSelectedCards]= useState<number[]>([]);
    const [attempts, setAttemps]= useState(0);
    const [gameOver, setGameOver]= useState(false);

    useEffect(() => {
    const initialCards = generateCards();
    SetCards(initialCards);
    },[] );

const generateCards =(): string [] => {
    const cardImages = Array.from (Array(26).keys()).map(index => require('../assets/cards/${index + 1}.png'));
    const duplicatedCardImage = [...cardImages, ...cardImages];
    return shuffle (duplicatedCardImage);
};

const handleCardPress =(index: number)=>{
    if (selectedCards.length< 2 && !selectedCards.includes(index)){
        setSelectedCards([...selectedCards, index]);
        setAttemps(prevAttempts => prevAttempts +1);
    }
    if (selectedCards.length === 1 && !selectedCards.includes(index)){
        if (cards[selectedCards[0]] === cards[index]){
            setSelectedCards([]);
        } else{
            setTimeout(()=>{
                setSelectedCards([]);
            },1000);
        }

    }
};

useEffect(() => {
    if (selectedCards.length === 2){
        const timer = setTimeout(() => {
            setSelectedCards([]);
        },1000);

        return ()=> clearTimeout(timer);
    }
}, [selectedCards]);

useEffect(() => {
    if (selectedCards.length === cards.length) {
      setGameOver(true);
    }
  }, [cards, selectedCards]);

return(
    <View style={styles.container}>
      <View style={styles.grid}>
        {cards.map((cardImage, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => handleCardPress(index)}
            disabled={gameOver}
          >
            {(selectedCards.includes(index) || gameOver) && (
              <Card image={cardImage} isSelected={true} onCardPress={() => {}} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text>Attempts: {attempts}</Text>
      {gameOver && <Text>Congratulations! You won!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContainer: {
      margin: 5,
      width: 80,
      height: 120,
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default GameScreen;