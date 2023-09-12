import {StyleSheet} from 'react-native'
import {View, Text, TextField, Colors, Button} from 'react-native-ui-lib'

import {useAuthStore} from '@/stores/authStore'
import {useThemeStore} from '@/stores/themeStore'

export default function SignInScreen() {
  const logIn = useAuthStore(state => state.logIn)
  const {themeMode, changeThemeMode} = useThemeStore()

  return (
    <View flex center bg-screenBG padding-20>
      <Text $textNeutral>Sign in</Text>
      <TextField
        label="E-mail"
        placeholder="e-mail"
        keyboardType="email-address"
        floatingPlaceholder
        // onChangeText={onChangeText}
        showCharCounter
        maxLength={30}
        fieldStyle={styles.withUnderline}
      />

      <TextField
        label="Password"
        placeholder="password"
        floatingPlaceholder
        // onChangeText={onChangeText}
        showCharCounter
        maxLength={30}
        fieldStyle={styles.withUnderline}
        secureTextEntry
      />

      <Button
        label="log in"
        labelStyle={{fontWeight: 'bold'}}
        size={Button.sizes.large}
        color={Colors.$textPrimary}
        backgroundColor={Colors.$backgroundPrimaryMedium}
        outline
        outlineColor={Colors.$outlinePrimary}
        outlineWidth={2}
        onPress={() =>
          logIn({
            username: '',
            password: '',
          })
        }
      />

      <Button
        label={themeMode === 'dark' ? 'Ligth' : 'Dark'}
        onPress={() => changeThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    paddingBottom: 4,
    width: '100%',
  },
})
