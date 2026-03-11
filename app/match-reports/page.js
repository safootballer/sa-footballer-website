'use client';
import { useState, useEffect } from 'react';

export default function MatchReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Connect to your Render API
  useEffect(() => {
    // Example: fetch from your magazine automation API
    // fetch('https://sa-footballer-magazine.onrender.com/api/reports')
    //   .then(res => res.json())
    //   .then(data => setReports(data))
    //   .catch(err => console.error(err))
    //   .finally(() => setLoading(false));

    // For now, using dummy data
    setReports([
      { id: 1, title: 'Port Adelaide defeats Norwood', league: 'SANFL', date: '2026-03-05' },
      { id: 2, title: 'Adelaide Crows triumph over Port Power', league: 'AFL', date: '2026-03-04' },
      { id: 3, title: 'South Adelaide claims victory', league: 'SANFL', date: '2026-03-03' },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <a href="/" className="text-sm hover:underline mb-2 block">← Back to Home</a>
          <h1 className="text-4xl font-bold">Match Reports</h1>
          <p className="text-blue-100 mt-2">AI-generated reports from every game</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading match reports...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {reports.map(report => (
              <div key={report.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <span className="text-xs font-bold text-blue-600 uppercase px-3 py-1 bg-blue-50 rounded-full">
                  {report.league}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-4">📅 {report.date}</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-800">Read Full Report →</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}