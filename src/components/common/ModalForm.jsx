// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const ModalForm = ({
//   open,
//   onOpenChange,
//   title,
//   description = "Form dialog",
//   onSubmit,
//   isPending,
//   children,
// }) => {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         className="
//           max-h-[90vh]
//           w-full max-w-3xl
//           bg-white text-slate-900
//           p-0
//           overflow-hidden
//           shadow-xl
//         "
//       >
//         {/* Accessibility */}
//         <DialogDescription className="sr-only">
//           {description}
//         </DialogDescription>

//         <form onSubmit={onSubmit} className="flex flex-col max-h-[90vh]">

//           {/* HEADER */}
//           <DialogHeader className="px-6 py-4 border-b bg-slate-100">
//             <DialogTitle className="text-lg font-semibold">
//               {title}
//             </DialogTitle>
//           </DialogHeader>

//           {/* BODY (SCROLLABLE) */}
//           <div
//             className="
//               flex-1
//               px-6 py-4
//               overflow-y-auto
//               space-y-6
//             "
//             style={{
//               scrollbarGutter: "stable",
//             }}
//           >
//             {children}
//           </div>

//           {/* FOOTER */}
//           <div className="px-6 py-4 border-t bg-slate-100 flex justify-end gap-3">
// <Button
//   type="button"
//   onClick={() => onOpenChange(false)}
//   className="bg-gray-400 text-white hover:bg-gray-500 px-4 py-2 rounded font-semibold"
// >
//   Cancel
// </Button>

//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ModalForm;
