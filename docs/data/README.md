# Modul'Air Exemples de jeux de données

## 1. Capteurs CO₂ NDIR

```json
{
  "timestamp": "2025-08-14T10:23:00Z",
  "co2_ppm": 845,
  "temperature_c": 22.5,
  "humidity_percent": 45.2
}
```
Interfaces : UART (TTL), PWM, I²C (selon modèle)

## 2. Capteurs COV / eCO₂

```json
{
  "timestamp": "2025-08-14T10:23:00Z",
  "tvoc_ppb": 320,
  "eco2_ppm": 650,
  "temperature_c": 23.1,
  "humidity_percent": 47.0
}
```
Interface : I²C

## 3. Capteurs particules (PM)
```json
{
  "timestamp": "2025-08-14T10:23:00Z",
  "pm1_ugm3": 12,
  "pm2_5_ugm3": 18,
  "pm10_ugm3": 25
}
```
Interfaces : UART (TTL), PWM, I²C (selon modèle)

### 4. Capteurs gaz divers (MQ, Figaro)
```json
{
  "timestamp": "2025-08-14T10:23:00Z",
  "nh3_ppm": 0.8,
  "benzene_ppm": 0.03,
  "co_ppm": 0.1
}
```
Interface : Analogique (sortie tension)

### 5. Température/Humidité/Pression
```json
{
  "timestamp": "2025-08-14T10:23:00Z",
  "temperature_c": 21.7,
  "humidity_percent": 48.5,
  "pressure_hpa": 1012.3
}
```
Interfaces : I²C, SPI, 1-wire (selon modèle)