"use client";

import { useEffect, useState, useRef } from "react";
import { use } from "react"; // Used to unwrap the `params` promise passed to server component
import { useRouter } from "next/navigation";
import { getRequest, postRequest } from "@/src/utils/api";
import Image from "next/image";
import { FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa";

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
  const day = days[date.getDay()];
  const dayNum = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const suffix = (n: number) => {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day} ${dayNum}${suffix(dayNum)} of ${month} ${year}`;
}

interface ResultsPageProps {
  params: Promise<{ regnum: string }>;
}

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
  fullname: string;
  sex: string;
  class: string;
  img: string;
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const { regnum } = use(params);
  const router = useRouter();

  const [session, setSession] = useState("");
  const [term, setTerm] = useState("");
  const [check, setCheck] = useState("");

  const [results, setResults] = useState<Result[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const [comments, setComment] = useState({ tc: "", pc: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const resultRef = useRef<HTMLDivElement>(null); // 👈 add ref here

  useEffect(() => {
    const resultCheck = async () => {
      try {
        const data = await getRequest("/session");
        setSession(data.data.session);
        setTerm(data.data.term);
        setCheck(data.data.resultcheck);
        if (!check) {
          setError("Result Checking not yet enabled");
          return;
        }
      } catch {
        setError("Unable to get session details");
        return;
      }
    };

    const fetchResults = async () => {
      try {
        const data = await postRequest("/results/get", {
          regnum,
          session,
          term,
        });
        setResults(data?.data || []);
        setStudent(data?.student || null);
        setComment({ tc: data?.tc, pc: data?.pc });
      } catch (err) {
        console.error("❌ Failed to load results:", err);
        setError("Error loading results");
      } finally {
        setLoading(false);
      }
    };
    resultCheck();
    fetchResults();
  }, [regnum, session, term, router, check]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>{error}</p>;

  const markobtained =
    Number(term) === 3
      ? results.reduce((sum, r) => {
          const avg = Math.round((r.total + Number(r.fr) + Number(r.sr)) / 3);
          return sum + avg;
        }, 0)
      : results.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="pt-20">
      <div className="text-center mb-4">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Print Result
        </button>
      </div>
      <div
        ref={resultRef}
        className="printable w-[210mm] h-[297mm] bg-[#ffffff] shadow-md mx-auto my-4 p-8 text-head"
      >
        <div className="grid grid-cols-8 items-center gap-4 mb-10">
          <div className="col-span-1 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Emmaculate"
              height={80}
              width={80}
            />
          </div>
          <div className="col-span-6 text-center text-[#016630]">
            <h1 className="text-3xl font-bold font-poppins uppercase">
              De Emmaculate College
            </h1>
            <div className="text-[10px]">
              <p className="flex items-center justify-center">
                <FaMapPin className="pr-2" />
                2, Ibikunle Street, Wasimi by Underbridge, Opp. Power Line, Mile
                12, Lagos, Nigeria
              </p>
              <p className="flex items-center justify-center">
                <FaPhone className="pr-2" />
                07064369964, 08138051390
              </p>
              <p className="flex items-center justify-center">
                <FaEnvelope className="pr-2" />
                emmaculatecollege19@gmail.com
              </p>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            {student?.img && (
              <Image
                src={`http://www.emmaculatecollege.com.ng/${student.img}`}
                alt="Student"
                height={80}
                width={80}
              />
            )}
          </div>
        </div>

        <p className="text-[#432004] font-poppins font-bold text-center">
          EXAMINATION RESULT SHEET
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm text-[#032e15]">
          <div className="flex items-center justify-center col-span-2">
            <p className="mr-5 font-bold font-poppins">Name</p>
            <p className="border-b">{student?.fullname}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-5 font-bold font-poppins">Class</p>
            <p className="border-b">{student?.class}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-5 font-bold font-poppins">Registration Number</p>
            <p className="border-b">
              {regnum.replace(/-/g, "/").toUpperCase()}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-5 font-bold font-poppins">Sex</p>
            <p className="border-b">{student?.sex}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-5 font-bold font-poppins">Session</p>
            <p className="border-b">{session}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-5 font-bold font-poppins">Term</p>
            <p className="border-b">
              {term === "1" ? "1st" : term === "2" ? "2nd" : "3rd"}
            </p>
          </div>
        </div>

        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <table className="w-full border text-xs">
            <thead className="text-[#162456]">
              <tr>
                <th>Subject</th>
                <th>CA1</th>
                <th>CA2</th>
                <th>Exam</th>
                <th>Total</th>
                {Number(term) === 3 && (
                  <>
                    <th>First term</th>
                    <th>Second term</th>
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
        )}

        <div className="grid grid-cols-2 gap-5 text-[#032e15] my-5">
          <div>
            <p>Marks Obtainable: {results.length * 100}</p>
            <p>Marks Obtained: {markobtained}</p>
            <p>
              Percentage:{" "}
              {Math.round((markobtained / (results.length * 100)) * 100)}%
            </p>
          </div>
          <div className="text-[8px] grid grid-cols-2 gap-3 text-right">
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

        <div>
          <p className="text-[#032e15] flex my-5">
            <span className="font-bold">Class Teacher&apos;s comment: </span>
            <span className="border-b flex-1 mx-5">{comments.tc}</span>
          </p>
          <p className="text-[#032e15] flex my-5">
            <span className="font-bold">Principal&apos;s comment: </span>
            <span className="border-b flex-1 mx-5">{comments.pc}</span>
          </p>
          <div className="grid grid-cols-2 gap-5 mt-12">
            <p className="text-[#032e15] flex">
              <span className="font-bold">Date: </span>
              <span className="border-b flex-1 mx-5">{getFormattedDate()}</span>
            </p>
            <p className="text-[#032e15] flex relative">
              <span className="font-bold">Principal&apos;s Signature: </span>
              <span className="border-b flex-1 mx-5 relative">
                <Image
                  src={"/images/stamp.png"}
                  width={200}
                  height={100}
                  alt="Principal's signature"
                  className="absolute -top-28"
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
