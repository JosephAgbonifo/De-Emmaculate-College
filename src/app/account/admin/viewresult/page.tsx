"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const classes = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];
const currentYear = new Date().getFullYear();

const sessions: string[] = [];

for (let year = 2020; year <= currentYear; year++) {
  sessions.push(`${year}/${year + 1}`);
}

const terms = ["1", "2", "3"];

export default function SelectResultCriteriaPage() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!selectedClass || !selectedSession || !selectedTerm) {
      setError("Please select all fields");
      return;
    }

    const query = new URLSearchParams({
      class: selectedClass,
      session: selectedSession,
      term: selectedTerm,
    });

    router.push(`./viewresult/results?${query.toString()}`);
  };

  return (
    <div className="p-10 pt-36 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">View Student Results</h1>
      {error ? <p>{error}</p> : ""}

      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Class</option>
        {classes.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Session</option>
        {sessions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={selectedTerm}
        onChange={(e) => setSelectedTerm(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Term</option>
        {terms.map((t) => (
          <option key={t} value={t}>
            {t === "1" ? "1st Term" : t === "2" ? "2nd Term" : "3rd Term"}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-bluebg text-white px-4 py-2 rounded w-full"
      >
        View Result
      </button>
    </div>
  );
}
