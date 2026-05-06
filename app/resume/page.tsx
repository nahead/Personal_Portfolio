import { Metadata } from 'next';
import ResumeClient from './ResumeClient';

export const metadata: Metadata = {
  title: 'Resume - Nahead Jokhio',
  description: 'Professional resume of Nahead Jokhio - AI Developer & Full-Stack Engineer',
};

export default function ResumePage() {
  return <ResumeClient />;
}
