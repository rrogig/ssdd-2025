
const API_jsonPlaceholder = 'https://jsonplaceholder.typicode.com';

async function fetchJson(url){
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

// fetch 3 usuarios
async function fetchTresUsuarios() {
    const usuarios = await fetchJson(`${API_jsonPlaceholder}/users`);
    return usuarios.slice(0, 3);    
}

// fetch posteos de un usuario
async function fetchPosteosUsuario(userId) {
    return fetchJson(`${API_jsonPlaceholder}/posts?userId=${userId}`);
}

// 1 = enfoque secuencial
async function ejecucionSecuencial() {
    console.log('Ejecución Secuencial');
    try{
        const usuarios = await fetchTresUsuarios();
        for (const usuario of usuarios) {
            // espera a que termine la llamada de posteos antes de continuar con el siguiente usuario
            const posteos = await fetchPosteosUsuario(usuario.id);
            console.log(`Usuario: ${usuario.name}, Posteos: ${posteos.length}`);
        }
    } catch (error) {
        console.error('Error en ejecución secuencial:', error);
    }
}

// 2 = enfoque concurrente
async function ejecucionConcurrente() {
    console.log('Ejecución Concurrente');
    try{
        const usuarios = await fetchTresUsuarios();
        // para cada usuario, crea una promesa para fetchPosteosUsuario
        const promesasPosteos = usuarios.map(async (usuario) => {
            const posteos = await fetchPosteosUsuario(usuario.id);
            return {name: usuario.name, posteos: posteos.length};
        });

    // esperamos a que todas las promesas se resuelvan
    const resultados = await Promise.all(promesasPosteos);

    // mostramos los resultados
    resultados.forEach(resultado => {
        console.log(`Usuario: ${resultado.name}, Posteos: ${resultado.posteos}`);
    });

    } catch (error) {
        console.error('Error en ejecución concurrente:', error);
    }
}

async function main(){
    await ejecucionSecuencial();
    await ejecucionConcurrente();
}

main();
