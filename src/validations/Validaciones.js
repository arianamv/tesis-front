
const validarCorreo = (mail) =>{
    if (mail === undefined ) return false
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(mail)){
        return true;
    } else {
        return false;
    }
}

const validarRUC = (valorRuc) => {
    function rucValido(ruc) {
        //11 dígitos y empieza en 10,15,16,17 o 20
        if (!(ruc >= 1e10 && ruc < 11e9
           || ruc >= 15e9 && ruc < 18e9
           || ruc >= 2e10 && ruc < 21e9))
            return false;
        
        for (var suma = -(ruc%10<2), i = 0; i<11; i++, ruc = ruc/10|0)
            suma += (ruc % 10) * (i % 7 + (i/7|0) + 1);
        return suma % 11 === 0;
        
    }

    if (valorRuc === undefined) return false

    var ruc = valorRuc.replace(/[-.,[\]()\s]+/g,"")

    //Es entero?    
    if ((ruc = Number(ruc)) && ruc % 1 === 0 && rucValido(ruc)) { // ⬅️ Acá se comprueba
        return true
    } else {
        return false
    }
}

const validarNombre = (nombre) => {
    if (nombre === undefined ) return false
    var validNombre = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    if(validNombre.test(nombre)){
        return true;
    } else {
        return false;
    }
}

const validarDni = (dni) => {
    if (dni === undefined ) return false
    let onlyNumbersDNI = dni.toString().replace(/\D/g, '');
    let ex_regular_dni = /^\d{7,8}(?:[-\s]\d{4})?$/;
    if(ex_regular_dni.test(onlyNumbersDNI) == true && !(/[a-zA-Z]/g.test(dni)) && onlyNumbersDNI === dni.replace(/(\d)[\s.]+(?=\d)/g, '$1')){
            return true;
    }else{
            return false;
    } 
}

const validarNombreNew = (nombre) => {
    if (nombre === undefined ) return false
    var validNombre = /^(?:[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ']{2,}\s?)*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ']{2,}$/;
    //var validNombre = /^(?:[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ']{2,}\.?\s?)*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ']{2,}\.?$/;
    if(validNombre.test(nombre)){
        return true;
    } else {
        return false;
    }
}

const validarTelefono = (telefono) => {
    if (telefono === undefined ) return false
    var validTelefono = /^\d{9}$/;
    if(validTelefono.test(telefono)){
        return true;
    } else {
        return false;
    }
}

const validarDNINew = (dni) => {
    if (dni === undefined ) return false
    var validDNI = /^\d{8}$/;
    if(validDNI.test(dni)){
        return true;
    } else {
        return false;
    }
}

const validarComentarios = (comentario) => {
    if (comentario === undefined ) return false
    var validComentario = /^[a-zA-Z0-9\s.,!?áéíóúÁÉÍÓÚñÑ'-]{2,300}$/;
    if(validComentario.test(comentario)){
        return true;
    } else {
        return false;
    }
}

const validarNombreEmpresa = (comentario) => {
    if (comentario === undefined ) return false
    var validComentario = /^[a-zA-Z0-9\s.,!?áéíóúÁÉÍÓÚñÑ'-]{1,300}$/;
    if(validComentario.test(comentario)){
        return true;
    } else {
        return false;
    }
}

const validarLinkZoom = (zoom) => {
    if (zoom === undefined ) return false
    //var validZoom = /^https?:\/\/(?:www\.)?(?:\w+\.)?(?:zoom\.us|zoomgov\.com|zoommexico\.com|zoom\.gov\.br)\/(?:j\/)?\d+(?:\?pwd=[\w-]+)?$/;
    //var validZoom = /^(https:\/\/)(?:www\.)?(?:\w+\.)?zoom\.us\/(?:j\/)?[0-9]{9}(?:\?pwd=[A-Za-z0-9]+)?(?:&(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+))*$/;
    //var validZoom = /^(https:\/\/)(?:www\.)?(?:\w+\.)?zoom\.us\/(?:j\/)?\d+(?:\?pwd=[A-Za-z0-9]+)?(?:&(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+))*$/;
    //var validZoom = /^(https:\/\/)(?:www\.)?(?:\w+\.)?zoom\.us\/(?:j\/)?\d+(?:\?(?:pwd=[A-Za-z0-9]+)?(?:&(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+))*)?$/;
    //var validZoom = /^(https:\/\/)(?:www\.)?(?:\w+\.)?zoom\.us\/(?:j\/)?\d+(?:\?((?:pwd=[A-Za-z0-9]+)?(?:&(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+))*))?/;
    //var validZoom = /^(https:\/\/)(?:www\.)?(?:\w+\.)?zoom\.us\/(?:j\/)?\d+(?:\?(?:(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+)(?:&(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+))*)?)?$/;
    var validZoom = /^(https:\/\/)(?:www\.)?(?:\w+\.)?zoom\.us\/(?:j\/)?\d+(?:\?(?:(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+)(?:&(?:[A-Za-z0-9_]+=[A-Za-z0-9%]+))*)?)?(?:#(?:[A-Za-z0-9]+))?$/;
    if(validZoom.test(zoom)){
        return true;
    } else {
        return false;
    }
}

const validarTiempoMeses = (tiempo) => {
    if (tiempo === undefined ) return false
    var validMeses = /^[1-9]\d*$/;
    if(validMeses.test(tiempo)){
        return true;
    } else {
        return false;
    }
}

const validarCantidadesDecimales = (decimal) => {
    if (decimal === undefined ) return false
    var validDecimal = /^[1-9]\d*(\.\d+)?$/;
    if(validDecimal.test(decimal)){
        return true;
    } else {
        return false;
    }
}

const validarModelos = (modelo) => {
    if (modelo === undefined ) return false
    var validModelo = /^[A-Za-z0-9\.\-_ ]+$/;
    if(validModelo.test(modelo)){
        return true;
    } else {
        return false;
    }
}

export  const validar = { validarCorreo, validarRUC, validarNombre, validarDni, validarNombreNew, validarTelefono, validarNombreEmpresa, validarComentarios, validarLinkZoom, validarTiempoMeses, validarCantidadesDecimales, validarModelos, validarDNINew }