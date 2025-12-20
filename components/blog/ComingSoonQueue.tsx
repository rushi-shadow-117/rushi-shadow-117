import React from "react";

interface QueueItem {
  id: string;
  title: string;
  status: "DRAFT" | "WIP" | "QUEUED" | "OUTLINED" | string;
  category?: "work" | "life" | "fun" | ("work" | "life" | "fun")[];
}

const queueItems: QueueItem[] = [
  {
    id: "01",
    title: "My Time in Europe",
    status: "WIP",
    category: ["life", "work", "fun"],
  },
  {
    id: "02",
    title: "clad labs, ragebait and building for reality",
    status: "still in my head",
    category: "work",
  },
  {
    id: "03",
    title: "Something about Fitness",
    status: "Earning an opinion.",
    category: "life",
  },
  {
    id: "04",
    title: "My Career Story so Far",
    status: "WIP",
    category: "work",
  },
  {
    id: "05",
    title: "If I wasn't a Software Engineer...",
    status: "Still in my head",
    category: "life",
  },
  {
    id: "06",
    title: "Kratos, Geralt and Batman",
    status: "Deciding on whether it's worth writing",
    category: "fun",
  },
];

export function ComingSoonQueue() {
  if (queueItems.length === 0) {
    return null;
  }

  return (
    <div className="border border-black/10 bg-white mt-12">
      {/* Header */}
      <div className="border-b border-black/10 px-6 py-4 bg-neutral-50">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase text-neutral-500 tracking-wider">
            QUEUE [{queueItems.length} {queueItems.length === 1 ? 'ITEM' : 'ITEMS'}]
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Queue Items */}
      <div className="divide-y divide-black/10">
        {queueItems.map((item) => (
          <div
            key={item.id}
            className="px-6 py-4 hover:bg-neutral-50 transition-colors duration-200 group"
          >
            <div className="flex items-start gap-4">
              {/* Queue Number */}
              <span className="font-mono text-sm text-neutral-500 flex-shrink-0">
                [{item.id}]
              </span>
              
              {/* Title and Status */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-black mb-1 group-hover:text-neutral-700 transition-colors break-words">
                  {item.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap mt-2">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider break-words">
                    STATUS: <span className="text-black break-words">{item.status}</span>
                  </span>
                  {item.category && (
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider break-words">
                      CATEGORY: <span className="text-black break-words">
                        {Array.isArray(item.category) 
                          ? item.category.map(c => c.toUpperCase()).join(", ")
                          : item.category.toUpperCase()}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

