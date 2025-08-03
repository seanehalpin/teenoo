<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  let {
    checked = $bindable(false),
    disabled = false,
    error = false,
    label = "",
    id = "checkbox" + Math.random().toString(36).substring(2, 15),
    name = "",
    ariaLabel = ""
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
          <svg 
            class="checkbox-icon" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M13.5 4.5L6 12L2.5 8.5" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
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
    display: inline-flex;
    align-items: center;
    gap: var(--8px);
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .checkbox-wrapper {
    display: flex;
    align-items: center;
  }
  
  .checkbox-label {
    font-family: var(--font-base);
    font-size: var(--14px);
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
    width: 16px;
    height: 16px;
    padding: 0;
    border: 1px solid var(--ds-borderPrimary);
    border-radius: var(--4px);
    background-color: var(--ds-controlPrimary);
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
      background-color: var(--ds-controlDisabled, #f5f5f5);
      border-color: var(--ds-borderDisabled, #d0d0d0);
    }
    
    &.error:not(.checked) {
      border-color: var(--ds-error, #dc3545);
    }
  }
  
  .checkbox-icon {
    width: 12px;
    height: 12px;
    pointer-events: none;
  }
</style>