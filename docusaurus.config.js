// @ts-check
// docusaurus.config.js — Haxnation Blog Platform
// Trial repo: haxnation/blog
// Production: Haxnation/blog

import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Haxnation Blog',
  tagline: 'Insights, Research & Community from Haxnation',
  favicon: 'img/favicon.svg',

  // ── GitHub Pages deployment ──────────────────────────────────────
  // Trial: haxnation.github.io/blog
  // Production: change to 'https://blog.Haxnation.org' and baseUrl: '/'
  // PR previews override baseUrl via PREVIEW_BASE_URL, e.g. '/blog/pr-123/'
  // (see .github/workflows/preview-*.yml). Never commit a PR-specific value.
  url: 'https://haxnation.github.io',
  baseUrl: process.env.PREVIEW_BASE_URL || '/blog/',

  organizationName: 'haxnation',  // GitHub org/user owning the repo
  projectName: 'blog',     // Repo name
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // ── Analytics: Microsoft Clarity ─────────────────────────────────
  // Proper Docusaurus way: declarative <head> tag (SPA-safe, no raw
  // <script> paste into pages). Runs on every route, once per page load.
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'text/javascript' },
      innerHTML:
        '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "yhnl14eoha");',
    },
  ],

  
  // Docusaurus 3.10+ — MDX + Markdown support and Mermaid diagrams
  markdown: {
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // ── Stylesheets (KaTeX Math CSS) ─────────────────────────────────
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  // ── Internationalisation ─────────────────────────────────────────
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // ── Presets ──────────────────────────────────────────────────────
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // ── Docs enabled minimally for search plugin compatibility ──
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },

        // ── Blog configuration ────────────────────────────────────
        blog: {
          // Blog is served at the root path
          routeBasePath: '/',
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 200 } }),
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],

          // Feed generation
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Haxnation. All rights reserved.`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 20),
                ...rest,
              });
            },
          },

          // Posts are authored inside blog/<github-username>/
          // Docusaurus treats the blog/ dir recursively
          blogTitle: 'Haxnation Blog',
          blogDescription:
            'The official Haxnation community blog — cybersecurity, dev culture, and beyond.',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 10,

          // ── Author pages (built-in since Docusaurus 3.1) ──────────
          authorsMapPath: 'authors.yml',
        },

        theme: {
          customCss: './src/css/custom.css',
        },

        // ── Sitemap ───────────────────────────────────────────────
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  // ── Plugins ───────────────────────────────────────────────────────
  plugins: [
    'docusaurus-plugin-image-zoom',
  ],

  // ── Themes ────────────────────────────────────────────────────────
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        indexBlog: true,
        indexDocs: false,
        indexPages: false,
        blogRouteBasePath: '/',
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  // ── Theme configuration ───────────────────────────────────────────
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // ── Mermaid config ────────────────────────────────────────
      mermaid: {
        theme: { light: 'neutral', dark: 'dark' },
        options: {
          fontFamily: 'JetBrains Mono, monospace',
        },
      },

      // ── Image Zoom config ─────────────────────────────────────
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgba(250, 250, 250, 0.95)',
          dark: 'rgba(11, 11, 11, 0.95)',
        },
        config: {
          margin: 24,
          scrollOffset: 40,
        },
      },

      // ── Color mode (dark/light toggle) ────────────────────────
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },

      // ── Announcement bar ──────────────────────────────────────
      announcementBar: {
        id: 'welcome',
        content:
          '// HAXNATION.BLOG — Offline meetups, CTFs and more. <a href="https://haxnation.org/mumbai" target="_blank">[ JOIN OUR WHATSAPP GROUPS ]</a>',
        backgroundColor: '#0b0b0b',
        textColor: '#5ce1e6',
        isCloseable: true,
      },

      // ── Navbar ────────────────────────────────────────────────
      navbar: {
        title: '',
        logo: {
          alt: 'Haxnation Logo',
          src: 'img/logo.png',
          srcDark: 'img/logo_dark.png',
          style: { height: '32px', width: 'auto' },
        },
        hideOnScroll: false,
        items: [
          { to: '/', label: 'Blog', position: 'left', exact: true },
          { to: '/tags', label: 'Tags', position: 'left' },
          { to: '/archive', label: 'Archive', position: 'left' },
          { to: '/authors', label: 'Authors', position: 'left' },
          {
            href: 'https://Haxnation.org',
            label: 'Main Site',
            position: 'right',
          },
          {
            href: 'https://github.com/haxnation/blog',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },

      // ── Footer ────────────────────────────────────────────────
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Blog',
            items: [
              { label: 'All Posts', to: '/' },
              { label: 'Tags', to: '/tags' },
              { label: 'Archive', to: '/archive' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Haxnation.org', href: 'https://Haxnation.org' },
              { label: 'GitHub', href: 'https://github.com/haxnation/blog' },
            ],
          },
          {
            title: 'Contribute',
            items: [
              {
                label: 'Writing Guidelines',
                href: 'https://github.com/haxnation/blog/blob/main/CONTRIBUTING.md',
              },
              {
                label: 'Fork & Submit PR',
                href: 'https://github.com/haxnation/blog/fork',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Haxnation. Built with Docusaurus.`,
      },

      // ── Prism syntax highlighting ──────────────────────────────
      prism: {
        theme: prismThemes.dracula,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'bash', 'yaml', 'json', 'python', 'javascript',
          'typescript', 'rust', 'go', 'c', 'cpp',
        ],
      },

      // ── Mermaid diagrams ─────────────────────────────────────
      mermaid: {
        theme: { light: 'neutral', dark: 'forest' },
      },

      // ── Open Graph / SEO metadata ─────────────────────────────
      metadata: [
        { name: 'keywords', content: 'Haxnation, blog, cybersecurity, hacking, development' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'og:type', content: 'website' },
      ],

      // ── Algolia search (configure when ready) ─────────────────
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //   indexName: 'blog',
      //   contextualSearch: true,
      // },
    }),
};

export default config;
