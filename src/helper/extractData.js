

//funcion para estraer la data del token y develver la data
function extractDataFromToken(token) {
    const data = token.split('.')[1];
    const dataDecoded = Buffer.from(data, 'base64').toString();
    return JSON.parse(dataDecoded);
}

//exportar
export { extractDataFromToken };