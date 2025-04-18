<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  type Tag = { id: string; text: string; };
  
  let { 
    tags = [],
    label = "",
    placeholder = "Add tags",
    error = "",
    disabled = false,
    stretch = true,
    maxTags = undefined,
    onchange = undefined
  } = $props();

  let inputValue = "";
  let inputRef: HTMLInputElement;
  let randomId = Math.random().toString(36).substring(2, 15);
  let id = `tagbuilder-${randomId}`;

  function handleKeyDown(event: KeyboardEvent) {
    if (disabled) return;
    
    if ((event.key === 'Enter' || event.key === ',') && inputValue.trim()) {
      event.preventDefault();
      addTag();
    } else if (event.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1].id);
    }
  }

  function addTag() {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    
    // Check if we've reached max tags
    if (maxTags !== undefined && tags.length >= maxTags) return;
    
    // Check for duplicates
    const isDuplicate = tags.some(tag => tag.text.toLowerCase() === trimmedValue.toLowerCase());
    if (isDuplicate) {
      inputValue = "";
      return;
    }
    
    const newTag: Tag = {
      id: crypto.randomUUID ? crypto.randomUUID() : `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: trimmedValue
    };
    
    tags = [...tags, newTag];
    // Force reset input value to empty string
    setTimeout(() => {
      inputValue = "";
      if (inputRef) {
        inputRef.value = "";
      }
    }, 0);
    
    if (onchange) {
      onchange(tags);
    }
  }

  function removeTag(id: string) {
    if (disabled) return;
    
    tags = tags.filter(tag => tag.id !== id);
    
    if (onchange) {
      onchange(tags);
    }
  }

  function focusInput() {
    if (!disabled && inputRef) {
      inputRef.focus();
    }
  }
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    
    // Check if the input contains a comma
    if (value.includes(',')) {
      const parts = value.split(',');
      // Process all parts except the last one (which might be incomplete)
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i].trim();
        if (part) {
          // Temporarily set inputValue to this part and add it as a tag
          inputValue = part;
          addTag();
        }
      }
      // Set input value to the last part (after the last comma)
      inputValue = parts[parts.length - 1];
    } else {
      inputValue = value;
    }
  }
</script>

<StyleProvider>
  <div class="tagbuilder-container" class:fullWidth={stretch} onclick={focusInput}>
    {#if label}
      <label class="tagbuilder-label" for={id}>{label}</label>
    {/if}
    <div 
      class="tagbuilder-holder" 
      class:hasError={error} 
      class:disabled={disabled}
      class:noBorder={tags.length === 0}
    >
      <div class="tagbuilder-tags">
        {#each tags as tag (tag.id)}
          <div class="tag" >
            <span class="tag-text">{tag.text}</span>
            <button 
              type="button" 
              class="tag-remove" 
              onclick={(e) => {
                e.stopPropagation();
                removeTag(tag.id);
              }}
              disabled={disabled}
              aria-label={`Remove ${tag.text}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <g opacity="0.5">
                <path d="M9.375 2.625L2.625 9.375" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.375 9.375L2.625 2.625" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
            </button>
          </div>
        {/each}
        <input
          id={id}
          bind:this={inputRef}
          class="tagbuilder-input"
          type="text"
          bind:value={inputValue}
          {placeholder}
          {disabled}
          onkeydown={handleKeyDown}
          oninput={handleInput}
        />
      </div>
    </div>
    {#if error}
      <div class="tagbuilder-error">{error}</div>
    {/if}
    {#if maxTags !== undefined}
      <div class="tagbuilder-counter">{tags.length}/{maxTags}</div>
    {/if}
  </div>
</StyleProvider>

<style lang="scss">
  .tagbuilder-container {
    display: flex;
    flex-direction: column;
    gap: var(--4px);
    
    &.fullWidth {
      width: 100%;
    }
  }

  .tagbuilder-label {
    font-family: var(--font-base);
    font-size: var(--10px);
    color: var(--ds-textSecondary);
    font-weight: 500;
  
  }

  .tagbuilder-holder {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    border: 1px solid var(--ds-borderPrimary);
    border-radius: var(--8px);
    background: var(--ds-inputPrimary);
    transition: all 0.2s ease;
    padding: var(--4px) var(--8px);
    min-height: var(--32px);
    cursor: text;
    
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

  .tagbuilder-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--8px);
    width: 100%;
    align-items: center;
  }

  .tag {
    display: flex;
    align-items: center;
    background: var(--ds-primary08);
    box-shadow: 0 0 0 1px var(--ds-primary16);
    color: var(--ds-primary);
    border-radius: calc(var(--8px) - 2px);
    padding: 0 var(--4px) 0 var(--8px);
    height: var(--20px);
    font-family: var(--font-base);
    font-size: var(--12px);
    font-weight: 500;
    
  }

  .tag-text {
    margin-right: var(--4px);
  }

  .tag-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--ds-primary);
    cursor: pointer;
    width: var(--18px);
    height: var(--18px);
    border-radius: var(--4px);
    padding: 0;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    
    &:focus {
      outline: none;
      background: rgba(0, 0, 0, 0.1);
    }
    
    &:disabled {
      cursor: not-allowed;
    }
  }

  .tagbuilder-input {
    flex: 1;
    min-width: 60px;
    border: none;
    outline: none;
    background: transparent;
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textPrimary);
    padding: var(--4px) 0;
    height: var(--24px);
    
    &::placeholder {
      color: var(--ds-textTertiary);
    }
    
    &:disabled {
      cursor: not-allowed;
    }
    
  }
  
  .tagbuilder-error {
    font-family: var(--font-base);
    font-size: var(--11px);
    color: var(--ds-inputErrorText);
  }
  
  .tagbuilder-counter {
    font-family: var(--font-base);
    font-size: var(--11px);
    color: var(--ds-textTertiary);
    text-align: right;
    margin-top: var(--2px);
  }
</style>