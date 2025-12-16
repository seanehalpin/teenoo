<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  // Define props at the top level
  let {
    tabs = [
      { id: 'tab1', label: 'Tab 1' },
      { id: 'tab2', label: 'Tab 2' }
    ],
    activeTab = $bindable(''),
    variant = 'chrome',
    onclick = undefined
  } = $props();
  
  // Add type definitions for TypeScript
  type Tab = { id: string; label: string };
  
  // Set default active tab if not provided
  $effect(() => {
    if (!activeTab && tabs.length > 0) {
      activeTab = tabs[0].id;
    }
  });
  
  // Handle tab selection
  function selectTab(tabId: string, event: Event) {
    activeTab = tabId;
    
    // Call the onclick handler if provided
    if (onclick) {
      onclick(tabId, event);
    }
  }
</script>

<StyleProvider>
  <div class="tabs-container" class:flat={variant === 'flat'}>
    <div class="tabs-header" class:flat={variant === 'flat'} >
      {#each tabs as tab}
        <button
          type="button"
          class="tab-button"
          class:active={activeTab === tab.id} 
          class:flat={variant === 'flat'} 
          onclick={(e) => selectTab(tab.id, e)}
          role="tab"
          aria-selected={activeTab === tab.id}
          id={`tab-${tab.id}`}
          data-tab-id={tab.id}
        >
          {tab.label}
        </button>
      {/each}
    </div>
  </div>
</StyleProvider>

<style lang="scss">
  .tabs-container {
    font-family: var(--font-base);
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .tabs-header {
    display: flex;
    position: relative;
    background: var(--ds-surfaceSecondary);
    border: 1px solid var(--ds-borderSecondary);
    border-radius: var(--8px);
    padding: calc(var(--4px) - 1px);

    &.flat {
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0;
    }
  }
  
  .tab-button {
    font-family: var(--font-base);
    font-size: var(--12px);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--ds-textSecondary);
    cursor: pointer;
    position: relative;
    height: var(--24px);
    padding: 0 var(--12px);
    border-radius: var(--4px);
    width: 100%;

    &.active {
      color: var(--ds-textPrimary);
      background: var(--ds-controlSecondary);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }

    &.flat {
      padding: 0 var(--12px) 0 0;
      height: 28px;
      justify-content: flex-start;
      border-radius: 0;
      width: auto;

      &.active {
        background: transparent;
        box-shadow: none;
        // color: var(--ds-textPrimary);
      }
    }
    
    &:hover {
      // color: var(--ds-textPrimary);
    }
  }
</style>