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
        price: '$100',
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
        price: '$100',
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
        price: '$100',
        thumbnail: '/assets/artwork1.png',
        heroImage: '/assets/artwork1.png',
    },

    {
        id: 'photographer-portfolio',
        title: 'LensCraft Portfolio',
        category: 'Photographer Template',
        shortDescription: 'A visually striking portfolio template built to showcase photography with impact and storytelling.',
        fullDescription: 'LensCraft Portfolio is created for photographers who want their images to speak for themselves. Featuring fullscreen galleries, smooth transitions, and minimal distractions, it highlights every detail of your work. Organized collections and category filters allow visitors to explore different styles effortlessly, making it perfect for weddings, travel, portraits, and commercial photography.',
        idealFor: 'Photographers, Creatives & Visual Storytellers',
        websiteLink: 'https://photographer-template-maganda.vercel.app/',
        price: '$100',
        thumbnail: '/assets/photo1.png',
        heroImage: '/assets/photo1.png',
    },
    {
        id: 'video-editor-portfolio',
        title: 'MotionCut Studio',
        category: 'Video Editor Template',
        shortDescription: 'A dynamic portfolio template designed to showcase video projects, reels, and editing expertise.',
        fullDescription: 'MotionCut Studio is tailored for video editors who want to present their work in a cinematic and engaging way. It features embedded video sections, highlight reels, and project breakdowns that emphasize storytelling and technical skill. Smooth animations and modern layouts create a professional feel, helping potential clients quickly grasp your editing style and capabilities.',
        idealFor: 'Video Editors, Content Creators & Filmmakers',
        websiteLink: 'https://video-editor-template.vercel.app/',
        price: '$100',
        thumbnail: '/assets/video1.png',
        heroImage: '/assets/video1.png',
    },
    {
        id: 'graphic-artist-portfolio',
        title: 'Design Spectrum',
        category: 'Graphic Artist Template',
        shortDescription: 'A bold and creative portfolio template for showcasing graphic design projects with style.',
        fullDescription: 'Design Spectrum is crafted for graphic artists who want to display a wide range of creative work, from branding to digital graphics. With grid-based galleries, case study sections, and interactive previews, it allows you to present your design process and final outputs effectively. The vibrant yet balanced design ensures your work stands out while maintaining a professional look.',
        idealFor: 'Graphic Designers, Brand Designers & Digital Artists',
        websiteLink: 'https://graphic-design-delta.vercel.app/',
        price: '$100',
        thumbnail: '/assets/graphic.png',
        heroImage: '/assets/graphic.png',
    },
    {
        id: 'photographer-portfolio-2',
        title: 'FrameStory Portfolio',
        category: 'Photographer Template',
        shortDescription: 'A modern and elegant photography portfolio template focused on storytelling and emotion.',
        fullDescription: 'FrameStory Portfolio emphasizes narrative-driven photography, allowing creators to present their work in curated collections. With clean layouts, immersive galleries, and subtle transitions, it enhances the emotional impact of each image. Ideal for photographers who want to build a strong visual identity and connect with their audience through storytelling.',
        idealFor: 'Portrait Photographers, Wedding Photographers & Creatives',
        websiteLink: 'https://photographer-template-1-html.vercel.app/',
        price: '$100',
        thumbnail: '/assets/photo2.png',
        heroImage: '/assets/photo2.png',
    },
    {
        id: 'virtual-assistant-portfolio',
        title: 'Executive VA Hub',
        category: 'Virtual Assistant Template',
        shortDescription: 'A professional and organized portfolio template tailored for virtual assistants to showcase services and client results.',
        fullDescription: 'Executive VA Hub is designed for virtual assistants who want to present their skills, services, and experience in a clear and credible way. With structured sections for services, testimonials, tools, and case studies, it helps build trust with potential clients. The clean layout and intuitive navigation make it easy for visitors to quickly understand your value, making it ideal for freelancers offering administrative, social media, or executive support.',
        idealFor: 'Virtual Assistants, Freelancers & Remote Professionals',
        websiteLink: 'https://assist-pro.vercel.app/',
        price: '$100',
        thumbnail: '/assets/va1.png',
        heroImage: '/assets/va1.png',
    },
    {
        id: 'project-manager-portfolio',
        title: 'Project Manager Portfolio',
        category: 'Project Manager Template',
        shortDescription: 'A structured and results-driven portfolio template designed to showcase project management expertise and achievements.',
        fullDescription: 'ProjectFlow Pro is built for project managers who want to clearly present their experience, methodologies, and successful project outcomes. It features dedicated sections for case studies, project timelines, tools, certifications, and key metrics, allowing you to highlight both strategic thinking and execution skills. With a clean, professional layout and intuitive navigation, it helps potential employers or clients quickly understand your leadership style, workflow, and impact across projects.',
        idealFor: 'Project Managers, Scrum Masters & Operations Professionals',
        websiteLink: 'https://project-manager-dusky-xi.vercel.app/',
        price: '$100',
        thumbnail: '/assets/pm1.png',
        heroImage: '/assets/pm1.png',
    },
    {
        id: 'loan-broker-portfolio',
        title: 'LendPro Portfolio',
        category: 'Loan Broker Template',
        shortDescription: 'A professional and trust-focused portfolio template designed to showcase loan services, expertise, and client success.',
        fullDescription: 'LendPro Portfolio is crafted for loan brokers who want to present their services with clarity and credibility. It includes structured sections for loan offerings, application processes, client testimonials, partner institutions, and success stories. The clean and authoritative design builds trust with potential clients while guiding them through available financing options. With clear calls-to-action and organized content, it helps convert visitors into qualified leads effectively.',
        idealFor: 'Loan Brokers, Mortgage Advisors & Financial Consultants',
        websiteLink: 'https://financial-website-plum.vercel.app/',
        price: '$100',
        thumbnail: '/assets/loan1.png',
        heroImage: '/assets/loan1.png',
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
