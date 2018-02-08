mastermind = (function() {
    
    let lineaObjetivo;
    let copiaLineaObjetivo;
    let blancos;
    let negros;
    
    let colores  = ['rojo','blanco', 'negro', 'amarillo', 'naranja', 'marron', 'azul', 'verde'];
    
    function generarLineaObjetivo() {
        return colores[Math.floor(Math.random() * colores.length)];
    }
    
    function init() {
        lineaObjetivo = [];
        for (let i = 0; i < 4; i++) {
            lineaObjetivo.push(generarLineaObjetivo());            
        }
    }
    
    function comprobarCoincidencia(intento) {
        console.log(intento);
        copiaLineaObjetivo = lineaObjetivo.slice();
        blancos = 0;
        negros = 0;
        
        if (Array.isArray(intento)) {
            intento.forEach(function (element, index) {
                if (copiaLineaObjetivo[index] == element) {
                    copiaLineaObjetivo[index] = 0;
                    intento[index] = 1;
                    negros++;
                    
                }
            });
            
            intento.forEach(function (element, index) {
                let indiceLineaObjetivo = copiaLineaObjetivo.indexOf(element);
                if (indiceLineaObjetivo != -1) {
                    copiaLineaObjetivo[indiceLineaObjetivo] = 0;
                    blancos++;
                }
            });
              
            console.log("Negros:" + negros);
            console.log("Blancos:" + blancos);

        }
        return {
            
            copiaLineaObjetivo: copiaLineaObjetivo,
            blancos: blancos,
            negros: negros
        }
    }

    function mostrar() {
        console.log(lineaObjetivo);
    }
    
    return {
        init:init,
        mostrar: mostrar,
        comprobarCoincidencia: comprobarCoincidencia
    }
    
})();