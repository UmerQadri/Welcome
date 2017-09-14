import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions, Animated, Text, TouchableOpacity } from 'react-native';
import {styles} from './styles'

const { width } = Dimensions.get('window');



const photos = [
  {
    heading: 'Connect With Friends',
    text: 'Bycycling is more fun with friends. Share your events participate with others and get upto date about your community'
  },
  {
    heading: "Connect With Friends",
    text: 'Bycycling is more fun with friends. Share your events participate with others and get upto date about your community'
  },
  {
    heading: "Connect With Friends",
    text: 'Bycycling is more fun with friends. Share your events participate with others and get upto date about your community'
  },
  {
    heading: "Connect With Friends",
    text: 'Bycycling is more fun with friends. Share your events participate with others and get upto date about your community'
  },
  {
    heading: "Connect With Friends",
    text: 'Bycycling is more fun with friends. Share your events participate with others and get upto date about your community'
  },
];

class App extends Component {
  scrollX = new Animated.Value(0) // this will be the scroll location of our ScrollView

  render() {
    // position will be a value between 0 and photos.length - 1 assuming you don't scroll pass the ends of the ScrollView
    let position = Animated.divide(this.scrollX, width);

    return (
      <Image
        source={require('./background.png')}
        style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
        <View style={{alignItems: 'center', justifyContent: 'space-around', position: 'absolute', width: '100%', height: '100%'}}>
          <Image source={require('./logo.png')} style={styles.logo}/>
          <Image source={require('./usersImage.png')} style={styles.usersImage}/>

            <View
            style={{ flexDirection: 'row',
              marginBottom: "-20%"
            }} // this will layout our dots horizontally (row) instead of vertically (column)
            >
            {photos.map((_, i) => { // the _ just means we won't use that parameter
              let backgroundColor = position.interpolate({
                inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                outputRange: ["#fff", "#EDB800", "#fff"], // when position is not i, the opacity of the dot will animate to 0.3
                // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
              });
              return (
                <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                  key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                  style={{
                    height: ((Dimensions.get('window').width)/100) * 2,
                    width: ((Dimensions.get('window').width)/100) * 2,
                    backgroundColor, margin: 4, borderRadius: ((Dimensions.get('window').width)/100) * 1}}
                />
              );
            })}
            </View>


        <View style={{flexDirection: 'row',
          marginBottom: '4%'
        }}>
          <TouchableOpacity style={{backgroundColor: 'grey', width: "35%", marginRight: "3%", padding: "4%"}}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: "#EDB800",width: "35%", marginLeft: "3%",padding: "4%"}}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            Next
          </Text>
        </TouchableOpacity></View>



    </View>

    <ScrollView
      ref={ref => this.scrollView = ref}
    onContentSizeChange={(contentWidth, contentHeight)=>{
        this.scrollView.scrollTo({x: contentWidth, animated: true});
    }}
      horizontal={true}
      pagingEnabled={true} // animates ScrollView to nearest multiple of it's own width
      showsHorizontalScrollIndicator={false}
      // the onScroll prop will pass a nativeEvent object to a function
      onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
        [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
      )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
      scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
      style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height}}
      >

      {photos.map((source, i) => { // for every object in the photos array...
        return ( // ... we will return a square Image with the corresponding object as the source
          <View
            key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
            style={{width: Dimensions.get('window').width,alignItems: 'center',borderWidth: 1, borderColor: '#fff',
            }}
            >
            <View style={{width: "74%",top: '60%'}}>
          <Text style={{color: "#EDB800", textAlign:'center', fontSize: ((Dimensions.get('window').height)/100)* 2.2, marginBottom: '2%'}}>{source.heading}</Text>
          <Text style={{color: "#fff", textAlign: 'center', fontSize: ((Dimensions.get('window').height)/100)* 2.2}}> {source.text} </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>


      </Image>
    );
  }
}

export default App;
