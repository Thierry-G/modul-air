
# Lexique des interfaces

- **I²C (Inter-Integrated Circuit)** : Bus de communication série à deux fils (SDA, SCL) permettant de relier plusieurs périphériques. Fréquence typique : 100 kHz à 400 kHz. Utilisé pour capteurs, mémoires, afficheurs.
- **SPI (Serial Peripheral Interface)** : Bus série synchrone à quatre fils (MISO, MOSI, SCK, SS) pour échanges rapides entre microcontrôleurs et périphériques. Fréquence typique : jusqu’à plusieurs MHz.
- **UART (Universal Asynchronous Receiver/Transmitter)** : Communication série asynchrone (TX, RX) pour liaisons point à point. Utilisé pour modules Bluetooth, GPS, capteurs, etc.
- **PWM (Pulse Width Modulation)** : Signal numérique modulé en largeur d’impulsion, utilisé pour transmettre des valeurs analogiques ou piloter des moteurs, LED, etc.
- **Analogique** : Sortie en tension proportionnelle à la mesure (ex : 0–5 V). Nécessite un convertisseur analogique-numérique (ADC).
- **1-wire** : Bus série à un fil pour la communication avec certains capteurs (ex : DHT22).

---

## Tableau de compatibilité des interfaces

| Interface   | ESP32 | Arduino | Raspberry Pi |
|-------------|:-----:|:-------:|:------------:|
| I²C         |   ✔   |   ✔     |      ✔       |
| SPI         |   ✔   |   ✔     |      ✔       |
| UART        |   ✔   |   ✔     |      ✔       |
| PWM         |   ✔   |   ✔     |      ✔*      |
| Analogique  |   ✔   |   ✔     |      ✔**     |
| 1-wire      |   ✔   |   ✔     |      ✔       |

\* PWM sur Raspberry Pi : disponible via GPIO, mais nécessite une configuration logicielle spécifique.  
\** Analogique sur Raspberry Pi : nécessite un module ADC externe, car le Pi n’a pas d’entrée analogique native.