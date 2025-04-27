"use client" // Keep this directive for App Router client components

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Assuming these paths are correct for your project
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { CheckCircleIcon } from "lucide-react"

// --- Updated Phone repair price data ---
const repairPrices = {
  iPhone: {
    // --- NEW iPhone 16 Series (Estimated Prices) ---
    "iPhone 16 Pro Max": {
      "Screen Replacement": 409, "Battery Replacement": 159, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 249,
    },
    "iPhone 16 Pro": {
      "Screen Replacement": 389, "Battery Replacement": 159, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 239,
    },
    "iPhone 16 Plus": {
      "Screen Replacement": 279, "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 219,
    },
    "iPhone 16": {
      "Screen Replacement": 269, "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 99, "Back Glass Repair": 209,
    },
    // --- End NEW iPhone 16 Series ---
    "iPhone 15 Pro Max": {
      "Screen Replacement": 389, "Battery Replacement": 149, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 229,
    },
    "iPhone 15 Pro": {
      "Screen Replacement": 369, "Battery Replacement": 149, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 219,
    },
    "iPhone 15 Plus": {
      "Screen Replacement": 259, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 209,
    },
    "iPhone 15": {
      "Screen Replacement": 249, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 199,
    },
    "iPhone 14 Pro Max": {
      "Screen Replacement": 369, "Battery Replacement": 139, "Charging Port Repair": 109, "Water Damage Treatment": 89, "Back Glass Repair": 219,
    },
    "iPhone 14 Pro": {
      "Screen Replacement": 349, "Battery Replacement": 139, "Charging Port Repair": 109, "Water Damage Treatment": 89, "Back Glass Repair": 209,
    },
    "iPhone 14 Plus": {
      "Screen Replacement": 249, "Battery Replacement": 129, "Charging Port Repair": 109, "Water Damage Treatment": 89, "Back Glass Repair": 199,
    },
    "iPhone 14": {
      "Screen Replacement": 229, "Battery Replacement": 129, "Charging Port Repair": 109, "Water Damage Treatment": 89, "Back Glass Repair": 189,
    },
    "iPhone 13 Pro Max": {
      "Screen Replacement": 289, "Battery Replacement": 129, "Charging Port Repair": 99, "Water Damage Treatment": 89, "Back Glass Repair": 199,
    },
    "iPhone 13 Pro": {
      "Screen Replacement": 279, "Battery Replacement": 129, "Charging Port Repair": 99, "Water Damage Treatment": 89, "Back Glass Repair": 189,
    },
    "iPhone 13": {
      "Screen Replacement": 229, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 89, "Back Glass Repair": 179,
    },
    "iPhone 13 Mini": {
      "Screen Replacement": 219, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 89, "Back Glass Repair": 169,
    },
    "iPhone 12 Pro Max": {
      "Screen Replacement": 239, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 89, "Back Glass Repair": 179,
    },
    "iPhone 12 Pro": {
      "Screen Replacement": 229, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 89, "Back Glass Repair": 169,
    },
    "iPhone 12": {
      "Screen Replacement": 219, "Battery Replacement": 109, "Charging Port Repair": 89, "Water Damage Treatment": 99, "Back Glass Repair": 159,
    },
    "iPhone 12 Mini": {
      "Screen Replacement": 199, "Battery Replacement": 109, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 149,
    },
    "iPhone 11 Pro Max": {
      "Screen Replacement": 189, "Battery Replacement": 109, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 159,
    },
    "iPhone 11 Pro": {
      "Screen Replacement": 179, "Battery Replacement": 109, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 149,
    },
    "iPhone 11": {
      "Screen Replacement": 159, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 139,
    },
    "iPhone XS Max": {
      "Screen Replacement": 149, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 149,
    },
    "iPhone XS": {
      "Screen Replacement": 139, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 139,
    },
    "iPhone XR": {
      "Screen Replacement": 129, "Battery Replacement": 89, "Charging Port Repair": 89, "Water Damage Treatment": 99, "Back Glass Repair": 129,
    },
    "iPhone X": {
      "Screen Replacement": 139, "Battery Replacement": 89, "Charging Port Repair": 89, "Water Damage Treatment": 99, "Back Glass Repair": 139,
    },
    "iPhone 8 Plus": {
      "Screen Replacement": 129, "Battery Replacement": 79, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 99,
    },
    "iPhone 8": {
      "Screen Replacement": 119, "Battery Replacement": 79, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 89,
    },
    "iPhone 7 Plus": {
      "Screen Replacement": 109, "Battery Replacement": 69, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 129,
    },
    "iPhone 7": {
      "Screen Replacement": 99, "Battery Replacement": 69, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 129,
    },
    "iPhone 6s Plus": {
      "Screen Replacement": 99, "Battery Replacement": 69, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 119,
    },
    "iPhone 6s": {
      "Screen Replacement": 99, "Battery Replacement": 69, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 109,
    },
    "iPhone 6 Plus": {
      "Screen Replacement": 99, "Battery Replacement": 69, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 109,
    },
    "iPhone 6": {
      "Screen Replacement": 99, "Battery Replacement": 69, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 109,
    },
    "iPhone SE (3rd gen)": {
      "Screen Replacement": 129, "Battery Replacement": 99, "Charging Port Repair": 119, "Water Damage Treatment": 89, "Back Glass Repair": 149,
    },
    "iPhone SE (2nd gen)": {
      "Screen Replacement": 119, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 89, "Back Glass Repair": 149,
    },
    "iPhone SE (1st gen)": {
      "Screen Replacement": 109, "Battery Replacement": 89, "Charging Port Repair": 109, "Water Damage Treatment": 89, "Back Glass Repair": 149,
    },
  },
  iPad: {
    "iPad Pro 12.9-inch (6th gen)": {
      "Screen Replacement": 499, "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 199, "Back Glass Repair": 249,
    },
    "iPad Pro 12.9-inch (5th gen)": {
      "Screen Replacement": 479, "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 199, "Back Glass Repair": 229,
    },
    "iPad Pro 11-inch (4th gen)": {
      "Screen Replacement": 429, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 189, "Back Glass Repair": 199,
    },
    "iPad Pro 11-inch (3rd gen)": {
      "Screen Replacement": 399, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 189, "Back Glass Repair": 189,
    },
    "iPad Air (5th gen)": {
      "Screen Replacement": 349, "Battery Replacement": 129, "Charging Port Repair": 109, "Water Damage Treatment": 179, "Back Glass Repair": 169,
    },
    "iPad Air (4th gen)": {
      "Screen Replacement": 329, "Battery Replacement": 129, "Charging Port Repair": 109, "Water Damage Treatment": 179, "Back Glass Repair": 159,
    },
    "iPad (10th gen)": {
      "Screen Replacement": 299, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 169, "Back Glass Repair": 149,
    },
    "iPad (9th gen)": {
      "Screen Replacement": 279, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 169, "Back Glass Repair": 139,
    },
    "iPad mini (6th gen)": {
      "Screen Replacement": 299, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 169, "Back Glass Repair": 149,
    },
    "iPad mini (5th gen)": {
      "Screen Replacement": 279, "Battery Replacement": 109, "Charging Port Repair": 99, "Water Damage Treatment": 159, "Back Glass Repair": 139,
    },
  },
  Samsung: {
    // S Series
    "Galaxy S25 Ultra": {
      "Screen Replacement": 529, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S25+": {
      "Screen Replacement": 389, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S25": {
      "Screen Replacement": 349, "Battery Replacement": 139, "Charging Port Repair": 119, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S24 Ultra": {
      "Screen Replacement": 509, "Battery Replacement": 129, "Charging Port Repair": 109, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S24+": {
      "Screen Replacement": 379, "Battery Replacement": 129, "Charging Port Repair": 109, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S24": {
      "Screen Replacement": 339, "Battery Replacement": 119, "Charging Port Repair": 109, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S23 Ultra": {
      "Screen Replacement": 499, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S23+": {
      "Screen Replacement": 359, "Battery Replacement": 119, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S23": {
      "Screen Replacement": 329, "Battery Replacement": 109, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S22 Ultra": {
      "Screen Replacement": 479, "Battery Replacement": 109, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S22+": {
      "Screen Replacement": 339, "Battery Replacement": 109, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S22": {
      "Screen Replacement": 309, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S21 Ultra": {
      "Screen Replacement": 409, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S21+": {
      "Screen Replacement": 279, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S21": {
      "Screen Replacement": 279, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S21 FE": {
      "Screen Replacement": 219, "Battery Replacement": 89, "Charging Port Repair": 89, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S20 Ultra": {
      "Screen Replacement": 379, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S20+": {
      "Screen Replacement": 339, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S20": {
      "Screen Replacement": 319, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy S20 FE": {
      "Screen Replacement": 229, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy S10+": {
      "Screen Replacement": 359, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy S10": {
      "Screen Replacement": 329, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy S10e": {
      "Screen Replacement": 309, "Battery Replacement": 89, "Charging Port Repair": 99, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },

    // A Series
    // --- NEW Samsung A Series (Estimated Prices) ---
     "Galaxy A56": {
      "Screen Replacement": 219, "Battery Replacement": 89, "Charging Port Repair": 89, "Water Damage Treatment": 109, "Back Glass Repair": 99,
    },
     "Galaxy A55": {
      "Screen Replacement": 209, "Battery Replacement": 89, "Charging Port Repair": 79, "Water Damage Treatment": 109, "Back Glass Repair": 89,
    },
    "Galaxy A36": {
      "Screen Replacement": 199, "Battery Replacement": 89, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy A35": {
      "Screen Replacement": 189, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
     "Galaxy A25": {
      "Screen Replacement": 189, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy A16": {
      "Screen Replacement": 179, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 89, "Back Glass Repair": 89,
    },
    // --- End NEW Samsung A Series ---
    "Galaxy A54": {
      "Screen Replacement": 199, "Battery Replacement": 79, "Charging Port Repair": 69, "Water Damage Treatment": 109, "Back Glass Repair": 79,
    },
    "Galaxy A53": {
      "Screen Replacement": 189, "Battery Replacement": 79, "Charging Port Repair": 69, "Water Damage Treatment": 109, "Back Glass Repair": 79,
    },
    "Galaxy A52": {
      "Screen Replacement": 189, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 99, "Back Glass Repair": 79,
    },
    "Galaxy A51": {
      "Screen Replacement": 189, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 99, "Back Glass Repair": 79,
    },
    "Galaxy A34": {
      "Screen Replacement": 179, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 99, "Back Glass Repair": 79,
    },
    "Galaxy A33": {
      "Screen Replacement": 179, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 99, "Back Glass Repair": 79,
    },
    "Galaxy A32": {
      "Screen Replacement": 179, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 89, "Back Glass Repair": 79,
    },
    "Galaxy A23": {
      "Screen Replacement": 169, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 89, "Back Glass Repair": 79,
    },
    "Galaxy A22": {
      "Screen Replacement": 169, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 89, "Back Glass Repair": 79,
    },
    "Galaxy A14": {
      "Screen Replacement": 169, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 89, "Back Glass Repair": 79,
    },
    "Galaxy A13": {
      "Screen Replacement": 169, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 89, "Back Glass Repair": 79,
    },
    "Galaxy A12": {
      "Screen Replacement": 159, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 79, "Back Glass Repair": 79,
    },

    // Note Series
    "Galaxy Note 20 Ultra": {
      "Screen Replacement": 289, "Battery Replacement": 89, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy Note 20": {
      "Screen Replacement": 269, "Battery Replacement": 89, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy Note 10+": {
      "Screen Replacement": 259, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 99,
    },
    "Galaxy Note 10": {
      "Screen Replacement": 239, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 89,
    },
    "Galaxy Note 9": {
      "Screen Replacement": 229, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 99, "Back Glass Repair": 79,
    },
    "Galaxy Note 8": {
      "Screen Replacement": 169, "Battery Replacement": 69, "Charging Port Repair": 69, "Water Damage Treatment": 99, "Back Glass Repair": 79,
    },
  },
  Google: {
     // --- NEW/Updated Google Pixel Models (Prices as requested/estimated) ---
    "Pixel Fold 9": {
      "Screen Replacement": 699, // <-- UPDATED PRICE
      "Battery Replacement": 149, "Charging Port Repair": 129, "Water Damage Treatment": 199, "Back Glass Repair": 199,
    },
    "Pixel 9 Pro XL": {
      "Screen Replacement": 519, // <-- UPDATED PRICE
      "Battery Replacement": 129, "Charging Port Repair": 119, "Water Damage Treatment": 159, "Back Glass Repair": 149,
    },
     "Pixel 9 Pro": {
      "Screen Replacement": 499, // <-- UPDATED PRICE
      "Battery Replacement": 129, "Charging Port Repair": 119, "Water Damage Treatment": 159, "Back Glass Repair": 139,
    },
     "Pixel 9": {
      "Screen Replacement": 329, "Battery Replacement": 119, "Charging Port Repair": 119, "Water Damage Treatment": 159, "Back Glass Repair": 129,
    },
     "Pixel 8 Pro": {
      "Screen Replacement": 399, // <-- UPDATED PRICE
      "Battery Replacement": 119, "Charging Port Repair": 109, "Water Damage Treatment": 149, "Back Glass Repair": 129,
    },
    "Pixel 8a": { // <-- NEW MODEL
      "Screen Replacement": 279, // <-- UPDATED PRICE
      "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 129, "Back Glass Repair": 99,
    },
    "Pixel 8": {
      "Screen Replacement": 309, "Battery Replacement": 109, "Charging Port Repair": 109, "Water Damage Treatment": 149, "Back Glass Repair": 119,
    },
     // --- End NEW Google Pixel Models ---
    "Pixel 7 Pro": {
      "Screen Replacement": 299, "Battery Replacement": 109, "Charging Port Repair": 99, "Water Damage Treatment": 139, "Back Glass Repair": 119,
    },
    "Pixel 7": {
      "Screen Replacement": 289, "Battery Replacement": 99, "Charging Port Repair": 99, "Water Damage Treatment": 139, "Back Glass Repair": 109,
    },
    "Pixel 6 Pro": {
      "Screen Replacement": 279, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 129, "Back Glass Repair": 109,
    },
    "Pixel 6": {
      "Screen Replacement": 269, "Battery Replacement": 99, "Charging Port Repair": 89, "Water Damage Treatment": 129, "Back Glass Repair": 99,
    },
    "Pixel 6a": {
      "Screen Replacement": 269, "Battery Replacement": 99, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 89,
    },
    "Pixel 5": {
      "Screen Replacement": 249, "Battery Replacement": 99, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 89,
    },
    "Pixel 4 XL": {
      "Screen Replacement": 249, "Battery Replacement": 79, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 89,
    },
    "Pixel 4": {
      "Screen Replacement": 249, "Battery Replacement": 99, "Charging Port Repair": 79, "Water Damage Treatment": 119, "Back Glass Repair": 79,
    },
  },
} // End of repairPrices object
// --- End Updated Phone repair price data ---


// --- React Component Definition ---
export default function PriceCheck() {
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [selectedRepair, setSelectedRepair] = useState("")

  // Logic to get brands, models, repairs based on state
  // Type assertion added for safety, assuming structure is known
  const brands = Object.keys(repairPrices)
  const models = brand ? Object.keys(repairPrices[brand as keyof typeof repairPrices]) : []
  const repairs = brand && model ? Object.keys(repairPrices[brand as keyof typeof repairPrices][model as keyof typeof repairPrices[keyof typeof repairPrices]]) : []

  // Logic to get price based on state
  const price = brand && model && selectedRepair
    ? repairPrices[brand as keyof typeof repairPrices]
                  [model as keyof typeof repairPrices[keyof typeof repairPrices]]
                  [selectedRepair as keyof typeof repairPrices[keyof typeof repairPrices][keyof typeof repairPrices[keyof typeof repairPrices]]]
    : null

  // Handler functions remain the same
  const handleBrandChange = (value: string) => {
    setBrand(value)
    setModel("")
    setSelectedRepair("")
  }

  const handleModelChange = (value: string) => {
    setModel(value)
    setSelectedRepair("")
  }

  // JSX Structure remains the same as your original code
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-teal-500 mb-6">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Phone Repair Price Checker</CardTitle>
            <CardDescription>Select your phone brand and model to see our repair prices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Brand</label>
              <Select value={brand} onValueChange={handleBrandChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {brand && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Model</label>
                <Select value={model} onValueChange={handleModelChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {brand && model && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Repair Type</label>
                <Select value={selectedRepair} onValueChange={setSelectedRepair}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repair type" />
                  </SelectTrigger>
                  <SelectContent>
                    {repairs.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {price !== null && (
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Repair Price</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-600">
                      {brand} {model}
                    </p>
                    <p className="font-medium">{selectedRepair}</p>
                  </div>
                  <div className="text-2xl font-bold text-teal-500">${price}</div>
                  {/* NOTE: The logic to display "(Full original)" is NOT included here, as requested */}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setBrand("")
                setModel("")
                setSelectedRepair("")
              }}
            >
              Reset
            </Button>
            {price !== null && (
              <Link
                href={{
                  pathname: "/appointment", // Ensure this path is correct for your project
                  query: { brand, model, repair: selectedRepair, price },
                }}
              >
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  Book Repair
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        {/* About section remains the same */}
        <div className="mt-8 bg-slate-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">About Our Repair Services</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span>All repairs include a 90-day warranty</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span>We use high-quality replacement parts</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span>Most repairs are completed the same day</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
              <span>Free diagnostic with any repair</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
// --- End React Component Definition ---