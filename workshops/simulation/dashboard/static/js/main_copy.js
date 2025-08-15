// Initialize gauges with animation
document.addEventListener('DOMContentLoaded', function () {
    // Define min and max for each pollutant (must match your Python SEUILS)
    const gaugeRanges = {
        co2: { min: 0, max: 5000 },
        co: { min: 0, max: 100 },
        pm25: { min: 0, max: 150 },
        o3: { min: 0, max: 0.5 },
        no2: { min: 0, max: 1 },
        tvoc: { min: 0, max: 5000 }
        // Add others as needed
    };

    // Function to calculate needle angle
    function getAngle(value, min, max) {
        value = Math.max(min, Math.min(value, max));
        return -90 + ((value - min) / (max - min)) * 180;
    }

    // Set needle position for all gauges based on toxicity level
    document.querySelectorAll('.gauge').forEach(gauge => {
        const id = gauge.getAttribute('data-gauge-id');
        const value = parseFloat(gauge.getAttribute('data-gauge-value'));
        // Use correct min/max for each pollutant
        const range = gaugeRanges[id] || { min: 0, max: 100 };
        // Clamp value between min and max
        const clampedValue = Math.max(range.min, Math.min(value, range.max));
        // Map value to angle: -90deg (min) to +90deg (max)
        const angle = -90 + ((clampedValue - range.min) / (range.max - range.min)) * 180;
        const needleId = `${id}-needle`;
        const needle = document.getElementById(needleId);
        console.log(`Gauge: ${id}, Value: ${value}, Angle: ${angle}, NeedleId: ${needleId}, NeedleFound: ${!!needle}`);
        if (needle) {
            needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
        }
    });

    // Add cloud animation
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        cloud.style.animationDelay = `${index * 5}s`;
    });
});

