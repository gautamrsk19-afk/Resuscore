import { CandidateAnalysis, HistoryRun, BenchmarkDomain, BenchmarkThreshold } from '../types/resume';

export const initialAnalysis: CandidateAnalysis = {
  id: 'run-alex-chen-v3',
  fileName: 'Alex_Chen_Resume.pdf',
  targetRole: 'Lead Product Architect, Distributed Systems. Requires Go, Kubernetes, event-driven design, and quantifiable latency/throughput reduction.',
  overallScore: 88,
  percentile: 'Top 7th Percentile',
  matchRating: 'Excellent candidate match',
  metrics: {
    atsCompatibility: 94,
    impactMetrics: 82,
    skillsAlignment: 89,
    brevityStructure: 86,
  },
  keyStrengths: [
    'Strong quantified outcomes: 84% of work history bullets include hard KPIs, latencies, or revenue metrics.',
    'ATS standard typography: Standard headers (Experience, Skills, Education) parsed with 0 serialization faults.',
    'Clear seniority arc: Clean title trajectory from Staff Engineer to Principal Architecture lead.'
  ],
  priorityFixes: [
    'Missing technical keyword: Target role references Distributed Consensus (Raft/Paxos).',
    'Overlong bullet length: Earliest role (2018-2020) exceeds 36 words on bullet 3. Tighten to preserve cadence.'
  ],
  estimatedUplift: '+6.4 points',
  parserSignal: 'High',
  itemsValidated: 3,
  inspection: {
    pages: 1,
    wordCount: 482,
    densityStatus: 'Optimal density',
    densityWindow: '420-550 window',
    hash: 'sha256:7f3a8b',
    fileSize: '1.4 MB parsed',
    fileName: 'Alex_Chen_Resume.pdf',
    atsStandardLevel: 'Pass • Level 1',
  },
  rawTextPreview: `ALEX CHEN
San Francisco, CA • alex.chen@example.io • linkedin.com/in/alexchen-arch • github.com/alexchen

SUMMARY
Principal Distributed Systems Architect with 9+ years designing high-throughput transaction backbones, microservice orchestrations, and cloud-native Kubernetes infrastructure. Pioneered multi-region failover handling 1.8M req/sec with p99 latency < 14ms.

EXPERIENCE
Staff Distributed Systems Engineer | Horizon Cloud Systems (2022 - Present)
• Re-architected core messaging pipelines using Go and Kafka, cutting p99 query latency from 85ms to 12ms and reducing compute footprint by 34%.
• Authored custom Kubernetes CRDs and multi-cluster ingress routing, supporting 45+ autonomous deployment microservices across 3 cloud regions.
• Mentored 14 senior engineers across distributed consensus patterns, fault-tolerant state synchronization, and gRPC contracts.

Senior Backend Infrastructure Lead | Nexus Payments (2020 - 2022)
• Built zero-loss distributed payment reconciliation ledger processing $4.2B in annualized transactional volume.
• Implemented distributed telemetry and OpenTelemetry tracing across 120 services, reducing mean-time-to-detection (MTTD) by 62%.
• Modernized continuous integration pipelines with automated Canary rollouts and static analysis checks.

Senior Systems Software Engineer | DataStream Labs (2018 - 2020)
• Designed fault-tolerant ingestion pipelines consuming 40TB daily telemetry metrics using PostgreSQL partitioning and Redis caching layer.
• Spearheaded containerization migration from bare-metal VMs to Docker orchestrations, achieving 99.995% operational uptime SLA.

EDUCATION & SKILLS
B.S. in Computer Science, UC Berkeley (Honors)
Core Competencies: Go, Python, Kubernetes, Docker, Distributed Systems, gRPC, Kafka, PostgreSQL, Terraform, Redis, CI/CD.`,
  extractedKeywords: {
    matched: [
      { keyword: 'React', count: 4 },
      { keyword: 'Python', count: 6 },
      { keyword: 'FastAPI', count: 2 },
      { keyword: 'TypeScript', count: 5 },
      { keyword: 'Docker', count: 3 },
      { keyword: 'PostgreSQL', count: 2 },
      { keyword: 'REST APIs', count: 3 },
    ],
    gaps: [
      {
        keyword: 'System Design',
        impact: '+8.4 pts impact',
        reason: 'Present in 87% of tier-1 senior tech postings. Add architecture keywords.',
      },
      {
        keyword: 'CI / CD Pipelines',
        impact: '+5.1 pts impact',
        reason: 'Critical for DevOps and Full-stack parsers (GitHub Actions, Argo, Jenkins).',
      },
    ],
    alignment: 78.4,
  },
};

