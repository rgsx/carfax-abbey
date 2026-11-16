<!-- Carfax Abbey: Svelte (source.svelte) -->
<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { writable } from 'svelte/store';

  export let name = 'Demeter';
  export let boxes = 50;

  const CREW = 5;
  let lit = false;
  let line = '';
  const watches = writable(['calm', 'gale', 'calm']);

  $: gales = $watches.filter((watch) => watch === 'gale').length;
  $: label = lit ? 'Douse the lantern' : 'Light the lantern';

  onMount(() => {
    const timer = setTimeout(() => watches.update((list) => [...list, 'fog']), CREW);
    return () => clearTimeout(timer);
  });

  function toggle() {
    lit = !lit;
  }

  function record() {
    const next = line.trim();
    if (!next) return;
    watches.update((list) => [...list, next]);
    line = '';
  }
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && (lit = false)} />

<section class:lit aria-label={name} data-boxes={boxes} in:fly={{ y: 12, duration: 240 }}>
  <h2>{name}</h2>
  <p>{gales} gales of {$watches.length} watches — {boxes} boxes in the hold</p>

  {#if $watches.length === 0}
    <p class="hint">The sea is still off Varna.</p>
  {:else}
    <ul>
      {#each $watches as watch, index (watch + index)}
        <li class:gale={watch === 'gale'}>{index + 1}. {watch}</li>
      {/each}
    </ul>
  {/if}

  <form on:submit|preventDefault={record}>
    <input bind:value={line} placeholder="Log the watch" />
    <button type="button" on:click={toggle}>{label}</button>
    <button type="submit" disabled={!line}>Record</button>
  </form>

  <slot name="footer" {gales}>
    <small>Bound for Whitby, {boxes} boxes of earth</small>
  </slot>
</section>

<style>
  section {
    --glow: #af8b4d;
    border-radius: 4px;
  }

  section.lit {
    box-shadow: 0 0 24px var(--glow);
  }

  li.gale::before {
    content: '†';
  }
</style>
