// import { AlertCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const ErrorAlert = ({ message, onRetry }) => {
//   return (
//     <div
//       className="
//         rounded-xl
//         border border-red-300
//         bg-red-50
//         p-4
//         shadow-sm
//       "
//     >
//       <div className="flex gap-3">
//         {/* ICON */}
//         <div className="flex-shrink-0">
//           <AlertCircle
//             className="h-6 w-6 text-red-600"
//             aria-hidden="true"
//           />
//         </div>

//         {/* CONTENT */}
//         <div className="flex-1">
//           <h3 className="text-sm font-semibold text-red-900">
//             Something went wrong
//           </h3>

//           <p className="mt-1 text-sm text-red-700 leading-relaxed">
//             {message}
//           </p>

//           {onRetry && (
//             <div className="mt-4">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={onRetry}
//                 className="
//                   border-red-300
//                   text-red-700
//                   hover:bg-red-100
//                   hover:text-red-800
//                 "
//               >
//                 Retry
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorAlert;
