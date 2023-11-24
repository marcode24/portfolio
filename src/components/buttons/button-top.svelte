<script>

  import ArrowupIcon from '@components/icons/arrowup-icon.svelte';
  import { onMount } from 'svelte';

  let showGoUpButton = false;
  const showScrollHeight = 400;
  const hideScrollHeight = 200;

  onMount(() => {
    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  });

  const checkScrollHeight = () => {
    if (( window.scrollY || document.documentElement.scrollTop || document.body.scrollTop) > showScrollHeight) {
      showGoUpButton = true;
    } else if ( showGoUpButton && (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop) < hideScrollHeight) {
      showGoUpButton = false;
    }
  };

  const scrollTop = () => {
    document.body.scrollTop = 0; // this is for Safari
    document.documentElement.scrollTop = 0; // for another one
  }

</script>

{#if showGoUpButton}
  <span class="btn-top" on:click={scrollTop}>
    <ArrowupIcon />
  </span>
{/if}

<style>
  .btn-top {
    position: fixed;
    bottom: 0;
    right: 1rem;
    z-index: 999;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    background-color: var(--bg-color-button);
    border-radius: 50%;
    transform: translate(-50%, -78%);
    color: var(--bg-dark3);
    box-shadow: 0px 0 20px 3px rgb(0 0 0 / 5%);
    border: 1px solid var(--border-color-nav);
  }

  .btn-top:hover {
    border: none;
    background-color: var(--bg-color-button-hover);
  }

  @media (max-width: 900px) {
    .btn-top {
      opacity: 0;
      visibility: hidden;
    }
  }

</style>

