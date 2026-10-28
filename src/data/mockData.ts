export interface UserProfile {
  name: string;
  email: string;
  university: string;
  gradYear: string;
  avatarUrl?: string;
  applicationsTracked: number;
}

export interface ScorecardReport {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  company: string;
  location: string;
  overallScore: number;
  tier: string;
  percentile: string;
  deliveredAt: string;
  envelope: {
    messageId: string;
    dkim: string;
    targetAts: string;
    benchmarkCohort: string;
  };
  metrics: {
    jobMatch: number;
    bulletRigor: number;
    parsability: number;
  };
  wins: Array<{
    title: string;
    description: string;
    verbs?: string[];
    badge?: string;
    skills?: string[];
  }>;
  criticalGaps: Array<{
    name: string;
    tag: string;
  }>;
  expectedLift: string;
  targetTierNote: string;
  impactDeficit: {
    count: number;
    description: string;
    currentBullet: string;
    upgradedBullet: string;
    highlightKey?: string;
    highlightMetric?: string;
    impactGain: string;
  };
  pdfFileName: string;
  pdfFileSize: string;
  previewUrl?: string | false;
}

export interface RecentScanItem {
  id: string;
  company: string;
  initial: string;
  jobTitle: string;
  location: string;
  score: number;
  fitText: string;
  skillsCount: string;
  tier: 'High ATS Match' | 'Needs Improvement' | 'Good ATS Match';
  scannedTime: string;
  reportData?: ScorecardReport;
}

export const defaultUser: UserProfile = {
  name: 'Alex Chen',
  email: 'Gautam.RSK19@gmail.com', // Active target email matching user request
  university: 'UC Berkeley',
  gradYear: "'26",
  applicationsTracked: 4,
};

export const sampleJobPresets = [
  {
    company: 'Datadog',
    jobTitle: 'Software Engineer Intern - Summer 2025',
    location: 'New York, NY (Hybrid)',
    seniority: 'Internship / Co-op',
    domain: 'Distributed Systems & Backend',
    description: `We're seeking a Software Engineering Intern to join our Core Metrics team for Summer 2025. You will build highly available distributed backend systems handling petabytes of telemetry using Go, Python, and AWS.

Responsibilities:
• Design and maintain microservices and distributed storage engines processing over 10M events per second.
• Build scalable backend pipelines in Go / Golang, Python, and REST APIs.
• Deploy and maintain cloud infrastructure utilizing Docker, Kubernetes, and AWS CloudWatch observability tools.
• Benchmark low-latency network communication using gRPC and Kafka messaging queues.`,
    keywordsFound: ['Python', 'Distributed Systems', 'REST APIs', 'Git / CI', 'Docker'],
    keywordsMissing: ['Go / Golang', 'Kubernetes', 'AWS CloudWatch', 'gRPC', 'Kafka'],
  },
  {
    company: 'Stripe',
    jobTitle: 'SWE Intern (Backend)',
    location: 'San Francisco, CA (Hybrid)',
    seniority: 'Internship / Co-op',
    domain: 'Distributed Systems & Backend',
    description: `Stripe is looking for ambitious Software Engineering Interns to join our core financial infrastructure engineering team. You will build robust distributed ledger primitives, secure payment APIs, and real-time fraud mitigation microservices.

Requirements:
• Experience with Go, Java, or Ruby backend web frameworks.
• Strong foundation in algorithms, concurrency, and SQL database transactions.
• Familiarity with CI/CD deployment pipelines, containerization, and distributed systems.`,
    keywordsFound: ['Distributed Systems', 'Go / Python', 'REST APIs', 'SQL'],
    keywordsMissing: ['CI/CD Pipelines', 'Kafka', 'Ruby', 'High Concurrency'],
  },
  {
    company: 'Figma',
    jobTitle: 'Frontend Engineer Intern',
    location: 'San Francisco, CA (Hybrid)',
    seniority: 'Internship / Co-op',
    domain: 'Frontend & Full-Stack',
    description: `Figma's Editor team is hiring Frontend Engineering Interns. Work with WebAssembly, WebGL, TypeScript, and modern React architectures to deliver high-frame-rate canvas experiences directly in the browser.`,
    keywordsFound: ['TypeScript', 'React', 'Git', 'REST APIs', 'Node.js'],
    keywordsMissing: ['WebAssembly', 'WebGL', 'Canvas Optimization'],
  },
  {
    company: 'Snowflake',
    jobTitle: 'Backend Developer Co-op',
    location: 'San Mateo, CA',
    seniority: 'Internship / Co-op',
    domain: 'Distributed Systems & Backend',
    description: `Snowflake data cloud is seeking a Backend Developer Co-op to optimize query compilation engines, distributed storage caches, and SQL executors.`,
    keywordsFound: ['SQL', 'Python', 'C++', 'Git', 'Linux'],
    keywordsMissing: ['Distributed Caching', 'Query Optimization', 'Rust'],
  },
];

