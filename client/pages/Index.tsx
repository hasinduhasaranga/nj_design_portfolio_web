import { AnimatedBackground } from "../components/AnimatedBackground";

import { useState, useEffect } from "react";
import { PortfolioModal } from "../components/PortfolioModal";
import { Language, getTranslation, getLanguageFromStorage, setLanguageToStorage } from "../utils/translations";
import { ContentBlock } from "../../shared/schema";
import { AnimatedWaveBackground } from "@/components/AnimatedWaveBackground";
import { AnimatedLinesBackground } from "@/components/AnimatedLinesBackground";

// Portfolio data
const portfolioItems = [
  {
    id: 1,
    title: "OneSimBox Mobile App",
    subtitle: "integrating eSIM and VPN and WiFi",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560",
    category: "Mobil ilova",
    year: 2025,
    description:
      "The design created for the OneSimBox mobile app – an innovative project that integrates eSIM and VPN technologies. It has been crafted to be unique, attractive, and individual.",
  },
  {
    id: 2,
    title: "Project Two",
    subtitle: "Subtitle",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560",
    category: "Mobil ilova",
    year: 2025,
  },
  {
    id: 3,
    title: "Project Three",
    subtitle: "Subtitle",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560",
    category: "Veb dizayn",
    year: 2025,
  },
  {
    id: 4,
    title: "Project Four",
    subtitle: "Subtitle",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560",
    category: "Mobil ilova",
    year: 2025,
  },
  {
    id: 5,
    title: "Project Five",
    subtitle: "Subtitle",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560",
    category: "Veb dizayn",
    year: 2025,
  },
  {
    id: 6,
    title: "Project Six",
    subtitle: "Subtitle",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560",
    category: "Grafik dizayn",
    year: 2025,
  },
];

