
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  AsyncStorage,
  Image,
  Alert
} from 'react-native';


var timeLimit = 10;
var timer = null;
var Thing = React.createClass({
  render(){
    return(
      <TouchableOpacity onPress = {()=>this.props.onPress()}>
        {this.props.show ? <Image style={styles.thing} source={require("./ca.png")}/> : null}
      </TouchableOpacity>
    )
  }
})
const STORAGE_KEY= 'Game:data'
export default class Game extends Component {

  constructor(){
    super();
    this.state = {
      highScore :0,
      timeCount :0,
      score :0,
      playing : false,
      holes:[false,false,false,false,false,false,false,false,false] ,
      val : 0
    }
      this.save=this.save.bind(this);
  }

  startGame(){
    this.setState({
      timeCount:timeLimit,
      playing : true,
      score: 0,
     
    });

     things = setInterval( () => {
          var currentHoles = this.state.holes;
          currentHoles[Math.floor(Math.random()*9)] = true;
          if(Math.floor(Math.random()*2)){
            currentHoles = [false,false,false,false,false,false,false,false,false]
          }
          this.setState({
            holes : currentHoles,
            })
            if (!this.state.playing) {
                clearInterval(Thing);
                this.setState({
                    holes: [false, false, false, false, false, false, false, false, false]
                })
            }
        },700);

    timer = setInterval( ()=>{
      this.setState({
        timeCount : this.state.timeCount-1
      });
      if(this.state.timeCount == 0){
        this.stopGame();
      }
    },1000);
  }

  stopGame(){
    if(this.state.score > this.state.highScore){
      Alert.alert('Congratulation!','You Got A New High Score!!');
    }
    clearInterval(timer);
    this.setState({
      playing : false,
      currentHoles : [false,false,false,false,false,false,false,false,false],
      highScore : (this.state.score > this.state.highScore) ? this.state.score : this.state.highScore
    });
    
    this.save();
  }

  handleTouch(holeNumber){
    if(this.state.holes[holeNumber]){
      this.setState({
        holes:this.state.holes[holeNumber]?this.state.score:false,
        score: this.state.score+1
      });
    }

  }

  save(){

    AsyncStorage.setItem(STORAGE_KEY,this.state.highScore+'')
    .then(()=>console.log('saved'))
    .catch((error)=> console.log(error.message)).done();
  }
 
  componentDidMount(){
    AsyncStorage.getItem(STORAGE_KEY)
    .then((value)=> {
      this.setState({
        highScore: value,
      })
    })
    .catch((error)=> console.log('AsyncStorage:'+error.message))
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.scoreRow}>
          <View style={styles.highScore}>
            <Text>High Score</Text>
            <Text style={{fontSize:22}}>{this.state.highScore}</Text>
          </View>
          <View style={styles.timeCount}>
            <Text>Time</Text>
            <Text style={{fontSize:22}}>{this.state.timeCount}</Text>
          </View>
          <View style={styles.currentScore}>
            <Text>Score</Text>
            <Text style={{fontSize:22}}>{this.state.score}</Text>
          </View>
        </View>
     
        <View style={styles.theBigOne}>                 
              <View style={styles.one}>
                <View style={styles.four}><Thing show={this.state.holes[0]} onPress={ () => this.handleTouch(0)}/></View>
                <View style={styles.four}><Thing show={this.state.holes[1]} onPress={ () => this.handleTouch(1)}/></View>
                <View style={styles.four}><Thing show={this.state.holes[2]} onPress={ () => this.handleTouch(2)}/></View>
              </View>
                
             <View style={styles.two}>
                <View style={styles.five}><Thing show={this.state.holes[3]} onPress={() => this.handleTouch(3)}/></View>
                <View style={styles.five}><Thing show={this.state.holes[4]} onPress={() => this.handleTouch(4)}/></View>
                <View style={styles.five}><Thing show={this.state.holes[5]} onPress={() => this.handleTouch(5)}/></View>
              </View>
                
              <View style={styles.three}>
                <View style={styles.six}><Thing show={this.state.holes[6]} onPress={ () => this.handleTouch(6)}/></View>
                <View style={styles.six}><Thing show={this.state.holes[7]} onPress={ () => this.handleTouch(7)}/></View>
                <View style={styles.six}><Thing show={this.state.holes[8]} onPress={ () => this.handleTouch(8)}/></View>
              </View>
          </View>

          <View style={styles.footer}>
            <Button style = {styles.button}
              title="START"
              color="#E74C3C"
              onPress = {this.startGame.bind(this)}
              disabled = {this.state.playing}  />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scoreRow:{
    flex : 1,
    flexDirection : 'row',
    backgroundColor:'#581845'
    
  },
  theBigOne:{
    flex:3,
    flexDirection: 'row',
    backgroundColor : '#900C3F'

  },
   one :{
       flexDirection : 'column',
       flex :1,
       margin:5, 
   },
    two :{   
       flex : 1,
       flexDirection : 'column',
       margin:5,  
    },
    three :{
        flexDirection : 'column',
        flex : 1,
        margin:5,
    },
    four :{
        flex :1,

        margin:5,
        backgroundColor :'#FFC300',
        borderRadius : 15,
        justifyContent : 'center',
        alignItems:'center',
    },
    five :{
        flex : 1,
        margin:5,
        backgroundColor :'#FFC300',
        borderRadius : 15,
        justifyContent : 'center',
        alignItems:'center',
    },
    six :{
        flex :1,
        margin:5,
        backgroundColor :'#FFC300',
        borderRadius : 15,
        justifyContent : 'center',
        alignItems:'center',
    },
 
  highScore : {
    flex: 1,
    backgroundColor:'#FF5733',
    alignItems: 'center',
     borderRadius : 15,
     margin : 20,
     marginLeft : 30,
     justifyContent : 'center'
  },
  currentScore:{
    flex : 1,
    backgroundColor : '#FF5733',
    alignItems: 'center',
     borderRadius : 15,
     margin : 20,
     marginRight : 30,
     justifyContent : 'center'
  },
  timeCount:{
    flex:1,
    backgroundColor : '#FF5733',
    alignItems: 'center',
    borderRadius : 15,
    justifyContent : 'center',
    marginTop : 20,
    marginBottom: 20
  },

  button : {
    flex: 1,
    alignItems: 'center',
     justifyContent : 'center',
     
  },
  footer: {
    flex : 1,
    width : 400,
    flexDirection : 'column',
    justifyContent : 'center',
    backgroundColor : '#900C3F',

  },
  thing : {
    height : 90,
    width : 90
  }

  
  
});

AppRegistry.registerComponent('Game', () => Game);
