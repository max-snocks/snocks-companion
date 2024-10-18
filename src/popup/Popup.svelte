<script>
  import { onMount, onDestroy } from 'svelte'
  import { openAdmin, openCreateDiscount, copyPreviewLink, editInAdmin, editInCustomizer, clearCart } from '../actions'
  import * as icons from '../icons'

  const link = 'https://github.com/max-snocks'
  let type = 'Page',
    urlMatches = false

  onMount(() => {
    window.setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0]?.id, { type: 'MOUNT' }, (response) => {
          if (!response) return
          type = response.type
          urlMatches = response.urlMatches
        })
      })
    }, 100)
  })
</script>

<template>
  <main>
    <h3>SNOCKS Companion</h3>
    <div class="calc">
      {#if urlMatches}
        <button on:click={editInAdmin}>
          <h4>{@html icons.edit} Edit {type}</h4>
          <span>Make changes to this {type?.toLowerCase()} in the Shopify Admin.</span>
        </button>
        <button on:click={editInCustomizer}>
          <h4>{@html icons.customizer} Edit in Customizer</h4>
          <span>Open this {type?.toLowerCase()} in the Shopify theme customizer.</span>
        </button>
        <button on:click={copyPreviewLink}>
          <h4>{@html icons.preview} Copy Preview Link</h4>
          <span>Create a non-expiring preview link.</span>
        </button>
        <button on:click={openCreateDiscount}>
          <h4>{@html icons.discount} Create Discount</h4>
          <span>Create a new discount.</span>
        </button>
        <button on:click={openAdmin}>
          <h4>{@html icons.code} Edit Theme Code</h4>
          <span>Open the current theme in the Shopify code editor.</span>
        </button>
        <button on:click={clearCart}>
          <h4>{@html icons.cart} Clear Cart</h4>
          <span>Remove all items from the current shopping cart.</span>
        </button>
      {:else}
        <button
          on:click={() => window.open(`https://admin.shopify.com/store/snockssocks`, '_blank')}
        >
          <h4>{@html icons.admin} SNOCKS Admin</h4>
          <span>Open the SNOCKS Shopify Admin in a separate tab.</span>
        </button>
        <button on:click={openCreateDiscount}>
          <h4>{@html icons.discount} Create Discount</h4>
          <span>Create a new discount.</span>
        </button>
      {/if}
      <a href={link} target="_blank">built by Max @ SNOCKS</a>
    </div>
  </main>
</template>

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
    background-color: #030712;
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
    margin: 1rem auto 0;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0 0.5rem;
  }

  .calc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0rem 0.5rem;

    & > button {
      font-size: 1rem;
      width: 100%;
      padding: 1rem 1.5rem;
      border: 0;
      border-radius: 0.5rem;
      background-color: transparent;
      color: #f9fafb;
      cursor: pointer;
      outline: none;
      margin: 0 auto;
      text-align: left;

      & svg {
        transform: scale(1.2);
      }

      & span {
        font-size: 0.9rem;
        color: #e5e7eb;
      }

      &:hover {
        background-color: #1e293b;

        & > svg {
          fill: #67e8f9;
        }

        & h4 {
          color: #67e8f9;
        }
      }
    }

    & > .btn-success {
      background-color: #dcfce7;

      &:hover {
        background-color: #dcfce7;
      }
    }

    & > label {
      font-size: 1.5rem;
      margin: 0 1rem;
    }
  }

  a {
    font-size: 0.75rem;
    margin: 0.5rem 0 0.25rem;
    color: #cbd5e1;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }

  @media (prefers-color-scheme: light) {
    :global(:root) {
      background-color: #fefefe;
    }

    h3 {
      color: #212121;
    }

    a:hover {
      color: #212121;
    }

    .calc > button span {
      color: #6b7280;
    }

    .calc > button {
      color: #212121;
    }

    .calc > button:hover {
      background-color: #f7fafc;
    }

    .calc > button:hover h4 {
      color: #0891b2;
    }
  }
</style>
