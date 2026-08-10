import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Split, CardGrid } from "@/components/ContentBlocks";
import ProgramGrid from "@/components/ProgramGrid";
import InsuranceBand from "@/components/InsuranceBand";
import Testimonials from "@/components/Testimonials";
import CallbackCTA from "@/components/CallbackCTA";

export const metadata: Metadata = {
  title: "Aftercare & Alumni Program in Orange County",
  description:
    "Recovery doesn't end at discharge. Ocean Coast Recovery's aftercare and alumni program in Orange County provides relapse prevention, connection, and lifelong support.",
};

const benefits = [
  { title: "Practice a New Language", text: "Aftercare lets you keep practicing the tools and coping skills you learned in treatment — out in the real world, alongside others who understand." },
  { title: "Build a Support Network", text: "Research shows aftercare participation decreases relapse and builds the connections that replace isolation with community." },
  { title: "Relapse Is a Detour, Not a Dead End", text: "Relapse can happen — and it doesn't mean recovery is over. Aftercare helps prevent it, and helps you recover from it if it does." },
  { title: "Continuing Education for Life", text: "Think of aftercare like continuing education: ongoing support that helps you stay comfortable and confident in sobriety." },
];

const planning = [
  { title: "Review Your Environment", text: "We look honestly at your living arrangements, job, and social circle — each viewed through the lens of a life in recovery." },
  { title: "Sober Living Options", text: "If your pre-treatment home wasn't serving you, a sober living facility can better support the early days of recovery." },
  { title: "Outpatient & Peer Support", text: "Continued outpatient care and 12-step or peer-support fellowships keep you rooted and accountable." },
  { title: "A Personalized Relapse-Prevention Plan", text: "Your plan reads like a flow chart of 'if/then' steps to help you navigate cravings and urges without relapsing." },
];

export default function AftercarePage() {
  return (
    <>
      <PageHero
        eyebrow="Preparing you for success in recovery"
        title="Aftercare & beyond"
        subtitle="Getting sober is the first step. The rest of the work is staying sober — and we walk with you long after you leave our doors."
        image="/images/facility/patio-dining.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Treatment", href: "/treatment" }, { label: "Aftercare" }]}
      />

      <Split
        eyebrow="Lifelong Healing Is Possible"
        title="Life after treatment"
        paragraphs={[
          "When the time comes to leave treatment, you may have trepidation about what life will look like in sobriety. Inpatient rehab is a protected space — and thinking about life afterward can feel overwhelming.",
          "But you are no longer the person who arrived at detox. By the time you leave, you'll have done tremendous work and built a toolkit of resources you can rely on. The early days are still challenging — and that's exactly why aftercare is an essential tool.",
        ]}
        image="/images/facility/living-room.jpg"
        imageAlt="Alumni community at Ocean Coast Recovery"
      />

      <CardGrid
        tint
        eyebrow="Stay Sober & Connected"
        title="The benefits of continued care"
        subtitle="Creating a life without drugs and alcohol is a bit like learning a new language. Aftercare gives you a place to keep practicing it."
        items={benefits}
        cols={2}
      />

      <CardGrid
        eyebrow="Preparing for Life After Rehab"
        title="Aftercare planning in Orange County"
        subtitle="Planning begins while you're still in treatment. We help you identify the changes you need to make and the resources to sustain your recovery."
        items={planning}
        cols={2}
      />

      <ProgramGrid eyebrow="Your Path Through Care" title="Explore our programs" exclude="/treatment/aftercare" />
      <InsuranceBand />
      <Testimonials variant="foam" />
      <CallbackCTA />
    </>
  );
}
