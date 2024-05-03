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