// In your main.js, update the angle calculation
document.addEventListener('DOMContentLoaded', function () {
    // Update gauge ranges to match your Python SEUILS
    const gaugeRanges = {
        co2: { min: 0, max: 5000 },
        co: { min: 0, max: 100 },
        pm25: { min: 0, max: 150 },
        o3: { min: 0, max: 0.5 },
        no2: { min: 0, max: 1 },
        tvoc: { min: 0, max: 5000 },
        nh3: { min: 0, max: 5 },
        benzene: { min: 0, max: 0.5 },
        pm10: { min: 0, max: 250 }
    };

    // Function to calculate needle angle
    function getAngle(value, min, max) {
        value = Math.max(min, Math.min(value, max));
        // Map value to angle: -90° (min) to +90° (max)
        return -90 + ((value - min) / (max - min)) * 180;
    }

    // Animate all gauges
    function animateGauges() {
        document.querySelectorAll('.gauge').forEach(gauge => {
            const id = gauge.getAttribute('data-gauge-id');
            const value = parseFloat(gauge.getAttribute('data-gauge-value'));
            const range = gaugeRanges[id] || { min: 0, max: 100 };
            
            // Calculate target angle
            const angle = getAngle(value, range.min, range.max);
            const needle = document.getElementById(`${id}-needle`);
            const fill = document.getElementById(`${id}-fill`);

            // Debug log
            console.log(`Gauge: ${id}, Value: ${value}, Range: [${range.min}, ${range.max}], Angle: ${angle}, Needle:`, needle);

            // Reset to initial state
            if (needle) {
                needle.style.transition = 'transform 0s';
                needle.style.transformOrigin = 'bottom center';
                needle.style.transform = `translateX(-50%) rotate(-90deg)`;
            }
            if (fill) {
                fill.style.transition = 'height 0s';
                fill.style.height = '0%';
            }

            // Animate after delay
            setTimeout(() => {
                if (needle) {
                    // Force reflow
                    void needle.offsetWidth;
                    needle.style.transition = 'transform 1.5s ease-out';
                    needle.style.transformOrigin = 'bottom center';
                    needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
                }
                if (fill) {
                    fill.style.transition = 'height 1.5s ease-out';
                    // Calculate fill height based on toxicity level
                    const toxicity = parseInt(gauge.getAttribute('data-gauge-toxicity'));
                    fill.style.height = `${toxicity * 18}%`; // 18% per level
                }
            }, 100);
        });
    }

    // Initialize
    animateGauges();
    

    // Thermometer animation and unit toggle
    const tempValueEl = document.getElementById('temperature-value');
    const tempUnitEl = document.getElementById('temperature-unit');
    const thermometerFill = document.getElementById('thermometer-fill');
    const toggleBtn = document.getElementById('toggle-temp-unit');
    const scaleLabels = document.querySelectorAll('.thermo-scale-label');

    let tempC = tempValueEl ? parseFloat(tempValueEl.textContent) : null;
    let isCelsius = true;

    // Humidity animation
    const humidityValueEl = document.getElementById('humidity-value');
    const humidityFill = document.getElementById('humidity-fill');
    const humidityScaleLabels = document.querySelectorAll('.humidity-scale-label');

    // Celsius and Fahrenheit scale values
    const scaleC = [
        { value: 33, label: 'Trop chaud', color: '#f44336' },
        { value: 26, label: 'Chaud', color: '#ff9800' },
        { value: 18, label: 'Normal', color: '#4CAF50' },
        { value: 10, label: 'Frais', color: '#00bcd4' },
        { value: 0, label: 'Froid', color: '#3f51b5' }
    ];
    const scaleF = [
        { value: 91, label: 'Trop chaud', color: '#f44336' },
        { value: 79, label: 'Chaud', color: '#ff9800' },
        { value: 64, label: 'Normal', color: '#4CAF50' },
        { value: 50, label: 'Frais', color: '#00bcd4' },
        { value: 32, label: 'Froid', color: '#3f51b5' }
    ];

    // Humidity scale values
    const humidityScale = [
        { value: 100, label: 'Très humide', color: '#2196f3', class: 'humid-very' },
        { value: 70, label: 'Humide', color: '#4caf50', class: 'humid-high' },
        { value: 40, label: 'Normal', color: '#ffeb3b', class: 'humid-normal' },
        { value: 20, label: 'Sec', color: '#ff9800', class: 'humid-low' },
        { value: 0, label: 'Très sec', color: '#f44336', class: 'humid-verylow' }
    ];

    function updateThermometer(temp, unit) {
        let min = 0, max = 40;
        let scale = scaleC;
        if (!isCelsius) {
            min = 32; max = 104;
            scale = scaleF;
        }
        // Update scale labels
        scaleLabels.forEach((el, i) => {
            el.innerHTML = `${scale[i].value}${unit}<br><small>${scale[i].label}</small>`;
            el.style.color = scale[i].color;
        });
        // Fill height: map temp to 0-100%
        let fill = Math.max(min, Math.min(temp, max));
        let percent = ((fill - min) / (max - min)) * 100;
        if (thermometerFill) thermometerFill.style.height = percent + '%';
    }

    function updateHumidity(humidity) {
        // Clamp humidity between 0 and 100
        let percent = Math.max(0, Math.min(humidity, 100));
        if (humidityFill) humidityFill.style.height = percent + '%';
        // Update scale labels
        humidityScaleLabels.forEach((el, i) => {
            el.innerHTML = `${humidityScale[i].value}%<br><small>${humidityScale[i].label}</small>`;
            el.className = `humidity-scale-label ${humidityScale[i].class}`;
        });
    }

    if (tempValueEl && thermometerFill) {
        updateThermometer(tempC, '°C');
    }

    if (humidityValueEl && humidityFill) {
        updateHumidity(parseFloat(humidityValueEl.textContent));
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            if (!tempValueEl || !tempUnitEl) return;
            if (isCelsius) {
                // Convert to Fahrenheit
                let tempF = Math.round((tempC * 9/5 + 32) * 10) / 10;
                tempValueEl.textContent = tempF;
                tempUnitEl.textContent = '°F';
                isCelsius = false;
                updateThermometer(tempF, '°F');
            } else {
                // Convert to Celsius
                tempValueEl.textContent = tempC;
                tempUnitEl.textContent = '°C';
                isCelsius = true;
                updateThermometer(tempC, '°C');
            }
        });
    }

    // Cloud animation (existing code)
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        cloud.style.animationDelay = `${index * 5}s`;
    });
});