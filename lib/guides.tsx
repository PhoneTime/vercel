import Link from "next/link"
import { allModels, prices, money, slug, SITE } from "@/lib/site"

/* Guides: short, practical articles. Prices are read from the live price list,
   so they update whenever new prices are exported from the app. */

const lowest = (m: string, f: string) => {
  const o = prices[m]?.[f]
  return o && o.length ? Math.min(...o.map((x) => +x.p)) : null
}
const iphones = () => allModels().map((x) => x.model).filter((m) => /^iPhone/.test(m))
const range = (f: string, ms = iphones()) => {
  const v = ms.map((m) => lowest(m, f)).filter((x): x is number => x != null)
  return v.length ? { min: Math.min(...v), max: Math.max(...v) } : null
}

/* "$149" or a link to ask, if a model has no price yet */
function Price({ m, f }: { m: string; f: string }) {
  const v = lowest(m, f)
  return v != null ? <b className="tnum">{money(v)}</b> : <Link href={`/book?model=${encodeURIComponent(m)}`}>ask for a quote</Link>
}

function PriceTable({ f, models, label }: { f: string; models: string[]; label: string }) {
  const rows = models.filter((m) => lowest(m, f) != null)
  if (!rows.length) return null
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-line bg-white">
      <table className="w-full text-left tnum">
        <caption className="sr-only">{label}</caption>
        <thead><tr className="border-b border-line text-sm text-muted2"><th className="px-4 py-2.5 font-medium">Model</th><th className="px-4 py-2.5 text-right font-medium">{label}</th></tr></thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m} className="border-t border-line/70">
              <td className="px-4 py-2.5"><Link href={`/repair/${slug(m)}`} className="font-semibold hover:text-teal-700 hover:underline">{m}</Link></td>
              <td className="px-4 py-2.5 text-right font-semibold">{(prices[m][f].length > 1 ? "from " : "") + money(lowest(m, f)!)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const pick = (list: string[]) => list.filter((m) => prices[m])

export type Guide = {
  slug: string
  title: string
  description: string
  date: string
  read: string
  Body: () => JSX.Element
}

export const GUIDES: Guide[] = [
  {
    slug: "iphone-unknown-part-message-explained",
    title: "Why your iPhone says “Unknown Part” after a repair",
    description: "What the Unknown Part message means after a screen, battery or camera replacement, why Apple shows it, whether it affects your phone, and your options.",
    date: "2026-10-30",
    read: "5 min read",
    Body: () => (
      <>
        <p>
          After a screen, battery or camera replacement, some iPhones show a message such as “Unable to verify this iPhone has a genuine Apple display” or list the part as <b>Unknown Part</b> in Settings. It can look worrying, so here is what is actually going on, explained as objectively as I can.
        </p>

        <h2>Why the message appears</h2>
        <p>
          Apple gives many iPhone parts their own serial number and links them to the phone&apos;s main board. When Apple, or a repairer using Apple&apos;s own system, fits a new genuine part, the part is registered to that specific phone.
        </p>
        <p>When the phone can&apos;t confirm that link, it labels the part as Unknown. According to Apple, that happens when the replacement part:</p>
        <ul>
          <li>isn&apos;t a genuine Apple part,</li>
          <li>hasn&apos;t been verified and linked to the phone after the repair,</li>
          <li>has been modified or can&apos;t be verified, or</li>
          <li>isn&apos;t working as expected.</li>
        </ul>
        <p>So the message is about the part&apos;s origin and registration, not a sign that the repair was done badly. Even a genuine Apple part taken from another iPhone can show it if it hasn&apos;t been linked to your phone.</p>

        <h2>Which iPhones and parts show it</h2>
        <ul>
          <li><b>Battery:</b> iPhone XR, XS, XS Max, SE (2nd and 3rd gen) and later.</li>
          <li><b>Display:</b> iPhone 11 and later.</li>
          <li><b>Front and rear cameras:</b> iPhone 12 and later.</li>
        </ul>
        <p>On iOS 15.2 and later you can see the history in <b>Settings → General → About → Parts and Service History</b>.</p>

        <h2>When you&apos;ll see it</h2>
        <p>
          Apple shows a notification the first time you unlock the iPhone after the repair, and again about five days later. So in practice, most people see it once or twice in the first week, often after restarting the phone. After that it stays quietly in Settings and doesn&apos;t keep popping up.
        </p>

        <h2>Does it affect the phone?</h2>
        <p>The message itself doesn&apos;t stop anything working. Calls, apps, the camera, touch and charging all work as normal. To be fully transparent, a few extras can depend on the part and how it&apos;s fitted:</p>
        <ul>
          <li><b>Battery Health percentage</b> may not show with a non-Apple battery.</li>
          <li><b>True Tone and auto-brightness</b> can be affected with some replacement screens.</li>
          <li><b>Trade-in value</b> may be lower, as Apple notes Unknown parts can reduce it.</li>
        </ul>
        <p>Before the repair I&apos;ll tell you which of these applies to your model and the part you choose, so there are no surprises.</p>

        <h2>Can the message be avoided?</h2>
        <p>
          Sometimes, yes. For some models and parts there are options that don&apos;t show the message, for example batteries fitted with the original battery&apos;s chip transferred across, or replacement parts made to keep Battery Health and True Tone working. These usually cost a bit more and aren&apos;t available for every model or part. Ask me when you book and I&apos;ll tell you what&apos;s possible for your phone.
        </p>

        <h2>If it really matters to you</h2>
        <p>
          If you want every part to show as Genuine, an Apple Store or Apple Authorised Service Provider is the right choice. They fit genuine parts and register them to your phone. It usually costs more and often means booking ahead or leaving the phone with them, but the part history will show Genuine. Newer iPhones (12 and later, on iOS 18) also have a Repair Assistant that can register genuine Apple parts.
        </p>
        <p>
          For most people, a quality replacement fitted at home the same day, with a {SITE.warranty}-day warranty, is the better value. It&apos;s your choice, and I&apos;m happy to help you weigh it up.
        </p>

        <h2>In short</h2>
        <ul>
          <li>“Unknown Part” means the phone can&apos;t verify the part as a registered genuine Apple part.</li>
          <li>It usually appears after unlocking, once or twice in the first week, then stays in Settings.</li>
          <li>Your phone works normally. Some extras may depend on the part, and I&apos;ll explain before the repair.</li>
          <li>Options without the message exist for some models. Apple repair is the way to get Genuine on every part.</li>
        </ul>
        <p>Have a question about your model? <Link href="/contact">Get in touch</Link> or <Link href="/book">book a repair</Link> and add a note.</p>
      </>
    ),
  },
  {
    slug: "iphone-screen-repair-cost-melbourne",
    title: "How much does an iPhone screen repair cost in Melbourne?",
    description: "Real iPhone screen replacement prices by model, what changes the price, and how to choose between screen options.",
    date: "2026-10-30",
    read: "4 min read",
    Body: () => {
      const r = range("Screen")
      return (
        <>
          <p>
            The short answer: it depends mostly on your model. {r ? <>At Phone Time, iPhone screen replacements currently range from <b className="tnum">{money(r.min)}</b> for older models up to <b className="tnum">{money(r.max)}</b> for the newest ones</> : <>Prices range from older models to the newest ones</>}, with parts, labour and coming to your home included.
          </p>
          <h2>Prices for popular models</h2>
          <PriceTable f="Screen" label="Screen replacement" models={pick(["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 14 Pro", "iPhone 15", "iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 16", "iPhone 16 Pro", "iPhone 16 Pro Max", "iPhone 17", "iPhone 17 Pro", "iPhone 17 Pro Max"])} />
          <p>Every model is listed on the <Link href="/prices">price page</Link>.</p>

          <h2>What changes the price</h2>
          <h3>Your model</h3>
          <p>Newer and larger iPhones use bigger, more advanced OLED panels, and those parts simply cost more. That is the main reason a 16 Pro Max costs more to fix than an 11.</p>
          <h3>The type of screen you choose</h3>
          <p>
            For many models there is more than one screen option, from genuine to good-value replacements. They all restore touch and display, but differ in colour accuracy, brightness, thickness and battery use. <Link href="/guides/oled-vs-lcd-replacement-screens">OLED vs LCD screens</Link> explains the difference in plain words.
          </p>
          <h3>What else is damaged</h3>
          <p>If the phone was dropped hard, the back glass or camera lens may also be cracked. I check everything when I arrive and confirm the price before starting, so there are no surprises.</p>

          <h2>Is it worth fixing?</h2>
          <p>
            For most iPhones from the last five or six years, yes. A screen repair costs a fraction of a new phone, and you keep your data, apps and settings exactly as they were. If your battery is also tired, doing both in one visit is good value. Here&apos;s <Link href="/guides/is-it-worth-replacing-iphone-battery">how to tell if the battery needs replacing</Link>.
          </p>

          <h2>What to do before the repair</h2>
          <ul>
            <li>Back up the phone to iCloud or a computer if it still works.</li>
            <li>If glass is splintering, put clear tape over it so it doesn&apos;t cut your finger.</li>
            <li>Stop using it if the screen is flickering wildly or the phone is getting hot, and get it checked.</li>
          </ul>

          <h2>Good to know</h2>
          <p>On newer iPhones, Settings may show an “unknown part” notice after a screen replacement. This is normal for replacement parts and does not affect function or how your phone works.</p>
        </>
      )
    },
  },
  {
    slug: "phone-not-charging-what-to-check",
    title: "Phone not charging? What to check before getting it repaired",
    description: "Five quick checks for an iPhone or Android phone that won't charge, and the signs that the charging port needs repair.",
    date: "2026-10-30",
    read: "4 min read",
    Body: () => (
      <>
        <p>A phone that won&apos;t charge is one of the most common problems I see, and sometimes the fix is simple. Work through these checks first.</p>

        <h2>1. Try a different cable and charger</h2>
        <p>Cables wear out near the plug, especially cheap ones. Borrow a cable and wall charger you know works. If the phone charges, you just need a new cable.</p>

        <h2>2. Look inside the port</h2>
        <p>Pocket lint packs into the charging port over time, so the cable no longer clicks in fully. Shine a torch into the port. If you see grey fluff, that is very likely the problem.</p>
        <p>To clean it, turn the phone off and gently loosen the lint with a wooden toothpick. Never use metal like pins or paper clips, which can short or bend the contacts. If it&apos;s packed in hard, I can clean it safely.</p>

        <h2>3. Restart the phone</h2>
        <p>Software can occasionally stop charging from starting. A restart costs nothing and sometimes fixes it.</p>

        <h2>4. Check for liquid warnings</h2>
        <p>iPhones may show a “liquid detected” alert and pause charging through the port. Unplug it, let it dry for a few hours, and don&apos;t put it in rice. If the alert keeps coming back, have it checked, as liquid can corrode the port over time.</p>

        <h2>5. Try wireless charging</h2>
        <p>If your phone supports it, put it on a wireless charger. If it charges wirelessly but not with a cable, the problem is almost certainly the port, not the battery.</p>

        <h2>Signs the port needs repair</h2>
        <ul>
          <li>The cable only works when held at an angle.</li>
          <li>The plug feels loose and falls out easily.</li>
          <li>Charging starts and stops when you move the phone.</li>
          <li>Nothing works, even after cleaning and with a known-good cable.</li>
        </ul>
        <p>
          A charging port repair is usually a quick job done at your place. For example, it&apos;s <Price m="iPhone 13" f="Charging port" /> for an iPhone 13 and <Price m="iPhone 15 Pro" f="Charging port" /> for an iPhone 15 Pro. Find your model on the <Link href="/prices">price page</Link>.
        </p>

        <h2>When it&apos;s the battery instead</h2>
        <p>If the phone charges but drains very quickly, shuts off at 20 or 30 percent, or the battery is swelling, the battery is the issue. <Link href="/guides/is-it-worth-replacing-iphone-battery">How to tell if your battery needs replacing</Link>.</p>
      </>
    ),
  },
  {
    slug: "is-it-worth-replacing-iphone-battery",
    title: "Is it worth replacing your iPhone battery?",
    description: "How to check iPhone battery health, the signs a battery is worn out, and when a new battery makes more sense than a new phone.",
    date: "2026-10-30",
    read: "4 min read",
    Body: () => {
      const r = range("Battery")
      return (
        <>
          <p>If your iPhone is otherwise fine, a new battery is often the cheapest way to make it feel new again. Here is how to tell whether yours needs one.</p>

          <h2>Check battery health</h2>
          <p>Open <b>Settings → Battery → Battery Health</b> (on some versions, <b>Battery Health &amp; Charging</b>). Maximum Capacity shows how much charge the battery holds compared with when it was new.</p>
          <p>Apple designs iPhone batteries to keep about 80% of their capacity after a set number of full charge cycles: around 500 cycles for iPhone 14 and earlier, and around 1000 cycles for iPhone 15 and later. Below 80%, most people notice the phone running out much sooner.</p>

          <h2>Signs it&apos;s time</h2>
          <ul>
            <li>You charge more than once a day with normal use.</li>
            <li>The phone shuts down suddenly at 10–30%, especially in the cold.</li>
            <li>It feels slow, and Battery Health mentions performance management.</li>
            <li>The screen is lifting or the back is bulging. Stop using it and get it looked at, as a swollen battery shouldn&apos;t be left in the phone.</li>
          </ul>

          <h2>What it costs</h2>
          <p>
            {r ? <>Battery replacements at Phone Time currently range from <b className="tnum">{money(r.min)}</b> to <b className="tnum">{money(r.max)}</b> depending on the model, done at your home or work.</> : <>Battery prices depend on the model.</>}
          </p>
          <PriceTable f="Battery" label="Battery replacement" models={pick(["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15", "iPhone 15 Pro", "iPhone 16", "iPhone 16 Pro"])} />

          <h2>Battery or new phone?</h2>
          <p>A new battery makes sense when the phone still gets updates, the screen and camera are fine, and you&apos;re happy with it apart from battery life. If the phone has several problems at once, compare the total repair cost with an upgrade. I&apos;ll give you an honest opinion either way.</p>

          <h2>Good to know</h2>
          <p>On newer iPhones, Settings may show an “unknown part” notice after a battery replacement. This is normal for replacement parts and does not affect function or how your phone works.</p>
        </>
      )
    },
  },
  {
    slug: "oled-vs-lcd-replacement-screens",
    title: "OLED vs LCD replacement screens: what's the difference?",
    description: "A plain-English guide to the screen options for iPhone repairs, and how to choose the right one for your budget.",
    date: "2026-10-30",
    read: "3 min read",
    Body: () => (
      <>
        <p>When you book a screen repair for a newer iPhone, you&apos;ll often see more than one option at different prices. Here is what the difference actually means for you.</p>

        <h2>Why there are options</h2>
        <p>Most iPhones from the iPhone X onwards came with OLED screens (the iPhone XR, 11 and SE models use LCD). Replacement screens for these models come in a few types, which is why the price can vary for the same phone.</p>

        <h2>OLED replacement</h2>
        <ul>
          <li>Deep, true blacks and rich colours, like the original.</li>
          <li>Thin panel, so the phone fits cases exactly as before.</li>
          <li>Uses less power, especially with dark mode.</li>
          <li>Costs more.</li>
        </ul>

        <h2>LCD replacement (sometimes called “incell”)</h2>
        <ul>
          <li>Clear and sharp for everyday use.</li>
          <li>Blacks look more grey, and colours are a little less vivid.</li>
          <li>Slightly thicker and can use a bit more battery.</li>
          <li>The most affordable way to get a working phone back.</li>
        </ul>

        <h2>Genuine screens</h2>
        <p>Some models also have a genuine option, the closest to how the phone left the factory. It is the best choice if you plan to keep the phone a long time or sell it later.</p>

        <h2>Which should you choose?</h2>
        <ul>
          <li><b>Keeping the phone for years, or it&apos;s a Pro model:</b> OLED or genuine.</li>
          <li><b>Older phone, or a phone for a child:</b> LCD is good value.</li>
          <li><b>Not sure:</b> pick “Not sure” when booking and I&apos;ll show you the options when I arrive.</li>
        </ul>
        <p>Whichever you choose, every repair has a {SITE.warranty}-day warranty. Each model&apos;s options and prices are on its page, for example the <Link href="/repair/iphone-13">iPhone 13</Link> or <Link href="/repair/iphone-14-pro">iPhone 14 Pro</Link>.</p>
      </>
    ),
  },
]

export const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s)
