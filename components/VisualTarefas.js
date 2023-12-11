import React, { useState, useEffect } from 'react'
import {TouchableOpacity, View, Text, SafeAreaView, TextInput, StyleSheet} from 'react-native'
import db from '../src/config'
import { collection, onSnapshot, query, where, getDocs, updateDoc, doc } from "firebase/firestore"

// Componente funcional para a visualização de tarefas
let VisualTarefas = ({ route, navigation }) => {

    // Estados para armazenar dados da pesquisa e tarefas
    let [obterPesquisa, definirPesquisa] = useState('')
    let [obterTarefas, definirTarefas] = useState([])

    // Função para marcar ou desmarcar uma tarefa como concluída
    let tarefasConcluida = async (idTarefa, tarefa) => {

        // Query para obter a tarefa pelo ID
        let retTarefa = query(
            collection(db, "cadastroTarefas"), where("id", "==", idTarefa)
        )

        // Obtém os documentos da query
        let querySnapshot = await getDocs(retTarefa)

        // Atualiza o estado "concluido" da tarefa
        querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {
                concluido: tarefa.concluido == false ? true : false
            })
        })
    }

    // Cores disponíveis para as tarefas
    let cores = ['#e6fa9e', '#cedafd', '#d9c6ec', '#fbb6d0'] // Cores amarelo, roxo, rosa, azul

    // Efeito colateral para atualizar as tarefas ao receber uma alteração no banco de dados
    useEffect(() => {
        (async () => {
            onSnapshot(collection(db, "cadastroTarefas"), (snapshot) => {
            // Mapeia os documentos para obter os dados das tarefas existentes
            let todasAsTarefas = snapshot.docs.map(doc => doc.data())
            // Atualiza o estado das tarefas
            definirTarefas(todasAsTarefas)
            })
        })()
    }, [])

  // Estrutura JSX do componente
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Barra de pesquisa */}
        <View style={styles.barraPesquisa}>
          <TextInput
            style={styles.inputPesquisa}
            placeholder="Pesquisar tarefas"
            value={obterPesquisa}
            onChangeText={(texto) => definirPesquisa(texto)}
          />
        </View>

        {/* Mapeia as tarefas e exibe na lista */}
        {obterTarefas.filter((retTarefa) =>
            retTarefa.descricao.toLowerCase().includes(obterPesquisa.toLowerCase()) ||
            retTarefa.nome.toLowerCase().includes(obterPesquisa.toLowerCase())
          )
          .map((tarefa, index) => (
            <View
                key={tarefa.id}
                style={[
                    styles.boxTarefas,
                    { backgroundColor: cores[index % cores.length] },
                ]}>
                {/* Checkbox para marcar ou desmarcar a tarefa como concluída */}
                <TouchableOpacity onPress={() => tarefasConcluida(tarefa.id, tarefa)}>
                    <View
                    style={[
                        styles.checkbox,
                        { backgroundColor: tarefa.concluido == true ? '#663399' : 'white' },
                    ]}
                    />
                </TouchableOpacity>

                {/* Descrição da tarefa */}
                <Text
                    style={[
                    styles.descricao,
                    {
                        textDecorationLine: tarefa.concluido == true
                            ? 'line-through'
                            : 'none',
                    },
                    ]}>
                    {tarefa?.data + ' - ' + tarefa?.hora + ' \n ' + tarefa.nome + ': \n ' + tarefa.descricao}
                </Text>
            </View>
          ))}

        {/* Botão de adicionar nova tarefa */}
        <TouchableOpacity
            onPress={() => navigation.navigate('Tela2')}
            style={styles.botao}>
            <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// Estilos do componente
let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start', // Ajusta o conteúdo para começar do topo
        backgroundColor: '#f0ccff'
    },
    // Estilo para a barra de pesquisa
    barraPesquisa: {
        backgroundColor: 'purple',
        padding: 10,
        marginBottom: 10,
    },
    // Estilo para o input de pesquisa
    inputPesquisa: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    // Estilo para a caixa de cada tarefa
    boxTarefas: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d9c6ec',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '95%',
        left: 10,
    },
    // Estilo para o checkbox
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 10,
    },
    // Estilo para a descrição da tarefa
    descricao: {
        fontSize: 18,
        fontWeight: 'bold', // Adiciona o estilo para tornar o texto mais grosso
    },
    // Estilo para o botão de adicionar nova tarefa
    botao: {
        position: 'absolute', // Permite posicionar o botão em relação à tela
        bottom: 20,
        right: 20,
        backgroundColor: 'purple',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para o texto do botão de adicionar nova tarefa
    botaoTexto: {
        color: 'white',
        fontSize: 24,
    },
})

// Exporta o componente
export default VisualTarefas
