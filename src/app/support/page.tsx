import type { Metadata } from "next";
import Link from "next/link";

import { ProsePage } from "@/components/legal-page";
import { site } from "@/config/site";
import { stores } from "@/config/stores";
import { JsonLd } from "@/lib/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Support",
  description:
    "Get help with Tasuke AI: contact support, manage or cancel Tasuke Pro, restore a purchase, and fix microphone or reminder issues.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Support" }])} />
      <ProsePage
        eyebrow="Help"
        title="Support"
        intro={
          <>
            Write to{" "}
            <a
              href={`mailto:${site.supportEmail}`}
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              {site.supportEmail}
            </a>
            . Because Tasuke AI has no account and no server, we can’t see your tasks — describe
            what happened, and include your phone model and the app version (Settings → About).
          </>
        }
      >
        <h2>Manage or cancel Tasuke Pro</h2>
        <p>
          Subscriptions are billed by Apple or Google, so they are managed in your store account,
          not in the app:
        </p>
        <ul>
          <li>
            <strong>iPhone:</strong>{" "}
            <a href="https://apps.apple.com/account/subscriptions">App Store subscriptions</a>, or
            Settings → your name → Subscriptions.
          </li>
          <li>
            <strong>Android:</strong>{" "}
            <a
              href={`https://play.google.com/store/account/subscriptions?package=${stores.android.packageName}`}
            >
              Google Play subscriptions
            </a>
            , or Play Store → profile → Payments &amp; subscriptions.
          </li>
        </ul>
        <p>
          Cancel at least 24 hours before the end of the current period to stop the next renewal.
          Refunds are handled by Apple or Google under their policies; we cannot issue them.
        </p>

        <h2>Restore a purchase</h2>
        <p>
          Open the app and choose <strong>Restore Purchases</strong> on the Pro screen or in
          Settings. You need to be signed in to the same Apple ID or Google account you bought with,
          and online for the restore itself.
        </p>

        <h2>The microphone isn’t working</h2>
        <p>
          The app asks for the microphone the first time you tap the record button. If you declined,
          turn it on in your phone’s Settings → Tasuke AI → Microphone. You can always type a task
          instead.
        </p>

        <h2>A reminder didn’t arrive</h2>
        <p>
          Reminders are delivered by your phone. Check that notifications are allowed for Tasuke AI,
          and that Focus / Do Not Disturb or an aggressive battery saver isn’t holding them back. On
          Android, allowing <em>Alarms &amp; reminders</em> for the app makes them exact.
        </p>

        <h2>Delete your data</h2>
        <p>
          Everything is stored only on your phone. <strong>Settings → Delete all data</strong>{" "}
          removes it in place; uninstalling the app removes it too. There is no account to close.
        </p>

        <h2>More answers</h2>
        <p>
          See the <Link href="/#faq">FAQ</Link>, the <Link href="/privacy">Privacy Policy</Link> and
          the <Link href="/terms">Terms of Service</Link>.
        </p>
      </ProsePage>
    </>
  );
}
