import RunningCalculatorForm from "@/components/RunningCalculatorForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'LObserver - Running Calories Burned Calculator',
  description: 'Calculate the calories burned during your runs with LeObserver\'s running calculator. Track your health and fitness easily.',
  authors: [{ name: "LObserver", url: "https://lobserver.com/" }],
}

export default function Home() {
  return (
    <>
      <RunningCalculatorForm/>
    </>
  );
}
