import { GoogleGenAI } from '@google/genai';
//cambiar el api porque esta es de mi cuenta xdd
//usas solo para pruebas w
const ai = new GoogleGenAI ({apiKey: 'AQ.Ab8RN6KCdo2-UqEnR47vgldb_XXTij4f2Ny5N4OLQg7YoEBlRg'})

async function checkdocs(){
    const response = await ai.models.generateContent({
        model: 'gemini-4.0-flas',
        //aqui va el prompt de lo que sea que vaya a hacer xd
        contents: ''
    })
    console.log("realizado")
}