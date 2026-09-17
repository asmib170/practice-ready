"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  MapPin,
  Music2,
  Search,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Screen =
  | "home"
  | "date"
  | "mpr"
  | "slots2"
  | "slots3"
  | "slots4"
  | "setup2"
  | "setup3"
  | "setup4"
  | "issues3"
  | "mixer-search"
  | "stand-search"
  | "slots5"
  | "setup5"
  | "issues5"
  | "review"
  | "recheck"
  | "success"
  | "conflict"
  | "directory-search"
  | "directory-browse"
  | "directory-results";

type Equipment = {
  id: string;
  name: string;
  defaultLocation?: string;
  currentLocation: string;
  condition: string;
  status: "ready" | "away" | "attention" | "service" | "missing";
};

const drumPartDefinitions = [
  ["KICK", "Kick drum"],
  ["SNARE", "Snare drum"],
  ["RACK-TOM", "Rack tom"],
  ["FLOOR-TOM", "Floor tom"],
  ["HIHAT", "Hi-hat cymbals"],
  ["CRASH", "Crash cymbal"],
  ["RIDE", "Ride cymbal"],
  ["KICK-PEDAL", "Kick pedal"],
  ["HIHAT-STAND", "Hi-hat stand"],
  ["CYMBAL-STAND", "Cymbal stand"],
  ["THRONE", "Drum throne"],
] as const;

const drumSetParts = (
  prefix: string,
  location: string,
  model: string,
  overrides: Record<string, Partial<Equipment>> = {},
): Equipment[] =>
  drumPartDefinitions.map(([suffix, name]) => ({
    id: `${prefix}-${suffix}`,
    name: `${model} ${name.toLowerCase()}`,
    currentLocation: location,
    condition: "Fully functional",
    status: "ready",
    ...overrides[suffix],
  }));

const numberedEquipment = (
  prefix: string,
  name: string,
  count: number,
  location: string,
): Equipment[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    name: `${name} ${i + 1}`,
    currentLocation: location,
    condition: "Fully functional",
    status: "ready",
  }));

const mpr3: Equipment[] = [
  {
    id: "KEY-01",
    name: "Yamaha P-125 digital piano",
    currentLocation: "MPR 3",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "MIX-01",
    name: "Yamaha MG10XU mixer",
    currentLocation: "Arts Block A",
    condition: "Fully functional",
    status: "away",
  },
  ...numberedEquipment("MON-03", "JBL 305P MkII monitor speaker", 2, "MPR 3"),
  ...numberedEquipment("XLR-03", "Mogami Gold Studio XLR cable", 4, "MPR 3"),
  ...numberedEquipment(
    "INST-03",
    "Fender Professional Series instrument cable",
    4,
    "MPR 3",
  ),
  ...numberedEquipment(
    "MON-CBL-03",
    "Hosa CSS-110 balanced TRS cable",
    2,
    "MPR 3",
  ),
  {
    id: "MIX-PWR-01",
    name: "Yamaha MG10XU power adapter",
    currentLocation: "MPR 3",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "MIC-01",
    name: "Shure SM58 microphone",
    currentLocation: "MPR 3",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "MS-01",
    name: "K&M 210/9 boom microphone stand",
    currentLocation: "MP Lab 1",
    condition: "Fully functional",
    status: "away",
  },
  ...drumSetParts("DRM-01", "MPR 3", "Pearl Export"),
];

const mpr2: Equipment[] = [
  {
    id: "KEY-02",
    name: "Roland FP-30X digital piano",
    currentLocation: "MPR 2",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "TAN-02",
    name: "Radel Saarang electronic tanpura",
    currentLocation: "MPR 2",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "HAR-02",
    name: "Bina No. 23 harmonium",
    currentLocation: "MPR 2",
    condition: "Fully functional",
    status: "ready",
  },
];

const mpr4: Equipment[] = [
  {
    id: "KEY-04-01",
    name: "Yamaha P-45 digital piano",
    currentLocation: "MPR 4",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "KEY-04-02",
    name: "Yamaha P-125 digital piano",
    currentLocation: "MPR 4",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "KEY-04-03",
    name: "Casio Privia PX-S1100 digital piano",
    currentLocation: "MPR 4",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "KEY-04-04",
    name: "Roland FP-30X digital piano",
    currentLocation: "MPR 4",
    condition: "Fully functional",
    status: "ready",
  },
];

