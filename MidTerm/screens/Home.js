import { useEffect, useLayoutEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { TextInput, Button, List } from "react-native-paper"
import { logout, useMyContextProvider } from "../routers/firestore"

const Home = ({ navigation }) => {
  const [newJob, setNewJob] = useState('')
  const [controller, dispatch] = useMyContextProvider()
  const { userLogin } = controller

  useEffect(() => {
    console.log(userLogin)
    if (userLogin == null) {
      navigation.navigate('Login')
    }
  }, [navigation, userLogin])

  const handleLogout = () => {
    logout(dispatch)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        <Button onPress={handleLogout}>Log out</Button>
    })
  })

  const [datas, setDatas] = useState([
    {id: 0, title: 'Section 1' },
    {id: 1, title: 'Section 2' }
  ])


  const addJobs = () => {
    var count = datas.length
    datas.push({ id: count, title: newJob})
    setDatas(datas)
    setNewJob
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput label={'New Job'} value={newJob} onChangeText={setNewJob} style={{ width: 280, marginRight: 10 }} />
        <Button mode='contained' buttonColor='blue' onPress={addJobs}>Add</Button>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList data={datas} renderItem={({item}) => <List.Item titleStyle={{ fontSize: 20, fontStyle: 'normal' }} title={item.id + '. ' + item.title}/>} keyExtractor={(item) => item.id} />
      </View>
    </View>
  )
}

export default Home