export const sampleResumeText = `ALEX CHEN
San Francisco, CA • Gautam.RSK19@gmail.com • (555) 234-5678 • linkedin.com/in/alexchen-eng • github.com/alexchen-dev

EDUCATION
University of California, Berkeley
B.S. in Electrical Engineering & Computer Sciences (EECS)
GPA: 3.86/4.0 | Expected Graduation: May 2026
Coursework: Distributed Systems (CS162), Data Structures (CS61B), Algorithms (CS170), Database Systems (CS186)

TECHNICAL SKILLS
Languages: Python, Java, C++, TypeScript, SQL, Bash
Technologies & Tools: React, Node.js, Express, Git/CI, PostgreSQL, Redis, REST APIs, Linux, Agile

EXPERIENCE
Campus Labs — Undergraduate Software Engineer Intern
Berkeley, CA | Jun 2024 – Aug 2024
• Architected microservice endpoint handling student course evaluations and feedback queries.
• Spearheaded Redis caching layer reducing database query response latency by 35%.
• Optimized SQL indexing queries for 50,000+ active university users across campus departments.
• Benchmarked performance metrics and deployed automated regression tests across continuous deployment cycles.

PROJECTS
Fault-Tolerant Distributed Key-Value Store
• Built key-value store using Raft consensus algorithm for distributed systems lab.
• Implemented leader election, log replication, and heartbeat mechanisms across multi-node topologies.
• Conducted stress tests simulating network partitions and packet delays to verify state consistency.

Real-Time Collaborative Code Editor
• Developed web-based collaborative programming environment using TypeScript, WebSocket, and React.
• Integrated operational transformation algorithms to synchronize simultaneous keystrokes among 8+ concurrent users.
• Containerized client and server modules with Docker for streamlined local development.

LEADERSHIP & AFFILIATIONS
• Technical Lead, Computer Science Mentorship Association (CSMA)
• Member, Eta Kappa Nu (IEEE Honor Society)`;

export const initialRecentScans: RecentScanItem[] = [
  {
    id: 'scan-figma-1',
    company: 'Figma',
    initial: 'F',
    jobTitle: 'Frontend Engineer Intern',
    location: 'San Francisco, CA (Hybrid)',
    score: 84,
    fitText: 'Strong fit',
    skillsCount: '11 / 13 skills',
    tier: 'High ATS Match',
    scannedTime: '2 days ago',
  },
  {
    id: 'scan-robinhood-2',
    company: 'Robinhood',
    initial: 'R',
    jobTitle: 'Product Management Intern',
    location: 'Menlo Park, CA',
    score: 62,
    fitText: 'Gaps found',
    skillsCount: '6 / 14 skills',
    tier: 'Needs Improvement',
    scannedTime: '1 week ago',
  },
  {
    id: 'scan-snowflake-3',
    company: 'Snowflake',
    initial: 'S',
    jobTitle: 'Backend Developer Co-op',
    location: 'San Mateo, CA',
    score: 78,
    fitText: 'Good alignment',
    skillsCount: '9 / 12 skills',
    tier: 'Good ATS Match',
    scannedTime: 'Jan 12, 2025',
  },
];

export const defaultScorecardReport: ScorecardReport = {
  id: 'rep-datadog-swe-2025',
  candidateName: 'Alex Chen',
  candidateEmail: 'Gautam.RSK19@gmail.com',
  jobTitle: 'Software Engineer Intern',
  company: 'Datadog',
  location: 'New York, NY (Hybrid)',
  overallScore: 76,
  tier: 'Tier 1 Competitive Fit',
  percentile: 'Top 22%',
  deliveredAt: 'Oct 24, 2025 • 10:14 AM EST',
  envelope: {
    messageId: '<rec-score-2025-1024-datadog-swe@ai.resuscore.internal>',
    dkim: 'PASS (resuscore.ai ed25519-sha256)',
    targetAts: 'Greenhouse Greenhouse-API-v2 / Datadog Early Talent Pipeline',
    benchmarkCohort: 'Fall 2025 Tier-1 SWE Interns (n=1,420 parsed resumes)',
  },
  metrics: {
    jobMatch: 72,
    bulletRigor: 58,
    parsability: 95,
  },
  wins: [
    {
      title: 'Strong Action Verbs',
      description: '9 of 10 experience bullets start with high-signal technical verbs: "Architected", "Spearheaded", and "Optimized".',
      verbs: ['Architected', 'Benchmarked', 'Deployed'],
    },
    {
      title: 'Parser Readability',
      description: 'Flawless UTF-8 plain-text parser fidelity. Standard single-page density (395 words) allows full tokenization by Greenhouse without table collisions.',
      badge: '0 OCR conversion faults',
    },
    {
      title: 'Core Stack Match',
      description: 'High keyword correlation for fundamental infrastructure requirements:',
      skills: ['Python', 'Distributed Systems', 'REST APIs', 'Git / CI'],
    },
  ],
  criticalGaps: [
    { name: 'Go / Golang', tag: 'Cited 5x' },
    { name: 'Docker & Kubernetes', tag: 'Core Requirement' },
    { name: 'AWS CloudWatch / Observability', tag: 'Preferred' },
  ],
  expectedLift: '+14 pts',
  targetTierNote: 'Adding contextual references to Go or container concepts moves you to 90/100 (Tier 0 Fast-Track).',
  impactDeficit: {
    count: 4,
    description: 'Datadog engineering managers look for scale markers (ops/second, latency reduction, memory optimization, or active users). General activity bullets read as passive coursework.',
    currentBullet: '"Built key-value store using Raft consensus algorithm for distributed systems lab."',
    upgradedBullet: '"Engineered fault-tolerant distributed key-value store in Go with Raft consensus, achieving 10,000+ ops/sec throughput under simulated partition failovers."',
    highlightKey: 'Go with Raft consensus',
    highlightMetric: '10,000+ ops/sec throughput',
    impactGain: '+28% impact score',
  },
  pdfFileName: 'Datadog_SWE_Intern_Scorecard_AlexChen.pdf',
  pdfFileSize: '240 KB • Full ATS Tokenization Matrix & Line Audit',
};
