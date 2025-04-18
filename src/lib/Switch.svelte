<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  let { 
    checked = $bindable(false),
    disabled = false,
    id = "switch" + Math.random().toString(36).substring(2, 15),
    name = "",
    label = "",
    ariaLabel = "",
  } = $props();
  
  // Handle change event
  function handleChange() {
    if (!disabled) {
      checked = !checked;
    }
  }

  
</script>

<StyleProvider>
  <div 
    class="switch-container"
    class:disabled={disabled}
  >
    {#if label}
      <label for={id} class="switch-label">
        {label}
      </label>
    {/if}
    
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel || label || "Toggle"}
      id={id}
      name={name}
      class="switch"
      class:checked={checked}
      class:disabled={disabled}
      style:--switch-width="34px"
      style:--switch-height="22px"
      onclick={handleChange}
      disabled={disabled}
    >
      <span class="switch-track"></span>
      <span class="switch-handle"></span>
    </button>
  </div>
</StyleProvider>

<style lang="scss">
  .switch-container {
    display: inline-flex;
    align-items: center;
    gap: var(--8px);
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .switch-label {
    font-family: var(--font-base);
    font-size: var(--14px);
    color: var(--ds-textPrimary);
    cursor: pointer;
    
    .disabled & {
      cursor: not-allowed;
    }
  }
  
  .switch {
    position: relative;
    width: var(--switch-width);
    height: var(--switch-height);
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    
    &:focus-visible {
      outline: 2px solid var(--ds-primary);
      outline-offset: 2px;
      border-radius: var(--32px);
    }
    
    &.disabled {
      cursor: not-allowed;
    }
  }
  
  .switch-track {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: calc(var(--switch-height) / 2);
    background-color: var(--ds-switchTrack);
    transition: background-color 0.3s ease;
    
    .switch.checked & {
      background-color: var(--ds-switchTrackActive);
    }
  }
  
  .switch-handle {
    position: absolute;
    top: 3px;
    left: 3px;
    width: calc(var(--switch-height) - 6px);
    height: calc(var(--switch-height) - 6px);
    border-radius: 50%;
    background-color: var(--ds-switchHandle);
    box-shadow: 0 1px 2px var(--ds-switchHandleShadow);
    transition: transform 0.3s ease;
    
    .switch.checked & {
      transform: translateX(calc(var(--switch-width) - var(--switch-height)));
    }
    
  }
</style>