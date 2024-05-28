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