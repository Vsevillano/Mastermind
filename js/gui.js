{
    let $coloresAElegir,
    arrayColoresSeleccionados,
    colorPulsado,
    $containerIntentos,
    colorElegidoIntento,
    $btnCheck,
    arrayIntentoAComprobar,
    $containerLeft,
    containerUltimoIntento,
    backgroundMenu,
    tituloResultadoMenuPartidaMasterMind,
    numeroIntentosResultadoMenuPartidaMasterMind;
    
    
    let getUltimoIntento = function () {
        for (let i = $containerIntentos.children().length; i > 0; i--) {
            if ($containerIntentos.children()[i - 1].nodeName != '#text') {
                return $containerIntentos.children()[i - 1];
            }
        }
        
    };
    
    let insertarColorUltimoIntento = function () {
        let classCirculo;
        for (let i = 0; i < $('.circleIntentoColor').length; i++) {
            classCirculo = $('.circleIntentoColor')[i].classList[$('.circleIntentoColor')[i].classList.length - 1]; //Get ultima clase del elemento
            if (classCirculo != 'colorRelleno') {
                $('.circleIntentoColor')[i].style.backgroundColor = colorPulsado;
                $('.circleIntentoColor')[i].classList.add('colorRelleno');
                break;
            }
        }
    };
    
    let getColor = function (rgb) {
        switch (rgb) {
            case 'rgb(255, 34, 34)':
            return 'rojo';
            case 'rgb(255, 255, 255)':
            return 'blanco';
            case 'rgb(0, 0, 0)':
            return 'negro';
            case 'rgb(255, 251, 34)':
            return 'amarillo';
            case 'rgb(255, 115, 34)':
            return 'naranja';
            case 'rgb(185, 97, 24)':
            return 'marron';
            case 'rgb(34, 156, 255)':
            return 'azul';
            case 'rgb(34, 255, 89)':
            return 'verde';
            
        }
    };
    
    let insertColorEstadoUltimoIntento = function (color, posicion) {
        let classCirculo = $('.circleEstadoColor', containerUltimoIntento)[posicion];
        $(classCirculo).css('background', color);
    };
    
    let dibujarNegros = function (numeroColorEnSuSitio, posicion) {
        for (let i = 0; i < numeroColorEnSuSitio; i++) {
            insertColorEstadoUltimoIntento('#000', posicion++);
        }
        return posicion;
        
    };
    
    let dibujarBlancos = function (numeroColorEsta, posicion) {
        for (let i = 0; i < numeroColorEsta; i++) {
            insertColorEstadoUltimoIntento('#FFF', posicion++);
        }
    };
    
    let getNumeroColoresInsertados = function () {
        return $('.colorRelleno', containerUltimoIntento).length;
    };
    
    /**
    * Nuevo intento
    */
    let nuevoIntento = function () {
        $containerIntentos.append('<div class="containerIntentoColores">' +
        '<div class="circleIntentoColor"></div>' +
        '<div class="circleIntentoColor"></div>' +
        '<div class="circleIntentoColor"></div>' +
        '<div class="circleIntentoColor"></div>' +
        '' +
        '<div class="circleEstadoColor"></div>' +
        '<div class="circleEstadoColor"></div>' +
        '<div class="circleEstadoColor"></div>' +
        '<div class="circleEstadoColor"></div>' +
        '</div>');
    };
    
    /**
    * Comprobar intento
    */
    let clickCheckIntento = function () {
        if (getNumeroColoresInsertados() == 4) {
            arrayIntentoAComprobar = [];
            
            let coloresIntentoAComprobar = $('.circleIntentoColor', containerUltimoIntento);
            coloresIntentoAComprobar.each(function (index, element) {
                arrayIntentoAComprobar.push(getColor($(element).css('background-color')));
            });
            
            let resultadoMasterMind = mastermind.comprobarCoincidencia(arrayIntentoAComprobar);
            let posicion = 0;
            posicion = dibujarNegros(resultadoMasterMind.negros, posicion);
            
            dibujarBlancos(resultadoMasterMind.blancos, posicion);
            
            if (resultadoMasterMind.negros != 4) {
                nuevoIntento();
                containerUltimoIntento = getUltimoIntento();
                iniciarCalbackSeleccionColorIntento();
            }
            else if(resultadoMasterMind.negros == 4){
                $( function() {
                    $( "#dialog-confirm" ).dialog({
                    
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "¿Otra partida?": function() {
                                location.reload();
                            },
                            Cancel: function() {
                                $( this ).dialog( "close" );
                            }
                        }
                    });
                } );
            }
            
        }
        
    };
    
    let clickBotonElegir = function () {
        colorPulsado = getComputedStyle(this, null).getPropertyValue("background-color");
        insertarColorUltimoIntento();
    };    
    
    
    let clickColorElegidoIntento = function () {
        if (this.classList[this.classList.length - 1] == 'colorRelleno') {
            this.classList.remove('colorRelleno');
        }
        this.style.backgroundColor = '#d6d6d6fa';
    }
    
    
    let iniciarCalbackColoresElegir = function () {
        $coloresAElegir.on("click", clickBotonElegir);
    }
    
    
    let iniciarCalbackSeleccionColorIntento = function () {
        $('.circleIntentoColor').on('click', clickColorElegidoIntento);
        
    };
    
    let iniciarCalbackBtnCheck = function () {
        $btnCheck.on('click', clickCheckIntento);
    };
    
    /**
    * Empezar nueva partida
    */
    let init = function () {
        
        mastermind.init();
        mastermind.mostrar();
        
        $coloresAElegir = $('.colorEleccion');
        $containerIntentos = $('#containerIntento');
        arrayColoresSeleccionados = [];
        $containerLeft = $('#containerLeft');
        $btnCheck = $('#btn-checkColores');
        
        containerUltimoIntento = getUltimoIntento();
        iniciarCalbackColoresElegir();
        iniciarCalbackSeleccionColorIntento();
        iniciarCalbackBtnCheck();
    };
    
    
    window.onload = function () {
        init();
    };
}