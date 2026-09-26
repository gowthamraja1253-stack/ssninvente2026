import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';

const demoData = [
  { date: 'Jan', systolic: 118, diastolic: 78, sugar: 95, creatinine: 0.9 },
  { date: 'Feb', systolic: 122, diastolic: 80, sugar: 105, creatinine: 1.0 },
  { date: 'Mar', systolic: 135, diastolic: 88, sugar: 140, creatinine: 1.3 }, // High
  { date: 'Apr', systolic: 145, diastolic: 92, sugar: 165, creatinine: 1.6 }, // Danger
  { date: 'May', systolic: 130, diastolic: 85, sugar: 120, creatinine: 1.1 }, // Recovering
  { date: 'Jun', systolic: 120, diastolic: 80, sugar: 98, creatinine: 0.9 },  // Normal
];

const VitalChart = ({ title, data, dataKey, secondaryKey, normalMin, normalMax, unit, color }) => {
  return (
    <div style={{
      backgroundColor: 'white', padding: '16px', borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flex: 1, minWidth: '300px'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#334155', marginBottom: '16px' }}>{title} ({unit})</h3>
      <div style={{ height: '200px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            {/* Green safe zone */}
            <ReferenceArea y1={normalMin} y2={normalMax} fill="#DCFCE7" fillOpacity={0.5} />
            {/* Red danger zone above */}
            <ReferenceArea y1={normalMax} fill="#FEE2E2" fillOpacity={0.5} />
            
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            {secondaryKey && (
              <Line 
                type="monotone" 
                dataKey={secondaryKey} 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px', fontSize: '12px', color: '#64748B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#DCFCE7', borderRadius: '2px' }}></div>
          <span>Normal Range</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#FEE2E2', borderRadius: '2px' }}></div>
          <span>High / Risk</span>
        </div>
      </div>
    </div>
  );
};

export const PatientVitalsDashboard = () => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E293B', marginBottom: '16px' }}>Health Parameter Trends</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <VitalChart 
          title="Blood Pressure" 
          data={demoData} 
          dataKey="systolic" 
          secondaryKey="diastolic"
          normalMin={90} 
          normalMax={120} 
          unit="mmHg" 
          color="#EF4444" 
        />
        <VitalChart 
          title="Fasting Blood Sugar" 
          data={demoData} 
          dataKey="sugar" 
          normalMin={70} 
          normalMax={100} 
          unit="mg/dL" 
          color="#F59E0B" 
        />
        <VitalChart 
          title="Creatinine (Kidney)" 
          data={demoData} 
          dataKey="creatinine" 
          normalMin={0.7} 
          normalMax={1.2} 
          unit="mg/dL" 
          color="#3B82F6" 
        />
      </div>
    </div>
  );
};

export default PatientVitalsDashboard;
