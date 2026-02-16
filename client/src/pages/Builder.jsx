
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Plus,
    Download,
    Trash2,
    Square,
    Minus,
    Smartphone,
    Mail,
    MapPin,
    Globe,
    Linkedin,
    Github,
    Palette,
    Layout,
    Type,
    GripHorizontal,
    Image as ImageIcon,
    Copy,
    Scissors,
    Clipboard,
    UserCircle,
    Hash,
    Briefcase,
    GraduationCap,
    Award,
    Combine as GroupIcon,
    Ungroup as UngroupIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    ArrowUpToLine as AlignTopIcon,
    ArrowDownToLine as AlignBottomIcon,
    Maximize2 as ExplodeIcon
} from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EditableText from '../components/EditableText';
import { templateLayouts } from '../data/templates';



const DraggableLayer = ({ id, x, y, scale = 1, children, onUpdate, onDelete, isSelected, onSelect }) => {
    const dragControls = useDragControls();

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragControls={dragControls}
            dragListener={false}
            initial={{ x, y, scale }}
            animate={{ x, y, scale }}
            onDragEnd={(event, info) => {
                onUpdate(id, { x: x + info.offset.x, y: y + info.offset.y });
            }}
            onMouseDown={(e) => { e.stopPropagation(); onSelect(id, e.shiftKey); }}
            className={`absolute z-20 group select-none ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            style={{ originX: 0, originY: 0 }}
        >
            <div className="relative pointer-events-auto">
                {children}
                <div data-html2canvas-ignore className="absolute -top-10 -left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-1.5 border dark:border-gray-700 z-50">
                    <div
                        onPointerDown={(e) => dragControls.start(e)}
                        className="p-1.5 text-gray-400 cursor-grab active:cursor-grabbing hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                        <GripHorizontal className="w-5 h-5 font-black" />
                    </div>
                    <div className="w-px h-6 bg-gray-100 dark:bg-gray-700 mx-1 self-center" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onUpdate(id, { scale: Math.max(0.5, scale - 0.1) }); }}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                        title="Minimize"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onUpdate(id, { scale: Math.min(3, scale + 0.1) }); }}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                        title="Maximize"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-100 dark:bg-gray-700 mx-1 self-center" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Builder = () => {
    const location = useLocation();

    // Lazy initializers to prevent flash of empty canvas
    const [elements, setElements] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const templateType = params.get('template') || 'modern';
        const layout = templateLayouts[templateType] || templateLayouts.modern;
        return JSON.parse(JSON.stringify(layout.elements));
    });

    const [font, setFont] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const templateType = params.get('template') || 'modern';
        return templateLayouts[templateType]?.font || templateLayouts.modern.font;
    });

    const [activeTheme, setActiveTheme] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const templateType = params.get('template') || 'modern';
        return templateLayouts[templateType]?.theme || templateLayouts.modern.theme;
    });

    const [selectedIds, setSelectedIds] = useState([]);
    const [updatingElementId, setUpdatingElementId] = useState(null);
    const [sidebarTab, setSidebarTab] = useState('design');
    const [contextMenu, setContextMenu] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [collapsedSections, setCollapsedSections] = useState({});
    const [marquee, setMarquee] = useState(null);

    const paperRef = useRef(null);
    const fileInputRef = useRef(null);
    const profileInputRef = useRef(null);

    const toggleSection = (id) => {
        setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSelect = (id, isShift) => {
        const targetEl = elements.find(el => el.id === id);
        if (!targetEl) return;

        let idsToSelect = [id];
        // If it's part of a group, select the whole group
        if (targetEl.groupId) {
            idsToSelect = elements.filter(el => el.groupId === targetEl.groupId).map(el => el.id);
        }

        if (isShift) {
            setSelectedIds(prev => {
                const alreadySelected = idsToSelect.every(i => prev.includes(i));
                if (alreadySelected) {
                    return prev.filter(i => !idsToSelect.includes(i));
                } else {
                    return [...new Set([...prev, ...idsToSelect])];
                }
            });
        } else {
            setSelectedIds(idsToSelect);
        }
    };

    const handleCanvasMouseDown = (e) => {
        if (e.button !== 0) return; // Only left click
        const rect = paperRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMarquee({ startX: x, startY: y, curX: x, curY: y });
        setSelectedIds([]);
    };

    const handleCanvasMouseMove = (e) => {
        if (!marquee) return;
        const rect = paperRef.current?.getBoundingClientRect();
        if (!rect) return;

        setMarquee(prev => ({ ...prev, curX: e.clientX - rect.left, curY: e.clientY - rect.top }));
    };

    const handleCanvasMouseUp = () => {
        if (!marquee) return;

        const left = Math.min(marquee.startX, marquee.curX);
        const top = Math.min(marquee.startY, marquee.curY);
        const right = Math.max(marquee.startX, marquee.curX);
        const bottom = Math.max(marquee.startY, marquee.curY);

        const newlySelected = elements.filter(el =>
            el.x >= left && el.x <= right && el.y >= top && el.y <= bottom
        ).map(el => el.id);

        if (newlySelected.length > 0) setSelectedIds(newlySelected);
        setMarquee(null);
    };

    const explodeComponent = (id) => {
        const el = elements.find(e => e.id === id);
        if (!el) return;

        const newElements = [];
        const baseId = Date.now();

        if (el.type === 'contacts') {
            const types = [
                { id: 'phone', icon: 'phone', content: el.fields.phone },
                { id: 'mail', icon: 'mail', content: el.fields.email },
                { id: 'map', icon: 'map', content: el.fields.location }
            ];

            types.forEach((t, i) => {
                newElements.push(
                    { id: `${baseId}-icon-${i}`, type: 'icon', iconId: t.icon, x: el.x + (i * 180), y: el.y },
                    { id: `${baseId}-text-${i}`, type: 'text', content: t.content, x: el.x + (i * 180) + 40, y: el.y, style: 'text-xs font-bold text-gray-500' }
                );
            });
        } else if (el.type === 'section') {
            newElements.push(
                { id: `${baseId}-title`, type: 'text', content: el.title, x: el.x, y: el.y, style: 'text-xl font-black uppercase tracking-widest' },
                { id: `${baseId}-content`, type: 'text', content: el.content || 'Content', x: el.x, y: el.y + 40, style: 'text-gray-600 leading-relaxed' }
            );
        }

        if (newElements.length > 0) {
            setElements(prev => [...prev.filter(e => e.id !== id), ...newElements]);
            setSelectedIds(newElements.map(e => e.id));
        }
        setContextMenu(null);
    };

    const alignElements = (axis) => {
        if (selectedIds.length < 2) return;
        const selectedElements = elements.filter(el => selectedIds.includes(el.id));

        let updateValue;
        setElements(prev => prev.map(el => {
            if (!selectedIds.includes(el.id)) return el;

            switch (axis) {
                case 'left':
                    updateValue = Math.min(...selectedElements.map(e => e.x));
                    return { ...el, x: updateValue };
                case 'right':
                    updateValue = Math.max(...selectedElements.map(e => e.x));
                    return { ...el, x: updateValue };
                case 'top':
                    updateValue = Math.min(...selectedElements.map(e => e.y));
                    return { ...el, y: updateValue };
                case 'bottom':
                    updateValue = Math.max(...selectedElements.map(e => e.y));
                    return { ...el, y: updateValue };
                case 'center-h':
                    updateValue = selectedElements.reduce((s, e) => s + e.x, 0) / selectedElements.length;
                    return { ...el, x: updateValue };
                case 'center-v':
                    updateValue = selectedElements.reduce((s, e) => s + e.y, 0) / selectedElements.length;
                    return { ...el, y: updateValue };
                default: return el;
            }
        }));
        setContextMenu(null);
    };

    const updateElement = (id, updates) => {
        setElements(prev => {
            const targetEl = prev.find(el => el.id === id);
            if (!targetEl) return prev;

            const isPositionUpdate = 'x' in updates || 'y' in updates;
            const deltaX = isPositionUpdate ? (updates.x - targetEl.x) : 0;
            const deltaY = isPositionUpdate ? (updates.y - targetEl.y) : 0;

            return prev.map(el => {
                // If the element itself is updated
                if (el.id === id) return { ...el, ...updates };

                // If moving a group member, move everyone else in the same group
                if (isPositionUpdate && targetEl.groupId && el.groupId === targetEl.groupId) {
                    return { ...el, x: el.x + deltaX, y: el.y + deltaY };
                }
                return el;
            });
        });
    };

    const groupSelected = () => {
        if (selectedIds.length < 2) return;
        const groupId = `group-${Date.now()}`;
        setElements(prev => prev.map(el =>
            selectedIds.includes(el.id) ? { ...el, groupId } : el
        ));
        setContextMenu(null);
    };

    const ungroupSelected = () => {
        const groupsToUngroup = new Set(
            elements.filter(el => selectedIds.includes(el.id) && el.groupId).map(el => el.groupId)
        );
        setElements(prev => prev.map(el =>
            groupsToUngroup.has(el.groupId) ? { ...el, groupId: null } : el
        ));
        setContextMenu(null);
    };



    const addTextElement = () => {
        const id = Date.now().toString();
        setElements(prev => [...prev, { id, type: 'text', content: 'New Text', x: 100, y: 100, style: 'text-lg font-medium' }]);
    };

    const addSectionElement = (styleType) => {
        const id = Date.now().toString();
        const content = styleType === 'list'
            ? { items: [{ company: 'Org', role: 'Role', period: '2024', desc: 'Desc' }] }
            : { content: 'Enter text here...' };

        setElements(prev => [...prev, {
            id,
            type: 'section',
            title: 'NEW SECTION',
            ...content,
            x: 100, y: 150
        }]);
    };

    const deleteElement = (id) => {
        setElements(prev => prev.filter(el => el.id !== id));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (updatingElementId) {
                    updateElement(updatingElementId, { src: event.target.result });
                    setUpdatingElementId(null);
                } else {
                    const id = Date.now();
                    setElements(prev => [...prev, {
                        id,
                        type: 'image',
                        src: event.target.result,
                        x: 150,
                        y: 150,
                        isProfile: false
                    }]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const addProfilePlaceholder = () => {
        const id = Date.now();
        setElements(prev => [...prev, {
            id,
            type: 'image',
            src: null,
            x: 600,
            y: 50,
            isProfile: true
        }]);
    };

    const triggerUpload = (id, isProfile) => {
        setUpdatingElementId(id);
        if (isProfile) profileInputRef.current.click();
        else fileInputRef.current.click();
    };


    const handleDownloadPDF = async () => {
        if (!paperRef.current) return;
        setIsDownloading(true);
        setSelectedIds([]); // Clear selection for export

        try {
            const canvas = await html2canvas(paperRef.current, {
                scale: 3,
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Resume_Export.pdf`);
        } catch (error) {
            console.error("PDF Export failed:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.pageX, y: e.pageY });
    };

    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const templateType = params.get('template') || 'modern';
        const layout = templateLayouts[templateType] || templateLayouts.modern;

        setElements(JSON.parse(JSON.stringify(layout.elements)));
        setFont(layout.font);
        setActiveTheme(layout.theme);
    }, [location.search]);

    const fonts = [
        { name: 'Sans Serif (Inter)', class: 'font-inter' },
        { name: 'Serif (Playfair)', class: 'font-playfair' },
        { name: 'Modern (Montserrat)', class: 'font-montserrat' },
        { name: 'Technical (Mono)', class: 'font-mono' }
    ];

    const getThemeColor = (level = 600) => {
        const colors = {
            blue: { 50: '#eff6ff', 100: '#dbeafe', 400: '#60a5fa', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
            slate: { 50: '#f8fafc', 100: '#f1f5f9', 400: '#94a3b8', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
            emerald: { 50: '#ecfdf5', 100: '#d1fae5', 400: '#34d399', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b' },
            rose: { 50: '#fff1f2', 100: '#ffe4e6', 400: '#fb7185', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337' }
        };
        return colors[activeTheme][level] || colors[activeTheme][600];
    };



    return (
        <div className="flex bg-gray-100 dark:bg-gray-950 h-[calc(100vh-64px)] w-full overflow-hidden transition-colors duration-500 font-inter">
            {/* Left Tools Sidebar */}
            <div className="w-[340px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-2xl z-30 transition-all duration-300">
                <div className="flex border-b border-gray-100 dark:border-gray-800 p-1">
                    {['design', 'elements', 'sections'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSidebarTab(tab)}
                            className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-lg flex flex-col items-center gap-1 ${sidebarTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none translate-y-[-2px]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            {tab === 'design' && <Palette className="w-4 h-4" />}
                            {tab === 'elements' && <Plus className="w-4 h-4" />}
                            {tab === 'sections' && <Layout className="w-4 h-4" />}
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-8">
                    {sidebarTab === 'design' && (
                        <>
                            <div className="space-y-4">
                                <h4
                                    onClick={() => toggleSection('branding')}
                                    className="flex items-center justify-between gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer hover:text-blue-600 transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <Palette className="w-3 h-3" /> Branding Colors
                                    </div>
                                    {collapsedSections['branding'] ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                </h4>
                                {!collapsedSections['branding'] && (
                                    <div className="grid grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-1 duration-300">
                                        {['blue', 'slate', 'emerald', 'rose'].map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setActiveTheme(color)}
                                                className={`w-full aspect-square rounded-2xl border-4 transition-all transform hover:scale-110 shadow-sm ${activeTheme === color ? 'border-gray-900 dark:border-white ring-4 ring-blue-100 dark:ring-blue-900/30' : 'border-transparent'}`}
                                                style={{ backgroundColor: color === 'slate' ? '#334155' : color === 'emerald' ? '#059669' : color === 'rose' ? '#e11d48' : '#2563eb' }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h4
                                    onClick={() => toggleSection('typography')}
                                    className="flex items-center justify-between gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer hover:text-blue-600 transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <Type className="w-3 h-3" /> Typography
                                    </div>
                                    {collapsedSections['typography'] ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                </h4>
                                {!collapsedSections['typography'] && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                                        {fonts.map(fontItem => (
                                            <button
                                                key={fontItem.class}
                                                onClick={() => setFont(fontItem.class)}
                                                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all ${font === fontItem.class ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400' : 'border-gray-50 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-900 text-gray-500'}`}
                                            >
                                                <span className={`${fontItem.class} text-lg font-bold`}>{fontItem.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {sidebarTab === 'elements' && (
                        <>
                            <div className="space-y-5">
                                <h4
                                    onClick={() => toggleSection('upload')}
                                    className="flex items-center justify-between gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer hover:text-blue-600 transition"
                                >
                                    <span>Upload Media</span>
                                    {collapsedSections['upload'] ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                </h4>
                                {!collapsedSections['upload'] && (
                                    <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                        <button
                                            onClick={addProfilePlaceholder}
                                            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-700 bg-blue-50/30 dark:bg-blue-900/10 group transition-all"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition">
                                                <UserCircle className="w-8 h-8" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-black dark:text-gray-200 uppercase tracking-tight">Add Profile Picture</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Adds draggable frame</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-indigo-500 group transition-all"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition">
                                                <ImageIcon className="w-8 h-8" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-black dark:text-gray-200 uppercase tracking-tight">Add Brand Logo</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Square/Rect logo</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={addTextElement}
                                            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-emerald-500 group transition-all"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition">
                                                <Type className="w-8 h-8" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-black dark:text-gray-200 uppercase tracking-tight">Add Single Text</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">For custom labels/info</p>
                                            </div>
                                        </button>
                                        <input type="file" ref={profileInputRef} onChange={(e) => handleImageUpload(e)} className="hidden" accept="image/*" />
                                        <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e)} className="hidden" accept="image/*" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-5">
                                <h4
                                    onClick={() => toggleSection('icons')}
                                    className="flex items-center justify-between gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer hover:text-blue-600 transition"
                                >
                                    <span>Quick Icons</span>
                                    {collapsedSections['icons'] ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                </h4>
                                {!collapsedSections['icons'] && (
                                    <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                        {[
                                            { id: 'linkedin', icon: Linkedin },
                                            { id: 'github', icon: Github },
                                            { id: 'globe', icon: Globe },
                                            { id: 'phone', icon: Smartphone },
                                            { id: 'mail', icon: Mail },
                                            { id: 'map', icon: MapPin }
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setElements(prev => [...prev, { id: Date.now().toString(), type: 'icon', iconId: item.id, x: 100, y: 100 }])}
                                                className="h-20 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition shadow-sm"
                                            >
                                                <item.icon className="w-6 h-6 mb-1" />
                                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Add</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {sidebarTab === 'sections' && (
                        <div className="space-y-6">
                            <h4
                                onClick={() => toggleSection('blocks')}
                                className="flex items-center justify-between gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] cursor-pointer hover:text-blue-600 transition"
                            >
                                <span>Add Content Blocks</span>
                                {collapsedSections['blocks'] ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                            </h4>
                            {!collapsedSections['blocks'] && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                    <button onClick={() => addSectionElement('text')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-blue-600 hover:text-white transition group shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <Hash className="w-5 h-5 opacity-50" />
                                            <span className="text-sm font-bold uppercase tracking-wide">Text Block</span>
                                        </div>
                                        <Plus className="w-4 h-4 group-hover:rotate-90 transition" />
                                    </button>
                                    <button onClick={() => addSectionElement('list')} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-blue-600 hover:text-white transition group shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="w-5 h-5 opacity-50" />
                                            <span className="text-sm font-bold uppercase tracking-wide">Work/List Block</span>
                                        </div>
                                        <Plus className="w-4 h-4 group-hover:rotate-90 transition" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none'}`}
                    >
                        {isDownloading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Download className="w-5 h-5" />}
                        <span>{isDownloading ? 'Exporting...' : 'Export PDF'}</span>
                    </button>
                </div>
            </div>

            {/* Main Canvas Area */}
            <div
                className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-gray-100 dark:bg-gray-950 flex justify-center items-start"
                onContextMenu={handleContextMenu}
            >
                <div
                    ref={paperRef}
                    className={`relative w-[816px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] min-h-[1056px] transition-all duration-300 ${font}`}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onClick={() => !marquee && setSelectedIds([])}
                >
                    {marquee && (
                        <div
                            className="absolute z-50 bg-blue-500/10 border border-blue-500 pointer-events-none"
                            style={{
                                left: Math.min(marquee.startX, marquee.curX),
                                top: Math.min(marquee.startY, marquee.curY),
                                width: Math.abs(marquee.curX - marquee.startX),
                                height: Math.abs(marquee.curY - marquee.startY)
                            }}
                        />
                    )}


                    {/* Canvas Elements */}
                    {elements.map((el) => (
                        <DraggableLayer
                            key={el.id}
                            id={el.id} x={el.x} y={el.y} scale={el.scale || 1}
                            onUpdate={updateElement}
                            onDelete={deleteElement}
                            isSelected={selectedIds.includes(el.id)}
                            onSelect={(id, shift) => handleSelect(id, shift)}
                        >
                            {el.type === 'text' && (
                                <EditableText
                                    value={el.content}
                                    onChange={(v) => updateElement(el.id, { content: v })}
                                    className={el.style}
                                    style={el.id === 'name' ? { color: getThemeColor(900) } : {}}
                                />
                            )}

                            {el.type === 'contacts' && (
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-gray-500">
                                    <span className="flex items-center gap-2"><Smartphone className="w-3 h-3 opacity-40" /> <EditableText value={el.fields.phone} onChange={(v) => updateElement(el.id, { fields: { ...el.fields, phone: v } })} /></span>
                                    <span className="flex items-center gap-2"><Mail className="w-3 h-3 opacity-40" /> <EditableText value={el.fields.email} onChange={(v) => updateElement(el.id, { fields: { ...el.fields, email: v } })} /></span>
                                    <span className="flex items-center gap-2"><MapPin className="w-3 h-3 opacity-40" /> <EditableText value={el.fields.location} onChange={(v) => updateElement(el.id, { fields: { ...el.fields, location: v } })} /></span>
                                </div>
                            )}

                            {el.type === 'section' && (
                                <div className="w-[600px] group/section">
                                    <div className="flex items-center gap-4 mb-4">
                                        <EditableText
                                            value={el.title}
                                            onChange={(v) => updateElement(el.id, { title: v })}
                                            className="text-xl font-black tracking-widest uppercase"
                                            style={{ color: getThemeColor() }}
                                        />
                                        <div className="flex-1 h-px bg-gray-100" />
                                    </div>
                                    <div className="pl-6 border-l-2 border-gray-100 group-hover/section:border-blue-100 transition-all">
                                        {el.content && <EditableText value={el.content} onChange={(v) => updateElement(el.id, { content: v })} className="text-gray-600 leading-relaxed" />}
                                        {el.items && (
                                            <div className="space-y-6">
                                                {el.items.map((item, i) => (
                                                    <div key={i}>
                                                        <div className="flex justify-between items-baseline mb-1">
                                                            <EditableText value={item.company || item.school} onChange={(v) => {
                                                                const ni = el.items.map((it, idx) => idx === i ? { ...it, company: v } : it);
                                                                updateElement(el.id, { items: ni });
                                                            }} className="font-bold text-gray-900 text-lg" />
                                                            <EditableText value={item.period} onChange={(v) => {
                                                                const ni = el.items.map((it, idx) => idx === i ? { ...it, period: v } : it);
                                                                updateElement(el.id, { items: ni });
                                                            }} className="text-[10px] text-gray-400 font-bold uppercase tracking-widest" />
                                                        </div>
                                                        <div className="mb-2 font-bold text-sm italic" style={{ color: getThemeColor() }}>
                                                            <EditableText value={item.role || item.degree} onChange={(v) => {
                                                                const ni = el.items.map((it, idx) => idx === i ? { ...it, role: v } : it);
                                                                updateElement(el.id, { items: ni });
                                                            }} />
                                                        </div>
                                                        <EditableText value={item.desc} onChange={(v) => {
                                                            const ni = el.items.map((it, idx) => idx === i ? { ...it, desc: v } : it);
                                                            updateElement(el.id, { items: ni });
                                                        }} className="text-gray-500 text-sm leading-relaxed" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {el.type === 'image' && (
                                <div className={`relative ${el.isProfile ? 'w-36 h-36' : 'w-48 h-48'}`}>
                                    {el.src ? (
                                        <img src={el.src} className={`w-full h-full object-cover shadow-xl border-4 border-white ${el.isProfile ? 'rounded-full' : 'rounded-2xl'}`} />
                                    ) : (
                                        <div onClick={() => triggerUpload(el.id, el.isProfile)} className="w-full h-full bg-blue-50 border-4 border-dashed border-blue-200 rounded-full flex flex-col items-center justify-center text-blue-400">
                                            <UserCircle className="w-10 h-10" />
                                            <span className="text-[8px] font-black uppercase">Upload</span>
                                        </div>
                                    )}
                                    {el.src && (
                                        <button onClick={() => triggerUpload(el.id, el.isProfile)} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
                                            <ImageIcon className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {el.type === 'icon' && (
                                <div style={{ color: getThemeColor() }}>
                                    {(() => {
                                        const iconMap = {
                                            linkedin: Linkedin,
                                            github: Github,
                                            globe: Globe,
                                            phone: Smartphone,
                                            mail: Mail,
                                            map: MapPin
                                        };
                                        const IconComponent = iconMap[el.iconId] || Linkedin;
                                        return <IconComponent className="w-10 h-10" />;
                                    })()}
                                </div>
                            )}
                        </DraggableLayer>
                    ))}

                    <footer className="absolute bottom-10 left-0 right-0 pt-10 border-t border-gray-50 text-center pointer-events-none">
                        <p className="text-[10px] text-gray-300 uppercase tracking-[0.8em] font-black">Professional Identity Document</p>
                    </footer>
                </div>
            </div>

            {/* Context Menu Tooltip */}
            <AnimatePresence>
                {contextMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed z-50 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700 p-2 w-56 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95"
                        style={{ top: contextMenu.y, left: contextMenu.x }}
                    >
                        <div className="px-3 py-1 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 border-b dark:border-gray-700">Quick Select</div>
                        <button
                            onClick={() => { setSelectedIds(elements.filter(el => el.type === 'icon').map(el => el.id)); setContextMenu(null); }}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white rounded-xl transition group"
                        >
                            <div className="flex items-center gap-3"><ExplodeIcon className="w-4 h-4 opacity-50" /> Symbols (Icons)</div>
                        </button>
                        <button
                            onClick={() => { setSelectedIds(elements.filter(el => el.type === 'text').map(el => el.id)); setContextMenu(null); }}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white rounded-xl transition group"
                        >
                            <div className="flex items-center gap-3"><Type className="w-4 h-4 opacity-50" /> Text Labels</div>
                        </button>

                        <div className="w-px h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2" />
                        <div className="px-3 py-1 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 border-b dark:border-gray-700">Canvas Tools</div>

                        {selectedIds.length === 1 && ['contacts', 'section'].includes(elements.find(e => e.id === selectedIds[0])?.type) && (
                            <button
                                onClick={() => explodeComponent(selectedIds[0])}
                                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-purple-600 dark:text-purple-400 hover:bg-blue-600 hover:text-white rounded-xl transition group"
                            >
                                <div className="flex items-center gap-3"><ExplodeIcon className="w-4 h-4" /> Explode to Layers</div>
                            </button>
                        )}

                        <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white rounded-xl transition group">
                            <div className="flex items-center gap-3"><Copy className="w-4 h-4 opacity-50 group-hover:opacity-100" /> Copy Text</div>
                            <span className="text-[10px] opacity-40 tracking-tighter">Ctrl+C</span>
                        </button>
                        <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white rounded-xl transition group">
                            <div className="flex items-center gap-3"><Scissors className="w-4 h-4 opacity-50 group-hover:opacity-100" /> Cut Layer</div>
                            <span className="text-[10px] opacity-40 tracking-tighter">Ctrl+X</span>
                        </button>
                        <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white rounded-xl transition group">
                            <div className="flex items-center gap-3"><Clipboard className="w-4 h-4 opacity-50 group-hover:opacity-100" /> Paste</div>
                            <span className="text-[10px] opacity-40 tracking-tighter">Ctrl+V</span>
                        </button>

                        {selectedIds.length > 1 && (
                            <>
                                <div className="px-3 py-1 text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 border-t dark:border-gray-700">Align Elements</div>
                                <div className="grid grid-cols-3 gap-1 p-2">
                                    <button onClick={() => alignElements('left')} className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition border dark:border-gray-700 flex justify-center" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                                    <button onClick={() => alignElements('center-h')} className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition border dark:border-gray-700 flex justify-center" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                                    <button onClick={() => alignElements('right')} className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition border dark:border-gray-700 flex justify-center" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                                    <button onClick={() => alignElements('top')} className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition border dark:border-gray-700 flex justify-center" title="Align Top"><AlignTopIcon className="w-4 h-4" /></button>
                                    <button onClick={() => alignElements('center-v')} className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition border dark:border-gray-700 flex justify-center" title="Align Middle"><AlignCenter className="w-4 h-4 rotate-90" /></button>
                                    <button onClick={() => alignElements('bottom')} className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition border dark:border-gray-700 flex justify-center" title="Align Bottom"><AlignBottomIcon className="w-4 h-4" /></button>
                                </div>
                            </>
                        )}

                        <div className="w-px h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2" />

                        <button
                            onClick={groupSelected}
                            disabled={selectedIds.length < 2}
                            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl transition group ${selectedIds.length < 2 ? 'opacity-30 grayscale cursor-not-allowed text-gray-400' : 'text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white'}`}
                        >
                            <div className="flex items-center gap-3">
                                <GroupIcon className="w-4 h-4" />
                                <span>Group Elements</span>
                            </div>
                            {selectedIds.length < 2 && <span className="text-[8px] uppercase opacity-60 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">Select 2+</span>}
                        </button>

                        {elements.some(el => selectedIds.includes(el.id) && el.groupId) && (
                            <button
                                onClick={ungroupSelected}
                                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-orange-600 dark:text-orange-400 hover:bg-blue-600 hover:text-white rounded-xl transition group"
                            >
                                <div className="flex items-center gap-3"><UngroupIcon className="w-4 h-4" /> Ungroup Elements</div>
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Builder;
