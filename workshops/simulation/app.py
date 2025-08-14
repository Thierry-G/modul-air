from flask import Flask, render_template_string, request

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

def get_likert_index(value, seuils):
    for i, (low, high) in enumerate(seuils):
        if low <= value < high:
            return i
    return len(seuils) - 1

@app.route('/')
def index():
    polluant = request.args.get('polluant', 'CO₂')
    value = float(request.args.get('value', 1200))
    seuils = SEUILS.get(polluant, SEUILS["CO₂"])
    likert_idx = get_likert_index(value, seuils)
    capteur = CAPTEURS.get(polluant, "N/A")
    unite = UNITES.get(polluant, "")
    return render_template_string('''
    <h2>Polluant : {{ polluant }}</h2>
    <p>Capteur(s) : {{ capteur }}</p>
    <p>Valeur mesurée : {{ value }} {{ unite }}</p>
    <div style="display: flex; gap: 10px;">
      {% for i in range(6) %}
        <div style="
          width: 40px; height: 40px; border-radius: 50%;
          background: {% if i == likert_idx %}orange{% else %}#eee{% endif %};
          border: 2px solid #ccc; display: flex; align-items: center; justify-content: center;">
          {{ i }}
        </div>
      {% endfor %}
    </div>
    <p>Échelle de Likert : 0 (pas toxique) à 5 (très toxique)</p>
    ''', polluant=polluant, capteur=capteur, value=value, unite=unite, likert_idx=likert_idx)

if __name__ == '__main__':
    app.run(debug=True)