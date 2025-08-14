# Modul'Air

## Capteurs
Modules éléctroniques qui relèvent les informations relatives aux phénomènes qu'ils détectent.

1. **Capteurs intégrables**: destinés à être interfacé avec des plateformes "ouvertes", tels que ESP32, Arduino et Raspberry Pi... 
2. **Capteurs propriétaires**: nécéssite un écosystème dédié (smarthone, cloud) obligatoire et propriétaire fournit par le fabricant.

### Capteurs intégrables

Cette catégorie regroupe des modules électroniques « ouverts » conçus pour l'embarqué ou le DIY. Ils peuvent être intégrés sur Arduino, ESP32, Raspberry Pi, etc. via des interfaces standard (I²C, SPI, UART, analogique). Ils couvrent un large spectre de détectables : gaz (CO₂, CO, COV, NO₂, etc.), particules (PM), et souvent température/humidité.

- **Capteurs CO₂ NDIR** : MH-Z19 (CO₂ 0–2000 ppm, interface UART/PWM) ; SenseAir S8 (CO₂ 0.04–2% volume, soit 0–20 000 ppm, sorties UART Modbus/PWM) ; Sensirion SCD30 (CO₂ 400–10 000 ppm, I²C/UART, intègre T°/H°) ; Sensirion SCD4x (CO₂, I²C) – modules pour usage professionnel ou hobby.

- **Capteurs COV / eCO₂** : Sensirion SGP30 (COV totaux TVOC et CO₂ équivalent 0–60000 ppb/ppm via I²C) ; SGP40 (capteur de COV, sortie I²C index) ; AMS/ScioSense CCS811 (eCO₂ 400–29 000 ppm, TVOC 0–32768 ppb, I²C). Bosch BME680 (capteur 4-en-1, détecté les COV sous forme d’indice qualité d’air IAQ, avec T°, H°, P°, interfaces I²C/SPI).

- **Capteurs particules** : Nova SD5011 (laser, mesure PM2.5/PM10 0–999 µg/m³, interface UART & signal PWM) ; Plantower PMSS003 et PMSY003 (capteurs laser, sorties UART TTL, PM2.5 0–500 µg/m³) ; Sensirion SPS30 (PM1/2.5/4/10, plage 0–1000 µg/m³, interfaces UART/I²C) ; Sharp GP2Y1010AUOF (capteur poussière analogique, sortie tension proportionnelle à la concentration en poussières fines).

- **Capteurs gaz divers** : Modules MQ (par ex. MQ-135 détecté NH₃, COV, benzène, etc. dans ~10–1000 ppm en sortie analogique) ou Figaro (CO, O₂, NOx) en sortie analogique. Ces capteurs nécessitent généralement une alimentation 5 V et un circuit de chauffage, avec lecture analogique.

- **Température/Humidité (et pression)** : DHT22/AM2302 (T/H, signal numérique sur 1 fil) ; BME280 (T°, H°, P° via I²C/SPI) ; SHT30/SHT31 (T°, H° via I²C) ; etc. Ces capteurs ne mesurent pas de polluants, mais sont souvent associés aux mesures d’air.

