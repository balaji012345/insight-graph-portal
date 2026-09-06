/**
 * Mock dataset for the Database module.
 *
 * Shape mirrors a future `public.case_records` table so the UI can be
 * switched to live Supabase data without changing components.
 */

export type CaseStatus = "active" | "under_investigation" | "closed";

export interface CaseRecord {
  id: string;
  full_name: string;
  fir_number: string;
  status: CaseStatus;
  duration_days: number;
  district: string;
  state: string;
  crime_type: string;
  opened_on: string;
  closed_on?: string;
  punishment_type?: string;
  photo_url?: string;
}

export const CASE_STATUS_LABEL: Record<CaseStatus, string> = {
  active: "Active",
  under_investigation: "Under Investigation",
  closed: "Closed",
};

export const CRIME_TYPES = [
  "Theft",
  "Assault",
  "Fraud",
  "Cybercrime",
  "Homicide",
  "Drug-related",
  "Trafficking",
  "Organised Crime",
  "Financial Fraud",
  "Extortion",
  "Other",
] as const;

export const PUNISHMENT_TYPES = [
  "Imprisonment",
  "Fine",
  "Both",
  "Under Trial",
  "Acquitted",
  "Other",
] as const;

export const DISTRICTS = [
  "New Delhi",
  "Mumbai Suburban",
  "Pune",
  "Bengaluru Urban",
  "Hyderabad",
  "Lucknow",
  "Jaipur",
  "Kolkata",
] as const;

export const seedCaseRecords: CaseRecord[] = [
  {
    id: "rec-1",
    full_name: "Ramesh Kulkarni",
    fir_number: "FIR/2026/0142",
    status: "active",
    duration_days: 45,
    district: "Pune",
    state: "Maharashtra",
    crime_type: "Organised Crime",
    opened_on: "2026-07-22",
  },
  {
    id: "rec-2",
    full_name: "Anjali Deshmukh",
    fir_number: "FIR/2026/0287",
    status: "under_investigation",
    duration_days: 78,
    district: "Mumbai Suburban",
    state: "Maharashtra",
    crime_type: "Financial Fraud",
    opened_on: "2026-06-19",
  },
  {
    id: "rec-3",
    full_name: "Imran Sheikh",
    fir_number: "FIR/2026/0311",
    status: "closed",
    duration_days: 120,
    district: "Hyderabad",
    state: "Telangana",
    crime_type: "Drug-related",
    opened_on: "2026-05-08",
  },
  {
    id: "rec-4",
    full_name: "Priya Nair",
    fir_number: "FIR/2026/0398",
    status: "active",
    duration_days: 12,
    district: "Bengaluru Urban",
    state: "Karnataka",
    crime_type: "Cybercrime",
    opened_on: "2026-08-24",
  },
  {
    id: "rec-5",
    full_name: "Vikram Singh Rathore",
    fir_number: "FIR/2026/0455",
    status: "under_investigation",
    duration_days: 63,
    district: "Jaipur",
    state: "Rajasthan",
    crime_type: "Extortion",
    opened_on: "2026-07-04",
  },
  {
    id: "rec-6",
    full_name: "Sunita Yadav",
    fir_number: "FIR/2026/0512",
    status: "active",
    duration_days: 30,
    district: "Lucknow",
    state: "Uttar Pradesh",
    crime_type: "Trafficking",
    opened_on: "2026-08-06",
  },
  {
    id: "rec-7",
    full_name: "Arjun Mehta",
    fir_number: "FIR/2026/0587",
    status: "closed",
    duration_days: 210,
    district: "New Delhi",
    state: "Delhi",
    crime_type: "Financial Fraud",
    opened_on: "2026-02-09",
  },
  {
    id: "rec-8",
    full_name: "Debashish Banerjee",
    fir_number: "FIR/2026/0644",
    status: "under_investigation",
    duration_days: 95,
    district: "Kolkata",
    state: "West Bengal",
    crime_type: "Organised Crime",
    opened_on: "2026-06-02",
  },
  {
    id: "rec-9",
    full_name: "Farhan Qureshi",
    fir_number: "FIR/2026/0701",
    status: "active",
    duration_days: 7,
    district: "New Delhi",
    state: "Delhi",
    crime_type: "Cybercrime",
    opened_on: "2026-08-29",
  },
  {
    id: "rec-10",
    full_name: "Lakshmi Iyer",
    fir_number: "FIR/2026/0768",
    status: "closed",
    duration_days: 150,
    district: "Bengaluru Urban",
    state: "Karnataka",
    crime_type: "Drug-related",
    opened_on: "2026-04-08",
  },
];

/** Working dataset used by the UI (swap for live data later). */
export const caseRecords: CaseRecord[] = [...seedCaseRecords];

export function caseDurationLabel(record: CaseRecord): string {
  const prefix = record.status === "closed" ? "Closed" : "Ongoing";
  return `${prefix} - ${record.duration_days} days`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
