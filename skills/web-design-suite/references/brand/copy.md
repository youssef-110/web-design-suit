# Interface copy and voice

Words are design material: they make the interface easier to understand and use. Cite as `brand/copy.md CPY#`.

## Principles

- **CPY1. Write from the user's side.** Name things by what users understand, not how the system is built (users manage notifications, not webhook config). Specific and plain beats clever.
- **CPY2. Active voice, second person, present tense.** "Install the CLI", not "The CLI will be installed". Use "you"; limit "we" to real company actions.
- **CPY3. Each element does one job.** Say each idea once; if the heading explains the state, the intro adds something new or disappears. Cut sentences in half, then again.
- **CPY4. One copy register per page.** Do not mix terminal-mono metrics, editorial prose and marketing punch unless the brand voice does.
- **CPY5. Real content, never lorem ipsum.** When the brief has no copy, write believable draft copy in the product's own terms and mark it as draft.

## Persuade surfaces

- **CPY6. Headline**: says what it is or what changes for the visitor; eight words or fewer is a good target. Supporting line about 20 words at most. Section copy: headline plus one short paragraph (about 25 words) plus one visual or action.
- **CPY7. Proof over claims.** Show the product doing the job; use real numbers and real quotes from the brief. Never invent customers, prices, benchmarks or testimonials; label sample data as sample (anti-slop.md SL42).
- **CPY8. Quotes**: at most three lines, attributed with name, role and company; typographic quotes.
- **CPY9. CTA labels**: one to three words naming the outcome; one label per intent across nav, hero and footer; logged-in visitors see "Open app" or "Go to dashboard", not "Sign up".

## Product UI

- **CPY10. Buttons name the action and object**: "Save changes", "Delete project". The same verb follows through the flow ("Publish" button, "Published" toast).
- **CPY11. Errors**: what failed, why (when known and useful), how to recover. No blame, no apology theatre, no "Oops!", no internal codes as the main message. Serious topics (money, privacy, deletion, access) get no jokes.
- **CPY12. Empty states**: explain the state and give the next action. Loading text names the real operation and ends with `…`.
- **CPY13. Success**: brief, confident, no exclamation marks.
- **CPY14. Confirmations** name the action on both message and button; never "Are you sure?" with "Yes"/"No".
- **CPY15. Helper text** answers the implicit question; link text makes sense out of context (never "click here"); numerals for counts ("8 deployments"); `&` only where space is tight.

## Style rules

- **CPY16. Sentence case** for headings, buttons and labels (conflicts.md C12).
- **CPY17. Punctuation**: no em or en dashes as punctuation (conflicts.md C14); `…` not `...`; curly quotes and apostrophes in UI (conflicts.md C13); non-breaking spaces in `10&nbsp;MB`; units with a space (`64 KB`, `200 ms`).
- **CPY18. Banned words**: elevate, seamless, unleash, next-gen, revolutionize, game-changer, supercharge, empower, cutting-edge, world-class, enterprise-grade, transformative, streamline, delve, tapestry, testament, pivotal, crucial, vibrant, robust, leverage (as a verb). Also "easy", "simple", "just", "very", "really" describing the reader's work.
- **CPY19. AI cadence to remove**: "Not just X, but Y"; "Not a feature. A platform."; "X. No Y." repeated; forced groups of three; "serves as", "stands as", "boasts" instead of "is" or "has"; summary transitions ("Now that we've explored…"); vague attributions ("experts say"); rhetorical questions; stop-start fragments splitting one idea; personified artifacts ("hand the browser a URL").
- **CPY20. Performative labels to avoid**: "Field notes", "Quietly trusted by", "Currently on the bench", "From the field", generic step labels ("Step 1", "Phase 01") when the step name itself is the label.
- **CPY21. Names**: realistic, locale-appropriate people and believable product names; never John Doe, Jane Smith, Acme, Nexus, SmartFlow.
- **CPY22. Numbers**: organic and sourced; no 99.99%, no 10x, no fake-precise specs the brand does not claim.

## Localization

- **CPY23.** Complete, translatable sentences (no concatenated fragments); variables that translators can reorder; `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.PluralRules`; room for 30 to 40 percent expansion; `translate="no"` on brand names and code.

## Copy self-audit (before shipping)

Re-read every visible string: headings, labels, buttons, alt text, captions, errors, footer. Rewrite anything grammatically off, with an unclear referent, cute-but-wrong, or sounding like a model trying to sound thoughtful. When unsure, replace it with a plain functional sentence; boring copy beats AI-cute copy.
