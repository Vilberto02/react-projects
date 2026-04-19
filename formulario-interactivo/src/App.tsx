import { useState } from "react";
import { InputWithLabel } from "./components/Input";

function App() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    fecha: ""
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const mensaje = `Hola ${formData}`
    alert(mensaje)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between gap-4 items-center px-36 py-4 bg-linear-to-t from-blue-50/25 to-white">
        <p className="text-xl font-bold">Formulario interactivo</p>
        <nav className="space-x-4">
          <a href="" target="_blank" className="hover:underline">
            GitHub
          </a>
          <a href="" target="_blank" className="hover:underline">
            Linkedln
          </a>
        </nav>
      </header>
      <main className="px-36 flex gap-8 justify-between items-center flex-1 py-4 bg-blue-50/25">
        <section className="flex flex-col gap-4 border border-blue-100 px-6 py-8 shadow-lg rounded-3xl bg-white">
          <h1 className="text-center font-semibold">
            Envio de datos mediante un formulario.
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputWithLabel
              idInput="nombre"
              titleLabel="Nombre"
              placeholder="Juan Carlos"
              value={formData.nombre}
              onChange={handleChange}
            ></InputWithLabel>
            <InputWithLabel
              idInput="correo"
              titleLabel="Correo"
              type="email"
              placeholder="juan@gmail.com"
              value={formData.email}
              onChange={handleChange}
            ></InputWithLabel>
            <InputWithLabel
              idInput="fechaNacimiento"
              titleLabel="Fecha de nacimiento"
              type="date"
              placeholder="01/01/2000"
              value={formData.fecha}
              onChange={handleChange}
            ></InputWithLabel>
            <button type="submit" className="w-full bg-blue-500 rounded-xs px-4 py-2 mt-4 text-white cursor-pointer">Enviar datos</button>
          </form>
          <p className="text-sm text-stone-600 font-semibold">
            Nota: Este formulario está hecho con react puro.
          </p>
        </section>
        <section className="border border-blue-50 bg-white rounded-3xl shadow-lg py-8 px-6 max-w-lg">
          <h4>Inputs controlados con Ref.</h4>
          <pre className="whitespace-pre-wrap wrap-break-words border border-stone-200 bg-stone-50/25 mt-4 text-stone-700 p-4 rounded-xl text-sm font-mono overflow-x-auto">
            <code>
              {`export const InputWithLabel = forwardRef<HTMLInputElement, InputProps>(
  ({ titleLabel, idInput, ...props }, ref) => {
    return (
      <input ref={ref} type="text" />
    )
  }
)`}
            </code>
          </pre>
        </section>
      </main>
      <footer className="flex justify-between items-center bg-linear-to-b py-5 from-blue-50/25 to-white px-36">
        <p>Formulario interactivo</p>
        <p>© Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App
