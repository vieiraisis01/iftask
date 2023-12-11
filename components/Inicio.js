import React from 'react'
import { TouchableOpacity, View, StyleSheet, SafeAreaView, Image, Text } from 'react-native'

// Componente Inicio
let Inicio = ({ navigation }) => {
  return (
    // <Text>AAAAAAAAAA</Text>
    // Área segura da tela
    <SafeAreaView style={{ flex: 1 }}>
      {/* Container principal */}
      <View style={{ flex: 1, padding: 16, backgroundColor: 'purple' }}>
        {/* Subcontainer centralizado */}
        <View style={styles.container}>
          {/* Logo da aplicação */}
          <Image source={require('../imagens/logo.png')} style={styles.logo} />
          
          {/* Botão de entrada */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Tela1')}
          >
            {/* Texto do botão */}
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  )
}

// Estilos CSS
let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orange', // Cor de fundo do botão
    borderRadius: 10, // Borda arredondada
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 18,
    fontWeight: 'bold'
  },
})

// Exporta o componente Inicio
export default Inicio
