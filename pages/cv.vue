<script setup lang="ts">
const workData = [
  {
    imageUrl: '/img/cv/freelancer.svg',
    title: 'Web developer',
    subTitle: 'Freelance',
    date: '2017- Present',
    stack: 'Wordpress, Next, Nuxt, Python, SCSS, Tailwind CSS',
    list: [
      'Developed and customized WordPress websites using themes, plugins and ACF',
      'Built multiple e-commerce platforms and representative websites',
    ],
  },
  {
    imageUrl: '/img/cv/teltonika.jpeg',
    title: 'Frontend developer',
    subTitle: 'Teltonika',
    date: 'Jan 2021 - Feb 2025',
    stack: 'Nuxt, Vue, Tailwind CSS',
    list: [
      'Developed and maintained corporate websites and CMS',
      'Worked on UI monorepo and contributed to various projects',
      'Participated in code reviews and maintained high code quality standards',
      'Worked closely with designers to create user-friendly interfaces and Design System',
    ],
  },
  {
    imageUrl: '/img/cv/inulti.jpeg',
    title: 'Junior web developer',
    subTitle: 'Inulti',
    date: 'Sep 2018 - Jun 2020',
    stack: 'HTML, SCSS BEM, JavaScript, Vue',
    list: [
      'Converted Figma designs into responsive landing pages',
      'Ensured pixel-perfect accuracy and cross-browser compatibility',
    ],
  },
];
const educationData = [
  {
    imageUrl: '/img/cv/llms.jpg',
    title: 'LLM Engineering',
    subTitle: 'Udemy course',
    date: '2025',
    link: 'https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/',
  },
  {
    imageUrl: '/img/cv/react.jpg',
    title: 'Professional React & Next.js',
    subTitle: 'ByteGrad course',
    date: '2025',
    link: 'https://bytegrad.com/courses/professional-react-nextjs',
  },
  {
    imageUrl: '/img/cv/node.jpg',
    title: 'Node.js, Express, MongoDB',
    subTitle: 'Udemy course',
    date: '2021',
    link: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/',
  },
  {
    imageUrl: '/img/cv/js.webp',
    title: 'Advanced Javascript',
    subTitle: 'Udemy course',
    date: '2021',
    link: 'https://www.udemy.com/course/javascript-advanced/',
  },
  {
    imageUrl: '/img/cv/vcs.png',
    title: 'Vilnius Coding school',
    subTitle: 'WEB development course',
    date: '2017',
  },
  {
    imageUrl: '/img/cv/vu.jpeg',
    title: 'Vilnius University',
    subTitle: "Bachelor's degree, International Tourism Business",
    date: '2011 - 2015',
  },
];
</script>

<template>
  <section class="cv-section">
    <div>
      <h1>Work experience</h1>
      <div class="cv">
        <CvBlock
          v-for="(item, index) in workData"
          :key="index"
          :image-url="item.imageUrl"
          :title="item.title"
          :sub-title="item.subTitle"
          :date="item.date"
          :stack="item.stack"
          :list="item.list"
        />
      </div>
    </div>
    <div>
      <h1>Education</h1>
      <div class="cv">
        <CvBlock
          v-for="(item, index) in educationData"
          :key="index"
          :image-url="item.imageUrl"
          :title="item.title"
          :sub-title="item.subTitle"
          :date="item.date"
          :link="item.link"
        />
      </div>
    </div>
    <div>
      <h1>About me</h1>
      <p>
        Web Developer who works well both independently and as part of a team.
        I've closely collaborated with design, marketing, and backend teams to
        deliver projects from start to finish. I'm easy-going and contribute
        positively to team dynamics. In my freetime I enjoy spending time with
        my family, playing music, foosball, and table tennis.
      </p>
    </div>
  </section>
</template>

<style scoped>
.cv-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  max-width: 1200px;
  padding-bottom: 4.5rem;
}
@media (max-width: 768px) {
  .cv-section {
    grid-template-columns: 1fr;
  }
}
</style>
