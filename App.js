import { StatusBar } from 'expo-status-bar'; // On importa le statusbar
import { StyleSheet, Text, View, FlatList, Image, TextInput, Button} from 'react-native'; // Stylesheet est une API qui permet de gérer le style de l'application 
// Text et View : c'est des composants.
import movies from './assets/movies.json'; // On importe notre liste de film qui représente la base de données. 
import Movie from './components/Movie'; // On importe notre composant Movie.
import Details from './components/Details'; // On importe le composant Details.

import { useState, useEffect } from 'react'; // On importe le hook useState pour travailler avec le state d'un composant.

import { NavigationContainer } from '@react-navigation/native'; // Le NavigationContainer permet de mettre un container pour déclarer le système de navigation dans notre application.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Provider = () => {
  // Le composant Provider sera le premier composant rendu au sein de notre application.
  // Il va contenir le menu. 

  const Stack = createNativeStackNavigator(); // On vient instancier notre système de Stack pour pouvoir l'utiliser.

  // const Tab = createBottomTabNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={App} />
        <Stack.Screen name="Plus d'informations" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <Tab.Navigator>
  //       <Tab.Screen name="Accueil" component={App} />
  //       <Tab.Screen name="Plus d'informations" component={Details} /> 
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // )

}

export default Provider; // On exporte par défaut Provider puisque le composant doit être le premier à être rendu pour que le système de stack fonctionne sur l'application entière.

function App({ navigation }) {

  // ['favoris']
  // Pour créer un système de favori, il me faut un espace de stockage, dans lequel je vais stocker tous les films en favori. Lorsque j'ajoute un film en favori, il faut que le composant se mette à jour pour que le nouveau film s'affiche.
  // La solution : un hook qui s'appelle useState(). 
  // Hook (ou crochet) : va permettre de travailler avec les fonctionnalités de base d'un technologie.

  // useState() est un hook qui permet de travailler avec le state (ou état) d'un composant. Chaque composant a son propre état qui permet de stocker des données.
  const [listMovies, setListMovies] = useState(movies);

  const [title, setTitle] = useState('');

  const [synopsis, setSynopsis] = useState('');

  const [listFavorite, setListFavorite] = useState([]);
  // listFavorite est la constante qui va permettre d'accéder à tous les films en favoris. (Si on essaye d'affecter une nouvelle valeur à listFavorite, cela ne fonctionnera pas).
  // setListFavorite est la fonction qui va permettre de remplacer la valeur de listFavorite.
  // Entre parenthèses de useState, j'ajoute une valeur par défaut. Ici c'est un tableau vide.

  useEffect(()=>{
    console.log('ceci est un test');
  }, [title]);

  const displayMovies = ({ item }) => {
    // item permettra de récupérer les données de chaque film. 

    return <Movie title={item.title} synopsis={item.synopsis} poster={item.poster} addFav={addFav} navigation={navigation} />;

    // Nous avons un composant au dessus. On aura tendance à ajouter les nouveaux composants dans des fichiers à part. 

    // On utilise une props pour transmettre des données de App vers Movie. La props s'appelle "title" mais elle pourrait porter d'autre nom.
    // On peut ajouter autant de props que l'on veut. 
  }

  const addFav = (title, synopsis) => {
    // Cette fonction a pour rôle d'ajouter un élément en favori.
    
    // listFavorite.push([title, synopsis]); /!\ Impossible de modifier le state comme ça.
    // .push() permet d'ajouter un élément à la fin du tableau.

    let cloneListFavorite = listFavorite.slice(); // Une copie du tableau contenu dans le state.

    cloneListFavorite.push([title, synopsis]);

    setListFavorite(cloneListFavorite);
  }

  const addMovie = () => {
    let cloneListMovies = listMovies.slice();

    cloneListMovies.push({id: listMovies.length + 1, title: title, synopsis: synopsis, poster: ""});

    setListMovies(cloneListMovies);
    
    setTitle('');
    setSynopsis('');
  } 

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo_netflix.png')} style={styles.image} />
      <Text>Mon application cinéma</Text>
      <View style={styles.form}>
        <Text>Titre du film</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title}/>
        <Text>Synopsis du film</Text>
        <TextInput style={styles.input} onChangeText={setSynopsis} value={synopsis}/>
        <Button title="Ajouter le film" onPress={()=>{addMovie()}} />
      </View>
      <FlatList data={listMovies} renderItem={displayMovies} keyExtractor={(item) => item.id} />
      <StatusBar style="auto" />
    </View>
  );

  // Le return permet l'affichage du composant, il va contenir un seul composant en tant que conténeur. Ce même composant contiendra tous les autres.
  
  // Le composant Text représente tous les textes. 
  // Le composant View est le composant principal de la conception de l'interface. On va structurer l'interface avec ce composant.
}

