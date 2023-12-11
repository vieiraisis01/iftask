import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import VisualTarefas from '../iftaskofc/components/VisualTarefas/'
import CadastroTarefas from '../iftaskofc/components/CadastroTarefas'
import Inicio from './components/Inicio'

// Criação do Stack Navigator
let Stack = createStackNavigator()

// Componente principal da aplicação
let App = () => {

  // Estrutura JSX do componente
  return (
    <NavigationContainer>
      {/* Navegação em pilha usando o Stack Navigator */}
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple', // Cor do cabeçalho
          },
          headerTintColor: '#fff', // Cor do texto do cabeçalho
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        
        {/* Tela de Visualização de Tarefas (Tela1) */}
        <Stack.Screen
          name="Tela1"
          component={VisualTarefas}
          options={{
            title: 'IF TASK'
          }}
        />

        {/* Tela de Cadastro de Tarefas (Tela2) */}
        <Stack.Screen
          name="Tela2"
          component={CadastroTarefas}
          options={{
            title: 'Adicionar Lembrete'
          }}
        />

        {/* Tela Inicial (Inicio) */}
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            title: 'IF TASK',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Exporta o componente
export default App
