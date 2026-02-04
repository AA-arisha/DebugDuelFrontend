// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useState } from "react";

// const DataTable = ({
//   data,
//   columns,
//   actions = [],
//   isLoading = false,
//   emptyMessage = "No data available",
//   pageSize = 10,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(data.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedData = data.slice(startIndex, startIndex + pageSize);

//   /* ---------- LOADING ---------- */
//   if (isLoading) {
//     return (
//       <div className="flex h-40 items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
//       </div>
//     );
//   }

//   /* ---------- EMPTY ---------- */
//   if (!data.length) {
//     return (
//       <div className="flex h-40 items-center justify-center text-sm text-gray-500">
//         {emptyMessage}
//       </div>
//     );
//   }

//   return (
//    <div className="space-y-4">
//   {/* TABLE */}
//   <div className="rounded-xl border border-gray-300 bg-white shadow-sm">
//     <Table>
//       {/* HEADER */}
//       <TableHeader>
//         <TableRow className="bg-gray-100 border-b border-gray-300">
//           {columns.map((column) => (
//             <TableHead
//               key={column.key}
//               className="text-xs font-semibold uppercase tracking-wide text-black"
//             >
//               {column.header}
//             </TableHead>
//           ))}

//           {actions.length > 0 && (
//             <TableHead className="w-[60px] text-right text-black font-semibold">
//               Actions
//             </TableHead>
//           )}
//         </TableRow>
//       </TableHeader>

//       {/* BODY */}
//       <TableBody>
//         {paginatedData.map((row, index) => (
//           <TableRow
//             key={index}
//             className="hover:bg-gray-200 transition-colors"
//           >
//             {columns.map((column) => (
//               <TableCell
//                 key={column.key}
//                 className="text-sm !text-black"
//               >
//                 {column.render
//                   ? column.render(row[column.key], row)
//                   : row[column.key] ?? "—"}
//               </TableCell>
//             ))}

//             {/* ACTIONS */}
//             {actions.length > 0 && (
//               <TableCell className="text-right">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-8 w-8 text-black hover:bg-gray-300"
//                     >
//                       <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent
//                     align="end"
//                     className="bg-white border border-gray-300 shadow-md"
//                   >
//                     {actions.map((action, idx) => (
//                       <DropdownMenuItem
//                         key={idx}
//                         onClick={() => action.onClick(row)}
//                         className={
//                           action.variant === "destructive"
//                             ? "text-red-600 focus:bg-red-50 focus:text-red-700"
//                             : "text-black focus:bg-gray-200"
//                         }
//                       >
//                         {action.label}
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             )}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </div>

//   {/* PAGINATION */}
//   {totalPages > 1 && (
//     <div className="flex items-center justify-between">
//       <p className="text-sm text-black">
//         Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
//       </p>

//       <div className="flex items-center gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPage === 1}
//           className="border-gray-300 text-black"
//         >
//           <ChevronLeft className="h-4 w-4 mr-1" />
//           Previous
//         </Button>

//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() =>
//             setCurrentPage((p) => Math.min(p + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className="border-gray-300 text-black"
//         >
//           Next
//           <ChevronRight className="h-4 w-4 ml-1" />
//         </Button>
//       </div>
//     </div>
//   )}
// </div>

//   );
// };

// export default DataTable;