// class App extends React.Component{

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  form:{
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: "gray"
  }
});

/* Qu'est-ce qu'un composant ? */

/**
 * Les composants représentent des éléments de notre interface. 
 * 
 * Trois groupes de composant : 
 * - Core Components : composant proposé par React Native (Text, View...).
 * - Native Components : composant que l'on créé.
 * - Community Components : composant de la communauté (bibliothèque externe).
 * 
 * Les composants seront sous forme de balise et on peut les utiliser autant de fois que l'on veut.
 * 
 * On peut créer des composants de deux manières :
 * - avec une fonction : composant fonctionnel
 * - avec une class : composant de class ou stateful
 * 
 * Les deux types de composants ne changent rien à ce que l'utilisateur va voir de l'application.
 */


/**
 * Les composants de liste : 
 * 
 * - FlatList
 * props obligatoires : 
 * - data : liste de données
 * - renderItem : fonction de rendue de composant.
 * 
 * - SectionList
 * props obligatoires :
 * - sections : liste de données contenant les section
 * - renderItem : fonction de rendue de composant.
 * 
 * 
 * - VirtualizedList : permet d'obtenir des optimisations au niveau de la mémoire et des perfomances
 * props obligatoires : 
 * - renderItem
 * - getItem 
 * - getItemCount
 * - data
 * 
 * 
 * 
 * 
 */



/**
 * Qu'est-ce que les props ? 
 * 
 * Props pour properties.
 * 
 * Les props vont avoir deux intêrets principaux :
 * 
 * - Paramétrer les composants cores. Tous les composants de React Native, on va pouvoir leur apporter des paramétrages à l'aide des props.
 * - De transmettre des données d'un composant parent à un composant enfant.
 * 
 * 
 * 
 * 
 */

/**
 * Qu'est-ce que le JSX ? 
 * 
 * JSX : Javascript Syntax Extension (extension syntaxique du javascript).
 * 
 * Le JSX permet de pousser plus loin le langage javascript, par exemple avec l'ajout d'un système de balise. 
 * JSX : il permet le système de composant.
 * 
 */


/**
 * Les composants de pression :
 * 
 * - Button : composant permettant d'avoir un bouton.
 * <Button title="Envoyer le formulaire" onPress={()=>{}} />
 * 
 * .addEventListener(); Permet de gérer les évènements en Javascript.
 * On n'utilise pas cette méthode avec React Native car le DOM n'existe pas.
 * Pour gérer des évènements, on utilise on + <Nom de l'évènement> avec une fonction.
 * 
 * Inconvénient : le composant Button ne peut pas être désigné, on peut seulement changer la couleur.
 * 
 * 
 * - Les Touchables :
 *  -- TouchableHighLight
 *  -- TouchableOpacity
 *  -- TouchableWithoutFeedBack
 *  
 * On peut styliser des composants Touchables.
 * Les touchables ont des zones entières pressables contrairement au bouton.
 * 
 * 
 * - Pressable : ce composant peut être stylisé, il permet de rendre pressable une zone entière. Et il détecte les différents types de pression.
 *
 * 
 * 
 * 
 * 
 * 
 * 
 */

