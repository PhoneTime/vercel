/* iPad release year and Apple model numbers (Axxxx), as printed on the back of the iPad.
   Source: EveryMac all iPad model numbers. */
export const IPAD: Record<string, [number, string[]]> = {
  "iPad (1st gen)": [2010, ["A1219", "A1337"]],
  "iPad 2": [2011, ["A1395", "A1396", "A1397"]],
  "iPad (3rd gen)": [2012, ["A1416", "A1430", "A1403"]],
  "iPad (4th gen)": [2012, ["A1458", "A1459", "A1460"]],
  "iPad (5th gen)": [2017, ["A1822", "A1823"]],
  "iPad (6th gen)": [2018, ["A1893", "A1954"]],
  "iPad (7th gen)": [2019, ["A2197", "A2198", "A2199", "A2200"]],
  "iPad (8th gen)": [2020, ["A2270", "A2428", "A2429", "A2430"]],
  "iPad (9th gen)": [2021, ["A2602", "A2603", "A2604", "A2605"]],
  "iPad (10th gen)": [2022, ["A2696", "A2757", "A2777"]],
  "iPad (A16)": [2025, ["A3354", "A3355", "A3356"]],
  "iPad mini": [2012, ["A1432", "A1454", "A1455"]],
  "iPad mini 2": [2013, ["A1489", "A1490", "A1491"]],
  "iPad mini 3": [2014, ["A1599", "A1600", "A1601"]],
  "iPad mini 4": [2015, ["A1538", "A1550"]],
  "iPad mini (5th gen)": [2019, ["A2133", "A2124", "A2125", "A2126"]],
  "iPad mini (6th gen)": [2021, ["A2567", "A2568", "A2569"]],
  "iPad mini (A17 Pro)": [2024, ["A2993", "A2995", "A2996"]],
  "iPad mini (A20 Pro)": [2026, ["A3595", "A3596", "A3597"]],
  "iPad Air": [2013, ["A1474", "A1475", "A1476"]],
  "iPad Air 2": [2014, ["A1566", "A1567"]],
  "iPad Air (3rd gen)": [2019, ["A2152", "A2123", "A2153", "A2154"]],
  "iPad Air (4th gen)": [2020, ["A2316", "A2324", "A2325", "A2072"]],
  "iPad Air (5th gen)": [2022, ["A2588", "A2589", "A2591"]],
  "iPad Air 11\" (M2)": [2024, ["A2902", "A2903", "A2904"]],
  "iPad Air 13\" (M2)": [2024, ["A2898", "A2899", "A2900"]],
  "iPad Air 11\" (M3)": [2025, ["A3266", "A3267", "A3270"]],
  "iPad Air 13\" (M3)": [2025, ["A3268", "A3269", "A3271"]],
  "iPad Air 11\" (M4)": [2026, ["A3459", "A3460", "A3463"]],
  "iPad Air 13\" (M4)": [2026, ["A3461", "A3462", "A3464"]],
  "iPad Pro 9.7\"": [2016, ["A1673", "A1674", "A1675"]],
  "iPad Pro 12.9\" (1st gen)": [2015, ["A1584", "A1652"]],
  "iPad Pro 10.5\"": [2017, ["A1701", "A1709"]],
  "iPad Pro 12.9\" (2nd gen)": [2017, ["A1670", "A1671"]],
  "iPad Pro 11\" (1st gen)": [2018, ["A1980", "A2013", "A1934", "A1979"]],
  "iPad Pro 12.9\" (3rd gen)": [2018, ["A1876", "A2014", "A1895", "A1983"]],
  "iPad Pro 11\" (2nd gen)": [2020, ["A2228", "A2068", "A2230", "A2231"]],
  "iPad Pro 12.9\" (4th gen)": [2020, ["A2229", "A2069", "A2232", "A2233"]],
  "iPad Pro 11\" (3rd gen)": [2021, ["A2377", "A2301", "A2459", "A2460"]],
  "iPad Pro 12.9\" (5th gen)": [2021, ["A2378", "A2379", "A2461", "A2462"]],
  "iPad Pro 11\" (4th gen)": [2022, ["A2759", "A2435", "A2761", "A2762"]],
  "iPad Pro 12.9\" (6th gen)": [2022, ["A2436", "A2764", "A2437", "A2766"]],
  "iPad Pro 11\" (M4)": [2024, ["A2836", "A2837", "A3006"]],
  "iPad Pro 13\" (M4)": [2024, ["A2925", "A2926", "A3007"]],
  "iPad Pro 11\" (M5)": [2025, ["A3357", "A3358", "A3359"]],
  "iPad Pro 13\" (M5)": [2025, ["A3360", "A3361", "A3362"]],
}

export const ipInfo = (m: string) => IPAD[m] || null
export const ipText = (m: string) => {
  const x = IPAD[m]
  return x ? `${x[0]} · ${x[1].join(", ")}` : ""
}
/* Match a model by name, release year or model number, e.g. "a2602" */
export const modelMatch = (m: string, q: string) => {
  const s = q.trim().toLowerCase().replace(/\s+/g, "")
  if (!s) return true
  if (m.toLowerCase().replace(/\s+/g, "").includes(s)) return true
  const x = IPAD[m]
  return !!x && (String(x[0]) === s || x[1].some((a) => a.toLowerCase().includes(s)))
}
