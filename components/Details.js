import { View, Text, Image } from 'react-native';

const Details = ({ route }) => {

    return(
        <View>
            <Image source={{uri: route.params.poster }} style={{height: 250, width: 200, marginTop: 10, marginBottom: 10}} />
            <Text style={{fontSize: 38, fontWeight: "900", marginBottom: 10, textAlign: "center"}}>{route.params.title}</Text>
            <Text style={{fontSize: 16}}>{route.params.synopsis}</Text>
        </View>
    )
}

export default Details;

// Details sera notre composant permettant d'obtenir plus d'informations un film.
// On l'utilise avec react navigation stack.