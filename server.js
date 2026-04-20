const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Data
const templates = [
    {
        id: 'the-minimalist-dev',
        title: 'The Minimalist Dev',
        category: 'Developer Template',
        shortDescription: 'A clean, data-heavy dashboard interface repurposed for a developer portfolio.',
        fullDescription: 'The Minimalist Dev is a comprehensive template designed for software engineers and developers who want to showcase their technical prowess without overwhelming the user with flashy design. We utilized a clean, minimalist design language inspired by modern sleek aesthetics to create a weightless data experience with lots of whitespace, crisp typography, and subtle glassmorphic panels. Perfect for displaying complex case studies and GitHub metrics.',
        idealFor: 'Software Engineers & Backend Developers',
        features: ['Dark Mode Ready', 'Project Filtering', 'GitHub API Integration', 'Responsive', 'Vanilla CSS'],
        price: '$49',
        thumbnail: '/assets/project1.png',
        heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'creative-studio-pro',
        title: 'Creative Studio Pro',
        category: 'Designer Template',
        shortDescription: 'A sleek, visual-first template designed for UI/UX designers and agencies.',
        fullDescription: 'Creative Studio Pro takes the stress out of building a design portfolio. It features massive, high-quality image placeholders and smooth, buttery scroll animations. By employing soft shadows, rounded typography, and a calming white theme, we achieved a user-friendly product that perfectly highlights your creative case studies without distracting from the work itself.',
        idealFor: 'UI/UX Designers & Creative Agencies',
        features: ['Figma Source Included', 'Smooth Scrolling', 'Lightbox Gallery', 'SEO Optimized'],
        price: '$59',
        thumbnail: '/assets/project2.png',
        heroImage: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'neo-brutalism-showcase',
        title: 'Neo-Brutalism Showcase',
        category: 'Agency Template',
        shortDescription: 'An edgy, bold template perfect for forward-thinking creative freelancers.',
        fullDescription: 'Stand out from the crowd with the Neo-Brutalism Showcase. This template is inspired by the bold, unapologetic design trend sweeping the web. It features a seamless, weightless interface designed to keep users engaged. The UI leverages a deeply optimized dark mode for intense visual impact, making your portfolio unforgettable.',
        idealFor: 'Creative Directors & Marketing Agencies',
        features: ['Bold Typography', 'Micro-interactions', 'Dark Mode Only', 'CMS Ready'],
        price: '$79',
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
    res.render('index', { templates });
});

app.get('/template/:id', (req, res) => {
    const template = templates.find(t => t.id === req.params.id);
    if (!template) {
        return res.status(404).render('404');
    }
    res.render('template', { template });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New template inquiry from ${name} (${email}): ${message}`);
    // Simulate processing delay
    setTimeout(() => {
        res.json({ success: true, message: "Thank you! I'll be in touch soon with your template access." });
    }, 1000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
