import * as React from 'react'
import {Text} from 'react-native-ui-lib'

type Props = {
  children: React.ReactNode
}

function TextCmp(props: Props) {
  return <Text $textDefault>{props.children}</Text>
}

export {TextCmp}
