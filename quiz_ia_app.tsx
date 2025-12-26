import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Brain,
  Upload,
  FileText,
  Sparkles,
  Loader2,
  Key,
} from "lucide-react";

const QuizApp = () => {
  const defaultQuestions = [
    {
      id: 1,
      question:
        "¿Cuáles de las siguientes son características de los Sistemas Expertos?",
      options: [
        "Utilizan una base de conocimientos",
        "Emplean un motor de inferencia",
        "Pueden explicar su razonamiento",
        "Siempre son más rápidos que los humanos",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 2,
      question:
        "En el algoritmo Minimax para juegos, ¿cuáles afirmaciones son correctas?",
      options: [
        "Maximiza la ganancia del jugador MAX",
        "Minimiza la pérdida del jugador MIN",
        "Es óptimo contra un oponente perfecto",
        "Siempre evalúa todos los nodos del árbol de juego",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 3,
      question:
        "¿Qué técnicas se utilizan para optimizar la búsqueda en juegos?",
      options: [
        "Poda alfa-beta",
        "Funciones de evaluación heurística",
        "Limitación de profundidad",
        "Búsqueda en anchura únicamente",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 4,
      question:
        "En Regresión Lineal Simple, ¿cuáles son componentes del modelo y = mx + b?",
      options: [
        "m es la pendiente",
        "b es el intercepto",
        "x es la variable independiente",
        "y es la variable dependiente",
      ],
      correct: [0, 1, 2, 3],
    },
    {
      id: 5,
      question:
        "¿Cuáles son métricas válidas para evaluar un modelo de Regresión Lineal?",
      options: [
        "Error Cuadrático Medio (MSE)",
        "Coeficiente de determinación (R²)",
        "Error Absoluto Medio (MAE)",
        "Precisión y Recall",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 6,
      question:
        "En una Red Neuronal, ¿cuáles son funciones de activación comunes?",
      options: ["Sigmoid", "ReLU (Rectified Linear Unit)", "Tanh", "Coseno"],
      correct: [0, 1, 2],
    },
    {
      id: 7,
      question: "¿Cuáles son componentes esenciales de un Sistema Experto?",
      options: [
        "Base de conocimientos",
        "Motor de inferencia",
        "Interfaz de usuario",
        "Base de datos relacional",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 8,
      question:
        "¿Qué afirmaciones sobre el algoritmo de retropropagación son correctas?",
      options: [
        "Se usa para entrenar redes neuronales",
        "Calcula gradientes mediante la regla de la cadena",
        "Ajusta los pesos de la red",
        "Solo funciona con funciones lineales",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 9,
      question:
        "En el contexto de juegos inteligentes, ¿qué es cierto sobre Monte Carlo Tree Search?",
      options: [
        "Utiliza simulaciones aleatorias",
        "Balancea exploración y explotación",
        "Se usa en AlphaGo",
        "Garantiza encontrar la solución óptima siempre",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 10,
      question:
        "¿Cuáles son problemas que puede resolver la Regresión Lineal Múltiple?",
      options: [
        "Predicción de precios de viviendas con múltiples características",
        "Estimación de ventas basada en varios factores",
        "Análisis de relaciones entre múltiples variables independientes",
        "Clasificación de imágenes en categorías",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 11,
      question:
        "¿Qué técnicas ayudan a prevenir el sobreajuste en Redes Neuronales?",
      options: [
        "Dropout",
        "Regularización L1/L2",
        "Early stopping",
        "Aumentar indefinidamente las épocas de entrenamiento",
      ],
      correct: [0, 1, 2],
    },
    {
      id: 12,
      question:
        "En Sistemas Expertos, ¿cuáles son métodos de razonamiento válidos?",
      options: [
        "Encadenamiento hacia adelante (forward chaining)",
        "Encadenamiento hacia atrás (backward chaining)",
        "Razonamiento basado en casos",
        "Ordenamiento burbuja",
      ],
      correct: [0, 1, 2],
    },
  ];

  const [questions, setQuestions] = useState(defaultQuestions);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [showUploadSection, setShowUploadSection] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Convertir a string para buscar texto
      let text = "";
      for (let i = 0; i < uint8Array.length; i++) {
        text += String.fromCharCode(uint8Array[i]);
      }

      // Extraer texto entre stream y endstream
      const streamRegex = /stream\s*([\s\S]*?)\s*endstream/g;
      let match;
      let extractedText = "";

      while ((match = streamRegex.exec(text)) !== null) {
        const streamContent = match[1];
        // Limpiar caracteres no imprimibles y extraer texto legible
        const cleanText = streamContent.replace(/[^\x20-\x7E\n]/g, " ");
        extractedText += cleanText + " ";
      }

      // Método alternativo: buscar texto directo en el PDF
      const textRegex = /\(([^)]+)\)/g;
      while ((match = textRegex.exec(text)) !== null) {
        extractedText += match[1] + " ";
      }

      // Limpiar y normalizar el texto
      extractedText = extractedText
        .replace(/\s+/g, " ")
        .replace(/\\n/g, "\n")
        .trim();

      return extractedText;
    } catch (error) {
      console.error("Error extracting text:", error);
      throw new Error("No se pudo extraer el texto del PDF");
    }
  };

  const generateQuestionsWithGemini = async (text, key) => {
    const prompt = `Basándote en el siguiente contenido de un documento, genera exactamente 12 preguntas de opción múltiple donde cada pregunta puede tener entre 1 y 4 respuestas correctas. Las preguntas deben ser desafiantes y evaluar comprensión profunda del tema.

CONTENIDO DEL DOCUMENTO:
${text.substring(0, 8000)}

IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido (sin formato markdown, sin \`\`\`json, sin explicaciones adicionales) con el siguiente formato exacto:
{
  "questions": [
    {
      "question": "Texto de la pregunta",
      "options": ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
      "correct": [0, 1]
    }
  ]
}

Donde "correct" es un array con los índices (0-3) de las opciones correctas. Cada pregunta debe tener exactamente 4 opciones y al menos 1 respuesta correcta. Genera exactamente 12 preguntas.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 4096,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error en la API de Google: ${
            errorData.error?.message || "Error desconocido"
          }`
        );
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;

      // Limpiar el texto de posibles marcas de formato markdown
      let cleanContent = content.trim();
      cleanContent = cleanContent.replace(/```json\n?/g, "");
      cleanContent = cleanContent.replace(/```\n?/g, "");
      cleanContent = cleanContent.trim();

      // Extraer JSON del texto
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("Respuesta de la API:", content);
        throw new Error("No se pudo extraer JSON de la respuesta de Gemini");
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
        throw new Error("El formato de respuesta no es válido");
      }

      // Validar que haya exactamente 12 preguntas
      if (parsedData.questions.length < 12) {
        throw new Error(
          `Se generaron solo ${parsedData.questions.length} preguntas. Se necesitan 12.`
        );
      }

      // Formatear preguntas con IDs y validación
      const formattedQuestions = parsedData.questions
        .slice(0, 12)
        .map((q, index) => {
          if (!q.options || q.options.length !== 4) {
            throw new Error(`La pregunta ${index + 1} no tiene 4 opciones`);
          }
          if (!q.correct || q.correct.length === 0) {
            throw new Error(
              `La pregunta ${index + 1} no tiene respuestas correctas`
            );
          }

          return {
            id: index + 1,
            question: q.question,
            options: q.options,
            correct: q.correct,
          };
        });

      return formattedQuestions;
    } catch (error) {
      console.error("Error generating questions:", error);
      throw error;
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Por favor, sube un archivo PDF válido");
      return;
    }

    if (!apiKey.trim()) {
      alert("Por favor, ingresa tu API Key de Google AI Studio primero");
      setShowApiKeyInput(true);
      return;
    }

    setPdfFile(file);
    setIsGenerating(true);

    try {
      // Extraer texto del PDF
      const text = await extractTextFromPDF(file);
      setPdfText(text);

      if (text.length < 100) {
        throw new Error(
          "El PDF no contiene suficiente texto legible. Intenta con otro archivo."
        );
      }

      // Generar preguntas con Gemini
      const generatedQuestions = await generateQuestionsWithGemini(
        text,
        apiKey
      );

      setQuestions(generatedQuestions);
      setUserAnswers({});
      setShowResults(false);
      setShowUploadSection(false);

      alert("¡Preguntas generadas exitosamente! 🎉");
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error: ${error.message}\n\nAsegúrate de que tu API Key sea válida y tenga permisos para usar Gemini API.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionClick = (questionId, optionIndex) => {
    if (showResults) return;

    setUserAnswers((prev) => {
      const current = prev[questionId] || [];
      const newAnswers = current.includes(optionIndex)
        ? current.filter((i) => i !== optionIndex)
        : [...current, optionIndex];

      return { ...prev, [questionId]: newAnswers };
    });
  };

  const checkAnswer = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const userAnswer = userAnswers[questionId] || [];

    if (userAnswer.length !== question.correct.length) return false;

    return (
      question.correct.every((correctIdx) => userAnswer.includes(correctIdx)) &&
      userAnswer.every((userIdx) => question.correct.includes(userIdx))
    );
  };

  const calculateScore = () => {
    return questions.reduce((score, q) => {
      return score + (checkAnswer(q.id) ? 1 : 0);
    }, 0);
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
    setShowUploadSection(true);
    setPdfFile(null);
    setPdfText("");
    setQuestions(defaultQuestions);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const score = showResults ? calculateScore() : 0;
  const percentage = showResults
    ? ((score / questions.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Cuestionario IA
            </h1>
          </div>
          <p className="text-center text-gray-600 text-lg">
            Selecciona todas las respuestas correctas. Una pregunta solo es
            correcta si marcas TODAS las alternativas correctas.
          </p>
        </div>

        {/* Upload Section */}
        {showUploadSection && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Genera Preguntas con IA
              </h2>
            </div>

            {/* API Key Input */}
            {!apiKey && (
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-indigo-200">
                <div className="flex items-center mb-3">
                  <Key className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Configura tu API Key de Google AI Studio
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Obtén tu API Key gratis en:{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-semibold"
                  >
                    aistudio.google.com/app/apikey
                  </a>
                </p>
                <div className="flex gap-3">
                  <input
                    type="password"
                    placeholder="Ingresa tu API Key de Google AI Studio"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (apiKey.trim()) {
                        alert("✅ API Key guardada correctamente");
                      } else {
                        alert("⚠️ Por favor ingresa una API Key válida");
                      }
                    }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}

            {apiKey && (
              <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-semibold">
                    API Key configurada correctamente
                  </span>
                </div>
                <button
                  onClick={() => setApiKey("")}
                  className="text-sm text-green-700 hover:text-green-900 underline"
                >
                  Cambiar
                </button>
              </div>
            )}

            <div
              className={`border-4 border-dashed rounded-xl p-8 text-center transition-colors ${
                apiKey
                  ? "border-indigo-300 hover:border-indigo-400"
                  : "border-gray-300 opacity-50"
              }`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isGenerating || !apiKey}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className={`${
                  isGenerating || !apiKey
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isGenerating ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-16 h-16 text-indigo-600 mb-4 animate-spin" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      Generando preguntas con Gemini...
                    </p>
                    <p className="text-gray-500">
                      Esto puede tomar unos momentos
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload
                      className={`w-16 h-16 mb-4 ${
                        apiKey ? "text-indigo-600" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`text-xl font-semibold mb-2 ${
                        apiKey ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {apiKey
                        ? "Sube un archivo PDF"
                        : "Configura tu API Key primero"}
                    </p>
                    <p
                      className={`${
                        apiKey ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {apiKey
                        ? "La IA generará 12 preguntas basadas en el contenido"
                        : "Necesitas una API Key para generar preguntas"}
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">
                    ℹ️ Cómo obtener tu API Key:
                  </p>
                  <ol className="list-decimal ml-4 space-y-1">
                    <li>
                      Ve a{" "}
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-semibold"
                      >
                        Google AI Studio
                      </a>
                    </li>
                    <li>Inicia sesión con tu cuenta de Google</li>
                    <li>Haz clic en "Create API Key"</li>
                    <li>Copia la clave y pégala arriba</li>
                  </ol>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowUploadSection(false)}
              className="mt-6 w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Usar preguntas predeterminadas
            </button>
          </div>
        )}

        {/* Results Summary */}
        {showResults && (
          <div
            className={`rounded-2xl shadow-xl p-8 mb-8 ${
              percentage >= 70
                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                : percentage >= 50
                ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                : "bg-gradient-to-r from-red-400 to-pink-500"
            }`}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Resultados
            </h2>
            <div className="text-center">
              <p className="text-6xl font-bold text-white mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-2xl text-white font-semibold">{percentage}%</p>
              <p className="text-white text-lg mt-4">
                {percentage >= 70
                  ? "¡Excelente trabajo! 🎉"
                  : percentage >= 50
                  ? "¡Buen intento! 👍"
                  : "¡Sigue practicando! 💪"}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 w-full bg-white text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Nuevo Cuestionario
            </button>
          </div>
        )}

        {/* Questions */}
        {!showUploadSection &&
          questions.map((question, qIndex) => {
            const isAnswered = userAnswers[question.id]?.length > 0;
            const isCorrect = showResults ? checkAnswer(question.id) : null;

            return (
              <div
                key={question.id}
                className={`bg-white rounded-2xl shadow-lg p-6 mb-6 transition-all ${
                  showResults
                    ? isCorrect
                      ? "ring-4 ring-green-400"
                      : "ring-4 ring-red-400"
                    : ""
                }`}
              >
                <div className="flex items-start mb-4">
                  <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    {qIndex + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 flex-1">
                    {question.question}
                  </h3>
                  {showResults && (
                    <div className="ml-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3 ml-11">
                  {question.options.map((option, optIndex) => {
                    const isSelected =
                      userAnswers[question.id]?.includes(optIndex);
                    const isCorrectOption = question.correct.includes(optIndex);

                    let optionStyle = "bg-gray-50 border-2 border-gray-200";

                    if (showResults) {
                      if (isCorrectOption && isSelected) {
                        optionStyle = "bg-green-100 border-2 border-green-500";
                      } else if (isCorrectOption && !isSelected) {
                        optionStyle = "bg-green-50 border-2 border-green-300";
                      } else if (!isCorrectOption && isSelected) {
                        optionStyle = "bg-red-100 border-2 border-red-500";
                      } else {
                        optionStyle = "bg-gray-50 border-2 border-gray-200";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-indigo-100 border-2 border-indigo-500";
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleOptionClick(question.id, optIndex)}
                        disabled={showResults}
                        className={`w-full p-4 rounded-xl text-left transition-all ${optionStyle} ${
                          !showResults
                            ? "hover:border-indigo-400 cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? "bg-indigo-600 border-indigo-600"
                                : "border-gray-400"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`text-gray-800 ${
                              isSelected ? "font-medium" : ""
                            }`}
                          >
                            {option}
                          </span>
                          {showResults && isCorrectOption && (
                            <span className="ml-auto text-green-600 font-semibold">
                              ✓ Correcta
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {/* Submit Button */}
        {!showResults && !showUploadSection && (
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl text-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Finalizar Cuestionario
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
