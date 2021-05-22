import React, {Component} from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';

export default class App extends Component{
    constructor(){
super();
this.state={
text:'',
isSearchedPressed:false,
word:'',
lexicalCategory:'',
examples:[],
definition:""
}
    }
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
            var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
            return fetch(url)
            .then((data)=>{
            if(data.status===200)
            {
                return data.json()
            }
            else
            {
                return null
            }
        })
        .then((response)=>{
            var responseObject = response
            if(responseObject)
            {
                var wordData = responseObject.definitions[0]
                var definition=wordData.description
                var lexicalCategory=wordData.wordtype
                this.setState({
                    "word" : this.state.text,
                    "definition" : definition,
                    "lexicalCategory" : lexicalCategory
    
                }) 
            }
            else
            {
    this.setState({
        "word" : this.state.text,
        "definition" : "Not Found",
    })
    
    
    
    
    
            }
    
        })}
render(){
return(
    <View style={styles.container}>

<Header
backgroundColor={'#9c8210'}
centerComponent={{
    text:'Dictionary App',
    style:{color:'#fff', fontSize:20},
}}
/>

        <View style={styles.inputBoxContainer}>
<TextInput
style={styles.inputBox}
onChangeText={text => {
this.setState({
text:text,
isSearchePressed:false,
word:"Loading...",
lexicalCategory:'',
examples:[],
definition:""
});
}}
value={this.state.text}
/>
</View>

    

<TouchableOpacity
style={styles.SearchButton}
onPress={() => {
this.setState({isSearchedPressed:true});
this.getWord(this.state.text)
}}>
    <Text style={styles.buttonText}>Search</Text>
</TouchableOpacity>





<View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>
        Word:{""}
    </Text>
    <Text style={{fontSize:18}}>
        {this.state.word}
    </Text>
</View>

<View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>
        Type:{""}
    </Text>
    <Text style={{fontSize:18}}>
        {this.state.lexicalCategory}
    </Text>
</View>   

<View style={{flexDirection:'row',flexWrap:'wrap'}}>
    <Text style={styles.detailsTitle}>
        Definition:{""}
    </Text>
    <Text style={{fontSize:18}}>
        {this.state.definition}
    </Text>
</View>   


    


</View>
);
}
}




const styles = StyleSheet.create({
container: {
flex:1
},
inputBoxContainer: {
flex:0.3,
alignItems:'center',
justifyContent:'center'
},
inputBox: {
    width:'80%',
    alignSelf:'center',
    height:40,
    marginTop:100,
    textAlign:'center',
    borderWidth:4,
    outline:'none'
},
SearchButton: {
width:'50%',
height:55,
alignSelf:'center',
padding:10,
margin:10,
},
buttonText:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
},
detailsContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
},
detailsTitle:{
    textAlign:"center",
    fontSize:30,
    color:"white",
}
})

