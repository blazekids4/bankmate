"use client"

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [llmResponse, setLlmResponse] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  }

  async function handleSubmit() {
    if (!csvFile) {                      
      return;
    }
    setIsConverting(true);
    try {
      const formData = new FormData();
      formData.append("file", csvFile);

      const res = await fetch("http://localhost:7071/api/ConvertCsv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error calling function");
      }

      const text = await res.text();
      setLlmResponse(text);
    } catch (error) {
      console.error(error);
      setLlmResponse("Error calling function");
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-2">
          <Image
            src="/BankMate.png"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="text-4xl font-bold text-blue-600">BankMate</h1>
        </div>
 
        <div className="flex flex-col items-start gap-4 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Step 1: Upload your CSV file
          </h2>
          <label
            htmlFor="csvInput"
            className="cursor-pointer rounded bg-green-500 text-white px-4 py-2 hover:bg-green-600"
          >
            Upload CSV File
          </label>
          <input
            id="csvInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          {csvFile && (
            <div className="text-gray-600">
              Selected file: <span className="font-medium">{csvFile.name}</span>
            </div>
          )}
          <h2 className="text-2xl font-semibold text-gray-800">
            Step 2: Convert CSV and Call LLM
          </h2>
          <button
            className="rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!csvFile || isConverting}
          >
            {isConverting ? "Converting..." : "Convert CSV and Call LLM"}
          </button>
          {llmResponse && !isConverting && (
            <div className="p-2 border rounded mt-2 max-w-prose">
              {llmResponse}
            </div>
          )}
        </div>          
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* footer content */}
      </footer>
    </div>
  );
}