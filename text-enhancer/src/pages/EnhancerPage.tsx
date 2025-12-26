import { useState } from "react";

export function EnhancerPage() {
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const handleSubmit = () => {
    if (value.length == 0) {
      alert("No hay texto para mejorar.");
      return;
    }

    setTimeout(() => {
      setResult(value);
    }, 500);
  }
  
  
  const handleClear = () => {
    setValue("");
    setResult("");
  }

  return (
    <main className="flex flex-col gap-4 justify-center items-center ">
      <section className="flex flex-col gap-2">
        <p className="font-medium">Texto</p>
        <textarea
          name="text"
          id="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-xl border-2 px-2 py-1 h-36 border-stone-200 rounded-lg"
          placeholder="Ingresa tu texto aquí"
        ></textarea>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSubmit}
            className="bg-green-800/90 cursor-pointer hover:bg-green-800 rounded-sm py-2 text-white"
          >
            Mejorar
          </button>
          <button className="border border-stone-300 rounded-sm cursor-pointer py-2 hover:bg-stone-100" onClick={handleClear}>Limpiar</button>
        </div>
      </section>
      <section className="flex flex-col gap-2 font-semibold">
        <p>Resultado</p>
        <textarea
          name="resulta"
          id="result"
          className="w-xl px-2 font-normal py-1 border border-stone-200 h-36 rounded-lg"
          value={result}
          disabled
          placeholder="Aquí se mostrará el texto mejorado."
        ></textarea>
      </section>
    </main>
  );
}