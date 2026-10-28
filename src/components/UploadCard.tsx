import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle2, ShieldCheck, FileUp, FileText } from 'lucide-react';
import { InspectionData } from '../types/resume';

interface UploadCardProps {
  inspection: InspectionData;
  targetRole: string;
  onTargetRoleChange: (val: string) => void;
  onFileUpload: (file: File) => void;
  onSelectPreset: (presetIndex: number) => void;
  onInspectDocument: () => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  inspection,
  targetRole,
  onTargetRoleChange,
  onFileUpload,
  onSelectPreset,
  onInspectDocument,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Document Card */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-xs">
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-4">
          <FileUp className="w-4 h-4 text-[#0f172a]" />
          <h2 className="font-display font-semibold text-sm text-[#0f172a]">
            Upload Document
          </h2>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-[#006c4a] bg-[#ecfdf5]/40 scale-[0.99]'
              : 'border-[#cbd5e1] hover:border-[#94a3b8] bg-[#f8fafc]'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
            className="hidden"
          />

          <div className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-slate-700 mb-3 shadow-xs">
            <UploadCloud className="w-5 h-5 text-slate-600" />
          </div>

          <p className="font-display font-semibold text-sm text-[#0f172a] mb-1">
            Drag & drop candidate resume
          </p>
          <p className="text-xs text-slate-500 mb-3">
            Parsed with Python structural schema analyzer
          </p>

          <div className="flex items-center gap-2 text-[10px] font-mono-code text-slate-500 mb-4 bg-white/80 px-2 py-0.5 rounded border border-[#e2e8f0]">
            <span>PDF</span>
            <span>·</span>
            <span>DOCX</span>
            <span>·</span>
            <span>TXT</span>
            <span>·</span>
            <span>≤ 10MB</span>
          </div>

          <button
            type="button"
            className="px-4 py-1.5 text-xs font-medium text-[#0f172a] bg-white border border-[#cbd5e1] rounded hover:bg-[#f1f5f9] hover:border-slate-400 transition-colors shadow-xs"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Browse File
          </button>
        </div>

        {/* Target Role Description */}
        <div className="mt-4 pt-4 border-t border-[#f1f5f9]">
          <label className="block text-xs font-semibold text-slate-800 mb-1.5">
            Target Role Description (Optional)
          </label>
          <textarea
            rows={3}
            value={targetRole}
            onChange={(e) => onTargetRoleChange(e.target.value)}
            placeholder="e.g. Lead Product Architect, Distributed Systems..."
            className="w-full text-xs text-slate-800 bg-[#f8fafc] border border-[#cbd5e1] rounded p-2.5 focus:outline-hidden focus:ring-1 focus:ring-[#0f172a] focus:bg-white resize-none leading-relaxed transition-all font-sans"
          />
        </div>

        {/* Footer Hash & Parsed Size */}
        <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-code text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hash verified: {inspection.hash}</span>
          </div>
          <span>{inspection.fileSize}</span>
        </div>
      </div>

      {/* Document Inspection Card */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-sm text-[#0f172a]">
            Document Inspection
          </h3>
          <span className="font-mono-code text-[11px] font-semibold text-[#006c4a] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-full">
            {inspection.atsStandardLevel}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#f8fafc] rounded-md p-3 border border-[#f1f5f9]">
            <span className="text-[10px] font-mono-code tracking-wider text-slate-500 block uppercase mb-1">
              PAGES
            </span>
            <span className="font-display font-bold text-base text-[#0f172a] block">
              {inspection.pages} {inspection.pages === 1 ? 'Page' : 'Pages'}
            </span>
            <span className="text-xs text-[#006c4a] font-medium block mt-0.5">
              {inspection.densityStatus}
            </span>
          </div>

          <div className="bg-[#f8fafc] rounded-md p-3 border border-[#f1f5f9]">
            <span className="text-[10px] font-mono-code tracking-wider text-slate-500 block uppercase mb-1">
              WORD COUNT
            </span>
            <span className="font-display font-bold text-base text-[#0f172a] block">
              {inspection.wordCount} Words
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">
              {inspection.densityWindow}
            </span>
          </div>
        </div>

        <button
          onClick={onInspectDocument}
          className="w-full mt-3.5 py-1.5 px-3 text-xs text-slate-700 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded flex items-center justify-center gap-1.5 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          Inspect Parsed Content & Schema Tree
        </button>
      </div>
    </div>
  );
};
