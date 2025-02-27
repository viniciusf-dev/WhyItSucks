import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

type Complaint = {
  id: number;
  text: string;
  count: number;
};

type TopComplaintsProps = {
  complaints: Complaint[];
};

const TopComplaints = ({ complaints }: TopComplaintsProps) => {
  const [visibleComplaints, setVisibleComplaints] = useState<number[]>([]);
  
  useEffect(() => {
    complaints.forEach((_, index) => {
      setTimeout(() => {
        setVisibleComplaints(prev => [...prev, index]);
      }, index * 300);
    });
  }, [complaints]);
  
  return (
    <div className="pixel-card bg-retro-darkGray p-4">
      <h3 className="font-pixel text-white text-xl mb-4 flex items-center">
        <AlertTriangle size={20} className="text-retro-red mr-2" />
        Top 5 Complaints
      </h3>
      
      <div className="space-y-3">
        {complaints.map((complaint, index) => (
          <div 
            key={complaint.id}
            className={`bg-retro-charcoal border-2 border-black p-3 transform transition-all duration-300 ${
              visibleComplaints.includes(index) 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-full opacity-0'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="font-pixel text-xs text-retro-purple">#{index + 1}</div>
              <div className="font-pixel-secondary text-retro-red text-sm">
                {complaint.count} mentions
              </div>
            </div>
            <p className="font-pixel-secondary text-white text-base">
              {complaint.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopComplaints;