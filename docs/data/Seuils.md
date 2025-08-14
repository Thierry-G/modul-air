# Échelles de Likert et toxicité des polluants de l'air

Ce document présente pour chaque polluant une échelle de Likert de 0 (pas toxique) à 5 (très toxique), les seuils associés, ainsi que les capteurs requis pour la détection.  
Des listes par toxicité décroissante sont proposées pour les combinaisons d’éléments détectés.

---

## Échelles de Likert pour chaque gaz/particule

| Polluant      | 0 (Pas toxique) | 1 | 2 | 3 | 4 | 5 (Très toxique) | Unité | Capteur(s) typique(s) |
|---------------|-----------------|---|---|---|---|------------------|-------|-----------------------|
| **CO₂**       | < 800           | 800–1000 | 1000–1500 | 1500–2000 | 2000–5000 | > 5000           | ppm   | MH-Z19, SCD30, SCD4x, S8 |
| **CO**        | < 5             | 5–10     | 10–20    | 20–50    | 50–100   | > 100            | ppm   | MQ-7, Figaro TGS5042      |
| **NO₂**       | < 0.04          | 0.04–0.1 | 0.1–0.2  | 0.2–0.5  | 0.5–1    | > 1              | ppm   | Figaro TGS2600, TGS2201   |
| **O₃**        | < 0.05          | 0.05–0.1 | 0.1–0.2  | 0.2–0.3  | 0.3–0.5  | > 0.5            | ppm   | MQ-131, Aeroqual          |
| **NH₃**       | < 0.2           | 0.2–0.5  | 0.5–1    | 1–2      | 2–5      | > 5              | ppm   | MQ-135, Figaro TGS826     |
| **Benzène**   | < 0.005         | 0.005–0.01| 0.01–0.05| 0.05–0.1 | 0.1–0.5  | > 0.5            | ppm   | MQ-135, TGS2602           |
| **TVOC**      | < 200           | 200–400  | 400–1000 | 1000–2000| 2000–5000| > 5000           | ppb   | SGP30, CCS811, BME680     |
| **PM2.5**     | < 10            | 10–25    | 25–50    | 50–75    | 75–150   | > 150            | µg/m³ | SPS30, Nova SD5011, PMS5003 |
| **PM10**      | < 20            | 20–50    | 50–100   | 100–150  | 150–250  | > 250            | µg/m³ | SPS30, Nova SD5011, PMS5003 |

---

## Listes par toxicité décroissante (combinaisons d’éléments détectés et capteurs requis)

### 1. Très toxique (Likert 5)
- **CO** > 100 ppm (intoxication rapide) → Capteur MQ-7, Figaro TGS5042
- **NO₂** > 1 ppm (irritation sévère) → Capteur Figaro TGS2600, TGS2201
- **O₃** > 0.5 ppm (danger immédiat) → Capteur MQ-131, Aeroqual
- **Benzène** > 0.5 ppm (cancérogène) → Capteur MQ-135, TGS2602
- **PM2.5** > 150 µg/m³ (risque aigu) → SPS30, Nova SD5011, PMS5003

### 2. Toxique (Likert 4)
- **CO₂** > 5000 ppm (danger pour la santé) → MH-Z19, SCD30, SCD4x, S8
- **CO** 50–100 ppm → MQ-7, Figaro TGS5042
- **NO₂** 0.5–1 ppm → Figaro TGS2600, TGS2201
- **O₃** 0.3–0.5 ppm → MQ-131, Aeroqual
- **NH₃** 2–5 ppm → MQ-135, Figaro TGS826
- **TVOC** 2000–5000 ppb → SGP30, CCS811, BME680
- **PM10** 150–250 µg/m³ → SPS30, Nova SD5011, PMS5003

### 3. Moyennement toxique (Likert 3)
- **CO₂** 1500–2000 ppm → MH-Z19, SCD30, SCD4x, S8
- **CO** 20–50 ppm → MQ-7, Figaro TGS5042
- **NO₂** 0.2–0.5 ppm → Figaro TGS2600, TGS2201
- **O₃** 0.2–0.3 ppm → MQ-131, Aeroqual
- **NH₃** 1–2 ppm → MQ-135, Figaro TGS826
- **TVOC** 1000–2000 ppb → SGP30, CCS811, BME680
- **PM2.5** 50–75 µg/m³ → SPS30, Nova SD5011, PMS5003

### 4. Faiblement toxique (Likert 2)
- **CO₂** 1000–1500 ppm → MH-Z19, SCD30, SCD4x, S8
- **CO** 10–20 ppm → MQ-7, Figaro TGS5042
- **NO₂** 0.1–0.2 ppm → Figaro TGS2600, TGS2201
- **O₃** 0.1–0.2 ppm → MQ-131, Aeroqual
- **NH₃** 0.5–1 ppm → MQ-135, Figaro TGS826
- **TVOC** 400–1000 ppb → SGP30, CCS811, BME680
- **PM2.5** 25–50 µg/m³ → SPS30, Nova SD5011, PMS5003

### 5. Très faiblement toxique (Likert 1)
- **CO₂** 800–1000 ppm → MH-Z19, SCD30, SCD4x, S8
- **CO** 5–10 ppm → MQ-7, Figaro TGS5042
- **NO₂** 0.04–0.1 ppm → Figaro TGS2600, TGS2201
- **O₃** 0.05–0.1 ppm → MQ-131, Aeroqual
- **NH₃** 0.2–0.5 ppm → MQ-135, Figaro TGS826
- **TVOC** 200–400 ppb → SGP30, CCS811, BME680
- **PM2.5** 10–25 µg/m³ → SPS30, Nova SD5011, PMS5003

### 6. Non toxique (Likert 0)
- **CO₂** < 800 ppm
- **CO** < 5 ppm
- **NO₂** < 0.04 ppm
- **O₃** < 0.05 ppm
- **NH₃** < 0.2 ppm
- **Benzène** < 0.005 ppm
- **TVOC** < 200 ppb
- **PM2.5** < 10 µg/m³
- **PM10** < 20 µg/m³

---

## Exemple de combinaison très toxique (Likert 5) et capteurs requis

- **CO₂** > 5000 ppm + **PM2.5** > 150 µg/m³ + **NO₂** > 1 ppm  
  → Capteurs : MH-Z19 (CO₂), SPS30 (PM2.5), Figaro TGS2600 (NO₂)

- **CO** > 100 ppm + **TVOC** > 5000 ppb  
  → Capteurs : MQ-7 (CO), SGP30 (TVOC)

---

*Les seuils sont indicatifs et doivent être adaptés selon les normes