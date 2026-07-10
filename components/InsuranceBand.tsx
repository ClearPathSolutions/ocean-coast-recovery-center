import Link from "next/link";
import Reveal from "@/components/Reveal";
import { insuranceCarriers } from "@/lib/site";
import { Shield, ArrowRight, CheckCircle } from "@/components/icons";

export default function InsuranceBand() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="overflow-hidden rounded-4xl bg-gradient-to-br from-navy via-navy-light to-ocean-800 px-6 py-12 shadow-lift sm:px-12 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="eyebrow !text-sand-300">
                <Shield className="h-4 w-4" /> Did You Know?
              </span>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Most major PPO &amp; POS plans help pay for rehab.
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Ocean Coast Recovery works with most major PPO &amp; POS insurance plans that
                offer out-of-network coverage for substance abuse treatment. Get an instant,
                free benefits check — it&rsquo;s 100% confidential with no obligation.
              </p>
              <p className="mt-3 text-sm text-white/55">
                No Medicaid or Medicare accepted at this time.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/admissions#verify" className="btn-primary">
                  Free Benefits Check <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/insurance" className="text-sm font-semibold text-white/90 hover:text-sand-200">
                  See accepted insurance &rarr;
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/15">
              <p className="text-sm font-semibold uppercase tracking-wider text-sand-200">
                In-network with plans like
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {insuranceCarriers.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-ocean-300" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-sm text-white/60">…and many more</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
