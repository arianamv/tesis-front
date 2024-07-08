import HttpClient from "./http-common.js";

export const listarFundos = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("fundo/listarFundo")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("fundo/insertarFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("fundo/modificarFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("fundo/eliminarFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarLoteXFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("lote/listarLoteXFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarLote = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("lote/insertarLote", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarLote = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("lote/modificarLote", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarLote = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("lote/eliminarLote", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarLoteXCampaña = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("lote/listarLoteXCampania", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};


export const listarCoordenadaXLote = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("coordenada/listarCoordenadaXLote", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const getFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("fundo/getFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarCampanias = () => {
    return new Promise((resolve, reject) => {
        HttpClient.get("campania/listarCampania")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarLotesXCampañaXFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("lote/listarLotesXCampaniaXFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const getCampañaXLote = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/getCampaniaXLote", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarUsuarios = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("usuario/listarUsuario", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarUsuario = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("usuario/insertarUsuario", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const login = (data) => {
    let payLoad = JSON.stringify({
        "correo": data.get('email'),
        "contrasenia": data.get('password')
    })
    return new Promise((resolve, reject) => {
        HttpClient.post("usuario/login", payLoad)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarUsuario = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("usuario/modificarUsuario", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarUsuario = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("usuario/eliminarUsuario", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarCampañaXCultivo = () => {
    return new Promise((resolve, reject) => {
        HttpClient.get("campania/listarCampaniaXCultivo")
        .then((resultado) => {
            resolve(resultado);
        })
        .catch((error) => {
            resolve(error);
        });
    });
}

export const listarLotes = () => {
    return new Promise((resolve, reject) => {
        HttpClient.get("lote/listarLote")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarEvaluadores = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("usuario/listarEvaluadores")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarAplicaciones = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("aplicacion/listarAplicaciones", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarAplicacion = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("aplicacion/insertarAplicacion", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarAplicacion = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("aplicacion/modificarAplicacion", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarAplicacion = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("aplicacion/eliminarAplicacion", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarAplicacionesXCampaña = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("aplicacion/listarAplicacionesXCampania", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarPlagas = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("plaga/listarPlaga", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarPesticidas = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("pesticida/listarPesticida", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarPesticida = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("pesticida/insertarPesticida", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarPesticida = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("pesticida/modificarPesticida", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarPesticida = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("pesticida/eliminarPesticida", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarVariedadesXCultivo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("cultivo/listarVariedadesXCultivo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarCultivos = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("cultivo/listarCultivo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarVariedades = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("cultivo/listarVariedades", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarMetodos = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("pesticida/listarMetodosAplicacion")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarEvaluaciones = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("evaluacion/listarEvaluaciones")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarSemanas = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("evaluacion/listarSemanas")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarGravedades = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("evaluacion/listarGravedades")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarEvaluacionesXSemana = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/listarEvaluacionesXSemana", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarEvaluacionesXCampañaXFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/listarEvaluacionesXCampaniaXFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarAplicacionesXCampañaXFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("aplicacion/listarAplicacionesXCampaniaXFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarLastEvaluacionesXSemana = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/listarLastEvaluacionesXSemana", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarEvaluacion = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/insertarEvaluacion", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarEvaluacion = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/modificarEvaluacion", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarEvaluacion = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/eliminarEvaluacion", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarEvaluacionesXCampaña = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/listarEvaluacionesXCampania", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarEvaluacionesXCampañaXUsuario = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/listarEvaluacionesXCampaniaXUsuario", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarPlagasActivas = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("evaluacion/listarPlagasActivas", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarMejoresPesticidas = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("pesticida/listarMejoresPesticidas", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarPlaga = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("plaga/insertarPlaga", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarPlaga = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("plaga/modificarPlaga", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarPlaga = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("plaga/eliminarPlaga", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarCampaña = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/insertarCampania", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarCampañaXFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/listarCampaniaXFundo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const insertarCampañaXCultivo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/insertarCampaniaXCultivo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarCampaña = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/modificarCampania", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const modificarCampañaXCultivo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/modificarCampaniaXCultivo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarCampaña = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/eliminarCampania", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const eliminarCampañaXCultivo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.post("campania/eliminarCampaniaXCultivo", data)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarPesticidaXPlaga = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("pesticida/listarPesticidaXPlaga")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

export const listarUsuariosXFundo = (data) => {
    return new Promise((resolve, reject) => {
        HttpClient.get("usuario/listarUsuarioXFundo")
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};