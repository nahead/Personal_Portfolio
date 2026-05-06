import { notFound } from 'next/navigation';
import { caseStudies } from '@/app/lib/caseStudies';
import CaseStudyDetail from './CaseStudyDetail';

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

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

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetail study={study} />;
}
