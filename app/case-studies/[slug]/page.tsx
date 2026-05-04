import { notFound } from 'next/navigation';
import { caseStudies } from '@/app/lib/caseStudies';
import CaseStudyDetail from './CaseStudyDetail';

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${study.title} | Case Study`,
    description: study.tagline,
    openGraph: {
      title: study.title,
      description: study.tagline,
      type: 'article',
      publishedTime: study.date,
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetail study={study} />;
}
