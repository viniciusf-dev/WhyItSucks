"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import ProblemMeter from "./problem-meter";
import ProblemCategory from "./problem-category";
import TopComplaints from "./top-complaints";

type GameResultsProps = {
  gameName: string;
};

const GameResults = ({ gameName }: GameResultsProps) => {
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [animatedText, setAnimatedText] = useState("");
  const [textComplete, setTextComplete] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("steamSearchData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        if (parsedData.summary) {
          const summaryParsed = JSON.parse(parsedData.summary);
          setSummaryData(summaryParsed);
        } else {
          setSummaryData(null);
        }
      } catch (err) {
        console.error("Failed to fetch localStorage data:", err);
        setSummaryData(null);
      }
    } else {

      setSummaryData(null);
    }

    setLoading(false);
  }, []);


  useEffect(() => {
    if (!summaryData || textComplete) return;

    const text = summaryData.problemSummary ?? "No available summary...";
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setAnimatedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTextComplete(true);
      }
    }, 10);

    return () => clearInterval(typingInterval);
  }, [summaryData, textComplete]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!summaryData) {
    return (
      <p>
        No data found for "
        <strong>{gameName}</strong>". Maybe you are acessing results page
        directly instead of fetching for a game.
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 mt-6">
          <h2 className="font-pixel text-2xl md:text-3xl text-retro-purple mb-2">
            {gameName}
          </h2>
          <div className="w-full h-1 bg-retro-purple my-4"></div>
        </div>

        <div className="lg:col-span-3">
          <ProblemMeter level={summaryData.problemLevel || 0} />
        </div>

        <div className="lg:col-span-3">
          <div className="pixel-card bg-retro-darkGray p-4 mb-6">
            <h3 className="font-pixel text-white text-xl mb-3 flex items-center">
              <Quote size={20} className="text-retro-purple mr-2" />
              Problem Summary
            </h3>
            <p className="font-pixel-secondary text-lg text-white leading-relaxed">
              {animatedText}
              {!textComplete && <span className="animate-blink">_</span>}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ProblemCategory categories={summaryData.problemCategories || []} />
        </div>

        <div className="lg:col-span-1">
          <TopComplaints complaints={summaryData.topComplaints || []} />
        </div>
      </div>
    </div>
  );
};

export default GameResults;
