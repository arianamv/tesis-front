import HttpClient from "../services/http-common";

const setToken = (token) => { 
    localStorage.setItem('token', token);
};

const getToken = () => {
    const token = localStorage.getItem('token');
    if(token){
        return JSON.parse(token);
    }
    return null;
};

export const getIdUserLog = () => {
    const token = getToken()
    if (token){
        const payLoad = token;
        return payLoad?.user?.persona?.id;
    }

    return null;
}

const login = (userData) => {
    let payLoad = JSON.stringify({
        "usuario": userData.get('email').toLowerCase(),
        "password": userData.get('password')
    })

    return new Promise((resolve, reject) => {
        HttpClient.post("auth/login", payLoad)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};

const recoverPassword = (userData) => {
    const correo = userData.get('email').toLowerCase();
    return new Promise((resolve, reject) => {
        HttpClient.post("auth/forgotpassword/username="+correo)
            .then((resultado) => {
                resolve(resultado);
            })
            .catch((error) => {
                resolve(error);
            });
    });
};


const getUserEmail = () => {
    const token = getToken()
    if (token){
        const payLoad = token;
        return payLoad?.user?.persona?.correo;
    }

    return null;
};

const getUserRole = () => {
    const token = getToken()
    if (token){
        const payLoad = token;
        return payLoad?.user?.persona?.tipo_persona;
    }

    return null;
};

const isLoggedIn = () => {
    const token = getToken()
    if (token){
        return true;
    } else {
        return false
    }
}

const logOut = () => {
    localStorage.clear();
}


export const authService = {getToken, setToken, login, getUserEmail, getUserRole, isLoggedIn, logOut, recoverPassword, getIdUserLog}