| Capteur DIY / Module            | Polluants détectés                     | Plage de mesure                          | Interface              | Doc. EN (ou FR)       |
|---------------------------------|----------------------------------------|------------------------------------------|------------------------|-----------------------|
| **MH-Z19** (Winsen NDIR)        | CO₂ (NDIR)                             | 0–2000 ppm (+50 ppm+5%)                 | UART (TTL), PWM        | EN                   |
| **Senseair S8** (NDIR CO₂)      | CO₂                                    | 0.04–2% vol. (0–20 000 ppm)             | UART (Modbus), PWM     | EN                   |
| **Sensirion SCD30**             | CO₂ + T°, H°                           | CO₂ 400–10 000 ppm                      | UART, I²C             | EN                   |
| Sensirion SGP30                 | TVOC (COV totaux) + CO₂-éq             | CO₂-eq 400-60 000 ppm, TVOC 0-60 000 ppb | I²C                   | EN                   |
| Sensirion SGP40                 | VOC (indice COV)                       | (valeur d'indice, -0-100)               | I²C                   | EN                   |
| Sensirion SCD4x / SCD4x         | CO₂ + T°, H°                           | CO₂ 0-10 000 ppm                        | I²C                   | EN                   |
| Bosch BME680                    | COV (IAQ index) + T°, H°, P°           | Indice qualité d'air (COV), 0-100%RH    | I²C, SPI              | EN (Bosch)           |
| AMS CCS811                      | TVOC + eCO₂                            | TVOC 0-32768 ppb, CO₂-eq 400-29206 ppm  | I²C                   | EN                   |
| Nova SD5011 (capteur PM laser)  | PM2.5, PM10                            | 0-999 µg/m³                             | UART (TTL), PWM        | EN (Nova)            |
| Plantower PM55003 (capteur PM)   | PM2.5, PM10                            | 0-500 µg/m³                             | UART (TTL)             | EN (Plantower)       |
| Plantower PM57003 (capteur PM)   | PM2.5, PM10                            | 0-500 µg/m³                             | UART (TTL)             | EN                   |
| Sensirion SPS30 (capteur PM)    | PM1.0, PM2.5, PM4.0, PM10              | 0-1000 µg/m³                            | UART, I²C             | EN                   |
| MQ-135 (Semiconductor)          | NH₃, Benzène, fumées, COV...           | ~10-1000 ppm (sensible à divers gaz)    | Analogique (sortie V)  | EN (Winsen)          |
| Sharp GP2Y1010AU0F (optique)    | Poussières fines (PM0.3-1.0)           | ~0-1000 µg/m³ (max ~0.5 mg/m³)          | Sortie analogique (pulse) | JP/EN (Sharp)    |
| DHT22 / AM2302                  | Température, humidité                  | T° -40-80 °C, H 0-100 %                 | Numérique 1-wire       | EN                   |
| BME280 (Bosch)                  | T°, H°, pression                       | T° -40-85 °C, H 0-100 %                 | I²C, SPI              | EN (Bosch)           |
| SHT31 (Sensirion)               | T°, H°                                 | T° -40-125 °C, H 0-100 %                | I²C                   | EN                   |

Pour chaque capteur DIY ci-dessus, les données techniques proviennent des fiches techniques officielles. Les interfaces de communication courantes sont I²C (majoritairement 3-5V), l’UART (TTL 3.3V ou 5V) et, pour certains capteurs PM, un signal PWM spécifique. La documentation est en général disponible en anglais (seuls quelques fabricants comme Bosch ou Sensirion offrent parfois des guides simplifiés multilingues).


### Capteurs propriétaires (systèmes fermés)

Les capteurs « propriétaires » sont des dispositifs complets vendus avec leur propre application ou plateforme cloud, souvent fermés et dépendants du constructeur. Ils sont typiquement utilisés en domotique grand public pour surveiller l’air intérieur (mais peuvent aussi être destinés à l’industrie ou à la recherche si l’accès au capteur seul n’est pas nécessaire). Par exemple, **Netatmo Indoor Air Quality Monitor** détecte le CO₂ (0-5000 ppm), la température et l’humidité. Les données sont accessibles uniquement via l’application Netatmo (Wi-Fi) ; documentation disponible en français et anglais. De même, **l’Airthings Wave Plus** mesure le radon (0-20 000 Bq/m³), le CO₂ (400-5000 ppm), les COV totaux (TVOC) et la température/humidité. Ce capteur se connecte en Bluetooth à l’application Airthings (documentation EN).

Parmi d’autres exemples fermés grand public, on trouve **l’Awair Element** (CO₂, TVOC, PM2.5 sur Wi-Fi), le **Foobot** (PM2.5, TVOC, CO₂ sur Wi-Fi), et le **Atmotube PRO** portable (PM1, PM2.5, PM10, TVOC via Bluetooth). Le **Aranet4 HOME** (moniteur CO₂ mobile) fournit des mesures de CO₂ (NDIR) avec algorithme et affiche température et humidité. Enfin, des purificateurs comme **Dyson Pure Cool Link** intègrent des capteurs PM2.5/PM10, COV et NO₂ pilotés par l’application Dyson.

| Capteur propriétaire            | Polluants détectés                     | Plage de mesure                          | Interface / notes              | Doc. disponible FR/EN       |
|---------------------------------|----------------------------------------|------------------------------------------|--------------------------------|-----------------------------|
| **Netatmo Smart Indoor Monitor** | CO₂                                    | 0-5000 ppm                              | Wi-Fi (app Netatmo)            | FR & EN (site Netatmo)      |
| **Airthings Wave Plus**         | Radon, CO₂, TVOC, Temp, Humidité       | Radon 0-20 000 Bq/m³, CO₂ 400-5000 ppm  | Bluetooth (app Airthings)      | EN (pas de FR)              |
| **Awair Element**               | CO₂, TVOC, PM2.5, T°, H°              | CO₂≈0-5000 ppm, PM2.5 jusqu’à 100 µg/m³ | Wi-Fi (app Awair)              | EN                          |
| **Foobot**                      | PM2.5, TVOC, CO₂                      | (non spécifié publiquement)              | Wi-Fi (app Foobot)             | EN                          |
| **Atmotube PRO**                | PM1, PM2.5, PM10, TVOC, T°, H°, P     | PM : 0-1000 µg/m³                       | Bluetooth (app mobile)         | FR & EN (site)              |
| **Aranet4 HOME**                | CO₂ (NDIR), Temp, Humidité, Pression  | CO₂ ≈0-9999 ppm                         | Bluetooth/ LoRa (app Aranet)   | EN                          |
| **Dyson Pure Cool Link**        | PM2.5, PM10, TVOC (HC), NO₂           | (pas publié officiellement)             | Wi-Fi/ Bluetooth (app Dyson)   | EN                          |

Chaque capteur ci-dessus est livré avec un écosystème logiciel dédié (application smartphone ou plateforme cloud) obligatoire. Les plages de mesure et les polluants détectés sont ceux annoncés par les fabricants. Les interfaces sont sans fil (Wi-Fi, Bluetooth, ou liaison dédiée), et la documentation officielle est généralement en anglais (Netatmo propose aussi des manuels en français pour ses produits grand public).