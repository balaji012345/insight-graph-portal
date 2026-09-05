import { Link } from "@tanstack/react-router";
import { ChevronRight, Filter, MapPin, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  CASE_STATUS_LABEL,
  CRIME_TYPES,
  DISTRICTS,
  caseDurationLabel,
  caseRecords,
  initials,
  type CaseStatus,
} from "@/data/case-records";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ANY = "any";

const statusStyles: Record<CaseStatus, string> = {
  active: "border-success/40 bg-success/15 text-success",
  under_investigation: "border-warning/40 bg-warning/15 text-warning",
  closed: "border-border bg-secondary text-muted-foreground",
};

export function DatabaseModule() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>(ANY);
  const [district, setDistrict] = useState<string>(ANY);
  const [crimeType, setCrimeType] = useState<string>(ANY);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const activeFilters = [status, district, crimeType].filter((v) => v !== ANY).length + (from ? 1 : 0) + (to ? 1 : 0);

  const records = useMemo(() => {
    const q = query.trim().toLowerCase();
    return caseRecords.filter((r) => {
      const matchesQuery =
        !q ||
        r.full_name.toLowerCase().includes(q) ||
        r.fir_number.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);
      const matchesStatus = status === ANY || r.status === status;
      const matchesDistrict = district === ANY || r.district === district;
      const matchesCrime = crimeType === ANY || r.crime_type === crimeType;
      const matchesFrom = !from || r.opened_on >= from;
      const matchesTo = !to || r.opened_on <= to;
      return matchesQuery && matchesStatus && matchesDistrict && matchesCrime && matchesFrom && matchesTo;
    });
  }, [query, status, district, crimeType, from, to]);

  const resetFilters = () => {
    setStatus(ANY);
    setDistrict(ANY);
    setCrimeType(ANY);
    setFrom("");
    setTo("");
  };

  return (
    <section className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-xl font-bold uppercase tracking-wide sm:text-2xl">Database</h1>
        <p className="text-sm text-muted-foreground">
          Search and filter criminal case records sourced from FIRs, CDRs and investigation files.
        </p>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, FIR number or case ID"
            aria-label="Search records by name, FIR number or case ID"
            className="pl-9"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="h-4 w-4" />
              Filter
              {activeFilters > 0 && (
                <span className="ml-1 rounded-full bg-gold px-1.5 text-[11px] font-bold text-gold-foreground">
                  {activeFilters}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 space-y-4">
            <div className="space-y-2">
              <Label>Case status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any status</SelectItem>
                  {(Object.keys(CASE_STATUS_LABEL) as CaseStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>{CASE_STATUS_LABEL[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>District</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any district</SelectItem>
                  {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Crime type</Label>
              <Select value={crimeType} onValueChange={setCrimeType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any crime type</SelectItem>
                  {CRIME_TYPES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="from">FIR from</Label>
                <Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">FIR to</Label>
                <Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={resetFilters} className="w-full">
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <p className="text-xs text-muted-foreground">
        {records.length} of {caseRecords.length} records
      </p>

      <ul className="space-y-2">
        {records.map((record) => (
          <li key={record.id}>
            <Link
              to="/console/records/$recordId"
              params={{ recordId: record.id }}
              className="panel-official flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:border-gold/50 sm:gap-4 sm:px-4"
            >
              <Avatar className="h-11 w-11 shrink-0 ring-1 ring-gold/40">
                <AvatarFallback className="bg-secondary text-sm font-semibold text-gold">
                  {initials(record.full_name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="truncate font-semibold">{record.full_name}</p>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] uppercase tracking-wider", statusStyles[record.status])}
                  >
                    {CASE_STATUS_LABEL[record.status]}
                  </Badge>
                </div>
                <p className="mt-0.5 font-mono text-xs text-gold">{record.fir_number}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                  <span>{caseDurationLabel(record)}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {record.district}, {record.state}
                  </span>
                  <span className="hidden sm:inline">{record.crime_type}</span>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        ))}
        {records.length === 0 && (
          <li className="panel-official rounded-lg px-4 py-10 text-center text-sm text-muted-foreground">
            No records match the current search and filters.
          </li>
        )}
      </ul>
    </section>
  );
}
