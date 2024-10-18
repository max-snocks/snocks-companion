<script>
  import { onMount } from 'svelte'

  const link = 'https://github.com/max-snocks'

  onMount(() => {})
</script>

<main>
  <h3>SNOCKS Shopify Helper</h3>

  <a href={link} target="_blank">built by Max @ SNOCKS</a>
</main>

<style>
  :global(:root) {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;

    color-scheme: light dark;
    background-color: #242424;
  }

  :global(body) {
    min-width: 20rem;
    margin: 0;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h3 {
    color: #f7fafc;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1.2rem;
    margin: 2rem auto;
  }

  a {
    font-size: 0.75rem;
    margin: 0.5rem;
    color: #cccccc;
    text-decoration: none;
  }

  a:hover {
    color: #fff;
  }

  @media (prefers-color-scheme: light) {
    :global(:root) {
      background-color: #fafafa;
    }

    h3 {
      color: #212121;
    }

    a:hover {
      color: #212121;
    }
  }
</style>
