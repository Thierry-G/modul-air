from flask import Flask, render_template, request

app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)

# Seuils Likert pour chaque polluant (extrait de Seuils.md)
SEUILS = {
    "CO₂":      [(0, 800), (800, 1000), (1000, 1500), (1500, 2000), (2000, 5000), (5000, float('inf'))],
    "CO":       [(0, 5), (5, 10), (10, 20), (20, 50), (50, 100), (100, float('inf'))],
    "NO₂":      [(0, 0.04), (0.04, 0.1), (0.1, 0.2), (0.2, 0.5), (0.5, 1), (1, float('inf'))],
    "O₃":       [(0, 0.05), (0.05, 0.1), (0.1, 0.2), (0.2, 0.3), (0.3, 0.5), (0.5, float('inf'))],
    "NH₃":      [(0, 0.2), (0.2, 0.5), (0.5, 1), (1, 2), (2, 5), (5, float('inf'))],
    "Benzène":  [(0, 0.005), (0.005, 0.01), (0.01, 0.05), (0.05, 0.1), (0.1, 0.5), (0.5, float('inf'))],
    "TVOC":     [(0, 200), (200, 400), (400, 1000), (1000, 2000), (2000, 5000), (5000, float('inf'))],
    "PM2.5":    [(0, 10), (10, 25), (25, 50), (50, 75), (75, 150), (150, float('inf'))],
    "PM10":     [(0, 20), (20, 50), (50, 100), (100, 150), (150, 250), (250, float('inf'))],
}

CAPTEURS = {
    "CO₂":      "MH-Z19, SCD30, SCD4x, S8",
    "CO":       "MQ-7, Figaro TGS5042",
    "NO₂":      "Figaro TGS2600, TGS2201",
    "O₃":       "MQ-131, Aeroqual",
    "NH₃":      "MQ-135, Figaro TGS826",
    "Benzène":  "MQ-135, TGS2602",
    "TVOC":     "SGP30, CCS811, BME680",
    "PM2.5":    "SPS30, Nova SD5011, PMS5003",
    "PM10":     "SPS30, Nova SD5011, PMS5003",
}

UNITES = {
    "CO₂": "ppm", "CO": "ppm", "NO₂": "ppm", "O₃": "ppm", "NH₃": "ppm",
    "Benzène": "ppm", "TVOC": "ppb", "PM2.5": "µg/m³", "PM10": "µg/m³"
}

# Default values for dashboard
DEFAULT_VALUES = {
    "CO₂": 1200,
    "CO": 8,
    "PM2.5": 35,
    "O₃": 0.08,
    "NO₂": 0.06,
    "TVOC": 350
}

TOXICITY_LABELS = [
    "Non toxique",
    "Très faiblement toxique",
    "Faiblement toxique",
    "Moyennement toxique",
    "Toxique",
    "Très toxique"
]

TOXICITY_COLORS = [
    "#4CAF50",    # Non toxique
    "#8BC34A",    # Très faiblement toxique
    "#FFEB3B",    # Faiblement toxique
    "#FF9800",    # Moyennement toxique
    "#F57C00",    # Toxique
    "#F44336"     # Très toxique
]

def get_likert_index(value, seuils):
    for i, (low, high) in enumerate(seuils):
        if low <= value < high:
            return i
    return len(seuils) - 1

def get_overall_toxicity(gauges):
    return max(g['likert_idx'] for g in gauges) if gauges else 0

@app.route('/')
def index():
    values = {}
    for pollutant, default in DEFAULT_VALUES.items():
        try:
            values[pollutant] = float(request.args.get(pollutant, default))
        except ValueError:
            values[pollutant] = default

    gauges = []
    for pollutant in DEFAULT_VALUES.keys():
        seuils = SEUILS.get(pollutant, [])
        value = values[pollutant]
        likert_idx = get_likert_index(value, seuils)
        gauge = {
            "name": pollutant,
            "display_name": {
                "CO₂": "Dioxyde de Carbone",
                "CO": "Monoxyde de Carbone",
                "PM2.5": "Particules fines",
                "O₃": "Ozone",
                "NO₂": "Dioxyde d'Azote",
                "TVOC": "Total VOCs"
            }.get(pollutant, pollutant),
            "value": value,
            "unit": UNITES.get(pollutant, ""),
            "likert_idx": likert_idx,
            "toxicity_label": TOXICITY_LABELS[likert_idx],
            "toxicity_color": TOXICITY_COLORS[likert_idx],
            "capteurs": CAPTEURS.get(pollutant, "")
        }
        gauges.append(gauge)

    # Tamagoshi logic
    from datetime import datetime
    now = datetime.now()
    hour = now.hour
    minute = now.minute
    out_times = [(8,0), (10,30), (12,0), (14,0), (16,0), (17,0)]
    is_out = any(hour == h and minute == m for h, m in out_times)
    overall_toxicity = get_overall_toxicity(gauges)

    return render_template(
        "index.html",
        gauges=gauges,
        tamagoshi_out=is_out,
        tamagoshi_toxicity=overall_toxicity
    )

if __name__ == '__main__':
    app.run(debug=True)