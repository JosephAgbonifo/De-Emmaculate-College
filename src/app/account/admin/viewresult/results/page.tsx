"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { postRequest } from "@/src/utils/api";
import Image from "next/image";
import { FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa";

// --- Date Formatter ---
function getFormattedDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const suffix = (n: number) => {
    if (n >= 11 && n <= 13) return "th";
    return ["st", "nd", "rd"][(n % 10) - 1] || "th";
  };
  return `${days[date.getDay()]} ${date.getDate()}${suffix(
    date.getDate()
  )} of ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// --- Types ---
interface Result {
  subject: string;
  ca1: number;
  ca2: number;
  fr?: number;
  sr?: number;
  avg?: number;
  examscore: number;
  total: number;
  grade: string;
  remark: string;
}
interface Student {
  regnum: string;
  fullname: string;
  sex: string;
  class: string;
  img: string;
}
interface StudentWithResults {
  student: Student;
  results: Result[];
  tc: string;
  pc: string;
}

// --- Main Component ---
export default function AdminResultsPage() {
  const searchParams = useSearchParams();
  const session = searchParams.get("session");
  const term = searchParams.get("term");
  const className = searchParams.get("class");

  const [data, setData] = useState<StudentWithResults[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session || !term || !className) {
      setError("Missing session, term, or class");
      setLoading(false);
      return;
    }

    const fetchAllResults = async () => {
      try {
        const response = await postRequest("/result/class", {
          session,
          term,
          class: className,
        });
        setData(response?.results || []);
      } catch (err) {
        console.error("Failed to fetch class results", err);
        setError("Error fetching results");
      } finally {
        setLoading(false);
      }
    };

    fetchAllResults();
  }, [session, term, className]);

  const calculateMarkObtained = (results: Result[]) => {
    if (Number(term) === 3) {
      return results.reduce((sum, r) => {
        const avg = Math.round((r.total + Number(r.fr) + Number(r.sr)) / 3);
        return sum + avg;
      }, 0);
    } else {
      return results.reduce((sum, r) => sum + r.total, 0);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading results...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  if (data.length === 0)
    return <p className="text-center mt-10">No results found.</p>;

  return (
    <div className="pt-20 print-reset-padding">
      <div className="text-center mb-4 print-reset-padding print-reset-margin">
        <button
          onClick={() => window.print()}
          className="bg-green-600 no-print text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Print All
        </button>
      </div>

      {data.map(({ student, results, tc, pc }, idx) => {
        const markobtained = calculateMarkObtained(results);
        const totalMark = results.length * 100;
        const percentage = Math.round((markobtained / totalMark) * 100);

        return (
          <div
            key={idx}
            className="result-sheet printable w-[210mm] h-[297mm] bg-white shadow-md mx-auto my-10 p-8 text-head"
          >
            {/* HEADER */}
            <div className="grid grid-cols-8 items-center gap-4 mb-10">
              <div className="col-span-1 flex justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </div>
              <div className="col-span-6 text-center text-[#016630]">
                <h1 className="text-3xl font-bold uppercase">
                  De Emmaculate College
                </h1>
                <div className="text-[10px]">
                  <p className="flex justify-center items-center">
                    <FaMapPin className="pr-2" />
                    2, Ibikunle Street, Wasimi...
                  </p>
                  <p className="flex justify-center items-center">
                    <FaPhone className="pr-2" />
                    07064369964, 08138051390
                  </p>
                  <p className="flex justify-center items-center">
                    <FaEnvelope className="pr-2" />
                    emmaculatecollege19@gmail.com
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                {student.img && (
                  <Image
                    src={`https://www.emmaculatecollege.com.ng/${student.img}`}
                    alt="Student"
                    height={80}
                    width={80}
                  />
                )}
              </div>
            </div>

            <p className="text-center text-[#432004] font-bold">
              EXAMINATION RESULT SHEET
            </p>

            {/* STUDENT INFO */}
            <div className="grid grid-cols-2 gap-2 text-sm text-[#032e15] mt-4">
              <p>
                <strong>Name:</strong> {student.fullname}
              </p>
              <p>
                <strong>Sex:</strong> {student.sex}
              </p>
              <p>
                <strong>Class:</strong> {student.class}
              </p>
              <p>
                <strong>Reg Number:</strong>{" "}
                {student.regnum.replace(/-/g, "/").toUpperCase()}
              </p>
              <p>
                <strong>Session:</strong> {session}
              </p>
              <p>
                <strong>Term:</strong>{" "}
                {term === "1" ? "1st" : term === "2" ? "2nd" : "3rd"}
              </p>
            </div>

            {/* RESULT TABLE */}
            <table className="w-full border text-xs mt-6">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>CA1</th>
                  <th>CA2</th>
                  <th>Exam</th>
                  <th>Total</th>
                  {Number(term) === 3 && (
                    <>
                      <th>First</th>
                      <th>Second</th>
                      <th>Average</th>
                    </>
                  )}
                  <th>Grade</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td>{r.subject}</td>
                    <td>{r.ca1}</td>
                    <td>{r.ca2}</td>
                    <td>{r.examscore}</td>
                    <td>{r.total}</td>
                    {Number(term) === 3 && (
                      <>
                        <td>{r.fr}</td>
                        <td>{r.sr}</td>
                        <td>
                          {Math.round(
                            (r.total + Number(r.fr) + Number(r.sr)) / 3
                          )}
                        </td>
                      </>
                    )}
                    <td>{r.grade}</td>
                    <td>{r.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-5 my-5 text-[#032e15]">
              <div>
                <p>Marks Obtainable: {totalMark}</p>
                <p>Marks Obtained: {markobtained}</p>
                <p>Percentage: {percentage}%</p>
              </div>
              <div className="text-[8px] grid grid-cols-2 gap-2 text-right">
                <span>A1 = 75% - 100% (EXCELLENT)</span>
                <span>B2 = 70% - 74% (VERY GOOD)</span>
                <span>B3 = 65% - 69% (GOOD)</span>
                <span>C4 = 60% - 64% (CREDIT)</span>
                <span>C5 = 55% - 59% (CREDIT)</span>
                <span>C6 = 50% - 54% (CREDIT)</span>
                <span>D7 = 45% - 49% (FAIR)</span>
                <span>E8 = 40% - 44% (PASS)</span>
                <span>F9 = BELOW 40% (FAIL)</span>
              </div>
            </div>

            {/* Comments and Date */}
            <div className="text-[#032e15]">
              <p className="flex my-2">
                <strong>Class Teacher:</strong>{" "}
                <span className="mx-5 border-b flex-1">{tc}</span>
              </p>
              <p className="flex my-2">
                <strong>Principal:</strong>{" "}
                <span className="mx-5 border-b flex-1">{pc}</span>
              </p>
              <div className="flex justify-between mt-10">
                <p>
                  <strong>Date:</strong>{" "}
                  <span className="mx-5 border-b">{getFormattedDate()}</span>
                </p>
                <div className="relative h-16 w-40">
                  <Image
                    src="/images/stamp.png"
                    alt="Signature"
                    fill
                    className="object-contain absolute"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
