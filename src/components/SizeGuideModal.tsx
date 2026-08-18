import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [category, setCategory] = useState<'apparel' | 'headwear'>('apparel');

  if (!sizeGuideOpen) return null;

  const apparelSizesInches = [
    { size: 'XS', chest: '33 - 35', length: '27.0', sleeve: '32.5' },
    { size: 'S', chest: '36 - 38', length: '28.0', sleeve: '33.5' },
    { size: 'M', chest: '39 - 41', length: '29.0', sleeve: '34.5' },
    { size: 'L', chest: '42 - 44', length: '30.0', sleeve: '35.5' },
    { size: 'XL', chest: '45 - 48', length: '31.0', sleeve: '36.5' },
    { size: '2XL', chest: '49 - 52', length: '32.0', sleeve: '37.5' },
  ];

  const apparelSizesCm = [
    { size: 'XS', chest: '84 - 89', length: '68.5', sleeve: '82.5' },
    { size: 'S', chest: '91 - 96', length: '71.0', sleeve: '85.0' },
    { size: 'M', chest: '99 - 104', length: '73.5', sleeve: '87.5' },
    { size: 'L', chest: '107 - 112', length: '76.0', sleeve: '90.0' },
    { size: 'XL', chest: '114 - 122', length: '78.5', sleeve: '92.5' },
    { size: '2XL', chest: '124 - 132', length: '81.0', sleeve: '95.0' },
  ];

  const currentTable = unit === 'in' ? apparelSizesInches : apparelSizesCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF8F5] w-full max-w-xl rounded-3xl shadow-2xl border border-[#E8E2D6] p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D6]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#2E5B82]" />
            <h2 className="font-bold text-lg text-[#27231F] font-heading">
              Size & Fit Guide
            </h2>
          </div>
          <button
            onClick={() => setSizeGuideOpen(false)}
            className="p-1.5 text-[#8A8174] hover:text-[#27231F] rounded-lg hover:bg-[#F2ECE1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="my-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#5C5449]">
            Unisex Modern Relaxed Fit
          </span>
          <div className="flex items-center bg-[#EFE8DC] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                unit === 'in' ? 'bg-white text-[#27231F] shadow-2xs' : 'text-[#8A8174]'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                unit === 'cm' ? 'bg-white text-[#27231F] shadow-2xs' : 'text-[#8A8174]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E8E2D6] bg-white">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F1E8] text-[#5C5449] font-bold border-b border-[#E8E2D6]">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Chest Width</th>
                <th className="p-3">Body Length</th>
                <th className="p-3">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D6] text-[#5C5449]">
              {currentTable.map((row) => (
                <tr key={row.size} className="hover:bg-[#FAF8F5]">
                  <td className="p-3 font-bold text-[#27231F]">{row.size}</td>
                  <td className="p-3">{row.chest} {unit}</td>
                  <td className="p-3">{row.length} {unit}</td>
                  <td className="p-3">{row.sleeve} {unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="mt-4 p-4 rounded-2xl bg-[#EAF0F6] border border-[#C2D8EC] text-xs text-[#1A3854] space-y-1">
          <p className="font-bold">Fit Recommendation:</p>
          <p className="text-[#2E5B82]">
            For an oversized streetwear look, order one size up. All garments are pre-shrunk to prevent shrinkage in cold laundry cycles.
          </p>
        </div>
      </div>
    </div>
  );
};
