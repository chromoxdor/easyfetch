var IP1 = {
    "System": {
        "Load": 23.18,
        "Load LC": 8320,
        "Build": 20221105,
        "Git Build": "mega-20221105",
        "System Libraries": "ESP82xx Core 2843a5ac, NONOS SDK 2.2.2-dev(c0eb301), LWIP: 2.1.2 PUYA support",
        "Plugin Count": 47,
        "Plugin Description": "[Normal]",
        "Build Time": "Nov  5 2022 15:50:49",
        "Binary Filename": "ESP_Easy_mega_20221105_normal_ESP8266_4M1M",
        "Local Time": "2023-01-27 09:15:12",
        "UTC time stored in RTC": "-",
        "Time Source": "NTP",
        "Time Wander": -4.2,
        "Use NTP": "true",
        "Unit Number": 1,
        "Unit Name": "Main",
        "Uptime": 1492,
        "Uptime (ms)": 89507818,
        "Last Boot Cause": "Exception",
        "Reset Reason": "Exception",
        "CPU Eco Mode": "false",
        "Heap Max Free Block": 8360,
        "Heap Fragmentation": 31,
        "Free RAM": 12336,
        "Free Stack": 3536,
        "ESP Chip Model": "ESP8266",
        "Sunrise": "7:54",
        "Sunset": "16:42",
        "Timezone Offset": 60,
        "Latitude": 52.53,
        "Longitude": 13.40,
        "Syslog Log Level": "None",
        "Serial Log Level": "None",
        "Web Log Level": "None"
    },
    "WiFi": {
        "Hostname": "Main",
        "IP Address": "IP1",
        "RSSI": -43
    },
    "nodes": [
        {
            "nr": 1,
            "name": "Main",
            "ip": "IP1",
        }, {
            "nr": 2,
            "name": "Heating",
            "ip": "IP2",
        }, {
            "nr": 3,
            "name": "Bedroom",
            "ip": "IP3",
        }, {
            "nr": 4,
            "name": "NeoPixel",
            "ip": "IP4",
        }],
    "Sensors": [
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "State",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Switch input - Switch",
            "TaskName": "ButtonXX",
            "TaskDeviceNumber": 1,
            "TaskEnabled": "true",
            "TaskNumber": 1
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "btnState?12",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Switch input - Switch",
            "TaskName": "Light1",
            "TaskDeviceNumber": 1,
            "TaskEnabled": "true",
            "TaskNumber": 2
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Bathroom&5",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 2,
                    "Name": "TV&7",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 3,
                    "Name": "TV_Bedroom&3",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 4,
                    "Name": "Coffee&6",
                    "NrDecimals": 2,
                    "Value": 0.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "dButtons",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 3
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Countdown?0?60?1?min",
                    "NrDecimals": 0,
                    "Value": 30
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "vSlider",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "false",
            "TaskNumber": 4
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "BedLight&8",
                    "NrDecimals": 2,
                    "Value": 0.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "dButtons2",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 5
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Inside&984590&5?°C",
                    "NrDecimals": 1,
                    "Value": 0.0
                },
                {
                    "ValueNumber": 2,
                    "Name": "Outside&143789&5?°C",
                    "NrDecimals": 1,
                    "Value": 0.0
                },
                {
                    "ValueNumber": 3,
                    "Name": "noVal",
                    "NrDecimals": 2,
                    "Value": 0.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "bigVal",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 7
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "?°C",
                    "NrDecimals": 1,
                    "Value": 19.9
                },
                {
                    "ValueNumber": 2,
                    "Name": "?H",
                    "NrDecimals": 0,
                    "Value": 43
                },
                {
                    "ValueNumber": 3,
                    "Name": "PressureXX",
                    "NrDecimals": 2,
                    "Value": 1024.11
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 60,
            "Type": "Environment - BMx280",
            "TaskName": "Livingroom",
            "TaskDeviceNumber": 28,
            "TaskEnabled": "true",
            "TaskNumber": 8
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Analog",
                    "NrDecimals": 2,
                    "Value": 0.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Analog input - internal",
            "TaskName": "",
            "TaskDeviceNumber": 2,
            "TaskEnabled": "false",
            "TaskNumber": 9
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Temperature",
                    "NrDecimals": 2,
                    "Value": 24.43
                },
                {
                    "ValueNumber": 2,
                    "Name": "Humidity",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 3,
                    "Name": "Pressure",
                    "NrDecimals": 2,
                    "Value": 1016.75
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "true"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 10,
            "Type": "Environment - BMx280",
            "TaskName": "SensorXX",
            "TaskDeviceNumber": 28,
            "TaskEnabled": "true",
            "TaskNumber": 10
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "?°C",
                    "NrDecimals": 1,
                    "Value": 19.8
                },
                {
                    "ValueNumber": 2,
                    "Name": "?H",
                    "NrDecimals": 0,
                    "Value": 57
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 60,
            "Type": "Environment - DHT11/12/22  SONOFF2301/7021",
            "TaskName": "Bedroom",
            "TaskDeviceNumber": 5,
            "TaskEnabled": "true",
            "TaskNumber": 11
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "?°C",
                    "NrDecimals": 1,
                    "Value": 23.6
                },
                {
                    "ValueNumber": 2,
                    "Name": "?H",
                    "NrDecimals": 0,
                    "Value": 43
                },
                {
                    "ValueNumber": 3,
                    "Name": "PressureXX",
                    "NrDecimals": 2,
                    "Value": 1023.42
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 60,
            "Type": "Environment - BMx280",
            "TaskName": "Bathroom",
            "TaskDeviceNumber": 28,
            "TaskEnabled": "true",
            "TaskNumber": 12
        }
    ],
    "TTL": 1000
}
var IP2 = {
    "System": {
        "Load": 9.01,
        "Load LC": 440,
        "Build": 20221015,
        "Git Build": "My Build: Oct 15 2022 14:57:52",
        "System Libraries": "ESP82xx Core 2843a5ac, NONOS SDK 2.2.2-dev(38a443e), LWIP: 2.1.2 PUYA support",
        "Plugin Count": 8,
        "Plugin Description": "[No Debug Log]",
        "Build Time": "Oct 15 2022 14:57:48",
        "Binary Filename": "ESP_Easy_mega_20221015_custom_ESP8266_4M1M",
        "Local Time": "2023-01-27 11:08:01",
        "Time Source": "NTP",
        "Time Wander": -0.008,
        "Use NTP": "true",
        "Unit Number": 2,
        "Unit Name": "Junkers",
        "Uptime": 48289,
        "Uptime (ms)": 2898014684,
        "Last Boot Cause": "Exception",
        "Reset Reason": "Exception",
        "CPU Eco Mode": "true",
        "Heap Max Free Block": 6960,
        "Heap Fragmentation": 38,
        "Free RAM": 11288,
        "Free Stack": 3520,
        "ESP Chip Model": "ESP8266",
        "Sunrise": "7:08",
        "Sunset": "19:15",
        "Timezone Offset": 60,
        "Latitude": 0.00,
        "Longitude": 0.00,
        "Syslog Log Level": "None",
        "Serial Log Level": "None",
        "Web Log Level": "None"
    },
    "WiFi": {
        "Hostname": "Heating",
        "IP Address": "IP2",
        "RSSI": -26
    },
    "Sensors": [
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "setpoint",
                    "NrDecimals": 1,
                    "Value": 20.5
                },
                {
                    "ValueNumber": 2,
                    "Name": "heating",
                    "NrDecimals": 0,
                    "Value": 1
                },
                {
                    "ValueNumber": 3,
                    "Name": "mode",
                    "NrDecimals": 0,
                    "Value": 1
                },
                {
                    "ValueNumber": 4,
                    "Name": "timeout",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 30,
            "Type": "Display - OLED SSD1306/SH1106 Thermo",
            "TaskName": "Day",
            "TaskDeviceNumber": 109,
            "TaskEnabled": "true",
            "TaskNumber": 1
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "setpoint",
                    "NrDecimals": 1,
                    "Value": 18.5
                },
                {
                    "ValueNumber": 2,
                    "Name": "heating",
                    "NrDecimals": 0,
                    "Value": 0
                },
                {
                    "ValueNumber": 3,
                    "Name": "mode",
                    "NrDecimals": 0,
                    "Value": 1
                },
                {
                    "ValueNumber": 4,
                    "Name": "timeout",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 30,
            "Type": "Display - OLED SSD1306/SH1106 Thermo",
            "TaskName": "Night",
            "TaskDeviceNumber": 109,
            "TaskEnabled": "false",
            "TaskNumber": 2
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "⇩?C",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 2,
                    "Name": "⇧?C",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 3,
                    "Name": "Boost",
                    "NrDecimals": 0,
                    "Value": 0
                },
                {
                    "ValueNumber": 4,
                    "Name": "Day",
                    "NrDecimals": 0,
                    "Value": 1
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "dButtons",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 3
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "btnState",
                    "NrDecimals": 0,
                    "Value": 1
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Switch input - Switch",
            "TaskName": "RelayXX",
            "TaskDeviceNumber": 1,
            "TaskEnabled": "true",
            "TaskNumber": 4
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Value",
                    "NrDecimals": 0,
                    "Value": 29
                },
                {
                    "ValueNumber": 2,
                    "Name": "Result",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "countXX",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 5
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Counter",
                    "NrDecimals": 0,
                    "Value": 29
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Switch Input - Rotary Encoder",
            "TaskName": "RotaryXX",
            "TaskDeviceNumber": 59,
            "TaskEnabled": "true",
            "TaskNumber": 6
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Temperature?°C",
                    "NrDecimals": 1,
                    "Value": 20.1
                },
                {
                    "ValueNumber": 2,
                    "Name": "Setpoint?°C",
                    "NrDecimals": 1,
                    "Value": 20.5
                },
                {
                    "ValueNumber": 3,
                    "Name": "Humidity?H",
                    "NrDecimals": 0,
                    "Value": 43
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "bigValC",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 7
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Temperature",
                    "NrDecimals": 1,
                    "Value": 20.1
                },
                {
                    "ValueNumber": 2,
                    "Name": "Humidity",
                    "NrDecimals": 0,
                    "Value": 43
                },
                {
                    "ValueNumber": 3,
                    "Name": "Pressure",
                    "NrDecimals": 2,
                    "Value": 1024.84
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "true"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 10,
            "Type": "Environment - BMx280",
            "TaskName": "sensorXX",
            "TaskDeviceNumber": 28,
            "TaskEnabled": "true",
            "TaskNumber": 8
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "State",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Switch input - Switch",
            "TaskName": "ButtonXX",
            "TaskDeviceNumber": 1,
            "TaskEnabled": "true",
            "TaskNumber": 9
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "DayMode",
                    "NrDecimals": 4,
                    "Value": 430.1280
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "tSlider",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 10
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Output",
                    "NrDecimals": 0,
                    "Value": 1
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 60,
            "Type": "Regulator - Level Control",
            "TaskName": "timekeepXX",
            "TaskDeviceNumber": 21,
            "TaskEnabled": "true",
            "TaskNumber": 11
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Temperature",
                    "NrDecimals": 2,
                    "Value": 23.41
                },
                {
                    "ValueNumber": 2,
                    "Name": "Humidity",
                    "NrDecimals": 2,
                    "Value": 43.24
                },
                {
                    "ValueNumber": 3,
                    "Name": "Pressure",
                    "NrDecimals": 2,
                    "Value": 1024.19
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Environment - BMx280",
            "TaskName": "Sensor",
            "TaskDeviceNumber": 28,
            "TaskEnabled": "false",
            "TaskNumber": 12
        }
    ],
    "TTL": 1000
}
var IP3 = {
    "System": {
        "Load": 5.06,
        "Load LC": 488,
        "Build": 20116,
        "Git Build": "My Build: Jul 18 2022 17:46:16",
        "System Libraries": "ESP82xx Core 2843a5ac, NONOS SDK 2.2.2-dev(38a443e), LWIP: 2.1.2 PUYA support",
        "Plugin Count": 10,
        "Plugin Description": "[IR]",
        "Local Time": "2023-01-27 11:15:38",
        "Time Source": "NTP",
        "Time Wander": 0.004,
        "Use NTP": "true",
        "Unit Number": 3,
        "Unit Name": "Bedroom",
        "Uptime": 12830,
        "Uptime (ms)": 769912219,
        "Last Boot Cause": "Cold Boot",
        "Reset Reason": "Power On",
        "CPU Eco Mode": "true",
        "Free RAM": 14448,
        "Free Stack": 3568,
        "Sunrise": "7:08",
        "Sunset": "19:15",
        "Timezone Offset": 60,
        "Latitude": 0.00,
        "Longitude": 0.00
    },
    "WiFi": {
        "Hostname": "Bedroom",
        "IP Address": "IP3",
        "RSSI": -47
    },
    "Sensors": [
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "State",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Switch input - Switch",
            "TaskName": "ButtonXX",
            "TaskDeviceNumber": 1,
            "TaskEnabled": "true",
            "TaskNumber": 1
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "btnState",
                    "NrDecimals": 0,
                    "Value": 0
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 2,
            "Type": "Switch input - Switch",
            "TaskName": "Relay",
            "TaskDeviceNumber": 1,
            "TaskEnabled": "true",
            "TaskNumber": 2
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "IR",
                    "NrDecimals": 0,
                    "Value": 2104
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Communication - IR Receive (TSOP4838)",
            "TaskName": "irXX",
            "TaskDeviceNumber": 16,
            "TaskEnabled": "true",
            "TaskNumber": 4
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Temperature",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 2,
                    "Name": "Humidity",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 3,
                    "Name": "Pressure",
                    "NrDecimals": 2,
                    "Value": 0.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Environment - BMx280",
            "TaskName": "sensor",
            "TaskDeviceNumber": 28,
            "TaskEnabled": "false",
            "TaskNumber": 8
        },
        {
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "Sensor",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "false",
            "TaskNumber": 9
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Temperature?°C",
                    "NrDecimals": 1,
                    "Value": 19.7
                },
                {
                    "ValueNumber": 2,
                    "Name": "Humidity?H",
                    "NrDecimals": 0,
                    "Value": 55
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "true"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 60,
            "Type": "Environment - DHT11/12/22  SONOFF2301/7021",
            "TaskName": "bigVal",
            "TaskDeviceNumber": 5,
            "TaskEnabled": "true",
            "TaskNumber": 11
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Temperature",
                    "NrDecimals": 2,
                    "Value": 23.36
                },
                {
                    "ValueNumber": 2,
                    "Name": "Humidity",
                    "NrDecimals": 2,
                    "Value": 43.19
                },
                {
                    "ValueNumber": 3,
                    "Name": "Pressure",
                    "NrDecimals": 2,
                    "Value": 1024.21
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Environment - BMx280",
            "TaskName": "Sensor",
            "TaskDeviceNumber": 28,
            "TaskEnabled": "false",
            "TaskNumber": 12
        }
    ],
    "TTL": 1000
}
var IP4 = {
    "System": {
        "Load": 3.63,
        "Load LC": 9026,
        "Build": 20230126,
        "Git Build": "pygit2_not_installed",
        "System Libraries": "ESP82xx Core 2843a5ac, NONOS SDK 2.2.2-dev(38a443e), LWIP: 2.1.2 PUYA support",
        "Plugin Count": 52,
        "Plugin Description": "[Normal][NeoPixel][No Debug Log]",
        "Build Time": "Jan 26 2023 21:33:24",
        "Binary Filename": "ESP_Easy_mega_20230126_neopixel_ESP8266_4M1M",
        "Local Time": "2023-01-27 08:05:20",
        "Time Source": "ESPEasy p2p (66)",
        "Time Wander": 38.6,
        "Use NTP": "false",
        "Unit Number": 4,
        "Unit Name": "NeoPixel",
        "Uptime": 543,
        "Uptime (ms)": 32620313,
        "Last Boot Cause": "Soft Reboot",
        "Reset Reason": "Software/System restart",
        "CPU Eco Mode": "false",
        "Free RAM": 11864,
        "Free Stack": 3552,
        "ESP Chip Model": "ESP8266",
        "Sunrise": "6:08",
        "Sunset": "18:15",
        "Timezone Offset": 0,
        "Latitude": 0.00,
        "Longitude": 0.00,
        "Syslog Log Level": "None",
        "Serial Log Level": "Info",
        "Web Log Level": "None"
    },
    "WiFi": {
        "Hostname": "NeoPixel",
        "IP Address": "IP4",
        "RSSI": -61
    },
    "Sensors": [
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Mode",
                    "NrDecimals": 0,
                    "Value": 0
                },
                {
                    "ValueNumber": 2,
                    "Name": "Lastmode",
                    "NrDecimals": 0,
                    "Value": 0
                },
                {
                    "ValueNumber": 3,
                    "Name": "Fadetime",
                    "NrDecimals": 0,
                    "Value": 1000
                },
                {
                    "ValueNumber": 4,
                    "Name": "Fadedelay",
                    "NrDecimals": 0,
                    "Value": 20
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Output - NeoPixel (BusFX)",
            "TaskName": "rXX",
            "TaskDeviceNumber": 128,
            "TaskEnabled": "true",
            "TaskNumber": 1
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "h",
                    "NrDecimals": 2,
                    "Value": 306.00
                },
                {
                    "ValueNumber": 2,
                    "Name": "s",
                    "NrDecimals": 2,
                    "Value": 21.00
                },
                {
                    "ValueNumber": 3,
                    "Name": "v",
                    "NrDecimals": 2,
                    "Value": 56.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "neoPixel",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 2
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Enable",
                    "NrDecimals": 2,
                    "Value": 1.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "dButtons",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 3
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Task1",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 2,
                    "Name": "Task2",
                    "NrDecimals": 2,
                    "Value": 0.00
                },
                {
                    "ValueNumber": 3,
                    "Name": "Task3",
                    "NrDecimals": 2,
                    "Value": 0.00
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 0,
            "Type": "Generic - Dummy Device",
            "TaskName": "dButtons2",
            "TaskDeviceNumber": 33,
            "TaskEnabled": "true",
            "TaskNumber": 4
        },
        {
            "TaskValues": [
                {
                    "ValueNumber": 1,
                    "Name": "Color",
                    "NrDecimals": 0,
                    "Value": 16666624
                },
                {
                    "ValueNumber": 2,
                    "Name": "Brightness",
                    "NrDecimals": 0,
                    "Value": 255
                },
                {
                    "ValueNumber": 3,
                    "Name": "Type",
                    "NrDecimals": 0,
                    "Value": 2
                }],
            "DataAcquisition": [
                {
                    "Controller": 1,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 2,
                    "IDX": 0,
                    "Enabled": "false"
                },
                {
                    "Controller": 3,
                    "IDX": 0,
                    "Enabled": "false"
                }],
            "TaskInterval": 60,
            "Type": "Output - NeoPixel (Candle)",
            "TaskName": "zXX",
            "TaskDeviceNumber": 42,
            "TaskDeviceGPIO1": 2,
            "TaskEnabled": "false",
            "TaskNumber": 5
        }
    ],
    "TTL": 1000
}