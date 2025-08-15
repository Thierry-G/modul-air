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
    
    // Cloud animation (existing code)
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        cloud.style.animationDelay = `${index * 5}s`;
    });
});