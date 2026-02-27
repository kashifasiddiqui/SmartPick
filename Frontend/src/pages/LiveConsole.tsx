// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import "./css/LiveConsole.css";

// const LiveConsole = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [on, setOn] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("/api/LiveConsole");
//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder("utf-8");

//       let done = false;

//       while (!done) {
//         const { value, done: readerDone } = await reader!.read();
//         done = readerDone;

//         if (value) {
//           const chunk = decoder.decode(value, { stream: true });
//           chunk.split("\n").forEach((line) => {
//             if (line.trim()) {
//               const newRow = JSON.parse(line); // Parse each line as JSON
//               setData((prev) => [...prev, newRow]); // Append new data
//             }
//           });
//         }
//       }
//     };

//     fetchData();
    
//   }, [on && data]);

//   return (
//     <div className="flex justify-center items-center flex-col">
//       {on ? (
//         <>
//           <ul className="w-full h-[87vh] bg-primary rounded-sm p-2 overflow-y-auto">
//             <TransitionGroup component={null}>
//               {data.map((row, index) => (
//                 <CSSTransition
//                   key={index}
//                   timeout={300}
//                   classNames="fade"
//                 >
//                   <li className="w-full text-secondary border-dashed border-2 border-secondary p-2 mb-2">
//                     <div>
//                       {" - - - - Parent name -> " +
//                         row["Parent_Name"] +
//                         " - - - - | - - - - " +
//                         "Child name -> " +
//                         row["Child_Name"] +
//                         " - - - - " +
//                         "| - - - - Time Stamp -> " +
//                         row["Timestamp"] +
//                         " - - - - "}
//                     </div>
//                   </li>
//                 </CSSTransition>
//               ))}
//             </TransitionGroup>
//           </ul>
//           <Button
//             variant="secondary"
//             onClick={() => setOn(false)}
//             className="w-full text-red-500"
//           >
//             close console
//           </Button>
//         </>
//       ) : (
//         <Button variant="secondary" onClick={() => setOn(true)}>
//           open console
//         </Button>
//       )}
//     </div>
//   );
// };

// export default LiveConsole;


import { useEffect, useState, useRef } from "react";

const LiveConsole = () => {
  const [data, setData] = useState<any[]>([]);
  const [on, setOn] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (on) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/LiveConsole");
          const reader = response.body?.getReader();
          const decoder = new TextDecoder("utf-8");

          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader!.read();
            done = readerDone;

            if (value) {
              const chunk = decoder.decode(value, { stream: true });
              chunk.split("\n").forEach((line) => {
                if (line.trim()) {
                  const newRow = JSON.parse(line);
                  setData((prev) => [...prev, newRow]);
                }
              });
            }
          }
        } catch (error) {
          console.error("Failed to fetch console data:", error);
        }
      };

      fetchData();
    }
  }, [on]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {on ? (
        <>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Live Console</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Real-time monitoring of pickup activities
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Live • {data.length} events</span>
                </div>
                <button
                  onClick={() => {
                    setOn(false);
                    setData([]);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg shadow-sm font-medium transition-colors"
                >
                  Stop Console
                </button>
              </div>
            </div>
          </div>

          {/* Console Content */}
          <div className="flex-1 px-8 py-6 overflow-hidden">
            <div className="bg-gray-900 rounded-lg shadow-lg h-full overflow-y-auto p-6 font-mono text-sm">
              {data.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Waiting for events...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.map((row, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500 transition-all duration-300 animate-fadeIn"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className="font-semibold">Event #{index + 1}</span>
                            <span>•</span>
                            <span>{formatTimestamp(row.Timestamp)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-gray-400 text-xs">Parent:</span>
                              <p className="text-green-400 font-medium">{row.Parent_Name}</p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs">Child:</span>
                              <p className="text-blue-400 font-medium">{row.Child_Name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-12 max-w-md">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Console</h2>
              <p className="text-gray-600 mb-6">
                Monitor pickup activities in real-time
              </p>
              <button
                onClick={() => setOn(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-sm font-medium transition-colors w-full"
              >
                Start Console
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LiveConsole;