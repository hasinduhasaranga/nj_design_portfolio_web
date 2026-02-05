import { useState, useEffect, useMemo } from "react";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    type: "image" | "video" | "gif";
    src: string;
    title: string;
    description?: string;
  } | null;
  mediaItems?: any[]; // Array of additional screens
  category?: string;
  year?: string | number;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function PortfolioModal({
  isOpen,
  onClose,
  media,
  mediaItems = [],
  category,
  year,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: PortfolioModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  // Combine main media and additional screens into one slider array
  const allMedia = useMemo(() => {
    if (!media) return [];
    const items = [{ ...media, isMain: true }];
    if (mediaItems && mediaItems.length > 0) {
      mediaItems.forEach((item) => {
         // Normalize item structure if needed
         items.push({
            type: "image", // Default to image for screens for now
            src: item.src || item.url || item, 
            title: item.title || media.title,
            description: item.description || "",
            isMain: false
         });
      });
    }
    return items;
  }, [media, mediaItems]);

  // Reset index when modal opens or media changes (switching projects)
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setShowControls(true);
    }
  }, [isOpen, media]);

  // Handle controls visibility
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = () => {
      setShowControls(true);
      if (inactivityTimer) clearTimeout(inactivityTimer);
      const timer = setTimeout(() => setShowControls(false), 3000);
      setInactivityTimer(timer);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [isOpen, inactivityTimer]);

  const handleNextAction = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < allMedia.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (hasNext && onNext) {
      onNext();
    }
  };

  const handlePrevAction = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (hasPrev && onPrev) {
      onPrev();
    }
  };

  if (!isOpen || !media || allMedia.length === 0) return null;

  const currentItem = allMedia[currentIndex];
  const canGoNext = currentIndex < allMedia.length - 1 || hasNext;
  const canGoPrev = currentIndex > 0 || hasPrev;

  return (
    <div className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center text-white">
      {/* Top Bar */}
      <div className={`absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-50 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-xl sm:text-2xl font-normal text-white/90 max-w-[80%] line-clamp-2">
            {currentItem.title}
        </h2>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors p-2"
          aria-label="Close"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Content (Slider) */}
      <div className="relative w-full h-full flex items-center justify-center px-4 md:px-16 py-20" onClick={() => setShowControls(!showControls)}>
        {/* Previous Button */}
        {canGoPrev && (
            <button
            onClick={handlePrevAction}
            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-all z-40 ${showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}
            >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            </button>
        )}

        {/* Media Wrapper */}
        <div className="relative w-full h-full flex items-center justify-center">
             {currentItem.type === "video" ? (
                <video
                  src={currentItem.src}
                  controls={showControls}
                  autoPlay
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              ) : (
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              )}
        </div>

        {/* Next Button */}
        {canGoNext && (
            <button
            onClick={handleNextAction}
            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-all z-40 ${showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}
            >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            </button>
        )}
      </div>

      {/* Floating Description Overlay */}
      {currentItem.description && (
        <div className={`absolute bottom-24 sm:bottom-28 left-4 right-4 md:left-auto md:right-auto md:max-w-xl mx-auto z-40 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 sm:p-6 text-white/90 text-sm sm:text-base leading-relaxed border border-white/10 shadow-lg">
                {currentItem.description}
            </div>
        </div>
      )}

      {/* Bottom Footer Bar */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 md:px-10 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-t from-black/80 to-transparent z-50 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Left: Metadata */}
        <div className="flex items-center gap-6 w-full md:w-auto">
             {/* Category */}
            <div className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5" viewBox="0 0 14 14" fill="none">
                    <path d="M5.57016 12.5166C4.79374 13.293 2.31808 13.8209 0.950158 13.9819C0.402408 14.0461 -0.0584248 13.5852 0.00574182 13.0375C0.166742 11.6696 0.706325 9.20617 1.48274 8.42975C2.61149 7.301 4.44141 7.301 5.56957 8.42975C6.69832 9.5585 6.69891 11.3884 5.57016 12.5166Z" fill="currentColor" fillOpacity="0.7"/>
                </svg>
                <span className="text-sm font-medium">{category || "Category"}</span>
            </div>
            
            {/* Year */}
            <div className="flex items-center gap-2 text-white/70">
                <svg className="w-5 h-5" viewBox="0 0 14 14" fill="none">
                    <path d="M0 11.0834C0.00092625 11.8566 0.308514 12.598 0.855295 13.1447C1.40208 13.6915 2.1434 13.9991 2.91667 14H11.0833C11.8566 13.9991 12.5979 13.6915 13.1447 13.1447C13.6915 12.598 13.9991 11.8566 14 11.0834V5.83337H0V11.0834Z" fill="currentColor" fillOpacity="0.7"/>
                </svg>
                <span className="text-sm font-medium">{year || "2025"}</span>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <button className="text-white/70 hover:text-white transition-colors p-2" title="Share">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </button>
            <button className="text-white/70 hover:text-white transition-colors p-2" title="Download">
                 <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
            <button className="text-white/70 hover:text-white transition-colors p-2" title="Zoom In">
                 <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            </button>
             <button className="text-white/70 hover:text-white transition-colors p-2" title="Zoom Out">
                 <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
            </button>
        </div>
      </div>
    </div>
  );
}
