<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  import Avatar from './Avatar.svelte';
  import Button from './Button.svelte';
  let { 
    onclick = (event: MouseEvent, linkName: string) => {},
    workbench =  $bindable(true),
    links = [
      {link: "Stories", active: true},
      {link: "Cases", active: false},
      {link: "Dashboards", active: false},
      {link: "Records", active: false},
    ]
  } = $props<{
    onclick?: (event: MouseEvent, linkName: string) => void;
    title?: string;
    links?: Array<{link: string, active: boolean}>;
  }>();

  function handleLinkClick(event: MouseEvent, linkName: string) {
    onclick(event, linkName);
  }
</script>
<StyleProvider>
<div class="nav">
  <div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--ds-textPrimary)" viewBox="0 0 256 256"><path fill-rule="evenodd" clip-rule="evenodd" d="M93.5192 0C62.4136 0 34.9105 19.6599 25.6014 48.5495L0 128L25.6014 207.451C34.9105 236.34 62.4136 256 93.5192 256H162.481C193.586 256 221.089 236.34 230.399 207.451L256 128L230.399 48.5495C221.089 19.6599 193.586 0 162.481 0H93.5192ZM162.482 19.9707C184.622 19.9707 204.197 33.9638 210.823 54.5262L217.1 74.005C204.473 63.8523 188.483 58.1378 171.771 58.1366L84.0425 58.1343C67.4428 58.1356 51.556 63.7735 38.9692 73.7985L45.1793 54.5262C51.8051 33.9638 71.3806 19.9707 93.5203 19.9707H162.482ZM43.7049 97.5889L27.7638 118.015L228.048 118.015L212.109 97.5911C202.529 85.3169 187.605 78.1085 171.769 78.1073H83.5648C67.9076 78.2523 53.1873 85.4386 43.7049 97.5889ZM228.015 137.986L212.107 158.391C202.527 170.679 187.592 177.896 171.745 177.895L84.0661 177.892C68.2187 177.894 53.2836 170.677 43.7038 158.389L27.7975 137.986L228.015 137.986ZM45.1781 201.474C51.8039 222.036 71.3794 236.029 93.5191 236.029H162.481C184.62 236.029 204.196 222.036 210.822 201.474L217.103 181.981C204.47 192.146 188.468 197.867 171.743 197.865L84.0677 197.863C67.4542 197.864 51.5544 192.22 38.9615 182.182L45.1781 201.474Z"></path></svg>
  </div>

  <div class="links">
    {#each links as link}
    <button 
      class:active={link.active} 
      onclick={(e) => handleLinkClick(e, link.link)}
    >
      {link.link}
    </button>
    {/each}
  </div>

  <div class="controls">
    {#if workbench}
    <Button variant="secondary" icon>
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M48,64a8,8,0,0,1,8-8H72V40a8,8,0,0,1,16,0V56h16a8,8,0,0,1,0,16H88V88a8,8,0,0,1-16,0V72H56A8,8,0,0,1,48,64ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16Zm56-48H224V128a8,8,0,0,0-16,0v16H192a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V160h16a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z"></path></svg>
      </span>
      Workbench
    </Button>
    {/if}
    <Button variant="secondary" icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
    </Button>
    <Button variant="secondary" icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path></svg>
    </Button>
    <Avatar team avatarNum={7} />
  </div>
</div>
</StyleProvider>

<style lang="scss">

  .nav {
    position: relative;
    z-index: 200;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    width: 100%;
    height: var(--64px);
    justify-content: space-between;
    background-color: var(--ds-surfacePrimary);
    border-bottom: 1px solid var(--ds-borderSecondary);
    white-space: nowrap;
  }

  .title {
    font-size: var(--12px);
    color: var(--ds-textPrimary);
    font-weight: 500;
    line-height: var(--16px);
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .logo {
    display: flex;
    padding-left: var(--22px);
    align-items: center;
  }

  .controls {
    align-items: center;
    gap: var(--12px);
    padding-right: var(--22px);
    display: flex;
    justify-content: flex-end;
  }

  .publish {
    color: #fff;
    background: var(--ds-primary);
    outline: 0;
    border: 0;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 6px;
    padding: 3px 8px 3px 8px;
    user-select: none;
    font-size: var(--12px);
    font-weight: 500;
  }

  .links {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      display: flex;
      font-size: var(--12px);
      padding: 0 var(--16px);
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: transparent;
      border: 1px solid transparent;
      font-weight: 500;
      color: var(--ds-textSecondary);
      height: 28px;
      cursor: pointer;
      position: relative;

      &.active {
        color: var(--ds-textPrimary);

        &::before {
          width: 100%;
          height: 1px;
          content: "";
          background: var(--ds-primary);
          position: absolute;
          bottom: -19px;
          left: 0;
        }
      }

      &:hover {
        background: var(--ds-InputBackground);
      }
    }
  }

  .icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      fill: currentColor !important
    }
  }

</style>