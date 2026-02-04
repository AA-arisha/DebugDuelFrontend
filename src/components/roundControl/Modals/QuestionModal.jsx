// import React, { useState, useEffect } from 'react';
// import TestCaseManager from '../TestCaseManager';
// import BuggyCodeManager from '../BuggyCodeManager';
// import { Button } from '../../ui/button';

// export default function QuestionModal({ open, onClose, onSave, isSaving, initialQuestion = null }) {
//   const [title, setTitle] = useState('');
//   const [problemStatement, setProblemStatement] = useState(''); // renamed
//   const [testCases, setTestCases] = useState([]);
//   const [buggyCodes, setBuggyCodes] = useState([]); // renamed

//   useEffect(() => {
//     if (!open) return;
//     if (initialQuestion) {
//       setTitle(initialQuestion.title || '');
//       setProblemStatement(initialQuestion.problemStatement || ''); // renamed
//       setTestCases(initialQuestion.TestCases ? initialQuestion.TestCases.map(t => ({ ...t })) : []); // match Prisma
//       setBuggyCodes(initialQuestion.BuggyCodes ? initialQuestion.BuggyCodes.map(b => ({ ...b })) : []); // match Prisma
//     } else {
//       setTitle('');
//       setProblemStatement('');
//       setTestCases([]);
//       setBuggyCodes([]);
//     }
//   }, [open, initialQuestion]);

//   if (!open) return null;

//  const handleSave = async () => {
//   // Prepare payload to match Prisma schema
//   const payload = {
//     title,
//     problemStatement,
//     testCases: testCases.map(tc => ({
//       input: tc.input,
//       expectedOutput: tc.expectedOutput,
//       description: tc.description || '', // optional in Prisma
//       isVisible: tc.isVisible !== undefined ? tc.isVisible : true, // default true
//     })),
//     buggyCodes: buggyCodes.map(bc => ({
//       language: bc.language || 'javascript', // include language
//       code: bc.code,
//     })),
//   };

//   if (onSave) await onSave(payload);
// };

//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-900 border-2 border-blue-500/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">📝</div>
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Create New Question</h2>
//           </div>
//           <button onClick={onClose} className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 text-2xl">×</button>
//         </div>

//         <div className="space-y-6">
//           <div className="p-5 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl border-2 border-blue-500/20">
//             <h3 className="text-lg font-bold mb-4">Problem Details</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">📌 Question Title</label>
//                 <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="e.g., Two Sum Problem" className="w-full px-4 py-3 bg-gray-800/50 border-2 border-blue-500/30 rounded-lg text-white" />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">📄 Problem Description</label>
//                 <textarea value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} rows={6} placeholder="Provide detailed description..." className="w-full px-4 py-3 bg-gray-800/50 border-2 border-blue-500/30 rounded-lg text-white"></textarea>
//               </div>
//             </div>
//           </div>

//           <div className="p-5 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl border-2 border-green-500/20">
//             <TestCaseManager testCases={testCases} onTestCasesChange={setTestCases} />
//           </div>

//           <div className="p-5 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-xl border-2 border-orange-500/20">
//             <BuggyCodeManager buggyCode={buggyCodes} onBuggyCodeChange={setBuggyCodes} />
//           </div>
//         </div>

//         <div className="flex gap-3 mt-6">
//           <Button onClick={handleSave} disabled={isSaving} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 font-bold rounded-lg shadow-lg">{isSaving ? 'Saving...' : '💾 Save Question'}</Button>
//           <Button onClick={onClose} className="flex-1 bg-gray-800 text-white py-6 font-bold rounded-lg border-2 border-gray-700">❌ Cancel</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
