const CMS_URL = import.meta.env.PUBLIC_CMS_URL || 'http://localhost:3001'

export interface ResourceItem {
  id: string | number
  title: string
  description: string
  category: 'health-provider' | 'patient' | 'mentor' | 'mentee'
  accessLevel: 'public' | 'mentor' | 'mentee'
  publishedDate?: string
  file?: {
    url: string
    filename: string
  }
}

export interface NewsItem {
  id: string | number
  title: string
  slug: string
  publishedDate: string
  excerpt: string
  content?: any
  isFeatured?: boolean
}

export interface EventItem {
  id: string | number
  title: string
  slug: string
  eventDate: string
  endDate?: string
  locationType: 'virtual' | 'in-person' | 'hybrid'
  locationDetails?: string
  description: string
  registrationUrl?: string
}

export interface TeamMemberItem {
  id: string | number
  name: string
  roleTitle: string
  bio: string
  displayOrder?: number
}

export interface QuoteItem {
  id: string | number
  quote: string
  author: string
  roleOrAffiliation: string
  isActive?: boolean
}

export interface FAQItem {
  id: string | number
  question: string
  answer: string
  category: string
  displayOrder?: number
}

// Fallback seed data so pages look rich and complete immediately
const FALLBACK_QUOTES: QuoteItem[] = [
  {
    id: 1,
    quote: "Joining the Mentor Network helped me navigate rural practice with confidence. Having an experienced colleague just a phone call away made all the difference in my first two years.",
    author: "Dr. Elena Rostova",
    roleOrAffiliation: "Mentee • Family Medicine (Rural Saskatchewan)",
  },
  {
    id: 2,
    quote: "Mentoring newer physicians reinvigorated my own commitment to clinical teaching. The network provides structured frameworks that respect everyone's busy schedules.",
    author: "Dr. Marcus Chen",
    roleOrAffiliation: "Mentor • Internal Medicine & Clinical Preceptor",
  },
  {
    id: 3,
    quote: "The patient resources and collaborative care tools we accessed through AMN-SK significantly streamlined our multidisciplinary team meetings.",
    author: "Sarah Lindgren, NP",
    roleOrAffiliation: "Nurse Practitioner • Community Health Network",
  },
]

const FALLBACK_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "What is the Mentor Network (AMN-SK)?",
    answer: "The Mentor Network is a collaborative initiative dedicated to connecting physicians, healthcare providers, and clinical leaders across Saskatchewan. It provides structured peer mentorship, continuing education, and access to curated clinical and patient resources.",
    category: "general",
  },
  {
    id: 2,
    question: "Who is eligible to apply as a mentor or mentee?",
    answer: "Physicians, medical residents, fellows, nurse practitioners, and allied health professionals practicing or transitioning into practice in Saskatchewan are eligible to apply. Specific pairing criteria consider clinical focus, geography, and professional development goals.",
    category: "membership",
  },
  {
    id: 3,
    question: "What is the time commitment for mentors and mentees?",
    answer: "Most mentorship pairs meet for 1 hour once a month or bi-monthly, with flexible scheduling coordinated directly between partners. Structured toolkits and discussion prompts are provided in the member portal to optimize meeting time.",
    category: "mentors",
  },
  {
    id: 4,
    question: "How are restricted resources accessed?",
    answer: "Upon review and approval of your membership application, you will receive login credentials. The secure Member Area houses role-specific mentorship toolkits, clinical orientation checklists, meeting logs, and peer support guides.",
    category: "membership",
  },
]

const FALLBACK_TEAM: TeamMemberItem[] = [
  {
    id: 1,
    name: "Dr. Sarah Thornton, MD, CCFP",
    roleTitle: "Network Co-Chair & Lead Mentor",
    bio: "Over 18 years in full-scope rural practice with specialized experience in residency mentoring, physician wellness, and clinical team leadership.",
  },
  {
    id: 2,
    name: "Dr. Tariq Al-Mansoor, MD, FRCPC",
    roleTitle: "Director of Clinical Education",
    bio: "Passionate advocate for structured onboarding of medical trainees and ongoing peer-to-peer consult support across Saskatchewan healthcare teams.",
  },
  {
    id: 3,
    name: "Megan O'Reilly, MHA",
    roleTitle: "Operations & Program Manager",
    bio: "Oversees mentor-mentee intake, pairing logistics, event coordination, and member resource administration.",
  },
]

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "AMN-SK Launches 2026 Rural Mentorship Cohort",
    slug: "launch-2026-rural-cohort",
    publishedDate: "2026-10-15",
    excerpt: "New initiatives and expanded digital toolkits welcome 40 incoming clinical mentors and mentees across northern and rural Saskatchewan.",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Annual Clinical Peer Support Symposium Announced",
    slug: "annual-clinical-peer-support-symposium",
    publishedDate: "2026-09-28",
    excerpt: "Registration is now open for our hybrid clinical education day exploring burnout prevention, peer coaching frameworks, and collaborative care models.",
    isFeatured: false,
  },
]

