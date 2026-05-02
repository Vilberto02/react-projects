export default class ClasificacionResult {
  constructor(data) {
    this.prediction = data.prediction || '';
    this.imageName = data.image_name || '';
    this.probs = data.probs || {};
  }
  
  get predictedClass() {
    return this.prediction
      .replace('Prediccion: ', '')
      .trim();
  }
  
  get probsArray() {
    return Object.entries(this.probs).map(
      ([name, value]) => ({
        name: name.charAt(0).toUpperCase()
          + name.slice(1),
        value: parseFloat(value),
        percentage: (parseFloat(value) * 100).toFixed(1)
      })
    );
  }
  
  getColorForClass(className) {
    const colors = {
      GLIOMA: '#E74C3C',
      MENINGIOMA: '#F39C12',
      NOTUMOR: '#27AE60',
      PITUITARY: '#3498DB',
    };
    return colors[className] || '#95A5A6';
  }
  
  get description() {
    const desc = {
      GLIOMA: 'Tumor originado en celulas gliales.',
      MENINGIOMA: 'Tumor en las meninges.',
      NOTUMOR: 'No se detecta tumor.',
      PITUITARY: 'Tumor en la glandula pituitaria.',
    };
    return desc[this.predictedClass]
      || 'Clasificacion desconocida.';
  }
}
