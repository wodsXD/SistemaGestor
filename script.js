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


// ===== Navigation =====
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

function showView(name){
  views.forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.view === name));
}

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    showView(item.dataset.view);
  });
});

document.querySelectorAll('[data-view-link]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showView(el.dataset.viewLink);
  });
});

// ===== Nueva Solicitud Flow =====
let currentTipoChangio = null;

function selectTipo(tipo){
  const cards = document.querySelectorAll('.option-card');
  cards.forEach(card => {
    if(card.dataset.tipo === tipo){
      card.classList.add('selected');
      currentTipoChangio = tipo;
      goToStep(2);
    } else {
      card.classList.remove('selected');
    }
  });
}

// Attach click handlers to option cards
document.querySelectorAll('.option-card').forEach(card => {
  card.addEventListener('click', () => {
    selectTipo(card.dataset.tipo);
  });
});

function goToStep(stepNum){
  // Hide all steps
  for(let i = 1; i <= 5; i++){
    const step = document.getElementById('step-' + i);
    if(step) step.style.display = 'none';
  }
  
  // Show current step
  const currentStep = document.getElementById('step-' + stepNum);
  if(currentStep) currentStep.style.display = 'block';
  
  // Update stepper
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, idx) => {
    const stepNumber = idx + 1;
    if(stepNumber < stepNum){
      step.classList.add('done');
      step.classList.remove('current');
    } else if(stepNumber === stepNum){
      step.classList.add('current');
      step.classList.remove('done');
    } else {
      step.classList.remove('done', 'current');
    }
  });
  
  // Scroll to top
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// File uploads
const dropzoneSolicitud = document.getElementById('dropzone-solicitud');
const fileSolicitud = document.getElementById('file-solicitud');
const dropzoneKardex = document.getElementById('dropzone-kardex');
const fileKardex = document.getElementById('file-kardex');

if(dropzoneSolicitud){
  dropzoneSolicitud.addEventListener('click', () => fileSolicitud.click());
  fileSolicitud.addEventListener('change', () => {
    if(fileSolicitud.files.length > 0){
      dropzoneSolicitud.classList.add('loaded');
      dropzoneSolicitud.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="title">Solicitud cargada</div><div class="hint">✓ ' + fileSolicitud.files[0].name + '</div>';
    }
  });
}

if(dropzoneKardex){
  dropzoneKardex.addEventListener('click', () => fileKardex.click());
  fileKardex.addEventListener('change', () => {
    if(fileKardex.files.length > 0){
      dropzoneKardex.classList.add('loaded');
      dropzoneKardex.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="title">Kardex cargado</div><div class="hint">✓ ' + fileKardex.files[0].name + '</div>';
    }
  });
}

function resetForm(){
  // Reset all inputs
  document.getElementById('input-nombre').value = 'Juan Carlos Pérez López';
  document.getElementById('input-control').value = '16110234';
  document.getElementById('select-origen').value = '';
  document.getElementById('select-destino').value = '';
  
  // Reset files
  fileSolicitud.value = '';
  fileKardex.value = '';
  dropzoneSolicitud.classList.remove('loaded');
  dropzoneKardex.classList.remove('loaded');
  dropzoneSolicitud.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 16v-4m0-4v4m0 0h4m-4 0H8M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg><div class="title">Solicitud del alumno</div><div class="hint">Arrastra el PDF o imagen, o haz clic para elegir</div>';
  dropzoneKardex.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 17V9m4 8V5m4 12v-6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg><div class="title">Kardex del alumno</div><div class="hint">PDF · máximo 10 MB</div>';
  
  // Reset tipo cambio
  document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  currentTipoChangio = null;
  
  // Reset stepper
  goToStep(1);
}

function downloadPDF(){
  alert('📄 Descargando dictamen PDF...\n\nEn producción, esto generaría un PDF con los datos del alumno y las materias validadas.');
}