const mpr5: Equipment[] = [
  {
    id: "KEY-05",
    name: "Roland FP-30X digital piano",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "MIX-02",
    name: "Allen & Heath ZED-10FX mixer",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  ...drumSetParts("DRM-02", "MPR 5", "Mapex Tornado", {
    KICK: { condition: "Needs tuning", status: "attention" },
    SNARE: {
      currentLocation: "Unknown",
      condition: "Missing",
      status: "missing",
    },
    "RACK-TOM": { condition: "Needs tuning", status: "attention" },
    "FLOOR-TOM": { condition: "Needs tuning", status: "attention" },
  }),
  {
    id: "GTR-05",
    name: "Fender Player Stratocaster electric guitar",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "BAS-05-01",
    name: "Yamaha TRBX174 bass guitar",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "BAS-05-02",
    name: "Ibanez GSR200 bass guitar",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "BAS-05-03",
    name: "Squier Affinity Jazz Bass",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "BAMP-01",
    name: "Ampeg BA-210 bass amplifier",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "GAMP-01",
    name: "Boss Katana-50 MkII guitar amplifier",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "INST-05-01",
    name: "Fender Professional Series instrument cable",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "INST-05-02",
    name: "Fender Professional Series instrument cable",
    currentLocation: "Unknown",
    condition: "Unknown",
    status: "missing",
  },
  {
    id: "BAMP-PWR-01",
    name: "Ampeg BA-210 power cable",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "GAMP-PWR-01",
    name: "Boss Katana-50 MkII power cable",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
];

const mixerResults: Equipment[] = [
  {
    id: "MIX-01",
    name: "Yamaha MG10XU mixer",
    defaultLocation: "MPR 3",
    currentLocation: "Arts Block A",
    condition: "Fully functional",
    status: "away",
  },
  {
    id: "MIX-02",
    name: "Allen & Heath ZED-10FX mixer",
    defaultLocation: "MPR 5",
    currentLocation: "MPR 5",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "MIX-03",
    name: "Behringer Xenyx X1222USB mixer",
    defaultLocation: "MP Lab 2",
    currentLocation: "Store Room",
    condition: "Out of service",
    status: "service",
  },
];

const standResults: Equipment[] = [
  {
    id: "MS-02",
    name: "K&M 210/9 boom microphone stand",
    defaultLocation: "MPR 2",
    currentLocation: "MPR 2",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "MS-03",
    name: "K&M 210/9 boom microphone stand",
    defaultLocation: "Studio",
    currentLocation: "Studio",
    condition: "Fully functional",
    status: "ready",
  },
];

const auditorium: Equipment[] = [
  {
    id: "FOH-CON-01",
    name: "Allen & Heath SQ-6 FOH digital console",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "PA-L-01",
    name: "JBL SRX835P left PA speaker",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "PA-R-01",
    name: "JBL SRX835P right PA speaker",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  ...numberedEquipment(
    "WEDGE",
    "Yamaha DBR12 stage wedge monitor",
    4,
    "Auditorium",
  ),
  {
    id: "GPN-01",
    name: "Yamaha C7X grand piano",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  ...drumSetParts("DRM-03", "Auditorium", "Yamaha Stage Custom"),
  ...numberedEquipment(
    "DRM-STK",
    "Vic Firth American Classic 5A drumstick pair",
    2,
    "Auditorium",
  ),
  ...numberedEquipment(
    "IEM-BP",
    "Sennheiser EK IEM G4 body pack",
    2,
    "Auditorium",
  ),
  ...numberedEquipment(
    "IEM",
    "Sennheiser IE 100 Pro in-ear monitor",
    2,
    "Auditorium",
  ),
  ...Array.from({ length: 4 }, (_, i): Equipment => ({
    id: `KMS-${String(i + 4).padStart(2, "0")}`,
    name: `K&M 210/9 boom microphone stand ${i + 1}`,
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  })),
  ...Array.from({ length: 2 }, (_, i): Equipment => ({
    id: `SM58-${String(i + 1).padStart(2, "0")}`,
    name: `Shure SM58 microphone ${i + 1}`,
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  })),
  ...Array.from({ length: 2 }, (_, i): Equipment => ({
    id: `SM57-${String(i + 1).padStart(2, "0")}`,
    name: `Shure SM57 microphone ${i + 1}`,
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  })),
  {
    id: "DRM-MIC-KICK-01",
    name: "Shure Beta 52A kick-drum microphone",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "DRM-MIC-SNARE-01",
    name: "Shure SM57 snare-drum microphone",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  ...numberedEquipment(
    "DRM-MIC-TOM",
    "Sennheiser e604 tom microphone",
    3,
    "Auditorium",
  ),
  {
    id: "DRM-MIC-OH-L",
    name: "AKG C214 left overhead condenser microphone",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "DRM-MIC-OH-R",
    name: "AKG C214 right overhead condenser microphone",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "DRM-MIC-HH-01",
    name: "Shure SM81 hi-hat condenser microphone",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  ...Array.from({ length: 8 }, (_, i): Equipment => ({
    id: `XLR-${String(i + 1).padStart(2, "0")}`,
    name: `Mogami Gold Studio XLR cable ${i + 1}`,
    currentLocation: "Auditorium",
    condition: i === 3 ? "Out of service" : "Fully functional",
    status: i === 3 ? "service" : "ready",
  })),
  {
    id: "BAMP-02",
    name: "Ampeg SVT-CL bass amplifier",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "BAMP-03",
    name: "Fender Rumble 100 bass amplifier",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "GAMP-02",
    name: "Fender Hot Rod Deluxe IV guitar amplifier",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "GAMP-03",
    name: "Marshall DSL40CR guitar amplifier",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  ...Array.from({ length: 6 }, (_, i): Equipment => ({
    id: `INST-${String(i + 1).padStart(2, "0")}`,
    name: `Fender Professional Series instrument cable ${i + 1}`,
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  })),
  {
    id: "SNAKE-01",
    name: "Whirlwind Medusa 32-channel stage snake",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "IEM-TX-01",
    name: "Sennheiser SR IEM G4 transmitter rack",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "LIGHT-CON-01",
    name: "ETC ColorSource 40 lighting console",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "LIGHT-RIG-01",
    name: "Chauvet Professional LED stage lighting rig",
    currentLocation: "Auditorium",
    condition: "Fully functional",
    status: "ready",
  },
];

const studio: Equipment[] = [
  {
    id: "SSL-AWS-01",
    name: "Solid State Logic AWS 948 mixing console",
    currentLocation: "Studio",
    condition: "Fully functional",
    status: "ready",
  },
  ...numberedEquipment(
    "GEN-8040B",
    "Genelec 8040B monitor speaker",
    2,
    "Studio",
  ),
  ...numberedEquipment("GEN-7360A", "Genelec 7360A subwoofer", 2, "Studio"),
  {
    id: "SCARLETT-18I20-01",
    name: "Focusrite Scarlett 18i20 2nd Gen audio interface",
    currentLocation: "Studio",
    condition: "Fully functional",
    status: "ready",
  },
  ...numberedEquipment(
    "CM25",
    "Focusrite CM25 condenser microphone",
    2,
    "Studio",
  ),
  ...numberedEquipment(
    "ATH-M30X",
    "Audio-Technica ATH-M30x headphones",
    2,
    "Studio",
  ),
  {
    id: "MS-03",
    name: "K&M 210/9 boom microphone stand 1",
    currentLocation: "Studio",
    condition: "Fully functional",
    status: "ready",
  },
  {
    id: "KMS-02",
    name: "K&M 210/9 boom microphone stand 2",
    currentLocation: "Studio",
    condition: "Fully functional",
    status: "ready",
  },
  ...numberedEquipment(
    "MOG-XLR-STU",
    "Mogami Gold Studio XLR cable",
    4,
    "Studio",
  ),
  ...numberedEquipment("HOSA-CPP", "Hosa CPP-830 patch cable", 4, "Studio"),
];

const liveRoom: Equipment[] = [
  ...numberedEquipment("YAM-HS8", "Yamaha HS8 monitor speaker", 2, "Live Room"),
  {
    id: "SCARLETT-18I20-02",
    name: "Focusrite Scarlett 18i20 2nd Gen audio interface",
    currentLocation: "Live Room",
    condition: "Fully functional",
    status: "ready",
  },
  ...drumSetParts(
    "DRM-LR-01",
    "Live Room",
    "Tama Imperialstar",
    Object.fromEntries(
      drumPartDefinitions.map(([suffix]) => [
        suffix,
        { condition: "Out of service", status: "service" as const },
      ]),
    ),
  ),
  ...numberedEquipment("SM58-LR", "Shure SM58 microphone", 2, "Live Room"),
  ...numberedEquipment(
    "KMS-LR",
    "K&M 210/9 boom microphone stand",
    2,
    "Live Room",
  ),
  ...numberedEquipment(
    "MOG-XLR-LR",
    "Mogami Gold Studio XLR cable",
    4,
    "Live Room",
  ),
];

const mpLab1: Equipment[] = [
  ...numberedEquipment(
    "IMAC-MPL1",
    "Apple iMac 24-inch M1 production workstation",
    15,
    "MP Lab 1",
  ),
  ...numberedEquipment(
    "MPK-MPL1",
    "Akai MPK Mini Mk3 MIDI controller",
    4,
    "MP Lab 1",
  ),
  ...numberedEquipment(
    "FLX4-MPL1",
    "Pioneer DJ DDJ-FLX4 controller",
    2,
    "MP Lab 1",
  ),
  ...numberedEquipment(
    "SCARLETT-2I2-MPL1",
    "Focusrite Scarlett 2i2 3rd Gen audio interface",
    4,
    "MP Lab 1",
  ),
  ...numberedEquipment(
    "ATH-M20X-MPL1",
    "Audio-Technica ATH-M20x headphones",
    15,
    "MP Lab 1",
  ),
  ...numberedEquipment(
    "ERIS-MPL1",
    "PreSonus Eris 3.5 monitor speaker",
    2,
    "MP Lab 1",
  ),
];

const mpLab2: Equipment[] = [
  ...numberedEquipment(
    "IMAC-MPL2",
    "Apple iMac 24-inch M1 production workstation",
    15,
    "MP Lab 2",
  ),
  ...numberedEquipment(
    "CDJ-900NXS",
    "Pioneer CDJ-900NXS player",
    2,
    "MP Lab 2",
  ),
  {
    id: "DJM-750MK2-01",
    name: "Pioneer DJM-750MK2 DJ mixer",
    currentLocation: "MP Lab 2",
    condition: "Fully functional",
    status: "ready",
  },
  ...numberedEquipment(
    "LAUNCHKEY-MPL2",
    "Novation Launchkey Mini Mk3 MIDI controller",
    2,
    "MP Lab 2",
  ),
  ...numberedEquipment(
    "SCARLETT-2I2-MPL2",
    "Focusrite Scarlett 2i2 3rd Gen audio interface",
    4,
    "MP Lab 2",
  ),
  ...numberedEquipment(
    "HD280-MPL2",
    "Sennheiser HD 280 Pro headphones",
    15,
    "MP Lab 2",
  ),
  ...numberedEquipment(
    "ROKIT5-MPL2",
    "KRK Rokit 5 G4 monitor speaker",
    2,
    "MP Lab 2",
  ),
  mixerResults[2],
];

const storeRoom: Equipment[] = [
  mixerResults[2],
  {
    id: "SM58-SPARE-01",
    name: "Shure SM58 microphone",
    currentLocation: "Store Room",
    condition: "Fully functional",
    status: "ready",
  },
  ...numberedEquipment(
    "KMS-SPARE",
    "K&M 210/9 boom microphone stand",
    3,
    "Store Room",
  ),
  ...numberedEquipment(
    "MOG-XLR-SPARE",
    "Mogami Gold Studio XLR cable",
    6,
    "Store Room",
  ),
  ...numberedEquipment(
    "FEN-INST-SPARE",
    "Fender Professional Series instrument cable",
    6,
    "Store Room",
  ),
  ...numberedEquipment(
    "HERC-KS120B",
    "Hercules KS120B keyboard stand",
    3,
    "Store Room",
  ),
  ...numberedEquipment(
    "ATH-M20X-SPARE",
    "Audio-Technica ATH-M20x headphones",
    4,
    "Store Room",
  ),
];

const withDefaultLocation = (items: Equipment[], location: string) =>
  items.map((item) => ({
    ...item,
    defaultLocation: item.defaultLocation ?? location,
  }));

const directoryEquipment: Equipment[] = Array.from(
  new Map(
    [
      ...withDefaultLocation(mpr2, "MPR 2"),
      ...withDefaultLocation(mpr3, "MPR 3"),
      ...withDefaultLocation(mpr4, "MPR 4"),
      ...withDefaultLocation(mpr5, "MPR 5"),
      ...withDefaultLocation(auditorium, "Auditorium"),
      ...withDefaultLocation(studio, "Studio"),
      ...withDefaultLocation(liveRoom, "Live Room"),
      ...withDefaultLocation(mpLab1, "MP Lab 1"),
      ...withDefaultLocation(mpLab2, "MP Lab 2"),
      ...withDefaultLocation(storeRoom, "Store Room"),
    ].map((item) => [item.id, item]),
  ).values(),
);

const normalizeEquipmentSearch = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

const equipmentSearchTags = (item: Equipment) => {
  const text = normalizeEquipmentSearch(`${item.name} ${item.id}`);
  const tags: string[] = [];

  // Common student terminology and category-level searches. These tags only
  // improve matching; they do not change the equipment inventory itself.
  if (/\b(microphone|mic)\b/.test(text)) tags.push("mic microphone");
  if (/\bheadphones?\b/.test(text)) tags.push("headphone headphones");
  if (/\b(speaker|monitor)\b/.test(text)) tags.push("speaker speakers monitor monitors");
  if (/\bcables?\b/.test(text)) tags.push("cable cables");
  if (/\bmixers?\b/.test(text)) tags.push("mixer mixers");

  const isDrumRelated =
    /\bdrum\b/.test(text) ||
    /\b(kick|snare|rack tom|floor tom|tom|hi hat|hihat|crash|ride|cymbal|throne|kick pedal)\b/.test(text) ||
    /\bdrm\b/.test(text);
  if (isDrumRelated)
    tags.push("drum drums drumset drum set percussion");

  if (/\bhi hat\b/.test(text) || /\bhihat\b/.test(text))
    tags.push("hi hat hihat hi-hat");

  return normalizeEquipmentSearch(`${text} ${tags.join(" ")}`);
};

const equipmentMatches = (item: Equipment, value: string) => {
  const normalized = normalizeEquipmentSearch(value);
  if (!normalized) return false;

  const searchable = equipmentSearchTags(item);
  const compactQuery = normalized.replace(/\s/g, "");
  const compactSearchable = searchable.replace(/\s/g, "");
  const queryWords = normalized.split(" ").map((word) =>
    word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word,
  );

  return (
    searchable.includes(normalized) ||
    compactSearchable.includes(compactQuery) ||
    queryWords.every((word) => searchable.includes(word))
  );
};

const clockLabel = (absoluteMinutes: number) => {
  const minutesInDay = ((absoluteMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(minutesInDay / 60);
  const minute = minutesInDay % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
};

const halfHourSlot = (startMinutes: number) => {
  const start = clockLabel(startMinutes);
  const end = clockLabel(startMinutes + 30);
  const startSuffix = start.endsWith("AM") ? "AM" : "PM";
  const endSuffix = end.endsWith("AM") ? "AM" : "PM";
  const compactStart =
    startSuffix === endSuffix ? start.replace(/ (AM|PM)$/, "") : start;
  return `${compactStart}–${end}`;
};

const slotsBetween = (startMinutes: number, endMinutes: number) =>
  Array.from(
    { length: (endMinutes - startMinutes) / 30 },
    (_, index) => halfHourSlot(startMinutes + index * 30),
  );

const periods = [
  { name: "Early Morning", times: slotsBetween(360, 540) },
  { name: "Morning", times: slotsBetween(540, 720) },
  { name: "Afternoon", times: slotsBetween(720, 1020) },
  { name: "Evening", times: slotsBetween(1020, 1200) },
  { name: "Night", times: slotsBetween(1200, 1440) },
  { name: "Late Night · 28 Aug", times: slotsBetween(1440, 1800) },
];

const allTimeSlots = periods.flatMap((period) => period.times);
const timeRangeLabel = (slots: string[]) => {
  if (slots.length === 0) return "";
  if (slots.length === 1) return slots[0];
  const [rawStart, firstEnd] = slots[0].split("–");
  const lastEnd = slots.at(-1)!.split("–")[1];
  const firstSuffix = firstEnd.match(/(AM|PM)$/)?.[1] ?? "";
  const lastSuffix = lastEnd.match(/(AM|PM)$/)?.[1] ?? "";
  const start = /(AM|PM)$/.test(rawStart)
    ? rawStart
    : firstSuffix === lastSuffix
      ? rawStart
      : `${rawStart} ${firstSuffix}`;
  return `${start}–${lastEnd}`;
};

const durationLabel = (slotCount: number) => {
  const totalMinutes = slotCount * 30;
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes === 0
    ? `${hours} ${hours === 1 ? "hour" : "hours"}`
    : `${hours} hr ${minutes} min`;
};

const bookingDateForSlots = (baseDate: Date, slots: string[]) => {
  const bookingDate = new Date(baseDate);
  if (slots.length === 0) return bookingDate;
  const firstIndex = allTimeSlots.indexOf(slots[0]);
  // The operational day runs 6:00 AM–6:00 AM. Slots from midnight onward
  // belong to the following calendar date even though they remain on this screen.
  const midnightIndex = periods.slice(0, 5).flatMap((period) => period.times).length;
  if (firstIndex >= midnightIndex) bookingDate.setDate(bookingDate.getDate() + 1);
  return bookingDate;
};

const bookedFromHourStarts = (starts: number[]) =>
  new Set(starts.flatMap((start) => [halfHourSlot(start), halfHourSlot(start + 30)]));

const booked3 = bookedFromHourStarts([420, 600, 780, 1080, 1260, 1560]);
const booked5 = bookedFromHourStarts([420, 540, 720, 900, 1140, 1380]);
const booked2 = bookedFromHourStarts([480, 660, 840, 1020, 1320]);
const booked4 = bookedFromHourStarts([360, 540, 960, 1200, 1500]);

const locations = [
  "MPR 2",
  "MPR 3",
  "MPR 4",
  "MPR 5",
  "Auditorium",
  "Studio",
  "Live Room",
  "MP Lab 1",
  "MP Lab 2",
  "Store Room",
];

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const longDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
const shortDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
const monthName = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
    date,
  );

function Shell({
  children,
  title,
  subtitle,
  scrollHint,
  back,
  home,
  headerExtra,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  scrollHint?: string;
  back?: () => void;
  home?: () => void;
  headerExtra?: React.ReactNode;
}) {
  const contextualScrollHint =
    scrollHint ??
    (title.startsWith("MPR ") && title.endsWith(" availability")
      ? "Scroll to view availability throughout the day."
      : title.endsWith(" setup")
        ? "Scroll to review all assigned equipment."
        : title === "Equipment availability issues"
          ? "Scroll to review all affected items and your options."
          : title.startsWith("Search for another")
            ? "Search, then scroll to review all matching equipment."
            : title === "Equipment directory"
              ? "Search, then scroll to review all matching equipment."
              : title === "Browse by location"
                ? "Scroll to view all TSM locations."
                : title.endsWith(" equipment")
                  ? "Scroll to review all equipment in this location."
                  : undefined);
  return (
    <main className="min-h-screen bg-[#f3f5fb] text-[#151a31]">
      <div className="mx-auto min-h-screen w-full max-w-[760px] bg-[#f8f9fd] shadow-[0_0_60px_rgba(21,26,49,.08)]">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f8f9fd]/95 px-5 pb-3 pt-3 backdrop-blur sm:px-8 sm:pb-4 sm:pt-4">
          <div className="mb-2.5 flex items-center justify-between sm:mb-4">
            {back ? (
              <button
                onClick={back}
                className="flex min-h-11 items-center gap-1.5 rounded-xl px-2 text-sm font-semibold text-slate-600 hover:bg-white"
              >
                <ArrowLeft size={18} /> Back
              </button>
            ) : (
              <Brand />
            )}
            {home && (
              <button
                onClick={home}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50"
              >
                Home
              </button>
            )}
          </div>
          <h1 className="text-[1.6rem] font-semibold leading-tight tracking-[-0.035em] sm:text-[1.75rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-[15px] leading-5 text-slate-600 sm:mt-2 sm:leading-6">
              {subtitle}
            </p>
          )}
          {contextualScrollHint && (
            <p className="mt-0.5 text-sm font-normal leading-5 text-slate-500 sm:mt-1">
              {contextualScrollHint}
            </p>
          )}
          {headerExtra && <div className="mt-4">{headerExtra}</div>}
        </header>
        <div className="px-5 pb-56 pt-3.5 sm:px-8 sm:pt-5">{children}</div>
      </div>
    </main>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 font-bold">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-600 text-white">
        <Music2 size={18} />
      </span>
      Practice Ready
    </div>
  );
}
function Primary({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="min-h-12 w-full rounded-2xl bg-violet-600 text-[15px] font-semibold text-white shadow-lg shadow-violet-200 hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
    >
      {children}
    </Button>
  );
}
function ActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[760px] -translate-x-1/2 border-t border-slate-200/80 bg-[#f8f9fd]/95 px-5 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(21,26,49,.08)] backdrop-blur sm:px-8 sm:pb-[max(1rem,env(safe-area-inset-bottom))] sm:pt-3">
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function StatusPill({
  status,
  condition,
}: {
  status: Equipment["status"];
  condition?: string;
}) {
  const map = {
    ready: "bg-emerald-100 text-emerald-800",
    away: "bg-amber-100 text-amber-800",
    attention: "bg-amber-100 text-amber-800",
    service: "bg-rose-100 text-rose-800",
    missing: "bg-slate-200 text-slate-700",
  };
  const labels = {
    ready: "Available",
    away: "Currently elsewhere",
    attention: "Needs attention",
    service: "Out of service",
    missing: "Missing",
  };
  const label =
    status === "attention" && condition ? condition : labels[status];
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${map[status]}`}
    >
      {label}
    </span>
  );
}
function Summary({
  room,
  time,
  date,
}: {
  room: string;
  time: string;
  date: Date;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#151a31] p-3 text-white sm:p-4">
      <div>
        <small className="text-slate-400">Date</small>
        <p className="mt-0.5 text-sm font-semibold sm:mt-1">{shortDate(date)}</p>
      </div>
      <div>
        <small className="text-slate-400">Time</small>
        <p className="mt-0.5 text-sm font-semibold sm:mt-1">{time}</p>
      </div>
      <div>
        <small className="text-slate-400">Room</small>
        <p className="mt-0.5 text-sm font-semibold sm:mt-1">{room}</p>
      </div>
    </div>
  );
}
function ConfirmationDetails({
  room,
  time,
  date,
}: {
  room: string;
  time: string;
  date: Date;
}) {
  const details = [
    { label: "Date", value: shortDate(date), icon: <CalendarDays size={18} /> },
    { label: "Time", value: time, icon: <Clock3 size={18} /> },
    { label: "Room", value: room, icon: <MapPin size={18} /> },
  ];
  return (
    <section className="mt-3.5 sm:mt-5" aria-labelledby="reservation-details">
      <h2 id="reservation-details" className="mb-2 text-base font-semibold sm:mb-3">
        Reservation details
      </h2>
      <div className="grid rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-3">
        {details.map((detail, index) => (
          <div
            key={detail.label}
            className={`flex items-center gap-2.5 px-3.5 py-3 ${index > 0 ? "border-t border-slate-100 sm:border-l sm:border-t-0" : ""} sm:gap-3 sm:p-4`}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700 sm:h-10 sm:w-10">
              {detail.icon}
            </span>
            <div>
              <small className="text-slate-500">{detail.label}</small>
              <p className="mt-0.5 font-semibold text-[#151a31]">
                {detail.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
const equipmentImageUrl = (item: Equipment) => {
  // Keep every physical unit of the same equipment model on the SAME
  // reference image. This prevents numbered duplicates from receiving
  // different Bing thumbnails simply because their item names/IDs differ.
  const bingProductImage = (query: string) =>
    `https://tse1.mm.bing.net/th?q=${encodeURIComponent(query)}&w=600&h=600&c=7&rs=1&p=0&dpr=1.5&pid=1.7&mkt=en-US&adlt=moderate&t=1`;

  // Approved generated reference images for the 20 reviewed equipment cards.
  // These are embedded locally in this page: no Bing lookup, no tile numbers, no extra labels.
  const approvedGeneratedImages: Record<string, string> = {
    "DRM-02-KICK": "data:image/webp;base64,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",
    "PA-L-01": "data:image/webp;base64,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",
    "PA-R-01": "data:image/webp;base64,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",
    "WEDGE-01": "data:image/webp;base64,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",
    "WEDGE-02": "data:image/webp;base64,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",
    "WEDGE-03": "data:image/webp;base64,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",
    "WEDGE-04": "data:image/webp;base64,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",
    "GPN-01": "data:image/webp;base64,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",
    "DRM-03-KICK": "data:image/webp;base64,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",
    "DRM-03-SNARE": "data:image/webp;base64,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",
    "DRM-03-RACK-TOM": "data:image/webp;base64,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",
    "DRM-03-HIHAT": "data:image/webp;base64,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",
    "DRM-03-CRASH": "data:image/webp;base64,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",
    "DRM-03-RIDE": "data:image/webp;base64,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",
    "DRM-03-HIHAT-STAND": "data:image/webp;base64,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",
    "DRM-03-CYMBAL-STAND": "data:image/webp;base64,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",
    "DRM-03-THRONE": "data:image/webp;base64,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",
    "IEM-01": "data:image/webp;base64,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",
    "IEM-02": "data:image/webp;base64,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",
    "LIGHT-RIG-01": "data:image/webp;base64,UklGRvYeAABXRUJQVlA4IOoeAACQdwCdASorAfgAPikSh0MhoQklfloMAUJZ278X4ABI5VSkaeOW3v7scwIU3q//P+wj9SfZ99qvuAfqB/mOp1+un9V9gH62/rN7xf7AewD0AP1c60b0AP4z/ifS+/Zv4OP2x/Yf4Df2Q/+OsTe+O8j9kfx5/cD13/Fvn/6x/YP7v/hP3Q/0/Bs/3noH/IPsx9n/sf7J/27/x/7r2sfE35Zfy35d/AL+Nfy/+4f2v9nv7X/5P9F7pe8t13/D/7z1BfYP5x/fv8P+4f9y/dH25f6n8Zvdn6x/6b8j/oA/kX8n/v/91/bH+wf/r6f/xX+R8l36T/sP+R7gH8c/ov+b/vn7gf5X/7fa3/Gf7L/Bf5b/y/5P27/mH9z/2v+E/0f/s/xf2Cfx/+gf5r+0f5H/p/4P//f8z7uvYx+0nsi/rJ9/48HiDATwTykvpxG1Gn3SDEYcJYmwlSFJja4LWPruT/1gqPBFamNTqowdsxn3I33yE2ZK6V1vW01gEPpGbRD7V1RMwurAdc0z3nr1IZ2nYXxnWdsBClXvTzcAgELePqY4u9+V4ajCj37ZkZ9I3W+UHZNYNLjYX6lgiK/2mUH8fQifoSPUWI1HnHXnZv+EAB37YH7hlk07pvZIdcnJ7baA2vpLFfw49PhgCGpxyUFJBZKFpqckcrAP83il9pJonvbI1vVaqhEtYfqXbvHqxPBBMscxG9A9pDmgnB9g9yznpjzcbQAmgJ3BPHF53T64TZ+3cu1Ta4olEipy0bTsxAuUbVaMuOd2pf6uBLuGM6RFgVgWFtflZyyfEG1jwbRG/pnXGnYTlpTmE9cAWN9rMEb/6kOEyWehShD3mogcIW/dPWh06w2yo9TPUWknAMtC+heihtJiI1gN7PzhKcJJ/piRnHYh+0qRmRd6vxD9UUgYQOXctlRh+TlZiv4mqdnb0VqaQO7UoBMJFpTlY9bVnKQ0u3Sr/sLG3IBg01fUTQwU8gbfnSME5RPjuIfQS3IzokxEjU3Jn3FFexg1dpuYm9KKyQ/PLkzmXdWnqS8lG88ex7BXWI7ekhgp8AZlv+TNJLhxEuOYvnz4YWLOrNzGTzf1ajvbskppPBClWeYKv+n7bnlpKBeA6wnBKn5Ue+fnTPHWYV9JHYHKGyA5Dm7Mu3Dm50u1VK3uwqDwpBOkNce3hoEnmWT8HWfwpSpULlWwb2KmMvQXBeHaJMNx/Jo5YfuExX6+TapBKk1WhSjoHPnDY+X38p7Hq37SDxW5S1JvG2G85kdwJKNzbkSzG9vPo0GwRC5ZD2+mAAD+/z1zIKlH8oH0q/WIeaqDJOvrCh+mYX5jiu1kDUVo+vm92y1pbkg2s9Mg76nG4KYo2ck0C2t8yHwHccIh04UgEUoilq2wAQB97jCs3Ae5auIOEy3TusRCZmWB4LPL7Di+D8Ummoawrq7rRs+rR+WRvMBX+FgBNWqp4x2r41x++mJDzU1Qg1h1kWCVUkJo0H7An/+ymJzFeSJZCPAlsvVPbgpY5GvVxYDCZs01zjeG7CBCuJYr0mkt8FzCWHiWmj6qKif2NALo54Z9rTqgkkoQOqs2X9L18MQZ7Dw7QwNLwW2hOrjpKc5ZwXHYbuF3QoX3mJseQqF0NjQstIzpQ/0ufsm+gRe189SyTH+Zom8LqxH9tffSxZMEnDOzCjFatc0ykQBvbsJYWpjdFRKlgmfc0gaJu6dnvN638AEqc6s1DjFWrx0oymgE6vgmJCgGZAWY4z1RInpOz7gdtx9Q2nxVptQsXnQZajloKqKV+7Efn/Qks+sZsP1tV2pWhqqfcGVXr7CGDWFl3LHu8r8xviG5nVcb9bSfNyApP0XtZNDhV1iH37v2cFogU5Lxc7eiF/JDMjhIum5v8Xb5nNujB2zVNskUfXCpOvAU6lwmXWC+EF9dYRT4KbUzbUerF85dJJh+HKwDJ80AulYBEdy0MxF8EJ04cOiha60SeM/gmQFcwUoAm+qtWJmhzlar+PMiECwh23UYYnyfc7rRc9OiXQ7DuXmuBN3YjUbQPCy6pym5tiUDaIRrTml5WNLKoVvjTbAhEWXOjPkBXs+cRcP5V7kmkFdowLMzkhule1Q3xzlowr/mWDf96Mx+kPzqzLKaaUDE1lZNiYjT7MZA8OKn/JdkIL2GWM6Dxn5Om8plPCNwtZathqVTXDI2b0sgBhqLJWDxIa9LOOgTNrP53u/oG/tfyY6XMwvOP+VXO69VBX6S53J3gh5Lr3DCjSg7OvnLQ1kjXy585ynknhFYrC88tpVayQ0x+1H/OCTdHTCj7/gvhTn+hz3+AAvjfO3pgumZX1WY6RsOFkmsBLRpF48nYElmKe+p7odPl7aJ3wOFfOfLWDiA18x5swV2YXpeQPDdxG3yRvzYG2ASa0sVxKGz1d14KIYUCwePR5W7BfFUWxK8ZO/Fm+yrft2U29J51L+JSDVVhM72EujXQK3Ta0Du8RBlme5sFReiK1KLyD0DEloQjT62vShm7CoRMlczRo56+QfYD/MZCHemq+6Kp9NrpYk0k3Ycg9flrYQgCYvNMMY+1pNlgbbVGKh0aTv76SERD0adKpq/SpJnCONPUjb8a3hMTAolhdtb3IuewznY5oITnELVag6qvKsMqJJnP48Holgswpm/Y8D/hihoMOx6tznv4E7lfRCB6QZ5ksPzyvUZAs/WTax5ZC4fgYR8M5dHTqui2+C1x6TlogAq7ysbPwrv10gDelAPqup6toolaWsusMhL8CdHmTJ5D1V3TuyDMJLQyfXpHk+gYo438TSCQmicjDD9KFHaW6kMAuvE9jQkTK1i/FWn7/C2gT+OyJonTH0Eh5FHwLxttPUcK5sAnNckIe7f+K0Nd45XVj+BGVXqlax+yNKE4baGqfGP5GOdeOzZYskVUbtE500hM0NwA09lXVn2XkRDKNUfqSAhLsuN96LYET7cb09EeQtDaLOzqPqIS8NI66yHbKRxB6I/ALQ+lGU4V+z0ARESC6VH9GrxqNDzLMyfvmcIAsYwLae9Y9XtSqMHzrcYp+qKNTmV4vcfyuYLUYZorqjzek6P5FmzdjM7pjiHuJGtuSsD9+ifPztPPA0vVQc34LE5ozaJcdDqLMUI5xVTMM0TKJJL5Mi7NgPU1wsEQoyVYHNMDzCvxaCHG5TItq057+7mjzK5decn90tKyeE1QtdoYSGKYzfZESx+eL4jUNmLlpuiVa05koBEaT56YuiXvSQa8kXren6dVUQcbLz4djSIz/n6DrE0jXLS/1pGZM65PYrwZbBDW6VSl0/WVynBr3VHuAk8hCOxf/zpOKY4nBbFFzkRqLWnyFzZdzXWWz9vGWWX8FwnC0Wu5wCxuYiKbv8jmPQeilXLz2tySV1pziMbbyeFzZNBwBKLKpz/Lz8CnLEh3Ic7S3BEKanaiBY8JwetlYNwIV/Q883IZRwig223gir00C7iWcq97bPqkZyxyXIOYz+YG2q5sjMuntM0Ib/befQtKr/QX6smckP4wGT7/gJ4+wt+g8Xu6RS3AfzWCUVgyinbF2TQhGXuvoO17TBZNBT4iHNpmvW0Lk7lJ3BE1rwj0LDFVjBWn3OojZ7r+mFHY0n2B4TB6miuRwiuwvHIsWrByTyE0GlniU3uFR/hA98f2xy7vCovgzmZ2DtWjrnohZQIUTm5y9gT5H6ng6s7hkW5pDlp8DjEUdMOO06hM+gOjfQTRUkoiBJOOzi2cGJdLW/sy0frYTXEUsC9egtMhfbcQAxtaeHOSGMjp99lIkj8DVUZudCwxbj/qfK8fUAdf7HHcnWKZ9Upw9kMyE8dYAJf3TMYTQDkU9ZzsK1HHjmD/8W1IQ6fjXCM4mz/xNmWked5oD9W3+F0ak6T1hG2u3K+F2vHpQMNuDnzkWMVMaq8PkWS4UvnoaLH0F5P1o8zBySol6a1XrwquEUz3gSYJOBCtdNrUW4T8FyAXTOndoao4BQ8CLFh/azyyJFZ3pQ6A2DGqsLjDsRbRsu4m8sJJ6x/qJhG/jDWFwHEHZTsrpB/r84KbXkkshTqHoBLvPJKvA7CIbROp7OgZRCYvNPvxIOj5+b7UU9heHx5hTOvmzTxWEDGToN2GunEfNdVLK4bn3HfSBN62a5OvCwHLRV4Vfl+r+9EEvGvn4EbViNPFmhYGolY8RzIih6dkfTRaPC49yv9gConuUF5wwm9Z8VFthVTLyS2nzvFidIPMG3iVBdV/V/AuUrlKCawE07xxcMVsmxy1LlnCGLM6OT+mm9n8qL6oDBXcvd7F3mFPYvwSra/zixCu0AYw2fN82Hw8apmf/VgRDybp398X6+AHSx50sk6o02pBqvBRUu9UcXXCMH/Fbh+iUl/y/r2HgtJnWJYIBhYfUfwNfu++4pEMg7qGwzysnQt//407aYb8bw+rH+F3ybK43fh4QJOqDdzs6N+HhBL//czCY4lwqF1auhnfF5NC0qbjydsDGQ36IFzOgPvZNF2ADlNKIHj9tblKxAeqc/IQpwiu3U9tqlW8qSQ67vPtvNpI5k/qyxmh0oZgc3r4uafhUlzjfza4J59rzqnzPzRnTQWft5zccd4hQl7Yki/4xSuo1JzB24ODxipCFg77lLN6zM7yXIrfC9YbXz15nx4O9luY/T5EkssMP9Y0tg+ktxZ9tQfez6fI3NkFLb5pzzDMfNP9dx/86MJ4Ht1TOY5fe/bojAcq1oTAH+ISv6+DzjH1qMyWL9ytkEeE12/nO5aFa/7CHcQeInzGJY5VPg4kdy8J7IRUwaxNwBhxMIVB/MIfdS30uvM61/oxQmwq09OlTM5xsTjCJvexx/bzYB6aoVQ3PT/HRsnd30QBtvadxR2P3x7YHa0G+HR8Dsv/N4HWQhpkxk1GX4UdWPjZOGmibpDkPUoClGSCDiTculH7I3Ptlygh+R11gsOTR3xWf4td3MbiqkaGM+toWyv76sSIN/HHApmzHDCXoanJrFcBhIBOOG9e2E2eNIe4w8GcRR/FwbymBuluVQ+0PprHNHqTcTXlcrCr91/5a4zGhLMz/6DS8hnCUCbZ25hx/48IlC6RWJy98reyKjM8JZiV5Xj8O+0T+Sb5ilUSk4HSBpyYaynhyJEi1oi+ICLfExRxbhGPogW+g3ybzJ5QXZgss8j9godG9eEKsbAhcGe/Zvdel2nDmmiOF4SL+cQatxOCa6FyzY9orcY6pFqajEoq/ZBUpDwEuQ6DV9jL3kDo3FndhnnnNVJFryjT5tjumCQRFIBbmM5o+7p+xOiCUIV8HnVbyoss662xxwZT5ekZQ3y6qqBqqOsIdccZ7lSyyw+L1trR22s7xLO1Ge/u4d/Svk/qkmLyLIveHszeTMLP33mAlV9O/1451ydVk7QpGslgprWBmwejLQH+z/wfR9EGb8JJggJzy/OKLBPhFcrd4R8WLYNq/x62wsUvUaxX2guEWH4jrBUXgJ/Xt6OklTcuyPBNfKPJVzBHTSMfNwsiW/M7aksDHC8NAP/mHRhYWUy76sdZUBvmKg/rrlYdJPhtWQKn1qmNFkJcJ9Y9M1CAkSp312nrb52EEET8K+V3LYHNkaL6Qxkbh1SPc5o7qG1BAm6lu0W5u8leefkVsVL4E/NKyt+jlknBvY42jECW/SirHuz5RZaU1IDfGaMk01yQrmhcqzySeW1imb7O1Fw28OQjlS4SN3LtWaeCrC3PyYRc3aTUOOt840rTr2fQWd4NQBtGDXQLHfMnc+z2EezrUM7CR3kd/lZ16yseqS9KxPdYqdHOXKefPr+RUkSYwS+87cHWtfddHydRxvqaIdWPqUG4dBQInQHnwDmxMjRUNSooBNQRPwQsK6OZHho3JaOS0vzyi+WLz+PLx5OUTpaBLYyweDU6UEjx65EREl8UH61aBoN9UzYcqM42jwLa9l+vX75GGNNQeO9RH24FjAF/OWxXeLQL0fzM0bn0eb+jHkCi84bBAbw0S74hne+Mxzexgtf10ucKKti5QNmpsGn/xQMewsY5Rn0yXrsImmHFaF0aUYzgUu4javAcC6HDPvOTjPNdlzfYO+UOTM151yWHQ+7/TkQKHULbCSU0Y1+D15UtR1aCT3lv++Al8kjrN88YrW27LthG7lXyy6s5mGaO4/DSlZSPJTPym+DyYwiC2g0bTPY3TQXag8wPIWEnbBE8HhLkNZeHm99e6eHyQ6EIcOa+0a72l//+qpFJ9+6RgE2v9sGfLSesWRpvgIyww87k0s9HteV1u9zUXps5qut4VTDA2aLta4w/qInD9fF6sVsOCPMYx10KLyfmgDWSVdJ0UZxwrKvOErJ9vtuW3YuqJoUIRgYHzY2FUytRGOnR0qqkzAaMP6ZRspTDZNfS7aFiHiwjrY8dT1DflZQtyTiJesQy/KiZ4Uq1xfCuaeAh3nf1yp4xNBauU+96V8CsEOrZ1wBMz4Xh8pJh0M0msh201KM9chkm1NNkH3yYO+QcU7X59QgodE2wJ+4E1zYr8pPN4QT+HLLi7k3uoLDhihlAZEvRWiELee6LpEU2nmMiE8ijIPKMzC2UAj/r/wntHGKvOGSeYm39Fy601gghccdmtNTicK1QgkVEJOR17/YEgAaNonOiYYTqGKjFWd+FsBxwbh0GCwL7OD3xn+llAOzCAkZsKIvJkQd8Jswh+d7MZ+9iYBjO6TgI/lO9O8ywCHq4oh0gqCC+HmSbk4ciGAPjTN0N0HQfZcEo05Czd9j3ZVN0MqaZJ+ZoZ374bHk8yUgoPvGo50h4DGQ0Uf/tf/kJNVq5KnKX00aAICv1SczwPqTHBksfw9YBJk5GCW3+aoje6QMCHaO7RHuGrnDYBp9i/AlBLL041aFkZwk65tR1YNzIeIlTE8XnxasC4mWwJ2xoeaS6mCqXfrOvGb3oVlqwN7cBLtiLnDLQKLU+ffj9RI+nSG9EEsNKG1R71z6yl0ze5J/GzM4qWJIZOLoBIcxEFDsmvBMnk0RpsGRwsUTLWeVo9bEYnZyLhefU0jEvwe3f2zkeGdTlSth1r7xGM6iNWzqn3JFsutNLyHPc0w9R9boC9+VL7RIu64i36f9nsIHd1mRhaALyyV9f+sxlrFZ2a+KuMVCGZv4ECq9EqXQXAj0fm3XgZYDiZckif5DplhWU0GDvYtdDeHLrYDECk4hwXlDAYqunbe57WzIYB6vwNcgKbqbwEoS6RhHUUgV4h3RyQxMxIGBuuAmUDv/LmJCH3YvzVFIOQCGCPaN5tZlIPu4dHJueZOV++47dVRlsoKO2ChS79dbdbuVyap4gU+VJAFueZaCoBoTi5bmmpcT5Dizss0WZj8g1eLqwL6/jXxQWyOqe0/9grdamW+JF3iWOFS8V+rKDfeH1XKspa5lVJ8p/1867jIkw5uNcFk7UaccW+DMmsIsn8YGJf1Wab5la8KIWG+H6t6iTMgV5FsepGo4T66nvagxQSxeEGIlVq3Jcg0J4MyXM531ch/cGXk7jVVt6U+1SiRJdcixGqt58NXV/pZ9oQwQpb6JBpgqO1akgOVWO2lnGVMGFyNkobunNqU5PDMNaqt7TzIwtLR/AmwDcuNe17EeKMHaatgPlDwMANTXTUlDGg/AC9+zms/eRnDNGhC10YjOwczSZmgq5TpA/YKl9NFVz5D1shp4AXeL3GgieWIDqVfxuLR5KPiaEfGGnYOO/vo3uFcD0EItnHy3ZFdNeUHqMz8yhKBHGNsj4bS0lTNovaS235J/eQPYxBBqsjXvdYF2R5f89yAf9UD+Loy9OD9lZbGpFzgsufs8AXT3v/AX6djkEGbn5Awgy5efLUrFVqCZK0ccb39PuXNWm/Optvv4Vc/c9kGk27ldP5ooRScvKrQlir57KSlZ9Ozv83Yt0ZGpFaLOAupci8gQGzVMpjBTJ8/AzaNShUp6nPac1QfMmrAF70YjkKZRR0gpmIfAknq5UwxSos7UQSvmOilmKthswRhTNLtXLxbdEK2jaOR3sU+x5NEnmbRTDq5mIirzZ63UVSbSBrFs6Iq3vk3g3DPqYmZ5xMx91PXCpk6LDGSG919Y8IO1FzfTW6LGBAuj9JHm/ldmHGhBVeC9l+odsnp+HNXmHH9KQ44tHooHoTytgNFqF7JhbBpf+1NUgcT7C/mjQONW+hIpLltpDXy7EvST00P/YI1ZzVV2jUa9KYxXfcijveJoU9bxLvSskDgsW6f6VKkleSnz6Z31MhkYQGn41fq9+hKl1nPoEnPDKyed5uW/6vf0RS3DmZo+ZlcNAsxydIRU3aWhyOYoZyoswWvC1L/pQ21rhi3kM+Bpmpsy9F8ntYBuKSj1j+rKcBpoAY7euFN2TpCmMeDzQro/tbVqqBIg8J70slRrhoU8Al8jWJtzKszb1YTrbcgGkLeImxk/s3MSBCP4M4LSU7/rZa0V+2iFLjXn4tujH5HPCu1gMT5jb4H0rglFTQakCwInMi95TowZJyLHvhN4/d22kGaUCM+Bifm2zhBknR/2Kjf5tYMK1sVxMiIckTOV35wu0O5MKgudYbFfHJngsBpAWeZ+4P7MQPu92NqZpNmEcZMqzxWTz3jQkk2xQgzmN+xH45uG/73ZcPM4Xrwf9c6sJgzk7RaWsAY4z4CvuU09z2rh8WRZbGLYanrWho48p24M5XQeOIbWPlvdiGK+KcA0KaQ5Zaq/KRPir2Ku1J3c+6tbqssVsdbxdfMw5NTC63psE/N5AuoG+53XrbmpnBgc0JbNJpuCFyhOzuutr2ENt3p+DbhOnggxR1yQfDZadkNxwujp09aT+zxUl+BDcyzaFnK1sBl8dyuWuWT8loxnU60BtHhJ8DRSNqMAPWf2CWWiS20PE1vT/u5/pH3921qimLw3ATACR7nc6dhX81R2EjeT4tkQapA7PCweO3JN/erBdEPaFx7nDALvxZuDfoaUFe4PQAqs++DAXKH/zHDz7P0IVzgjIldZyT4T5IuIk/zJGT5v+X58t7CZ3sxKwu6WXJBENuLLQdE+7PQnK3M16g2RhlbbfTyr3iP8ML77e0LvGNgXXErgjY+vRxx8mGeyoIlwvYyd/0TOyDouIuGZTc5I8tvftwP9QxazwJbkFjPrpsTmBpl1E98MFD/GzDVnHlyD3W2xUr9zRLSLwYLDrGLJvbc2yBYF/hyjIER0IukT+iKv/yXW7H33dPsP38jXuLQmEtFpJiWGicopCaKMbHt+IY3cSWKymjLK2J6COMPywM0LSyBL48riPxD8ceCinvsBvKxOHmeicT90Q8T0rP/R//COtC/fXykxQSqVbLLllBcJQ2DjUTpFt0WwTmstbQMMPypiVij/TgZWM4ojZll79ijAPtraxCALI5Hd4NAb2f+JHqonIPGrq9ix8S1u1zFjcP2Kt3Iu290yA0VTfrXT6cGviJ6akh7yUahNUP0L/db2MbsBUGywq7ez58kfFg6YU60Q2PDIR8RqUwuiNze9fyIjGfOFrnFNt3KNcjyZ+mEgjgyp0nzekKMMksYxn6hNflge13BpI/M5DJh6p/Y47kijRkWxXZWqvZTpeC/56Pxggf6JhztBTPSlOJJPJpcajVATkE7rmeBe6zvIpmlHLkjhWgovJBNKa4ICRDX6c8c5ek5vjxHM7UsQMZKWud4BSnShyMELQplTE9dlyLsLw4USCR5xWB1LI9s3yYdIVplGuM/JUMT3RMgz6OJvEWsw/7lEUvXppOfck9/aac8slLZktXTLyfIXGt9rpjzTOkQIskS+koHkPMgEx6980jwMUPQLUltN3sxWZQ8yI3MoMj4zBcB9EOLio0Hp8DJds/mPp1KvTewTl9P3Q5FM2ycIapaA06OR4DOIr4AgN8PAqZOF/7/jv/fYXlFmwQiBP3BXUUjwq9T9W3iEHpdTySJ/D5J5lqq00e/Gs8aGn7c6VX7DUc3PlyPtY6BOiwvbafOQNdREvw7JhNfapd07EDpPVJEparDC2UsqrQy+gw/NIGnXn9y1q0NFtbKGRsd/tdCTfq+AhesbSrjpVyYRRRfp0RYonWQANiiwFVI91lKmjt0h4IA2hdPS1sD+3xuKMyJvaGz7Ajmpet33PkOKbJLuO1P96fe5dSQpocoXJG2KMy4u81hkwziOc7i2QM66UXfHCZRkdmUTFxrqEXm/VGODvZRD8LMhMqxcK+kkRj8+VxhM1/kbTf4zXJZEjICTjwDcRJRSfqndNmAeoX0GxlfsKOxVczVbNKoZ9cFq0T32NTOs0vIBZzQwifvELVP9+w7lZRAYpjk1JZ894BJV2E7em6I8uva+AWbAeFs4g9dDpHz6JNHhgjlQ69I0rP6dD4eI//bmJWqsDUF6mDEnwD09HtacBa3j7Z25ON76AnANHchoMBvaogyWv5YiyEqmkxF7k9C4lMfMGg44Nf2LRLZ2JJvGQVBVrstMXN2h4ibDVXBe9Wa5zgSAXCOcUCXplvQaAz0BHUkg7+gtdwQ5wB5+nu2nFKst0Oe7NlECPMY6av34rJIAOcLAHauBijcwwyAHJfWpsfjA3iygZD9A40zX15sW+aVnzU70AE7cOQEFhbrG2fByFw1O5SbAsQBOrtaalORjWmyyy8JfWX/g6FMCAAA=",
  };

  const approvedGeneratedImage = approvedGeneratedImages[item.id];
  if (approvedGeneratedImage) return approvedGeneratedImage;
  const modelImages: Array<[RegExp, string]> = [
    // Approved generated/local reference images added after the 35-image batch.
    // Model-level mappings intentionally apply to duplicates everywhere they appear.
    [/Yamaha P-45/i, "/equipment-reference/yamaha-p45.png"],
    [/Yamaha P-125/i, "/equipment-reference/yamaha-p125.png"],
    [/Casio Privia PX-S1100/i, "/equipment-reference/casio-px-s1100.png"],
    [/Roland FP-30X/i, "/equipment-reference/roland-fp30x.png"],
    [/Hosa CSS-110 balanced TRS cable/i, "/equipment-reference/hosa-css110-trs-cable.png"],
    [/Yamaha MG10XU power adapter/i, "/equipment-reference/yamaha-mg10xu-power-adapter.png"],
    [/Pearl Export kick drum/i, "/equipment-reference/pearl-export-kick-drum.png"],
    [/Solid State Logic AWS 948/i, "/equipment-reference/ssl-aws948.png"],
    [/Yamaha HS8/i, "/equipment-reference/yamaha-hs8.png"],
    [/Tama Imperialstar snare drum/i, "/equipment-reference/tama-imperialstar-snare.png"],
    [/Tama Imperialstar kick drum/i, "/equipment-reference/tama-imperialstar-kick.png"],
    [/Tama Imperialstar crash cymbal/i, "/equipment-reference/tama-imperialstar-crash.png"],
    [/Tama Imperialstar ride cymbal/i, "/equipment-reference/tama-imperialstar-ride.png"],
    [/Tama Imperialstar hi-hat cymbals/i, "/equipment-reference/tama-imperialstar-hihat-cymbals.png"],
    [/Tama Imperialstar drum throne/i, "/equipment-reference/tama-imperialstar-throne.png"],
    [/Tama Imperialstar cymbal stand/i, "/equipment-reference/tama-imperialstar-cymbal-stand.png"],
    [/Tama Imperialstar hi-hat stand/i, "/equipment-reference/tama-imperialstar-hihat-stand.png"],
    [/Pioneer DJ DDJ-FLX4/i, "/equipment-reference/pioneer-ddj-flx4.png"],
    [/Focusrite Scarlett 2i2 3rd Gen/i, "/equipment-reference/focusrite-scarlett-2i2-3rd-gen.png"],
    [/Audio-Technica ATH-M20x/i, "/equipment-reference/audio-technica-ath-m20x.png"],
    [/PreSonus Eris 3\.5/i, "/equipment-reference/presonus-eris-3-5.png"],
    [/Pioneer CDJ-900NXS/i, "/equipment/pioneer-cdj-900nxs.png"],
    [/Fender Hot Rod Deluxe IV/i, "/equipment-reference/fender-hot-rod-deluxe-iv.png"],
    [/Audio-Technica ATH-M30x/i, "/equipment-reference/audio-technica-ath-m30x.png"],

  // Earlier approved 15-image batch: local generated references, with collage number badges removed.
    [/Casio\ Privia\ PX\-S1100/i, "data:image/webp;base64,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"],
    [/Radel\ Saarang\ electronic\ tanpura/i, "data:image/webp;base64,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"],
    [/Pearl\ Export\ snare\ drum/i, "data:image/webp;base64,UklGRi4zAABXRUJQVlA4ICIzAABwqwCdASosAU0BPjEYiUOiIaETSf0EIAMEtLd+JVS7Kgudv+ZwwpD4O+F31f7Uf3n9tPkh0h2ify78J/pP8V+335wfK3/E+4f0l+I3+X6gv45/SP8D+Yn90/eT6u/rf+H/fe782f/Vf9z1CPYz6b/m/7t+6f+L+Bb6v/gehX8B/hP+x7gH6p/5/8vf8b///rX/j/93xU/uX+7/5nuA/zT+wf6n/Pfkr9Nf9d/7P9F/uP279wf6X/ov+//pvgO/mH9h/4H+H/zX/z/yv///9n30dVB+2n//KXgWpRAW3srVbHaojmyl8raczhmWJL3VMW0kTg1OIaj/+slV56fAqFPY3jW60VayrfKVsNQe+7/ZV1op5hEYM2ZgQHfKczEmhjG9rV2C/fGZdsN2Sepkw7NxIbG5UwrFhrgZq//DfRiAfzflHaxr3o7whvanDmTKX6H8GDkx3Vtn4//BYaf31tZU43Wwb7iQe43C2xbnyIs5IhXCYi2W6k66gCo9cCblWoDjNj4cka6rzIq1oqJAPcmnJw3lAKtu4SczJqp6P6iS3t8h3tacD8K9mAa9+sZLc5UyhmenHU3L/FlMn+SGaNMDZxXxEHarNBfw+bo49q0JGtJZsIz6noERCoI4SZbL2zLb8BSwt5PYBgimoMloKXq43YSjDFyQH1KllApINERHue4yfQFYbE56QIP+X57evtBgvDu/s0pSTW8Eq1UvGWxIxb+IZU2/xdU48NGpyZaMluwE6pFIzdw1tQO3G+erSGW8XwZAyOVRMO+FFuav4ilwibBcqzk+IYW/ChdFQhGfwew0LS+WGbmIPqZG7qcWo4EZoQGBcz9rxvaS7prNHhdKE0trksEsSPMrbBM3A1TvtdVRFcAifNmh4DuJWds72YAdZolRaliP0iz6RQrwO/4BchCQuDsEaTboN1cUlYpYLNpWrJyoa4brFzBbk8u7OyKpI8Gv84Yn/DcdQj4VR34HMms0nWblM8GCSR9ldMPGH4jRTldL3uP2Mqcj9uU8egMjtrhxJ2/1ByIeh9eq+0A23tnbR5heW/rPGdh4OsZLsnJTIoOWkAyeHUk3LoeMu0+PKBNlXnNgepI2nOc2qW6l3nxyleE45plg9Uygy/PjBG58rLpUDb6FMVmjSuFlIDopEmAl1y/j0K6ZJ2FT8SZbEs5tlJWpqJwoui0zUinOYeD5fauilgn4si4rF0YQ63Aa8w2q9mSkZKmX/jJ+isn8vX2rgHZ5B9zWPwjta1Vo2M2pbDqo//fxQTw7zJh1XEUj+ZzlCAecEgIkc+mx/vwk7ls7kVohqHCMsKrrT+jwMjikyK/tlARyOa12cnRKBToiNaTsfNEa/X42jnVWTq5rCYBN2kSKA9zFP0YIa4UsFn7FbvoI0RghTZN+P+APdqrBsFgUw3GDdBI+d3pX3+/KpCD+hhHRDRT+JMILMfuEPveoLYcOU/mMAOj7aV9v2x1CRfXskj3DvJiNT3IAfMMBt0hPIAgm0VujOE3YsZ4iED5HJlL/+vMFpREbBAD8GPY8rSFEbNfCl1kh/xoOUliy+mzVoeDHJLSdOwwFkK562Zvac1OiMstUL5KH6Kq7zv/OzSCUawooVOoUFukVzKpxwuN7NukCnG1FKga2scZ+3oLnQ9MDEG5c5eo6NLGDzDlw96haqOF8uuAIf/rtaR4ulTjHA8CeXpglivGuGfkrZ9+KWP96bjCanhX6QqylK/+UVE+kDtzHZQIQuL77/DZQ4k1G8aOU90aqumG68hQmFs2m/ysJIV2DVCEXqJ9owLq633LtKe2LXfpWIxRlRPdk0FHbp2N9ZoJ+6yTinBbTHKqRfwAA/v7dfGtgS/Oe5wNQGRH3fy8dhd0ZtZ8AEhbSkwPcjYdARA39jHEcwJKTO4fH8Tif5rAAAxZIAvGd0SAAdyKGkvZ0LMUu4ggokXSK/tHp9RmwN5vnOFQRimz3naHuSXG8jkLnkawTUIgioOUhcIhymCpQZYSQpJSE0BHl8cbt0CEpUmeJetNIFYpRBmeU5keQbWN7HMDcV5+FylcPvnRDxGiLlgygZWRyy6NLJL5rz+4vz4isAkyjC0KGYYDWzSqD2L8xlIDDSjPZR23TQtAEKGTAWntKFPDf/2tdiLXDFuxCkFjFuyRJ+IGz824ISLPOhShebtcAz4bViLC+Nw3KTBZNwIMqHcD3E+vRc31BjCAZgL3cj/KloImJ6MG1m1tgP4MAp4CgzUbaKGTwRDWc10n/OedgqQ3JfShI8yQdub9AF/kr8lduNoQApP8UktcZyzKe+Htw5AZkqqBXrCODPnPWydYY1u50simN9wHNt50jF0ak/AfO5MGC7OYYEbUwbAKrwcaPAUV1NFpdlstk3cLl/y5rbtqG2Kffv11a3oZwJLUMngJRMWa5ydixYnruLa1hJJFv0tnCZIZyou2++GipnpWDx2cr/o26mfAmnxRSdIAB8bHcn1AOq204vIIuDJxAPMzBOs0QvIFDJT5ot+TFZ5YkcJF/NrWMM8lmw9uXL8OKZER0b7AAa/pJRetQAuQEDrN66GhlpIlSEoC8k58un7jDtfDHCQfZV3LX+qh5sUq0PWQS0RlDW0tEZHRtPWNSUoOHeTwAjW3RVkTn4AEVxCBM+3Lpp8cFo+gxqROOtoNgox+LdWCfn7Dp+n1w7U2LlEr5DonTDevnUGf3xNx8yfclrZMQSFyCKr8EEv71vE94Wlxiv2Yajjn/dqHHveTQS67M3J1GGxQvQdViJWif7L2+FZwIYBL0n2Vp1aJxEyxuPUgSohyn12qH1Iz3GSRnmTjMBzKwfm/bd39uahYIFE9lxN7XI7vS+mkXlvqNaHcytDFh5s+PEAZw0Xu+eooNXV1Z3l+8TflufUp86FqebNY2Ga4DsLty9K8WDEiBZ8Z3kBiIi8/Fm0+OKQGvu/d+0eYM1ZvWZyV0LvN5f05f6EQnppGi07mEMKbyUcpFES1/090gsSR9/iqqnTqBRNHbYLNNVwX8ljv4GSQZnA/XENJnunAzhC+NAlNPUx3EHXG5L/J3nsmGQ9/28ZvaK2VZQ6wFIkuEY7m+GUsduWzi83cRoVrqsWvOB3zWNTVkp3cTwEck5z/L6R4g6SPvVmj8ecMMJjaZI5wbcpKXIAhwy+/9b7S22rBSjCXvNvTBgs7dNoq+969lsS48x6+zsLAEdtLkyaqulERMU6HZbP+HB6NH0NA6ILwbi4+Swq9RZf6vdr0pqWZwjuSrdmSziweudy9K54WBh0mkiIghfpVzTTaliK6QPG3N0xI7HqWbgfuai3bgraC8YmZ7YQWpHsMUioMuzjmuarFFd/TvGAH804OLJfy7EQiW346i0j1WvmP8bxA+EOgCTX3PitRVg9QZ326MMk3ACKqm//pVcBWhswdZ11r0wDY3bK8o0acN+/46h+jGQlal8GRCItekiznCUJzgej/58PpsOZJI314L5xIwjCzc2E2vLyKiG6WdIlvK8bYb0WF82mSBHx0L9hLZn8eZHAZsuoPiQAXKlR3w1Xx77+s8xPhwZ81wtA3IXtNIyYXV7TBGboq4i/mJujh5AsnG9NozbCmMkxstoU+sl3FYcNFlPC6coWoOIlFTCcUsN7TfGKNjwM8D09Q2LO42ms0I2OJ0qmL+Yikoz/9aqIRo+aBp9VTeT6LfrEi9eeAXY2C8ZsYjC0uDfceBOVL+z58mv++7AauvAU+itxcy4XEvYIBlsbRULiv1ENcZhiMHRjzRvvCxDQmGHm13NboFZTMAwKQHztFj2OQnUnPYoaCKHiEn0baQG6HT5m01p96meKwAsXJWo4PRMgRCSFVV37ing1/RZ6Wm1Nks0kLZbcDyy2J2Fd0ql6b4U3g3LRYc+EJh0P6E4qMvieOcn+fNAg9B0O5eqXRFcMIHiytxNkHRWERs5RYbtRLSO1JwBnKhJJx7ANEqWr4VJ6v5bJyh0UkjcAKxpOvanqt/lpJePbtJzKkXkM2x3/Og3+e1JLzrQR6TFQD1WBPWSx3Ep7ZCHURtuN9ZT1CPtMw7DHRHFBQFoppL8bcBLZAfNm1pi5DUVya/v/H7eBBEcVfTWjp8Sx2lIHfdGxpR6qjHOjKJxfImmHW598zY5jxxWLoSgU0iYBI6e/13IhKXEVRPN2RVSyS42vTElbbtVego9vV11evdQRHXlke625FuoA38MzKx6aF1oWHRgPt2a7ts0LH97mWq40UrlPcU4LOeV5TpoddVfXoJKBTi/sj2GtsNL9EAJhMr05z/9uh7rIVX+UgZ68GmsHfg2eXzLA5p6bxCKz+12AhKqJHzDqxVLmNhMM/68RooyJ0q0OX7X0Wfe5iq25K2ipf3MtfVmQSlzvgqI789hGLxvcSj0H7wJh1YGiabbQalcE+0EZSxNT9tTamvbYVdZoNLW3+eYvKvNcfUfT7sE5TltrWxO+efeMkxnNen3LUo/9tCHd6/qqfxthrRMkorYJpecLWWL0li6EjO4YiKasHMkTV0+OJLInKqSE+l+babKgtElFblpQz69cdPSejEQqmqRbhS6Rk9F6qtZWcDjUL7DI67gnx0PwOX1obf1VEAdsgMofBEr92J5aXYPo8fjSyG7+gk0eMguw8BH/3oFZFEfD7if3euGYubZZOiRBh6T7AkauPhFeT3OOoloRPEynG7qKq1Iv5BG6PDUI/dDHTssxfRxiSANb5IdJ1YLL9+xT23UNeGEmZe1XcLhT7DW0Xjr7ZcyilNmshtQ2bO3lzlylOyfRdpMdCYenmxmftYJEgtdG0yim4RLDkgUiLHOc0hEEc3iObMBkdXiQ2uoMVsMH8OZtfuqI5h/e1282QC3/m0+Tmy3tZHS4QrqWj9SLKifcfmSSzKA3WeNIRdYjTTzSH/L4oC6ASc+QAnSQ0Vce3beUOrvtGs/McGbZab6MgjT/86R3bfc/ARJ2gi/eWglKJBe2mGglLDy2IJjXy9wFHSVTREzDzJzch7WI5s9lWjIwr+A5++xi7rb/8MtKDkfwK7pu0KhjBorHfrsxiYPkt4JiVWfwPWbJNtKbMv1Nt++v47KXXnHZir4u8JBgYmNQ5gsLoZM2Jna9iy6+rI4Xvxblj6EARPcEAgTK0LDKzbliH00q2+OJC1gz+eiFQAS61LQ9ngKPEEN7qeT579T+5aqOCYyCquSiKLpyivGNPTIfpNkwAhy2CYJmU8zRyU/evaPus9B54Jl7rrBq9ryEQWecn1Xz4lUcpl6LmwjWJhJpSqY3IvhyuvnrrIbDIqch3sMCLij+8Qq76OdAqxr+eLmtQbpVz2Ea7OD/WDk2n+KrhEMLfMMLXPUUmOT6b0PWHp7yzlr1MiNlVz9aK80JbkNiv0YP+LdukJa70DNc15TuAB7kifzK4406WdXGjYDsUsY5cqGFGbnYNla7vPM4BfFH+oVA/lCRttBZzVvs9mYvPY9R6rqIWFM7/aG/TLYIvYwv07rCznODl+pSQ5a6n578m32Xj2qum2lqpgvb7a4cFKR4dOIK/pVvWejj9oiPxpbFU8S1XIwtKcs6uzEkt6jE7knL2Tihj55rpo+HV96mn8KuE9606tEk0xYAFFrqb4phXB/Sk/Tde1jN35Igz2Z0ctJoxjQtIB4X/kZBOoSqtqfdNWPNyy26/1YeuHTAME5RkvDNJycIXVlaof0UTOLF6TqJTLRlwNpKey1Sl6rb/oobAb7CFy68TKVtAJ0PCg50jUhlOHJ6W0tycMOm0fCOtM7O0iUe+VGIb8Tgqdv7lH+gFTotQ3MAhnkdN0uhO7yVycvVdbFO8iX2YDIS/5jXHiqFMnQtDq9eCjCWG54WQik0qV3WexzN/L5bVbiQ0kg2N1gfPajQ/FoWgu63VBHQuOkDx5HVJm8NlOVs/bqkSMPHo8YQxX/punvH12LbcEjN2qA5U04VrPSClNF9vCU82dj1ye0eFI/LqjWU/iUItw4P9ZmvWjgB0SbSU24TPwuV0no94bHlRs9tZdYmMfwCTJU+nhdzdMch0d/4UiKpKrp/yCbK2C0JmnDyzhQBcserAV4Detp6IdEJOIy/inqIzj4H+HhbgzvYJv+goWR1UA0DPpyZRC7eiUiFPhi9iXXInS+G6/3zRuAPyzaJC3QJrZzMQhmtWw7wzO/70G31ucyN+dUmew8/e/BLC/EFTG8F2kK0io5MY6MgLS0tbFmJ9noKjXIIhbnrkN4bhRxwOOzFWq4MTiwsbU+S/hLXpgNzJ3ABtT2o7Es2OlR1QpKv/55xRAsVegNaaW68G+8g/aN0is0lI+Bd+vJme1LYkv8D6VcG6PjKpRaTgR4C5CrFnv1AueoaR5KotYLr+uy3jrs1qAdE+hE5Hzf/Lxk30oJy06tq0RUA9bY05g5KXzOt//au+bx4aBtAJXHCGNu8FLNon3/9V8FXYPoKGtabYxSNqeMvl4jniZOpjgc97D6LeOyFrz+STNTuwEti+8ajJIZaPUPPOL/UKPK3wrlUDYSFmFnEE8U896ur/lVRDImODVwgBQmyo8BqDayW30Gi3PzoQgFscMHc3sJ89oVyr4de/p76tZYinreCHEvkumN5BqZL/expV3Zy+H6KxD2N/eQSc7FUH/MLzwMUyNVNHqVCesDPfXY1hX/cFcbTOW2/ONHmLghI04+2TgfWQV4PofP37/I933hpdWCihaN5qizoSXCEAyc9NlrBic8iHGCpu45P9rlstG6lGnfFfjFnrFuqGJErsuDl224KVE1WWnO9R+PyLqo/DY2JYQp/+e7Szg/nZMHGRt2+vdeuCghj3Y3pj2HF909nC/UJMF0zB6I6foBX27vkWUEUGUfdSbP4P0whIPtIjcjoLxCiPjJHcvF30XIv8wDjaEKhECfb8/gsp5swRLdNxOm2xbmWNFpFnOzjxXnTbCJoKqvg3w775PkccUBIlGbE5FPIXMLwYibhvKRms0yU5P9gfO5hbAp5RSra/IMvXZVlI1nvbMXPlDZ22nRuy3dF8NM+8W6YbbfFs/MNLoEfEk1N+pnKkLnpJGe2vFMfSe3PHSQMGuaIV6l1An6n7IXXhgAinvag9dnuM53kdEYvuZpyKAU+U/6W9Qy2SGYg46OJvl1CAVm6zXfZbFJ7TPhIxWqgEH611dj3ni+REVeymWEhW5WtgGBRrnjK0NIueNqT/8aL2MboG0B2OrfF2bp6nwmsdcUk+OPv3xUe7bMNKOlppUzfVYY5+B+rloMk7+3Tbj9aLoGq2noRwKYsSUSe56fiEBxBXoOKM7JGErbzsm5Sxpcv0fewyRh/ZabghD1UWLRVx9njAXS///29heNoPIlffy7Zn+vs4FUrsmK3NuLrWmkSYFYR6UYc+Sl7MgTdSRnrPyy2kB0hfNOD66ip7Ol/8EWuxNXiiCS0CsuuW3wNUjPmyA6t5rqjcPJqL2SRC2iHhT2/CzyECq1unDVjTD4r4MJ+tc4oieLplrQeZozP+333nLwafFuPbYPX+T3FQB+M1M0ZOHsiAGJydvtc+GdpH8YCLywEsEWtr165xga+X1bvgDQ6fBBoZi/iRc/SxfDDewl/9IF0UcM0TwJuy58u8t3pgoCubtu1OTWiBtTXbmjHv6x0LCvMS2HPmwUMyC0w9h8OpZ1X3WtCockHNZnbY9aWAWEKwH1CP/baXk3H6Y5aR6PNLpzM8syfznsmnxnyCyyfPBuu0m+nuWiVw5qU0QEdapt5MIzbuLLjqc3bnTrCJmnU1nRr13zFUbOoyWQ2FRa5WtIrXzvHU1tGzC3CXYSO/g1sCANKp/V+u/9mqmZAjNsgVvmbiQXjWdKYYk8bNzWlk1v+oXnG438t3d0M33JJHQ9NvRydhiDOuTxkHXludNHYweuPNI2zBSc2bRXD+hhjI9YbyrWrSZxrCktc9ZEjz9X2GkN1Ubk8vbSDLbuWX4mvFU1AyW2YlryH2VGp/U4vRaW3CI3bzITCvNxKT2YeHAzkNwx8oO2yqtwp853DzM7hQPbxfI4cH2VAI6iWT02AyCJzO/7z9DodE6pMalsvPqWGh+NZ1HZ6zL+HK6UHX+sd03kgmxy1aYhvkGHjXFBY5CZyEJIqcZ2kQG74QSsJzs3AkUcHgMbNg4UG+i7jhXs1XXQ2GluTdkBF/exXafgEQlmA3Y9fSKPkPEw7SIJyzL06hYPrPOu6O9TToCfK3AirN6WGQ0BVAt7z8VqYVnPL1YwzEoFQdRIHtN9qtOhPqB5WCMoyNsPABILDdROXKTSFEv+TuREramHFhHpaP9pgpOe3BHj74asY5lx4UFwu9hCbbgilgwCgRUNXGHgnmkYfL5I31/0alt1xZPwd9r+X/fv0glIaFpfFlOfFAous/CJt7WV6g366l/G4WEytYmUlxt1LNQhgrVKbPmKFYOIBo6nM+o6eRz0+Di9GLJ1pc4OWbTYghbGmt2NcoiSqZiNy2/mHsHOeJkwn5fdtoc59Fvz6fYiljh+wUsr5IIdabufgSNyI0a64sRWMl4yJKvEwY/MY4jgZLTKVONaK+JhgnoaoaVx4X3xZvChWCeFTt/wfdc/2KuJOgC3J/Y2BT3voQOH1W2UGxo5Th6R0EQrWN4n11hcU5AomdLFhdWNhh/suoEQHE5h9vHWy6PLo2i9Jy4wiM0ep4V1YXJsu56Vb7C9wmTjhgSRg5/NvDK4Gd5/mDkwdF83ITzpN9R0qN6TPft1LNZ2fekl5e3XXYugy8eUud3iRw/ruxWZL1vt/DiEMAfO+yi4w56vpZum66MVt4ptzy9P6OkyOlt0JfmCMARWzN3vOBiBladR8ChqXlvxFTM9GyY3uGBExXGvU7PzhO48LPsCP4g5GMtEFs/wf3rx7H2z6X8WPnkZAV/Y/FeEZvWyVaxt2sEOsRdHFMXHGdT9zewGgb22qOSGiCPiORbhn2LujvovfxFwhTmTmUenJ5DvQVIdLxkDXhYaqWNJrYl/Opimc1+M1Q7DN9ia2l+5KxsuGQjFOKO5DtxYWSVpPcya4TuyztPZBY1OrkmR6tGANE3wg81L4rnP2Ax1BKm6x7biCjV8fkRjDp4JMsKmgjin11ZbHdYySOzKJH92hPipFmWDjPdc8S9+iPE+OU0xQbiTall4sRal5ru/3I7LMPWV0lHmHs5sSbkA40gZTcTGS1DKcL6Ch9idUDKG/6lyMzZoUvHzBAy0VM3M+6nzFrsfurULnFtG2MTrbu+vpVhQXQnN0eCHDbb3yW8GDeQpBdhFn55g0cJ9X3roLhfDbCiXHDNEggVtyaMWVkaQb/Ayl1dQ/N8gBekUpf8/bRtakrvLFt4sKYjeukrysAMh0GA/ko6kRzd7OyRg6eGglNbb4VqRaY8hkXAFE16MEOl0UPdwT5OUK5tA92lDSdhRM5vH2PuUClYNMy5kKecmg3qU4WqaZIb9OsoWgC559ec5AKpTRdfGfbPOVTN6RBwmVAi7B2vghkb9lYI4IxqfXAAIiUkxyjnNQqBBQG3QUalrDjPSGm4NqrO80VgXerPYqDZkP2ptlOPxPhGcPEzn0RWGRkD1ED9i39Tz1/PY2ZJlEnQMBQThhqSxsdMYFDmNgnI3emT3r7NlOu+bOI8yEeM33XLyJdTbSZZt0Uj38yHJlTscoF6enhd66jwV3//+c3W/8K+62j0SJvEjbyVH2eTeBvJiyn+16XR7Q67WrXjVe+mygxaqxV2UIaj6jtZvqGgnoDdUfCrrApkFIcUzHVnvluiIIFLUD3VcdvXkR4n9/9aOZc7l3V3DfL1iLhNm8wnkepLdvtGy7UzOCXTv3SsMleORsJu/9iUJVqNN2MY59Mxk3MU3BSA39W13VvCQAPBHFvnjPvLRvX+6Sum5/rRv9D22+HZX0xNPwm00dwSZZjeZCKidRyRgm6KO62JyEfg0wS/h3eIfkWqNC63w1hhb0/KQSrmRTqLPC6Ia+aXohitBNTFEyptgWMKUSO/9y78Si9o698tpSX/Qf7+DhuSEXsATwwW+1TtMaISb3U6Cj3Auef6D9aojXysk2dsEUf81lFi9lkIu98OSn7TY/OC7vGlax2TTg0XH695lK0Y69l9VZ/ERmkaRhxte0tT8XJq9V2WI62wjWD9cpjmoImGWZJqTE0QG7GoYAQsaRPBMsajoPg7p7E+BmE1v2HpdfsqEaraIozXBTIv4fKZzJtdHj4P4NW4J8WfzObT0O8WKrs4VnBIbDIaSJA9Bb1GERBKRekvuPjCfXOtUj1IcL7NkynlhmzObYDNPus4QazjKY5w1D6dwAUgUDpKsn1hSoni+q50GY5EbCeEpll9rLEXf7jNouIHPAGEJslenVtwZg6t1vU8Alaa/l++p+LFBF0FgPtLfZ/59zElIErFw5NzoyYTCA/94vU6c6vdXS8PRhKkRI+/9idIakzCcZB/tcF4J23zSkMIuj3gINOf/lcwisiVyVn2yKlMgq1wPDQ5BqXa/oJlzQxFGNnt3j2VxWNMY3SNaG3xv26gedHkz9AHGaGzJ4RNF/eixRfMo71y8OqeU2ruMU0KcUhkNojyaC22M8hXv+QPLkGbYli3mykRjf5URpKGQOhxHeUSbp/sZ7WmycDCa3iqPV9KWoGcMlEk5tyfzsc83qOCfLSOouYUcA1oZG103DNHQyDIT3y2KqWwulHYp4DD6Q5CB8mtbdaowgb195auki2sGdorGENw1qmbgkjla3QYh0y/kT7qhVuWUerJJ11Isx4Y5LESSKvIiKtu5lVa2BXrvSYpblDWNsL1eszqmpDLNiW+aUVYtZV0tuDBGl08dWOsalgkc4kYkCsie1Ms0CbS13v27O5SwZ1wj/EVwHuNoVe+ru8+4v7W7686vZs9dJtmk84+omE2Uq7gsYWaySKe0sR5KYsneWY+en3fVBG8E7KUlIi7avNStVTqjq4Njh/FGFsbX7rTVJ5mdxM7gsBJpz3Oj3SHLoWphKkCaZkTqjJMbTWespx7rk+JkTwr8SrqCajQmtzD9MdA95PZG2QIqQ89XV1oxbV4+g4EH2KPv0PdAnEfXdor0xvZb4A5RX+PPSFrseV/wi0Il9EgwwmLSuDFS5NZcUdRpi5EuMRO7KOBccdNHklqW+tmVttWfFhq0wHkJSYz60mykqxGfsY/wLPVjylRzxY6eXVoWblTC/ojP/v69WpfsH4U+x0eQZ5cNe/S8/pDz9R7bOFm2WHUsBbW57qRxuiKwTN3J/NLMnL8gChnSsTKX03Q9bv3Kbxy3CIPfb+zQz3FNtU0XzYDDD95kdSQqBiMVv24Xi2UIQ4pgDgmfjws7ViSV4u4esDuKmVCJMgQUnyy5bRv31hS8f3WyG/w7VbJoCAX3zfksQftyc2Xrj9R3y5FAjJOe/wqHiQL8CHSx9ufcKF1vr9blPtBQgx1C9/1m3uvcve9zMwg+tGK2TDl0m4TGz2L/CJVEe9OkLPxyaV0zA1ltERsiPFWBfsmy0m55PyNIRqnZXmRRknyboec/JEPS4TSJIsirLNo35Bkh+GKo13zkUEpbOVUS/ShJnkmW+g0+EM7vAl3fyesOViygdNNjXZswkkp+rxVnlF7EXboHKTieSWeT948ZQjf5VGne9u7LJni5PpmG/fFljUHgNpI2gLvkTG5Ft/iBXgwT2QbFuKKtwTc/YE631RNWZVxlxiq0Bt2gVMZkKAzUr64vLpqXE8WiIevhSLgV+uequZYPBfNZk+7nZ4vg4xnyav0x8Ytfr4Rjw8ibtyekbcp4Wc/5nFfYMp1OfABqW2Sgrl0OrgbIjN6T/emP2Whm/1KCgt/rrlOjeDnNidK+971Ybnz4nxODVAFO20ayW/PGMa4mABDIaxI3/nyVK/bUR1QVjkrF/8sLSo70rMzIlZAnQJ8hXFaE7wXOdcZ2K5+BDUq6ZyevMAdVL1Z1MyKvkhex6D0alZRPRcMzjNfHk/x0DnHjIPdGaB6Pt1TvmIy1r6dGoQ39qUTea7AhOmlk5hz1IUOnSYhIdtwkwmNeIxhvFOT6ew+yqXRQMO+/IaDhp4zf9l/v87L+ksb3iqUux1b0V9KvfbL2YN56erlb7yAYn2dQ67icIDE/47ORBG54BtAqNaeNCLVSItVRDnju5efbpBrPBxUzlp9uO7JuBrGgJAPu+j4+7KhA5mXaqeVvj5xIoBrklORV/H280VEHXfs7z9y41fRzshhzaAy1lmYoIo8py9xk3uptmN7HNDNLZjhjH3QREChhufS285h2Y5XUv417dSwvKkCGLXhhR6DxOR4S2PuSkoJcxxKj7/DRYXHWa91vqaZDBovsP3J7B3geYQpz7gjoweZ+nFkO9DBENg6SuO/xvJDP9G2+xfq1xH5SLh2jZHxcoOz7imJL3SalGR5ie6rKM9S8HugGvhwiOUI2K8JuC/lUpTK5zUDLxNpVEZl2RnRiPVgZbfQ6psrASSFHZM8qk7boX3wBd7S2FLYZFvSWQ6l77YKW5QUq1PdcTdc9cs/dYwSMtAoNGv6rg7tShfCqS81jMU6+HAUTgHuK0FMdyEK/hOD+a3ltTX9vkIDZ+Ia6mmHWdOSNb4EXrlqHjivb5nOqenDUI6Dc7gB2F6pZFRhQRHFjOL4SBYGd2MjgJKMWg5z+o3MidFY/+F3LsT3tznRj6qaY+73kbbvNt/E/AFm95EItmqejYjzcM+QvelH7dsxSOKqlXVxnXt+svSd0OzESxLBriRN272famAXAGF/oWPJXtSQpuTmcD4Z/0B63Nfn6ykNrdITGKsthDpOURrs3EYmB7UZzqw301+qAqpRr1vrCUzwus+63FNt6gmpFbLhvixDuq0+6H8Sri8BQC31sBs+y/SVF7JgiKS/z4DU6ahUpzOWWdc4qgoYc+/oJev+RdWhyJLUpcihv8DsWkOH+p+hRmeCxAGX9DxUFiN/a8lVmHO+xMfSet4Ogjjd1QFt/njE9ieRQEqJxXSZw+4/b8eiahvaz34Ony9eBsZAz8/8ku0DCavA/vAHcO8N5b6gguZutg4N2oyXpPe0xD3q79zf2muPbOLGLD9BFKXgaCuCT53fIxJb3Tl5x24RWd7epXagBhO1EPMFU2LsiPBwIXdVJMkegjFkgTbNzjI5QOVLJ4++hjXBTJrVcfQBuTTpz84LIMI8NdA0yIsCwt436NXpA+j3iRuaQjLq1HP5o2Ejz+aL2l+v5BSLd/Kt4uMQqtZ412Q9EbiAGC+RCtcAtk/ETswPnB5MiGbBz6snPZwDyQY8B7He7pidDDBJrVo96EimDhWYoLLcmYwcXtzeF0EPHtfzhz1cQW8NalHhAgcZj+UlSOgMbXxs42h8GtIbNATVZ1oOhYHDLmz5REBbhKIDiIaE1+N/KwkHBWpo8hDqQM3S/gsU5eoYe62da+BQwk2wKufkbm9hMt5L/mV1unnZcqG4pxW6ERbR53A4Dsnvrs9WN/sKs2e4TiimA5ASYORd/iGR2wTpgxdqB3iyv+UkfexP7km7ykPHAhFYYDGp5ArwVFoekHjRYfH9fhZCZ/aW4Qxxpgs9RQoRXS8BNqiMfUIsqkDSaaGogCydQNymkwrTGMEKOT7FRZU/4f+/cIERQureGHKZewG8I5mMPsTTCELMnPgl75dJ80CdXV00bZPtyVzEJgiLTipuBGKlHgXFb+iZ1TlWgxlFwPQ1o3Tyx8oEVRqyb/wl+f3B8KfYvpE4wYO0SkkbXgJLss3Kxwzr0tfUpRtHHgMJsT4UB8LKtIlchDXK4uGjMWTIB2Dc1rnfdkRyEDf0ORGcGOlsQWKTpwpZKR5Wxx4e9CuLzgNjyd00dhkrzHcVm0nV/D0Efx3Y1TdJ0ToiNNkTV9DvGokDOmWUpaKWrr1y1rfyOQFFXIyOuUO+mLeSVl2diELvdhphfNaUnxeNRKERxrNFQCZHvFYaSkPVOaGca9tLYRZAFJlVV1gykekp2u/n1DvVttRWAWt+Z4c2rfhEb6BiLGAB3Qn7XuYWt4jCRRC2D8QVeyofjPgcA4yW/m78B5MG/tmz087Py+KSfO/X7lJnwDMsuIbx8gp4OqeyjvGFGLA5N5BNYMBqF/1J41K62ojNGYrGXbAzO2Ju+zp7SkLFgklHzISyk0+8RezJMNF22SAoRrA7RWKX3A0g5kZtjmufSzYbBKd5Oq4tm3T59emyw6/OSw4UTDIdNeFypnACoaE2z88iNtJQcM8ZAVK6Zkz9GwR5ZQ0f4X2mZ2NLV+PSMkglW95PCPUKsQxa4yzPweRK5wiH6bxaPLRbWCCG9iXOkS5J0fxDJB8G4eqhJCuzbhJf4X96ihgZSqjuRk3JvPQWYCw9OKm2WQsyu4bx3JTCpbgsdFrBZyTx8ovxBCPS80bp7Z42amv9O88EJV8KKUkFdyyI/oaRJsS8prSfGlVMPvqnGPDHlmg7rlRTdxQr0Oc83nuCc6yeDoeraCEUbSFnXPWJKyELY9FFnB8uWQ6uALL220AldLP7RGD9mdXOHaAAuYFv6YuXA/jer25lcgLP3rKq+4lxm4MHRl2n4U+HQb6gY6Cp55vKKfEcvU26ryAQvgc83cjaer4KCzkGCq6bE0Zkk67Du2xO3WO6iOr5Q7fwD0qXDh5C2rTHc/idi/TE8q1joeqiaGjFr7ZYPrP+Xp9ev67o7//sglteXoaVzsJSUahM/rRsvBRwRCYAdl+pds7ZpygMpggwsWgraYw7iicyQQhWMJPiFBBg6GYKAX4+MABw5v8PIkMCOBsVFQE/J3UG9jGkCszffIflH/JCH0fDy5akYmLx3W170C9pBVyzBvM3hQfrNC1o5TK6gyywFB7UO6qDU2JRmoHoV3j7ChOPSpxXJKPWtCuMZOop3c6G4uq8ar+uzGvn/ND6OjKXkJojjhtbALRsan5gB7DJgixuDnQuJNimiw9aUX9LpXTzOw4veIhTltmSs0YKJHUZcX20Reh4CUEPNXTNuxBZPs5saGHqn9n2Gzf1NtyUfWzeNrwMEZplJ3+l7rKgRvHEZbkP5kpdPRhg2tWarUKxoZpVuywfcZywBRtQbet4FFA4K10NJoS7Y+2ECPxPn5ttedh8UHCVLJx7JoqLwM++7J5YA/HNeEuv73CxrrjyekKdC5oUbtiBkCvsd7jDP+Noi9o851uBCXFXZj7wfDUgXsXy3b4yidW5SG1m82ZPeubD7N0PIFIbPS2smWC0KPcx/SqNMDdXsx78ZZo/7yQ6AACyVfbtP3W/YdfjSpoGXuTl2FeFo6dsnS141amtzXbtUyoCWALPzUNd5h7lFyzouDFHtz6YWR2I3mYLI+vY9as4JZUz3ELuBOjauH0adpq2VofFBr2FwpydXDCfxQkneMeYu7pn8NkMQx+X3C3fO5M8zjilKC2W9FYe2E6ESq+mDIWU7hwl7Kc5IfJCeKj6IsulSzZeGURTmdf/Jetu5ptLfuu5xNyaPjVIX8drWvuwuiIU0K2NkNR4W21ZjifizwnXRaOwVHmTi1x9amtxscFgjQ4XfiqZnoypB5ersmfWjPE1KxH7GxenpGvAndRQFkGGYUU32JUM+t50GEtaiD4HANvONsBKjscCjEfg9yBopSTnIAAWzb2rD08bdQ2RZdipUBnuvcDfhtGgw9/LruILiB+ej9wPXgbH3YrSivE0N6SJt7aCb8PwvmUHLnffoynwhYZPmDGroNmRB3l2OWQDzCasRIJ8aLYHe0h42lcVgfHcQXQnCH8MJ+Mua5enO34zRdSV/hS8vzJ9YzzwrUhYF4Ew+m0v5Yxi5Tugb6mvr6M6TSrHX5qAn+1oG7P3IknRpwEzTIDX0/OUb4zMJ1cx/8VlNJTQOUJuyN0v6JcaE66/mGEBgNTWeF+XMkBK79vcm7Ro2MnuCI1+qGO3FaXrimn77RHcYzQv+l1SzQ7imFBLwQKC3tlrGF2R4xxxqea7n07OAnvBu3Ltollhih20aTPivijX5NpXKQ32MDdSXY5I25SqEQ4YXOr+lmShaiGiqupl4CCC18e22mZyAsjtqD8g65666UF+TAnlpPK5cIFVNdaz4PNj6TEjT/Yfa5p5AqE/HHRPGa4JDSLxCGavBKvVGkVRXstm5LdXbeABhI9jl08na4jpY+Uyl/UJDjRex/a7Kn1/365aiVBfKdJ9XOueAnGRL+pIALuGdsofvYtCWxnylH4cEd66bv0KRDna/IpGhH+BvwLadhPc623UoeleZIsGAJ0xIcACvuqIOYwTdp8aEL0J5DLJgTk8imUlY8Ui0a4c0gkYvNbGCnzmdiHYnHKyVfi9gEZ/lEMBUX7+VbBssOQ1WGAL+0fwIskFg0njRAji9VsBVx+3g4Xv08s+gAD+rkZgqlRLM9kUTegUhUaF5oB92b5vY9qACh4VjLW+VpidimZngg+Bv1ct/uEdNK7W0OZRFWdYgAzHvjBu8jWeB4xsac55KTfotbs9DfjBpU1hsHe2vW7ihmDYDhnlVHYU6AevX618pFCljmWrMmN+N+d+Z6tUJ1MK8txNqReF0CtOxK7sKo8AROfLGFy89NER32A32DqJNx7Fe+r1zm1zxScPeP25mNoOKqeF6al2jK1ZEKNcn3fz/hno6BOZ4zmn0ADoktVIdFxAEpBlV8KMI0FQnlj/8/7RrAcX7rR1dTZtgJnY1kiJAAFK4M32Z8eVr6HTHkMSUoIWg77HpM+KWW4MkrKJTLKRwchIWchPhf1Z7mExG/LGaLcs2iVvjVrJRDu98vfb7qOFsErEsDnnyrl2+hxxaYl8wW3RBbw+bzKsSV954I6abpV9o/xdW4oSufEJSQ3LAOzpnpo/+/Or8bykStyHSP/bN5nFfA0/DR6ogoANrGQp7gSJvx68twh7P1vdzHQlaeiQOMvzSgjQkDL8Hh5XRViVwqFDTYmomjySjOqrQHnPT56Qs6goHu+zSnN7aACfBunW3R3HIH++r+Q2eVSz30KtzBaDl46MAu+mIGCm2N7874KtXSnxx/qHj7yf/hcghRsuFOKjOEgDZuoGlaTX3nFpgEsi1v5EiJIiwARhIYShEgjzz8zPQviD7zDgbPj3p7/3b8x3S6YGG0geOSpTXuLe7tjJjJbIsZa3LVq87p4q8Vm9VGDAxgJKCTxePH0u3WaUa88LrQ3YdnCtbtN8hNgMdaZRYhRXInR0VNMmK7fUeCLxq8YFpkdh9Qng/Pywc+cmOwvxfxlJ6kTNSyMGeH6JEpCQsr6i4TV8hktOHNy8zpW0rFbUaecX/L8bb3AO1gQYVKoRSgDfqp8NzP2HihFCqjPQbQF18OJYeXEOSAj+KMtFT+HRHSIuk0intLmllXYAjTSy8qPpGkfR2ZuUvOIaMXeWMoAhpmgdLdUCSw9ffCxDJ5MOQUUukucCszZdwVuj0h0GrEB5/Or+IPuJ/9EiA3aU6QgFryR+tBwJLYUWB1xngigLqiqZFUd+uDd5l8jLY6pGdMf6yVoLj/QEDB8ORQy+dETGXPOlz4SNJJK/rK7wzzyrNkMy9PR3Xen3wDwA"],
    [/Pearl\ Export\ hi\-hat\ cymbals/i, "data:image/webp;base64,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"],
    [/Pearl\ Export\ hi\-hat\ stand/i, "data:image/webp;base64,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"],
    [/Pearl\ Export\ drum\ throne/i, "data:image/webp;base64,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"],
    [/Pearl\ Export\ cymbal\ stand/i, "data:image/webp;base64,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"],
    [/Yamaha\ P\-125\ digital\ piano/i, "data:image/webp;base64,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"],
    [/Roland\ FP\-30X\ digital\ piano/i, "data:image/webp;base64,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"],
    [/Yamaha\ P\-45\ digital\ piano/i, "data:image/webp;base64,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"],
    [/Fender\ Player\ Stratocaster\ electric\ guitar/i, "data:image/webp;base64,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"],
    [/Yamaha\ TRBX174\ bass\ guitar/i, "data:image/webp;base64,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"],
    [/Squier\ Affinity\ Jazz\ Bass/i, "data:image/webp;base64,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"],
    [/Ampeg\ BA\-210\ bass\ amplifier/i, "data:image/webp;base64,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"],
    [/Ampeg\ BA\-210\ power\ cable/i, "data:image/webp;base64,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"],
    [/Shure SM58/i, "https://cdn11.bigcommerce.com/s-10xdzq6qo9/images/stencil/1280x1280/products/2419/10107/SM58-LC__15910.1747771514.jpg?c=1"],
    [/Shure SM57/i, bingProductImage("Shure SM57 microphone full product isolated white background")],
    [/Focusrite CM25/i, bingProductImage("Focusrite CM25 condenser microphone full product isolated white background")],
    [/Sennheiser e604/i, bingProductImage("Sennheiser e604 tom microphone full product isolated white background")],
    [/K&M 210\/9 boom microphone stand/i, bingProductImage("K&M 210/9 boom microphone stand full product white background")],
    [/Fender Professional Series instrument cable/i, bingProductImage("Fender Professional Series instrument cable full product white background")],
    [/Mogami Gold Studio XLR cable/i, bingProductImage("Mogami Gold Studio XLR cable full product white background")],
    [/Hosa CPP-830 patch cable/i, bingProductImage("Hosa CPP-830 patch cable full product white background")],
    [/Casio Privia PX-S1100/i, "https://media.guitarcenter.com/is/image/MMGS7/L87081000003000-00-2000x2000.jpg"],
    [/Shure SM81/i, "https://cdn11.bigcommerce.com/s-tsw2okvg64/images/stencil/1280x1280/products/27364/92893/2941-2__79948.1661282599.jpg?c=2"],
  ];

  const matched = modelImages.find(([pattern]) => pattern.test(item.name));
  if (matched) return matched[1];

  // Other one-off prototype items can still use a model-specific reference
  // thumbnail. Duplicate model families above are deliberately normalized.
  return bingProductImage(`${item.name.replace(/\s+\d+$/, "")} product full view`);
};

function EquipmentRow({
  item,
  showDefault = false,
  action,
}: {
  item: Equipment;
  showDefault?: boolean;
  action?: React.ReactNode;
}) {
  const [imageOpen, setImageOpen] = useState(false);
  const imageUrl = equipmentImageUrl(item);

  useEffect(() => {
    if (!imageOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setImageOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [imageOpen]);

  return (
    <>
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <button
              type="button"
              onClick={() => setImageOpen(true)}
              className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              aria-label={`View larger reference image of ${item.name}`}
              title="View larger image"
            >
              <img
                src={imageUrl}
                alt={`Reference image of ${item.name}`}
                className="h-full w-full object-contain p-1.5 transition-transform group-hover:scale-105"
                loading="lazy"
              />
            </button>
            <div className="min-w-0">
              <p className="font-semibold leading-snug">{item.name}</p>
              <p className="mt-0.5 text-xs font-bold tracking-wide text-violet-600">
                {item.id}
              </p>
            </div>
          </div>
          <StatusPill status={item.status} condition={item.condition} />
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-sm">
          {showDefault && (
            <div>
              <dt className="text-xs text-slate-500">Default location</dt>
              <dd className="mt-1 font-medium">{item.defaultLocation}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs text-slate-500">Current location</dt>
            <dd className="mt-1 font-medium">{item.currentLocation}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Working condition</dt>
            <dd className="mt-1 font-medium">{item.condition}</dd>
          </div>
        </dl>
        {action && <div className="mt-auto pt-3">{action}</div>}
      </div>

      {imageOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-[1px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setImageOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`equipment-image-title-${item.id}`}
            className="relative w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <button
              type="button"
              onClick={() => setImageOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Close equipment image"
            >
              <X size={20} />
            </button>
            <div className="pr-12">
              <h2 id={`equipment-image-title-${item.id}`} className="text-lg font-bold text-[#151a31] sm:text-xl">
                {item.name}
              </h2>
              <p className="mt-1 text-sm font-bold tracking-wide text-violet-600">{item.id}</p>
            </div>
            <div className="mt-4 flex max-h-[60vh] min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-4">
              <img
                src={imageUrl}
                alt={`Larger reference image of ${item.name}`}
                className="max-h-[54vh] w-full object-contain"
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Reference image for visual identification. It may not show the exact physical unit currently at TSM.
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Current location</dt>
                <dd className="mt-1 font-semibold">{item.currentLocation}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Working condition</dt>
                <dd className="mt-1 font-semibold">{item.condition}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [history, setHistory] = useState<Screen[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() =>
    startOfMonth(new Date()),
  );
  const [room, setRoom] = useState("MPR 3");
  const [mprSelected, setMprSelected] = useState("");
  const [time, setTime] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [location, setLocation] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [directoryTab, setDirectoryTab] = useState("available");
  const [isAlternativeRoom, setIsAlternativeRoom] = useState(false);
  const [alternativeOriginalTime, setAlternativeOriginalTime] = useState("");
  const [alternativeOriginalSlots, setAlternativeOriginalSlots] = useState<
    string[]
  >([]);
  const statusTabClass =
    "rounded-xl font-medium text-slate-500 data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-violet-300";
  const [demoConflict, setDemoConflict] = useState(false);
  const [conflictConsumed, setConflictConsumed] = useState(false);
  const [conflictSlot, setConflictSlot] = useState("");
  const [recoveringFromConflict, setRecoveringFromConflict] = useState(false);
  const [greeting, setGreeting] = useState("Ready to practise?");

  useEffect(() => {
    setDemoConflict(
      new URLSearchParams(window.location.search).get("demo") === "conflict",
    );
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) setGreeting("Good morning");
      else if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
      else if (hour >= 17 && hour < 20) setGreeting("Good evening");
      else setGreeting("Ready for a late session?");
    };
    updateGreeting();
    const timer = window.setInterval(updateGreeting, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const go = (next: Screen) => {
    setHistory((h) => [...h, screen]);
    setScreen(next);
    window.scrollTo(0, 0);
  };
  const back = () => {
    const next = history.at(-1) || "home";
    setHistory((h) => h.slice(0, -1));
    setScreen(next);
    window.scrollTo(0, 0);
  };
  const home = () => {
    setScreen("home");
    setHistory([]);
    setSelectedDate(null);
    setCalendarMonth(startOfMonth(new Date()));
    setMprSelected("");
    setRoom("MPR 3");
    setTime("");
    setSelectedSlots([]);
    setQuery("");
    setSearched(false);
    setLocation("");
    setLocationQuery("");
    setDirectoryTab("available");
    setDemoConflict(false);
    setConflictConsumed(false);
    setConflictSlot("");
    setRecoveringFromConflict(false);
  };
  const confirm = () => {
    const shouldConflict = demoConflict && !conflictConsumed;
    if (shouldConflict) {
      setConflictConsumed(true);
      setConflictSlot(selectedSlots.at(-1) || time);
    }
    go("recheck");
    window.setTimeout(
      () => setScreen(shouldConflict ? "conflict" : "success"),
      1800,
    );
  };
  const availableForLocation = useMemo(() => {
    const equipmentByLocation: Record<string, Equipment[]> = {
      "MPR 2": mpr2,
      "MPR 3": mpr3,
      "MPR 4": mpr4,
      "MPR 5": mpr5,
      Auditorium: auditorium,
      Studio: studio,
      "Live Room": liveRoom,
      "MP Lab 1": mpLab1,
      "MP Lab 2": mpLab2,
      "Store Room": storeRoom,
    };
    return equipmentByLocation[location] ?? [];
  }, [location]);
  const availableItemsForLocation = availableForLocation.filter(
    (item) => item.status === "ready",
  );
  const unavailableItemsForLocation = availableForLocation
    .filter((item) => item.status !== "ready")
    .sort((a, b) => {
      const severity: Record<Equipment["status"], number> = {
        missing: 0,
        service: 1,
        away: 2,
        attention: 3,
        ready: 4,
      };
      const drumOrder = ["SNARE", "KICK", "RACK-TOM", "FLOOR-TOM"];
      const aDrum = drumOrder.findIndex((part) => a.id.includes(part));
      const bDrum = drumOrder.findIndex((part) => b.id.includes(part));
      return (
        severity[a.status] - severity[b.status] ||
        (aDrum < 0 ? 99 : aDrum) - (bDrum < 0 ? 99 : bDrum)
      );
    });
  const locationHasEquipmentRecords = availableForLocation.length > 0;
  const directoryMatches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const locationOrder: Record<string, number> = {
      "MPR 2": 0,
      "MPR 3": 1,
      "MPR 4": 2,
      "MPR 5": 3,
      Auditorium: 4,
      Studio: 5,
      "Live Room": 6,
      "MP Lab 1": 7,
      "MP Lab 2": 8,
      "Arts Block A": 9,
      "Store Room": 99,
    };
    const unavailableOrder: Record<Equipment["status"], number> = {
      away: 0,
      attention: 1,
      missing: 2,
      service: 3,
      ready: 4,
    };
    const relevance = (item: Equipment) =>
      item.id.toLowerCase() === normalized ||
      item.name.toLowerCase() === normalized
        ? 0
        : 1;
    const locationRank = (item: Equipment) =>
      locationOrder[item.defaultLocation ?? item.currentLocation] ?? 50;
    const matches = directoryEquipment.filter((item) =>
      equipmentMatches(item, query),
    );
    const available = matches
      .filter((item) => item.status === "ready")
      .sort(
        (a, b) =>
          relevance(a) - relevance(b) ||
          locationRank(a) - locationRank(b) ||
          a.name.localeCompare(b.name),
      );
    const unavailable = matches
      .filter((item) => item.status !== "ready")
      .sort(
        (a, b) =>
          relevance(a) - relevance(b) ||
          unavailableOrder[a.status] - unavailableOrder[b.status] ||
          locationRank(a) - locationRank(b) ||
          a.name.localeCompare(b.name),
      );
    return { all: matches, available, unavailable };
  }, [query]);

  if (screen === "home")
    return (
      <HomeScreen
        onBook={() => {
          setDemoConflict(false);
          setConflictConsumed(false);
          setConflictSlot("");
          setRecoveringFromConflict(false);
          go("date");
        }}
        onConflict={() => {
          setDemoConflict(true);
          setConflictConsumed(false);
          setConflictSlot("");
          setRecoveringFromConflict(false);
          go("date");
        }}
        onEquipment={() => {
          setQuery("");
          setSearched(false);
          go("directory-search");
        }}
        conflict={demoConflict}
        greeting={greeting}
      />
    );
  if (screen === "date") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = startOfMonth(today);
    const latestBookableDate = new Date(today);
    latestBookableDate.setDate(today.getDate() + 7);
    const nextMonthStart = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      1,
    );
    const days = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      0,
    ).getDate();
    const leading = calendarMonth.getDay();
    return (
      <Shell
        title="Choose a date"
        subtitle="Select a date to view MPR availability."
        back={back}
      >
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <button
              disabled={sameDay(calendarMonth, currentMonth)}
              onClick={() => {
                setSelectedDate(null);
                setCalendarMonth(
                  new Date(
                    calendarMonth.getFullYear(),
                    calendarMonth.getMonth() - 1,
                    1,
                  ),
                );
              }}
              aria-label="Previous month"
              className="grid h-11 w-11 place-items-center rounded-xl text-xl text-slate-500 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
            >
              ‹
            </button>
            <strong aria-live="polite">{monthName(calendarMonth)}</strong>
            <button
              disabled={nextMonthStart > latestBookableDate}
              onClick={() => {
                setSelectedDate(null);
                setCalendarMonth(nextMonthStart);
              }}
              aria-label="Next month"
              className="grid h-11 w-11 place-items-center rounded-xl text-xl text-slate-500 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="py-2 text-xs font-bold text-slate-400">
                {d}
              </span>
            ))}
            {Array.from({ length: leading }, (_, i) => (
              <span key={`blank-${i}`} aria-hidden="true" />
            ))}
            {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
              const value = new Date(
                calendarMonth.getFullYear(),
                calendarMonth.getMonth(),
                d,
              );
              const isToday = sameDay(value, today);
              const isPast = value < today;
              const isTooFar = value > latestBookableDate;
              const isSelected = selectedDate
                ? sameDay(value, selectedDate)
                : false;
              return (
                <button
                  key={d}
                  disabled={isPast || isTooFar}
                  onClick={() => setSelectedDate(value)}
                  aria-label={`${longDate(value)}${isToday ? ", today" : ""}${isPast ? ", unavailable" : isTooFar ? ", booking not open yet" : ""}`}
                  aria-current={isToday ? "date" : undefined}
                  className={`h-11 rounded-xl text-sm font-medium transition ${isSelected ? "bg-violet-600 text-white shadow-lg shadow-violet-200" : isPast || isTooFar ? "cursor-not-allowed text-slate-300" : isToday ? "bg-violet-50 text-violet-700 ring-1 ring-violet-300" : "hover:bg-slate-50"}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-xs font-medium text-slate-500">
            Bookings open on a rolling seven-day window.
          </p>
        </div>
        <ActionBar>
          <Primary disabled={!selectedDate} onClick={() => go("mpr")}>
            View Availability <ArrowRight />
          </Primary>
        </ActionBar>
      </Shell>
    );
  }
  if (screen === "mpr")
    return (
      <Shell
        title="Choose an MPR"
        subtitle={`Selected date: ${longDate(selectedDate || new Date())}`}
        back={back}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {["MPR 2", "MPR 3", "MPR 4", "MPR 5"].map((r) => (
            <button
              key={r}
              onClick={() => setMprSelected(r)}
              className={`flex min-h-16 w-full items-center justify-between rounded-2xl border p-4 text-left font-semibold transition ${mprSelected === r ? "border-violet-500 bg-violet-50 text-violet-800 shadow-sm" : "border-slate-200 bg-white hover:border-violet-200"}`}
            >
              <span>{r}</span>
              {mprSelected === r && (
                <Check
                  className="rounded-full bg-violet-600 p-1 text-white"
                  size={24}
                />
              )}
            </button>
          ))}
        </div>
        <ActionBar>
          <Primary
            disabled={!mprSelected}
            onClick={() => {
              setRoom(mprSelected);
              if (recoveringFromConflict && mprSelected === "MPR 5") {
                setAlternativeOriginalTime(time);
                setAlternativeOriginalSlots(selectedSlots);
                setIsAlternativeRoom(true);
              } else {
                setTime("");
                setSelectedSlots([]);
                setIsAlternativeRoom(false);
                setAlternativeOriginalTime("");
                setAlternativeOriginalSlots([]);
              }
              setRecoveringFromConflict(false);
              go(`slots${mprSelected.slice(-1)}` as Screen);
            }}
          >
            View MPR Time Slots <ArrowRight />
          </Primary>
        </ActionBar>
      </Shell>
    );
  const bookingDate = bookingDateForSlots(selectedDate || new Date(), selectedSlots);

  if (["slots2", "slots3", "slots4", "slots5"].includes(screen)) {
    const baseBooked =
      room === "MPR 2"
        ? booked2
        : room === "MPR 4"
          ? booked4
          : room === "MPR 5"
            ? booked5
            : booked3;
    const booked = new Set(baseBooked);
    if (conflictConsumed && conflictSlot) {
      booked.add(conflictSlot);
    }
    return (
      <Slots
        room={room}
        date={selectedDate || new Date()}
        selectedSlots={selectedSlots}
        setSelectedSlots={(slots) => {
          setSelectedSlots(slots);
          setTime(timeRangeLabel(slots));
        }}
        booked={booked}
        back={back}
        alternativeRoom={screen === "slots5" && isAlternativeRoom}
        originalTime={alternativeOriginalTime}
        originalSlots={alternativeOriginalSlots}
        onContinue={() => go(`setup${room.slice(-1)}` as Screen)}
      />
    );
  }
  if (["setup2", "setup3", "setup4", "setup5"].includes(screen)) {
    const data =
      room === "MPR 2"
        ? mpr2
        : room === "MPR 4"
          ? mpr4
          : room === "MPR 5"
            ? mpr5
            : mpr3;
    const ready = data.filter((x) => x.status === "ready");
    const unavailable = data.filter((x) => x.status !== "ready");
    return (
      <Shell
        title={`${room} setup`}
        subtitle="Review assigned equipment before continuing."
        back={back}
        home={home}
      >
        <Summary room={room} time={time} date={bookingDate} />
        <h2 className="mb-2.5 mt-4 text-lg font-semibold sm:mb-3 sm:mt-6">
          Available now{" "}
          <span className="text-emerald-600">
            {ready.length}/{data.length}
          </span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ready.map((x) => (
            <EquipmentRow key={x.id} item={x} />
          ))}
        </div>
        <ActionBar>
          {unavailable.length > 0 && (
            <button
              onClick={() => go(room === "MPR 5" ? "issues5" : "issues3")}
              className="flex min-h-11 w-full items-center justify-between rounded-2xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-left text-amber-950 transition hover:bg-amber-100 sm:min-h-12 sm:px-4 sm:py-3"
            >
              <span>
                <strong className="text-sm">
                  {unavailable.length} assigned items need attention
                </strong>
                <small className="block text-xs leading-4 text-amber-800 sm:mt-0.5">
                  View their status and your options.
                </small>
              </span>
              <ArrowRight className="shrink-0" size={19} />
            </button>
          )}
          <Primary onClick={() => go("review")}>
            Continue to Reservation <ArrowRight />
          </Primary>
        </ActionBar>
      </Shell>
    );
  }
  if (screen === "issues3") {
    const mixer = mpr3.find((item) => item.id === "MIX-01")!;
    const microphoneStand = mpr3.find((item) => item.id === "MS-01")!;
    return (
      <Shell
        title="Equipment availability issues"
        subtitle="Two assigned items are not currently available in MPR 3."
        scrollHint="Review both affected items and available alternatives."
        back={back}
      >
        <Summary room="MPR 3" time={time} date={bookingDate} />
        <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-2">
          <Issue
            item={mixer}
            reason="Currently located outside MPR 3."
            action="Search Alternatives"
            onAction={() => {
              setQuery("Mixer");
              setSearched(false);
              go("mixer-search");
            }}
          />
          <Issue
            item={microphoneStand}
            reason="Currently located outside MPR 3."
            action="Search Alternatives"
            onAction={() => {
              setQuery("Microphone stand");
              setSearched(false);
              go("stand-search");
            }}
          />
        </div>
        <ActionBar>
          <Primary onClick={() => go("review")}>
            Continue Booking without These Items
          </Primary>
        </ActionBar>
      </Shell>
    );
  }
  if (screen === "issues5") {
    const issueOrder: Record<Equipment["status"], number> = {
      missing: 0,
      service: 1,
      away: 2,
      attention: 3,
      ready: 4,
    };
    const affected = mpr5
      .filter((item) => item.status !== "ready")
      .sort(
        (a, b) =>
          issueOrder[a.status] - issueOrder[b.status] ||
          a.name.localeCompare(b.name),
      );
    return (
      <Shell
        title="Equipment availability issues"
        subtitle={`${affected.length} assigned items need attention in MPR 5.`}
        scrollHint={`Scroll to review all ${affected.length} affected items.`}
        back={back}
      >
        <Summary room="MPR 5" time={time} date={bookingDate} />
        <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-2">
          {affected.map((item) => (
            <Issue
              key={item.id}
              item={item}
              reason={
                item.status === "missing"
                  ? "Its current location cannot be confirmed."
                  : item.status === "attention"
                    ? "Needs tuning before reliable use."
                    : item.status === "service"
                      ? "Out of service and not currently usable."
                      : "Currently located outside MPR 5."
              }
            />
          ))}
        </div>
        <ActionBar>
          <Primary onClick={() => go("review")}>
            Continue Booking without These Items
          </Primary>
        </ActionBar>
      </Shell>
    );
  }
  if (screen === "mixer-search" || screen === "stand-search") {
    const mixer = screen === "mixer-search";
    const resultOrder: Record<Equipment["status"], number> = {
      ready: 0,
      away: 1,
      attention: 2,
      missing: 3,
      service: 4,
    };
    const results = directoryEquipment
      .filter((item) => equipmentMatches(item, query))
      .sort(
        (a, b) =>
          resultOrder[a.status] - resultOrder[b.status] ||
          a.name.localeCompare(b.name),
      );
    const scrollHint =
      searched && results.length > 4
        ? `Scroll to review all ${results.length} matching items.`
        : "";
    return (
      <Shell
        title={`Search for another ${mixer ? "mixer" : "microphone stand"}`}
        subtitle="Search the full equipment directory before deciding."
        scrollHint=""
        back={back}
      >
        <label className="text-sm font-semibold" htmlFor="equipment-query">
          Equipment name or ID
        </label>
        <form
          className="mt-2 flex gap-2 max-sm:flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            if (query.trim()) setSearched(true);
          }}
        >
          <Input
            id="equipment-query"
            value={query}
            placeholder="e.g., monitor, microphone or equipment ID"
            onChange={(e) => {
              setQuery(e.target.value);
              setSearched(false);
            }}
            className="min-h-12 rounded-2xl bg-white"
          />
          <Button
            type="submit"
            disabled={!query.trim()}
            className="min-h-12 rounded-2xl bg-violet-600 px-5 max-sm:w-full"
          >
            <Search size={18} /> Search
          </Button>
        </form>
        {searched &&
          (results.length > 0 ? (
            <>
              <p className="mt-5 text-sm font-medium text-slate-600">
                {results.length} {results.length === 1 ? "result" : "results"}{" "}
                for “{query.trim()}”
              </p>
              {scrollHint && (
                <p className="mt-1 text-sm text-slate-500">{scrollHint}</p>
              )}
              <div className="mt-3 grid items-stretch gap-3 sm:grid-cols-2">
                {results.map((item) => (
                  <EquipmentRow
                    key={item.id}
                    item={item}
                    showDefault
                    action={
                      item.id === "MIX-02" ? (
                        <Button
                          onClick={() => {
                            setAlternativeOriginalTime(time);
                            setAlternativeOriginalSlots(selectedSlots);
                            setRoom("MPR 5");
                            setIsAlternativeRoom(true);
                            go("slots5");
                          }}
                          className="min-h-11 w-full rounded-xl bg-orange-500 text-white hover:bg-orange-600"
                        >
                          View MPR 5 Availability <ArrowRight />
                        </Button>
                      ) : undefined
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            <SearchEmpty query={query} />
          ))}
        <ActionBar>
          <Button
            variant="outline"
            onClick={() => go("review")}
            className="min-h-12 w-full rounded-2xl border-violet-300 bg-white font-semibold text-violet-700 shadow-sm hover:border-violet-400 hover:bg-violet-50 hover:text-violet-800"
          >
            Continue Booking Without {mixer ? "Mixer" : "Microphone Stand"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setScreen("setup3")}
            className="min-h-12 w-full rounded-2xl font-semibold text-violet-700 hover:bg-violet-50 hover:text-violet-800"
          >
            Return to MPR 3 Setup
          </Button>
        </ActionBar>
      </Shell>
    );
  }
  if (screen === "review") {
    const data =
      room === "MPR 2"
        ? mpr2
        : room === "MPR 4"
          ? mpr4
          : room === "MPR 5"
            ? mpr5
            : mpr3;
    const reviewOrder: Record<Equipment["status"], number> = {
      missing: 0,
      service: 1,
      away: 2,
      attention: 3,
      ready: 4,
    };
    const unavailable = data
      .filter((x) => x.status !== "ready")
      .sort(
        (a, b) =>
          reviewOrder[a.status] - reviewOrder[b.status] ||
          a.name.localeCompare(b.name),
      );
    const hasIssues = unavailable.length > 0;
    return (
      <Shell
        title="Review reservation"
        subtitle="Check the details before confirming."
        back={back}
      >
        <Summary room={room} time={time} date={bookingDate} />
        <div
          className={`mt-3.5 rounded-2xl border bg-white p-3.5 sm:mt-5 sm:p-4 ${hasIssues ? "border-amber-200" : "border-slate-200"}`}
        >
          <div className="flex items-start gap-2.5 sm:gap-3">
            {hasIssues ? (
              <TriangleAlert className="mt-0.5 shrink-0 text-amber-600" />
            ) : (
              <ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" />
            )}
            <div>
              <h2 className="font-semibold">Equipment readiness</h2>
              {hasIssues ? (
                <>
                  <p className="text-sm font-medium text-amber-900">
                    {unavailable.length} of {data.length} assigned items need
                    attention.
                  </p>
                  <p className="text-xs leading-4 text-slate-500 sm:mt-0.5">
                    {data.length - unavailable.length} items are currently
                    available.
                  </p>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  All {data.length} assigned items are currently available.
                </p>
              )}
            </div>
          </div>
          {unavailable.map((x) => (
            <div
              key={x.id}
              className="mt-2.5 flex items-center justify-between gap-3 border-t border-slate-100 pt-2.5 text-sm sm:mt-3 sm:pt-3"
            >
              <span>
                {x.name} · {x.id}
              </span>
              <StatusPill status={x.status} condition={x.condition} />
            </div>
          ))}
        </div>
        <ActionBar>
          <Primary onClick={confirm}>Confirm Reservation</Primary>
          <Button
            variant="outline"
            onClick={home}
            className="min-h-10 w-full rounded-2xl border-slate-300 bg-white py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 sm:min-h-12 sm:py-0 sm:text-base"
          >
            Cancel and Return Home
          </Button>
        </ActionBar>
      </Shell>
    );
  }
  if (screen === "recheck")
    return (
      <Shell
        title="Rechecking availability"
        subtitle="Please wait while we confirm that your selected time is still available."
      >
        <Summary room={room} time={time} date={bookingDate} />
        <div className="mt-6 rounded-3xl border border-violet-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 animate-pulse place-items-center rounded-full bg-violet-100 text-violet-700">
            <Clock3 />
          </div>
          <h2 className="mt-4 font-semibold">Checking availability…</h2>
          <p className="mt-2 text-sm text-slate-500">
            Your reservation has not been created yet.
          </p>
        </div>
      </Shell>
    );
  if (screen === "success")
    return (
      <Shell title="Reservation confirmed">
        <div
          role="status"
          className="flex items-center gap-3 rounded-3xl border border-emerald-600 bg-emerald-600 p-4 text-white shadow-lg shadow-emerald-200/70 sm:gap-4 sm:p-5"
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20">
            <Check size={27} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">You’re practice ready.</h2>
            <p className="mt-1 text-sm leading-6 text-emerald-50">
              {room} is reserved for {time}.
            </p>
          </div>
        </div>
        <ConfirmationDetails
          room={room}
          time={time}
          date={bookingDate}
        />
        <ActionBar>
          <Primary onClick={home}>Return Home</Primary>
        </ActionBar>
      </Shell>
    );
  if (screen === "conflict")
    return (
      <Shell
        title={
          selectedSlots.length > 1
            ? "Part of your selected time is no longer available"
            : "Selected time no longer available"
        }
        subtitle="Your reservation was not created."
      >
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 sm:p-5">
          <TriangleAlert className="text-rose-600" size={30} />
          <h2 className="mt-3 text-xl font-semibold text-rose-950 sm:mt-4">
            {conflictSlot} was just booked by someone else.
          </h2>
          <p className="mt-1.5 text-sm leading-5 text-rose-800 sm:mt-2 sm:leading-6">
            {selectedSlots.length > 1
              ? `This 30-minute interval is part of your selected ${time} booking in ${room} on ${longDate(bookingDate)}.`
              : `Another student reserved ${room} on ${longDate(bookingDate)} from ${time} before your booking was confirmed.`}
          </p>
        </div>
        <ActionBar>
          <Primary
            onClick={() => {
              const remainingSlots = selectedSlots.filter(
                (slot) => slot !== conflictSlot,
              );
              setSelectedSlots(remainingSlots);
              setTime(timeRangeLabel(remainingSlots));
              go(`slots${room.slice(-1)}` as Screen);
            }}
          >
            Adjust Time Selection in {room}
          </Primary>
          <Button
            variant="outline"
            onClick={() => {
              setMprSelected("");
              setRecoveringFromConflict(true);
              go("mpr");
            }}
            className="min-h-12 w-full rounded-2xl border-violet-300 bg-white font-semibold text-violet-700 shadow-sm hover:border-violet-400 hover:bg-violet-50 hover:text-violet-800"
          >
            Choose Another MPR
          </Button>
          <Button
            variant="outline"
            onClick={home}
            className="min-h-12 w-full rounded-2xl border-slate-300 bg-white font-semibold text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
          >
            Return Home
          </Button>
        </ActionBar>
      </Shell>
    );
  if (screen === "directory-search") {
    const activeMatches =
      directoryTab === "available"
        ? directoryMatches.available
        : directoryMatches.unavailable;
    const scrollHint =
      searched && activeMatches.length > 4
        ? `Scroll to review all ${activeMatches.length} ${directoryTab} matches.`
        : "";
    return (
      <Shell
        title="Equipment directory"
        subtitle="Check equipment locations and working conditions."
        scrollHint=""
        back={back}
        home={home}
      >
        <Tabs
          defaultValue="search"
          onValueChange={(v) => v === "browse" && go("directory-browse")}
        >
          <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl">
            <TabsTrigger value="search" className="rounded-xl">
              Search Equipment
            </TabsTrigger>
            <TabsTrigger value="browse" className="rounded-xl">
              Browse by Location
            </TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="mt-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) {
                  setDirectoryTab("available");
                  setSearched(true);
                }
              }}
            >
              <label
                className="text-sm font-semibold"
                htmlFor="directory-query"
              >
                Equipment name or ID
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <Input
                  id="directory-query"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearched(false);
                    setDirectoryTab("available");
                  }}
                  placeholder="e.g. microphone or SM58"
                  className="min-h-12 rounded-2xl bg-white"
                />
                <Button
                  type="submit"
                  disabled={!query.trim()}
                  className="min-h-12 w-full rounded-2xl bg-violet-600 disabled:bg-slate-200 disabled:text-slate-400 sm:w-auto"
                >
                  <Search /> Search
                </Button>
              </div>
            </form>
            {searched &&
              (directoryMatches.all.length > 0 ? (
                <>
                  <p className="mt-5 text-sm font-medium text-slate-600">
                    {directoryMatches.all.length}{" "}
                    {directoryMatches.all.length === 1 ? "result" : "results"}{" "}
                    for “{query.trim()}”
                  </p>
                  <Tabs
                    value={directoryTab}
                    onValueChange={setDirectoryTab}
                    className="mt-3"
                  >
                    <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl">
                      <TabsTrigger value="available" className={statusTabClass}>
                        Available{" "}
                        <span className="ml-1 text-xs opacity-70">
                          ({directoryMatches.available.length})
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="unavailable"
                        className={statusTabClass}
                      >
                        Unavailable{" "}
                        <span className="ml-1 text-xs opacity-70">
                          ({directoryMatches.unavailable.length})
                        </span>
                      </TabsTrigger>
                    </TabsList>
                    {scrollHint && (
                      <p className="mt-3 text-sm font-normal text-slate-500">
                        {scrollHint}
                      </p>
                    )}
                    <TabsContent
                      value="available"
                      className="mt-4 grid gap-3 sm:grid-cols-2"
                    >
                      {directoryMatches.available.length ? (
                        directoryMatches.available.map((x) => (
                          <EquipmentRow key={x.id} item={x} showDefault />
                        ))
                      ) : (
                        <SearchTabEmpty
                          type="available"
                          count={directoryMatches.unavailable.length}
                        />
                      )}
                    </TabsContent>
                    <TabsContent
                      value="unavailable"
                      className="mt-4 grid gap-3 sm:grid-cols-2"
                    >
                      {directoryMatches.unavailable.length ? (
                        directoryMatches.unavailable.map((x) => (
                          <EquipmentRow key={x.id} item={x} showDefault />
                        ))
                      ) : (
                        <SearchTabEmpty
                          type="unavailable"
                          count={directoryMatches.available.length}
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <SearchEmpty query={query} />
              ))}
          </TabsContent>
        </Tabs>
      </Shell>
    );
  }
  if (screen === "directory-browse")
    return (
      <Shell
        title="Browse by location"
        subtitle="Choose a TSM location to view its assigned equipment."
        back={back}
        home={home}
      >
        <div className="grid grid-cols-2 gap-3">
          {locations.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocation(l);
                setLocationQuery("");
                setDirectoryTab("available");
              }}
              className={`min-h-14 rounded-2xl border p-3 font-semibold ${location === l ? "border-violet-500 bg-violet-50 text-violet-800" : "border-slate-200 bg-white"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <ActionBar>
          <Primary disabled={!location} onClick={() => go("directory-results")}>
            View Equipment <ArrowRight />
          </Primary>
        </ActionBar>
      </Shell>
    );
  if (screen === "directory-results") {
    const normalizedLocationQuery = normalizeEquipmentSearch(locationQuery);
    const matchesLocationQuery = (item: Equipment) =>
      !normalizedLocationQuery || equipmentMatches(item, locationQuery);
    const filteredAvailableItems = availableItemsForLocation.filter(matchesLocationQuery);
    const filteredUnavailableItems = unavailableItemsForLocation.filter(matchesLocationQuery);
    const activeItems =
      directoryTab === "available"
        ? filteredAvailableItems
        : filteredUnavailableItems;
    const activeCount = activeItems.length;
    const scrollHint = normalizedLocationQuery
      ? `${activeCount} ${directoryTab} item${activeCount === 1 ? "" : "s"} match “${locationQuery.trim()}”.`
      : locationHasEquipmentRecords && activeCount > 4
        ? `Scroll to review all ${activeCount} ${directoryTab} items.`
        : "";
    return (
      <Shell
        title={`${location} equipment`}
        subtitle="Review current locations and working conditions."
        scrollHint=""
        back={back}
        home={home}
      >
        <div className="mb-5">
          <label className="text-sm font-semibold" htmlFor="location-equipment-query">
            Search equipment in {location}
          </label>
          <Input
            id="location-equipment-query"
            className="mt-2 h-12 rounded-2xl bg-white"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Search by equipment name or ID..."
            autoComplete="off"
          />
        </div>
        <Tabs value={directoryTab} onValueChange={setDirectoryTab}>
          <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl">
            <TabsTrigger value="available" className={statusTabClass}>
              Available{" "}
              <span className="ml-1 text-xs opacity-70">
                ({normalizedLocationQuery ? filteredAvailableItems.length : availableItemsForLocation.length})
              </span>
            </TabsTrigger>
            <TabsTrigger value="unavailable" className={statusTabClass}>
              Unavailable{" "}
              <span className="ml-1 text-xs opacity-70">
                ({normalizedLocationQuery ? filteredUnavailableItems.length : unavailableItemsForLocation.length})
              </span>
            </TabsTrigger>
          </TabsList>
          {scrollHint && (
            <p className="mt-3 text-sm font-normal text-slate-500">
              {scrollHint}
            </p>
          )}
          <TabsContent
            value="available"
            className="mt-5 grid gap-3 sm:grid-cols-2"
          >
            {!locationHasEquipmentRecords ? (
              <NoEquipmentRecords />
            ) : filteredAvailableItems.length === 0 ? (
              normalizedLocationQuery ? (
                <SearchEmpty query={locationQuery.trim()} />
              ) : (
                <NoAvailableItems />
              )
            ) : (
              filteredAvailableItems.map((x) => (
                <EquipmentRow key={x.id} item={x} />
              ))
            )}
          </TabsContent>
          <TabsContent
            value="unavailable"
            className="mt-5 grid gap-3 sm:grid-cols-2"
          >
            {!locationHasEquipmentRecords ? (
              <NoEquipmentRecords />
            ) : filteredUnavailableItems.length === 0 ? (
              normalizedLocationQuery ? (
                <SearchEmpty query={locationQuery.trim()} />
              ) : (
                <EmptyState
                  count={availableItemsForLocation.length}
                  location={location}
                />
              )
            ) : (
              filteredUnavailableItems.map((x) => (
                <EquipmentRow key={x.id} item={x} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </Shell>
    );
  }
  return null;
}

function HomeScreen({
  onBook,
  onConflict,
  onEquipment,
  conflict,
  greeting,
}: {
  onBook: () => void;
  onConflict: () => void;
  onEquipment: () => void;
  conflict: boolean;
  greeting: string;
}) {
  const bars = [28, 46, 64, 38, 74, 52, 34, 68, 44, 58, 30, 50];
  return (
    <main className="min-h-screen bg-[#f7f8fc] text-[#151a31]">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#10152b] p-14 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
          <div className="relative flex items-center gap-3 text-sm font-semibold tracking-wide text-white">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-500">
              <Music2 size={20} />
            </span>
            TRUE SCHOOL OF MUSIC
          </div>
          <div className="relative">
            <p className="mb-5 text-sm font-bold uppercase tracking-[.22em] text-orange-300">
              Practice Ready
            </p>
            <h1 className="text-5xl font-semibold leading-[1.06] tracking-[-.04em] text-white">
              Walk in ready.
              <br />
              Not wondering.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
              Find an open practice room and check its equipment before your
              session begins.
            </p>
          </div>
          <div className="relative flex h-24 items-end gap-2">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-3 rounded-full bg-gradient-to-t from-violet-500 to-orange-300"
                style={{ height: h }}
              />
            ))}
          </div>
        </section>
        <section className="flex min-h-screen items-center px-5 py-5 sm:px-10 sm:py-8 lg:px-20">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-6 flex items-center justify-between sm:mb-10 lg:hidden">
              <Brand />
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
                TSM
              </span>
            </div>
            <p className="mb-2 text-sm font-semibold text-violet-700">
              {greeting}
            </p>
            <h2 className="text-[2rem] font-semibold leading-tight tracking-[-.035em] sm:text-4xl">
              What do you need for practice?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Book a room or check where equipment is and whether it works.
            </p>
            <div className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
              <HomeCard
                dark
                icon={<CalendarDays />}
                title="Book a Room"
                text="View available times and reserve an MPR."
                onClick={onBook}
              />
              <HomeCard
                icon={<Headphones />}
                title="Equipment"
                text="Check equipment locations and working conditions."
                onClick={onEquipment}
              />
              <HomeCard
                icon={<TriangleAlert />}
                title="Booking Conflict Demo"
                text="See what happens when another student books your selected slot first."
                onClick={onConflict}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
function HomeCard({
  dark = false,
  icon,
  title,
  text,
  onClick,
}: {
  dark?: boolean;
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-[1.4rem] px-4 py-3.5 text-left shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300 sm:gap-4 sm:p-5 ${dark ? "bg-[#151a31] text-white hover:bg-[#1b213c]" : "border border-violet-200 bg-[#f7f5ff] text-[#151a31] shadow-violet-100/70 hover:border-violet-300 hover:bg-[#f1edff]"}`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${dark ? "bg-violet-500" : "bg-violet-600 text-white"}`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <strong className="block text-lg">{title}</strong>
        <span
          className={`mt-1 block text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}
        >
          {text}
        </span>
      </span>
      <ArrowRight
        className={`transition-transform group-hover:translate-x-1 ${dark ? "" : "text-violet-700"}`}
      />
    </button>
  );
}
function Slots({
  room,
  date,
  selectedSlots,
  setSelectedSlots,
  booked,
  back,
  alternativeRoom = false,
  originalTime = "",
  originalSlots = [],
  onContinue,
}: {
  room: string;
  date: Date;
  selectedSlots: string[];
  setSelectedSlots: (slots: string[]) => void;
  booked: Set<string>;
  back: () => void;
  alternativeRoom?: boolean;
  originalTime?: string;
  originalSlots?: string[];
  onContinue: () => void;
}) {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  const [limitMessage, setLimitMessage] = useState("");
  const selectedRange = timeRangeLabel(selectedSlots);
  const selectionHasBookedSlot = selectedSlots.some((slot) => booked.has(slot));

  useEffect(() => {
    if (!limitMessage) return;
    const timer = window.setTimeout(() => setLimitMessage(""), 3500);
    return () => window.clearTimeout(timer);
  }, [limitMessage]);

  const selectSlot = (slot: string) => {
    const slotIndex = allTimeSlots.indexOf(slot);
    if (slotIndex < 0 || booked.has(slot)) return;

    let next: string[] = [];

    if (selectedSlots.length === 0) {
      next = [slot];
    } else {
      const selectedIndices = selectedSlots
        .map((item) => allTimeSlots.indexOf(item))
        .filter((index) => index >= 0);
      const firstIndex = Math.min(...selectedIndices);
      const lastIndex = Math.max(...selectedIndices);

      if (selectedSlots.length > 1 && slotIndex >= firstIndex && slotIndex <= lastIndex) {
        next = allTimeSlots.slice(firstIndex, slotIndex + 1);
      } else if (selectedSlots.length === 1 && slotIndex === firstIndex) {
        next = [];
      } else {
        const rangeStart = Math.min(firstIndex, slotIndex);
        const rangeEnd = Math.max(firstIndex, slotIndex);
        const candidate = allTimeSlots.slice(rangeStart, rangeEnd + 1);

        if (candidate.some((candidateSlot) => booked.has(candidateSlot))) {
          // A booked interval separates this slot from the current selection,
          // so treat the click as the start of a new range instead of an invalid extension.
          next = [slot];
        } else if (candidate.length > 6) {
          const isAdjacentExtension =
            slotIndex === firstIndex - 1 || slotIndex === lastIndex + 1;
          if (isAdjacentExtension) {
            setLimitMessage("Maximum 3 hours selected");
            return;
          }
          // A distant available slot is a new intended start, not an attempt
          // to stretch the existing selection beyond the 3-hour limit.
          next = [slot];
        } else {
          next = candidate;
        }
      }
    }

    setLimitMessage("");
    setSelectedSlots(next);
  };
  return (
    <Shell
      title={`${room} availability`}
      subtitle={longDate(date)}
      back={back}
      headerExtra={
        selectedSlots.length > 0 ? (
          <div className="flex items-center justify-between gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm shadow-sm sm:gap-3 sm:px-4 sm:py-3">
            <span className="font-medium text-slate-600">Selected time</span>
            <strong className="text-right text-violet-800">
              {selectedRange} · {durationLabel(selectedSlots.length)}
            </strong>
          </div>
        ) : undefined
      }
    >
      <div className="mb-3 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-sm sm:mb-5 sm:gap-3 sm:p-4">
        <MapPin className="text-violet-600" size={20} />
        <div>
          <small className="text-slate-500">Selected MPR</small>
          <p className="font-semibold">{room}</p>
        </div>
        <button
          onClick={back}
          className="ml-auto flex items-center gap-1 text-sm font-semibold text-violet-700"
        >
          Change <ChevronDown size={15} />
        </button>
      </div>
      <div className="mb-3 rounded-2xl border border-violet-200 bg-violet-50 px-3.5 py-2.5 text-violet-950 sm:mb-5 sm:px-4 sm:py-4">
        <p className="font-semibold">Select your practice time</p>
        <p className="mt-0.5 text-sm leading-5 text-violet-800 sm:mt-1">
          Choose a start and end time in 30-minute increments. Maximum booking duration: 3 hours.
        </p>
      </div>
      {alternativeRoom && (
        <p className="mb-3 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2.5 text-sm leading-5 text-violet-900 sm:mb-5 sm:px-4 sm:py-3">
          {originalSlots.some((slot) => booked.has(slot))
            ? `Your original ${originalTime} booking is not fully available in ${room}. Choose another available time.`
            : `Your original ${originalTime} booking is available in ${room}. Keep it selected or choose another available time.`}
        </p>
      )}
      <div className="space-y-4 sm:space-y-6">
        {periods.map((p) => (
          <section key={p.name}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              {p.name.startsWith("Late Night")
                ? `Late Night · ${shortDate(nextDay)}`
                : p.name}
            </h2>
            <div className="space-y-2">
              {p.times.map((t) => {
                const isBooked = booked.has(t);
                const isSelected = selectedSlots.includes(t) && !isBooked;
                return (
                  <button
                    key={t}
                    disabled={isBooked}
                    onClick={() => selectSlot(t)}
                    className={`flex min-h-14 w-full items-center justify-between rounded-2xl border px-4 text-left ${isSelected ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200" : isBooked ? "border-slate-200 bg-slate-100 text-slate-400" : "border-emerald-100 bg-white hover:border-emerald-400"}`}
                  >
                    <span className="font-semibold">{t}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${isSelected ? "bg-white/20" : isBooked ? "bg-slate-200" : "bg-emerald-100 text-emerald-700"}`}
                    >
                      {isSelected
                        ? "Selected"
                        : isBooked
                          ? "Booked"
                          : "Available"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {limitMessage && (
        <div
          className="pointer-events-none fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-1/2 z-40 w-[calc(100%-2rem)] max-w-[720px] -translate-x-1/2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950 shadow-lg"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold">{limitMessage}</p>
          <p className="mt-0.5 text-xs text-amber-800">
            Choose a range of up to 3 hours that does not cross a booked time.
          </p>
        </div>
      )}
      <ActionBar>
        <Primary
          disabled={selectedSlots.length === 0 || selectionHasBookedSlot}
          onClick={onContinue}
        >
          View {room} Setup <ArrowRight />
        </Primary>
      </ActionBar>
    </Shell>
  );
}
function Issue({
  item,
  reason,
  action,
  onAction,
}: {
  item: Equipment;
  reason: string;
  action?: string;
  onAction?: () => void;
}) {
  const [imageOpen, setImageOpen] = useState(false);
  const imageUrl = equipmentImageUrl(item);

  useEffect(() => {
    if (!imageOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setImageOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [imageOpen]);

  return (
    <>
      <div className="flex h-full flex-col rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <button
              type="button"
              onClick={() => setImageOpen(true)}
              className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              aria-label={`View larger reference image of ${item.name}`}
              title="View larger image"
            >
              <img
                src={imageUrl}
                alt={`Reference image of ${item.name}`}
                className="h-full w-full object-contain p-1.5 transition-transform group-hover:scale-105"
                loading="lazy"
              />
            </button>
            <div className="min-w-0">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-xs font-bold text-violet-600">{item.id}</p>
            </div>
          </div>
          <StatusPill status={item.status} condition={item.condition} />
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{reason}</p>
        <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-sm">
          <div>
            <dt className="text-xs text-slate-500">Current location</dt>
            <dd className="mt-1 font-semibold">{item.currentLocation}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Working condition</dt>
            <dd className="mt-1 font-semibold">{item.condition}</dd>
          </div>
        </dl>
        {action && onAction && (
          <div className="mt-auto pt-3">
            <Button
              onClick={onAction}
              variant="outline"
              className="min-h-11 w-full rounded-xl border-violet-200 text-violet-700"
            >
              {action}
              <Search />
            </Button>
          </div>
        )}
      </div>

      {imageOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-[1px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setImageOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`issue-equipment-image-title-${item.id}`}
            className="relative w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <button
              type="button"
              onClick={() => setImageOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Close equipment image"
            >
              <X size={20} />
            </button>
            <div className="pr-12">
              <h2 id={`issue-equipment-image-title-${item.id}`} className="text-lg font-bold text-[#151a31] sm:text-xl">
                {item.name}
              </h2>
              <p className="mt-1 text-sm font-bold tracking-wide text-violet-600">{item.id}</p>
            </div>
            <div className="mt-4 flex max-h-[60vh] min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-4">
              <img
                src={imageUrl}
                alt={`Larger reference image of ${item.name}`}
                className="max-h-[54vh] w-full object-contain"
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Reference image for visual identification. It may not show the exact physical unit currently at TSM.
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Current location</dt>
                <dd className="mt-1 font-semibold">{item.currentLocation}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Working condition</dt>
                <dd className="mt-1 font-semibold">{item.condition}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
function SearchEmpty({ query }: { query: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <Search className="mx-auto text-slate-400" />
      <p className="mt-3 font-semibold">No matching equipment found</p>
      <p className="mt-1 text-sm text-slate-500">
        Try another equipment name or ID instead of “{query.trim() || "blank"}”.
      </p>
    </div>
  );
}
function SearchTabEmpty({
  type,
  count,
}: {
  type: "available" | "unavailable";
  count: number;
}) {
  if (type === "unavailable")
    return (
      <AvailabilityClearState
        text={`All ${count} matching ${count === 1 ? "item is" : "items are"} currently available.`}
      />
    );
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:col-span-2">
      <TriangleAlert className="mx-auto text-amber-500" />
      <p className="mt-3 font-semibold">No available matching equipment</p>
      <p className="mt-1 text-sm text-slate-500">
        Check the Unavailable tab for matching equipment that cannot currently
        be used.
      </p>
    </div>
  );
}
function NoEquipmentRecords() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:col-span-2">
      <Search className="mx-auto text-slate-400" />
      <p className="mt-3 font-semibold">No equipment records available</p>
      <p className="mt-1 text-sm text-slate-500">
        Equipment data has not been added for this location.
      </p>
    </div>
  );
}
function NoAvailableItems() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:col-span-2">
      <TriangleAlert className="mx-auto text-amber-500" />
      <p className="mt-3 font-semibold">No available items</p>
      <p className="mt-1 text-sm text-slate-500">
        No assigned equipment is currently available at this location.
      </p>
    </div>
  );
}
function AvailabilityClearState({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-left sm:col-span-2">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <Check size={19} />
      </span>
      <div>
        <p className="font-semibold text-emerald-950">
          All equipment is available
        </p>
        <p className="mt-0.5 text-sm text-emerald-800">{text}</p>
      </div>
    </div>
  );
}
function EmptyState({ count, location }: { count: number; location: string }) {
  return (
    <AvailabilityClearState
      text={`All ${count} recorded ${count === 1 ? "item" : "items"} in ${location} ${count === 1 ? "is" : "are"} currently available.`}
    />
  );
}
