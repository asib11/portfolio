// Server component — no "use client" needed
export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Asib Ahmed",
    url: "https://asibahmed.me",
    image: "https://asibahmed.me/og-image.png",
    jobTitle: "Software Engineer",
    description:
      "Aspiring Software Engineer with expertise in Python, Django, DRF, Django Channels, React, PostgreSQL, Docker, and AWS. Specializing in scalable backend systems and full-stack web applications.",
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
      "React",
      "Go",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Celery",
      "Docker",
      "Nginx",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "Stripe",
      "WebSockets",
      "REST API",
      "Backend Development",
      "Full-Stack Development",
      "Software Engineering",
    ],
    sameAs: [
      "https://github.com/asib11",
      "https://linkedin.com/in/asib",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Join Venture AI (JVAI)",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Asib Ahmed — Portfolio",
    url: "https://asibahmed.me",
    description:
      "Portfolio of Asib Ahmed, a Software Engineer specializing in Django, Python, and full-stack web development based in Dhaka, Bangladesh.",
    author: {
      "@type": "Person",
      name: "Asib Ahmed",
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Asib Ahmed",
      identifier: "asib-ahmed",
      url: "https://asibahmed.me",
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
