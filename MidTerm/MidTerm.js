import { } from 'react-native'
import MyStack from './routers/MyStack'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MyContextControllerProvider } from './routers/firestore'
import { PaperProvider } from 'react-native-paper'

export default function MidTerm() {
  return (
    <SafeAreaProvider>
      <MyContextControllerProvider>
        <PaperProvider>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </PaperProvider>
      </MyContextControllerProvider>
    </SafeAreaProvider>
  )
}