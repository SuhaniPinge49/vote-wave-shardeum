import React, { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet"; // adjust if your wallet hook/context is named differently
import Toast from "../components/ui/Toast"; // create or reuse a Toast if you already have one

interface Proposal {
  id: number;
  title: string;
  description: string;
  votes: number;
}

export default function Results() {
  const { contract } = useWallet();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    if (contract) fetchResults();
  }, [contract]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const raw = await contract.getProposals(); // adjust if method is different
      const mapped = raw.map((r: any) => ({
        id: r.id.toNumber ? r.id.toNumber() : Number(r.id),
        title: r.title,
        description: r.description ?? "",
        votes: r.votes ? (r.votes.toNumber ? r.votes.toNumber() : Number(r.votes)) : 0,
      }));
      setProposals(mapped);
    } catch (err: any) {
      console.error(err);
      setToast({ message: "Failed to load results", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Results</h2>

      {loading && <p>Loading…</p>}
      {!loading && proposals.length === 0 && <p>No polls yet</p>}

      {proposals.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm"
        >
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.description}</p>
          <p className="mt-2">Votes: <b>{p.votes}</b></p>
        </div>
      ))}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
