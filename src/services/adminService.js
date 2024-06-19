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
        HttpClient.get("usuario/listarEvaluadores", data)
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