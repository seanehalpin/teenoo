<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  let { 
    children, 
    stretch = false, 
    small = false, 
    dropdown = false, 
    icon = false,
    leftAlign = false, 
    disabled = $bindable(false),
    variant = "primary", 
    openModal = "",
    onclick = undefined,
    style = "",
    nofill = $bindable(false)
  } = $props();

  // Handle click event
  function handleClick(event: Event) {
    // Call the original onclick handler if provided
    if (onclick) {
      onclick(event);
    }
  }
</script>
<StyleProvider> 
<button 
  class:stretch={stretch} 
  class:small={small} 
  class="button {variant}" 
  class:dropdown={dropdown}
  class:icon={icon}
  class:modal-trigger={!!openModal} 
  class:left-align={leftAlign}
  onclick={handleClick}
  data-modal-target={openModal || undefined}
  style={style} 
  disabled={disabled}
>

  {#if icon}
  <span class="icon-holder" class:nofill={nofill}>{@render children?.()} </span>
  {:else}
  {@render children?.()} 
  {/if}
  
  {#if dropdown}
  <span class="dropdown-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
  </span>
  {/if}
</button>
</StyleProvider>

<style lang="scss">
  
  button {
    font-family: var( --font-base);
    font-size: var(--12px);
    padding: 0 var(--12px);
    height: var(--32px);
    border-radius: var(--8px);
    background: var(--button-bg, var(--ds-primary));
    color: var(--button-color, var(--ds-textWhite));
    border: none;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--8px);

    &:hover {
      filter: brightness(0.96);
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &.left-align {
      justify-content: flex-start;
    }

    &.stretch {
      width: 100%;
    }

    &.icon {
      width: var(--32px);
      height: var(--32px);
      padding: 0 var(--8px);
    }

    .icon-holder {
      display: flex;
      width: var(--16px);
      height: var(--16px);
      align-items: center;
      justify-content: center;
      color: currentColor;
    }

    &.small {
      border-radius: var(--4px);
      height: var(--24px);
      padding: 0 var(--8px);

      &.icon {
        width: var(--24px);
        height: var(--24px);
        padding: 0;

        .icon-holder {
          width: var(--12px);
          height: var(--12px);
        }
      }
    }

    &.primary {
      font-weight: 600;

      &:hover {
        background: var(--button-bg-hover, var(--ds-primary));
        color: var(--button-color, var(--ds-textWhite));
      }
    }

    &.secondary {
      background: var(--button-bg, var(--ds-controlSecondary));
      color: var(--button-color, var(--ds-textPrimary));
      border: 1px solid var(--ds-borderPrimary);

      &:hover {
        background: var(--button-bg-hover, var(--ds-controlSecondaryHover));
        color: var(--button-color, var(--ds-textPrimary));
      }
    }

    &.flat {
      background: transparent;
      color: var(--button-color, var(--ds-textPrimary));

      &:hover {
        filter: brightness(1);
        background: var(--button-bg-hover, var(--ds-slate04));
        color: var(--button-color, var(--ds-textPrimary));
      }
    }

    .dropdown-icon {
      display: flex;
    }

  }
</style>