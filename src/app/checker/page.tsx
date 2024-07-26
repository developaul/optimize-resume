"use client";
import MatchChart from "./components/MatchChart";
import AnalysisTable from "./components/AnalysisTable";
import ImportantToKnow from "./components/ImportantToKnow";
import Recomendations from "./components/Recomendations";
import Suggestions from "./components/Suggestions";
import ActionFooter from "./components/ActionFooter";
import { Separator } from "@/components/ui/separator";

export default function Checker() {
  const isLoading = false;

  return (
    <div className="bg-gray-50 p-4 h-screen overflow-auto">
      <div className="w-full max-w-screen-2xl m-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <section className="flex flex-1 flex-col gap-4">
            <MatchChart isLoading={isLoading} />
            <AnalysisTable isLoading={isLoading} />
            <ImportantToKnow isLoading={isLoading} />
          </section>
          <Separator orientation="vertical" className="h-100" />
          <section className="flex flex-1 flex-col gap-4">
            <Recomendations isLoading={isLoading} />
            <Suggestions isLoading={isLoading} />
          </section>
        </div>
        <ActionFooter isLoading={isLoading} />
      </div>
    </div>
  );
}
