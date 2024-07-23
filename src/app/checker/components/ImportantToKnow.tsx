function TabItem({ label }: { label: string }) {
  return (
    <div className="p-2 rounded-md bg-white">
      <p className="p">{label}</p>
    </div>
  );
}

export default function ImportantToKnow() {
  return (
    <div className="bg-orangeLight rounded-lg p-4">
      <h4 className="h4 mb-2">Detalles:</h4>
      <div className="flex flex-wrap gap-2 ">
        <TabItem label="Full-time" />
        <TabItem label="Inglés: intermedio" />
        <TabItem label="Remoto" />
        <TabItem label="Sueldo: 1000 usd" />
        <TabItem label="Disponibilidad inmediata" />
      </div>
    </div>
  );
}