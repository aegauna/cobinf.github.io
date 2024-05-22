const BOT_TOKEN = '6787604723:AAElFCqbTklqzqTQol5FrO3r8hp0YhuVujw'; // Reemplaza con tu token real
const CHAT_ID = '-4133606713'; // Reemplaza con el ID de chat correcto
let ultimoMensaje = 0;
// Función para obtener la cotización de Binance
async function obtenerCotizacionBinance() {
    try {
        const url = "https://api.binance.com/api/v3/ticker/price?symbol=USDTARS";
        const response = await fetch(url);
        const data = await response.json();
        const cotizacionBinance = parseFloat(data.price);
        return cotizacionBinance.toFixed(2); // Redondear a dos decimales
    } catch (error) {
        console.error('Error al obtener datos de Binance:', error);
        return 'Error al obtener datos de Binance';
    }
}
// Función para obtener la cotización de Fiwind
async function obtenerCotizacionFiwind() {
    try {
        const url = "https://criptoya.com/api/fiwind/usdt/ars/0.1";
        const response = await fetch(url);
        const data = await response.json();
        const cotizacionFiwind = parseFloat(data.totalBid);
        return cotizacionFiwind.toFixed(2); // Redondear a dos decimales
    } catch (error) {
        console.error('Error al obtener datos de Fiwind:', error);
        return 'Error al obtener datos de Fiwind';
    }
}
// Función para obtener la cotización de Fiwind
async function obtenerCotizacionBelo() {
    try {
        const url = "https://criptoya.com/api/belo/usdt/ars/0.1";
        const response = await fetch(url);
        const data = await response.json();
        const cotizacionBelo = parseFloat(data.totalBid);
        return cotizacionBelo.toFixed(2); // Redondear a dos decimales
    } catch (error) {
        console.error('Error al obtener datos de Belo:', error);
        return 'Error al obtener datos de Belo';
    }
}
// Actualizar cada 3 segundos
setInterval(async () => {
    const cotizacionBinance = await obtenerCotizacionBinance();
    const cotizacionFiwind = await obtenerCotizacionFiwind();
    const cotizacionBelo = await obtenerCotizacionBelo();
    if (cotizacionBinance && cotizacionFiwind) {
        const diferenciaPorcentual = ((cotizacionFiwind - cotizacionBinance) / cotizacionBinance) * 100;
        console.log(`Binance: ${cotizacionBinance}`);
        console.log(`Fiwind: ${cotizacionFiwind}`);
        console.log(`${diferenciaPorcentual.toFixed(2)}%`);
        const diferenciaElemento = document.getElementById("diferenciaPorcentual");
        if (diferenciaPorcentual >= 0.30) {
            const ahora = Date.now();
            if (ahora - ultimoMensaje >= 10 * 60 * 1000) { // 15 minutos en milisegundos
                sendMessage("¡DIFERENCIA OPTIMA!")
                    .catch(error => console.error('Error al enviar el mensaje:', error));
                ultimoMensaje = ahora;
            }
        }
        if (diferenciaPorcentual > 0) {
            diferenciaElemento.style.color = "limegreen";
        } else if (diferenciaPorcentual < 0) {
            diferenciaElemento.style.color = "red";
        }
    }
    if (cotizacionBinance && cotizacionBelo) {
        const diferenciaPorcentual2 = ((cotizacionBelo - cotizacionBinance) / cotizacionBinance) * 100;
        console.log(`Binance: ${cotizacionBinance}`);
        console.log(`Belo: ${cotizacionBelo}`);
        console.log(`${diferenciaPorcentual2.toFixed(2)}%`);
        const diferenciaElemento2 = document.getElementById("diferenciaPorcentual2");
        if (diferenciaPorcentual >= 0.30) {
            const ahora = Date.now();
            if (ahora - ultimoMensaje >= 10 * 60 * 1000) { // 15 minutos en milisegundos
                sendMessage("¡DIFERENCIA OPTIMA!")
                    .catch(error => console.error('Error al enviar el mensaje:', error));
                ultimoMensaje = ahora;
            }
        }
        if (diferenciaPorcentual2 > 0) {
            diferenciaElemento2.style.color = "limegreen";
        } else if (diferenciaPorcentual2 < 0) {
            diferenciaElemento2.style.color = "red";
        }
    }
}, 3000);
// Ejemplo usando fetch (recomendado)
async function sendMessage(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const obj = {
        chat_id: CHAT_ID,
        text: text
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}
// Exportar las funciones para usarlas en otros archivos
module.exports = {
    obtenerCotizacionBinance,
    obtenerCotizacionFiwind,
    obtenerCotizacionBelo,
};