/**
 * Planifica Virtual - Vanilla JS Engine Helper
 * Motor de integración para docentes peruanos (CNEB MINEDU)
 * Compatible con ejecución en navegador y consumo de cnebData.
 */

(function(window) {
  'use strict';

  console.log('Planifica Virtual (CNEB MINEDU) cargado correctamente.');

  // Helper para generar sesión en frontend
  window.PlanificaVirtual = {
    versión: '1.0.0',
    autor: 'Planifica Virtual MINEDU',
    descargarPlantillaBase: async function() {
      try {
        const res = await fetch('/modelo-minedu-sesion.docx');
        const blob = await res.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'modelo-minedu-sesion.docx';
        a.click();
      } catch (err) {
        console.error('Error al descargar plantilla:', err);
      }
    }
  };
})(window);
