import {Link, Stack} from 'expo-router'
import * as React from 'react'
import {Pressable, StyleSheet, Text} from 'react-native'
import {View, Button} from 'react-native-ui-lib'

import {TextCmp} from '@/components/TextCmp'
import {useAuthStore} from '@/stores/authStore'
import {useThemeStore} from '@/stores/themeStore'

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export default function Page() {
  const {user, logOut} = useAuthStore()
  const {themeMode, changeThemeMode} = useThemeStore()

  if (!user) {
    return null
  }

  return (
    <View style={styles.wrapper} flex center bg-screenBG>
      <Stack.Screen options={{headerShown: false}} />

      <TextCmp>Index page - EAS build</TextCmp>
      <TextCmp>{apiUrl}</TextCmp>
      <TextCmp>User data: {JSON.stringify(user)}</TextCmp>
      <Link href="/beacons" asChild>
        <Pressable style={{borderWidth: 2, borderColor: 'purple', marginTop: 10}}>
          <Text style={{fontSize: 40, textAlign: 'center'}}>Beacons</Text>
        </Pressable>
      </Link>
      <Link href="/rnuilib" asChild>
        <Pressable style={{borderWidth: 2, borderColor: 'purple', marginTop: 10}}>
          <Text style={{fontSize: 40, textAlign: 'center'}}>RNUILib</Text>
        </Pressable>
      </Link>
      <Button label="log out" size={Button.sizes.large} onPress={() => logOut()} bg-red10 />

      <Button
        label={themeMode === 'dark' ? 'Ligth' : 'Dark'}
        onPress={() => changeThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
  },
})
