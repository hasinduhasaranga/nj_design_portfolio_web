import { useState, useEffect } from "react";
import { ContentBlock } from "../../shared/schema";
import { toast } from "sonner";
import { Language, getTranslation, getLanguageFromStorage, setLanguageToStorage } from "../utils/translations";




const InputItem = ({ label, value, onChange, multiline = false }: { label: string, value: string, onChange: (val: string) => void, multiline?: boolean }) => {
  const [showCode, setShowCode] = useState(false);
  // Simple regex to strip HTML tags for "Text View"
  const stripTags = (html: string) => html ? html.replace(/<[^>]*>?/gm, '') : "";
  const displayValue = showCode ? value : stripTags(value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start py-2">
      <label className="text-sm font-medium text-gray-700 pt-2">{label}:</label>
      <div className="md:col-span-3 relative group">
        {multiline ? (
          <textarea
            value={displayValue}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        ) : (
          <input
            type="text"
            value={displayValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}
        <div 
            className={`absolute right-2 top-2 cursor-pointer transition-colors ${showCode ? 'text-blue-600' : 'text-gray-400 hover:text-blue-400'}`}
            onClick={() => setShowCode(!showCode)}
            title={showCode ? "Show Text Only" : "Show HTML"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        </div>
      </div>
    </div>
  );
};

const ToggleInputItem = ({ label, value, checked, onValueChange, onCheckChange, onUpload }: { label: string, value: string, checked: boolean, onValueChange: (val: string) => void, onCheckChange: (val: boolean) => void, onUpload?: (url: string) => void }) => {
  const [showCode, setShowCode] = useState(false);
  const stripTags = (html: string) => html ? html.replace(/<[^>]*>?/gm, '') : "";
  const displayValue = showCode ? value : stripTags(value);

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      if (onUpload) onUpload(data.url);
      toast.success('File uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload file');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2">
      <label className="text-sm font-medium text-gray-700">{label}:</label>
      <div className="md:col-span-3 flex gap-4">
        <button
          onClick={() => onCheckChange(!checked)}
          className={`flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <div className="flex-1 relative group flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={displayValue}
              onChange={(e) => onValueChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
             <div 
              className={`absolute right-2 top-2 cursor-pointer transition-colors ${showCode ? 'text-blue-600' : 'text-gray-400 hover:text-blue-400'}`}
              onClick={() => setShowCode(!showCode)}
              title={showCode ? "Show Text Only" : "Show HTML"}
             >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
          </div>
          
          {onUpload && (
             <label className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border border-gray-200" title="Upload Image/Icon">
               <input 
                 type="file" 
                 className="hidden" 
                 accept="image/*,.svg"
                 onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                 }}
               />
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </label>
           )}
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const [language, setLanguage] = useState<Language>('uz');
  const [activeView, setActiveView] = useState<'blocks' | 'password'>('blocks');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  const t = (key: string) => getTranslation(language, key);

  // Load language from localStorage on mount
  useEffect(() => {
    setLanguage(getLanguageFromStorage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLanguageToStorage(lang);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword }),
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        // Load content after login
        loadContent();
        toast.success("Login successful");
      } else {
        toast.error("Incorrect password");
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };

  const loadContent = () => {
    setLoading(true);
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setBlocks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load content", err);
        setLoading(false);
        toast.error("Failed to load content");
      });
  };

  useEffect(() => {
    // Optional: Check if already logged in via session/cookie if implemented, 
    // but for now we require login on refresh as per simple requirement.
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const saveChanges = async () => {
    try {
      if (activeView === 'password') {
        if (passwords.new !== passwords.confirm) {
          toast.error("New passwords do not match!");
          return;
        }
        
        const res = await fetch("/api/password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ current: passwords.current, new: passwords.new }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || "Failed to update password");
        }
        
        toast.success("Password updated successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blocks),
        });
        toast.success("Changes saved successfully!");
      }
    } catch (err: any) {
      console.error("Failed to save changes", err);
      toast.error(err.message || "Failed to save changes.");
    }
  };

  const handleUpdate = (blockId: string, field: string, value: any) => {
    setBlocks(blocks.map(b => b.id === blockId ? { ...b, [field]: value } : b));
  };

  const handleNestedUpdate = (blockId: string, arrayField: string, index: number, field: string, value: any) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const newArray = [...b[arrayField]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...b, [arrayField]: newArray };
    }));
  };

  const handleAddNested = (blockId: string, arrayField: string, initialItem: any) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      return { ...b, [arrayField]: [...(b[arrayField] || []), initialItem] };
    }));
  };

  const handleRemoveNested = (blockId: string, arrayField: string, index: number) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const newArray = [...b[arrayField]];
      newArray.splice(index, 1);
      return { ...b, [arrayField]: newArray };
    }));
  };

  const handleReorderProject = (blockId: string, fromIndex: number, toIndex: number) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const newProjects = [...b.projects];
      const [movedProject] = newProjects.splice(fromIndex, 1);
      newProjects.splice(toIndex, 0, movedProject);
      return { ...b, projects: newProjects };
    }));
  };

  const handleDeepNestedUpdate = (blockId: string, arrayField: string, index: number, field: string, value: any) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const newArray = [...b[arrayField]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...b, [arrayField]: newArray };
    }));
  };

  const handleAddDeepNested = (blockId: string, arrayField: string, index: number, nestedArrayField: string, initialItem: any) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const newArray = [...b[arrayField]];
      const nestedArray = [...(newArray[index][nestedArrayField] || []), initialItem];
      newArray[index] = { ...newArray[index], [nestedArrayField]: nestedArray };
      return { ...b, [arrayField]: newArray };
    }));
  };

  const handleRemoveDeepNested = (blockId: string, arrayField: string, index: number, nestedArrayField: string, nestedIndex: number) => {
    setBlocks(blocks.map(b => {
      if (b.id !== blockId) return b;
      const newArray = [...b[arrayField]];
      const nestedArray = [...newArray[index][nestedArrayField]];
      nestedArray.splice(nestedIndex, 1);
      newArray[index] = { ...newArray[index], [nestedArrayField]: nestedArray };
      return { ...b, [arrayField]: newArray };
    }));
  };

  const renderInput = (label: string, value: string, onChange: (val: string) => void, multiline = false) => (
    <InputItem label={label} value={value} onChange={onChange} multiline={multiline} />
  );

  const renderToggle = (label: string, checked: boolean, onChange: (val: boolean) => void) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2">
      <label className="text-sm font-medium text-gray-700">{label}:</label>
      <div className="md:col-span-3">
        <button
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );

  const renderToggleInput = (label: string, value: string, checked: boolean, onValueChange: (val: string) => void, onCheckChange: (val: boolean) => void, onUpload?: (url: string) => void) => (
    <ToggleInputItem label={label} value={value} checked={checked} onValueChange={onValueChange} onCheckChange={onCheckChange} onUpload={onUpload} />
  );

  const renderPasswordChange = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Change Admin Panel Password
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => handleLanguageChange('uz')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'uz'
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              O'z
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'en'
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              En
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">Current Password:</label>
          <div className="md:col-span-3">
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">New Password:</label>
          <div className="md:col-span-3">
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">Confirm Password:</label>
          <div className="md:col-span-3">
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlockContent = (block: ContentBlock) => {
    switch (block.id) {
      case "block1":
        return (
          <>
            {renderInput("Text 1", block.text1, (v) => handleUpdate(block.id, "text1", v))}
            {renderInput("Text 2", block.text2, (v) => handleUpdate(block.id, "text2", v))}
            {renderInput("Text 3", block.text3, (v) => handleUpdate(block.id, "text3", v), true)}
          </>
        );
      case "block2":
        return (
          <>
            {renderInput("Title 1", block.title1, (v) => handleUpdate(block.id, "title1", v))}
            {renderInput("Text 1 (Intro)", block.text1_1, (v) => handleUpdate(block.id, "text1_1", v), true)}
            {renderInput("Text 1 (Sub)", block.text1_2, (v) => handleUpdate(block.id, "text1_2", v), true)}
            {renderToggleInput("Button Enabled", "", block.button1Enabled, () => {}, (c) => handleUpdate(block.id, "button1Enabled", c))}
            
            <div className="border-t border-dashed my-4"></div>
            {renderInput("Title 2", block.title2, (v) => handleUpdate(block.id, "title2", v))}
            {renderInput("Text 2 (Description)", block.text2_1, (v) => handleUpdate(block.id, "text2_1", v), true)}
            {renderInput("Text 2 (Detail)", block.text2_2, (v) => handleUpdate(block.id, "text2_2", v), true)}

            <div className="border-t border-dashed my-4"></div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">Tools / Stocks</h4>
            {block.stocks.map((stock: any, idx: number) => (
              <div key={idx} className="mt-2">
                {renderToggleInput(`Tool ${idx + 1}`, stock.title, stock.enabled, (v) => handleNestedUpdate(block.id, "stocks", idx, "title", v), (c) => handleNestedUpdate(block.id, "stocks", idx, "enabled", c))}
                {stock.enabled && (
                    <div className="pl-8 text-xs text-gray-500 truncate">{stock.icon ? "Icon set" : "No icon"}</div>
                )}
                 {/* Special handling for icon/title since structure is a bit flat in renderToggleInput, 
                     but requested upload feature implies editing the Icon property mainly. 
                     We can reuse renderToggleInput differently or adjust usage.
                     Let's use renderToggleInput specifically for the Icon property if enabled. */}
                 {stock.enabled && (
                    <div className="bg-gray-50 p-2 rounded mt-1 ml-4">
                        {renderToggleInput(
                            "Icon / Image", 
                            stock.icon, 
                            true, 
                            (v) => handleNestedUpdate(block.id, "stocks", idx, "icon", v), 
                            () => {}, 
                            (url) => handleNestedUpdate(block.id, "stocks", idx, "icon", url)
                        )}
                    </div>
                 )}
              </div>
            ))}
          </>
        );
      case "block3":
        return (
          <>
            {renderInput("Title 1", block.title, (v) => handleUpdate(block.id, "title", v))}
            {renderInput("Text 1", block.text, (v) => handleUpdate(block.id, "text", v), true)}
            {renderToggle("Tabs", block.tabsEnabled, (v) => handleUpdate(block.id, "tabsEnabled", v))}
            
            {(block.projects || []).map((project: any, idx: number) => (
              <div key={idx} className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center">
                    <h4 className="text-sm font-bold text-gray-700">Project #{idx + 1}</h4>
                  </div>
                  <div className="flex gap-2">
                     {/* Move Up Button */}
                     <button 
                        onClick={() => handleReorderProject(block.id, idx, idx - 1)}
                        disabled={idx === 0}
                        className={`p-1 bg-white border rounded ${
                          idx === 0 
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-blue-200 text-blue-500 hover:bg-blue-50'
                        }`}
                        title="Move Up"
                     >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                     </button>
                     
                     {/* Move Down Button */}
                     <button 
                        onClick={() => handleReorderProject(block.id, idx, idx + 1)}
                        disabled={idx === (block.projects || []).length - 1}
                        className={`p-1 bg-white border rounded ${
                          idx === (block.projects || []).length - 1
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-blue-200 text-blue-500 hover:bg-blue-50'
                        }`}
                        title="Move Down"
                     >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                     </button>
                     
                     {/* Delete Button */}
                     <button 
                        onClick={() => handleRemoveNested(block.id, "projects", idx)}
                        className="p-1 bg-white border border-red-200 text-red-500 rounded hover:bg-red-50"
                        title="Delete Project"
                     >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                  </div>
                </div>

                {renderInput("Title 1", project.title, (v) => handleNestedUpdate(block.id, "projects", idx, "title", v))}
                {renderInput("Hashtag name 1", project.hashtag, (v) => handleNestedUpdate(block.id, "projects", idx, "hashtag", v))}
                {renderInput("Year created 1", project.year, (v) => handleNestedUpdate(block.id, "projects", idx, "year", v))}
                {renderInput("Description 1", project.description, (v) => handleNestedUpdate(block.id, "projects", idx, "description", v), true)}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start py-2">
                  <label className="text-sm font-medium text-gray-700 pt-2">Media 1:</label>
                  <div className="md:col-span-3">
                    <div className="flex flex-wrap gap-2">
                      {(project.media || []).map((mediaItem: any, mIdx: number) => {
                          const isString = typeof mediaItem === 'string';
                          const src = isString ? mediaItem : mediaItem.src;
                          const type = isString ? 'image' : (mediaItem.type || 'image');

                          return (
                            <div key={mIdx} className="w-24 h-16 sm:w-32 sm:h-20 bg-gray-200 rounded relative group overflow-hidden border border-gray-300">
                               {type === 'video' ? (
                                   <div className="w-full h-full flex items-center justify-center bg-black text-white text-xs">Video</div>
                               ) : (
                                   <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${src})` }}></div>
                               )}
                               
                               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                                  <button 
                                    onClick={() => handleRemoveDeepNested(block.id, "projects", idx, "media", mIdx)}
                                    className="p-1 text-white bg-red-500 rounded text-xs"
                                    title="Remove"
                                  >
                                    ✕
                                  </button>
                               </div>
                            </div>
                          );
                      })}
                      <label className="w-24 h-16 sm:w-32 sm:h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer">
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*,video/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                const formData = new FormData();
                                formData.append('file', file);

                                try {
                                    const res = await fetch('/api/upload', {
                                        method: 'POST',
                                        body: formData
                                    });
                                    if (!res.ok) throw new Error('Upload failed');
                                    
                                    const data = await res.json();
                                    handleAddDeepNested(block.id, "projects", idx, "media", {
                                        type: data.type,
                                        src: data.url
                                    });
                                } catch (err) {
                                    alert('Failed to upload file');
                                }
                            }}
                        />
                        <span className="text-lg">+</span>
                        <span className="text-[10px]">UPLOAD</span>
                      </label>
                    </div>
                  </div>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start py-2">
                   <label className="text-sm font-medium text-gray-700 pt-2">Thumbnail 1:</label>
                   <div className="md:col-span-3">
                      <div className="w-40 aspect-video bg-gray-200 rounded relative group overflow-hidden border border-gray-300">
                         {project.thumbnail && (typeof project.thumbnail === 'string' ? project.thumbnail : project.thumbnail.src) ? (
                             <>
                                <img src={typeof project.thumbnail === 'string' ? project.thumbnail : project.thumbnail.src} alt="Thumbnail" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                    <label className="p-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                const formData = new FormData();
                                                formData.append('file', file);

                                                try {
                                                    const res = await fetch('/api/upload', {
                                                        method: 'POST',
                                                        body: formData
                                                    });
                                                    if (!res.ok) throw new Error('Upload failed');
                                                    
                                                    const data = await res.json();
                                                    handleNestedUpdate(block.id, "projects", idx, "thumbnail", { type: 'image', src: data.url });
                                                } catch (err) {
                                                    alert('Failed to upload thumbnail');
                                                }
                                            }}
                                        />
                                        ✎
                                    </label>
                                    <button 
                                       onClick={() => handleNestedUpdate(block.id, "projects", idx, "thumbnail", "")}
                                       className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                       ✕
                                    </button>
                                </div>
                             </>
                         ) : (
                             <label className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:bg-gray-300 cursor-pointer">
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const formData = new FormData();
                                        formData.append('file', file);

                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: formData
                                            });
                                            if (!res.ok) throw new Error('Upload failed');
                                            
                                            const data = await res.json();
                                            handleNestedUpdate(block.id, "projects", idx, "thumbnail", { type: 'image', src: data.url });
                                        } catch (err) {
                                            alert('Failed to upload thumbnail');
                                        }
                                    }}
                                />
                                <span className="text-2xl">+</span>
                                <span className="text-xs">Add Thumbnail</span>
                             </label>
                         )}
                      </div>
                   </div>
                 </div>
              </div>
            ))}
            
            <div className="mt-6 flex justify-center">
               <button 
                 onClick={() => handleAddNested(block.id, "projects", {
                    title: "New Project",
                    hashtag: "Category",
                    year: "2025",
                    description: "Description...",
                    media: [],
                    thumbnail: ""
                 })}
                 className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
               >
                 <span className="text-xl leading-none">+</span>
                 <span className="font-medium">Add New Project</span>
               </button>
            </div>
          </>
        );
      case "block4":
        return (
          <>
            {renderInput("Title 1", block.title1, (v) => handleUpdate(block.id, "title1", v))}
            {renderToggleInput("Image 1", block.image1, block.image1Enabled, (v) => handleUpdate(block.id, "image1", v), (c) => handleUpdate(block.id, "image1Enabled", c), (url) => handleUpdate(block.id, "image1", url))}
            {renderInput("Text 1", block.text1, (v) => handleUpdate(block.id, "text1", v), true)}
            <div className="border-t border-dashed my-4"></div>
            {renderInput("Title 2", block.title2, (v) => handleUpdate(block.id, "title2", v))}
            {renderInput("Text 2", block.text2, (v) => handleUpdate(block.id, "text2", v), true)}
            <div className="border-t border-dashed my-4"></div>
            
            <h4 className="text-sm font-semibold text-gray-500 mb-2">Brands</h4>
            {block.brands.map((brand: any, idx: number) => (
              <div key={idx} className="mt-4 p-2 border border-gray-100 rounded">
                {renderToggleInput(`Brand Logo ${idx + 1}`, brand.logo, brand.logoEnabled, (v) => handleNestedUpdate(block.id, "brands", idx, "logo", v), (c) => handleNestedUpdate(block.id, "brands", idx, "logoEnabled", c), (url) => handleNestedUpdate(block.id, "brands", idx, "logo", url))}
                {renderToggleInput(`Brand Link ${idx + 1}`, brand.link, brand.linkEnabled, (v) => handleNestedUpdate(block.id, "brands", idx, "link", v), (c) => handleNestedUpdate(block.id, "brands", idx, "linkEnabled", c))}
              </div>
            ))}
            <div className="border-t border-dashed my-4"></div>
            {renderToggleInput("Image 3", block.image3, block.image3Enabled, (v) => handleUpdate(block.id, "image3", v), (c) => handleUpdate(block.id, "image3Enabled", c), (url) => handleUpdate(block.id, "image3", url))}
            {renderInput("Text 3", block.text3, (v) => handleUpdate(block.id, "text3", v), true)}
          </>
        );
      case "block5":
        return (
          <>
            {renderInput("Title 1", block.title1, (v) => handleUpdate(block.id, "title1", v))}
            {renderInput("Text 1", block.text1, (v) => handleUpdate(block.id, "text1", v))}
            {renderInput("Phone number", block.phone, (v) => handleUpdate(block.id, "phone", v))}
            
            {block.contacts.map((contact: any, idx: number) => (
              <div key={idx} className="mt-6 border-t pt-4">
                {renderToggleInput(`Image ${idx + 1}`, contact.image, contact.imageEnabled, (v) => handleNestedUpdate(block.id, "contacts", idx, "image", v), (c) => handleNestedUpdate(block.id, "contacts", idx, "imageEnabled", c), (url) => handleNestedUpdate(block.id, "contacts", idx, "image", url))}
                {renderToggleInput(`Title ${idx + 1}`, contact.title, contact.titleEnabled, (v) => handleNestedUpdate(block.id, "contacts", idx, "title", v), (c) => handleNestedUpdate(block.id, "contacts", idx, "titleEnabled", c))}
                {renderToggleInput(`Link ${idx + 1}`, contact.link, contact.linkEnabled, (v) => handleNestedUpdate(block.id, "contacts", idx, "link", v), (c) => handleNestedUpdate(block.id, "contacts", idx, "linkEnabled", c))}
                {renderToggleInput(`Description ${idx + 1}`, contact.description, contact.descriptionEnabled, (v) => handleNestedUpdate(block.id, "contacts", idx, "description", v), (c) => handleNestedUpdate(block.id, "contacts", idx, "descriptionEnabled", c))}
              </div>
            ))}
          </>
        );
      case "bottom":
        return (
          <>
             {renderInput("Title 1", block.title1, (v) => handleUpdate(block.id, "title1", v))}
             {renderInput("Text 1", block.text1, (v) => handleUpdate(block.id, "text1", v))}
             <div className="border-t border-dashed my-4"></div>
             
             {renderToggleInput("Image 1", block.img1, block.img1Enabled, (v) => handleUpdate(block.id, 'img1', v), (c) => handleUpdate(block.id, 'img1Enabled', c), (url) => handleUpdate(block.id, 'img1', url))}
             {renderToggleInput("Title 1", block.link1, block.link1Enabled, (v) => handleUpdate(block.id, 'link1', v), (c) => handleUpdate(block.id, 'link1Enabled', c))}
             
             <div className="h-4"></div>
             {renderToggleInput("Image 2", block.img2, block.img2Enabled, (v) => handleUpdate(block.id, 'img2', v), (c) => handleUpdate(block.id, 'img2Enabled', c), (url) => handleUpdate(block.id, 'img2', url))}
             {renderToggleInput("Title 2", block.link2, block.link2Enabled, (v) => handleUpdate(block.id, 'link2', v), (c) => handleUpdate(block.id, 'link2Enabled', c))}

             <div className="h-4"></div>
             {renderToggleInput("Image 3", block.img3, block.img3Enabled, (v) => handleUpdate(block.id, 'img3', v), (c) => handleUpdate(block.id, 'img3Enabled', c), (url) => handleUpdate(block.id, 'img3', url))}
             {renderToggleInput("Title 3", block.link3, block.link3Enabled, (v) => handleUpdate(block.id, 'link3', v), (c) => handleUpdate(block.id, 'link3Enabled', c))}

             <div className="h-4"></div>
             {renderToggleInput("Image 4", block.img4, block.img4Enabled, (v) => handleUpdate(block.id, 'img4', v), (c) => handleUpdate(block.id, 'img4Enabled', c), (url) => handleUpdate(block.id, 'img4', url))}
             {renderToggleInput("Title 4", block.link4, block.link4Enabled, (v) => handleUpdate(block.id, 'link4', v), (c) => handleUpdate(block.id, 'link4Enabled', c))}

             <div className="h-4"></div>
             {renderToggleInput("Image 5", block.img5, block.img5Enabled, (v) => handleUpdate(block.id, 'img5', v), (c) => handleUpdate(block.id, 'img5Enabled', c), (url) => handleUpdate(block.id, 'img5', url))}
             {renderToggleInput("Title 5", block.link5, block.link5Enabled, (v) => handleUpdate(block.id, 'link5', v), (c) => handleUpdate(block.id, 'link5Enabled', c))}

             <div className="border-t border-dashed my-4"></div>
             {renderToggleInput("QR Code", block.qrCode, block.qrCodeEnabled, (v) => handleUpdate(block.id, 'qrCode', v), (c) => handleUpdate(block.id, 'qrCodeEnabled', c), (url) => handleUpdate(block.id, 'qrCode', url))}
             
             <div className="border-t border-dashed my-4"></div>
             {renderToggleInput("Author's text", block.authorText, block.authorTextEnabled, (v) => handleUpdate(block.id, 'authorText', v), (c) => handleUpdate(block.id, 'authorTextEnabled', c))}
          </>
        )
      default:
        return <div className="p-4 text-gray-500">Content for {block.name}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto z-10 flex flex-col">
        <div className="p-6 flex-1">
          <nav className="space-y-1">
            {blocks.map((block) => (
              <a
                key={block.id}
                href={`#${block.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView('blocks');
                  document.getElementById(block.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg group ${
                  activeView === 'blocks' ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span>{block.id === 'bottom' ? 'BOTTOM SECTION' : block.id.replace('block', 'BLOCK ').toUpperCase()}</span>
              </a>
            ))}
          </nav>
        </div>
        
        {/* Sidebar Footer (Branding) */}
        <div className="p-6 text-center">
          <p className="text-xs text-gray-400 mb-1">Admin panel for</p>
          <h3 className="font-serif text-xl italic text-gray-300">Najmiddin</h3>
          <h3 className="font-serif text-xl italic text-gray-300 -mt-1">Nurmukhamedov</h3>
          <p className="text-xs text-gray-400 mt-1">website</p>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button onClick={saveChanges} className="w-full py-2 text-xs font-medium text-green-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
            {loading ? "Loading..." : "Save changes"}
          </button>
          <button 
            onClick={() => setActiveView('password')}
            className={`w-full py-2 text-xs font-medium rounded transition-colors ${
              activeView === 'password' 
                ? "bg-orange-50 text-orange-600" 
                : "text-orange-400 hover:text-orange-500 hover:bg-orange-50"
            }`}
          >
            Change password
          </button>
          <button className="w-full py-2 text-xs font-medium text-red-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
            Exit
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {loading ? (
             <div className="text-center py-10">Loading content...</div>
          ) : activeView === 'password' ? renderPasswordChange() : blocks.map((block) => (
            <div
              key={block.id}
              id={block.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm scroll-mt-4"
            >
              {/* Block Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {block.id === 'bottom' ? 'Block 6' : block.id.charAt(0).toUpperCase() + block.id.slice(1).replace('block', 'Block ')}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => handleLanguageChange('uz')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        language === 'uz'
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      O'z
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        language === 'en'
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      En
                    </button>
                  </div>
                </div>
              </div>

              {/* Block Content */}
              <div className="p-6 space-y-4">
                {/* Common Fields */}
                {block.id !== "bottom" && (
                  <>
                    {renderInput("Name in the menu", block.name, (v) => handleUpdate(block.id, "name", v))}
                    {renderToggle("Include in menu", block.includeInMenu, (v) => handleUpdate(block.id, "includeInMenu", v))}
                    {renderToggle("Include in bottom", block.includeInBottom, (v) => handleUpdate(block.id, "includeInBottom", v))}
                  </>
                )}
                
                <div className="border-t border-dashed my-4"></div>
                
                {/* Specific Fields */}
                {renderBlockContent(block)}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
