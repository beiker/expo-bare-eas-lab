import {zodResolver} from '@hookform/resolvers/zod'
import {useForm, Controller} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import {showMessage} from 'react-native-flash-message'
import {View, Text, TextField, Colors, Button} from 'react-native-ui-lib'
import * as z from 'zod'

import {useAuthStore} from '@/stores/authStore'
import {useThemeStore} from '@/stores/themeStore'

const schema = z.object({
  email: z.string().nonempty({message: 'E-mail field is required'}),
  password: z.string().nonempty({message: 'Password field is required'}),
})

type FormData = z.infer<typeof schema>

export default function SignInScreen() {
  const logIn = useAuthStore(state => state.logIn)
  const {themeMode, changeThemeMode} = useThemeStore()

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {email: '', password: ''},
  })

  function onSubmit(data: FormData) {
    logIn({username: data.email, password: data.password})
      .then(user =>
        showMessage({
          message: `Welcome ${user.name}`,
          type: 'success',
          duration: 2500,
        })
      )
      .catch(() =>
        showMessage({
          message: 'Please verify your e-mail and password',
          type: 'danger',
        })
      )
  }

  return (
    <View flex center bg-screenBG padding-20>
      <Text $textNeutral>Sign in</Text>

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <>
            <TextField
              label="E-mail"
              placeholder="E-mail"
              keyboardType="email-address"
              floatingPlaceholder
              onChangeText={onChange}
              value={value}
              showCharCounter
              maxLength={30}
              $textNeutral
              fieldStyle={styles.withUnderline}
            />
            {errors.email ? <Text red40>{errors.email.message}</Text> : null}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <>
            <TextField
              label="Password"
              placeholder="Password"
              floatingPlaceholder
              onChangeText={onChange}
              value={value}
              showCharCounter
              maxLength={30}
              $textNeutral
              fieldStyle={styles.withUnderline}
              secureTextEntry
            />
            {errors.password ? <Text red40>{errors.password.message}</Text> : null}
          </>
        )}
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
        onPress={handleSubmit(onSubmit)}
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
