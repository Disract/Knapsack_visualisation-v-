"use client"

import "./pseudocode-panel.css"

const PSEUDOCODE = [
  { line: "1", code: "function knapsack(items, W):" },
  { line: "2", code: "    n ← length(items)" },
  { line: "3", code: "    dp[0...n][0...W] ← 0" },
  { line: "4", code: "" },
  { line: "5", code: "    for i ← 1 to n:" },
  { line: "6", code: "        for w ← 1 to W:" },
  { line: "7", code: "            if items[i-1].weight ≤ w:" },
  { line: "8", code: "                val_without ← dp[i-1][w]" },
  { line: "9", code: "                val_with ← dp[i-1][w-weight] + value" },
  { line: "10", code: "                dp[i][w] ← max(val_without, val_with)" },
  { line: "11", code: "            else:" },
  { line: "12", code: "                dp[i][w] ← dp[i-1][w]" },
  { line: "13", code: "" },
  { line: "14", code: "    return backtrack(dp, items, W)" },
]

function getHighlightedLine(fillStep, totalSteps, backtrackIndex, n, W) {
  if (fillStep === 0) return -1

  if (fillStep <= 2) {
    return fillStep - 1 // Lines 0-2 (init)
  }

  if (fillStep > 2) {
    const loopStep = fillStep - 3
    // Map to lines 5-12 (the main loop)
    const lineInLoop = loopStep % 8
    return 4 + lineInLoop // Lines 4-12
  }

  return -1
}

const EXPLANATIONS = {
  "-1": "Click 'Init' to initialize the DP table, then press 'Play' or 'Next' to begin.",
  "0": "Start the knapsack algorithm with item list and capacity W",
  "1": "Count the total number of items (n)",
  "2": "Create DP table: rows = items (0 to n), columns = weights (0 to W)",
  "3": "",
  "4": "Loop through each item from 1 to n",
  "5": "For each item, check all possible weights from 1 to capacity",
  "6": "Check if the current item's weight fits",
  "7": "Calculate value if we DON'T take this item (from row above)",
  "8": "Calculate value if we DO take this item (add its value)",
  "9": "Store the maximum value in the DP table",
  "10": "Item doesn't fit, so copy value from previous item",
  "11": "",
  "12": "Trace back through the table to find which items were selected",
  "backtrack": "Finding the selected items by tracing backwards through decisions",
}

export default function PseudocodePanel({ currentPhase, fillStep, totalSteps, currentFillCoords, backtrackIndex, n, W }) {
  const highlightedLineIndex = getHighlightedLine(fillStep, totalSteps, backtrackIndex, n, W)
  const explanation =
    currentPhase === "fill"
      ? EXPLANATIONS[String(highlightedLineIndex)]
      : EXPLANATIONS["backtrack"]

  return (
    <div className="pseudocode-container">
      <div className="pseudocode-header">
        <h3>Algorithm</h3>
        <span className={`phase-label ${currentPhase}`}>{currentPhase === "fill" ? "Filling" : "Backtrack"}</span>
      </div>

      <div className="pseudocode-lines">
        {PSEUDOCODE.map((item, idx) => (
          <div
            key={idx}
            className={`pseudocode-line ${highlightedLineIndex === idx ? "highlighted" : ""}`}
            data-line={item.line}
          >
            <span className="line-number">{item.line}</span>
            <code className="line-code">{item.code}</code>
          </div>
        ))}
      </div>

      <div className="explanation-panel">
        <h4>Step</h4>
        <p className="explanation-text">{explanation || "—"}</p>
        {currentPhase === "fill" && fillStep > 0 && currentFillCoords && (
          <div className="step-info">
            <div className="info-item">
              <span className="info-label">Row (Item):</span>
              <span className="info-value">{currentFillCoords.i}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Col (Weight):</span>
              <span className="info-value">{currentFillCoords.w}</span>
            </div>
          </div>
        )}
        {currentPhase === "backtrack" && (
          <div className="step-info">
            <span className="info-label">Tracing solution...</span>
          </div>
        )}
      </div>
    </div>
  )
}
