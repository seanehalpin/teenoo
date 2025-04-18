<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  let { 
    showModal = $bindable(false),
    id = "modal-" + Math.random().toString(36).substring(2, 15),
    title = "",
    children,
    footer,
    closeButton = false,
    fixed = true,
  } = $props();
  
  // Function to close the modal
  function closeModal() {
    showModal = false;
  }

  // Handle click outside
  function handleOutsideClick(event: MouseEvent) {
    showModal = false
  }
  
  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      showModal = false;
    }
  }
  
  // Setup event listener for modal triggers
  $effect(() => {
    // Event handler for buttons with open-modal attribute
    function handleOpenModalClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const button = target.closest('[data-modal-target]');
      
      if (button) {
        const modalId = button.getAttribute('data-modal-target');
        if (modalId === id) {
          showModal = true;
          event.preventDefault();
        }
      }
    }
    
    // Add global click listener
    document.addEventListener('click', handleOpenModalClick);
    
    // Return cleanup function
    return () => {
      document.removeEventListener('click', handleOpenModalClick);
    };
  });
</script>

<StyleProvider>
  {#if showModal}
  <div 
    id={id}
    class="tino-modal-container"
    role="presentation"
    data-modal-id={id}
  >
    <div 
      class="modal-overlay"
      class:fixed={fixed}
    > 
    <div class="modal-backdrop" 
    role="button"
    aria-label="Close modal"
    tabindex="0"
    onkeydown={handleKeydown}
    onclick={closeModal}
    >

    </div>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby={`modal-title-${id}`}>
        <div class="modal-header">
          {#if title}
            <h2 id={`modal-title-${id}`} class="modal-title">{title}</h2>
          {/if}
          {#if closeButton}
          <button 
            type="button" 
            class="modal-close" 
            aria-label="Close modal"
            onclick={closeModal}
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12.5 3.5L3.5 12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 12.5L3.5 3.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </button>
          {/if}
        </div>
        <div class="modal-content">
          {@render children?.()}
        </div>
        {#if footer}
        <div class="modal-footer">
          {@render footer?.()}
        </div>
        {/if}
      </div>
    </div>
  </div>
  {/if}
</StyleProvider>

<style lang="scss">

  .tino-modal-container {
    width: 100%;
  }
  
  .modal-overlay {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: var(--ds-modalOverlay);
    // backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: var(--16px);

    &.fixed {
      position: fixed;
    }
  }
  
  .modal {
    background-color: var(--ds-surfacePrimary);
    border-radius: var(--12px);
    box-shadow: 0 var(--8px) var(--24px) rgba(0, 0, 0, 0.1);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 456px; // Default size
    position: relative;
    z-index: 100000;
    
  }
  
  .modal-header {
    padding: var(--20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--ds-borderPrimary);
  }
  
  .modal-title {
    font-family: var(--font-base);
    font-size: var(--12px);
    font-weight: 500;
    color: var(--ds-textPrimary);
  }
  
  .modal-close {
    background: transparent;
    border: none;
    border-radius: var(--4px);
    width: var(--24px);
    height: var(--24px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--ds-textSecondary);
    padding: 0;
    
    &:hover {
      background-color: var(--ds-surfaceSecondary);
      color: var(--ds-textPrimary);
    }
  }
  
  .modal-content {
    padding: var(--20px);
    overflow-y: auto;
    flex: 1;
    font-size: var(--12px);
  }

  .modal-footer {
    display: flex;
    gap: var(--8px);
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    padding: var(--20px);
    border-top: 1px solid var(--ds-borderPrimary);
  }

  .modal-backdrop {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: var(--ds-modalOverlay);
    backdrop-filter: blur(3px);
    z-index: 1;
    cursor: default !important
  }

</style>