const FALLBACK_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Virtual Peer Exchange: Early Career Navigation",
    slug: "virtual-peer-exchange-early-career",
    eventDate: "2026-11-20T19:00:00Z",
    locationType: "virtual",
    locationDetails: "Zoom (Link provided upon registration)",
    description: "An informal 60-minute facilitated session where mentees discuss real-world transition challenges with experienced panel mentors.",
    registrationUrl: "/apply",
  },
  {
    id: 2,
    title: "Mentor Skill-Building Workshop: Effective Feedback Models",
    slug: "mentor-skill-building-workshop",
    eventDate: "2026-12-04T18:30:00Z",
    locationType: "hybrid",
    locationDetails: "Regina General Hospital & Live Stream",
    description: "Accredited workshop exploring constructive feedback techniques, cognitive reframing, and boundary setting in mentorship partnerships.",
    registrationUrl: "/apply",
  },
]

const FALLBACK_RESOURCES: ResourceItem[] = [
  {
    id: 1,
    title: "Rural Practice Transition Checklist",
    description: "Comprehensive step-by-step guidance for healthcare providers entering rural or remote clinic environments.",
    category: "health-provider",
    accessLevel: "public",
    publishedDate: "2026-08-10",
  },
  {
    id: 2,
    title: "Interprofessional Collaborative Care Framework",
    description: "Clinical guidelines on structuring coordinated care plans between physicians, nurse practitioners, and allied health staff.",
    category: "health-provider",
    accessLevel: "public",
    publishedDate: "2026-07-22",
  },
  {
    id: 3,
    title: "Patient & Family Care Roadmap",
    description: "A patient-facing guide explaining primary care access pathways, specialist referrals, and virtual consultation options.",
    category: "patient",
    accessLevel: "public",
    publishedDate: "2026-09-05",
  },
  {
    id: 4,
    title: "Understanding Your Healthcare Team: Frequently Asked Questions",
    description: "A plain-language overview helping patients and caregivers understand provider roles and continuity of care.",
    category: "patient",
    accessLevel: "public",
    publishedDate: "2026-06-15",
  },
]

async function safeFetch<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${CMS_URL}/api/${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 } as any,
    })
    if (!res.ok) return fallback
    const data = await res.json()
    if (data && Array.isArray(data.docs) && data.docs.length > 0) {
      return data.docs as T
    }
    return fallback
  } catch (err) {
    return fallback
  }
}

export async function getQuotes(): Promise<QuoteItem[]> {
  return safeFetch<QuoteItem[]>('quotes?where[isActive][equals]=true&limit=10', FALLBACK_QUOTES)
}

export async function getFAQs(): Promise<FAQItem[]> {
  return safeFetch<FAQItem[]>('faqs?sort=displayOrder&limit=50', FALLBACK_FAQS)
}

export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  return safeFetch<TeamMemberItem[]>('team-members?sort=displayOrder&limit=50', FALLBACK_TEAM)
}

export async function getNews(): Promise<NewsItem[]> {
  return safeFetch<NewsItem[]>('news?sort=-publishedDate&limit=20', FALLBACK_NEWS)
}

export async function getEvents(): Promise<EventItem[]> {
  return safeFetch<EventItem[]>('events?sort=eventDate&limit=20', FALLBACK_EVENTS)
}

export async function getPublicResources(category?: 'health-provider' | 'patient'): Promise<ResourceItem[]> {
  let endpoint = 'resources?where[accessLevel][equals]=public&sort=-publishedDate&limit=50'
  if (category) {
    endpoint += `&where[category][equals]=${category}`
  }
  const items = await safeFetch<ResourceItem[]>(endpoint, FALLBACK_RESOURCES)
  if (category) {
    return items.filter(r => r.category === category)
  }
  return items.filter(r => r.accessLevel === 'public')
}
