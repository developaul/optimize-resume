export async function Flight({ flightNumber }: any) {
  const data = {
    status: 'PENDING',
    source: 'PERU',
    destination: 'Lima',
  }//await fetch(`https://api.example.com/flight/${flightNumber}`);

  return (
    <div className="p-3 rounded-md">
      <div className="text-lg">{flightNumber}</div>
      <div>{data.status}</div>
      <div>{data.source}</div>
      <div>{data.destination}</div>
    </div>
  );
}