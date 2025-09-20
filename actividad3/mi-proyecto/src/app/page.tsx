// app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Mi página de recomendaciones</h1>
      <img
        src="/mi-imagen.jpg"
        alt="Recomendación de la semana"
        className="w-80 h-auto rounded shadow-md"
      />
    </main>
  );
}
