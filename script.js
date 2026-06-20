import { GoogleGenAI } from '@google/genai';
//cambiar el api porque esta es de mi cuenta xdd
//usas solo para pruebas w
//no dejar apis aqui que se la roban xd
const ai = new ({''})

async function checkdocs(){
    const response = await ai.models.generateContent({
        model: 'gemini-4.0-flas',
        //aqui va el prompt de lo que sea que vaya a hacer xd
        contents: ''
    })
    console.log("realizado")
}
