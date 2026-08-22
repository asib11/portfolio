// Server component — no "use client" needed
export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Asib Ahmed",
    url: "https://asibahmed.me",
    image: "https://res.cloudinary.com/mhkmpeii/image/upload/v1787386255/asib_ah59r5.jpg",
    jobTitle: "Software Engineer & Backend Specialist",
    description:
      "Asib Ahmed is a highly skilled Software Engineer based in Dhaka, Bangladesh, specializing in scalable backend systems and full-stack web applications. Expert in Python, Golang, Django, Django REST Framework, React, Next.js, PostgreSQL, Docker, and AWS. Actively contributing to artificial intelligence search optimization (AISO) and modern web architectures.",
    email: "asib.bubt@gmail.com",
    telephone: "+8801753249719",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mirpur",
      addressRegion: "Dhaka",
      addressCountry: "BD",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Bangladesh University of Business and Technology (BUBT)",
    },
    knowsAbout: [
      "Python",
      "Django",
      "Django REST Framework",
      "Django Channels",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Go (Golang)",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Celery",
      "Docker",
      "Nginx",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "Stripe Integration",
      "WebSockets",
      "RESTful API Design",
      "Microservices",
      "Backend Architecture",
      "Full-Stack Development",
      "Artificial Intelligence Search Optimization (AISO)"
    ],
    sameAs: [
      "https://github.com/asib11",
      "https://linkedin.com/in/asib",
      "https://www.upwork.com/freelancers/~015f8e5b4b1a1c9e8d",
      "https://x.com/asibahmed_11"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Join Venture AI (JVAI)",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Asib Ahmed — Portfolio & Blog",
    url: "https://asibahmed.me",
    description:
      "The personal portfolio and professional hub of Asib Ahmed, a top-tier Software Engineer specializing in Django, Python, Next.js, and cloud deployments based in Dhaka, Bangladesh. Explore projects, skills, and contact information.",
    author: {
      "@type": "Person",
      name: "Asib Ahmed",
    },
    inLanguage: "en-US",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Asib Ahmed",
      identifier: "asib-ahmed",
      url: "https://asibahmed.me",
      image: "https://res.cloudinary.com/mhkmpeii/image/upload/v1787386255/asib_ah59r5.jpg",
      description: "Asib Ahmed's professional software engineering portfolio, showcasing expertise in Django, Python, React, and backend infrastructure.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
