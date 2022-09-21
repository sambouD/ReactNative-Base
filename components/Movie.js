import { StyleSheet, View, Text, Pressable, Image, Button } from "react-native";
import { useState } from "react";

const Movie = (props) => { // On créé notre fonction de composant.
    // Pour récupérer les props, on utilise un système de paramètre au sein de la fonction du composant.
    // On ajoute navigation à la liste des paramètres, navigation nous permettra d'utiliser un ensemble de méthode pour naviguer sur notre application.
    
    const [isTrue, setIsTrue] = useState(true);

    let componentFav; 

    // Affichage conditionnel 
    // On affiche un composant selon une condition donnée. 
    if(isTrue){
        componentFav = <Text style={styles.btnText}>Ajouter aux favoris</Text>
    } else {
        componentFav = <Text style={styles.btnText}>Enlever des favoris</Text>
    }

    // On a aussi la possibilité d'afficher ou non un composant à l'aide d'un condition posée directement dans le return 
    // exemple : {isTrue && <Text>test</Text>}

    // L'affichage conditionnelle peut être utilisé à l'aide de ternaire. On pourra l'utiliser sur les composants mais aussi sur les props (avec style par exemple).
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: props.poster}} />
            <Pressable style={isTrue ? styles.btnBlue : styles.btnRed} onPress={()=>{props.addFav(props.title, props.synopsis), setIsTrue(!isTrue) }}>
                {componentFav}
            </Pressable>
            {isTrue && <Text>Le film n'est pas encore mis en favori</Text>}
            <Text style={[styles.title, styles.titleColor]}>{props.title}</Text>
            <Text style={{textAlign: "center"}}>{props.synopsis}</Text>
            <Button title="+ d'informations" onPress={()=>{
                props.navigation.navigate(
                    "Plus d'informations", 
                    {poster: props.poster, title: props.title, synopsis: props.synopsis}
                )}
            } /> 
        </View>
    )
    // Le button "+ d'informations" va permettre de passer d'un stack à un autre.
}

// StyleSheet : API qui permet de styliser nos éléments.
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        marginTop: 10
    },
    title: {
      fontSize: 18,
      fontWeight: "900"
    },
    titleColor: {
        color: "grey"
    },
    btnBlue: {
        backgroundColor: "blue",
        padding: 10,
    },    
    btnRed: {
        backgroundColor: "red",
        padding: 10,
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "900"
    },
    image: {
        height: 150,
        width: 120
    }
});
// https://github.com/vhpoet/react-native-styling-cheat-sheet
// Attention, chaque propriété a un ou plusieurs types bien définis. Sur le web, cela ne pose pas de problème, par contre sur émulateur, il y aura tout un tas d'erreur. 

// On peut ajouter du style directement dans les balises avec une double paire d'accolades {{textAlign: 'center'}}
// On peut utiliser plusieurs "classes de style" à l'aide d'un tableau 
// exemple : style={[styles.title, styles.titleColor]}

// Le style ne s'hérite pas avec React Native.

export default Movie; // On exporte notre composant.


/**
 * function sum(a, b){
 *  return a + b;
 * }
 * 
 * (a, b) => {return a + b}
 * 
 * a, b => a + b
 * 
 * 
 * 
 */


/**
 * React Navigation
 * 
 * Pour naviguer d'un écran à un autre, on a deux solutions : 
 * 
 * - Récupérer la props navigation grâce à { navigation }. On peut réaliser ceci seulement pour les composants qui existent au sein des Stack.Screen
 * 
 * - On peut utiliser le hook useNavigation(). 
 * import { useNavigation } from '@react-navigation/native'
 * 
 * exemple : navigation = useNavigation();
 * 
 * navigation.navigate();
 * navigation.goBack();
 * 
 * 
 * Le système de paramètre d'une vue à une autre :
 * 
 * - On peut utiliser la props { route }. Attention, ça ne fonctionne que sur les composants qui existent dans le stacknavigator.
 * Exemple : route.params.title
 * 
 * - On peut utiliser le hook useRoute().
 * import { useRoute } from '@react-navigation/native'
 * 
 * const route = useRoute();
 * route.params.title
 */