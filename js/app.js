// Modal Functions
function openModal() {
    document.getElementById('activityModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('activityModal').style.display = 'none';
}

function saveActivity() {
    alert('Actividad guardada exitosamente!');
    closeModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('activityModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Sidebar Navigation
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Here you would typically load the corresponding page content
        const section = this.getAttribute('href').substring(1);
        console.log(`Loading section: ${section}`);
    });
});

// Simulate real-time updates
function updateWeather() {
    const temps = [22, 23, 24, 25, 26];
    const temp = temps[Math.floor(Math.random() * temps.length)];
    document.querySelector('.weather-temp').textContent = `${temp}°C`;
}

// Update weather every 30 seconds
setInterval(updateWeather, 30000);

// Initialize charts (placeholder)
function initCharts() {
    console.log('Initializing charts...');
    // Here you would integrate Chart.js or another charting library
}

// Load data on page load
window.addEventListener('DOMContentLoaded', function() {
    initCharts();
    initializeFieldMap();
    startIoTSimulation();
    initializeAlertSystem();
    console.log('AgroManager Pro loaded successfully!');
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N for new activity
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// IoT Sensors Simulation
function startIoTSimulation() {
    setInterval(() => {
        // Update temperature
        const temp = (23 + Math.random() * 4).toFixed(1);
        document.querySelector('.sensor-card:nth-child(1) .sensor-value').textContent = `${temp}°C`;
        
        // Update soil moisture
        const moisture = (38 + Math.random() * 10).toFixed(0);
        document.querySelector('.sensor-card:nth-child(2) .sensor-value').textContent = `${moisture}%`;
        
        // Update solar radiation
        const radiation = (800 + Math.random() * 100).toFixed(0);
        document.querySelector('.sensor-card:nth-child(3) .sensor-value').textContent = `${radiation} W/m²`;
        
        // Check for alerts
        if (moisture < 40) {
            showAlert('warning', 'Humedad del Suelo Baja', `La humedad del suelo está en ${moisture}%. Considere activar el riego.`);
        }
    }, 5000); // Update every 5 seconds
}

// Field Map Visualization
function initializeFieldMap() {
    const canvas = document.getElementById('fieldMap');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw a simple field representation
    drawFieldMap(ctx, 'satellite');
}

function drawFieldMap(ctx, viewType) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Different visualizations based on view type
    switch(viewType) {
        case 'satellite':
            // Simulate satellite view
            ctx.fillStyle = '#4a7c59';
            ctx.fillRect(0, 0, width, height);
            
            // Add field divisions
            ctx.strokeStyle = '#8fbc8f';
            ctx.lineWidth = 2;
            for (let i = 1; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(width * i / 4, 0);
                ctx.lineTo(width * i / 4, height);
                ctx.stroke();
            }
            break;
            
        case 'ndvi':
            // NDVI visualization
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, '#8B0000');
            gradient.addColorStop(0.25, '#FF0000');
            gradient.addColorStop(0.5, '#FFFF00');
            gradient.addColorStop(0.75, '#90EE90');
            gradient.addColorStop(1, '#006400');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // Add some variation
            ctx.fillStyle = 'rgba(0, 100, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(width * 0.7, height * 0.3, 50, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case 'moisture':
            // Moisture visualization
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, width, height);
            
            // Add moisture variations
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = `rgba(0, 0, 255, ${Math.random() * 0.5})`;
                ctx.beginPath();
                ctx.arc(
                    Math.random() * width,
                    Math.random() * height,
                    Math.random() * 50 + 20,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
            break;
            
        case 'stress':
            // Water stress visualization
            ctx.fillStyle = '#FFE4B5';
            ctx.fillRect(0, 0, width, height);
            
            // Add stress areas
            ctx.fillStyle = 'rgba(255, 140, 0, 0.5)';
            ctx.fillRect(width * 0.6, height * 0.2, width * 0.3, height * 0.3);
            break;
    }
    
    // Add field boundary
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, width, height);
}

function changeMapView(viewType) {
    // Update button states
    document.querySelectorAll('.map-control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Redraw map
    const canvas = document.getElementById('fieldMap');
    const ctx = canvas.getContext('2d');
    drawFieldMap(ctx, viewType);
    
    // Show relevant alert
    if (viewType === 'stress') {
        showAlert('warning', 'Estrés Hídrico Detectado', 'Se ha detectado estrés hídrico en el sector este del Campo Norte.');
    }
}

// Alert System
let alertCount = 0;

function initializeAlertSystem() {
    // Simulate some initial alerts
    setTimeout(() => {
        showAlert('info', 'Sistema IoT Conectado', 'Todos los sensores están funcionando correctamente.');
    }, 2000);
    
    setTimeout(() => {
        showAlert('success', 'Análisis Completado', 'El análisis predictivo de rendimiento ha sido actualizado.');
    }, 5000);
    
    // Periodic pest risk alert
    setInterval(() => {
        const risk = Math.random();
        if (risk > 0.7) {
            showAlert('danger', 'Alerta de Plagas', 'Condiciones favorables para desarrollo de plagas detectadas.');
        }
    }, 30000);
}

function showAlert(type, title, message) {
    const alertSystem = document.getElementById('alertSystem');
    const alertId = `alert-${alertCount++}`;
    
    const alertHTML = `
        <div class="alert-item ${type}" id="${alertId}">
            <button class="alert-close" onclick="closeAlert('${alertId}')">&times;</button>
            <strong>${title}</strong>
            <p>${message}</p>
            <small>${new Date().toLocaleTimeString()}</small>
        </div>
    `;
    
    alertSystem.insertAdjacentHTML('afterbegin', alertHTML);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        closeAlert(alertId);
    }, 10000);
    
    // Limit to 5 alerts
    const alerts = alertSystem.querySelectorAll('.alert-item');
    if (alerts.length > 5) {
        alerts[alerts.length - 1].remove();
    }
}

function closeAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }
}

// AI Predictions Update
function updatePredictions() {
    // Simulate AI prediction updates
    const confidences = document.querySelectorAll('.confidence-fill');
    confidences.forEach(bar => {
        const newConfidence = 70 + Math.random() * 25;
        bar.style.width = `${newConfidence}%`;
        bar.parentElement.nextElementSibling.textContent = `${newConfidence.toFixed(0)}%`;
    });
}

// Update predictions every 30 seconds
setInterval(updatePredictions, 30000);