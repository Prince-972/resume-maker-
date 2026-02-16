
export const templateLayouts = {
    modern: {
        elements: [
            { id: 'name', type: 'text', content: 'YOUR NAME', x: 200, y: 50, style: 'text-6xl font-black tracking-tighter' },
            { id: 'title', type: 'text', content: 'Professional Title', x: 280, y: 130, style: 'text-xl text-gray-400 font-bold uppercase tracking-[0.3em]' },
            { id: 'contacts', type: 'contacts', x: 200, y: 180, fields: { phone: '+1 234 567 890', email: 'email@example.com', location: 'City, Country' } },
            {
                id: 'summary',
                type: 'section',
                title: 'PROFESSIONAL SUMMARY',
                content: 'Highly motivated and results-oriented professional with a strong background in...',
                x: 60, y: 300
            },
            {
                id: 'exp',
                type: 'section',
                title: 'EXPERIENCE',
                x: 60, y: 450,
                items: [
                    { company: 'Company Name', role: 'Job Role', period: '2020 - Present', desc: 'Detailed description of achievements.' }
                ]
            }
        ],
        theme: 'blue',
        font: 'font-inter'
    },
    executive: {
        elements: [
            { id: 'name', type: 'text', content: 'EXECUTIVE NAME', x: 60, y: 40, style: 'text-5xl font-black tracking-tight' },
            { id: 'title', type: 'text', content: 'Senior Vice President', x: 60, y: 100, style: 'text-lg text-gray-500 font-bold uppercase' },
            { id: 'contacts', type: 'contacts', x: 450, y: 45, fields: { phone: '+1 987 654 321', email: 'exec@company.com', location: 'New York, NY' } },
            {
                id: 'divider',
                type: 'text',
                content: '__________________________________________________________________________________________',
                x: 60, y: 130,
                style: 'text-gray-200 font-light'
            },
            {
                id: 'summary',
                type: 'section',
                title: 'EXECUTIVE PROFILE',
                content: 'Dynamic leader with 15+ years of experience in driving global strategy...',
                x: 60, y: 180
            },
            {
                id: 'exp',
                type: 'section',
                title: 'PROFESSIONAL EXPERIENCE',
                x: 60, y: 350,
                items: [
                    { company: 'Global Corp', role: 'Executive Director', period: '2015 - 2024', desc: 'Led a team of 500+ across 3 continents.' }
                ]
            }
        ],
        theme: 'slate',
        font: 'font-playfair'
    },
    creative: {
        elements: [
            { id: 'sidebar', type: 'text', content: '   ', x: 0, y: 0, style: 'w-64 h-[1056px] bg-gray-900 absolute -z-10' },
            { id: 'name', type: 'text', content: 'CREATIVE SOUL', x: 300, y: 60, style: 'text-7xl font-black text-blue-600' },
            { id: 'title', type: 'text', content: 'UI/UX Designer & Artist', x: 300, y: 140, style: 'text-2xl text-gray-400 font-medium italic' },
            { id: 'contacts', type: 'contacts', x: 20, y: 300, fields: { phone: '+44 20 7946 0958', email: 'hello@creative.me', location: 'London, UK' } },
            {
                id: 'summary',
                type: 'section',
                title: 'STORY',
                content: 'I blend art with technology to create meaningful digital experiences...',
                x: 300, y: 220
            },
            {
                id: 'exp',
                type: 'section',
                title: 'JOURNEY',
                x: 300, y: 400,
                items: [
                    { company: 'Design Studio', role: 'Lead Creative', period: '2021', desc: 'Reimagined brand identities for startups.' }
                ]
            }
        ],
        theme: 'rose',
        font: 'font-montserrat'
    },
    student: {
        elements: [
            { id: 'border', type: 'text', content: ' ', x: 40, y: 40, style: 'w-2 h-24 bg-indigo-500 rounded-full' },
            { id: 'name', type: 'text', content: 'GRADUATE NAME', x: 65, y: 40, style: 'text-5xl font-black' },
            { id: 'title', type: 'text', content: 'Computer Science Student', x: 65, y: 95, style: 'text-lg text-indigo-400 font-bold' },
            { id: 'contacts', type: 'contacts', x: 65, y: 140, fields: { phone: '0123 456 789', email: 'student@univ.edu', location: 'Campus, City' } },
            {
                id: 'edu',
                type: 'section',
                title: 'EDUCATION',
                content: 'Bachelor of Science in Computer Science, GPA: 3.9/4.0',
                x: 60, y: 200
            },
            {
                id: 'projects',
                type: 'section',
                title: 'KEY PROJECTS',
                x: 60, y: 350,
                items: [
                    { company: 'University Project', role: 'Frontend Lead', period: 'Spring 2023', desc: 'Built a full-stack e-commerce app using React and Node.js.' }
                ]
            }
        ],
        theme: 'emerald',
        font: 'font-inter'
    },
    tech: {
        elements: [
            { id: 'dot', type: 'text', content: '•', x: 40, y: 45, style: 'text-green-500 text-4xl' },
            { id: 'name', type: 'text', content: 'SYSTEM ENGINEER', x: 75, y: 40, style: 'text-5xl font-mono font-bold' },
            { id: 'title', type: 'text', content: 'Full Stack / DevOps Engineer', x: 75, y: 100, style: 'text-xl font-mono text-gray-400' },
            { id: 'contacts', type: 'contacts', x: 75, y: 150, fields: { phone: 'localhost:8080', email: 'dev@null.com', location: '127.0.0.1' } },
            {
                id: 'stack',
                type: 'section',
                title: '> TECH STACK',
                content: 'React, Node.js, AWS, Kubernetes, Terraform, Go, Python',
                x: 60, y: 220
            },
            {
                id: 'exp',
                type: 'section',
                title: '> EXPERIENCE_LOG',
                x: 60, y: 380,
                items: [
                    { company: 'Tech Corp', role: 'SRE', period: '2022-2024', desc: 'Maintained 99.99% uptime for core services.' }
                ]
            }
        ],
        theme: 'blue',
        font: 'font-mono'
    },
    freelance: {
        elements: [
            { id: 'grad', type: 'text', content: '   ', x: 0, y: 0, style: 'w-[816px] h-32 bg-gradient-to-r from-purple-600 to-pink-600 absolute -z-10' },
            { id: 'name', type: 'text', content: 'FREELANCE PRO', x: 60, y: 30, style: 'text-5xl font-black text-white' },
            { id: 'title', type: 'text', content: 'Independent Consultant', x: 60, y: 90, style: 'text-xl text-white/80 font-medium' },
            { id: 'contacts', type: 'contacts', x: 60, y: 150, fields: { phone: '+1 555 0123', email: 'pro@freelance.com', location: 'Remote / Global' } },
            {
                id: 'services',
                type: 'section',
                title: 'SOLUTIONS OFFERED',
                content: 'Product Strategy, Market Analysis, and Growth Hacking...',
                x: 60, y: 250
            },
            {
                id: 'portfolio',
                type: 'section',
                title: 'FEATURED CLIENTS',
                x: 60, y: 420,
                items: [
                    { company: 'Startup X', role: 'Consultant', period: 'Ongoing', desc: 'Increased revenue by 40% in 6 months.' }
                ]
            }
        ],
        theme: 'rose',
        font: 'font-montserrat'
    }
};
