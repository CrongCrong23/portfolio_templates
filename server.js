const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Project Data
const projects = [
    {
        id: 'aperture-analytics',
        title: 'Aperture Analytics',
        category: 'Web Application',
        shortDescription: 'A clean, data-heavy dashboard interface built for a SaaS analytics platform.',
        fullDescription: 'Aperture Analytics is a comprehensive B2B SaaS platform that helps digital marketing teams track their KPIs in real time. The main challenge was to display massive amounts of data without overwhelming the user. We utilized a clean, minimalist design language inspired by modern sleek aesthetics to create a weightless data experience with lots of whitespace, crisp typography, and subtle glassmorphic panels.',
        role: 'Lead Frontend Developer & UI Designer',
        techStack: ['Node.js', 'React', 'D3.js', 'Express', 'Vanilla CSS'],
        thumbnail: '/assets/project1.png',
        heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'aura-finance',
        title: 'Aura Finance App',
        category: 'Mobile Design',
        shortDescription: 'A minimalist personal finance application with a focus on ease of use and clean data presentation.',
        fullDescription: 'Aura Finance takes the stress out of personal budgeting. Working closely with the founders, I designed a mobile app interface that feels welcoming rather than daunting. By employing soft shadows, rounded typography, and a calming white theme, we achieved a user-friendly product that demystifies personal finance for Gen Z users.',
        role: 'UX/UI Designer',
        techStack: ['Figma', 'Protopie', 'React Native'],
        thumbnail: '/assets/project2.png',
        heroImage: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'zenith-workspace',
        title: 'Zenith Workspace',
        category: 'Desktop App',
        shortDescription: 'An AI-powered integrated development environment (IDE) theme and layout system.',
        fullDescription: 'Zenith Workspace is a conceptual agentic IDE inspired by next-generation coding tools. It features a seamless, weightless interface designed to keep developers in the flow state. The UI leverages a deeply optimized dark mode for intense coding sessions, seamlessly transitioning to a crisp, high-contrast light mode depending on the ambient lighting.',
        role: 'Product Designer',
        techStack: ['Electron', 'TypeScript', 'Vanilla JS'],
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/project/:id', (req, res) => {
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
        return res.status(404).render('404');
    }
    res.render('project', { project });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New contact form submission from ${name} (${email}): ${message}`);
    // Simulate processing delay
    setTimeout(() => {
        res.json({ success: true, message: "Thank you! I'll be in touch soon." });
    }, 1000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
