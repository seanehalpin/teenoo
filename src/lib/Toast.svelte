<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  import Button from './Button.svelte';
  
  // Import the interface from toastUtils.ts
  
  let { 
    visible = $bindable(false),
    text = "",
    icon = "default",
    buttonText = "",
    buttonAction = null,
    duration = 4000,
  } = $props();
  
  // Timer reference for auto-dismissal
  let timer: ReturnType<typeof setTimeout> | null = null;
  
  // Show the toast with optional custom duration
  function show(customDuration?: number) {
    // Clear any existing timer
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    
    // Show the toast
    visible = true;
    
    // Set auto-dismiss timer
    const toastDuration = customDuration || duration;
    if (toastDuration > 0) {
      timer = setTimeout(() => {
        dismiss();
      }, toastDuration);
    }
  }
  
  // Dismiss the toast
  function dismiss() {
    visible = false;
    
    // Clear timer
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  
  // Make show and dismiss methods available outside the component
  $effect(() => {
    if (typeof window !== 'undefined') {
      const toastInstance = {
        show,
        dismiss,
        update: (options: {
          text?: string;
          icon?: string;
          buttonText?: string;
          buttonAction?: () => void;
        }) => {
          if (options.text !== undefined) text = options.text;
          if (options.icon !== undefined) icon = options.icon;
          if (options.buttonText !== undefined) buttonText = options.buttonText;
          if (options.buttonAction !== undefined) buttonAction = options.buttonAction;
        }
      };
      
      // Create or update the global toast registry
      if (!window.tinoToasts) {
        window.tinoToasts = {};
      }
      
      // Add this toast instance to the registry with a unique ID
      const id = "toast-" + Math.random().toString(36).substring(2, 15);
      window.tinoToasts[id] = toastInstance;
      
      // Cleanup when component is destroyed
      return () => {
        if (window.tinoToasts && window.tinoToasts[id]) {
          delete window.tinoToasts[id];
        }
        
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  });
  
  // Handle button click
  function handleButtonClick() {
    if (buttonAction && typeof buttonAction === 'function') {
      buttonAction();
    }
    dismiss();
  }
  
  // The showToast function is defined in toastUtils.ts
</script>

<StyleProvider>
  {#if visible}
    <div class="toast-container">
      <div class="toast" role="alert" class:has-button={buttonText.length > 0} >
        {#if icon}
          <div class="toast-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="14" height="14" rx="7" fill="var(--ds-green)"/>
              <path d="M4.375 7L6.125 8.75L9.625 5.25" stroke="white" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        {/if}
        <div class="toast-content">
          <p class="toast-text">{text}</p>
        </div>
        {#if buttonText}
        <div class="toast-button">
          <Button variant="secondary" onclick={handleButtonClick}>
            {buttonText}
          </Button>
        </div>
        {/if}
      </div>
    </div>
  {/if}
</StyleProvider>

<style lang="scss">
  .toast-container {
    position: fixed;
    bottom: var(--32px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10001;
    width: auto;
    max-width: 90%;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }
  
  .toast {
    background-color: var(--ds-surfacePrimary);
    color: var(--ds-textPrimary);
    border-radius: var(--12px);
    border: 1px solid var(--ds-borderSecondary);
    box-shadow: 0px 154px 43px 0px rgba(0, 0, 0, 0.00), 0px 98px 39px 0px rgba(0, 0, 0, 0.01), 0px 55px 33px 0px rgba(0, 0, 0, 0.03), 0px 25px 25px 0px rgba(0, 0, 0, 0.05), 0px 6px 14px 0px rgba(0, 0, 0, 0.06);
    padding: 0 var(--16px) 0 var(--14px);
    height: 46px;
    display: flex;
    align-items: center;
    gap: var(--8px);
    animation: toast-in 0.3s ease forwards;
    max-width: 100%;
    pointer-events: auto;

    &.has-button {
      padding-right: var(--8px);
    }
  }
  
  .toast-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .toast-content {
    flex: 1;
    min-width: 0;
  }
  
  .toast-text {
    margin: 0;
    font-size: var(--12px);
    line-height: 1.5;
    font-weight: 500;
    white-space: normal;
    word-break: break-word;
  }
  
  .toast-button {
    margin-left: var(--8px);
    background: transparent;
    border: none;
    border-radius: var(--4px);
    padding: var(--4px) var(--8px);
    font-size: var(--12px);
    font-weight: 500;
    color: var(--ds-primary);
    cursor: pointer;
    transition: background-color 0.2s ease;
    flex-shrink: 0;
    
    &:hover {
      background-color: var(--ds-surfaceSecondary);
    }
  }
  
  @keyframes toast-in {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>