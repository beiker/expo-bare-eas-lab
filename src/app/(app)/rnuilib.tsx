import {Stack} from 'expo-router'
import * as React from 'react'
import {Button as RNButton} from 'react-native'
import {ActionBar, Button, Colors, PageControl, Text, Typography} from 'react-native-ui-lib'

Typography.loadTypographies({
  h1: {fontSize: 42, fontWeight: '300', lineHeight: 80},
})

export default function RNUILibScreen() {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'My home',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: {backgroundColor: '#202020'},
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          headerTitle: props => (
            <Text $textPrimary style={{fontSize: 20}}>
              Header title
            </Text>
          ),
          headerRight: () => <RNButton onPress={() => setCount(c => c + 1)} title="Update count" />,
        }}
      />
      <Text h1 underline $textPrimary>
        Text Primary
      </Text>
      <Text h1 underline $textGeneral>
        Text General
      </Text>
      <Text h1>Count: {count}</Text>

      <Button label="Press" size={Button.sizes.medium} backgroundColor={Colors.red30} />

      <PageControl numOfPages={5} currentPage={0} />

      <ActionBar
        actions={[
          {label: 'Delete', onPress: () => console.log('delete'), $textDanger: true},
          {
            label: 'Add',
            onPress: () => console.log('Add'),
            $textSuccess: true,
          },
          {label: 'Other', onPress: () => console.log('Other'), blue50: true},
        ]}
      />
    </>
  )
}
