require('dotenv').config();
const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Data
const templates = [
    {
        id: 'creative-studio-pro',
        title: 'Windows 98 Portfolio',
        category: 'Nostalgic Portfolio',
        shortDescription: 'A playful Windows 98–inspired portfolio that transforms your work into an interactive desktop experience.',
        fullDescription: 'Retro Desktop is a nostalgic portfolio template that reimagines the charm of classic Windows 98 interfaces for the modern web. Designed with pixel-perfect UI elements, draggable windows, and retro system aesthetics, it turns browsing into an interactive experience. From faux file explorers to clickable icons and layered pop-up windows, every detail is crafted to evoke early computing while still delivering smooth performance and usability. It’s a unique way to showcase projects, artwork, or case studies through a fun, memorable interface that stands out from conventional portfolios.',
        idealFor: 'Creative Developers, UI Designers & Digital Artists',
        websiteLink: 'https://yujin-portfolio-zeta.vercel.app/',
        price: '$50',
        thumbnail: '/assets/windows982.png',
        heroImage: '/assets/windows982.png',
    },
    {
        id: 'archi-showcase',
        title: 'Architectural Portfolio',
        category: 'Architecture Template',
        shortDescription: 'A structured, image-forward portfolio designed to present architectural projects with clarity and precision.',
        fullDescription: 'Architectural Portfolio is a refined template tailored for architects and designers who need to present their work with both visual impact and technical clarity. Built around grid-based layouts and strong typographic hierarchy, it allows projects to be showcased through high-resolution imagery, detailed plans, and descriptive case studies. The design emphasizes balance, proportion, and whitespace—mirroring architectural principles—while maintaining smooth navigation for an effortless viewing experience. Ideal for displaying conceptual designs, built works, and professional documentation in a polished, modern format.',
        idealFor: 'Architects, Interior Designers & Urban Planners',
        websiteLink: 'https://archi-portfolio-omega.vercel.app/',
        price: '$50',
        thumbnail: '/assets/archi.png',
        heroImage: '/assets/archi3.png',
    },
    {
        id: 'the-minimalist-dev',
        title: 'Art Showcase',
        category: 'Artist Template',
        shortDescription: 'A visually immersive portfolio template designed to highlight artwork with elegance and clarity.',
        fullDescription: 'Art Showcase is a thoughtfully crafted portfolio template built for artists who want their work to take center stage. Featuring a clean, gallery-inspired layout, it emphasizes high-quality visuals, balanced spacing, and refined typography to create a seamless viewing experience. Subtle transitions and intuitive navigation allow visitors to explore collections effortlessly, making it ideal for presenting illustrations, paintings, digital art, and mixed media projects in a professional and engaging way.',
        idealFor: 'Visual Artists, Illustrators & Digital Creators',
        websiteLink: 'https://project-artwork-psi.vercel.app/',
        price: '$50',
        thumbnail: '/assets/artwork1.png',
        heroImage: '/assets/artwork1.png',
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

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New template inquiry from ${name} (${email}): ${message}`);

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'eugenelopezmontesor@gmail.com',
            replyTo: email,
            subject: `New Portfolio Inquiry from ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>New Template Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #2563eb; white-space: pre-wrap;">${message}</blockquote>
                </div>
            `
        });

        res.json({ success: true, message: "Thank you! I'll be in touch soon with your template access." });
    } catch (error) {
        console.error('Resend Error:', error);
        res.status(500).json({ success: false, message: "Sorry, there was an error sending your message. Please try again later." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