/**
 * Composant Image 
 * 
 * On a deux possibilités pour ajouter une image avec React native et le composant Image :
 * - require() qui permet de récupérer des images stockées de manière "locale".
 * - {uri: "https://example.com/image.jpg"} : on va utiliser un lien uri pour pouvoir afficher des images externes à notre application.
 * 
 * 
 * /!\ Il faut ajouter du style à l'image pour la voir. Les images ne contiennent pas de style par défaut.
 * 
 * 
 * Le composant ImageBackground : il remplace la propriété CSS 'background-image' qui n'existe pas avec React Native.
 * Au niveau de la props source, le fonctionnement est le même que le composant Image.
 * 
 * 
 */


/** 
 * Les différentes vues au sein de React Native
 * 
 * - Le composant View : le conténeur principal de nos composants.
 * 
 * - Le composant KeyboardAvoidingView 
 * Ce composant permet de gérer les problèmes liés au clavier (clavier qui se superpose sur les éléments). On va englober notre composant avec ce composant et on utilisera la props behavior permettant de gérer le comportement que le clavier doit adopter.
 * 
 * - Le composant ScrollView permet d'ajouter un scroll à notre application
 * /!\ La FlatList est l'un des rares composants à posséder un scroll naturel. 
 * /!\ Le web met par défaut une barre de scroll, ce qui n'est pas le cas sur émulateur.
 * 
 * - Le composant SafeAreaView permet de régler des problèmes liés à l'interface sur les version d'IOS 11 et +. 
 * Il suffit d'englober tous les composants dans le composant App pour régler les problèmes.
 */


/**
 * Les composants supplémentaires :
 * 
 * - ActivityIndicator : permet d'obtenir un spinner pour les chargements.
 * 
 * - Modal : permet d'obtenir toutes les fonctionnalités d'une fenêtre modale
 * /!\ Il faudra la désigner.
 * 
 * - RefreshControl : permet de déclencher une fonction au rafraichissement de l'application (lorsque l'on appuie sur l'écran et qu'on le glisse vers le bas).
 * 
 * - Switch : va permettre la mise en place de bouton toggle (vrai / faux). Il peut être utilisé pour les dark modes ou les light modes.
 * 
 */

/**
 * On évite d'utiliser le DOM dans l'environnement React :
 * - Les sélections (getElementById...)
 * - document...
 * - addEventListener
 * 
 * Les remplacement au DOM :
 * - addEventListener : onPress, onClick, onKeyUp, onKeyDown...
 * - document.getElementById('moninput').value : 
 * Pour gérer un formulaire, on va utiliser les gestionnaires d'évènements comme onChange ou onChangeText. 
 * On utilisera le state pour stocker la valeur du champs. 
 * 
 * Exemple pour onChangeText : onChangeText={setTitle}
 * 
 * Exemple pour onChange : onChange={(e)=>{setTitle(e.target.value)}}
 * 
 * 
 * 
 */

/**
 * Les composants possèdent un cycle de vie :
 * 
 * Il existe trois phases pour un composant : 
 * - Mounting : la phase dans laquelle le composant va être rendue pour la première fois.
 * - Updating : la phase dans laquelle le composant est mis à jour.
 * - Unmounting : la phase dans laquelle le composant disparait. (composant de class)
 * 
 * On peut exécuter du code durant la phase mounting. Par exemple pour afficher des données récupérées d'un serveur.
 * 
 * hook useEffect : ce hook permet d'executer une fonction pendant les différentes phases du cycle de vie. 
 * 
 * Execution sur la phase mounting et updating.
 * useEffect(()=>{
 * 
 * });
 * 
 * 
 * useEffect(()=>{
 * 
 * }, []); D'executer une fonction seulement pendant la phase mounting.
 * 
 * 
 * useEffect(()=>{
 * 
 * }, [title, synopsis]); on execute le fonction seulement si la valeur de title dans le state est remplacée.
 * 
 * Comment peut-on mettre à jour un composant ? En utilisant useState, useReducer, useContext, useCallback...
 */