export default function Index() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('uz');
  const itemsPerPage = 6;

  const t = (key: string) => getTranslation(language, key);
  const categories = ["Barchasi", "Mobil ilova", "Vebsayt", "Logotip"];

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setBlocks(data))
      .catch((err) => console.error("Failed to load content", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector("#hero-section");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsHeroVisible(rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Load language from localStorage on mount
  useEffect(() => {
    setLanguage(getLanguageFromStorage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLanguageToStorage(lang);
  };

  const handlePortfolioClick = (index: number) => {
    setCurrentPortfolioIndex(index);
    setIsModalOpen(true);
  };

  const handleModalNext = () => {
    setCurrentPortfolioIndex(
      (prev) => (prev + 1) % projects.length
    );
  };

  const handleModalPrev = () => {
    setCurrentPortfolioIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const block1 = blocks.find(b => b.id === "block1");
  const block2 = blocks.find(b => b.id === "block2");
  const block3 = blocks.find(b => b.id === "block3");
  const block4 = blocks.find(b => b.id === "block4");
  const block5 = blocks.find(b => b.id === "block5");
  const bottom = blocks.find(b => b.id === "bottom");

  const projects = (block3?.projects || []).filter((item: any) => activeCategory === "Barchasi" || (item.hashtag || item.category) === activeCategory);
  
  // Pagination logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-navy-darker font-sans text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        isHeroVisible
          ? "bg-navy-dark/90"
          : "bg-gray-dark/95 backdrop-blur-md"
      }`} id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu Button - Mobile Only */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-3 sm:gap-6 md:gap-8">
              <a href="#men-haqqimda" className="text-white text-xs sm:text-sm uppercase hover:text-yellow-accent transition-colors">
                {t('nav.about')}
              </a>
              <a href="#portfolio" className="text-white text-xs sm:text-sm uppercase hover:text-yellow-accent transition-colors">
                {t('nav.portfolio')}
              </a>
              <a href="#narxlar" className="text-white text-xs sm:text-sm uppercase hover:text-yellow-accent transition-colors">
                {t('nav.prices')}
              </a>
              <a href="#boglanish" className="text-white text-xs sm:text-sm uppercase hover:text-yellow-accent transition-colors">
                {t('nav.contact')}
              </a>
            </div>
            {/* Language Flags */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Uzbek */}
              <button 
                onClick={() => handleLanguageChange('uz')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border transition-colors ${
                  language === 'uz' ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <svg className="w-5 h-4 sm:w-7 sm:h-5" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="21" rx="2" fill="white"/>
                  <path d="M0 14H28V21H0V14Z" fill="#1EB53A"/>
                  <path d="M0 0H28V7H0V0Z" fill="#0099B5"/>
                  <path d="M0 6.71997H28V14.28H0V6.71997Z" fill="#CE1126"/>
                  <path d="M0 7.13989H28V13.8599H0V7.13989Z" fill="white"/>
                  <circle cx="5.88" cy="3.36" r="2.52" fill="white"/>
                  <circle cx="6.72" cy="3.36" r="2.52" fill="#0099B5"/>
                </svg>
                <span className="text-white text-xs sm:text-sm uppercase hidden sm:inline">O'z</span>
              </button>

              {/* English */}
              <button 
                onClick={() => handleLanguageChange('en')}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border transition-colors ${
                  language === 'en' ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <svg className="w-5 h-4 sm:w-7 sm:h-5" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="21" rx="2" fill="#012169"/>
                  <path d="M0 0L28 21M28 0L0 21" stroke="white" strokeWidth="2.8"/>
                  <path d="M14 0V21M0 10.5H28" stroke="#C8102E" strokeWidth="1.4"/>
                  <path d="M14 0V21M0 10.5H28" stroke="white" strokeWidth="0.933333"/>
                </svg>
                <span className="text-white text-xs sm:text-sm uppercase hidden sm:inline">En</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="px-4 py-4 space-y-3 bg-navy-dark/95 backdrop-blur-md border-t border-white/10">
            <a 
              href="#men-haqqimda" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white text-sm uppercase hover:text-yellow-accent transition-colors py-2"
            >
              {t('nav.about')}
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white text-sm uppercase hover:text-yellow-accent transition-colors py-2"
            >
              {t('nav.portfolio')}
            </a>
            <a 
              href="#narxlar" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white text-sm uppercase hover:text-yellow-accent transition-colors py-2"
            >
              {t('nav.prices')}
            </a>
            <a 
              href="#boglanish" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white text-sm uppercase hover:text-yellow-accent transition-colors py-2"
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16 sm:pt-20">
        {/* Animated Wave Background */}
        <AnimatedLinesBackground />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-[60px] opacity-90">
            <h1 className="text-white text-center text-2xl sm:text-3xl md:text-[40px] font-normal mb-2 sm:mb-4">
              {block1?.text1 || "Salom, men"}
            </h1>
            <h2 
              className="text-white text-center font-script text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-normal leading-tight mb-2 sm:mb-4"
              dangerouslySetInnerHTML={{ __html: block1?.text2 || "Najmiddin<br>Nurmuvahedov" }}
            />
            <p className="text-white/70 text-center text-sm sm:text-base md:text-lg px-2">
              {block1?.text3 || "prezentatsion, UX/UI dizaynlarning..."}
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section - Block 2 */}
      <section id="men-haqqimda" className="py-12 sm:py-16 md:py-[100px] px-4 sm:px-6 bg-gradient-about">
        <div className="max-w-[900px] mx-auto">
          {/* Title */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-white text-2xl sm:text-3xl md:text-[32px] font-medium mb-3 sm:mb-4">{block2?.title1 || "Men haqimda"}</h2>
            <div className="w-full h-[0.8px] bg-white/10"></div>
          </div>

          {/* About Text */}
          <div className="mb-6 sm:mb-8">
            <p 
              className="text-gray-light text-base sm:text-lg md:text-xl text-justify leading-relaxed mb-4 sm:mb-6"
              dangerouslySetInnerHTML={{ __html: block2?.text1_1 || "Men vebsaytlar..." }}
            />
            <p 
              className="text-gray-light/50 text-sm sm:text-base mb-4 sm:mb-6"
              dangerouslySetInnerHTML={{ __html: block2?.text1_2 || "Quyida mening..." }}
            />
            {block2?.button1Enabled && (
              <button className="group relative flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-2 sm:py-3 rounded-[23px] border border-yellow-gold/50 bg-gradient-to-b from-[#FFBD59]/6 to-[#FFBD59]/5 hover:border-yellow-gold transition-all text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.59175 13.5915C6.3829 13.8004 6.13475 13.9664 5.86165 14.0796C5.58855 14.1928 5.29585 14.251 5 14.251C4.70415 14.251 4.41145 14.1928 4.13835 14.0796C3.86525 13.9664 3.6171 13.8004 3.40825 13.5915L1.00025 11.1833C0.871084 11.0404 0.801884 10.8535 0.806834 10.661C0.811784 10.4685 0.890484 10.2853 1.02675 10.1494C1.16302 10.0134 1.34638 9.93501 1.53888 9.93051C1.73138 9.92601 1.91818 9.99551 2.06075 10.125L4.25525 12.3203L4.25 0.75C4.25 0.551088 4.329 0.360322 4.46967 0.21967C4.61033 0.0790178 4.80109 0 5 0C5.19891 0 5.38967 0.0790178 5.53033 0.21967C5.671 0.360322 5.75 0.551088 5.75 0.75L5.75675 12.306L7.93925 10.125C8.07998 9.98436 8.27074 9.90538 8.46975 9.90548C8.66875 9.90558 8.85951 9.98461 9.00013 10.1254C9.14075 10.2661 9.21972 10.4569 9.21962 10.6559C9.21952 10.8548 9.14049 11.0456 8.99975 11.1862L6.59175 13.5915Z" fill="url(#paint0_linear)" />
                  <path d="M0.75 12C0.948912 12 1.13968 12.079 1.28033 12.2197C1.421 12.3603 1.5 12.5511 1.5 12.75V15.75C1.5 15.9489 1.579 16.1397 1.71967 16.2803C1.86032 16.421 2.05109 16.5 2.25 16.5H15.75C15.9489 16.5 16.1397 16.421 16.2803 16.2803C16.421 16.1397 16.5 15.9489 16.5 15.75V12.75C16.5 12.5511 16.579 12.3603 16.7197 12.2197C16.8603 12.079 17.0511 12 17.25 12C17.4489 12 17.6397 12.079 17.7803 12.2197C17.921 12.3603 18 12.5511 18 12.75V15.75C18 16.3467 17.7629 16.919 17.341 17.341C16.919 17.7629 16.3467 18 15.75 18H2.25C1.65326 18 1.08097 17.7629 0.658961 17.341C0.236957 16.919 0 16.3467 0 15.75V12.75C0 12.5511 0.0790178 12.3603 0.21967 12.2197C0.360322 12.079 0.551088 12 0.75 12Z" fill="url(#paint1_linear)" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="6.01313" y1="0" x2="6.01313" y2="14.251" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFD12E"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="9" y1="12" x2="9" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFD12E"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="bg-gradient-to-r from-yellow-gold to-yellow-gold bg-clip-text text-transparent font-normal">
                  Yuklab olish
                </span>
              </button>
            )}
          </div>

          {/* Tools Section */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 bg-[rgba(165,170,181,0.2)] backdrop-blur-[5px]">
            <h3 className="text-white text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{block2?.title2 || "Men foydalanadigan dasturiy vositalar"}</h3>
            <div className="w-full h-[0.8px] bg-white/10 mb-4 sm:mb-6"></div>
            <p className="text-gray-light text-lg sm:text-xl mb-3 sm:mb-4">
              {block2?.text2_1 || "Men quyidagi dasturiy ta'minotlardan foydalanib dizaynlar yarataman."}
            </p>
            <p 
              className="text-gray-light text-base sm:text-xl mb-6 sm:mb-8"
              dangerouslySetInnerHTML={{ __html: block2?.text2_2 || "Dizayn - bu nafaqat..." }}
            />

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {/* Figma - Stock 1 */}
              {block2?.stocks?.[0]?.enabled && (
              <div className="flex flex-col items-center gap-2 sm:gap-3 py-3 sm:py-5 rounded-[20px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-[62px] md:h-[62px] flex items-center justify-center">
                  {block2?.stocks?.[0]?.icon?.startsWith('<') ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: block2.stocks[0].icon }} />
                  ) : block2?.stocks?.[0]?.icon ? (
                    <img src={block2.stocks[0].icon} alt={block2.stocks[0].title} className="w-full h-full object-contain" />
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M31 31C31 26.1847 34.9035 22.2812 39.7188 22.2812C44.534 22.2812 48.4375 26.1847 48.4375 31C48.4375 35.8153 44.534 39.7188 39.7188 39.7188C34.9035 39.7188 31 35.8153 31 31Z" fill="#1ABCFE"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.5625 48.4375C13.5625 43.6222 17.466 39.7188 22.2812 39.7188H31V48.4375C31 53.2528 27.0965 57.1562 22.2812 57.1562C17.466 57.1562 13.5625 53.2528 13.5625 48.4375Z" fill="#0ACF83"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M31 4.84375V22.2812H39.7188C44.534 22.2812 48.4375 18.3777 48.4375 13.5625C48.4375 8.74727 44.534 4.84375 39.7188 4.84375H31Z" fill="#FF7262"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.5625 13.5625C13.5625 18.3777 17.466 22.2812 22.2812 22.2812H31V4.84375H22.2812C17.466 4.84375 13.5625 8.74727 13.5625 13.5625Z" fill="#F24E1E"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.5625 31C13.5625 35.8153 17.466 39.7188 22.2812 39.7188H31V22.2812H22.2812C17.466 22.2812 13.5625 26.1847 13.5625 31Z" fill="#A259FF"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-light text-center text-sm sm:text-[15px]">{block2?.stocks?.[0]?.title || "Figma"}</span>
              </div>
              )}

              {/* Adobe XD */}
              {block2?.stocks?.[1]?.enabled && (
              <div className="flex flex-col items-center gap-2 sm:gap-3 py-3 sm:py-5 rounded-[20px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-[62px] md:h-[62px] flex items-center justify-center">
                  {block2?.stocks?.[1]?.icon?.startsWith('<') ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: block2.stocks[1].icon }} />
                  ) : block2?.stocks?.[1]?.icon ? (
                    <img src={block2.stocks[1].icon} alt={block2.stocks[1].title} className="w-full h-full object-contain" />
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 62 62" fill="none"><path d="M3.625 23.5083C3.625 16.636 3.625 13.1999 4.96244 10.575C6.13889 8.26609 8.01609 6.38889 10.325 5.21244C12.9499 3.875 16.386 3.875 23.2583 3.875H38.2417C45.114 3.875 48.5501 3.875 51.175 5.21244C53.4838 6.38889 55.3612 8.26609 56.5376 10.575C57.875 13.1999 57.875 16.636 57.875 23.5083V38.4917C57.875 45.364 57.875 48.8001 56.5376 51.425C55.3612 53.7338 53.4838 55.6112 51.175 56.7876C48.5501 58.125 45.114 58.125 38.2417 58.125H23.2583C16.386 58.125 12.9499 58.125 10.325 56.7876C8.01609 55.6112 6.13889 53.7338 4.96244 51.425C3.625 48.8001 3.625 45.364 3.625 38.4917V23.5083Z" fill="#470137"/><path d="M18.0312 37.9062L25.7812 20.25C25.8125 20.1406 25.8906 20.0781 26.0469 20.0781H31.3125C31.4531 20.0625 31.5781 20.1875 31.5625 20.3281C31.5625 20.8125 31.6094 21.2813 31.7031 21.75C31.7656 22.0156 31.8594 22.2031 31.9219 22.3906L39.7031 42.8594C39.7812 43.1094 39.7031 43.2344 39.4844 43.2344H35.5156C35.3125 43.2344 35.1562 43.125 35.1094 42.9375L33.4219 37.8125H19.5781L17.8906 42.9375C17.8438 43.125 17.6875 43.2344 17.4844 43.2344H13.5156C13.2969 43.2344 13.2188 43.1094 13.2969 42.8594L18.0312 37.9062Z" fill="#FF61F6"/></svg>
                  )}
                </div>
                <span className="text-gray-light text-center text-sm sm:text-[15px]">{block2?.stocks?.[1]?.title || "Adobe XD"}</span>
              </div>
              )}

              {/* Adobe Photoshop */}
              {block2?.stocks?.[2]?.enabled && (
              <div className="flex flex-col items-center gap-2 sm:gap-3 py-3 sm:py-5 rounded-[20px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-[62px] md:h-[62px] flex items-center justify-center">
                  {block2?.stocks?.[2]?.icon?.startsWith('<') ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: block2.stocks[2].icon }} />
                  ) : block2?.stocks?.[2]?.icon ? (
                    <img src={block2.stocks[2].icon} alt={block2.stocks[2].title} className="w-full h-full object-contain" />
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.125 23.5083C4.125 16.636 4.125 13.1999 5.46244 10.575C6.63889 8.51609 6.38889 10.825 5.21244C13.4499 3.875 16.886 3.875 23.7583 3.875H38.7417C45.614 3.875 49.0501 3.875 51.675 5.21244C53.9838 6.38889 55.8612 8.26609 57.0376 10.575C58.375 13.1999 58.375 16.636 58.375 23.5083V38.4917C58.375 45.364 58.375 48.8001 57.0376 51.425C55.8612 53.7338 53.9838 55.6112 51.675 56.7876C49.0501 58.125 45.614 58.125 38.7417 58.125H23.7583C16.886 58.125 13.4499 58.125 10.825 56.7876C8.51609 55.6112 6.63889 53.7338 5.46244 51.425C4.125 48.8001 4.125 45.364 4.125 38.4917V23.5083Z" fill="#001E36"/>
                      <path d="M15.75 43.6253V19.7691C15.75 19.6069 15.8178 19.5141 15.976 19.5141C18.3119 19.5141 20.6468 19.375 22.9833 19.375C26.7746 19.375 30.8799 20.6713 32.3189 24.6378C32.6579 25.6114 32.8387 26.6083 32.8387 27.6516C32.8387 29.6454 32.3867 31.2914 31.4825 32.5898C28.9568 36.2164 24.5792 36.1601 20.6551 36.1601V43.602C20.6858 43.8224 20.498 43.9266 20.316 43.9266H16.0213C15.8404 43.9266 15.75 43.8339 15.75 43.6253ZM20.6777 23.9886V31.7784C22.2336 31.8923 23.8618 31.9047 25.3568 31.4074C27.0071 30.9313 27.911 29.5026 27.911 27.7907C27.9569 26.3319 27.162 24.9323 25.8089 24.4059C24.3318 23.7917 22.272 23.7549 20.6777 23.9886Z" fill="#31A8FF"/>
                      <path d="M46.9373 30.2393C46.2534 29.8788 45.5249 29.6152 44.772 29.4554C43.8043 29.2277 39.9878 28.4303 39.9864 30.4258C40.0202 31.54 41.7888 32.0859 42.5701 32.4042C45.3133 33.3459 48.4176 35.0295 48.3566 38.4136C48.4404 42.6265 44.3587 44.3107 40.8597 44.3111C39.0381 44.33 37.1406 44.0479 35.4735 43.2659C35.3144 43.1817 35.212 43.0016 35.2188 42.8181V38.7869C35.2009 38.6252 35.3743 38.484 35.51 38.6003C37.1433 39.588 39.0794 40.0676 40.9688 40.0933C41.803 40.0933 43.4562 40.0125 43.4436 38.7869C43.4436 37.6107 41.466 37.07 40.6777 36.7713C39.5351 36.3634 38.4515 35.7983 37.4569 35.0916C36.0671 34.1002 35.1951 32.5106 35.2188 30.7618C35.2107 26.795 38.968 25.0145 42.3518 25.0136C43.9337 25.0006 45.6324 25.1177 47.105 25.7602C47.3167 25.8225 47.3606 26.0455 47.3597 26.2454V30.0154C47.3731 30.2493 47.1133 30.329 46.9373 30.2393Z" fill="#31A8FF"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-light text-center text-sm sm:text-[15px]">{block2?.stocks?.[2]?.title || "Adobe Photoshop"}</span>
              </div>
              )}

              {/* After Effects */}
              {block2?.stocks?.[3]?.enabled && (
              <div className="flex flex-col items-center gap-2 sm:gap-3 py-3 sm:py-5 rounded-[20px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-[62px] md:h-[62px] flex items-center justify-center">
                  {block2?.stocks?.[3]?.icon?.startsWith('<') ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: block2.stocks[3].icon }} />
                  ) : block2?.stocks?.[3]?.icon ? (
                    <img src={block2.stocks[3].icon} alt={block2.stocks[3].title} className="w-full h-full object-contain" />
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.625 23.5083C3.625 16.636 3.625 13.1999 4.96244 10.575C6.13889 8.26609 8.01609 6.38889 10.325 5.21244C12.9499 3.875 16.386 3.875 23.2583 3.875H38.2417C45.114 3.875 48.5501 3.875 51.175 5.21244C53.4838 6.38889 55.3612 8.26609 56.5376 10.575C57.875 13.1999 57.875 16.636 57.875 23.5083V38.4917C57.875 45.364 57.875 48.8001 56.5376 51.425C55.3612 53.7338 53.4838 55.6112 51.175 56.7876C48.5501 58.125 45.114 58.125 38.2417 58.125H23.2583C16.386 58.125 12.9499 58.125 10.325 56.7876C8.01609 55.6112 6.13889 53.7338 4.96244 51.425C3.625 48.8001 3.625 45.364 3.625 38.4917V23.5083Z" fill="#00005B"/>
                      <path d="M26.4668 37.905H18.0602L16.3497 43.365C16.3022 43.5674 16.1158 43.7107 15.913 43.7008H11.655C11.4122 43.7008 11.3273 43.564 11.4003 43.2903L18.6787 21.8794C18.7516 21.6555 18.8243 21.4366 18.8972 21.1502C18.9923 20.6522 19.0412 20.1461 19.0427 19.6386C19.0219 19.4886 19.1514 19.3558 19.2976 19.3773H25.0838C25.2534 19.3773 25.3504 19.4394 25.375 19.5639L33.6362 43.3276C33.709 43.5767 33.6362 43.701 33.4178 43.7008H28.6867C28.5208 43.7196 28.3624 43.606 28.3228 43.4396L26.4668 37.905ZM19.3703 33.3012H25.1203C24.1755 30.0729 23.1094 26.8872 22.2453 23.6337C21.2661 27.0086 20.3619 30.1384 19.3703 33.3012Z" fill="#9999FF"/>
                      <path d="M39.7803 35.7967C40.1149 38.5691 42.443 39.8909 45.0209 39.8346C46.4745 39.806 48.0281 39.5804 49.3863 39.0307C49.5075 38.9316 49.5683 38.9933 49.5683 39.2173V42.7633C49.5798 42.9478 49.5027 43.1126 49.3499 43.2111C47.6618 43.9781 45.7237 44.2093 43.8927 44.18C38.4332 44.18 34.6838 40.3333 34.6853 34.7365C34.6711 29.4328 38.1119 24.9583 43.456 24.9583C47.986 24.8409 51.1222 28.4679 51.1349 32.9823C51.1349 33.8046 51.089 34.6296 50.9893 35.4458C50.97 35.6139 50.8268 35.7444 50.6617 35.7444C47.0438 35.7444 43.4082 35.7967 39.7803 35.7967ZM39.7803 32.3965C41.7966 32.3965 43.8247 32.4677 45.8397 32.3778C46.1426 32.3468 46.3674 32.2894 46.3674 31.9744C46.3255 30.3008 44.913 28.9244 43.2742 28.9883C41.2938 28.8656 40.0265 30.5372 39.7803 32.3965Z" fill="#9999FF"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-light text-center text-sm sm:text-[15px]">{block2?.stocks?.[3]?.title || "Adobe After Effects"}</span>
              </div>
              )}

              {/* Adobe Illustrator */}
              {block2?.stocks?.[4]?.enabled && (
              <div className={`flex flex-col items-center gap-2 sm:gap-3 py-3 sm:py-5 rounded-[20px] ${!block2?.stocks?.[4]?.enabled ? 'opacity-30' : ''}`}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-[62px] md:h-[62px] flex items-center justify-center">
                  {block2?.stocks?.[4]?.icon?.startsWith('<') ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: block2.stocks[4].icon }} />
                  ) : block2?.stocks?.[4]?.icon ? (
                    <img src={block2.stocks[4].icon} alt={block2.stocks[4].title} className="w-full h-full object-contain" />
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.625 23.5083C3.625 16.636 3.625 13.1999 4.96244 10.575C6.13889 8.26609 8.01609 6.38889 10.325 5.21244C12.9499 3.875 16.386 3.875 23.2583 3.875H38.2417C45.114 3.875 48.5501 3.875 51.175 5.21244C53.4838 6.38889 55.3612 8.26609 56.5376 10.575C57.875 13.1999 57.875 16.636 57.875 23.5083V38.4917C57.875 45.364 57.875 48.8001 56.5376 51.425C55.3612 53.7338 53.4838 55.6112 51.175 56.7876C48.5501 58.125 45.114 58.125 38.2417 58.125H23.2583C16.386 58.125 12.9499 58.125 10.325 56.7876C8.01609 55.6112 6.13889 53.7338 4.96244 51.425C3.625 48.8001 3.625 45.364 3.625 38.4917V23.5083Z" fill="#330000"/>
                      <path d="M23.8281 37.8125H17.0781L15.3906 42.9375C15.3438 43.125 15.1875 43.2344 14.9844 43.2344H11.0156C10.7969 43.2344 10.7188 43.1094 10.7969 42.8594L17.6719 22.3906C17.7344 22.2031 17.8281 22.0156 17.8906 21.75C17.9844 21.2813 18.0313 20.8125 18.0313 20.3281C18.0156 20.1875 18.1406 20.0625 18.2813 20.0781H23.5469C23.7031 20.0781 23.7813 20.1406 23.8125 20.25L31.5625 42.8906C31.6406 43.1094 31.5625 43.2344 31.3438 43.2344H27.0938C26.9375 43.2344 26.7969 43.1406 26.7656 43L25.0781 37.8125H23.8281ZM18.0781 33.7031H23.2656C22.3906 30.7031 21.3906 27.7969 20.5938 24.7188C19.7188 27.8281 18.8906 30.7344 18.0781 33.7031Z" fill="#FF9A00"/>
                      <path d="M36.8438 25.875C37.5313 25.875 38.2188 25.9531 38.8438 26.1094C39.0469 26.1719 39.1406 26.2656 39.1406 26.4844V30.0156C39.1406 30.2031 39.0781 30.2656 38.9063 30.2031C38.2188 29.9219 37.4844 29.7656 36.75 29.7656C36.0938 29.7656 35.4375 29.9063 34.8594 30.1719C34.2813 30.4531 33.7656 30.8438 33.3594 31.3594C32.9531 31.875 32.6406 32.4844 32.4531 33.1406C32.25 33.7969 32.1563 34.4844 32.1563 35.1875V43.1094C32.1563 43.2656 32.0781 43.3438 31.9219 43.3438H27.8906C27.7344 43.3438 27.6563 43.2656 27.6563 43.1094V26.4531C27.6563 26.2969 27.7344 26.2188 27.8906 26.2188H31.5469C31.7031 26.2188 31.7813 26.2969 31.7813 26.4531V28.3125C32.2969 27.4531 32.9844 26.7188 33.8438 26.1719C34.7031 25.625 35.7344 25.875 36.8438 25.875Z" fill="#FF9A00"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-light text-center text-sm sm:text-[15px]">{block2?.stocks?.[4]?.title || "Adobe Illustrator"}</span>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Block 3 */}
      <section id="portfolio" className="py-6 sm:py-8 px-4 sm:px-6 bg-navy-blue">
        <div className="max-w-[1440px] mx-auto py-12 sm:py-16 md:py-[100px] px-4 sm:px-6 md:px-16 lg:px-[100px] rounded-2xl sm:rounded-[30px] bg-purple-light">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-[#0A181B] text-center text-3xl sm:text-4xl md:text-[40px] font-medium mb-3 sm:mb-4">{block3?.title || "Portfolio"}</h2>
            <div className="w-full h-[0.8px] bg-white/10 mb-4 sm:mb-6"></div>
            <p className="text-gray-dark text-base sm:text-lg md:text-xl text-justify mb-8 sm:mb-10">
              {block3?.text || "Bu bo'limda siz..."}
            </p>

            {/* Category Filter */}
            <div className="flex justify-center mb-8 sm:mb-10">
              <div className="inline-flex bg-gray-200/50 p-1 rounded-full">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {paginatedProjects.map((item: any, index: number) => {
                const actualIndex = startIndex + index;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => handlePortfolioClick(actualIndex)}
                    className="bg-white/50 rounded-md border border-black/10 shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow cursor-pointer text-left"
                >
                  <img
                    src={item.thumbnail?.src || item.thumbnail || "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560"}
                    alt={item.title}
                    className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover object-top rounded-t-md"
                  />
                  <div className="p-4 sm:p-5">
                    <h3 className="text-[#0A181B] text-lg sm:text-xl md:text-2xl font-medium line-clamp-2 mb-2 sm:mb-3 min-h-[3.5rem] sm:min-h-[4rem]">
                      {item.title} {item.subtitle ? item.subtitle : ""}
                    </h3>
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 14 14" fill="none">
                        <path d="M5.57016 12.5166C4.79374 13.293 2.31808 13.8209 0.950158 13.9819C0.402408 14.0461 -0.0584248 13.5852 0.00574182 13.0375C0.166742 11.6696 0.706325 9.20617 1.48274 8.42975C2.61149 7.301 4.44141 7.301 5.56957 8.42975C6.69832 9.5585 6.69891 11.3884 5.57016 12.5166Z" fill="#788089" fillOpacity="0.7"/>
                      </svg>
                      <span className="text-gray-muted text-sm sm:text-base font-medium">{item.hashtag || item.category || "Category"}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 14 14" fill="none">
                        <path d="M0 11.0834C0.00092625 11.8566 0.308514 12.598 0.855295 13.1447C1.40208 13.6915 2.1434 13.9991 2.91667 14H11.0833C11.8566 13.9991 12.5979 13.6915 13.1447 13.1447C13.6915 12.598 13.9991 11.8566 14 11.0834V5.83337H0V11.0834Z" fill="#788089" fillOpacity="0.7"/>
                      </svg>
                      <span className="text-gray-muted text-sm sm:text-base font-medium">{item.year || "2025"}</span>
                    </div>
                  </div>
                </button>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors font-medium ${
                      num === currentPage
                        ? "bg-white text-gray-900"
                        : "bg-gray-200/50 text-gray-700 hover:bg-gray-200/70"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services/Pricing Section - Block 4 */}
      <section id="narxlar" className="py-12 sm:py-16 md:py-[100px] px-4 sm:px-6 bg-gradient-services">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-purple-light text-3xl sm:text-4xl md:text-[40px] font-medium mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
            {block4?.image1Enabled && (
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[78px] md:h-[78px] flex items-center justify-center">
                 {block4?.image1?.startsWith('<') ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: block4.image1 }} />
                 ) : (
                    <img src={block4?.image1 || "/images/book.svg"} alt="" className="w-full h-full object-contain" />
                 )}
              </div>
            )}
            {block4?.title1 || "Narxlar"}
          </h2>

          <p className="text-purple-light text-base sm:text-lg md:text-xl text-justify mb-6 sm:mb-8">
            {block4?.text1 || "Ko'rsatiladigan xizmatlar..."}
          </p>

          {/* Services Cards */}
          <div className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 bg-[rgba(165,170,181,0.2)] backdrop-blur-[5px] mb-4 sm:mb-6">
            <h3 className="text-purple-light text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{block4?.title2 || "MAXSUS TAKLIF!"}</h3>
            <p className="text-white text-base sm:text-lg md:text-xl text-justify mb-6 sm:mb-8">
              {block4?.text2 || "Arzon narxda..."}
            </p>

            <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
              {(block4?.brands || []).map((brand: any, index: number) => {
                if (!brand.logoEnabled && !brand.linkEnabled) return null;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 sm:gap-2.5">
                    {brand.logoEnabled && (
                      <div className="w-full h-[100px] sm:h-[120px] md:h-[140px] bg-white/20 rounded-[20px] p-4 sm:p-5 flex items-end justify-center">
                        {brand.logo.startsWith('<') ? (
                          <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: brand.logo }} />
                        ) : (
                          <img src={brand.logo} alt="" className="w-full h-full object-contain" />
                        )}
                      </div>
                    )}
                    {brand.linkEnabled && (
                      <a href={brand.link.replace(/<[^>]*>?/gm, '')} className="text-yellow-accent text-sm sm:text-base md:text-lg underline break-all">
                        {brand.link.replace(/<[^>]*>?/gm, '')}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote */}
          <div className="flex items-start gap-2 sm:gap-2.5">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-1 h-[20px] sm:h-[26px] bg-white/70 rounded-[3px]"></div>
              <div className="w-1 h-1 bg-white/70 rounded-full mt-1"></div>
            </div>
            <p className="flex-1 text-white/70 text-sm sm:text-base text-justify">
              {block4?.text3 || "Dizayn tayyorlatish..."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section - Block 5 */}
      <section id="boglanish" className="py-6 sm:py-8 px-4 sm:px-6 bg-gradient-contact">
        <div className="max-w-[1440px] mx-auto py-12 sm:py-16 md:py-[100px] px-4 sm:px-6 md:px-16 lg:px-[100px] rounded-2xl sm:rounded-[30px] bg-purple-light shadow-[0_4px_20px_0_rgba(0,0,0,0.05)]">
          <div className="max-w-[1240px] mx-auto">
            <h2 className="text-[#0A181B] text-3xl sm:text-4xl md:text-[40px] font-medium mb-3 sm:mb-4">{block5?.title1 || "Bog'lanish"}</h2>
            <div className="w-full h-[0.8px] bg-white/10 mb-4 sm:mb-6"></div>
            <p className="text-gray-dark text-base sm:text-lg md:text-xl mb-4 sm:mb-6">{block5?.text1 || "Jonli muloqot uchun aloqa raqami"}</p>
            
            <h3 className="text-[#0A181B] text-3xl sm:text-5xl md:text-[64px] font-bold mb-10 sm:mb-14 mt-4">{block5?.phone || "+998 33 141 41 41"}</h3>

            {/* Social Media Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
              {(block5?.contacts || []).map((contact: any, index: number) => (
                <div key={index} className="flex flex-col items-center gap-2 sm:gap-3">
                  {contact.imageEnabled && (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-[120px] md:h-[120px] flex items-center justify-center">
                      {contact.image.startsWith('<') ? (
                         <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: contact.image }} />
                      ) : (
                         <img src={contact.image} alt={contact.title} className="w-full h-full object-contain" />
                      )}
                    </div>
                  )}
                  <div className="text-center">
                    {contact.titleEnabled && (
                      <div className="text-[#0A181B] text-base sm:text-lg font-semibold" dangerouslySetInnerHTML={{ __html: contact.title }} />
                    )}
                    {contact.linkEnabled && (
                      <a href={contact.link.startsWith('<') ? contact.link.match(/href="([^"]*)"/)?.[1] || '#' : contact.link} className="text-blue-accent text-sm sm:text-base underline break-all">
                         {contact.link.startsWith('<') ? contact.link.replace(/<[^>]*>?/gm, '') : contact.link}
                      </a>
                    )}
                    {contact.descriptionEnabled && (
                      <p className="text-gray-muted text-sm sm:text-base mt-1 hidden sm:block">{contact.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-gradient-contact">
        <div className="w-full mx-auto py-12 sm:py-16 md:py-[80px] px-6 sm:px-10 md:px-20 lg:px-[120px] bg-purple-light rounded-2xl sm:rounded-[30px]">
          <div className="w-full">
            {/* Footer Content */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4 mb-6 sm:mb-8 w-full">
              {/* NJ Design */}
              <div className="flex flex-col gap-2 max-w-[300px]">
                <h3 className="text-[#0A181B] text-lg sm:text-xl md:text-2xl font-semibold">{bottom?.title1 || "NJ Design"}</h3>
                <p className="text-gray-muted text-sm sm:text-base">
                  {bottom?.text1 || "Najmiddin Nurmuxamedov tomonidan asos solingan"}
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <a href="#men-haqqimda" className="text-gray-dark text-base sm:text-lg hover:text-blue-accent transition-colors">Men haqimda</a>
                <a href="#portfolio" className="text-gray-dark text-base sm:text-lg hover:text-blue-accent transition-colors">Portfolio</a>
                <a href="#narxlar" className="text-gray-dark text-base sm:text-lg hover:text-blue-accent transition-colors">Narxlar</a>
                <a href="#boglanish" className="text-gray-dark text-base sm:text-lg hover:text-blue-accent transition-colors">Bog'lanish</a>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-2 sm:gap-3">
                {bottom?.link1Enabled && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center">
                    {bottom.img1?.startsWith('<') ? <div dangerouslySetInnerHTML={{ __html: bottom.img1 }} /> : <img src={bottom.img1} alt="" className="w-full h-full object-contain"/>}
                  </div>
                  <span className="text-gray-dark text-base sm:text-lg" dangerouslySetInnerHTML={{__html: bottom.link1?.startsWith('<') ? bottom.link1 : bottom.link1}}></span>
                </div>
                )}
                {bottom?.link2Enabled && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center">
                    {bottom.img2?.startsWith('<') ? <div dangerouslySetInnerHTML={{ __html: bottom.img2 }} /> : <img src={bottom.img2} alt="" className="w-full h-full object-contain"/>}
                  </div>
                  <span className="text-gray-dark text-base sm:text-lg break-all" dangerouslySetInnerHTML={{__html: bottom.link2}}></span>
                </div>
                )}
                {bottom?.link3Enabled && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center">
                    {bottom.img3?.startsWith('<') ? <div dangerouslySetInnerHTML={{ __html: bottom.img3 }} /> : <img src={bottom.img3} alt="" className="w-full h-full object-contain"/>}
                  </div>
                  <span className="text-gray-dark text-base sm:text-lg" dangerouslySetInnerHTML={{__html: bottom.link3}}></span>
                </div>
                )}
                {bottom?.link4Enabled && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center">
                    {bottom.img4?.startsWith('<') ? <div dangerouslySetInnerHTML={{ __html: bottom.img4 }} /> : <img src={bottom.img4} alt="" className="w-full h-full object-contain"/>}
                  </div>
                  <span className="text-gray-dark text-base sm:text-lg" dangerouslySetInnerHTML={{__html: bottom.link4}}></span>
                </div>
                )}
                {bottom?.link5Enabled && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center">
                    {bottom.img5?.startsWith('<') ? <div dangerouslySetInnerHTML={{ __html: bottom.img5 }} /> : <img src={bottom.img5} alt="" className="w-full h-full object-contain"/>}
                  </div>
                  <span className="text-gray-dark text-base sm:text-lg" dangerouslySetInnerHTML={{__html: bottom.link5}}></span>
                </div>
                )}
              </div>

              {/* QR Code */}
              {bottom?.qrCodeEnabled && (
                <div className="hidden md:block">
                  {bottom.qrCode?.startsWith('<') ? (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-[140px] md:h-[140px] border border-gray-light flex items-center justify-center p-1" dangerouslySetInnerHTML={{ __html: bottom.qrCode }} />
                  ) : (
                    <img
                      src={bottom?.qrCode || "https://api.builder.io/api/v1/image/assets/TEMP/e4ab19dd9612dd8fe4da4628d7fb8375aa5c94bf?width=228"}
                      alt="QR Code"
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-[140px] md:h-[140px] border border-gray-light"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="w-full h-px bg-gray-light mb-4 sm:mb-5"></div>

            {/* Copyright */}
            <div className="text-gray-muted text-sm sm:text-base md:text-lg">
              {bottom?.authorText || "© 2025 NJ Design (Najmiddin Nurmuxamedov). Barcha huquqlar himoyalangan."}
            </div>
          </div>
        </div>
      </footer>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={
          projects[currentPortfolioIndex]
            ? {
                type: "image",
                src: projects[currentPortfolioIndex].thumbnail?.src || projects[currentPortfolioIndex].thumbnail || "https://api.builder.io/api/v1/image/assets/TEMP/e177683cc542a4e8c98a72e2d7f63c2086684c6d?width=560",
                title: projects[currentPortfolioIndex].title,
                description: projects[currentPortfolioIndex].description,
              }
            : null
        }
        mediaItems={projects[currentPortfolioIndex]?.media || []}
        category={projects[currentPortfolioIndex]?.hashtag || projects[currentPortfolioIndex]?.category || "Category"}
        year={projects[currentPortfolioIndex]?.year || "2025"}
        onNext={handleModalNext}
        onPrev={handleModalPrev}
        hasNext={currentPortfolioIndex < projects.length - 1}
        hasPrev={currentPortfolioIndex > 0}
      />
    </div>
  );
}
