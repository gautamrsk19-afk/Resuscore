export interface DiagnosticMetric {
  label: string;
  score: number; // 0 to 100
  weight?: string;
}

export interface InspectionData {
  pages: number;
  wordCount: number;
  densityStatus: string;
  densityWindow: string;
  hash: string;
  fileSize: string;
  fileName: string;
  atsStandardLevel: string;
}

export interface CandidateAnalysis {
  id: string;
  fileName: string;
  targetRole: string;
  overallScore: number;
  percentile: string;
  matchRating: string;
  metrics: {
    atsCompatibility: number;
    impactMetrics: number;
    skillsAlignment: number;
    brevityStructure: number;
  };
  keyStrengths: string[];
  priorityFixes: string[];
  estimatedUplift: string;
  parserSignal: string;
  itemsValidated: number;
  inspection: InspectionData;
  rawTextPreview?: string;
  extractedKeywords?: {
    matched: { keyword: string; count: number }[];
    gaps: { keyword: string; impact: string; reason: string }[];
    alignment: number;
  };
}

export interface HistoryRun {
  id: string;
  fileName: string;
  version: string;
  targetRole: string;
  timestamp: string;
  relativeTime: string;
  matchType: 'Strong Match' | 'Moderate Match' | 'Needs Polish' | 'Draft';
  atsParsedPercent: number;
  scoreDelta: string;
  deltaHighlight: string;
  compositeScore: number;
  formatFlags?: number;
}

export interface BenchmarkDomain {
  id: string;
  domainNumber: string;
  title: string;
  iconName: 'code' | 'network' | 'ai';
  score: number;
  percentile: string;
  impactScore: number;
  parsabilityScore: number;
  keywordsScore: number;
  verifiedSample: string;
  isActive?: boolean;
  roleDescriptionSample?: string;
}

export interface BenchmarkThreshold {
  range: string;
  title: string;
  description: string;
  iconType: 'check' | 'star' | 'shield';
  isHighlighted?: boolean;
}
