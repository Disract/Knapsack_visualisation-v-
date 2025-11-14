"use client"

import { useEffect, useState } from "react"
import "./visual-knapsack.css"

export default function VisualKnapsack({ capacity, items, chosenItems, isAnimating }) {
  const [displayedItems, setDisplayedItems] = useState([])
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    setDisplayedItems(chosenItems.map((item, idx) => ({ ...item, id: `${item.name}-${idx}` })))
    const weight = chosenItems.reduce((sum, item) => sum + (item.weight || 0), 0)
    const value = chosenItems.reduce((sum, item) => sum + (item.value || 0), 0)
    setTotalWeight(weight)
    setTotalValue(value)
  }, [chosenItems])

  const capacityPercentage = (totalWeight / capacity) * 100

  return (
    <div className="visual-knapsack">
      <div className="knapsack-container">
        {/* Knapsack background */}
        <div className="knapsack-background">
          <div className="knapsack-fill" style={{ height: `${Math.min(capacityPercentage, 100)}%` }}>
            {displayedItems.map((item, idx) => (
              <div
                key={item.id}
                className="knapsack-item"
                style={{
                  backgroundColor: getItemColor(idx),
                  animationDelay: `${idx * 0.15}s`,
                }}
              >
                <div className="item-label">{item.name}</div>
                <div className="item-value">
                  W:{item.weight} V:{item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capacity marker */}
        <div className="capacity-marker">Max: {capacity}</div>
      </div>

      {/* Stats display */}
      <div className="knapsack-stats">
        <div className="stat">
          <span className="stat-label">Total Weight:</span>
          <span className="stat-value">
            {totalWeight} / {capacity}
          </span>
          <div className="stat-bar">
            <div className="stat-bar-fill" style={{ width: `${capacityPercentage}%` }}></div>
          </div>
        </div>
        <div className="stat">
          <span className="stat-label">Total Value:</span>
          <span className="stat-value">{totalValue}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Items:</span>
          <span className="stat-value">{displayedItems.length}</span>
        </div>
      </div>
    </div>
  )
}

function getItemColor(index) {
  const colors = [
    "#FF6B6B", // red
    "#4ECDC4", // teal
    "#45B7D1", // blue
    "#FFA07A", // light salmon
    "#98D8C8", // mint
    "#F7DC6F", // yellow
    "#BB8FCE", // purple
    "#85C1E2", // light blue
  ]
  return colors[index % colors.length]
}
