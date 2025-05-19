<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  let { 
    inputType = "text", 
    placeholder = "", 
    value = "", 
    label = "", 
    error = "", 
    disabled = false, 
    small = false,
    stretch = true,
    search = false,
    onchange = undefined,
    oninput = undefined,
    onfocus = undefined,
    onblur = undefined
  } = $props();

  let randomId = Math.random().toString(36).substring(2, 15);
  let id = `input-${randomId}`;

</script>

<StyleProvider>
  <div class="input-container" class:fullWidth={stretch}>
    {#if label}
      <label class="input-label" class:small={small} for={id}>{label}</label>
    {/if}
    <div class="input-holder" class:hasError={error} class:disabled={disabled} class:small={small}>
      {#if search}
      <span class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
      </span>
      {/if}
      <input 
        id={id}
        class="input" 
        type={inputType} 
        class:search={search}
        {placeholder} 
        bind:value={value} 
        {disabled}
        onchange={onchange}
        oninput={oninput}
        onfocus={onfocus}
        onblur={onblur}
      />
    </div>
    {#if error && error !== true}
    <div class="input-error">
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
  .input-container {
    display: flex;
    flex-direction: column;
    gap: var(--4px);
    
    &.fullWidth {
      width: 100%;
    }
  }

  .input-label {
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textSecondary);
    font-weight: 500;
    
    &.small {
      font-size: var(--11px);
    }
  }

  .input-holder {
    position: relative;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    border: 1px solid var(--ds-borderPrimary);
    border-radius: var(--8px);
    background: var(--ds-inputPrimary);
    transition: box-shadow 0.2s ease, border 0.2s ease;
    
    &:focus-within {
      border-color: var(--ds-inputActiveBorder);
      box-shadow: 0 0 0 3px var(--ds-inputActiveOutline);
    }
    
    &:hover:not(:focus-within):not(.disabled) {
      border-color: var(--ds-inputHoverBorder);
    }
    
    &.hasError {
      border-color: var(--ds-inputErrorBorder);
      
      &:focus-within {
        border-color: var(--ds-inputActiveErrorBorder);
        box-shadow: 0 0 0 3px var(--ds-inputActiveErrorOutline);
      }
    }
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--ds-inputSecondary);
    }
    
    &.small {
      border-radius: var(--4px);
    }
  }

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: var(--8px);
    top: 50%;
    transform: translateY(-50%);
    width: var(--16px);
    height: var(--16px);
    color: var(--ds-textTertiary);
    z-index: 100;
    pointer-events: none;
  }

  .input {
    position: relative;
    z-index: 100;
    box-sizing: border-box;
    width: 100%;
    font-family: var(--font-base);
    font-size: var(--12px);
    padding: var(--8px) var(--12px);
    border: none;
    outline: none;
    background: transparent;
    color: var(--ds-textPrimary);
    height: calc(var(--32px) - 2px);

    &.search {
      padding-left: var(--32px);
    }
    
    &::placeholder {
      color: var(--ds-textTertiary);
    }
    
    &:disabled {
      cursor: not-allowed;
    }
  }
  
  .input-error {
    font-family: var(--font-base);
    font-size: var(--11px);
    color: var(--ds-inputErrorText);
    display: flex;
    align-items: center;
    gap: var(--4px);
  }
</style>