"use client";

import React, { useState } from "react";
import Image from "next/image";
import { marked } from 'marked';

export default function Home() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [llmResponse, setLlmResponse] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const trimmedMarkdown = llmResponse.replace(/\n{2,}/g, "\n");
  const htmlOutput = marked.parse(trimmedMarkdown);
  const [showToast, setShowToast] = useState<boolean>(false);

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

      const result = await res.json();
      console.log("Your Personalized AI Analysis:", result);
      // Instead of result.message:
      setLlmResponse(result.mdContent);

      // Auto-download Markdown file
      const mdBlob = new Blob([result.mdContent], { type: "text/markdown" });
      const mdUrl = URL.createObjectURL(mdBlob);
      const mdLink = document.createElement("a");
      mdLink.href = mdUrl;
      mdLink.download = "bankmate_results.md";
      document.body.appendChild(mdLink);
      mdLink.click();
      document.body.removeChild(mdLink);
    } catch (error) {
      console.error(error);
      setLlmResponse("Error calling function");
    } finally {
      setIsConverting(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(llmResponse)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // hide after 2s
      })
      .catch(err => console.error("Failed to copy:", err));
  }
  

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {showToast && (
            <div className="fixed “bottom-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md z-50">
              Copied to clipboard!
            </div>
          )}
        <div className="flex items-center gap-2">
          <Image
            src="/BankMate.png"
            alt="Logo"
            width={125}
            height={125}
            className="rounded-full"
          />
          <h1 className="text-4xl font-bold font-mono text-slate-800">
            BankMate
          </h1>
        </div>

        <div className="flex flex-col items-start gap-4 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Step 1: Upload your CSV file
          </h2>
          <label
            htmlFor="csvInput"
            className="cursor-pointer rounded bg-red-500 text-white px-4 py-2 hover:bg-green-600"
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
            className="rounded bg-blue-700 text-white px-4 py-2 hover:bg-green-600 disabled:opacity-25"
            onClick={handleSubmit}
            disabled={!csvFile || isConverting}
          >
            {isConverting ? "Converting..." : "Convert CSV and Call LLM"}
          </button>
          {llmResponse && !isConverting && (
            <div className="p-4 border border-gray-300 rounded mt-2 bg-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Your Spending Analysis 
              </h3>
              <div className="space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 mb-3 text-sm bg-blue-400 text-white rounded hover:bg-blue-500"
                >
                  Copy
                </button>
              </div>
              <div
                className="text-gray-700 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
               <div className="space-x-2 mt-3">
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 mb-3 text-sm bg-blue-400 text-white rounded hover:bg-blue-500"
                >
                  Copy
                </button>
              </div>
            </div>  
          )}{" "}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* footer content */}
      </footer>
    </div>
  );
}
