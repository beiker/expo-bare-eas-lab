import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import * as React from 'react'

export default function AppLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{headerShown: false, animation: 'fade_from_bottom'}} />
    </>
  )
}