export const sampleHistoryRuns: HistoryRun[] = [
  {
    id: 'run-1',
    fileName: 'Senior_Fullstack_Resume_v3.pdf',
    version: 'v3.2',
    targetRole: 'Staff Software Engineer',
    timestamp: '2026-09-29T06:15:00Z',
    relativeTime: '2 hrs ago',
    matchType: 'Strong Match',
    atsParsedPercent: 98,
    scoreDelta: '+7 pts vs v2',
    deltaHighlight: '↑ Optimized impact verbs',
    compositeScore: 88,
  },
  {
    id: 'run-2',
    fileName: 'TechLead_Application_v2.pdf',
    version: 'v2.1',
    targetRole: 'Engineering Manager / Lead',
    timestamp: '2026-09-28T09:30:00Z',
    relativeTime: 'Yesterday',
    matchType: 'Moderate Match',
    atsParsedPercent: 91,
    scoreDelta: '+7 pts vs v1',
    deltaHighlight: 'Needs quantified metrics',
    compositeScore: 81,
  },
  {
    id: 'run-3',
    fileName: 'Product_Engineer_CV.pdf',
    version: 'v1.4',
    targetRole: 'Product Architect',
    timestamp: '2026-09-26T14:20:00Z',
    relativeTime: '3 days ago',
    matchType: 'Needs Polish',
    atsParsedPercent: 84,
    scoreDelta: '+6 pts vs baseline',
    deltaHighlight: 'Over-length section: 2 pages',
    compositeScore: 74,
    formatFlags: 3,
  },
  {
    id: 'run-4',
    fileName: 'Frontend_Dev_Base.pdf',
    version: 'v1.0',
    targetRole: 'Frontend Engineer',
    timestamp: '2026-09-22T11:00:00Z',
    relativeTime: '1 week ago',
    matchType: 'Draft',
    atsParsedPercent: 78,
    scoreDelta: 'Baseline',
    deltaHighlight: 'Baseline evaluation',
    compositeScore: 68,
  },
];

export const benchmarkDomains: BenchmarkDomain[] = [
  {
    id: 'domain-1',
    domainNumber: 'DOMAIN 01',
    title: 'Software Engineering & Dev',
    iconName: 'code',
    score: 82,
    percentile: 'Top 12%',
    impactScore: 88,
    parsabilityScore: 96,
    keywordsScore: 74,
    verifiedSample: '4,120',
    isActive: false,
    roleDescriptionSample: 'Senior Software Engineer with experience in cloud architectures, microservices, and distributed pipelines.'
  },
  {
    id: 'domain-2',
    domainNumber: 'DOMAIN 02',
    title: 'Product & Eng. Management',
    iconName: 'network',
    score: 85,
    percentile: 'Top 9%',
    impactScore: 92,
    parsabilityScore: 90,
    keywordsScore: 81,
    verifiedSample: '1,840',
    isActive: true,
    roleDescriptionSample: 'Technical Product Lead / Engineering Manager driving roadmap velocity, cross-functional engineering, and product KPIs.'
  },
  {
    id: 'domain-3',
    domainNumber: 'DOMAIN 03',
    title: 'Data Science & AI',
    iconName: 'ai',
    score: 79,
    percentile: 'Top 18%',
    impactScore: 76,
    parsabilityScore: 94,
    keywordsScore: 72,
    verifiedSample: '2,690',
    isActive: false,
    roleDescriptionSample: 'Data Scientist / ML Engineer building fine-tuned LLM architectures, RAG pipelines, and high-dimensional analytics.'
  },
];

export const benchmarkThresholds: BenchmarkThreshold[] = [
  {
    range: '70 – 79',
    title: 'ATS Passable',
    description: 'Clears basic keyword filters and syntax parsers without flagging manual review stops.',
    iconType: 'check',
    isHighlighted: false,
  },
  {
    range: '80 – 89',
    title: 'Top 15% Candidate',
    description: 'High keyword density, clear metric quantification, zero formatting parsing anomalies.',
    iconType: 'star',
    isHighlighted: true,
  },
  {
    range: '90+',
    title: 'High Priority Interview',
    description: 'Exceptional relevance match. Automatically routed to talent acquisition recruiter screens.',
    iconType: 'shield',
    isHighlighted: false,
  },
];

export const preloadedResumes = [
  {
    name: 'Alex_Chen_Resume.pdf',
    role: 'Lead Product Architect, Distributed Systems. Requires Go, Kubernetes, event-driven design, and quantifiable latency/throughput reduction.',
    score: 88,
    ats: 94,
    impact: 82,
    skills: 89,
    brevity: 86,
    pages: 1,
    words: 482,
    hash: 'sha256:7f3a8b',
    size: '1.4 MB parsed'
  },
  {
    name: 'Elena_Rostova_StaffML.pdf',
    role: 'Staff Machine Learning Engineer with experience in LLM serving, CUDA optimization, PyTorch, and distributed training systems.',
    score: 92,
    ats: 98,
    impact: 91,
    skills: 94,
    brevity: 88,
    pages: 1,
    words: 512,
    hash: 'sha256:9c1e4d',
    size: '1.6 MB parsed'
  },
  {
    name: 'Marcus_Vance_ProductLead.docx',
    role: 'Group Product Manager, Enterprise Cloud Platform. B2B SaaS growth, user retention, ARR expansion, executive stakeholder coordination.',
    score: 85,
    ats: 92,
    impact: 89,
    skills: 84,
    brevity: 83,
    pages: 2,
    words: 640,
    hash: 'sha256:3a88fc',
    size: '1.1 MB parsed'
  }
];
