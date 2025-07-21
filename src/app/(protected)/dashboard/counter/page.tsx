import AddCounter from "@/components/molecules/counter/add-counter";
import CounterDisplay from "@/components/molecules/counter/counter-display";

export default function CounterPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Counter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddCounter />
        <CounterDisplay />
      </div>
    </div>
  );
}
