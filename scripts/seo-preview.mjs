#!/usr/bin/env node

const DEFAULT_URL = 'https://www.bykashyap.com/';

function usage() {
  console.log(`Usage: npm run seo:preview [-- <url>]

Examples:
  npm run seo:preview
  npm run seo:preview -- https://www.bykashyap.com/fashion
  npm run seo:preview -- http://localhost:3000/contact
`);
}

function pickMeta(html, attr, key) {
  const pattern = new RegExp(
    `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']*)["']|` +
      `<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${key}["']`,
    'i',
  );
  const match = html.match(pattern);
  return match?.[1] ?? match?.[2] ?? null;
}

function pickTitle(html) {
  return html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
}

function pickCanonical(html) {
  return (
    html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i,
    )?.[1] ??
    html.match(
      /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i,
    )?.[1] ??
    null
  );
}

function pickJsonLd(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  return blocks.map((block) => {
    try {
      return JSON.parse(block[1]);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

function line(label, value) {
  if (!value) return;
  console.log(`${label.padEnd(14)} ${value}`);
}

function section(title) {
  console.log(`\n${title}`);
  console.log('─'.repeat(Math.max(title.length, 48)));
}

async function preview(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'KashyapPortfolio-SEO-Preview/1.0' },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const title = pickTitle(html);
  const description =
    pickMeta(html, 'name', 'description') ??
    pickMeta(html, 'property', 'og:description');
  const ogTitle = pickMeta(html, 'property', 'og:title') ?? title;
  const ogImage = pickMeta(html, 'property', 'og:image');
  const ogUrl = pickMeta(html, 'property', 'og:url') ?? pickCanonical(html) ?? url;
  const ogType = pickMeta(html, 'property', 'og:type');
  const twitterCard = pickMeta(html, 'name', 'twitter:card');
  const twitterTitle = pickMeta(html, 'name', 'twitter:title') ?? ogTitle;
  const twitterDescription =
    pickMeta(html, 'name', 'twitter:description') ?? description;
  const twitterImage = pickMeta(html, 'name', 'twitter:image') ?? ogImage;
  const robots = pickMeta(html, 'name', 'robots');
  const keywords = pickMeta(html, 'name', 'keywords');
  const canonical = pickCanonical(html);
  const jsonLd = pickJsonLd(html);

  section('LINK SHARE PREVIEW');
  console.log('What people usually see when you paste the link:\n');
  line('URL', ogUrl);
  line('Title', ogTitle);
  line('Description', description);
  line('Image', ogImage);

  section('OPEN GRAPH (Facebook, WhatsApp, iMessage, LinkedIn)');
  line('og:title', ogTitle);
  line('og:description', pickMeta(html, 'property', 'og:description'));
  line('og:url', ogUrl);
  line('og:type', ogType);
  line('og:image', ogImage);
  line('og:image:alt', pickMeta(html, 'property', 'og:image:alt'));
  line('og:image:size', [
    pickMeta(html, 'property', 'og:image:width'),
    pickMeta(html, 'property', 'og:image:height'),
  ]
    .filter(Boolean)
    .join(' x '));

  section('TWITTER / X CARD');
  line('twitter:card', twitterCard);
  line('twitter:title', twitterTitle);
  line('twitter:description', twitterDescription);
  line('twitter:image', twitterImage);

  section('GOOGLE / SEO');
  line('<title>', title);
  line('description', description);
  line('canonical', canonical);
  line('robots', robots);
  line('keywords', keywords);

  section('STRUCTURED DATA (JSON-LD)');
  if (jsonLd.length === 0) {
    console.log('No JSON-LD found.');
  } else {
    for (const block of jsonLd) {
      console.log(JSON.stringify(block, null, 2));
    }
  }

  section('QUICK CHECK');
  const checks = [
    ['Title set', Boolean(title)],
    ['Description set', Boolean(description)],
    ['Canonical set', Boolean(canonical)],
    ['OG image set', Boolean(ogImage)],
    ['JSON-LD present', jsonLd.length > 0],
    ['Indexable', !robots || /index/i.test(robots)],
  ];

  for (const [label, ok] of checks) {
    console.log(`${ok ? '✓' : '✗'} ${label}`);
  }

  console.log('');
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  usage();
  process.exit(0);
}

const url = args[0] ?? DEFAULT_URL;

preview(url).catch((error) => {
  console.error(`SEO preview failed for ${url}`);
  console.error(error.message);
  process.exit(1);
});
