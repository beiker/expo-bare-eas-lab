import * as Device from 'expo-device'
import * as React from 'react'
import {PermissionsAndroid, Platform, View} from 'react-native'
import {EmitterSubscription} from 'react-native/Libraries/vendor/emitter/EventEmitter'
import Beacons from 'react-native-beacons-manager'

import {TextCmp} from '@/components/TextCmp'

const isAndroid = () => Platform.OS === 'android'
const isIOS = () => Platform.OS === 'ios'
const androidApiLevel = () => Device.platformApiLevel ?? -1

interface Region {
  identifier: string
  uuid: string
}

interface BeaconsRangeData {
  beacons: Beacon[]
  region: Region
}

interface Beacon {
  accuracy: number
  distance: number
  major: number
  minor: number
  proximity: string
  rssi: number
  uuid: string
}

export default function BeaconScanningScreen() {
  const beaconDidRangeEventRef = React.useRef<EmitterSubscription | null>(null)
  const regionDidEnterEventRef = React.useRef<EmitterSubscription | null>(null)
  const regionDidExitEventRef = React.useRef<EmitterSubscription | null>(null)

  if (isAndroid()) {
    initBeaconOnAndroid()
  } else {
    initBeaconOnIOS()
  }

  React.useEffect(() => {
    return function () {
      if (isAndroid()) {
        Beacons.stopForegroundService()
      }
      console.log('==> BEACON EVENTS REMOVED')
      beaconDidRangeEventRef.current?.remove()
      regionDidEnterEventRef.current?.remove()
      regionDidExitEventRef.current?.remove()
    }
  }, [])

  async function initBeaconOnAndroid() {
    await requestLocationPermissionsAndroid()
    await requestBlePermissionsAndroid()

    Beacons.setForegroundScanPeriod(1000)
    Beacons.setBackgroundBetweenScanPeriod(1000)
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      Beacons.detectIBeacons()
      startAndroidForegroundService()
    }
  }

  async function requestLocationPermissionsAndroid() {
    const permissionFineLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)

    console.log({permissionFineLocation})
  }

  async function requestBlePermissionsAndroid() {
    if (isAndroid()) {
      console.log('==> Android version: ', androidApiLevel())
      // Target Android 12 or higher (SDK 31+)
      if (androidApiLevel() >= 31) {
        const response = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ])
        const scan = response['android.permission.BLUETOOTH_SCAN']
        const connect = response['android.permission.BLUETOOTH_CONNECT']

        console.log({scan, connect})
      }
    }
  }

  function startAndroidForegroundService() {
    const notifData = {
      channelId: 'PresecenApp-Beacon-Notification',
      notificationId: 456,
      contentTitle: 'PresenceApp',
      contentMessage: 'scanning coreMeters...',
      drawableIcon: 'ic_launcher',
      showWhen: true,
    }

    Beacons.startForegroundService(notifData).then(() => {
      startRangingInRegion()
    })
  }

  function initBeaconOnIOS() {
    Beacons.requestAlwaysAuthorization()
    Beacons.allowsBackgroundLocationUpdates(true)
    startRangingInRegion()
  }

  function startRangingInRegion() {
    const uuid = '2f234454-cf6d-4a0f-adf2-dd0004000001'
    const regions = {identifier: '__BEACONS__', uuid}

    // here we register all the regions that the beacon library
    // will detect, for every region we need to call the
    // startRangingBeaconsInRegion method
    Beacons.startMonitoringForRegion(regions)
    Beacons.startRangingBeaconsInRegion(regions)

    if (isIOS()) {
      Beacons.startUpdatingLocation()
    }

    // `beaconsDidRange` executes every second so we use this interval time
    // to know when we need to stop ranging, dispatch log, etc.
    beaconDidRangeEventRef.current = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      (data: BeaconsRangeData) => {
        console.log('===> beaconsDidRange', data.beacons)
      }
    )

    regionDidEnterEventRef.current = Beacons.BeaconsEventEmitter.addListener(
      'regionDidEnter',
      (region: Region) => {
        console.log('===> regionDidEnter', region)
      }
    )

    regionDidExitEventRef.current = Beacons.BeaconsEventEmitter.addListener(
      'regionDidExit',
      (region: Region) => {
        console.log('===> regionDidExit', region)
      }
    )
  }

  return (
    <View>
      <TextCmp>Beacon Scanning Screen</TextCmp>
    </View>
  )
}
