/**
 * A <script type="application/ld+json"> is still the officially recommended
 * way to emit structured data from a Server Component. `<` is escaped so a
 * stray "</script>" inside a string cannot break out of the tag.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
