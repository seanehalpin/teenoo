<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  let { 
    options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ], 
    value = "", 
    label = "", 
    error = "", 
    disabled = false, 
    stretch = true,
    placeholder = "Select option(s)",
    onchange = undefined
  } = $props();

  let open = $state(false);
  let selectContainer: HTMLDivElement;
  let randomId = Math.random().toString(36).substring(2, 15);
  let id = `select-${randomId}`;

  function toggleDropdown() {
    console.log("toggleDropdown", open);
    if (!disabled) {
      open = !open;
    }
  }

  function selectOption(option: any) {
    value = option.value;
    open = false;
    if (onchange) {
      onchange(option.value);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (selectContainer && !selectContainer.contains(event.target as Node)) {
      open = false;
    }
  }

  function getSelectedLabel() {
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : placeholder;
  }

  $effect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<StyleProvider>
  <div class="select-container" class:fullWidth={stretch} bind:this={selectContainer}>
    {#if label}
      <label class="select-label" for={id}>{label}</label>
    {/if}
    <div 
      role="button" 
      tabindex="0" 
      id={id}
      class="select-holder" 
      class:open={open}
      class:hasError={error} 
      class:disabled={disabled} 
      onclick={() => toggleDropdown()}
      onkeydown={(event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        toggleDropdown();
      } else if (event.key === 'Escape') {
        open = false;
      }
      }}
    >
      <div class="select-value">{getSelectedLabel()}</div>
      <div class="select-arrow">
        <svg 
          width="10" 
          height="6" 
          viewBox="0 0 10 6" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style="transform: {open ? 'rotate(180deg)' : 'rotate(0deg)'}"
        >
          <path 
            d="M1 1L5 5L9 1" 
            stroke="currentColor" 
            stroke-width="1.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {#if open}
        <div class="select-dropdown">
          {#each options as option}
            <div 
              class="select-option" 
              class:selected={value === option.value}
              onclick={(event) => {
                event.stopPropagation();
                selectOption(option);
              }}
            >
              {option.label}
            </div>
          {/each}
        </div>
      {/if}
    </div>
    {#if error && error !== true}
      <div class="select-error">
        <span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 6C1.5 3.51103 3.51103 1.5 6 1.5C8.48276 1.5 10.5 3.51103 10.5 6C10.5 8.48276 8.48276 10.5 6 10.5C3.51103 10.5 1.5 8.48276 1.5 6Z" fill="#FF8888"/>
            <path d="M6 1C3.23489 1 1 3.23489 1 6H2C2 3.78718 3.78718 2 6 2V1ZM1 6C1 8.75845 3.23444 11 6 11V10C3.78763 10 2 8.20707 2 6H1ZM6 11C8.7589 11 11 8.7589 11 6H10C10 8.20662 8.20662 10 6 10V11ZM11 6C11 3.23444 8.75845 1 6 1V2C8.20707 2 10 3.78763 10 6H11Z" fill="#FF8888"/>
            <circle cx="6" cy="8.25" r="0.5" fill="white" stroke="white" stroke-width="0.5"/>
            <path d="M6 3.75L6 6" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </span>
        <span>{error}</span>
      </div>
    {/if}
  </div>
</StyleProvider>

<style lang="scss">
  .select-container {
    display: flex;
    flex-direction: column;
    gap: var(--4px);
    position: relative;
    
    &.fullWidth {
      width: 100%;
    }
  }

  .select-label {
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textSecondary);
    font-weight: 500;
    
  }

  .select-holder {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid var(--ds-borderPrimary);
    border-radius: var(--8px);
    background: var(--ds-inputPrimary);
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    padding: 0 var(--12px);
    height: var(--32px);
    
    &:focus-within, &.open {
      border-color: var(--ds-inputActiveBorder);
      box-shadow: 0 0 0 3px var(--ds-inputActiveOutline);
    }
    
    &:hover:not(.open):not(.disabled):not(.hasError) {
      border-color: var(--ds-inputHoverBorder);
    }
    
    &.hasError {
      border-color: var(--ds-inputErrorBorder);
      
      &:focus-within, &.open {
        border-color: var(--ds-inputActiveErrorBorder);
        box-shadow: 0 0 0 3px var(--ds-inputActiveErrorOutline);
      }
    }
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--ds-inputSecondary);
    }
    
    &.open {
      z-index: 100000;
    }
  }

  .select-value {
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textPrimary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  
  .select-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ds-textSecondary);
    margin-left: var(--8px);
    transition: transform 0.2s ease;
  }
  
  .select-dropdown {
    position: absolute;
    top: calc(100% + var(--4px));
    left: 0;
    right: 0;
    background: var(--ds-popoverPrimary);
    border-radius: var(--12px);
    box-shadow: 0 var(--4px) var(--16px) rgba(0, 0, 0, 0.1);
    z-index: 10;
    margin-top: var(--4px);
    padding: var(--12px);
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 0 0 1px var(--ds-borderSecondary), 0px 154px 43px 0px rgba(0, 0, 0, 0.00), 0px 98px 39px 0px rgba(0, 0, 0, 0.01), 0px 55px 33px 0px rgba(0, 0, 0, 0.03), 0px 25px 25px 0px rgba(0, 0, 0, 0.05), 0px 6px 14px 0px rgba(0, 0, 0, 0.06);
  }
  
  .select-option {
    padding: 0 var(--12px);
    height: var(--32px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textPrimary);
    cursor: pointer;
    transition: background 0.1s ease;
    border-radius: var(--8px);
    
    &:hover {
      background: var(--ds-popoverHover);
    }
    
    &.selected {
      background: var(--ds-primary08);
      color: var(--ds-primary);
      font-weight: 500;
    }
  }
  
  .select-error {
    font-family: var(--font-base);
    font-size: var(--11px);
    color: var(--ds-inputErrorText);
    display: flex;
    align-items: center;
    gap: var(--4px);
  }
</style>