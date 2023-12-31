import {SplashScreen, Slot} from 'expo-router'
import * as React from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

import {loadAppColorScheme} from '@/constants/colorsPalette'
import {loadAppDesignTokens} from '@/constants/designTokens'
import {useAuthProvider} from '@/hooks/useAuthProvider'

loadAppColorScheme()
loadAppDesignTokens()

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useAuthProvider()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.wrapper}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
})
