<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  let {
    checked = $bindable(false),
    disabled = false,
    error = false,
    label = "",
    id = "checkbox" + Math.random().toString(36).substring(2, 15),
    name = "",
    ariaLabel = "",
  } = $props();
  
  function handleChange() {
    if (!disabled) {
      checked = !checked;
    }
  }
</script>

<StyleProvider>
  <div 
    class="checkbox-container"
    class:disabled={disabled}
    class:error={error}
  >
    <div class="checkbox-wrapper">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={ariaLabel || label || "Checkbox"}
        id={id}
        name={name}
        class="checkbox"
        class:checked={checked}
        class:disabled={disabled}
        class:error={error}
        onclick={handleChange}
        disabled={disabled}
      >
        {#if checked}
          <svg class="checkbox-icon"  width="8px" height="8px"><path d="M1 3.9 L 3.25 6 L 7 2.5" fill="transparent" stroke-width="1.5" stroke="var(--ds-textWhite)" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1"></path></svg>
        {/if}
      </button>
    </div>
    
    {#if label}
      <label for={id} class="checkbox-label">
        {label}
      </label>
    {/if}
  </div>
</StyleProvider>

<style lang="scss">
  .checkbox-container {
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    width: var(--24px);
    height: var(--24px);
    position: relative;
    justify-content: center;
  }
  
  .checkbox-label {
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textPrimary);
    cursor: pointer;
    
    .disabled & {
      cursor: not-allowed;
    }
    
    .error & {
      color: var(--ds-error, #dc3545);
    }
  }
  
  .checkbox {
    position: relative;
    width: var(--16px);
    height: var(--16px);
    padding: 0;
    border: 1px solid var(--ds-borderPrimary);
    border-radius: calc(var(--4px) + 1px);
    background-color: var(--ds-surfacePrimary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:focus-visible {
      outline: 2px solid var(--ds-primary);
      outline-offset: 2px;
    }
    
    &:hover:not(.disabled) {
      border-color: var(--ds-primary);
    }
    
    &.checked {
      background-color: var(--ds-primary);
      border-color: var(--ds-primary);
      color: white;
    }
    
    &.disabled {
      cursor: not-allowed;
      background-color: var(--ds-slate08);
    }
    
    &.error:not(.checked) {
      border-color: var(--ds-error, var(--ds-red));
    }
  }
  
  .checkbox-icon {
    pointer-events: none;
  }
</style>