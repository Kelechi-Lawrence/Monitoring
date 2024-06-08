import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64";

const HEART_RATE_UUID = "0000180d-0000-1000-8000-00805f9b34fb";
const HEART_RATE_CHARACTERISTIC = "00002a37-0000-1000-8000-00805f9b34fb";
const STEP_COUNTER_UUID = "00001814-0000-1000-8000-00805f9b34fb";
const STEP_COUNTER_CHARACTERISTIC = "00002a53-0000-1000-8000-00805f9b34fb";

function useBle() {
  const bleManager = useMemo(() => new BleManager(), []);

  const [allDevices, setAllDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [heartRate, setHeartRate] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  const requestAndroidPermissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Scan Permission",
        message: "App requires Bluetooth Scanning",
        buttonPositive: "Ok",
      }
    );

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Scan Permission",
        message: "App requires Bluetooth Connecting",
        buttonPositive: "Ok",
      }
    );

    const bluetoothFineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Fine Location",
        message: "App requires Fine Location",
        buttonPositive: "Ok",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      bluetoothFineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth requires Location",
            buttonPositive: "Ok",
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroidPermissionGranted = await requestAndroidPermissions();
        return isAndroidPermissionGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicatedDevice = (devices, nextDevice) => {
    return devices.findIndex((device) => nextDevice.id === device.id) > -1;
  };

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
      if (device && device.name?.includes("Fit")) {
        setAllDevices((prevState) => {
          if (!isDuplicatedDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const connectToDevice = async (device) => {
    console.log("Attempting to connect to device:", device.id);
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      console.log("Connected to device:", device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection, device);
      startStreamingStepData(deviceConnection, device);
    } catch (e) {
      console.log("ERROR IN CONNECTION", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
      setStepCount(0);
    }
  };

  const onHeartRateUpdate = (error, characteristic) => {
    if (error) {
      console.log(error);
      return -1;
    }
    if (!characteristic?.value) {
      console.log("No Data was received");
      return -1;
    }

    const rawData = base64.decode(characteristic.value);
    let innerHeartRate = -1;

    const firstBitValue = rawData.charCodeAt(0) & 0x01;
    if (firstBitValue === 0) {
      innerHeartRate = rawData.charCodeAt(1);
    } else {
      innerHeartRate = (rawData.charCodeAt(1) << 8) + rawData.charCodeAt(2);
    }

    console.log("Heart rate received:", innerHeartRate);
    setHeartRate(innerHeartRate);
  };

  const onStepCountUpdate = (error, characteristic) => {
    if (error) {
      console.log(error);
      return -1;
    }
    if (!characteristic?.value) {
      console.log("No Data was received");
      return -1;
    }

    const rawData = base64.decode(characteristic.value);
    let innerStepCount = -1;

    const firstBitValue = rawData.charCodeAt(0) & 0x01;
    if (firstBitValue === 0) {
      innerStepCount = rawData.charCodeAt(1);
    } else {
      innerStepCount = (rawData.charCodeAt(1) << 8) + rawData.charCodeAt(2);
    }

    console.log("Step Count received:", innerStepCount);
    setStepCount(innerStepCount);
  };

  const startStreamingData = (device, deviceConnection) => {
    if (device) {
      console.log("Starting to stream data from device:", device.id);
      deviceConnection.monitorCharacteristicForService(
        HEART_RATE_UUID,
        HEART_RATE_CHARACTERISTIC,
        onHeartRateUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  const startStreamingStepData = (device, deviceConnection) => {
    if (device) {
      console.log("Start Streaming Step Data:", device.id);
      deviceConnection.monitorCharacteristicForService(
        STEP_COUNTER_UUID,
        STEP_COUNTER_CHARACTERISTIC,
        onStepCountUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    stepCount,
    disconnectFromDevice,
  };
}

export default useBle;
