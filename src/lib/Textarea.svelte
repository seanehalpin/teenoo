<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  let { 
    placeholder = "", 
    value = "", 
    label = "", 
    error = "", 
    disabled = false,
    rows = 3,
    maxlength = undefined,
    stretch = true,
    onchange = undefined,
    oninput = undefined,
    onfocus = undefined,
    onblur = undefined
  } = $props();

  let randomId = Math.random().toString(36).substring(2, 15);
  let id = `textarea-${randomId}`;

</script>

<StyleProvider>
  <div class="textarea-container" class:fullWidth={stretch}>
    {#if label}
      <label class="textarea-label" for={id}>{label}</label>
    {/if}
    <div class="textarea-holder" class:hasError={error} class:disabled={disabled}>
      <textarea
        id={id}
        class="textarea"
        {placeholder}
        bind:value={value}
        {disabled}
        {rows}
        {maxlength}
        onchange={onchange}
        oninput={oninput}
        onfocus={onfocus}
        onblur={onblur}
      ></textarea>
    </div>
    {#if error && error !== true}
    <div class="textarea-error">
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
    {#if maxlength !== undefined}
      <div class="textarea-counter">{value ? value.length : 0}/{maxlength}</div>
    {/if}
  </div>
</StyleProvider>

<style lang="scss">
  .textarea-container {
    display: flex;
    flex-direction: column;
    gap: var(--4px);
    
    &.fullWidth {
      width: 100%;
    }
  }

  .textarea-label {
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textSecondary);
    font-weight: 500;
  }

  .textarea-holder {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    border: 1px solid var(--ds-borderPrimary);
    border-radius: var(--8px);
    background: var(--ds-inputPrimary);
    transition: all 0.2s ease;
    
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
  }

  .textarea {
    box-sizing: border-box;
    width: 100%;
    font-family: var(--font-base);
    font-size: var(--14px);
    padding: var(--8px) var(--12px);
    border: none;
    outline: none;
    background: transparent;
    color: var(--ds-textPrimary);
    resize: vertical;
    min-height: calc(var(--32px) * 3);
    
    &::placeholder {
      color: var(--ds-textTertiary);
    }
    
    &:disabled {
      cursor: not-allowed;
    }
  }
  
  .textarea-error {
    font-family: var(--font-base);
    font-size: var(--11px);
    color: var(--ds-inputErrorText);
    display: flex;
    align-items: center;
    gap: var(--4px);
  }
  
  .textarea-counter {
    font-family: var(--font-base);
    font-size: var(--11px);
    color: var(--ds-textTertiary);
    text-align: right;
    margin-top: var(--2px);
  }
</style>