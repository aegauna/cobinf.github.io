const BOT_TOKEN = '7168745582:AAEyrL4aapupB2gvh2LW4GbxklDHIJGqlgM'; // Reemplaza con tu token real
const CHAT_ID = '-1002149110292'; // Reemplaza con el ID de chat correcto
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
// Función para obtener la cotización de Belo
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
// Función para obtener la cotización de Binance P2P
async function obtenerCotizacionBncp2p() {
    try {
        const url = "https://criptoya.com/api/binancep2p/usdt/ars/0.1";
        const response = await fetch(url);
        const data = await response.json();
        const cotizacionBncp2p = parseFloat(data.totalBid);
            return cotizacionBncp2p.toFixed(2); // Redondear a dos decimales
    } catch (error) {
        console.error('Error al obtener datos de Bncp2p:', error);
        return 'Error al obtener datos de Bncp2p';
    }
}
// Función para obtener la cotización de Plus Crypto
async function obtenerCotizacionPlus() {
    try {
        const url = " https://criptoya.com/api/pluscrypto/usdt/ars/0.1";
        const response = await fetch(url);
        const data = await response.json();
        const cotizacionPlus = parseFloat(data.totalBid);
            return cotizacionPlus.toFixed(2); // Redondear a dos decimales
    } catch (error) {
        console.error('Error al obtener datos de Plus Crypto:', error);
        return 'Error al obtener datos de Plus Crypto';
    }
}
// Actualizar cada 3 segundos
setInterval(async () => {
    const cotizacionBinance = await obtenerCotizacionBinance();
    const cotizacionFiwind = await obtenerCotizacionFiwind();
    const cotizacionBelo = await obtenerCotizacionBelo();
    const cotizacionBncp2p = await obtenerCotizacionBncp2p();
    const cotizacionPlus = await obtenerCotizacionPlus();
    if (cotizacionBinance && cotizacionFiwind) {
        const diferenciaPorcentual = ((cotizacionFiwind - cotizacionBinance) / cotizacionBinance) * 100;
        console.log(`Binance: ${cotizacionBinance}`);
        console.log(`Fiwind: ${cotizacionFiwind}`);
        console.log(`${diferenciaPorcentual.toFixed(2)}%`);
        const diferenciaElemento = document.getElementById("diferenciaPorcentual");
        diferenciaElemento.textContent = `${diferenciaPorcentual.toFixed(2)}%`;
        if (diferenciaPorcentual >= 0.30) {
            const ahora = Date.now();
            if (ahora - ultimoMensaje >= 20 * 60 * 1000) { // 20 minutos en milisegundos
                sendMessage("VENTA EN FIWIND")
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
        diferenciaElemento2.textContent = `${diferenciaPorcentual2.toFixed(2)}%`;
        if (diferenciaPorcentual2 >= 0.30) {
            const ahora = Date.now();
            if (ahora - ultimoMensaje >= 20 * 60 * 1000) { // 20 minutos en milisegundos
                sendMessage("VENTA EN BELO")
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
    if (cotizacionBinance && cotizacionBncp2p) {
        const diferenciaPorcentual3 = ((cotizacionBncp2p - cotizacionBinance) / cotizacionBinance) * 100;
        console.log(`Binance: ${cotizacionBinance}`);
        console.log(`BNC P2P: ${cotizacionBncp2p}`);
        console.log(`${diferenciaPorcentual3.toFixed(2)}%`);
        const diferenciaElemento3 = document.getElementById("diferenciaPorcentual3");
        diferenciaElemento3.textContent = `${diferenciaPorcentual3.toFixed(2)}%`;
        if (diferenciaPorcentual3 >= 0.30) {
            const ahora = Date.now();
            if (ahora - ultimoMensaje >= 20 * 60 * 1000) { // 20 minutos en milisegundos
                sendMessage("VENTA EN BNC P2P")
                    .catch(error => console.error('Error al enviar el mensaje:', error));
                ultimoMensaje = ahora;
            }
        }
        if (diferenciaPorcentual3 > 0) {
            diferenciaElemento3.style.color = "limegreen";
        } else if (diferenciaPorcentual3 < 0) {
            diferenciaElemento3.style.color = "red";
        }
    }
    if (cotizacionBinance && cotizacionPlus) {
        const diferenciaPorcentual4 = ((cotizacionPlus - cotizacionBinance) / cotizacionBinance) * 100;
        console.log(`Binance: ${cotizacionBinance}`);
        console.log(` Plus : ${cotizacionPlus}`);
        console.log(`${diferenciaPorcentual4.toFixed(2)}%`);
        const diferenciaElemento4 = document.getElementById("diferenciaPorcentual4");
        diferenciaElemento4.textContent = `${diferenciaPorcentual4.toFixed(2)}%`;
        if (diferenciaPorcentual4 >= 0.45) {
            const ahora = Date.now();
            if (ahora - ultimoMensaje >= 20 * 60 * 1000) { // 20 minutos en milisegundos
                sendMessage("VENTA EN PLUS CRYPTO")
                    .catch(error => console.error('Error al enviar el mensaje:', error));
                ultimoMensaje = ahora;
            }
        }
        if (diferenciaPorcentual4 > 0) {
            diferenciaElemento4.style.color = "limegreen";
        } else if (diferenciaPorcentual4 < 0) {
            diferenciaElemento4.style.color = "red";
        }
    }
}, 3000);
// Funcion de envio de mensaje para Fiwind
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
    obtenerCotizacionBncp2p,
    obtenerCotizacionPlus,
};