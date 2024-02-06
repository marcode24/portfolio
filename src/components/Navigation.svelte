<script>
  import BriefcaseIcon from '@components/icons/briefcase-icon.svelte';
  import EnvelopeIcon from '@components/icons/envelope-icon.svelte';
  import HomeIcon from '@components/icons/home-icon.svelte';
  import UserIcon from '@components/icons/user-icon.svelte';
  import WrenchIcon from '@components/icons/wrench-icon.svelte';
  import SunIcon from '@components/icons/sun-icon.svelte';
  import MoonIcon from '@components/icons/moon-icon.svelte';
  import { onMount } from 'svelte';

  import { getI18n } from '@i18n/index';

  let current = '';
  let scrollY = 0;
  let darkThemeName = 'dark-theme'; // nombre de la clase para el tema oscuro
  let isDarkTheme = false; // indicador del estado del tema
  let home, about, skills, portfolio, contact;
  let theme = {
    dark: 'dark-theme',
    light: 'light-theme',
  };

  onMount(() => {
    isDarkTheme = document.body.classList.contains(darkThemeName);
    let language = document.documentElement.lang;
    const i18n = getI18n({ currentLocale: language });
    home = i18n.HERO_SECTION.TITLE_NAV;
    about = i18n.ABOUT_SECTION.TITLE;
    skills = i18n.SKILLS_SECTION.TITLE;
    portfolio = i18n.PORTFOLIO_SECTION.TITLE;
    contact = i18n.CONTACT_SECTION.TITLE;
    theme = {
      dark: i18n.THEME.DARK_THEME,
      light: i18n.THEME.LIGHT_THEME,
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function setTheme() {
    document.body.classList.toggle(darkThemeName);
    isDarkTheme = document.body.classList.contains(darkThemeName);
    localStorage.setItem('theme', isDarkTheme ? darkThemeName : 'light');
  }

  function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('li');

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 60) {
        current = section.id;
      }
    });

    navLi.forEach((li) => {
      li.classList.remove('active');
      if (li.classList.contains(current)) {
        li.classList.add('active');
      }
    });

    scrollY = window.scrollY; // Actualiza la posición de desplazamiento
  }
</script>

<nav>
  <ul class="nav">
    <li class="home active">
      <a href="#home" aria-label="Home section">
        <HomeIcon />
        <span class="title"> {home} </span>
      </a>
    </li>
    <li class="portfolio">
      <a href="#portfolio" aria-label="Portfolio section">
        <BriefcaseIcon />
        <span class="title">{portfolio}</span>
      </a>
    </li>
    <li class="skills">
      <a href="#skills" aria-label="Skills section">
        <WrenchIcon />
        <span class="title">{skills}</span>
      </a>
    </li>
    <li class="about">
      <a href="#about" aria-label="About section">
        <UserIcon />
        <span class="title">{about}</span>
      </a>
    </li>
    <li class="contact">
      <a href="#contact" aria-label="Contact section">
        <EnvelopeIcon />
        <span class="title">{contact}</span>
      </a>
    </li>
    <li class="divisor">
      <!-- <hr class="line-divisor"> -->
      <div class="line-divisor"></div>
    </li>
    <li>
      <a on:click={setTheme} aria-label="Change theme">
        {#if isDarkTheme}
        <SunIcon />
        <span class="title">{theme.light}</span>
        {:else}
        <MoonIcon />
        <span class="title">{theme.dark}</span>
        {/if}
      </a>
    </li>
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    background: var(--bg-color);
    border: 1px solid var(--border-color-nav);
    border-radius: 40px;
    box-shadow: 0px 0 20px 3px rgb(0 0 0 / 10%);
    z-index: 100;
    transform: translate(-50%, -50%);
  }

  nav ul.nav {
    padding: 0.6rem;
    display: flex;
    /* flex-direction: column; */
    flex-direction: row;

    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  nav ul.nav li {
    cursor: pointer;
    position: relative;
    list-style: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    transition: 0.3s;
    background-color: var(--bg-color-button);
  }

  nav ul.nav li.divisor {
    background: none;
    width: 2px;
    display: flex;
    align-items: center;
  }

  nav ul.nav li.divisor .line-divisor {
    border-left: 2px solid #4b5563;
    height: 70%;
  }

  nav ul.nav li.active {
    transition: 0.2s;
    background: var(--primary-color);
  }

  nav ul.nav li a {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: var(--bg-dark3);
    font-weight: bold;
  }

  nav ul.nav li.active a {
    color: #fff;
  }

  nav ul.nav li a .title {
    position: absolute;
    left: 50%;
    top: -70px;
    display: block;
    background: var(--bg-color-tooltip);
    color: var(--font-color);
    width: max-content;
    padding: 5px 10px;
    transform: translate(-50%, 15%);
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    visibility: hidden;
    opacity: 0;
    transition: 0.5s;
  }

  nav ul.nav li:hover {
    background-color: var(--bg-color-button-hover);
  }

  nav ul.nav li.active:hover {
    background-color: var(--primary-color);
  }

  nav ul.nav li a:hover .title {
    transform: translate(-50%, 50%);
    visibility: visible;
    opacity: 1;
  }

  nav ul.nav li a .title::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--bg-color-tooltip);
    bottom: -8px;
    left: 48%;
    transform: rotate(45deg) translateX(-50%);
    border-radius: 2px;
    transition: 0.5s;
  }

  @media (max-width: 768px) {
    nav ul.nav li {
      width: 56px;
      height: 56px;
    }
    nav ul.nav li a .title {
      display: none;
    }
  }

  @media (max-width: 480px) {
    nav ul.nav li {
      width: 46px;
      height: 46px;
    }
  }
</style>