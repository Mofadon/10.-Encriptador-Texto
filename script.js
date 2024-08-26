// Variables globales para los elementos del DOM
const textarea = document.getElementById('valorUsuario');
const btnEncriptar = document.querySelector('.btn1');
const btnDesencriptar = document.querySelector('.btn2');
const btnCopiar = document.querySelector('.btncopy');
const btnLimpiar = document.querySelector('.btnclean');
const mensajeError = document.querySelector('.info');
const msjCopy = document.querySelector('.mjscopy');
const check = document.querySelector('.check');
const copyespace = document.querySelector('.copyespace');
const infoMensaje = document.querySelector('.infomensaje');

// Reglas de encriptación
const reglasEncriptacion = [
    { letra: 'e', reemplazo: 'enter' },
    { letra: 'i', reemplazo: 'imes' },
    { letra: 'a', reemplazo: 'ai' },
    { letra: 'o', reemplazo: 'ober' },
    { letra: 'u', reemplazo: 'ufat' }
];

// Función para mostrar mensaje de error con alert
function mostrarError(mensaje) {
    alert(mensaje);
}

// Función para encriptar texto
function encriptarTexto(texto) {
    return reglasEncriptacion.reduce((textoEncriptado, regla) => {
        return textoEncriptado.replace(new RegExp(regla.letra, 'g'), regla.reemplazo);
    }, texto);
}

// Función para desencriptar texto
function validarTexto(texto) {
    const tieneMayusculas = /[A-Z]/.test(texto);
    const tieneAcentos = /[áéíóúü]/.test(texto);
    const tieneCaracteresEspeciales = /[^a-z\s]/.test(texto); // Expresión regular para caracteres especiales

    if (tieneMayusculas || tieneAcentos || tieneCaracteresEspeciales) {
        mostrarError("El texto contiene mayúsculas, acentos o caracteres especiales, por favor ajuste su mensaje e inténtelo nuevamente");
        return false;
    }
    return true;
}
// Función para validar el texto ingresado
function validarTexto(texto) {
    const tieneMayusculas = /[A-Z]/.test(texto);
    const tieneAcentos = /[áéíóúü]/.test(texto);
    const tieneCaracteresEspeciales = /[^a-z\s]/.test(texto); // Expresión regular para caracteres especiales

    if (tieneMayusculas || tieneAcentos || tieneCaracteresEspeciales) {
        mostrarError("El texto contiene mayúsculas, acentos o caracteres especiales, por favor ajuste su mensaje e inténtelo nuevamente");
        return false;
    }
    return true;
}

// Función para encriptar o desencriptar texto
function procesarTexto(encriptar) {
    const texto = textarea.value.trim();
    if (!texto) {
        mostrarError("No se ha ingresado ningún texto, intente nuevamente");
        return;
    }

    if (!validarTexto(texto)) return;

    const resultado = encriptar ? encriptarTexto(texto) : desencriptarTexto(texto);
    document.querySelector('.ingtxt1').textContent = resultado;
    copyespace.style.display = 'flex'; // Asegúrate de que este estilo esté definido en tu CSS
}

// Función para copiar texto al portapapeles
function copiarTexto() {
    const texto = document.querySelector('.ingtxt1').textContent.trim();
    if (texto) {
        navigator.clipboard.writeText(texto).then(() => {
            msjCopy.style.display = 'block';
            check.style.display = 'block';
        }).catch(() => {
            mostrarError("No se pudo copiar el texto. Inténtelo de nuevo.");
        });
    } else {
        mostrarError("Debe ingresar el texto que desea ajustar en el panel izquierdo e intentar nuevamente");
    }
}

// Función para limpiar todo
function limpiarTodo() {
    // Restablece el contenido de los campos de texto
    textarea.value = '';
    document.querySelector('.ingtxt1').textContent = 'Ingrese su texto en el recuadro izquierdo para encriptar o desencriptar';
    
    // Oculta los mensajes de confirmación
    msjCopy.style.display = 'none';
    check.style.display = 'none';

    // Deshabilita temporalmente el botón de limpiar y cambia su estilo
    btnLimpiar.disabled = true;
    btnLimpiar.textContent = 'Restaurando...';

    // Usa setTimeout para reactivar el botón después de 3 segundos
    setTimeout(function() {
        btnLimpiar.disabled = false;
        btnLimpiar.textContent = 'Limpiar';
    }, 3000); // 3000 milisegundos = 3 segundos
}

// Asignar eventos a los botones
btnEncriptar.addEventListener('click', () => procesarTexto(true));
btnDesencriptar.addEventListener('click', () => procesarTexto(false));
btnCopiar.addEventListener('click', copiarTexto);
btnLimpiar.addEventListener('click', limpiarTodo);
