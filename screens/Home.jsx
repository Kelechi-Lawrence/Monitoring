import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomNav from './BotttomNav'

const Home = () => {
  return (
    <SafeAreaView style={{height:"100%"}}>
     <View>
      <Text>Home Page</Text>
      
    </View>
    <BottomNav />
    </SafeAreaView>
   
  )
}

export default Home