import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import db from '../src/config'
import { collection, getDocs, addDoc } from "firebase/firestore"

// Componente funcional para o cadastro de tarefas
let CadastroTarefas = ({ navigation }) => {

    // Estados para armazenar os dados da tarefa
    let [obterNomeTarefa, definirNomeTarefa] = useState('')
    let [obterDescricao, definirDescricao] = useState('')
    let [obterData, definirData] = useState(moment().format('DD/MM/YYYY'))
    let [obterHora, definirHora] = useState(moment().format('HH:mm'))
    let [obterFinalizado, definirFinalizado] = useState(false)
    let [notificar, setNotificar] = useState(false)
    let [obterEnvio, definirEnvio] = useState(false)

    // Função para salvar a tarefa no banco de dados
    let salvarTarefa = async () => {
        if (obterDescricao.descricao !== '' || obterNomeTarefa.nome !== '') {
            // Navega para a tela 1 enviando o estado de obterEnvio como parâmetro
            navigation.navigate('Tela1', { obterEnvio })
        } else {
            // Exibe um alerta se não houver nada para ser salvo
            alert('Não há nada para ser salvo!')
        }
    }

    // Efeito colateral para adicionar a tarefa ao banco de dados quando obterEnvio for verdadeiro
    useEffect(() => {
        if (obterEnvio === true) {
            (async () => {
                // Obtém os documentos da coleção "cadastroTarefas" no banco de dados
                let dados = await getDocs(collection(db, "cadastroTarefas"))
                // Mapeia os documentos para obter os dados das tarefas existentes
                let listaTarefas = dados.docs.map(doc => doc.data())
                // Adiciona uma nova tarefa à coleção "cadastroTarefas"
                await addDoc(collection(db, "cadastroTarefas"), {
                    id: listaTarefas.length + 1,
                    descricao: obterDescricao.toString(),
                    concluido: obterFinalizado.toString(),
                    nome: obterNomeTarefa.toString(),
                    data: obterData.toString(),
                    hora: obterHora.toString(),
                })
            })()
        }
    }, [obterEnvio])

    // Estrutura JSX do componente
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                {/* Input para o nome da tarefa */}
                <TextInput
                    style={styles.input}
                    placeholder="Nome da Tarefa"
                    value={obterNomeTarefa}
                    onChangeText={(texto) => definirNomeTarefa(texto)}
                />

                {/* Input para a descrição da tarefa */}
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={obterDescricao}
                    onChangeText={(texto) => definirDescricao(texto)}
                />

                {/* Container para inputs de data e hora */}
                <View style={styles.dateTimeContainer}>
                    {/* Input para a data da tarefa */}
                    <TextInput
                        style={[styles.input, styles.dateTimeInput]}
                        placeholder="Data"
                        value={obterData}
                        onChangeText={(texto) => definirData(texto)}
                    />
                    {/* Input para a hora da tarefa */}
                    <TextInput
                        style={[styles.input, styles.dateTimeInput]}
                        placeholder="Hora"
                        value={obterHora}
                        onChangeText={(texto) => definirHora(texto)}
                    />
                </View>

                {/* Container para botões */}
                <View style={styles.buttonsContainer}>
                    {/* Botão para salvar a tarefa */}
                    <TouchableOpacity
                        style={[styles.button, styles.salvarButton]}
                        onPress={() => {
                            // Alterna o estado de obterEnvio e chama a função salvarTarefa
                            definirEnvio(!obterEnvio)
                            salvarTarefa()
                        }}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    {/* Botão para voltar à tela anterior */}
                    <TouchableOpacity
                        style={[styles.button, styles.voltarButton]}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

// Estilos do componente
let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f0ccff'
    },
    // Estilo para os inputs
    input: {
        height: 40,
        width: '80%',
        borderColor: 'purple',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    // Estilo para o container de data e hora
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    // Estilo para inputs de data e hora
    dateTimeInput: {
        width: '48%',
    },
    // Estilo para o container do switch
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    // Estilo para o botão de check
    checkButton: {
        marginLeft: 10,
        padding: 5,
    },
    // Estilo para o ícone de check
    checkIcon: {
        width: 20,
        height: 20,
        tintColor: 'green', // Cor do ícone de check quando está ativo
    },
    // Estilo para o botão de notificação
    botaoNotificacao: {
        marginLeft: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para a cor de fundo do botão de notificação quando ativo
    corBtNotificacao: {
        backgroundColor: 'orange',
    },
    // Estilo para o ícone de sino
    iconeSino: {
        width: 20,
        height: 20,
        tintColor: 'black', // Cor do ícone de sino
    },
    // Estilo para o container dos botões
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    // Estilo para os botões
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '45%',
        borderRadius: 5,
    },
    // Estilo para o botão de salvar
    salvarButton: {
        backgroundColor: 'orange',
    },
    // Estilo para o botão de voltar
    voltarButton: {
        backgroundColor: 'purple',
    },
    // Estilo para o texto dos botões
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
})

// Exporta o componente
export default CadastroTarefas
